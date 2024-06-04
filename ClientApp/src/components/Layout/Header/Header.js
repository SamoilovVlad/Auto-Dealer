import './Header.css'
import React, { useEffect } from 'react';
import Button from '../../Button/Button'
import { navItems } from '../../StaticData';
import Cart from '../Cart/Cart';

const NavItem = ({ item }) => {
    return (
        <li className='nav-item'>
            <a className='navlink' href={item.href}>
                {item.label}
                <svg className='svg hide' xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" style={{ fill: 'white' }}><path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path></svg>
            </a>
        </li>
    );
};


const Header = ({ activePage }) => {

    useEffect(() => {
        const handleScroll = () => {
            var stickyDiv = document.querySelector('.sticky-before');
            stickyDiv.classList.toggle('active', window.scrollY > 30);
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    function toggleMenu() {
        const body = document.querySelector('body');
        const menuIcon = document.querySelector('.menu-icon');
        const navbar = document.querySelector('.navbar');
        menuIcon.classList.toggle('close');
        navbar.classList.toggle('open');
        body.classList.toggle('scroll-off');
    }

    return (
        <>
            <div className='sticky-before'></div>
            <header className='header'>
                <div className='header-inner'>
                    <div className='logo'>
                        <span style={{ fontSize: '30px', fontWeight: '700' }}>.Logo</span>
                    </div>
                    <ul className='navbar'>
                        {navItems.map((item, index) => (<NavItem key={index} item={item} />))}
                    </ul>
                    <Cart/>
                    <span className='open-menu' onClick={toggleMenu}>
                        <span className='menu-icon'></span>
                    </span>
                </div>
            </header>
        </>
    );
}
export default Header;