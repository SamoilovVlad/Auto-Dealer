import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AppApi from '../../Api&Services/AppApi';
import GoogleApi from '../../Api&Services/GoogleApi';
import PaginationList from '../../Pagenation List/PaginationList';
import AutoCard from '../Autos Page/Auto Card/AutoCard';
import SearchFilter from '../Home Page/SearchFilter/SearchFilter';

import './FilteredAutosPage.css';
import Loader from '../../Loader/Loader';


// Fetches auto data based on the provided filters 
const FilteredAutosData = async (filters) => {
    const response = await fetch(`/Autos/filteredAutos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(filters),
    });

    if (response.ok) {
        const result = await response.json();
        return result;
    } else {
        console.error('Failed to apply filters');
    }
};

const processModelInfo = async (modelInfo, ImgPredictedViewPoint) => {
    try {
        const imageModels = await AppApi.getAutoImagesById(modelInfo.adv_ID);
        const imageModel = imageModels.find(img => img.predicted_viewpoint <= ImgPredictedViewPoint);

        const res = imageModel
            ? await GoogleApi.searchFileByName(imageModel.image_name)
            : await GoogleApi.searchFileByName(imageModels[0].image_name);

        const img = await GoogleApi.fetchDriveData(res.id);

        return img && modelInfo ? { modelInfo, img, model: modelInfo.genmodel } : null;
    } catch (error) {
        console.error('Error fetching image data:', error);
        return null;
    }
};

const FilteredAutosPage = () => {
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(false);
    const [filtersValue, setFiltersValue] = useState(null);
    const [autosData, setAutosData] = useState(null);
    const [totalAutoCount, setTotalAutoCount] = useState(null)
    const [currentPage, setCurrentPage] = useState(null);
    const [autoPerPage, setAutoPerPage] = useState(null);
    const [isFilterOpen, setIsFilterOpen] = useState(true);

    const parseIntParam = (param) => {
        const value = parseInt(param);
        return isNaN(value) || param === '' ? null : value;
    };
    const parseStirngParam = (param) => {
        return param === '' || param === 'null' ? null : param;
    };

    // Fetches filtered auto data when location.search changes
    useEffect(() => {
        setIsLoading(true);
        const getFilteresAndAutosData = async () => {
            const searchParams = new URLSearchParams(location.search);
            const newFiltersValue = {
                priceFrom: parseIntParam(searchParams.get('priceFrom')),
                priceTo: parseIntParam(searchParams.get('priceTo')),
                milesFrom: parseIntParam(searchParams.get('milesFrom')),
                milesTo: parseIntParam(searchParams.get('milesTo')),
                gearboxType: searchParams.get('gearboxType') ? searchParams.get('gearboxType').split(',') : [],
                fuelType: searchParams.get('fuelType') ? searchParams.get('fuelType').split(',') : [],
                brand: parseStirngParam(searchParams.get('brand')),
                model: parseStirngParam(searchParams.get('model')),
                bodyType: parseStirngParam(searchParams.get('bodyType')),
                color: parseStirngParam(searchParams.get('color')),
                page: parseIntParam(searchParams.get('page')),
                autoPerPage: parseIntParam(searchParams.get('autoPerPage'))
            };

            setCurrentPage(newFiltersValue.page);
            setAutoPerPage(newFiltersValue.autoPerPage);
            setFiltersValue(newFiltersValue);
            var data = await FilteredAutosData(newFiltersValue);
            setTotalAutoCount(data.totalCount);
            const ImgPredictedViewPoint = 135;
            const promises = data.autos.map(async (modelInfo) => processModelInfo(modelInfo, ImgPredictedViewPoint));

            var processedAutosData = await Promise.all(promises);
            setAutosData(processedAutosData);
            setIsLoading(false);
        }
        getFilteresAndAutosData();
    }, [location.search]);


    const getPage = (pageNumber) => {
        filtersValue.page = pageNumber;
        const href = `/filteredAutos?${new URLSearchParams(filtersValue).toString()}`;
        window.location.href = href;
    }


    return (
        isLoading ? <Loader /> :
            <section className='filtered-autos-container'>
                {document.body.classList.remove('scroll-off')}
                <h1 className='filtered-autos-container-title'>Customize Your Search</h1>
                {filtersValue ? <SearchFilter initialFilters={filtersValue} isOpen={isFilterOpen} closeFunction={() => { setIsFilterOpen(!isFilterOpen) }} /> : null}
                <h2 className='sub-title'>Find Your Perfect Car</h2>
                {autosData && totalAutoCount ? <PaginationList currentPage={currentPage} lastPage={(Math.ceil(totalAutoCount / autoPerPage)).toFixed(0)} data={autosData} onChangePage={getPage} ListItemComponent={AutoCard} /> : null}
            </section>
    );
};

export default FilteredAutosPage;
