import { jsx as _jsx } from "react/jsx-runtime";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./auth/context/AuthProvider";
var App = function () {
    return (_jsx(AuthProvider, { children: _jsx(Router, { children: _jsx(AppRoutes, {}) }) }));
};
export default App;
