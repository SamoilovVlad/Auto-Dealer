import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { CartProvider } from './components/Layout/Cart/CartContext';
import './custom.css';

const App = () => {
    
    return (
        <CartProvider>
            <Routes>
                {AppRoutes.map((route, index) => {
                    const { element, ...rest } = route;
                    return <Route key={index} {...rest} element={element} />;
                })}
            </Routes>
        </CartProvider>
    );
}

export default App;
