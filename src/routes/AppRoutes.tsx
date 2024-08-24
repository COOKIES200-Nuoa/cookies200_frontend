// src/routes/AppRoutes.tsx
import React from 'react';
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

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path={paths.login} element={<Login />} />
      <Route path={paths.changePassword} element={<ChangePassword />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path={paths.dashboard}
        element={
          <PrivateRoute>      
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route path={paths.notFound} element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
