// src/pages/NotFound.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import paths from '../paths';

const NotFound: React.FC = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you are looking for does not exist.</p>
      <Link to={paths.home} style={{ textDecoration: 'none', color: 'blue' }}>
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFound;
