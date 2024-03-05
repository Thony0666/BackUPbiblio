import MinimalLayout from 'layout/BackMinimalLayout';
import { lazy } from 'react';
import Loadable from 'ui-component/Loadable';

const LoginBack = Loadable(lazy(() => import('views/pages/auth-pages/LoginBack')));
const MdpOublieBack = Loadable(lazy(() => import('views/pages/auth-pages/MdpOublieBack')));
const VerificationCodeBack = Loadable(lazy(() => import('views/pages/auth-pages/VerificationCodeBack')));
const ReinitialiserCodeBack = Loadable(lazy(() => import('views/pages/auth-pages/ReinitialiserCodeBack')));

const Authback = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: '/backinterface/login',
            element: <LoginBack />
        },
        {
            path: '/backinterface/mdp-oublie/email',
            element: <MdpOublieBack />
        },
        {
            path: '/backinterface/mdp-oublie/verification',
            element: <VerificationCodeBack />
        },
        {
            path: '/backinterface/mdp-oublie/reinit-code',
            element: <ReinitialiserCodeBack />
        }
    ]
};

export default Authback;
