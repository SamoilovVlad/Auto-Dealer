import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Models.css';
import Loader from '../Loader/Loader';
import GoogleApi from '../GoogleApi';
import AppApi from '../AppApi';
import PaginationList from '../Pagenation List/PagenationList';
import AutoModelCard from '../AutoModelCard';


const Models = () => {
    //All dependencies
    const { brand } = useParams();
    const [modelsCount, setModelsCount] = useState();
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [data, setData] = useState([]);
    const [dataForPage, setDataForPage] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [input, setInput] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const cardsOnPage = 12;

    const nextPage = (page) => {
        setCurrentPage(page);
    };


    //Loading data for all models, and setting data for first page
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);

            const models = await AppApi.getAutoModelsByMakerName(brand);
            setModelsCount(models.length);

            const modelsForPage = models.slice(0, cardsOnPage);
            const promises2 = modelsForPage.map(async (model) => {
                const modelInfo = await AppApi.getAutoInfoByModelName(encodeURIComponent(model));
                const imgPath = await AppApi.getAutoImageByGenmodelName(encodeURIComponent(model));
                const res = await GoogleApi.searchFileByName(imgPath.image_name);
                const img = await GoogleApi.fetchDriveData(res.id);
                return { model, modelInfo, img };
            });

            const dataForPage = await Promise.all(promises2);

            setDataForPage(dataForPage);
            setIsLoading(false);

            const promises = models.map(async (model) => {
                try {
                    const modelInfo = await AppApi.getAutoInfoByModelName(encodeURIComponent(model));
                    const imgPath = await AppApi.getAutoImageByGenmodelName(encodeURIComponent(model));
                    const res = await GoogleApi.searchFileByName(imgPath.image_name);
                    const img = await GoogleApi.fetchDriveData(res.id);

                    return { model, modelInfo, img };
                } catch {
                    return null;
                }
            });

            var dataForAllPages = await Promise.all(promises);
            dataForAllPages = dataForAllPages.filter(result => result !== null);
            setData(dataForAllPages);
            setFilteredData(dataForAllPages);
            setIsDataLoaded(true);
        };
        fetchData();
    }, [brand]);


    //Setting data for {CurrentPage} Page
    useEffect(() => {
        if (isDataLoaded) {
            var title = document.querySelector('h1');
            title.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setDataForPage(filteredData.slice((currentPage - 1) * cardsOnPage, currentPage * cardsOnPage));
        }
    }, [currentPage]);

    useEffect(() => {
        var filteredModels = data.filter((model) => model.model.toLowerCase().startsWith(input.toLowerCase()));
        setFilteredData(filteredModels);
        setModelsCount(filteredModels.length);
        setDataForPage(filteredModels.slice(0, cardsOnPage));
        setCurrentPage(1);
    }, [input, data]);


    const handleInputChange = (event) => {
        setInput(event.target.value);
    };

    //Returns container with a list of models for the current page
    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    {document.body.classList.remove('scroll-off')}
                    <section className='brand-models-container'>
                            <h1>{brand} brand models <br /> from DriveDreams Hub</h1>
                            <input onChange={handleInputChange} value={input} placeholder='Model Name' />
                            {!isDataLoaded && input.length > 0 ? <h2>Searching for models</h2> : <h2>{modelsCount} car models meet your requests</h2>}
                        {<PaginationList currentPage={currentPage}
                            lastPage={Math.ceil(modelsCount / cardsOnPage)}
                            maxItems={cardsOnPage} data={dataForPage}
                            onChangePage={nextPage}
                            ListItemComponent={AutoModelCard} />}
                    </section>
                </>
            )}
        </>
    );

}

export default Models;
