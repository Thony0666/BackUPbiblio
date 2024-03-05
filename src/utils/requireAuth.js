import { Navigate } from 'react-router-dom';
import { useAuthTemp } from './auth';

const RequireAuth = ({ children }) => {
    // const auth = useAuth();

    // if (!auth.agent) {
    //     return <Navigate to='/agent/login' />
    // }
    // const agent = Session.get('agent');
    // if (!agent) {
    //     return <Navigate to='/agent/login' />
    // }
    const userBack = useAuthTemp().getUserBack();
    if (userBack === null || typeof userBack === 'undefined') {
        return <Navigate to="/backinterface/login" />;
    }
    return children;
};

export default RequireAuth;

// export const RequireAuthCitoyen = ({ children }) => {
//     const citoyen = useAuth().getCitoyen();
//     if (!citoyen) {
//         return <Navigate to='/client/login' />
//     }
//     return children;
// }
