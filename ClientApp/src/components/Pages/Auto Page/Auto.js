﻿import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../../Loader/Loader';
import AppApi from '../../Api&Services/AppApi';
import GoogleApi from '../../Api&Services/GoogleApi';
import './Auto.css';
import Slider from './slider';
import Button from '../../Button/Button';

const AutoPage = () => {
    const { brand, modelName, advId } = useParams();
    const [autoData, setAutoData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [imgData, setImgData] = useState(null);

    const fetchAutoData = async () => {
        try {
            setIsLoading(true);
            const autoInfo = await AppApi.getAutoInfoByAdvId(advId);
            setAutoData(autoInfo);

            const imagePaths = await AppApi.getAutoImagesById(advId);
            const imagesPromises = imagePaths.map(async (imgPath) => {
                const imgSearchResult = await GoogleApi.searchFileByName(imgPath.image_name);
                if (imgSearchResult && imgSearchResult.id) {
                    return await GoogleApi.fetchDriveData(imgSearchResult.id);
                }
                return null;
            });

            const images = await Promise.all(imagesPromises);
            setImgData(images);
        } catch (error) {
            console.error('Error fetching auto data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAutoData();
        return () => {
            setAutoData([]);
            setImgData(null);
        };
    }, [advId, modelName]);


    const handleSpecificationClick = (event) => {
        const container = event.target.parentNode;
        container.classList.toggle('open');
    };

    const Specification = ({ name, value }) => (
        <div className='specification'>
            <span className='name'>{name}</span>
            <span className='dots'></span>
            <span className='value'>{value ? value : '-'}</span>
        </div>
    );


    const SpecificationBlock = ({ title, children, isOpen }) => (
        <div className={`specification-block ${isOpen ? 'open' : ''}`}>
            <h3 className='sub-title' onClick={handleSpecificationClick}>{title}</h3>
            {children}
        </div>
    );


    return (
        <>
            {
                isLoading ? (
                    <Loader />
                ) : (
                    <section className='auto-page-container'>
                        {document.body.classList.remove('scroll-off')}
                        <div className='navigation'>
                            <a className='nav-btn' href='/'>Brands</a>
                            <svg className='nav-arrow' xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" style={{ fill: 'white' }}><path d="M10.061 19.061 17.121 12l-7.06-7.061-2.122 2.122L12.879 12l-4.94 4.939z"></path></svg>
                            <a className='nav-btn' href={`/models/${brand}`}>{brand}</a>
                            <svg className='nav-arrow' xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" style={{ fill: 'white' }}><path d="M10.061 19.061 17.121 12l-7.06-7.061-2.122 2.122L12.879 12l-4.94 4.939z"></path></svg>
                            <a className='nav-btn' href={`/model/${brand}/${modelName}/page/1/pageSize/12`}>{modelName}</a>
                            <svg className='nav-arrow' xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" style={{ fill: 'white' }}><path d="M10.061 19.061 17.121 12l-7.06-7.061-2.122 2.122L12.879 12l-4.94 4.939z"></path></svg>
                            <p className='nav-btn active'>{brand} {modelName}</p>
                        </div>
                        <h1>{brand} {modelName}</h1>
                        <div className='auto-page-body'>
                            {imgData && <Slider images={imgData} />}
                            <div className='auto-details'>
                                <h2 className='auto-title'>{brand} {modelName}</h2>
                                <p className='auto-sub-title'> {autoData.engin_size ? 'Engine: ' + autoData.engin_size : ' '}
                                    {autoData.engine_power ? '(' + autoData.engine_power + ') hp ' : ' '}
                                    {autoData.adv_year ? ', ' + autoData.adv_year : ' '}
                                </p>
                                <p className='auto-price'>{autoData.price ? 'Current price - ' + autoData.price + '$' : ''}</p>
                                <div className='auto-btns'>
                                    <Button>Add to cart</Button>
                                    <Button>Buy now </Button>
                                </div>
                                <div className='auto-icons'>
                                    <div className='auto-icon'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                                            <path d="M29.0625 10.3125H26.25C25.9908 10.3125 25.7812 10.522 25.7812 10.7812V13.125H24.8438V12.6562C24.8438 12.5316 24.7945 12.4125 24.7064 12.3248L20.9564 8.57484C20.8687 8.48672 20.7497 8.4375 20.625 8.4375H17.3438V7.5H20.1562C20.4155 7.5 20.625 7.29047 20.625 7.03125V5.15625C20.625 4.89703 20.4155 4.6875 20.1562 4.6875H7.96875C7.70953 4.6875 7.5 4.89703 7.5 5.15625V7.03125C7.5 7.29047 7.70953 7.5 7.96875 7.5H10.7812V8.4375H7.03125C6.77203 8.4375 6.5625 8.64703 6.5625 8.90625V12.1875H4.6875C4.42828 12.1875 4.21875 12.397 4.21875 12.6562V14.5312H3.28125V11.7188C3.28125 11.4595 3.07172 11.25 2.8125 11.25H0.9375C0.678281 11.25 0.46875 11.4595 0.46875 11.7188V22.0312C0.46875 22.2905 0.678281 22.5 0.9375 22.5H2.8125C3.07172 22.5 3.28125 22.2905 3.28125 22.0312V19.2188H4.21875V21.5625C4.21875 21.8217 4.42828 22.0312 4.6875 22.0312H8.24344L11.3873 25.1752C11.475 25.2633 11.5941 25.3125 11.7188 25.3125H24.375C24.6342 25.3125 24.8438 25.103 24.8438 24.8438V21.5625H25.7812V23.9062C25.7812 24.1655 25.9908 24.375 26.25 24.375H29.0625C29.3217 24.375 29.5312 24.1655 29.5312 23.9062V10.7812C29.5312 10.522 29.3217 10.3125 29.0625 10.3125ZM2.34375 21.5625H1.40625V12.1875H2.34375V14.5312V15.4688V18.2812V19.2188V21.5625ZM3.28125 18.2812V15.4688H4.21875V18.2812H3.28125ZM8.4375 5.625H19.6875V6.5625H8.4375V5.625ZM11.7188 7.5H16.4062V8.4375H11.7188V7.5ZM23.9062 24.375H11.9128L8.76891 21.2311C8.68125 21.143 8.56219 21.0938 8.4375 21.0938H5.15625V13.125H7.03125C7.29047 13.125 7.5 12.9155 7.5 12.6562V9.375H20.4309L23.9062 12.8503V24.375ZM24.8438 20.625V14.0625H25.7812V20.625H24.8438ZM28.5938 23.4375H26.7188V11.25H28.5938V23.4375Z" fill="#E40C25"></path>
                                            <path d="M13.8806 18.75L13.1489 20.9456C13.08 21.1519 13.162 21.3783 13.3472 21.4927C13.4236 21.5395 13.5084 21.5625 13.5937 21.5625C13.7147 21.5625 13.8351 21.5156 13.9251 21.4252L18.1439 17.2064C18.278 17.0723 18.3183 16.8708 18.2456 16.6955C18.1734 16.5202 18.0019 16.4062 17.8125 16.4062H16.019L18.1683 13.8984C18.2878 13.7597 18.3145 13.5638 18.2381 13.3978C18.1617 13.2319 17.9958 13.125 17.8125 13.125H14.5312C14.3536 13.125 14.1914 13.2253 14.1117 13.3842L11.768 18.0717C11.6953 18.217 11.7028 18.3895 11.7886 18.5278C11.8744 18.6661 12.0248 18.75 12.1875 18.75H13.8806ZM14.8209 14.0625H16.7934L14.6442 16.5703C14.5247 16.7091 14.498 16.905 14.5744 17.0709C14.6508 17.2369 14.8167 17.3438 15 17.3438H16.6809L14.6662 19.3584L14.9756 18.4298C15.0239 18.2869 14.9995 18.1294 14.9114 18.0075C14.8233 17.8847 14.6817 17.8125 14.5312 17.8125H12.9459L14.8209 14.0625Z" fill="#E40C25"></path>
                                            <path d="M22.0312 22.5H22.9688V23.4375H22.0312V22.5Z" fill="#E40C25"></path>
                                            <path d="M12.1875 22.5H21.0938V23.4375H12.1875V22.5Z" fill="#E40C25"></path>
                                        </svg>
                                        <p>{autoData.runned_Miles + ' miles'}</p>
                                    </div>
                                    <div className='auto-icon'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                                            <g clipPath="url(#clip0_777_22141)">
                                                <path d="M27.5 14H26.5C26.1022 14 25.7206 14.158 25.4393 14.4393C25.158 14.7206 25 15.1022 25 15.5V16H24V13.5C24 13.1022 23.842 12.7206 23.5607 12.4393C23.2794 12.158 22.8978 12 22.5 12H21C20.8674 12 20.7402 11.9473 20.6464 11.8536C20.5527 11.7598 20.5 11.6326 20.5 11.5V10.5C20.5 10.1022 20.342 9.72064 20.0607 9.43934C19.7794 9.15804 19.3978 9 19 9H17V7.5H19.5C19.8978 7.5 20.2794 7.34197 20.5607 7.06066C20.842 6.77936 21 6.39783 21 6C21 5.60218 20.842 5.22064 20.5607 4.93934C20.2794 4.65804 19.8978 4.5 19.5 4.5H9.5C9.10218 4.5 8.72064 4.65804 8.43934 4.93934C8.15804 5.22064 8 5.60218 8 6C8 6.39783 8.15804 6.77936 8.43934 7.06066C8.72064 7.34197 9.10218 7.5 9.5 7.5H12V9H9.5C9.10218 9 8.72064 9.15804 8.43934 9.43934C8.15804 9.72064 8 10.1022 8 10.5C8 10.6326 7.94732 10.7598 7.85355 10.8536C7.75979 10.9473 7.63261 11 7.5 11H6C5.60218 11 5.22064 11.158 4.93934 11.4393C4.65804 11.7206 4.5 12.1022 4.5 12.5V14.5H3V12.5C3 12.1022 2.84196 11.7206 2.56066 11.4393C2.27936 11.158 1.89782 11 1.5 11C1.10218 11 0.720644 11.158 0.43934 11.4393C0.158035 11.7206 0 12.1022 0 12.5L0 20.5C0 20.8978 0.158035 21.2794 0.43934 21.5607C0.720644 21.842 1.10218 22 1.5 22C1.89782 22 2.27936 21.842 2.56066 21.5607C2.84196 21.2794 3 20.8978 3 20.5V18.5H4.5V21C4.5 21.3978 4.65804 21.7794 4.93934 22.0607C5.22064 22.342 5.60218 22.5 6 22.5H8.086C8.2186 22.5 8.34575 22.5527 8.4395 22.6465L10.8535 25.0605C10.9924 25.2003 11.1576 25.3111 11.3397 25.3866C11.5217 25.462 11.7169 25.5006 11.914 25.5H22.5C22.8978 25.5 23.2794 25.342 23.5607 25.0607C23.842 24.7794 24 24.3978 24 24V22H25V22.5C25 22.8978 25.158 23.2794 25.4393 23.5607C25.7206 23.842 26.1022 24 26.5 24H27.5C28.1628 23.9992 28.7982 23.7356 29.2669 23.2669C29.7356 22.7982 29.9992 22.1628 30 21.5V16.5C29.9992 15.8372 29.7356 15.2018 29.2669 14.7331C28.7982 14.2644 28.1628 14.0008 27.5 14ZM9 6C9 5.86739 9.05268 5.74022 9.14645 5.64645C9.24021 5.55268 9.36739 5.5 9.5 5.5H19.5C19.6326 5.5 19.7598 5.55268 19.8536 5.64645C19.9473 5.74022 20 5.86739 20 6C20 6.13261 19.9473 6.25979 19.8536 6.35355C19.7598 6.44732 19.6326 6.5 19.5 6.5H9.5C9.36739 6.5 9.24021 6.44732 9.14645 6.35355C9.05268 6.25979 9 6.13261 9 6ZM13 7.5H16V9H13V7.5ZM2 20.5C2 20.6326 1.94732 20.7598 1.85355 20.8536C1.75979 20.9473 1.63261 21 1.5 21C1.36739 21 1.24021 20.9473 1.14645 20.8536C1.05268 20.7598 1 20.6326 1 20.5V12.5C1 12.3674 1.05268 12.2402 1.14645 12.1464C1.24021 12.0527 1.36739 12 1.5 12C1.63261 12 1.75979 12.0527 1.85355 12.1464C1.94732 12.2402 2 12.3674 2 12.5V20.5ZM3 17.5V15.5H4.5V17.5H3ZM23 24C23 24.1326 22.9473 24.2598 22.8536 24.3536C22.7598 24.4473 22.6326 24.5 22.5 24.5H11.914C11.7814 24.5 11.6542 24.4473 11.5605 24.3535L9.1465 21.9395C9.00754 21.7998 8.84227 21.689 8.66024 21.6136C8.47822 21.5382 8.28304 21.4996 8.086 21.5H6C5.86739 21.5 5.74021 21.4473 5.64645 21.3536C5.55268 21.2598 5.5 21.1326 5.5 21V12.5C5.5 12.3674 5.55268 12.2402 5.64645 12.1464C5.74021 12.0527 5.86739 12 6 12H7.5C7.89782 12 8.27936 11.842 8.56066 11.5607C8.84196 11.2794 9 10.8978 9 10.5C9 10.3674 9.05268 10.2402 9.14645 10.1464C9.24021 10.0527 9.36739 10 9.5 10H19C19.1326 10 19.2598 10.0527 19.3536 10.1464C19.4473 10.2402 19.5 10.3674 19.5 10.5V11.5C19.5 11.8978 19.658 12.2794 19.9393 12.5607C20.2206 12.842 20.6022 13 21 13H22.5C22.6326 13 22.7598 13.0527 22.8536 13.1464C22.9473 13.2402 23 13.3674 23 13.5V24ZM24 21V17H25V21H24ZM29 21.5C29 21.8978 28.842 22.2794 28.5607 22.5607C28.2794 22.842 27.8978 23 27.5 23H26.5C26.3674 23 26.2402 22.9473 26.1464 22.8536C26.0527 22.7598 26 22.6326 26 22.5V15.5C26 15.3674 26.0527 15.2402 26.1464 15.1464C26.2402 15.0527 26.3674 15 26.5 15H27.5C27.8978 15 28.2794 15.158 28.5607 15.4393C28.842 15.7206 29 16.1022 29 16.5V21.5Z" fill="#E40C25"></path>
                                            </g>
                                            <defs>
                                                <clip-path id="clip0_777_22141">
                                                    <rect width="30" height="30" fill="white"></rect>
                                                </clip-path>
                                            </defs>
                                        </svg>
                                        <p>{autoData.fuel_type + ', ' + autoData.engin_size}</p>
                                    </div>
                                    <div className='auto-icon'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                                            <path d="M29.991 5.79243C30.0536 5.06953 29.7894 4.36542 29.233 3.75642C28.7392 3.2163 28.0989 2.88021 27.4305 2.81261C26.5362 2.72248 25.6455 3.01563 24.9795 3.61935C24.3536 4.18264 24.0081 4.9337 24.0081 5.73797C24.0081 6.66676 24.3762 7.50419 25.0096 8.04495V12.6852C25.0096 13.1 24.6733 13.4363 24.2585 13.4363H22.7727C22.369 12.3773 21.6749 11.6782 20.6265 11.2764V8.13009C21.6404 7.57366 22.0786 6.59606 21.8658 5.33551C21.6436 4.02117 20.6703 3.01598 19.4436 2.83197C18.6407 2.69919 17.8203 2.92832 17.2023 3.45787C16.5583 4.0099 16.1884 4.84169 16.1884 5.73797C16.1884 6.7056 16.8212 7.533 17.4971 8.05375V11.2764C16.4332 11.6826 15.7115 12.3943 15.3066 13.4364H13.2374C12.8252 13.436 12.4911 13.1019 12.4908 12.6897V8.13015C13.5072 7.57313 13.9466 6.59424 13.7338 5.33311C13.5116 4.01876 12.5377 3.01422 11.311 2.82957C10.5077 2.69643 9.68668 2.92556 9.06841 3.45547C8.41493 4.03179 8.04515 4.86434 8.05572 5.73557C8.05572 6.70379 8.68725 7.53124 9.36132 8.05134V12.6828C9.36132 13.0976 9.02505 13.4339 8.61026 13.4339H4.9802V8.01502C5.77321 7.23891 6.28451 5.88326 5.66431 4.47127C5.47654 4.04317 5.01276 3.53245 4.58466 3.28208C3.54568 2.67249 2.40595 2.63306 1.46279 3.17382C0.551549 3.70619 -0.00611048 4.6845 5.05265e-05 5.73985C5.05265e-05 6.73436 0.58963 7.55054 1.22427 8.05563V14.4221C1.22533 15.6055 2.18445 16.5647 3.36789 16.5657H8.58462C9.01296 16.5664 9.36003 16.9135 9.36073 17.3418V21.8713C8.3349 22.4315 7.89054 23.4122 8.10395 24.6765C8.32615 25.9909 9.30253 26.9923 10.5317 27.1738C10.6756 27.1947 10.8207 27.2054 10.9661 27.2057C11.6306 27.2093 12.2737 26.971 12.7755 26.5354C13.4257 25.9605 13.7939 25.1313 13.7845 24.2634C13.7845 23.2914 13.1586 22.4653 12.4901 21.9476V17.3162C12.4901 16.9014 12.8264 16.5651 13.2412 16.5651H15.3066C15.7115 17.6072 16.4332 18.3176 17.4971 18.725V21.8707C16.4682 22.434 16.0232 23.4141 16.2366 24.6784C16.4594 25.9928 17.4358 26.9942 18.6656 27.1738C19.4718 27.3014 20.2931 27.0666 20.91 26.5323C21.5591 25.958 21.9268 25.1301 21.9177 24.2635C21.9177 23.2902 21.2918 22.4647 20.6265 21.9477V18.7244C21.6749 18.3226 22.369 17.6235 22.7727 16.5645H24.8418C24.9335 16.5645 25.0079 16.6387 25.0083 16.7304V21.9878C24.3518 22.633 23.8554 23.7108 24.0976 24.8831C24.3042 25.8845 25.0684 26.71 26.0923 27.0455C27.0311 27.3522 28.0019 27.212 28.763 26.6599C29.5266 26.1007 29.9768 25.21 29.9741 24.2634C29.9728 23.2645 29.3901 22.4503 28.763 21.9495V8.02177C29.1943 7.62811 29.904 6.83264 29.991 5.79243ZM28.743 5.69103C28.6923 6.3025 28.1972 6.89337 27.7509 7.24261C27.5992 7.36125 27.5105 7.54321 27.5106 7.73578V22.2694C27.5108 22.4828 27.6198 22.6815 27.7997 22.7963C28.2247 23.0686 28.721 23.6162 28.721 24.264C28.7242 24.8091 28.4667 25.3229 28.0282 25.6466C27.59 25.9639 27.038 26.039 26.4816 25.8562C25.8921 25.6628 25.437 25.1815 25.3231 24.6301C25.1604 23.8441 25.5553 23.128 26.0191 22.7625C26.1708 22.6439 26.2595 22.462 26.2594 22.2694V16.7316C26.2584 15.9488 25.6239 15.3146 24.8412 15.3139H22.322C22.0414 15.3139 21.7951 15.5006 21.7193 15.7709C21.427 16.8148 20.8637 17.3831 19.8348 17.6698C19.5644 17.7453 19.3773 17.9917 19.3773 18.2725V22.2694C19.3774 22.4827 19.4861 22.6813 19.6658 22.7963C20.1284 23.093 20.6672 23.6551 20.6672 24.264C20.6763 24.7677 20.4662 25.2505 20.0914 25.5871C19.7475 25.8808 19.2917 26.0083 18.8453 25.9357C18.1663 25.8381 17.6023 25.2353 17.4728 24.4699C17.3326 23.6437 17.6036 23.1449 18.3522 22.8526C18.5922 22.7588 18.7501 22.5275 18.7502 22.2699V18.2725C18.7502 17.9917 18.5632 17.7453 18.2927 17.6697C17.2425 17.3768 16.6467 16.7935 16.3619 15.7714C16.2864 15.501 16.0399 15.3139 15.7591 15.3139H13.2412C12.1351 15.3139 11.2384 16.2106 11.2384 17.3167V22.2693C11.2385 22.4827 11.3473 22.6813 11.5269 22.7963C11.9907 23.0942 12.5327 23.6569 12.5327 24.2639C12.5418 24.7683 12.3315 25.2518 11.9563 25.5889C11.6129 25.8817 11.1579 26.0083 10.7126 25.935C10.0329 25.8362 9.4684 25.2328 9.33568 24.468C9.1955 23.6424 9.46588 23.1442 10.2119 22.852C10.4519 22.7582 10.6098 22.5269 10.61 22.2692V17.3417C10.6086 16.2223 9.70147 15.3152 8.5821 15.3138H3.36789C2.8756 15.3131 2.47672 14.9142 2.47601 14.4219V7.73203C2.4749 7.5198 2.36629 7.32259 2.1875 7.20817C1.75629 6.93151 1.24868 6.38136 1.24868 5.7405C1.24246 5.13267 1.5616 4.56791 2.08546 4.25968C2.63749 3.9436 3.29842 3.98056 3.95184 4.36231C4.14899 4.47808 4.43504 4.7873 4.51513 4.97507C4.95327 5.97649 4.42753 6.87899 3.96563 7.24015C3.81389 7.35879 3.72523 7.54068 3.72529 7.73332V13.8913C3.72564 14.3316 4.08245 14.6883 4.52264 14.6887H8.60651C9.71262 14.6887 10.6093 13.792 10.6093 12.6859V7.73203C10.6088 7.52038 10.5015 7.32329 10.3239 7.20817C9.85514 6.90774 9.30687 6.34257 9.30687 5.7405C9.29683 5.23377 9.50795 4.74775 9.88518 4.40925C10.1218 4.20523 10.528 3.98115 11.1244 4.07004C11.8129 4.17396 12.3668 4.76665 12.5014 5.54399C12.6428 6.3789 12.3843 6.85834 11.6389 7.1519C11.3989 7.24566 11.241 7.47696 11.2408 7.73461V12.6916C11.2432 13.7943 12.1366 14.6876 13.2393 14.69H15.7597C16.0405 14.69 16.2869 14.503 16.3625 14.2325C16.6472 13.2123 17.2431 12.6272 18.2933 12.3342C18.5638 12.2587 18.7508 12.0123 18.7508 11.7315V7.73215C18.7493 7.51956 18.6399 7.32223 18.4604 7.20828C17.9898 6.90663 17.4402 6.34146 17.4402 5.74061C17.4402 5.20924 17.6512 4.72358 18.0185 4.40749C18.2539 4.20406 18.6588 3.97751 19.2553 4.06828C19.9437 4.17278 20.4983 4.76612 20.6322 5.54411C20.7737 6.37843 20.5164 6.85846 19.7735 7.14949C19.5335 7.24326 19.3755 7.47456 19.3754 7.7322V11.7291C19.3755 12.0098 19.5625 12.2563 19.8329 12.3318C20.8619 12.6184 21.4252 13.1861 21.7174 14.2307C21.7932 14.5009 22.0396 14.6876 22.3201 14.6876H24.2572C25.3633 14.6876 26.26 13.7909 26.26 12.6848V7.73226C26.2587 7.51991 26.1499 7.32264 25.9709 7.2084C25.5259 6.923 25.2599 6.37408 25.2599 5.74073C25.2599 5.29825 25.4577 4.87579 25.8182 4.55154C26.2211 4.18493 26.7607 4.00656 27.3028 4.06083C27.6602 4.09774 28.0269 4.29554 28.3085 4.60411C28.6328 4.95811 28.7749 5.31363 28.743 5.69103Z" fill="#E40C25"></path>
                                        </svg>
                                        <p>{autoData.gearbox}</p>
                                    </div>
                                    <div className='auto-icon'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                                            <path d="M23.4375 10.7812H26.25C27.0253 10.7812 27.6562 10.1503 27.6562 9.375V1.875C27.6562 1.09969 27.0253 0.46875 26.25 0.46875H23.4375C22.6622 0.46875 22.0312 1.09969 22.0312 1.875V3.28125H20.625C20.3658 3.28125 20.1562 3.49125 20.1562 3.75V4.21875H9.84375V3.75C9.84375 3.49125 9.63422 3.28125 9.375 3.28125H7.96875V1.875C7.96875 1.09969 7.33781 0.46875 6.5625 0.46875H3.75C2.97469 0.46875 2.34375 1.09969 2.34375 1.875V9.375C2.34375 10.1503 2.97469 10.7812 3.75 10.7812H6.5625C7.33781 10.7812 7.96875 10.1503 7.96875 9.375V7.96875H9.375C9.63422 7.96875 9.84375 7.75875 9.84375 7.5V7.03125H10.5872L13.5938 10.0378V14.5312H13.125C12.8658 14.5312 12.6562 14.7413 12.6562 15V18.2812H11.25C10.9908 18.2812 10.7812 18.4908 10.7812 18.75V22.9688H9.84375V22.5C9.84375 22.2408 9.63422 22.0312 9.375 22.0312H7.96875V20.625C7.96875 19.8497 7.33781 19.2188 6.5625 19.2188H3.75C2.97469 19.2188 2.34375 19.8497 2.34375 20.625V28.125C2.34375 28.9003 2.97469 29.5312 3.75 29.5312H6.5625C7.33781 29.5312 7.96875 28.9003 7.96875 28.125V26.7188H9.375C9.63422 26.7188 9.84375 26.5092 9.84375 26.25V25.7812H20.1562V26.25C20.1562 26.5092 20.3658 26.7188 20.625 26.7188H22.0312V28.125C22.0312 28.9003 22.6622 29.5312 23.4375 29.5312H26.25C27.0253 29.5312 27.6562 28.9003 27.6562 28.125V20.625C27.6562 19.8497 27.0253 19.2188 26.25 19.2188H23.4375C22.6622 19.2188 22.0312 19.8497 22.0312 20.625V22.0312H20.625C20.3658 22.0312 20.1562 22.2408 20.1562 22.5V22.9688H19.2188V18.75C19.2188 18.4908 19.0092 18.2812 18.75 18.2812H17.3438V15C17.3438 14.7413 17.1342 14.5312 16.875 14.5312H16.4062V10.0378L19.4128 7.03125H20.1562V7.5C20.1562 7.75875 20.3658 7.96875 20.625 7.96875H22.0312V9.375C22.0312 10.1503 22.6622 10.7812 23.4375 10.7812ZM6.5625 9.84375H3.75C3.49125 9.84375 3.28125 9.63328 3.28125 9.375V8.16281L3.88734 8.76891L4.55016 8.10609L3.28125 6.83719V5.81906L3.88734 6.42516L4.55016 5.76234L3.28125 4.49344V3.47531L3.88734 4.08141L4.55016 3.41859L3.28125 2.14969V1.875C3.28125 1.61672 3.49125 1.40625 3.75 1.40625H6.5625C6.82125 1.40625 7.03125 1.61672 7.03125 1.875V2.14969L5.76234 3.41859L6.42516 4.08141L7.03125 3.47531V4.49344L5.76234 5.76234L6.42516 6.42516L7.03125 5.81906V6.83719L5.76234 8.10609L6.42516 8.76891L7.03125 8.16281V9.375C7.03125 9.63328 6.82125 9.84375 6.5625 9.84375ZM8.90625 7.03125H7.96875V4.21875H8.90625V7.03125ZM6.5625 28.5938H3.75C3.49125 28.5938 3.28125 28.3838 3.28125 28.125V26.9128L3.88734 27.5189L4.55016 26.8561L3.28125 25.5872V24.5691L3.88734 25.1752L4.55016 24.5123L3.28125 23.2434V22.2253L3.88734 22.8314L4.55016 22.1686L3.28125 20.8997V20.625C3.28125 20.3662 3.49125 20.1562 3.75 20.1562H6.5625C6.82125 20.1562 7.03125 20.3662 7.03125 20.625V20.8997L5.76234 22.1686L6.42516 22.8314L7.03125 22.2253V23.2434L5.76234 24.5123L6.42516 25.1752L7.03125 24.5691V25.5872L5.76234 26.8561L6.42516 27.5189L7.03125 26.9128V28.125C7.03125 28.3838 6.82125 28.5938 6.5625 28.5938ZM8.90625 25.7812H7.96875V22.9688H8.90625V25.7812ZM23.4375 20.1562H26.25C26.5088 20.1562 26.7188 20.3662 26.7188 20.625V20.8997L25.4498 22.1686L26.1127 22.8314L26.7188 22.2253V23.2434L25.4498 24.5123L26.1127 25.1752L26.7188 24.5691V25.5872L25.4498 26.8561L26.1127 27.5189L26.7188 26.9128V28.125C26.7188 28.3838 26.5088 28.5938 26.25 28.5938H23.4375C23.1787 28.5938 22.9688 28.3838 22.9688 28.125V26.9128L23.5748 27.5189L24.2377 26.8561L22.9688 25.5872V24.5691L23.5748 25.1752L24.2377 24.5123L22.9688 23.2434V22.2253L23.5748 22.8314L24.2377 22.1686L22.9688 20.8997V20.625C22.9688 20.3662 23.1787 20.1562 23.4375 20.1562ZM21.0938 22.9688H22.0312V25.7812H21.0938V22.9688ZM11.9128 7.03125H13.5938V8.71219L11.9128 7.03125ZM13.5938 15.4688H16.4062V20.1562H13.5938V15.4688ZM14.5312 22.9688V21.0938H15.4688V22.9688H14.5312ZM11.7188 19.2188H12.6562V20.625C12.6562 20.8842 12.8658 21.0938 13.125 21.0938H13.5938V22.9688H11.7188V19.2188ZM20.1562 24.8438H9.84375V23.9062H20.1562V24.8438ZM17.3438 20.625V19.2188H18.2812V22.9688H16.4062V21.0938H16.875C17.1342 21.0938 17.3438 20.8842 17.3438 20.625ZM14.5312 14.5312V7.03125H15.4688V14.5312H14.5312ZM16.4062 8.71219V7.03125H18.0872L16.4062 8.71219ZM9.84375 6.09375V5.15625H20.1562V6.09375H9.84375ZM23.4375 1.40625H26.25C26.5088 1.40625 26.7188 1.61672 26.7188 1.875V2.14969L25.4498 3.41859L26.1127 4.08141L26.7188 3.47531V4.49344L25.4498 5.76234L26.1127 6.42516L26.7188 5.81906V6.83719L25.4498 8.10609L26.1127 8.76891L26.7188 8.16281V9.375C26.7188 9.63328 26.5088 9.84375 26.25 9.84375H23.4375C23.1787 9.84375 22.9688 9.63328 22.9688 9.375V8.16281L23.5748 8.76891L24.2377 8.10609L22.9688 6.83719V5.81906L23.5748 6.42516L24.2377 5.76234L22.9688 4.49344V3.47531L23.5748 4.08141L24.2377 3.41859L22.9688 2.14969V1.875C22.9688 1.61672 23.1787 1.40625 23.4375 1.40625ZM21.0938 7.03125V4.21875H22.0312V7.03125H21.0938Z" fill="#E40C25"></path>
                                        </svg>
                                        <p>All-wheel</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='auto-specifications'>
                            <h2>Auto Specifications</h2>
                            <div className='specifications'>
                                <SpecificationBlock title='Main specifications' isOpen={true}>
                                    <Specification name='Engine' value={autoData.fuel_type + ', ' + autoData.engin_size + ', ' + (autoData.engine_power ? autoData.engine_power + 'hp' : '')} />
                                    <Specification name='Gearbox' value={autoData.gearbox} />
                                    <Specification name='Drive type' value='All-wheel drive' />
                                </SpecificationBlock>
                                <SpecificationBlock title='Dimensions'>
                                    <Specification name='Body type' value={autoData.bodytype} />
                                    <Specification name='Door number' value={autoData.door_num} />
                                    <Specification name='Height, mm' value={autoData.height} />
                                    <Specification name='Length, mm' value={autoData.length} />
                                    <Specification name='Width, mm' value={autoData.width} />
                                    <Specification name='Wheelbase, mm' value={autoData.wheelbase} />
                                    <Specification name='Seat number' value={autoData.seat_num} />
                                </SpecificationBlock>
                                <SpecificationBlock title='Engine'>
                                    <Specification name='Fuel type' value={autoData.fuel_type} />
                                    <Specification name='Engine size' value={autoData.engin_size} />
                                    <Specification name='Engine power' value={autoData.engine_power} />
                                    <Specification name='Max speed, mph' value={autoData.top_speed} />
                                </SpecificationBlock>
                                <SpecificationBlock title='Other'>
                                    <Specification name='Price, $' value={autoData.price} />
                                    <Specification name='Color' value={autoData.color} />
                                    <Specification name='Runned miles' value={autoData.runned_Miles} />
                                </SpecificationBlock>
                            </div>
                        </div>
                    </section>
                )
            }
        </>
    );

};

export default AutoPage;