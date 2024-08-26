// src/pages/Home.tsx
import React, { useState } from 'react';
import { Button, Box, Typography, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/context/AuthProvider';
import paths from '../paths';

const Home: React.FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleLogout = () => {
    auth.logout();
    navigate(paths.login);
  };

  const handleOpenDashboard = async () => {
    setError(null);

    try {
      const quickSightResponse = await fetch('https://9ii05tc15d.execute-api.ap-southeast-1.amazonaws.com/prod/dashboard', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${auth.getIdToken()}`, // Use the stored token
        },
      });

      const quickSightData = await quickSightResponse.json();

      if (quickSightResponse.ok && quickSightData.embedUrl) {
        window.open(quickSightData.embedUrl, '_blank');
      } else {
        setError('Failed to retrieve QuickSight URL.');
      }
    } catch (err) {
      setError('An error occurred while opening the dashboard.');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Home Page
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Button variant="contained" color="primary" onClick={handleOpenDashboard} sx={{ mb: 2 }}>
        Open Dashboard
      </Button>

      <Button variant="contained" color="secondary" onClick={handleLogout}>
        Logout
      </Button>
    </Box>
  );
};

export default Home;
