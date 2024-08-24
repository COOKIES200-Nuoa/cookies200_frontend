var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Button, Grid, TextField, Typography, Alert, IconButton } from '@mui/material';
import { CheckCircle, Visibility, VisibilityOff } from '@mui/icons-material';
var ChangePassword = function () {
    var _a;
    var _b = useState(''), currentUsername = _b[0], setCurrentUsername = _b[1];
    var _c = useState(''), currentPassword = _c[0], setCurrentPassword = _c[1];
    var _d = useState(''), newPassword = _d[0], setNewPassword = _d[1];
    var _e = useState(''), confirmPassword = _e[0], setConfirmPassword = _e[1];
    var _f = useState(null), error = _f[0], setError = _f[1];
    var _g = useState(false), loading = _g[0], setLoading = _g[1];
    var _h = useState(false), showPassword = _h[0], setShowPassword = _h[1];
    var _j = useState({
        length: false,
        number: false,
        lowercase: false,
        uppercase: false,
        special: false,
    }), validation = _j[0], setValidation = _j[1];
    var location = useLocation();
    var username = (_a = location.state) === null || _a === void 0 ? void 0 : _a.username;
    var passwordRequirements = {
        length: /(?=.{8,})/,
        number: /(?=.*\d)/,
        lowercase: /(?=.*[a-z])/,
        uppercase: /(?=.*[A-Z])/,
        special: /(?=.*[!@#$%^&*(),.?":{}|<>])/,
    };
    var validatePassword = function (password) {
        setValidation({
            length: passwordRequirements.length.test(password),
            number: passwordRequirements.number.test(password),
            lowercase: passwordRequirements.lowercase.test(password),
            uppercase: passwordRequirements.uppercase.test(password),
            special: passwordRequirements.special.test(password),
        });
    };
    var handleNewPasswordChange = function (e) {
        var value = e.target.value;
        setNewPassword(value);
        validatePassword(value);
    };
    var handleSubmit = function (event) { return __awaiter(void 0, void 0, void 0, function () {
        var response, data, quickSightResponse, quickSightData, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    event.preventDefault();
                    setError(null);
                    if (newPassword !== confirmPassword) {
                        setError('Passwords do not match');
                        return [2 /*return*/];
                    }
                    if (Object.values(validation).some(function (v) { return !v; })) {
                        setError('Password does not meet all the requirements.');
                        return [2 /*return*/];
                    }
                    setLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 8, 9, 10]);
                    return [4 /*yield*/, fetch('https://zfwz6noc5l.execute-api.ap-southeast-1.amazonaws.com/prod/login', {
                            method: 'POST',
                            body: JSON.stringify({
                                username: username != null ? username : currentUsername,
                                password: currentPassword,
                                newPassword: newPassword,
                            }),
                        })];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    if (!response.ok) return [3 /*break*/, 6];
                    return [4 /*yield*/, fetch('https://9ii05tc15d.execute-api.ap-southeast-1.amazonaws.com/prod/dashboard', {
                            method: 'GET',
                            headers: {
                                Authorization: "Bearer ".concat(data.tokens.IdToken),
                            },
                        })];
                case 4:
                    quickSightResponse = _a.sent();
                    return [4 /*yield*/, quickSightResponse.json()];
                case 5:
                    quickSightData = _a.sent();
                    if (quickSightResponse.ok && quickSightData.embedUrl) {
                        window.location.href = quickSightData.embedUrl;
                    }
                    else {
                        setError('Failed to retrieve QuickSight URL.');
                    }
                    return [3 /*break*/, 7];
                case 6:
                    setError(data.error || 'Failed to change password. Please try again.');
                    _a.label = 7;
                case 7: return [3 /*break*/, 10];
                case 8:
                    err_1 = _a.sent();
                    setError('An error occurred. Please try again.');
                    return [3 /*break*/, 10];
                case 9:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 10: return [2 /*return*/];
            }
        });
    }); };
    var handleClickShowPassword = function () {
        setShowPassword(function (show) { return !show; });
    };
    return (_jsxs(Grid, { container: true, component: "main", sx: { height: '100vh', position: 'relative' }, children: [_jsx(Box, { sx: { position: 'absolute', top: 30, left: 16 }, children: _jsx("img", { src: "/logo/logo.jpeg", alt: "Logo", style: { width: 40 } }) }), _jsx(Grid, { item: true, xs: 12, sm: 8, md: 5, sx: {
                    mx: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }, children: _jsxs(Box, { sx: {
                        mt: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        backgroundColor: 'transparent',
                        boxShadow: 'none',
                    }, children: [_jsx(Typography, { component: "h1", variant: "h4", gutterBottom: true, children: "Before You Start!" }), _jsx(Typography, { variant: "body2", color: "textSecondary", align: "center", sx: { mb: 4 }, children: "Since this is your first log in, please update to a new password to access the dashboard." }), _jsxs(Box, { component: "form", noValidate: true, onSubmit: handleSubmit, sx: { width: '100%', mt: 1 }, children: [_jsx(TextField, { margin: "normal", required: true, fullWidth: true, name: "username", label: "Username", id: "username", value: username, onChange: function (e) { return setCurrentUsername(e.target.value); }, autoComplete: "username" }), _jsx(TextField, { margin: "normal", required: true, fullWidth: true, name: "currentPassword", label: "Current Password", type: showPassword ? 'text' : 'password', id: "currentPassword", autoComplete: "current-password", value: currentPassword, onChange: function (e) { return setCurrentPassword(e.target.value); }, InputProps: {
                                        endAdornment: (_jsx(IconButton, { onClick: handleClickShowPassword, edge: "end", children: showPassword ? _jsx(VisibilityOff, {}) : _jsx(Visibility, {}) })),
                                    } }), _jsx(TextField, { margin: "normal", required: true, fullWidth: true, name: "newPassword", label: "New Password", type: showPassword ? 'text' : 'password', id: "newPassword", autoComplete: "new-password", value: newPassword, onChange: handleNewPasswordChange, InputProps: {
                                        endAdornment: (_jsx(IconButton, { onClick: handleClickShowPassword, edge: "end", children: showPassword ? _jsx(VisibilityOff, {}) : _jsx(Visibility, {}) })),
                                    } }), _jsx(TextField, { margin: "normal", required: true, fullWidth: true, name: "confirmPassword", label: "Confirm New Password", type: showPassword ? 'text' : 'password', id: "confirmPassword", autoComplete: "new-password", value: confirmPassword, onChange: function (e) { return setConfirmPassword(e.target.value); }, InputProps: {
                                        endAdornment: (_jsx(IconButton, { onClick: handleClickShowPassword, edge: "end", children: showPassword ? _jsx(VisibilityOff, {}) : _jsx(Visibility, {}) })),
                                    } }), error && (_jsx(Alert, { severity: "error", sx: { mt: 2 }, children: error })), _jsxs(Box, { sx: { mt: 2 }, children: [_jsx(Typography, { variant: "body2", color: "textSecondary", children: "Password Requirements:" }), _jsxs(Typography, { variant: "body2", sx: { color: validation.length ? 'green' : 'red' }, children: [_jsx(CheckCircle, { sx: { fontSize: '16px', verticalAlign: 'middle', color: validation.length ? 'green' : 'red' } }), ' ', "Minimum 8 characters"] }), _jsxs(Typography, { variant: "body2", sx: { color: validation.number ? 'green' : 'red' }, children: [_jsx(CheckCircle, { sx: { fontSize: '16px', verticalAlign: 'middle', color: validation.number ? 'green' : 'red' } }), ' ', "At least 1 number"] }), _jsxs(Typography, { variant: "body2", sx: { color: validation.lowercase ? 'green' : 'red' }, children: [_jsx(CheckCircle, { sx: { fontSize: '16px', verticalAlign: 'middle', color: validation.lowercase ? 'green' : 'red' } }), ' ', "At least 1 lowercase letter"] }), _jsxs(Typography, { variant: "body2", sx: { color: validation.uppercase ? 'green' : 'red' }, children: [_jsx(CheckCircle, { sx: { fontSize: '16px', verticalAlign: 'middle', color: validation.uppercase ? 'green' : 'red' } }), ' ', "At least 1 uppercase letter"] }), _jsxs(Typography, { variant: "body2", sx: { color: validation.special ? 'green' : 'red' }, children: [_jsx(CheckCircle, { sx: { fontSize: '16px', verticalAlign: 'middle', color: validation.special ? 'green' : 'red' } }), ' ', "At least 1 special character"] })] }), _jsx(Button, { type: "submit", fullWidth: true, variant: "contained", color: "primary", sx: {
                                        mt: 3,
                                        mb: 2,
                                        backgroundColor: '#333', // Nearly black color
                                        color: '#fff', // White text
                                        '&:hover': {
                                            backgroundColor: '#000', // Darker black on hover
                                        },
                                    }, disabled: loading || Object.values(validation).some(function (v) { return !v; }), children: loading ? 'Processing...' : 'Update Password' })] })] }) })] }));
};
export default ChangePassword;
