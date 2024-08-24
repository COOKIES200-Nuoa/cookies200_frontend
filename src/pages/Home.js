import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/context/AuthProvider';
import paths from '../paths';
var Home = function () {
    var auth = useAuth();
    var navigate = useNavigate();
    var handleLogout = function () {
        auth.logout();
        navigate(paths.login);
    };
    return (_jsxs(Box, { sx: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
        }, children: [_jsx(Typography, { variant: "h4", gutterBottom: true, children: "Home Page" }), _jsx(Button, { variant: "contained", color: "primary", onClick: handleLogout, children: "Logout" })] }));
};
export default Home;
