// src/auth/components/Login.tsx
import React, { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import paths from "../../paths";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [forceChangePassword, setForceChangePassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (forceChangePassword) {
      navigate(paths.changePassword, { state: { username } });
    }
  }, [forceChangePassword]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://zfwz6noc5l.execute-api.ap-southeast-1.amazonaws.com/prod/login",
        {
          method: "POST",
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        auth.login(data.tokens.IdToken); // Handle token storage and user authentication
        navigate(paths.dashboard);
      } else {
        if (data.message === "New password required.") {
          setForceChangePassword(true);
          navigate(paths.changePassword, { state: { username } });
          setError(data.message || "Login failed. Please try again.");
        }
        setError(data.error || "Login failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url('/assets/bg.jpeg')`, // Update with the correct path
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      {/* Right side login form */}
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "left",
            justifyContent: "flex-end",
          }}
        >
          <Box
            sx={{
              pt: 2.5,
              pb: 2, // Adds spacing according to the theme, where 3 = 24px by default
            }}
          >
            <img src="/logo/logo.jpeg" alt="Logo" style={{ width: 40 }} />
          </Box>
          <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold' }}>
            Welcome Back
          </Typography>

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && (
              <Typography color="error" variant="body2">
                {error}
              </Typography>
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
              {loading ? "Logging in..." : "Login"}
            </Button>
            <Grid container>
              <Grid item xs>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  align="center"
                  sx={{ marginTop: 2 }}
                >
                  {"Copyright © "}
                  <Link href="#">Nuoa</Link> {new Date().getFullYear()}
                  {"."}
                </Typography>
              </Grid>
            </Grid>
          </Box>

          {/* Conditionally render the Change Password button */}
          {/* {forceChangePassword && (
            <Box sx={{ mt: 4 }}>
              <Button
                variant="outlined"
                onClick={() =>
                  navigate(paths.changePassword, { state: { username } })
                }
              >
                Change Password
              </Button>
            </Box>
          )} */}
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
