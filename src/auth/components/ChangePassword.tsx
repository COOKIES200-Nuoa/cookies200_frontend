import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Button, Grid, TextField, Typography, Alert, IconButton } from '@mui/material';
import { CheckCircle, Visibility, VisibilityOff } from '@mui/icons-material';

const ChangePassword: React.FC = () => {
  const [currentUsername, setCurrentUsername] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [validation, setValidation] = useState({
    length: false,
    number: false,
    lowercase: false,
    uppercase: false,
    special: false,
  });

  const location = useLocation();
  const username = location.state?.username;

  const passwordRequirements = {
    length: /(?=.{8,})/,
    number: /(?=.*\d)/,
    lowercase: /(?=.*[a-z])/,
    uppercase: /(?=.*[A-Z])/,
    special: /(?=.*[!@#$%^&*(),.?":{}|<>])/,
  };

  const validatePassword = (password: string) => {
    setValidation({
      length: passwordRequirements.length.test(password),
      number: passwordRequirements.number.test(password),
      lowercase: passwordRequirements.lowercase.test(password),
      uppercase: passwordRequirements.uppercase.test(password),
      special: passwordRequirements.special.test(password),
    });
  };

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNewPassword(value);
    validatePassword(value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (Object.values(validation).some((v) => !v)) {
      setError('Password does not meet all the requirements.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('https://zfwz6noc5l.execute-api.ap-southeast-1.amazonaws.com/prod/login', {
        method: 'POST',
        body: JSON.stringify({
          username: username!=null ? username : currentUsername,
          password: currentPassword,
          newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const quickSightResponse = await fetch('https://9ii05tc15d.execute-api.ap-southeast-1.amazonaws.com/prod/dashboard', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${data.tokens.IdToken}`,
          },
        });

        const quickSightData = await quickSightResponse.json();

        if (quickSightResponse.ok && quickSightData.embedUrl) {
          window.location.href = quickSightData.embedUrl;
        } else {
          setError('Failed to retrieve QuickSight URL.');
        }
      } else {
        setError(data.error || 'Failed to change password. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <Grid container component="main" sx={{ height: '100vh', position: 'relative' }}>
      {/* Top Left Logo */}
      <Box sx={{ position: 'absolute', top: 30, left: 16 }}>
        <img src="/logo/logo.jpeg" alt="Logo" style={{ width: 40 }} />
      </Box>

      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        sx={{
          mx: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            mt: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'transparent',
            boxShadow: 'none',
          }}
        >
          <Typography component="h1" variant="h4" gutterBottom>
            Before You Start!
          </Typography>
          <Typography variant="body2" color="textSecondary" align="center" sx={{ mb: 4 }}>
            Since this is your first log in, please update to a new password to access the dashboard.
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ width: '100%', mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="username"
              label="Username"
              id="username"
              value={username}
              onChange={(e) => setCurrentUsername(e.target.value)}
              autoComplete="username"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="currentPassword"
              label="Current Password"
              type={showPassword ? 'text' : 'password'}
              id="currentPassword"
              autoComplete="current-password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={handleClickShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="newPassword"
              label="New Password"
              type={showPassword ? 'text' : 'password'}
              id="newPassword"
              autoComplete="new-password"
              value={newPassword}
              onChange={handleNewPasswordChange}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={handleClickShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm New Password"
              type={showPassword ? 'text' : 'password'}
              id="confirmPassword"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={handleClickShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />
            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="textSecondary">
                Password Requirements:
              </Typography>
              <Typography variant="body2" sx={{ color: validation.length ? 'green' : 'red' }}>
                <CheckCircle sx={{ fontSize: '16px', verticalAlign: 'middle', color: validation.length ? 'green' : 'red' }} />{' '}
                Minimum 8 characters
              </Typography>
              <Typography variant="body2" sx={{ color: validation.number ? 'green' : 'red' }}>
                <CheckCircle sx={{ fontSize: '16px', verticalAlign: 'middle', color: validation.number ? 'green' : 'red' }} />{' '}
                At least 1 number
              </Typography>
              <Typography variant="body2" sx={{ color: validation.lowercase ? 'green' : 'red' }}>
                <CheckCircle sx={{ fontSize: '16px', verticalAlign: 'middle', color: validation.lowercase ? 'green' : 'red' }} />{' '}
                At least 1 lowercase letter
              </Typography>
              <Typography variant="body2" sx={{ color: validation.uppercase ? 'green' : 'red' }}>
                <CheckCircle sx={{ fontSize: '16px', verticalAlign: 'middle', color: validation.uppercase ? 'green' : 'red' }} />{' '}
                At least 1 uppercase letter
              </Typography>
              <Typography variant="body2" sx={{ color: validation.special ? 'green' : 'red' }}>
                <CheckCircle sx={{ fontSize: '16px', verticalAlign: 'middle', color: validation.special ? 'green' : 'red' }} />{' '}
                At least 1 special character
              </Typography>
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: '#333', // Nearly black color
                color: '#fff', // White text
                '&:hover': {
                  backgroundColor: '#000', // Darker black on hover
                },
              }}
              disabled={loading || Object.values(validation).some((v) => !v)}
            >
              {loading ? 'Processing...' : 'Update Password'}
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ChangePassword;
