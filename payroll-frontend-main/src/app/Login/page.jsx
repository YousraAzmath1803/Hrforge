"use client";
import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
  Tabs,
  Tab,
  Alert,
  Link,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PasswordIcon from "@mui/icons-material/Password";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation
import { LoginButton } from "@/components/LoginButton";

const API_BASE_URL = "/api"; // Create a variable for the API base URL

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [tabValue, setTabValue] = useState(0); // State to manage tab selection
  const [accountCreated, setAccountCreated] = useState(false); // State to manage account creation success
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false); // State to manage forgot password dialog
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState(""); // State to manage forgot password email
  const router = useRouter(); // Initialize useRouter

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    if (tabValue === 0) {
      router.push("/admin/Home");
    } else {
      // Handle sign up logic here
      setAccountCreated(true);
    }
  };

  const handleShowPassword = () => setShowPassword(!showPassword);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setAccountCreated(false); // Reset account creation success on tab change
  };

  const handleForgotPasswordOpen = () => {
    setForgotPasswordOpen(true);
  };

  const handleForgotPasswordClose = () => {
    setForgotPasswordOpen(false);
  };

  const handleForgotPasswordSubmit = () => {
    // Handle forgot password logic here
    // For example, send an email to the user with a password reset link
    setForgotPasswordOpen(false);
  };

  return (
    <Box
      sx={{
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
        padding: 2,
        maxWidth: "600px",
        margin: "0 auto",
        background:
          "linear-gradient(135deg, #3480eb 0%, #3480eb 50%, #f5f5f5 50%)",
      }}
    >
      <LoginButton />
      {/* <Container component="main" maxWidth="xs">
        <Paper elevation={6} sx={{ padding: 4, borderRadius: 3, backgroundColor: '#ffffff', width: '400px', height: '450px', ml: -4 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <LockOutlinedIcon color="primary" sx={{ fontSize: 50 }} />
            <Typography component="h1" variant="h5">
              Admin Panel
            </Typography>
            {!forgotPasswordOpen && (
              <>
                <Tabs value={tabValue} onChange={handleTabChange} aria-label="login and signup tabs">
                  <Tab label="Login" />
                  <Tab label="Sign Up" />
                </Tabs>
                {accountCreated && (
                  <Alert severity="success" sx={{ mt: 2, width: '100%' }}>
                    Account successfully created! Please login.
                  </Alert>
                )}
              </>
            )}
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
              {!forgotPasswordOpen ? (
                <>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label={tabValue === 0 ? "Admin Mail" : "Admin Mail"}
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SupervisorAccountIcon />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '4px',
                        backgroundColor: '#ffffff',
                        border: '1px solid #ddd',
                        padding: '10px',
                        '& fieldset': {
                          border: '1px solid #ddd',
                        },
                      },
                    }}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label={tabValue === 0 ? "Enter Password" : "Create Password"}
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PasswordIcon />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleShowPassword}
                            edge="end"
                          >
                            {showPassword ? <PasswordIcon /> : <PasswordIcon />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '4px',
                        backgroundColor: '#ffffff',
                        border: '1px solid #ddd',
                        padding: '10px',
                        '& fieldset': {
                          border: '1px solid #ddd',
                        },
                      },
                    }}
                  />
                </>
              ) : (
                <Box sx={{ mt: 2, width: '100%' }}>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="forgot-password-email"
                    label="Enter your email"
                    type="email"
                    fullWidth
                    variant="outlined"
                    value={forgotPasswordEmail}
                    onChange={(e) => setForgotPasswordEmail(e.target.value)}
                  />
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <Button onClick={handleForgotPasswordClose} color="primary">
                      Cancel
                    </Button>
                    <Button onClick={handleForgotPasswordSubmit} color="primary" sx={{ ml: 1 }}>
                      Send Email
                    </Button>
                  </Box>
                </Box>
              )}
              {!forgotPasswordOpen && (
                <>
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, mb: 2 }}>
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        padding: '10px 0',
                        borderRadius: '25px',
                        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                        flex: 1,
                        mr: 1,
                      }}
                    >
                      {tabValue === 0 ? "Login" : "Sign Up"}
                    </Button>
                  </Box>
                  {tabValue === 0 && (
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                      <Link href="#" variant="body2" onClick={handleForgotPasswordOpen}>
                        Forgot password?
                      </Link>
                    </Box>
                  )}
                </>
              )}
            </Box>
          </Box>
        </Paper>
      </Container> */}
    </Box>
  );
};

export default Login;
