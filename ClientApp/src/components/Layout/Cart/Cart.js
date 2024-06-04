import React, { useState } from 'react';
import { useCart } from './CartContext';
import './Cart.css';

const Cart = () => {
    const { cartItems, deleteFromCart } = useCart();
    const [isCartOpen, setIsCartOpen] = useState(false);
    const url = "https://suihxfxa36.execute-api.us-east-1.amazonaws.com/autoPricePrediction/autoPricePrediction";

    const data = {
        "maker": "Bentley",
        "color": "Silver",
        "reg_year": 2000,
        "bodytype": "Saloon",
        "runned_miles": 60000,
        "engine_size": 6.8,
        "gearbox": "Automatic",
        "fuel_type": "Petrol",
        "seat_num": 5,
        "door_num": 4
    };

 
    // Make the fetch request
    const onClick = (url) => {
        fetch("https://suihxfxa36.execute-api.us-east-1.amazonaws.com/autoPricePrediction/autoPricePrediction", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                data
            }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Response data:', data);
            })
            .catch(error => {
                console.error('There was a problem with your fetch operation:', error);
            });
    }



    return (
        <>
            <div className='cart-btn-container'>
                <button className='cart-after cart-btn button mini-cart' onClick={() => { setIsCartOpen(true); document.body.classList.add('scroll-off'); }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" style={{ fill: 'white', marginRight: '10px' }}><path d="M21.822 7.431A1 1 0 0 0 21 7H7.333L6.179 4.23A1.994 1.994 0 0 0 4.333 3H2v2h2.333l4.744 11.385A1 1 0 0 0 10 17h8c.417 0 .79-.259.937-.648l3-8a1 1 0 0 0-.115-.921zM17.307 15h-6.64l-2.5-6h11.39l-2.25 6z"></path><circle cx="10.5" cy="19.5" r="1.5"></circle><circle cx="17.5" cy="19.5" r="1.5"></circle></svg>
                    <p className='fs-18'>My Cart</p>
                </button>
                {cartItems?.length ? <div className='cart-items-counter'>{cartItems.length}</div> : null}
            </div>
            {cartItems?.length > 0 ?
                <div className={`cart-container ${isCartOpen ? 'open' : ''}`}>
                    <div className='cart-container-header'>
                        <h2 className='cart-container-title'>Cart</h2>
                        <div className='close-cart-btn' onClick={() => { setIsCartOpen(false); document.body.classList.remove('scroll-off'); }}></div>
                    </div>
                    <ul className='cart-auto-list'>
                        {cartItems?.[0]?.src && cartItems.map((item, index) => (
                            <li key={index} className='cart-auto-item'>
                                <div className='cart-item-left-side'>
                                    <div className='auto-item-img'>
                                        <img src={item.src} alt="Car" />
                                    </div>
                                    <div className='auto-item-descriptions'>
                                        <p className='title'>{item.maker}</p>
                                        <p className='other'>{item.genmodel} {', ' + item.adv_year}</p>
                                        {item.runned_Miles ? <p className='others'>{'Runned miles: ' + item.runned_Miles}</p> : null}
                                    </div>
                                </div>
                                <div className='auto-item-actions'>
                                    <svg onClick={() => { deleteFromCart(item.adv_ID) }} height="32px" width="32px" viewBox="-51.2 -51.2 614.40 614.40" fill="white" cursor='pointer'>
                                        <g>
                                            <path d="M88.594,464.731C90.958,491.486,113.368,512,140.234,512h231.523c26.858,0,49.276-20.514,51.641-47.269 l25.642-335.928H62.952L88.594,464.731z M420.847,154.93l-23.474,307.496c-1.182,13.37-12.195,23.448-25.616,23.448H140.234 c-13.42,0-24.434-10.078-25.591-23.132L91.145,154.93H420.847z"></path>
                                            <path d="M182.954,435.339c5.877-0.349,10.35-5.4,9.992-11.269l-10.137-202.234c-0.358-5.876-5.401-10.349-11.278-9.992 c-5.877,0.357-10.35,5.409-9.993,11.277l10.137,202.234C172.033,431.231,177.085,435.696,182.954,435.339z"></path>
                                            <path d="M256,435.364c5.885,0,10.656-4.763,10.656-10.648V222.474c0-5.885-4.771-10.648-10.656-10.648 c-5.885,0-10.657,4.763-10.657,10.648v202.242C245.344,430.601,250.115,435.364,256,435.364z"></path>
                                            <path d="M329.046,435.339c5.878,0.357,10.921-4.108,11.278-9.984l10.129-202.234c0.348-5.868-4.116-10.92-9.993-11.277 c-5.877-0.357-10.92,4.116-11.277,9.992L319.054,424.07C318.697,429.938,323.17,434.99,329.046,435.339z"></path>
                                            <path d="M439.115,64.517c0,0-34.078-5.664-43.34-8.479c-8.301-2.526-80.795-13.566-80.795-13.566l-2.722-19.297 C310.388,9.857,299.484,0,286.642,0h-30.651H225.34c-12.825,0-23.728,9.857-25.616,23.175l-2.721,19.297 c0,0-72.469,11.039-80.778,13.566c-9.261,2.815-43.357,8.479-43.357,8.479C62.544,67.365,55.332,77.172,55.332,88.38v21.926h200.66 h200.676V88.38C456.668,77.172,449.456,67.365,439.115,64.517z M276.318,38.824h-40.636c-3.606,0-6.532-2.925-6.532-6.532 s2.926-6.532,6.532-6.532h40.636c3.606,0,6.532,2.925,6.532,6.532S279.924,38.824,276.318,38.824z"></path>
                                        </g>
                                    </svg>
                                    {item.price ? <p className='price'>{item.price + ' $'}</p> : null}
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className='cart-total'>
                        <div className='total-price'>
                            <p className='total'>Total:</p>
                            <p className='price'>{cartItems.reduce((total, item) => total + item.price, 0) + ' $'}</p>
                        </div>
                        <div className='buy-action'>
                            <button className='buy-btn' onClick={onClick}>Buy Now</button>
                        </div>
                    </div>
                </div>
                : null
            }
        </>
    );
}

export default Cart;
