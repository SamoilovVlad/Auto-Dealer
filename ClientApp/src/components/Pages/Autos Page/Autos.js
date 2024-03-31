import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AppApi from '../../Api&Services/AppApi';
import GoogleApi from '../../Api&Services/GoogleApi';
import Loader from '../../Loader/Loader';

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
                console.log(autos.models);

                const ImgPredictedViewPoint = 135;
                const promises = autos.models.map(async (auto) => {
                    try {
                        console.log(auto.adv_ID);
                        const imageModels = await AppApi.getAutoImagesById(auto.adv_ID);
                        var imageModel = imageModels.find(img => img.predicted_viewpoint <= ImgPredictedViewPoint);
                        const res = await GoogleApi.searchFileByName(imageModel.image_name);
                        const img = await GoogleApi.fetchDriveData(res.id);
                        return { auto, img }

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

    return (
        <>
            {isLoading ? (
                <Loader />
            ) :
                (<div>
                    {document.body.classList.remove('scroll-off')}
                    {autosData.map((auto, index) => (
                        <img key={index} src={URL.createObjectURL(auto.img)} alt={auto.adv_ID} />
                    ))}
                </div>
                )}
        </>
    );

}

export default Autos;