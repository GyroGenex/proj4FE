import React, { createContext, useContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import jwtDecode from 'jwt-decode'; // Import jwt-decode library

const AuthContext = createContext({
    user: null,
    login: (userToken) => { },
    logout: () => { },
    isAuthenticated: () => { },
});
const AUTH_TOKEN_NAME = 'userAuthToken';
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [cookies, setCookie, removeCookie] = useCookies([AUTH_TOKEN_NAME]);
    useEffect(() => {
        // Check if token exists in cookies
        const token = getStoredToken();
        if (token) {
            const decodedToken = jwtDecode(token);
            setUser(decodedToken);

        }
    }, [cookies]);

    const getStoredToken = () => {
        const { userAuthToken } = cookies;

        return userAuthToken;
    };

    const isAuthenticated = () => {
        return user !== null;
    };

    const login = (userToken) => {
        setCookie(AUTH_TOKEN_NAME, userToken);
    };

    const logout = () => {
        // Remove token from local storage
        removeCookie(AUTH_TOKEN_NAME);

        // Reset the user state
        setUser(null);
    };

    const value = {
        user,
        login,
        isAuthenticated,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );


}
export function useAuth() {
    return useContext(AuthContext);
}
