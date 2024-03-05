import DescriContenue from 'composants/jed/contents/description/DescriContenue';
import DescriContenueFront from 'composants/jed/contents/description/DescriContenueFront';
import FrontLayout2 from 'layout/FrontLayout2';
import { lazy } from 'react';
import Loadable from 'ui-component/Loadable';
import Profile from 'views/pages/front-pages/Profil';

const Acceuil = Loadable(lazy(() => import('views/pages/front-pages/Acceuil')));
const Zone = Loadable(lazy(() => import('views/pages/front-pages/Zone')));
const Thematique = Loadable(lazy(() => import('views/pages/front-pages/Themathique')));
const Media = Loadable(lazy(() => import('views/pages/front-pages/Media')));
const Apropos = Loadable(lazy(() => import('views/pages/front-pages/Apropos')));
const ContactUs = Loadable(lazy(() => import('views/pages/front-pages/ContactUs')));

const FrontRoutes = {
    path: '/',
    element: <FrontLayout2 />,
    children: [
        {
            path: '',
            element: <Acceuil />
        },
        {
            path: 'zone',
            element: <Zone />
        },
        {
            path: 'zone/:zonetype',
            element: <Zone />
        },
        {
            path: 'thematique/:theme',
            element: <Thematique />
        },
        {
            path: 'media/:type',
            element: <Media />
        },

        {
            path: 'apropos',
            element: <Apropos />
        },

        {
            path: 'contactus',
            element: <ContactUs />
        },
        {
            path: '/profil',
            element: <Profile />
        },
        {
            path: 'media/:type/descriFront/:id',
            element: <DescriContenueFront />
        },
        {
            path: 'thematique/:id/descriFront/:id',
            element: <DescriContenueFront />
        },
        {
            path: 'zone/descriFront/:id',
            element: <DescriContenueFront />
        },
        {
            path: 'zone/:id/descriFront/:id',
            element: <DescriContenueFront />
        },
        {
            path: 'media/:type/descri/:id/descri/:id',
            element: <DescriContenue />
        }
    ]
};

export default FrontRoutes;
