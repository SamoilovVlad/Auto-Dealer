import Header from './Layout/Header/Header';
import Container from './Layout/Container/Container';


const Layout = ({ children, activePage}) => {
    return (
        <div>
            <Header activePage={activePage} />
            <Container>
                {children}
            </Container>
        </div>
    );

}

export default Layout;
