// src/pages/Dashboard.tsx
import React, { useEffect } from 'react';
import { useAuth } from '../auth/context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import paths from '../paths';

const Dashboard: React.FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardUrl = async () => {
      const idToken = auth.getIdToken();

      if (idToken) {
        try {
          const response = await fetch('https://9ii05tc15d.execute-api.ap-southeast-1.amazonaws.com/prod/dashboard', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          });

          const data = await response.json();

          if (response.ok && data.embedUrl) {
            // Redirect to the embed URL
            // window.location.href = data.embedUrl;
            window.open(data.embedUrl, '_blank');
            navigate(paths.home);
          } else {
            // Handle the case where the URL is not available or the request failed
            console.error('Failed to fetch QuickSight embed URL');
          }
        } catch (error) {
          console.error('Error fetching QuickSight embed URL:', error);
        }
      } else {
        // If no ID token, redirect to login
        navigate(paths.login);
      }
    };

    fetchDashboardUrl();
  }, [auth, navigate]);

  return null; // The component does not need to render anything
};

export default Dashboard;
