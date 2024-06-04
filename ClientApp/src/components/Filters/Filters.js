import React, { useState, useEffect, Children } from 'react';
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
            <svg className='dropdown-icon' onClick={onClickPseudoSelector} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ fill: 'white', position: 'absolute', top: '8px', right: '5px', cursor: 'pointer' }} ><path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path></svg>
        </div>
    );
}

export function FilterFromTo({ onChangeFromInput, onChangeToInput, valueFrom, valueTo }) {

    const handleFocus = (event) => {
        event.target.placeholder = '';
    };

    return (
        <div className='filter-from-to-container'>
            <input className='filter-from-to' placeholder='from' onFocus={handleFocus} onBlur={(event) => { event.target.placeholder = 'from' }} onChange={onChangeFromInput} value={valueFrom?valueFrom:''}></input>
            <span style={{ fontSize: '32px' }}>-</span>
            <input className='filter-from-to' placeholder='to' onFocus={handleFocus} onBlur={(event) => { event.target.placeholder = 'to' }} onChange={onChangeToInput} value={valueTo?valueTo:''}></input>
        </div>
    );
}


export function CheckboxFilter({ label, onClick, isChecked }) {

    return (
        <div className={`checkbox-wrapper ${isChecked ?'active':''}`}>
            <label className="checkbox">
                <input className="checkbox__trigger visuallyhidden" type="checkbox" onClick={onClick} />
                <span className="checkbox__symbol" >
                    <svg aria-hidden="true" className="icon-checkbox" width="28px" height="28px" viewBox="0 0 28 28" version="1" xmlns="http://www.w3.org/2000/svg" >
                        <path d="M4 14l8 7L24 7" > </path >
                    </svg >
                </span >
                <p className="checkbox__textwrapper" > {label}</p >
            </label >
        </div >
    );
}


export function SelectDropListFilter({ selectedOption, isOpen, label, data, toggleDropdown, handleOptionClick, disabled = false }) {

    return (
        <div className={`box ${isOpen ? 'open' : ''} ${disabled ? 'disabled' : ''}`}>
            <button className="dropdown-button" onClick={toggleDropdown}>
                {selectedOption || label}
            </button>
            {(
                <ul className="dropdown-list">
                    {data.map((option, index) => (
                        <li
                            key={index}
                            className="dropdown-list-item"
                            onClick={() => handleOptionClick(option)}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
            <svg className='dropdown-icon' onClick={toggleDropdown} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ fill: 'white', position: 'absolute', top: '4px', right: '5px', cursor: 'pointer' }} ><path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path></svg>
        </div>
    );
}

export function SearchFilterContainer({ title, children }) {
    return (
        <div className='search-filter-container'>
            <span className='search-filter-title'>{title}</span>
            {children}
        </div>);
}

export function CheckboxFilterContainer({ title, children }) {
    return (
        <div className='search-filter-container'>
            <span className='search-filter-title'>{title}</span>
            <div className='checkbox-filters-container'>
                {children}
            </div>
        </div>);
}