import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import AppApi from '../../Api&Services/AppApi';
import GoogleApi from '../../Api&Services/GoogleApi';
import Loader from '../../Loader/Loader';
import PaginationList from '../../Pagenation List/PaginationList';
import AutoCard from './Auto Card/AutoCard';
import './Autos.css'

const Autos = () => {
    const { brand, modelName, pageNumber, pageSize } = useParams();
    const [autosData, setAutosData] = useState([]);
    const [autoCount, setAutoCount] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        const fetchData = async () => {
            try {
                const autos = await AppApi.getAutosByMakerAndModelNames(brand, modelName, pageNumber, pageSize);

                const ImgPredictedViewPoint = 135;
                const promises = autos.models.map(async (modelInfo) => {
                    try {
                        const imageModels = await AppApi.getAutoImagesById(modelInfo.adv_ID);
                        var imageModel = imageModels.find(img => img.predicted_viewpoint <= ImgPredictedViewPoint);
                        var res;
                        //If we can`t find image with good view, we take first existing image of this car.
                        imageModel ? res = await GoogleApi.searchFileByName(imageModel.image_name) : res = await GoogleApi.searchFileByName(imageModels[0].image_name);
                        const img = await GoogleApi.fetchDriveData(res.id);

                        return img && modelInfo ? { modelInfo, img, model: modelName } : null;

                    } catch (error) {
                        console.error('Error fetching image data:', error);
                        return null;
                    }
                });

                var data = await Promise.all(promises);
                setAutoCount(autos.autoCount);
                setAutosData(data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching autos data:', error);
            }
        };

        fetchData();
    }, [brand, modelName, pageNumber, pageSize]);

    const loadPage = (pageNumber) => {
        const newUrl = `${window.location.origin}/model/${brand}/${modelName}/page/${pageNumber}/pageSize/12`;
        window.location.href = newUrl;
    }

    return (
        <>
            {isLoading ? (
                <Loader />
            ) :
                (<section className='autos-catalog-container'>
                    {document.body.classList.remove('scroll-off')}
                    <PaginationList
                        brand={brand}
                        currentPage={parseInt(pageNumber)}
                        lastPage={Math.ceil(autoCount / pageSize)}
                        maxItems={pageSize}
                        data={autosData}
                        onChangePage={loadPage}
                        ListItemComponent={AutoCard}
                    />
                </section>
                )}
        </>
    );

}

export default Autos;