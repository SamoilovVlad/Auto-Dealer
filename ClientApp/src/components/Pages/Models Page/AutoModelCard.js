const AutoModelCard = ({brand, model, src, modelInfo}) => {
    if (src !== undefined)
    return (
        <div className='model'>
            <a href={`/model/${brand}/${model}/page/1/pageSize/12`}>
                <div className='auto-image-container'>
                   <img className='auto-image' src={src} alt='car' />
                </div>
                <div className='model-info'>
                    <p className='title'>{model}</p>
                    <div className='model-details'>
                        <span className='model-detail'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ fill: 'white' }}><path d="m19.616 6.48.014-.017-4-3.24-1.26 1.554 2.067 1.674a2.99 2.99 0 0 0-1.394 3.062c.15.899.769 1.676 1.57 2.111.895.487 1.68.442 2.378.194L18.976 18a.996.996 0 0 1-1.39.922.995.995 0 0 1-.318-.217.996.996 0 0 1-.291-.705L17 16a2.98 2.98 0 0 0-.877-2.119A3 3 0 0 0 14 13h-1V5a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2v-4h1c.136 0 .267.027.391.078a1.028 1.028 0 0 1 .531.533A.994.994 0 0 1 15 16l-.024 2c0 .406.079.799.236 1.168.151.359.368.68.641.951a2.97 2.97 0 0 0 2.123.881c.406 0 .798-.078 1.168-.236.358-.15.68-.367.951-.641A2.983 2.983 0 0 0 20.976 18L21 9a2.997 2.997 0 0 0-1.384-2.52zM11 8H4V5h7v3zm7 2a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"></path></svg>
                            <span>{modelInfo.topSpeed} mph</span>
                        </span>
                        <span className='model-detail'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ fill: 'white' }}><path d="m20.772 13.155-1.368-4.104A2.995 2.995 0 0 0 16.559 7H7.441a2.995 2.995 0 0 0-2.845 2.051l-1.368 4.104A2.001 2.001 0 0 0 2 15v3c0 .738.404 1.376 1 1.723V21a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1h12v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1.277A1.99 1.99 0 0 0 22 18v-3c0-.831-.507-1.542-1.228-1.845zM7.441 9h9.117a1 1 0 0 1 .949.684L18.613 13H5.387l1.105-3.316c.137-.409.519-.684.949-.684zM5.5 18a1.5 1.5 0 1 1 .001-3.001A1.5 1.5 0 0 1 5.5 18zm13 0a1.5 1.5 0 1 1 .001-3.001A1.5 1.5 0 0 1 18.5 18zM5.277 5c.347.595.985 1 1.723 1s1.376-.405 1.723-1h6.555c.346.595.984 1 1.722 1s1.376-.405 1.723-1H17V3h1.723c-.347-.595-.985-1-1.723-1s-1.376.405-1.723 1H8.723C8.376 2.405 7.738 2 7 2s-1.376.405-1.723 1H7v2H5.277z"></path></svg>
                            <span>{modelInfo.bodyType}</span>
                        </span>
                        <span className='model-detail'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ fill: 'white' }}><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 13a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm2.75-7.17A5 5 0 0 0 13 7.1v-3a7.94 7.94 0 0 1 3.9 1.62zM11 7.1a5 5 0 0 0-1.75.73L7.1 5.69A7.94 7.94 0 0 1 11 4.07zM7.83 9.25A5 5 0 0 0 7.1 11h-3a7.94 7.94 0 0 1 1.59-3.9zM7.1 13a5 5 0 0 0 .73 1.75L5.69 16.9A7.94 7.94 0 0 1 4.07 13zm2.15 3.17a5 5 0 0 0 1.75.73v3a7.94 7.94 0 0 1-3.9-1.62zm3.75.73a5 5 0 0 0 1.75-.73l2.15 2.14a7.94 7.94 0 0 1-3.9 1.62zm3.17-2.15A5 5 0 0 0 16.9 13h3a7.94 7.94 0 0 1-1.62 3.9zM16.9 11a5 5 0 0 0-.73-1.75l2.14-2.15a7.94 7.94 0 0 1 1.62 3.9z"></path></svg>
                            <span>avg {modelInfo.price}$</span>
                        </span>
                    </div>
                    <span className='model-configuration'>{modelInfo.count} configurations</span>
                    <div className='show-more-models-btn'>Choose your model</div>
                </div>
            </a>
        </div>
    );
}
export default AutoModelCard;