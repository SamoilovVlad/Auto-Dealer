import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Models.css';
import Loader from '../../Loader/Loader';
import GoogleApi from '../../Api&Services/GoogleApi';
import AppApi from '../../Api&Services/AppApi';
import PaginationList from '../../Pagenation List/PaginationList';
import AutoModelCard from './AutoModelCard';
import { InputFilter, SelectFilter } from '../../Filters/Filters';


const Models = () => {
    //All dependencies
    const { brand } = useParams();
    const [modelsCount, setModelsCount] = useState();
    const [data, setData] = useState([]);
    const [dataForPage, setDataForPage] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState({ modelName: '', bodyType: '', minPrice: 0, maxPrice: 1000000 });
    const [filteredData, setFilteredData] = useState([]);
    const cardsOnPage = 12;

    //Loading data for all models, and setting data for first page
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);

            const models = await AppApi.getAutoModelsByMakerName(brand);
            setModelsCount(models.length);

            const promises = models.map(async (model) => {
                try {
                    const modelInfo = await AppApi.getAutoInfoByModelName(brand, model);
                    const imgPath = await AppApi.getAutoImageByGenmodelName(brand, model);
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
            setIsLoading(false);
        };
        fetchData();
    }, [brand]);


    //Setting data for {CurrentPage} Page
    useEffect(() => {
        if (document.querySelector('h1')) {
            var title = document.querySelector('h1');
            title.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setDataForPage(filteredData.slice((currentPage - 1) * cardsOnPage, currentPage * cardsOnPage));
        }
    }, [currentPage, filteredData]);

    //Setting filtered data
    useEffect(() => {
        var filteredModels = FilterData(data, filters);
        setFilteredData(filteredModels);
        setModelsCount(filteredModels.length);
        setDataForPage(filteredModels.slice(0, cardsOnPage));
        setCurrentPage(1);
    }, [filters, data]);

    //Set next page
    const nextPage = (page) => {
        setCurrentPage(page);
    };

    //Filtering auto models data
    function FilterData(data, filters) {
        data = data.filter((model) => model.model.toLowerCase().startsWith(filters.modelName.toLowerCase()));
        if (filters.bodyType.length > 0)
            data = data.filter((model) => model.modelInfo.bodyType === filters.bodyType);
        data = data.filter((model) => model.modelInfo.price >= filters.minPrice && model.modelInfo.price <= filters.maxPrice);
        return data;
    }


    ////Functions for setting filters for auto models
    const handleInputChange = (event) => {
        setFilters({ ...filters, modelName: event.target.value })
    };
    const handleSelectChange = (bodyType) => {
        setFilters({ ...filters, bodyType: bodyType })
    };
    const handleMinPriceChange = (event) => {
        setFilters({ ...filters, minPrice: event.target.value })
    };
    const handleMaxPriceChange = (event) => {
        setFilters({ ...filters, maxPrice: event.target.value })
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
                        <div className='filters'>
                            <InputFilter handleOnChange={handleInputChange} value={filters.modelName} placeholder='Model Name' classes={'filter'} />
                            <SelectFilter handleOnChange={handleSelectChange} id='selectFilter1' title='All Types'/>
                            <InputFilter handleOnChange={handleMinPriceChange} value={filters.minPrice} placeholder='min price' classes={'filter price-filter'} />
                            <InputFilter handleOnChange={handleMaxPriceChange} value={filters.maxPrice} placeholder='max price' classes={'filter price-filter'} />
                        </div>
                        <h2>{modelsCount} car models meet your requests</h2>
                            {<PaginationList currentPage={currentPage}
                            brand={brand}
                            lastPage={Math.ceil(modelsCount / cardsOnPage)}
                            maxItems={cardsOnPage}
                            data={dataForPage}
                            onChangePage={nextPage}
                            ListItemComponent={AutoModelCard} />}
                    </section>
                </>
            )}
        </>
    );

}

export default Models;
