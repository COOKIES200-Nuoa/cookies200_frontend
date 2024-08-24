import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import paths from '../paths';
var NotFound = function () {
    return (_jsxs("div", { style: { textAlign: 'center', marginTop: '50px' }, children: [_jsx("h1", { children: "404 - Page Not Found" }), _jsx("p", { children: "Oops! The page you are looking for does not exist." }), _jsx(Link, { to: paths.home, style: { textDecoration: 'none', color: 'blue' }, children: "Go back to Home" })] }));
};
export default NotFound;
