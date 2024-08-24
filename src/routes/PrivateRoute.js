import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth/context/AuthProvider';
import paths from '../paths';
var PrivateRoute = function (_a) {
    var children = _a.children;
    var isAuthenticated = useAuth().isAuthenticated;
    if (!isAuthenticated) {
        return _jsx(Navigate, { to: paths.login, replace: true });
    }
    return _jsx(_Fragment, { children: children });
};
export default PrivateRoute;
