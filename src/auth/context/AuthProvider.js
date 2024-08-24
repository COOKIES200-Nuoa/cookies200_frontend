import { jsx as _jsx } from "react/jsx-runtime";
// src/auth/context/AuthProvider.tsx
import { createContext, useState, useEffect, useContext } from 'react';
var AuthContext = createContext(undefined);
export var AuthProvider = function (_a) {
    var children = _a.children;
    var _b = useState(false), isAuthenticated = _b[0], setIsAuthenticated = _b[1];
    useEffect(function () {
        var token = localStorage.getItem('idToken');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);
    var login = function (token) {
        setIsAuthenticated(true);
        localStorage.setItem('idToken', token);
    };
    var logout = function () {
        setIsAuthenticated(false);
        localStorage.removeItem('idToken');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    };
    var getIdToken = function () {
        return localStorage.getItem('idToken');
    };
    return (_jsx(AuthContext.Provider, { value: { isAuthenticated: isAuthenticated, login: login, logout: logout, getIdToken: getIdToken }, children: children }));
};
export var useAuth = function () {
    var context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
