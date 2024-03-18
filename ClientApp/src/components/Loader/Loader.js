import './Loader.css';

const Loader = () => {
    return (
        <div className='loading'>
            {document.body.classList.add('scroll-off')}
            <img src='https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/02b374101705095.5f24d5db1096f.gif' alt='loading...' />
        </div>
    );
};

export default Loader;
