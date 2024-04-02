import './AutoCard.css';

const AutoCard = ({ modelInfo, src, model, brand, key=''}) => {
    return (
        <div key={key} class="wrapper">
            <div class="container">
                <div class="top">
                    <img className='auto-img' src={URL.createObjectURL(src)} alt='car' />
                    <h2 className='card-title'>{modelInfo.maker}</h2>
                </div>
                <div class="bottom">
                    <div class="left">
                        <div class="details">
                            <h1>{modelInfo.maker} {modelInfo.genmodel}</h1>
                            <p>${modelInfo.price}</p>
                        </div>
                        <div class="buy"><svg xmlns="http://www.w3.org/2000/svg" width="50%" height="auto" viewBox="0 0 24 24" style={{fill:'white'}}><circle cx="10.5" cy="19.5" r="1.5"></circle><circle cx="17.5" cy="19.5" r="1.5"></circle><path d="m14 13.99 4-5h-3v-4h-2v4h-3l4 5z"></path><path d="M17.31 15h-6.64L6.18 4.23A2 2 0 0 0 4.33 3H2v2h2.33l4.75 11.38A1 1 0 0 0 10 17h8a1 1 0 0 0 .93-.64L21.76 9h-2.14z"></path></svg></div>
                    </div>
                    <div class="right">
                        <div class="done"><i class="material-icons">done</i></div>
                        <div class="details">
                            <h1>{modelInfo.adv_ID}</h1>
                            <p>Added to your cart</p>
                        </div>
                        <div class="remove"><i class="material-icons">clear</i></div>
                    </div>
                </div>
            </div>
            <div class="inside">
                <div class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" style={{fill:'white'}}><path d="M4 6h16v2H4zm4 5h12v2H8zm5 5h7v2h-7z"></path></svg></div>
                <div class="contents">
                    <table>
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
                    </table>
                </div>
            </div>
        </div>
    );
}

export default AutoCard;