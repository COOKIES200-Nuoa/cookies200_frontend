import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Grid, Alert } from '@mui/material';
import emailjs from '@emailjs/browser';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);

    const serviceID = 'service_k2x8a4h'; 
    const templateID = 'template_ps3oe89'; 
    const publicKey = 'F4jDL3y2vOepkiteT'; 

    try {
      const result = await emailjs.send(
        serviceID,
        templateID,
        {
          username: formData.username,
          email: formData.email,
          phone: formData.phone,
        },
        publicKey
      );

      if (result.status === 200) {
        setSuccess(true);
        setFormData({ username: '', email: '', phone: '' }); // Reset form
      } else {
        setError('Failed to send your request. Please try again.');
      }
    } catch (err) {
      setError('An error occurred while sending your request.');
    } finally {
      setLoading(false);
    }
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
            Contact Us
          </Typography>
          <Typography variant="body2" color="textSecondary" align="center" sx={{ mb: 4 }}>
            Please provide your details so we can contact you for your dashboard customization's requirements.
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ width: '100%', mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="username"
              label="Username"
              id="username"
              value={formData.username}
              onChange={handleChange}
              autoComplete="username"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="email"
              label="Email"
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="phone"
              label="Phone Number"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              autoComplete="tel"
            />
            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}
            {success && (
              <Alert severity="success" sx={{ mt: 2 }}>
                Your request has been successfully submitted!
              </Alert>
            )}
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
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit'}
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ContactForm;
