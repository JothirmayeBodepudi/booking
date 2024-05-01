import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Avatar, Button, CssBaseline, TextField, Grid, Box, Typography, Container, Snackbar } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import './ForgetPassword.css';

const theme = createTheme();

const ForgetPassword = () => {
  const [formData, setFormData] = useState({ email: '', newPassword: '', verifyPassword: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleOpenSnackbar = (message) => {
    setSuccessMessage(message);
    setOpenSnackbar(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Check if passwords match
      if (formData.newPassword !== formData.verifyPassword) {
        setErrorMessage('Passwords do not match');
        return;
      }
      
      // Send request to update password
      const response = await axios.post('http://localhost:8080/resetpassword', {
        email: formData.email,
        password: formData.newPassword
      });

      // Handle success response
      console.log('Password reset successful:', response.data);
      handleOpenSnackbar('Password successfully changed');
    } catch (error) {
      // Handle error response
      console.error('Password reset failed:', error);
      setErrorMessage(error.response?.data?.message || 'Password reset failed. Please try again.');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Reset Password
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="newPassword"
              label="New Password"
              type="password"
              id="newPassword"
              autoComplete="new-password"
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="verifyPassword"
              label="Verify New Password"
              type="password"
              id="verifyPassword"
              autoComplete="new-password"
              onChange={handleChange}
            />
            {errorMessage && <Typography color="error">{errorMessage}</Typography>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Reset Password
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/" variant="body2" >
                  Back to Sign in
                </Link>
              </Grid>
            </Grid> 
          </Box>
        </Box>
      </Container>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={successMessage}
        action={
          <Button color="inherit" size="small" onClick={handleCloseSnackbar}>
            Close
          </Button>
        }
      />
    </ThemeProvider>

  );
}

export default ForgetPassword;
