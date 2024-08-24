import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Routes, Route } from 'react-router-dom';
import paths from '../paths';
// import Home from '../pages/Home';
import Login from '../auth/components/Login';
// import ForgotPassword from '../auth/components/ForgotPassword';
import ChangePassword from '../auth/components/ChangePassword';
import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import NotFound from '../pages/NotFound';
import PrivateRoute from './PrivateRoute';
var AppRoutes = function () {
    return (_jsxs(Routes, { children: [_jsx(Route, { path: paths.login, element: _jsx(Login, {}) }), _jsx(Route, { path: paths.changePassword, element: _jsx(ChangePassword, {}) }), _jsx(Route, { path: "/", element: _jsx(PrivateRoute, { children: _jsx(Home, {}) }) }), _jsx(Route, { path: paths.dashboard, element: _jsx(PrivateRoute, { children: _jsx(Dashboard, {}) }) }), _jsx(Route, { path: paths.notFound, element: _jsx(NotFound, {}) })] }));
};
export default AppRoutes;
