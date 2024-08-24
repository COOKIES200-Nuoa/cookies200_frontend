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
// src/auth/components/Login.tsx
import { useState, useEffect } from "react";
import { Grid, Paper, Box, Typography, TextField, Button, Link, } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import paths from "../../paths";
var Login = function () {
    var _a = useState(""), username = _a[0], setUsername = _a[1];
    var _b = useState(""), password = _b[0], setPassword = _b[1];
    var _c = useState(null), error = _c[0], setError = _c[1];
    var _d = useState(false), forceChangePassword = _d[0], setForceChangePassword = _d[1];
    var _e = useState(false), loading = _e[0], setLoading = _e[1];
    var auth = useAuth();
    var navigate = useNavigate();
    useEffect(function () {
        if (forceChangePassword) {
            navigate(paths.changePassword, { state: { username: username } });
        }
    }, [forceChangePassword]);
    var handleSubmit = function (event) { return __awaiter(void 0, void 0, void 0, function () {
        var response, data, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    event.preventDefault();
                    setLoading(true);
                    setError(null);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 5, 6]);
                    return [4 /*yield*/, fetch("https://zfwz6noc5l.execute-api.ap-southeast-1.amazonaws.com/prod/login", {
                            method: "POST",
                            body: JSON.stringify({
                                username: username,
                                password: password,
                            }),
                        })];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    if (response.ok) {
                        auth.login(data.tokens.IdToken); // Handle token storage and user authentication
                        navigate(paths.dashboard);
                    }
                    else {
                        if (data.message === "New password required.") {
                            setForceChangePassword(true);
                            navigate(paths.changePassword, { state: { username: username } });
                            setError(data.message || "Login failed. Please try again.");
                        }
                        setError(data.error || "Login failed. Please try again.");
                    }
                    return [3 /*break*/, 6];
                case 4:
                    err_1 = _a.sent();
                    setError("An error occurred. Please try again.");
                    return [3 /*break*/, 6];
                case 5:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    return (_jsxs(Grid, { container: true, component: "main", sx: { height: "100vh" }, children: [_jsx(Grid, { item: true, xs: false, sm: 4, md: 7, sx: {
                    backgroundImage: "url('/assets/bg.jpeg')", // Update with the correct path
                    backgroundRepeat: "no-repeat",
                    backgroundColor: function (t) {
                        return t.palette.mode === "light"
                            ? t.palette.grey[50]
                            : t.palette.grey[900];
                    },
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                } }), _jsx(Grid, { item: true, xs: 12, sm: 8, md: 5, component: Paper, elevation: 6, square: true, children: _jsxs(Box, { sx: {
                        my: 8,
                        mx: 4,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "left",
                        justifyContent: "flex-end",
                    }, children: [_jsx(Box, { sx: {
                                pt: 2.5,
                                pb: 2, // Adds spacing according to the theme, where 3 = 24px by default
                            }, children: _jsx("img", { src: "/logo/logo.jpeg", alt: "Logo", style: { width: 40 } }) }), _jsx(Typography, { component: "h1", variant: "h4", sx: { fontWeight: 'bold' }, children: "Welcome Back" }), _jsxs(Box, { component: "form", noValidate: true, onSubmit: handleSubmit, sx: { mt: 1 }, children: [_jsx(TextField, { margin: "normal", required: true, fullWidth: true, id: "username", label: "Username", name: "username", autoComplete: "username", autoFocus: true, value: username, onChange: function (e) { return setUsername(e.target.value); } }), _jsx(TextField, { margin: "normal", required: true, fullWidth: true, name: "password", label: "Password", type: "password", id: "password", autoComplete: "current-password", value: password, onChange: function (e) { return setPassword(e.target.value); } }), error && (_jsx(Typography, { color: "error", variant: "body2", children: error })), _jsx(Button, { type: "submit", fullWidth: true, variant: "contained", color: "primary", sx: {
                                        mt: 3,
                                        mb: 2,
                                        backgroundColor: '#333', // Nearly black color
                                        color: '#fff', // White text
                                        '&:hover': {
                                            backgroundColor: '#000', // Darker black on hover
                                        },
                                    }, disabled: loading, children: loading ? "Logging in..." : "Login" }), _jsx(Grid, { container: true, children: _jsx(Grid, { item: true, xs: true, children: _jsxs(Typography, { variant: "body2", color: "text.secondary", align: "center", sx: { marginTop: 2 }, children: ["Copyright © ", _jsx(Link, { href: "#", children: "Nuoa" }), " ", new Date().getFullYear(), "."] }) }) })] })] }) })] }));
};
export default Login;
