import MinimalLayout from 'layout/FrontMinimalLayout';
import { lazy } from 'react';
import Loadable from 'ui-component/Loadable';
import RegistrationFormTafo from 'views/pages/auth-pages/RegistrationFormPublic';
import SelectSingUp from 'views/pages/auth-pages/SelectSingUp';
const LoginFront = Loadable(lazy(() => import('views/pages/auth-pages/LoginFront')));
const InscriptionFront = Loadable(lazy(() => import('views/pages/auth-pages/InscriptionFront')));
const MdpOublieFront = Loadable(lazy(() => import('views/pages/auth-pages/MdpOublieFront')));
const VerificationCodeFront = Loadable(lazy(() => import('views/pages/auth-pages/VerificationCodeFront')));
const ReinitialiserCodeFront = Loadable(lazy(() => import('views/pages/auth-pages/ReinitialiserCodeFront')));

const Authfront = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: '/login',
            element: <LoginFront />
        },
        {
            path: '/inscription',
            element: <InscriptionFront />
        },
        {
            path: '/select/inscrit',
            element: <SelectSingUp />
        },
        {
            path: '/inscription/public',
            element: <RegistrationFormTafo />
        },
        {
            path: '/mdp-oublie/email',
            element: <MdpOublieFront />
        },
        {
            path: '/mdp-oublie/verification',
            element: <VerificationCodeFront />
        },
        {
            path: '/mdp-oublie/reinit-code',
            element: <ReinitialiserCodeFront />
        }
    ]
};

export default Authfront;
