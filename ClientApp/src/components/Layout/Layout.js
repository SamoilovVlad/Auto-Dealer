import Header from './Header/Header';
import Container from './Container/Container';
import Footer from './Footer/Footer';


const Layout = ({ children, activePage}) => {
    return (
        <div>
            <Header activePage={activePage} />
            <Container>
                {children}
            </Container>
            <Footer/>
        </div>
    );

}

export default Layout;
