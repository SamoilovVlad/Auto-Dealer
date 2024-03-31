import React, { useState, useEffect } from 'react';
import './Filters.css';

const dataForFilters = {
    modelsBodyTypes: [
        { name: 'All types', value: '' },
        { name: 'SUV', value: 'SUV' },
        { name: 'Saloon', value: 'Saloon' },
        { name: 'Hatchback', value: 'Hatchback' },
        { name: 'Convertible', value: 'Convertible' },
        { name: 'MPV', value: 'MPV' },
        { name: 'Coupe', value: 'Coupe' },
        { name: 'Manual', value: 'Manual' }
    ]
};

export function InputFilter({ placeholder, value, handleOnChange, classes }) {
    return (
        <input
            className={classes}
            value={value}
            onChange={handleOnChange}
            placeholder={placeholder}
        />
    );
}

export function SelectFilter({ handleOnChange, id, title }) {
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        function handleClickOutside(event) {
            if (!document.getElementById(id).contains(event.target)) {
                setIsActive(false);
            }
        }

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [id]);

    function onClickPseudoSelector() {
        setIsActive(!isActive);
    }

    function onOptionClick(option) {
        document.querySelector(`#${id} .selected`).textContent = option.name;
        handleOnChange(option.value);
        setIsActive(false);
    }

    return (
        <div className={`pseudo-select ${isActive ? 'active' : ''}`} id={id}>
            <span className="selected filter" onClick={onClickPseudoSelector}>{title}</span>
            <ul className="options-list">
                {dataForFilters.modelsBodyTypes.map((option, index) => (
                    <li
                        key={index}
                        className="option"
                        value={option.value}
                        onClick={() => onOptionClick(option)}
                    >
                        {option.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}
