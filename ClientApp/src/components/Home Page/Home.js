import Button from '../Button/Button';
import { icons, cards, popularBrands, advertisements } from '../StaticData';
import './Home.css';

const HomeIcon = ({ src, alt, children }) => {
    return (
        <>
            <img src={src} alt={alt} />
            {children}
        </>
    );
}

const Card = ({ card }) => {
    return (
        <div className='card-home'>
            <span>
                <img src={card.src} alt='card img' />
            </span>
            <span>
                <span className='card-title'>{card.title}</span>
                {card.text}
            </span>
        </div>
    );
}

const Home = () => {
    return (
        <>
            <section className='home'>
                <div className='home-container'>
                    <h1>THE BEST <br /> AUTO DEALER <br /> IN THE WORLD</h1>
                    <div className='home-img'>
                        <picture>
                            <source srcset="https://cdn.riastatic.com/docs/newauto/common_photos/lje6w7vjswljcy24.webp" type="image/webp" /><img src="https://cdn.riastatic.com/docs/newauto/common_photos/doqskafv2pespsk4.png" alt="auto" />
                        </picture>
                        <ul className='icons'>
                            {icons.map((icon) => (
                                <li className='icon'>
                                    <HomeIcon src={icon.src} alt={icon.alt} children={(<span>{icon.alt}</span>)} />
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className='search-btn'>
                        <Button>Find auto by parameters</Button>
                    </div>
                </div>
            </section>
            <section className='merits-container'>
                <h2>DriveDreams Hub</h2>
                <div className='merits'> {cards.map((card) => (<Card card={card} />))} </div>
            </section>
            <section className='brands-container'>
                <h2>More than 80 Auto Brands and more than 890 Auto Models</h2>
                <ul className='brands'>{popularBrands.map((brand) => (<li className='brand'><a href={'/'}>{brand}</a></li>))}
                    <li style={{ fontWeight: '900', fontSize: '20px', textAlign: 'center' }} className='brand'><a href={'/'}>All brands</a></li>
                </ul>
            </section>
            <section className='adv-container'>
                <div className='advertisements'>
                    {advertisements.map((adv) => (<><span class="point"> • </span><span><strong>{adv.title}</strong>{adv.text}</span></>))}
                </div>
                <div className='advertisements'>
                    {advertisements.map((adv) => (<><span class="point"> • </span><span><strong>{adv.title}</strong>{adv.text}</span></>))}
                </div>
            </section>
        </>
    );
}

export default Home;
