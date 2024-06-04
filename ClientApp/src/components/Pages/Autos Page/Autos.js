import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AppApi from '../../Api&Services/AppApi';
import GoogleApi from '../../Api&Services/GoogleApi';
import Loader from '../../Loader/Loader';
import PaginationList from '../../Pagenation List/PaginationList';
import AutoCard from './Auto Card/AutoCard';
import { InputFilter, SelectFilter } from '../../Filters/Filters';
import { modelsBodyTypes, gearboxTypes, fuelTypes } from '../../StaticData';
import { useCart } from '../../Layout/Cart/CartContext';
import './Autos.css'

const Autos = () => {
    const { brand, modelName, pageNumber, pageSize, bodyType, gearboxType, fuelType, minPrice, maxPrice } = useParams();
    const [autosData, setAutosData] = useState([]);
    const [autoCount, setAutoCount] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [filters, setFilters] = useState({
        bodyType: bodyType ? bodyType.trim() : null,
        gearboxType: gearboxType ? gearboxType.trim() : null,
        fuelType: fuelType ? fuelType.trim() : null,
        minPrice: minPrice,
        maxPrice: maxPrice
    });
    const { cartItems } = useCart();
    console.log(cartItems);

    useEffect(() => {
        console.log(cartItems);
    }, [cartItems]);

    useEffect(() => {
        setIsLoading(true);
        const fetchData = async () => {
            try {
                const autos = await AppApi.getAutosByMakerAndModelNames(brand, modelName, pageNumber, pageSize, filters);

                const ImgPredictedViewPoint = 135;
                const promises = autos.models.map(async (modelInfo) => {
                    try {
                        const imageModels = await AppApi.getAutoImagesById(modelInfo.adv_ID);
                        var imageModel = imageModels.find(img => img.predicted_viewpoint <= ImgPredictedViewPoint);
                        var res;
                        //If we can`t find image with good view, we take first existing image of this car.
                        imageModel ? res = await GoogleApi.searchFileByName(imageModel.image_name) : res = await GoogleApi.searchFileByName(imageModels[0].image_name);
                        const img = await GoogleApi.getImageSrc(res.id);

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

    const makeUrl = (brand, modelName, pageNumber, pageSize, filters) => {
        return `/model/${brand}/${modelName}/page/${pageNumber}/pageSize/${pageSize}` +
            `${filters && filters.bodyType ? `/${filters.bodyType}` : '/ '}` +
            `${filters && filters.gearboxType ? `/${filters.gearboxType}` : '/ '}` +
            `${filters && filters.fuelType ? `/${filters.fuelType}` : '/ '}` +
            `${filters && filters.minPrice ? `/${filters.minPrice}` : '/' + 0}` +
            `${filters && filters.maxPrice ? `/${filters.maxPrice}` : '/' + 2147483647}`;
    };


    const loadPage = (pageNumber) => {
        const newUrl = makeUrl(brand, modelName, pageNumber, pageSize, filters);
        window.location.href = newUrl;
    }

    //Filtering functions
    const handleBodyTypeChange = (bodyType) => {
        setFilters({ ...filters, bodyType: bodyType })
    };
    const handleGearboxTypeChange = (gearBox) => {
        setFilters({ ...filters, gearboxType: gearBox })
    };
    const handleFuelTypeChange = (fuelType) => {
        setFilters({ ...filters, fuelType: fuelType })
    };
    const handleMinPriceChange = (event) => {
        setFilters({ ...filters, minPrice: event.target.value })
    };
    const handleMaxPriceChange = (event) => {
        setFilters({ ...filters, maxPrice: event.target.value })
    };

    const findByFilters = () => {
        const url = makeUrl(brand, modelName, 1, pageSize, filters);
        window.location.href = url;
    }

    const dollarIcon = (
        <svg className='input-icon' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ fill: 'white' }}>
            <path d="M15.999 8.5h2c0-2.837-2.755-4.131-5-4.429V2h-2v2.071c-2.245.298-5 1.592-5 4.429 0 2.706 2.666 4.113 5 4.43v4.97c-1.448-.251-3-1.024-3-2.4h-2c0 2.589 2.425 4.119 5 4.436V22h2v-2.07c2.245-.298 5-1.593 5-4.43s-2.755-4.131-5-4.429V6.1c1.33.239 3 .941 3 2.4zm-8 0c0-1.459 1.67-2.161 3-2.4v4.799c-1.371-.253-3-1.002-3-2.399zm8 7c0 1.459-1.67 2.161-3 2.4v-4.8c1.33.239 3 .941 3 2.4z"></path>
        </svg>
    );

    return (
        <>
            {isLoading ? (
                <Loader />
            ) :
                (<section className='autos-catalog-container'>
                    {document.body.classList.remove('scroll-off')}
                    <div className='navigation'>
                        <a className='nav-btn' href='/'>Brands</a>
                        <svg className='nav-arrow' xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" style={{ fill: 'white' }}><path d="M10.061 19.061 17.121 12l-7.06-7.061-2.122 2.122L12.879 12l-4.94 4.939z"></path></svg>
                        <a className='nav-btn' href={`/models/${brand}`}>{brand}</a>
                        <svg className='nav-arrow' xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" style={{ fill: 'white' }}><path d="M10.061 19.061 17.121 12l-7.06-7.061-2.122 2.122L12.879 12l-4.94 4.939z"></path></svg>
                        <a className='nav-btn active' href={`/model/${brand}/${modelName}/page/1/pageSize/12`}>{modelName}</a>
                    </div>
                    <h1 className='title'>Choose your ideal {brand} {modelName}</h1>
                    <div className='filters-container'>
                        <SelectFilter title={filters.bodyType > 1 ? filters.bodyType : 'Body Type'} id='selectFilter3' options={modelsBodyTypes} handleOnChange={handleBodyTypeChange} />
                        <SelectFilter title={filters.gearboxType ? filters.gearboxType : 'Gearbox Type'} id='selectFilter2' options={gearboxTypes} handleOnChange={handleGearboxTypeChange} />
                        <SelectFilter title={filters.fuelType ? filters.fuelType : 'Fuel Type'} id='selectFilter4' options={fuelTypes} handleOnChange={handleFuelTypeChange} />
                        <div className='price-filter'>
                            <InputFilter placeholder='Min' value={filters.minPrice > 0 ? filters.minPrice : ''} classes='filter' handleOnChange={handleMinPriceChange} icon={dollarIcon} />
                            <InputFilter placeholder='Max' value={filters.maxPrice < 2147483647 ? filters.maxPrice : ''} classes='filter' handleOnChange={handleMaxPriceChange} icon={dollarIcon} />
                        </div>
                    </div>
                    <button className='button search-button' onClick={findByFilters}>Find by filters</button>
                    <h2>{autoCount} cars meet your request</h2>
                    <PaginationList
                        brand={brand}
                        currentPage={parseInt(pageNumber)}
                        lastPage={Math.ceil(autoCount / pageSize)}
                        maxItems={pageSize}
                        data={autosData}
                        onChangePage={loadPage}
                        ListItemComponent={AutoCard}
                        cartList={cartItems || []}
                    />
                </section>
                )}
        </>
    );

}

export default Autos;