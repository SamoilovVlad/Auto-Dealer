import React, { useState, useEffect, useReducer } from 'react';
import { FilterFromTo, CheckboxFilter, SelectDropListFilter, SearchFilterContainer, CheckboxFilterContainer } from '../../../Filters/Filters';
import { makers, colors, modelsBodyTypes } from '../../../StaticData';
import AppApi from '../../../Api&Services/AppApi';
import './SearchFilter.css';

const initialState = {
    brand: { isOpen: false, selectedOption: null },
    model: { isOpen: false, selectedOption: null, options: [] },
    bodyType: { isOpen: false, selectedOption: null },
    color: { isOpen: false, selectedOption: null },
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case 'TOGGLE_DROPDOWN':
            const updatedState = Object.keys(state).reduce((acc, key) => {
                acc[key] = { ...state[key], isOpen: false };
                return acc;
            }, {});
            return {
                ...updatedState,
                [action.dropdownType]: {
                    ...state[action.dropdownType],
                    isOpen: !state[action.dropdownType].isOpen,
                },
            };
        case 'SELECT_OPTION':
            const isBrand = action.dropdownType === 'brand';
            return {
                ...state,
                model: isBrand
                    ? { ...state.model, selectedOption: null, isOpen: false }
                    : state.model,
                [action.dropdownType]: {
                    ...state[action.dropdownType],
                    selectedOption: action.option,
                    isOpen: false,
                },
            };
        case 'SET_MODEL_OPTIONS':
            return {
                ...state,
                model: {
                    ...state.model,
                    options: action.options,
                },
            };
        default:
            return state;
    }
}

const SearchFilter = ({ isOpen, closeFunction, initialFilters = {} }) => {
    const [filtersValue, setFiltersValue] = useState({
        priceFrom: initialFilters.priceFrom || null,
        priceTo: initialFilters.priceTo || null,
        milesFrom: initialFilters.milesFrom || null,
        milesTo: initialFilters.milesTo || null,
        gearboxType: initialFilters.gearboxType || [],
        fuelType: initialFilters.fuelType || [],
        brand: initialFilters.brand || '',
        model: initialFilters.model || '',
        bodyType: initialFilters.bodyType || '',
        color: initialFilters.color || '',
    });

    const [filteredAutosCount, setFilteredAutosCount] = useState(null);
    const [isClearBtnActive, setIsClearBtnActive] = useState(false);

    const [state, dispatch] = useReducer(reducer, {
        brand: { isOpen: false, selectedOption: initialFilters.brand || null },
        model: { isOpen: false, selectedOption: initialFilters.model || null, options: [] },
        bodyType: { isOpen: false, selectedOption: initialFilters.bodyType || null },
        color: { isOpen: false, selectedOption: initialFilters.color || null },
    });

    const handleToggleDropdown = (dropdownType) => {
        dispatch({ type: 'TOGGLE_DROPDOWN', dropdownType });
    };

    const handleSelectOption = (dropdownType, option) => {
        dispatch({ type: 'SELECT_OPTION', dropdownType, option });
    };

    //useEffect after selected option in dropdown filters was chenged
    useEffect(() => {
        setFiltersValue((prevValue) => ({
            ...prevValue,
            brand: state.brand.selectedOption,
            model: state.model.selectedOption,
            bodyType: state.bodyType.selectedOption,
            color: state.color.selectedOption,
        }));
    }, [state.brand.selectedOption, state.model.selectedOption, state.bodyType.selectedOption, state.color.selectedOption]);

    const clearFilters = () => {
        handleSelectOption('brand', 'All brands');
        handleSelectOption('model', 'All models');
        handleSelectOption('bodyType', 'All types');
        handleSelectOption('color', 'All colors');
        setFiltersValue((prevValue) => ({
            ...prevValue,
            priceTo: null,
            priceFrom: null,
            milesFrom: null,
            milesTo: null,
            fuelType: [],
            gearboxType: [],
            brand: '',
            model: '',
            bodyType: '',
            color: '',

        }));
    }


    //Getting all modelNames when brand was choosen
    useEffect(() => {
        const fetchData = async () => {
            if (state.brand.selectedOption) {
                var data = await AppApi.getAutoModelsByMakerName(state.brand.selectedOption);
                data.unshift('All models');
                dispatch({ type: 'SET_MODEL_OPTIONS', options: data });
            }
        };
        fetchData();
    }, [state.brand.selectedOption]);

    function hasNonEmptyValues(filters) {
        for (let key in filters) {
            const value = filters[key];
            if (
                value !== null &&
                value !== undefined &&
                !(Array.isArray(value) && value.length === 0) &&
                !(typeof value === 'string' && value.trim() === '')
            ) {
                return true;
            }
        }
        return false;
    }

    const checkIsClearBtnActive = () => {
        setIsClearBtnActive(hasNonEmptyValues(filtersValue));
    }

    // Handle changes for price filter
    const handlePriceFromChange = (event) => {
        const value = event.target.value;
        if (!isNaN(value) && value >= 0) {
            setFiltersValue((prevValue) => ({
                ...prevValue,
                priceFrom: isNaN(parseInt(value, 10)) ? null : parseInt(value, 10),
            }));
        }
    };

    const handlePriceToChange = (event) => {
        const value = event.target.value;
        if (!isNaN(value) && value >= 0) {
            setFiltersValue((prevValue) => ({
                ...prevValue,
                priceTo: isNaN(parseInt(value, 10)) ? null : parseInt(value, 10),
            }));
        }
    };

    // Handle changes for runned miles filter
    const handleMilesFromChange = (event) => {
        const value = event.target.value;
        if (!isNaN(value) && value >= 0) {
            setFiltersValue((prevValue) => ({
                ...prevValue,
                milesFrom: isNaN(parseInt(value, 10)) ? null : parseInt(value, 10),
            }));
        }
    };

    const handleMilesToChange = (event) => {
        const value = event.target.value;
        if (!isNaN(value) && value >= 0) {
            setFiltersValue((prevValue) => ({
                ...prevValue,
                milesTo: isNaN(parseInt(value, 10)) ? null : parseInt(value, 10),
            }));
        }
    };

    // Handle changes for gearbox type filter
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

    // Handle changes for fuel type filter
    const handleFuelTypeChange = (type) => {
        setFiltersValue((prevValue) => {
            const updatedFuelType = prevValue.fuelType.includes(type)
                ? prevValue.fuelType.filter((item) => item !== type)
                : [...prevValue.fuelType, type];
            return {
                ...prevValue,
                fuelType: updatedFuelType,
            };
        });
    };

    // Fetch data when filtersValue changes
    useEffect(() => {
        const applyFilters = async () => {
            const matchAutosCount = await searchByFilters();
            setFilteredAutosCount(matchAutosCount);
        };
        if (filtersValue) {
            applyFilters();
            checkIsClearBtnActive();
        }
    }, [filtersValue]);

    const searchByFilters = async () => {
        filtersValue.brand = filtersValue.brand === 'All brands' ? null : filtersValue.brand;
        filtersValue.model = filtersValue.model === 'All models' ? null : filtersValue.model;
        filtersValue.bodyType = filtersValue.bodyType === 'All types' ? null : filtersValue.bodyType;
        filtersValue.color = filtersValue.color === 'All colors' ? null : filtersValue.color;
        const response = await fetch('/Autos/filters/apply', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(filtersValue),
        });

        if (response.ok) {
            const result = await response.json();
            return result;
        } else {
            console.error('Failed to apply filters');
        }
    };

    return (
        <div className={`search-filter-view ${isOpen ? 'open' : ''}`}>
            <div className='search-filter-view-header'>
                <span className='search-filter-view-title'>Filters</span>
                <div onClick={clearFilters} className={`clear-filters-btn ${isClearBtnActive?'active':''}`}>Clear filters</div>
                <div className='close-search-filter-view-btn' onClick={closeFunction}></div>
            </div>
            <div className='search-filters-container'>
                <SearchFilterContainer title='Price'>
                    <FilterFromTo
                        onChangeFromInput={handlePriceFromChange}
                        onChangeToInput={handlePriceToChange}
                        valueFrom={filtersValue.priceFrom}
                        valueTo={filtersValue.priceTo}
                    />
                </SearchFilterContainer>
                <SearchFilterContainer title='Runned miles'>
                    <FilterFromTo
                        onChangeFromInput={handleMilesFromChange}
                        onChangeToInput={handleMilesToChange}
                        valueFrom={filtersValue.milesFrom}
                        valueTo={filtersValue.milesTo}
                    />
                </SearchFilterContainer>
                <CheckboxFilterContainer title='Gearbox Type'>
                    <CheckboxFilter
                        label='Auto'
                        onClick={() => handleGearboxTypeChange('auto')}
                        isChecked={filtersValue.gearboxType.includes('auto')}
                    />
                    <CheckboxFilter
                        label='Semi-Auto'
                        onClick={() => handleGearboxTypeChange('semiAuto')}
                        isChecked={filtersValue.gearboxType.includes('semiAuto')}
                    />
                    <CheckboxFilter
                        label='Manual'
                        onClick={() => handleGearboxTypeChange('manual')}
                        isChecked={filtersValue.gearboxType.includes('manual')}
                    />
                </CheckboxFilterContainer>
                <CheckboxFilterContainer title='Fuel Type'>
                    <CheckboxFilter
                        label='Petrol'
                        onClick={() => handleFuelTypeChange('petrol')}
                        isChecked={filtersValue.fuelType.includes('petrol')}
                    />
                    <CheckboxFilter
                        label='Diesel'
                        onClick={() => handleFuelTypeChange('diesel')}
                        isChecked={filtersValue.fuelType.includes('diesel')}
                    />
                    <CheckboxFilter
                        label='Electric'
                        onClick={() => handleFuelTypeChange('electric')}
                        isChecked={filtersValue.fuelType.includes('electric')}
                    />
                </CheckboxFilterContainer>
                <div className='droplist-filters-container'>
                    <CheckboxFilterContainer title='Brand'>
                        <SelectDropListFilter
                            data={makers}
                            label='Select brand'
                            selectedOption={state.brand.selectedOption}
                            isOpen={state.brand.isOpen}
                            toggleDropdown={() => handleToggleDropdown('brand')}
                            handleOptionClick={(option) => handleSelectOption('brand', option)}
                        />
                    </CheckboxFilterContainer>
                    <CheckboxFilterContainer title='Model'>
                        <SelectDropListFilter
                            data={state.model.options}
                            label='Select model'
                            selectedOption={state.model.selectedOption}
                            isOpen={state.model.isOpen}
                            toggleDropdown={() => handleToggleDropdown('model')}
                            handleOptionClick={(option) => handleSelectOption('model', option)}
                            disabled={!state.brand.selectedOption}
                        />
                    </CheckboxFilterContainer>
                </div>
                <div className='droplist-filters-container'>
                    <CheckboxFilterContainer title='Body Type'>
                        <SelectDropListFilter
                            data={modelsBodyTypes.map((item) => item.name)}
                            label='Select body type'
                            selectedOption={state.bodyType.selectedOption}
                            isOpen={state.bodyType.isOpen}
                            toggleDropdown={() => handleToggleDropdown('bodyType')}
                            handleOptionClick={(option) => handleSelectOption('bodyType', option)}
                        />
                    </CheckboxFilterContainer>
                    <CheckboxFilterContainer title='Color'>
                        <SelectDropListFilter
                            data={colors}
                            label='Select color'
                            selectedOption={state.color.selectedOption}
                            isOpen={state.color.isOpen}
                            toggleDropdown={() => handleToggleDropdown('color')}
                            handleOptionClick={(option) => handleSelectOption('color', option)}
                        />
                    </CheckboxFilterContainer>
                </div>
            </div>
            <div className='filter-view-bottom'>
                <span className='filter-count'>Found <span style={{ fontSize: '20px', fontWeight: '700' }}>{filteredAutosCount}</span> autos</span>
                <a className='filter-btn' href={`/filteredAutos?${new URLSearchParams(filtersValue).toString()}&page=1&autoPerPage=12`}>Apply filters</a>
            </div>
        </div>
    );
};

export default SearchFilter;
