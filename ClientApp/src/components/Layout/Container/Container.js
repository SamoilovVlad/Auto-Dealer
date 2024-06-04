import { CartProvider } from '../Cart/CartContext';
import './Container.css';


const Container = ({ children }) => {

    return (
        <div className='app-container'>
            {children}
        </div>
    );
}

export default Container;