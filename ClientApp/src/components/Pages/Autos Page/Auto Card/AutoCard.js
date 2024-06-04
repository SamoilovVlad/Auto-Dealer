import { useState } from 'react';
import CookiesManagement from '../../../Api&Services/CookiesManagement';
import { useCart } from '../../../Layout/Cart/CartContext';
import './AutoCard.css';


const AutoCard = ({ modelInfo, src, model, brand, isInCart }) => {
    brand = brand ? brand : modelInfo.maker;
    modelInfo.maker = brand;
    const [isAutoInCart, setIsAutoInCart] = useState(CookiesManagement.checkIsAutoInCookies(modelInfo.adv_ID));
    const {addToCart, deleteFromCart} = useCart();

    return (
        <div className="wrapper">
            <div className="container">
                <a className="top" href={`/model/${brand}/${model}/${modelInfo.adv_ID}`}>
                    <img className='auto-img' src={src} alt='car' />
                    <h2 className='card-title'>{modelInfo.maker}</h2>
                </a>
                <div className={`bottom ${isInCart ? 'clicked' : ''}`}>
                    <div className="left">
                        <div className="details">
                            <h1>{brand} {model}</h1>
                            <p>${modelInfo.price}</p>
                        </div>
                        <div className="buy" onClick={() => { addToCart(modelInfo, src); setIsAutoInCart(!isAutoInCart) }}><svg xmlns="http://www.w3.org/2000/svg" width="50%" height="auto" viewBox="0 0 24 24" style={{ fill: 'white' }}><circle cx="10.5" cy="19.5" r="1.5"></circle><circle cx="17.5" cy="19.5" r="1.5"></circle><path d="m14 13.99 4-5h-3v-4h-2v4h-3l4 5z"></path><path d="M17.31 15h-6.64L6.18 4.23A2 2 0 0 0 4.33 3H2v2h2.33l4.75 11.38A1 1 0 0 0 10 17h8a1 1 0 0 0 .93-.64L21.76 9h-2.14z"></path></svg></div>
                    </div>
                    <div className="right">
                        <div className="done"><svg xmlns="http://www.w3.org/2000/svg" width="65%" height="65%" viewBox="0 0 24 24" style={{ fill: 'black' }}><path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z"></path></svg></div>
                        <div className="details">
                            <h3>{brand} {modelInfo.genmodel}</h3>
                            <p>Added to your cart</p>
                        </div>
                        <div className="remove" onClick={() => { deleteFromCart(modelInfo.adv_ID); setIsAutoInCart(!isAutoInCart) }}><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50%" height="50%" viewBox="0 0 50 50">
                            <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"></path>
                        </svg></div>
                    </div>
                </div>
            </div>
            <a className="inside" href={`/model/${brand}/${model}/${modelInfo.adv_ID}`}>
                <div className="icon"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" style={{ fill: 'white' }}><path d="M4 6h16v2H4zm4 5h12v2H8zm5 5h7v2h-7z"></path></svg></div>
                <div className="contents">
                    <table>
                        <tbody>
                            <tr>
                                <th className='title'>Width</th>
                                <th className='title'>Height</th>
                            </tr>
                            <tr>
                                <td className='pb-30'>{modelInfo.width ? modelInfo.width + ' cm' : '-'}</td>
                                <td className='pb-30'>{modelInfo.height ? modelInfo.height + ' cm' : '-'}</td>
                            </tr>
                            <tr>
                                <th className='title'>Length</th>
                            </tr>
                            <tr>
                                <td className='pb-30'>{modelInfo.length ? modelInfo.length + ' cm' : '-'}</td>
                            </tr>
                            <tr>
                                <th className='title'>Gearbox</th>
                                <th className='title'>Fuel Type</th>
                            </tr>
                            <tr>
                                <td className='pb-30'>{modelInfo.gearbox ? modelInfo.gearbox : '-'}</td>
                                <td className='pb-30'>{modelInfo.fuel_type ? modelInfo.fuel_type : '-'}</td>
                            </tr>
                            <tr>
                                <th className='title'>Body type</th>
                                <th className='title'>Color</th>
                            </tr>
                            <tr>
                                <td className='pb-30'>{modelInfo.bodytype ? modelInfo.bodytype : '-'}</td>
                                <td className='pb-30'>{modelInfo.color ? modelInfo.color : '-'}</td>
                            </tr>
                            <tr>
                                <th className='title'>Registration year</th>
                                <th className='title'>Advertising year</th>
                            </tr>
                            <tr>
                                <td className='pb-30'>{modelInfo.reg_year ? modelInfo.reg_year : '-'}</td>
                                <td className='pb-30'>{modelInfo.adv_year ? modelInfo.adv_year : '-'}</td>
                            </tr>
                            <tr>
                                <th className='title'>Mileage</th>
                                <th className='title'>Top speed</th>
                            </tr>
                            <tr>
                                <td className='pb-30'>{modelInfo.runned_Miles ? modelInfo.runned_Miles + ' mi' : '-'}</td>
                                <td className='pb-30'>{modelInfo.top_speed ? modelInfo.top_speed + ' mph' : '-'}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </a>
        </div>
    );
}

export default AutoCard;