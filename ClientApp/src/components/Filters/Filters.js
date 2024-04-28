import React, { useState, useEffect } from 'react';
import './Filters.css';


export function InputFilter({ placeholder, value, handleOnChange, classes, icon }) {
    return (
        <div className='input-filter-container'>
            <input
                className={classes}
                value={value}
                onChange={handleOnChange}
                placeholder={placeholder}
            />
            {icon}
        </div>
    );
}

export function SelectFilter({ handleOnChange, id, title, options }) {
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
        if (handleOnChange !== undefined) {
            handleOnChange(option.value);
        }
        setIsActive(false);
    }

    return (
        <div className={`pseudo-select ${isActive ? 'active' : ''}`} id={id}>
            <span className="selected filter" onClick={onClickPseudoSelector}>{title}</span>
            <ul className="options-list">
                {options.map((option, index) => (
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
