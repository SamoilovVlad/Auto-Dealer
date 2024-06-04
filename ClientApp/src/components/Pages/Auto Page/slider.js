import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/css';

const Slider = ({ images }) => {

    const mainSliderOptions = {
        type: 'slide',
        perPage: 1,
        rewind: true,
    };

    const thumbnailSliderOptions = {
        height: 100,
        rewind: true,
        pagination: false,
        isNavigation: true,
        arrows: false,
        focus:'center',
        breakpoints: {
            2000: {
                fixedWidth: 100,
                fixedHeight: 100,
                perPage:4
            },
        },
    };

    let mainSplideRef = null;
    let thumbnailsSplideRef = null;

    const onMainSplideMounted = (splide) => {
        mainSplideRef = splide;
        if (thumbnailsSplideRef) {
            mainSplideRef.sync(thumbnailsSplideRef);
        }
    };

    const onThumbnailsSplideMounted = (splide) => {
        thumbnailsSplideRef = splide;
        if (mainSplideRef) {
            mainSplideRef.sync(thumbnailsSplideRef);
        }
    };
    return (
        <div className='slider'>
            <Splide
                options={mainSliderOptions}
                id="main-slider"
                aria-label="Main Slider"
                onMounted={onMainSplideMounted}
            >
                {images.map((img, index) => (
                    <SplideSlide key={index}>
                        <img
                            className='auto-slider-img'
                            src={img.src}
                            alt=''
                        />
                    </SplideSlide>
                ))}
            </Splide>

            <Splide
                options={thumbnailSliderOptions}
                id="thumbnail-slider"
                aria-label="Thumbnail Slider"
                onMounted={onThumbnailsSplideMounted}
            >
                {images.map((img, index) => (
                    <SplideSlide key={index}>
                        <img className='auto-slider-img'
                            src={img.src}
                            alt=''
                        />
                    </SplideSlide>
                ))}
            </Splide>
        </div>
    );
};

export default Slider;
