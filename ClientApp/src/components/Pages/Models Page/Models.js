import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Models.css';
import Loader from '../../Loader/Loader';
import GoogleApi from '../../Api&Services/GoogleApi';
import AppApi from '../../Api&Services/AppApi';
import PaginationList from '../../Pagenation List/PaginationList';
import AutoModelCard from './AutoModelCard';
import { modelsBodyTypes } from '../../StaticData';
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
                    const img = await GoogleApi.getImageSrc(res.id);
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

    const dollarIcon = (
        <svg className='input-icon' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ fill: 'white' }}>
            <path d="M15.999 8.5h2c0-2.837-2.755-4.131-5-4.429V2h-2v2.071c-2.245.298-5 1.592-5 4.429 0 2.706 2.666 4.113 5 4.43v4.97c-1.448-.251-3-1.024-3-2.4h-2c0 2.589 2.425 4.119 5 4.436V22h2v-2.07c2.245-.298 5-1.593 5-4.43s-2.755-4.131-5-4.429V6.1c1.33.239 3 .941 3 2.4zm-8 0c0-1.459 1.67-2.161 3-2.4v4.799c-1.371-.253-3-1.002-3-2.399zm8 7c0 1.459-1.67 2.161-3 2.4v-4.8c1.33.239 3 .941 3 2.4z"></path>
        </svg>
    );

    //Returns container with a list of models for the current page
    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    {document.body.classList.remove('scroll-off')}
                        <section className='brand-models-container'>
                            <div className='navigation'>
                                <a className='nav-btn' href='/'>Brands</a>
                                <svg className='nav-arrow' xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" style={{fill:'white'}}><path d="M10.061 19.061 17.121 12l-7.06-7.061-2.122 2.122L12.879 12l-4.94 4.939z"></path></svg>
                                <a className='nav-btn active' href={`/models/${brand}`}>{brand}</a>
                            </div>
                        <h1>{brand} brand models <br /> from DriveDreams Hub</h1>
                        <div className='filters'>
                            <InputFilter handleOnChange={handleInputChange} value={filters.modelName} placeholder='Model Name' classes={'filter'} />
                            <SelectFilter handleOnChange={handleSelectChange} id='selectFilter1' title='All Types' options={modelsBodyTypes} />
                                <InputFilter handleOnChange={handleMinPriceChange} value={filters.minPrice} placeholder='min price' classes={'filter price-filter'} icon={dollarIcon} />
                                <InputFilter handleOnChange={handleMaxPriceChange} value={filters.maxPrice} placeholder='max price' classes={'filter price-filter'} icon={dollarIcon} />
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
