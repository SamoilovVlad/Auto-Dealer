import React, { useState, useEffect } from 'react';
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
                        const res = await GoogleApi.searchFileByName(imageModel.image_name);
                        const img = await GoogleApi.fetchDriveData(res.id);
                        return { modelInfo, img, model:modelName}
                    } catch (error) {
                        console.error('Error fetching image data:', error);
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

    const loadPage = (brand,model,pageNumber,pageSize) => {
        //window.location.href = `/Autos/Models/${}`;
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
                        currentPage={pageNumber}
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