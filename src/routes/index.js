import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

// routes
import AuthenticationRoutes from './AuthenticationRoutes';
import LoginRoutes from './LoginRoutes';
import MainRoutes from './MainRoutes';

// project import
import Loadable from 'ui-component/Loadable';
import Authback from './Authback';
import BackRoutes from './BackRoutes';
import FrontRoutes from './FrontRoutes';
import Authfront from './Authfront';

const PagesLanding = Loadable(lazy(() => import('views/pages/landing')));

// ==============================|| ROUTING RENDER ||============================== //

const router = createBrowserRouter(
    [
        FrontRoutes,
        AuthenticationRoutes,
        LoginRoutes,
        Authfront,
        Authback,
        BackRoutes,
        MainRoutes,
        { path: '/landing', element: <PagesLanding /> }
    ],
    {
        basename: process.env.REACT_APP_BASE_NAME
    }
);

export default router;
