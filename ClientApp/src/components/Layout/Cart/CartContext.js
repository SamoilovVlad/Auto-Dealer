import React, { createContext, useContext, useState, useEffect } from 'react';
import CookiesManagement from '../../Api&Services/CookiesManagement';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(null);

    useEffect(() => {
        const getCartItemsFromCookies = () => {
            try {
                const cartItemsFromCookies = CookiesManagement.getAutoListFromCookies() || [];
                setCartItems(cartItemsFromCookies);
            } catch (error) {
                console.error('Error retrieving cart items from cookies:', error);
            }
        };

        getCartItemsFromCookies();
    }, []);

    const addToCart = (item, src) => {
            CookiesManagement.addAutoToCookies(item, src);
        const updatedCart = CookiesManagement.getAutoListFromCookies();
            setCartItems(updatedCart);
    };

    const deleteFromCart = (adv_Id) => {
        try {
            CookiesManagement.deleteAutoFromCookies(adv_Id);
            const updatedCart = CookiesManagement.getAutoListFromCookies();
            setCartItems(updatedCart);
        } catch (error) {
            console.error('Error deleting item from cart:', error);
        }
    }

    return (
        <CartContext.Provider value={{ cartItems, addToCart, deleteFromCart }}>
            {children}
        </CartContext.Provider>
    );
};