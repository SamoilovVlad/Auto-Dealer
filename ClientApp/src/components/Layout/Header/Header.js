import './Header.css'
import React, { useEffect } from 'react';
import Button from '../../Button/Button'
import { navItems } from '../../StaticData';

const NavItem = ({ item}) => {
    return (
        <li className='nav-item'>
            <a className='navlink' href={item.href}>
                {item.label}
                <svg className='svg hide' xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" style={{fill:'white'}}><path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path></svg>
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
                        <a href='/'>
                            <img src='https://cdn.riastatic.com/docs/newauto/common_photos/eng3dpw3646sonuo.svg' alt='logo' />
                        </a>
                    </div>
                    <ul className='navbar'>
                        {navItems.map((item, index) => (<NavItem key={index} item={item}/>))}
                    </ul>
                    <div className='cart'>
                        <Button>
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" style={{fill:'white', marginRight:'10px'}}><path d="M21.822 7.431A1 1 0 0 0 21 7H7.333L6.179 4.23A1.994 1.994 0 0 0 4.333 3H2v2h2.333l4.744 11.385A1 1 0 0 0 10 17h8c.417 0 .79-.259.937-.648l3-8a1 1 0 0 0-.115-.921zM17.307 15h-6.64l-2.5-6h11.39l-2.25 6z"></path><circle cx="10.5" cy="19.5" r="1.5"></circle><circle cx="17.5" cy="19.5" r="1.5"></circle></svg>
                            <p className='fs-18'>My Cart</p>
                        </Button>
                    </div>
                    <span className='open-menu' onClick={toggleMenu}>
                        <span className='menu-icon'></span>
                    </span>
                </div>
            </header>
        </>
    );
}
export default Header;