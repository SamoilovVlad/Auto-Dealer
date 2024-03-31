import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import Layout from "./components/Layout/Layout";
import Home from "./components/Pages/Home Page/Home";
import Models from "./components/Pages/Models Page/Models";
import Autos from "./components/Pages/Autos Page/Autos";


const AppRoutes = [
    {
        index: true,
        element: <Layout activePage='Home'><Home /></Layout>
    },
    {
        path: '/counter',
        element: <Layout activePage='Counter'><Counter /></Layout>
    },
    {
        path: '/fetch-data',
        element: <Layout activePage='Fetch Data'><FetchData /></Layout>
    },
    {
        path: '/models',
        element: <Layout activePage='Models'><FetchData /></Layout>
    },
    {
        path: '/services',
        element: <Layout activePage='Services'><FetchData /></Layout>
    },
    {
        path: '/contacts',
        element: <Layout activePage='Contacts'><FetchData /></Layout>
    },
    {
        path: '/about',
        element: <Layout activePage='About'><FetchData /></Layout>
    },
    {
        path: `/models/:brand`,
        element: <Layout><Models /></Layout>
    },
    {
        path: `/model/:brand/:modelName/page/:pageNumber/pageSize/:pageSize`,
        element: <Layout><Autos /></Layout>
    },

];

export default AppRoutes;
