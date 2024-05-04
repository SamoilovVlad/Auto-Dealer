import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FilterFromTo, CheckboxFilter, SelectDropListFilter, SearchFilterContainer, CheckboxFilterContainer } from '../../Filters/Filters';
import { makers, colors, modelsBodyTypes } from '../../StaticData';
import SearchFilter from '../Home Page/SearchFilter/SearchFilter';
import './FilteredAutosPage.css';

const FilteredAutosPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [filtersValue, setFiltersValue] = useState(null);

    // Функція для оновлення URL з новими значеннями фільтрів
    const updateURLWithFilters = (newFiltersValue) => {
        const searchParams = new URLSearchParams();

        // Додаємо всі параметри фільтрів до URL
        Object.entries(newFiltersValue).forEach(([key, value]) => {
            // Перевіряємо, чи значення не порожнє чи null, перед додаванням
            if (value !== null && value !== '') {
                if (Array.isArray(value)) {
                    // Якщо значення - масив, приєднуємо його до URL як перелік значень
                    searchParams.set(key, value.join(','));
                } else {
                    searchParams.set(key, value);
                }
            }
        });

        // Оновлюємо URL
        navigate({ search: searchParams.toString() });
    };

    const parseParam = (param) => {
        const value = parseFloat(param);
        return isNaN(value) || param === '' ? null : value;
    };

    useEffect(() => {
        // Отримуємо значення фільтрів із URL при завантаженні сторінки
        const searchParams = new URLSearchParams(location.search);
        const newFiltersValue = {
            priceFrom: parseParam(searchParams.get('priceFrom')),
            priceTo: parseParam(searchParams.get('priceTo')),
            milesFrom: parseParam(searchParams.get('milesFrom')),
            milesTo: parseParam(searchParams.get('milesTo')),
            gearboxType: searchParams.get('gearboxType') ? searchParams.get('gearboxType').split(',') : [],
            fuelType: searchParams.get('fuelType') ? searchParams.get('fuelType').split(',') : [],
            brand: searchParams.get('brand'),
            model: searchParams.get('model'),
            bodyType: searchParams.get('bodyType'),
            color: searchParams.get('color'),
        };

        setFiltersValue(newFiltersValue);
    }, [location.search]);

    // Обробка зміни значень фільтрів
    const handleFilterChange = (updatedFiltersValue) => {
        setFiltersValue(updatedFiltersValue);
        updateURLWithFilters(updatedFiltersValue);
    };

    // Обробники подій для різних фільтрів
    const handlePriceFromChange = (event) => {
        const value = event.target.value;
        if (!isNaN(value) && value >= 0) {
            const updatedFiltersValue = {
                ...filtersValue,
                priceFrom: isNaN(parseInt(value, 10)) ? null : parseInt(value, 10),
            };
            handleFilterChange(updatedFiltersValue);
        }
    };

    const handlePriceToChange = (event) => {
        const value = event.target.value;
        if (!isNaN(value) && value >= 0) {
            const updatedFiltersValue = {
                ...filtersValue,
                priceTo: isNaN(parseInt(value, 10)) ? null : parseInt(value, 10),
            };
            handleFilterChange(updatedFiltersValue);
        }
    };

    const handleGearboxTypeChange = (type) => {
        setFiltersValue((prevValue) => {
            const updatedGearboxType = prevValue.gearboxType.includes(type)
                ? prevValue.gearboxType.filter((item) => item !== type)
                : [...prevValue.gearboxType, type];
            return {
                ...prevValue,
                gearboxType: updatedGearboxType,
            };
        });
    };
    // Інші обробники подій для різних фільтрів можуть бути схожими, як показано вище

    // Ваша логіка рендерінгу компонентів
    return (
        filtersValue && <SearchFilter initialFilters={filtersValue} isOpen={true} />
    );
};

export default FilteredAutosPage;
