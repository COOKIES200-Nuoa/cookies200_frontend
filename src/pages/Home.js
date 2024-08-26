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
// src/pages/Home.tsx
import { useState } from 'react';
import { Button, Box, Typography, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/context/AuthProvider';
import paths from '../paths';
var Home = function () {
    var auth = useAuth();
    var navigate = useNavigate();
    var _a = useState(null), error = _a[0], setError = _a[1];
    var handleLogout = function () {
        auth.logout();
        navigate(paths.login);
    };
    var handleOpenDashboard = function () { return __awaiter(void 0, void 0, void 0, function () {
        var quickSightResponse, quickSightData, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setError(null);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch('https://9ii05tc15d.execute-api.ap-southeast-1.amazonaws.com/prod/dashboard', {
                            method: 'GET',
                            headers: {
                                Authorization: "Bearer ".concat(auth.getIdToken()), // Use the stored token
                            },
                        })];
                case 2:
                    quickSightResponse = _a.sent();
                    return [4 /*yield*/, quickSightResponse.json()];
                case 3:
                    quickSightData = _a.sent();
                    if (quickSightResponse.ok && quickSightData.embedUrl) {
                        window.open(quickSightData.embedUrl, '_blank');
                    }
                    else {
                        setError('Failed to retrieve QuickSight URL.');
                    }
                    return [3 /*break*/, 5];
                case 4:
                    err_1 = _a.sent();
                    setError('An error occurred while opening the dashboard.');
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    return (_jsxs(Box, { sx: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
        }, children: [_jsx(Typography, { variant: "h4", gutterBottom: true, children: "Home Page" }), error && (_jsx(Alert, { severity: "error", sx: { mb: 2 }, children: error })), _jsx(Button, { variant: "contained", color: "primary", onClick: handleOpenDashboard, sx: { mb: 2 }, children: "Open Dashboard" }), _jsx(Button, { variant: "contained", color: "secondary", onClick: handleLogout, children: "Logout" })] }));
};
export default Home;
