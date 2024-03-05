import { createContext, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProviderTemp = ({ children }) => {
    const getUserBack = () => {
        return JSON.parse(localStorage.getItem('userBack'));
    };

    const loginUserBack = (userBack) => {
        localStorage.setItem('userBack', JSON.stringify(userBack));
    };
    const logoutUserBack = () => {
        localStorage.removeItem('userBack');
    };

    const getUserFront = () => {
        return JSON.parse(localStorage.getItem('userFront'));
    };
    const loginUserFront = (userFront) => {
        localStorage.setItem('userFront', JSON.stringify(userFront));
    };

    const logoutUserFront = () => {
        localStorage.removeItem('userFront');
    };

    return (
        <AuthContext.Provider value={{ getUserBack, loginUserBack, logoutUserBack, getUserFront, loginUserFront, logoutUserFront }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthTemp = () => {
    return useContext(AuthContext);
};
