'use client';
import React, { useState } from 'react';
import {
  Paper,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  IconButton,
  Button,
  Input,
  Stack,
  Alert,
  Chip
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LoginIcon from '@mui/icons-material/Login';
import LockIcon from '@mui/icons-material/Lock';

// Email Validation
const isEmail = (email) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

const LogSign = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [formValid, setFormValid] = useState('');
  const [success, setSuccess] = useState('');

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleEmail = () => {
    if (!isEmail(emailInput)) {
      setEmailError(true);
      return;
    }
    setEmailError(false);
  };

  const handlePassword = () => {
    if (!passwordInput || passwordInput.length < 5 || passwordInput.length > 20) {
      setPasswordError(true);
      return;
    }
    setPasswordError(false);
  };

  const handleSubmit = () => {
    setSuccess('');

    if (emailError || !emailInput) {
      setFormValid('Email is invalid. Please re-enter.');
      return;
    }

    if (passwordError || !passwordInput || passwordInput.length < 5 || passwordInput.length > 20) {
      setFormValid('Password must be between 5 - 20 characters long. Please re-enter.');
      return;
    }

    setFormValid('');
    setSuccess('Form Submitted Successfully');
    console.log('Email:', emailInput);
    console.log('Password:', passwordInput);
  };

  return (
    <div className='App' >
      <Paper elevation={8} style={{ padding: '10px', background:'transparent', marginTop:'50px'}} >
        <Chip
          icon={<LockIcon />}
          label='Log in'
          color='primary'
          variant='outlined'
        />
        <br />

        <div style={{ marginTop: '5px' }}>
          <TextField
            label='Email Address'
            fullWidth
            error={emailError}
            variant='standard'
            sx={{ width: '100%' }}
            value={emailInput}
            size='small'
            onBlur={handleEmail}
            onChange={(event) => setEmailInput(event.target.value)}
          />
        </div>

        <div style={{ marginTop: '5px' }}>
          <FormControl sx={{ width: '100%' }} variant='standard'>
            <InputLabel error={passwordError} htmlFor='standard-adornment-password'>
              Password
            </InputLabel>
            <Input
              error={passwordError}
              onBlur={handlePassword}
              id='standard-adornment-password'
              type={showPassword ? 'text' : 'password'}
              value={passwordInput}
              onChange={(event) => setPasswordInput(event.target.value)}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </div>

        <div style={{ marginTop: '10px' }}>
          <Button
            variant='contained'
            fullWidth
            startIcon={<LoginIcon />}
            onClick={handleSubmit}
          >
            LOGIN
          </Button>
        </div>

        {formValid && (
          <Stack sx={{ width: '100%', paddingTop: '10px' }} spacing={2}>
            <Alert severity='error'>{formValid}</Alert>
          </Stack>
        )}

        {success && (
          <Stack sx={{ width: '100%', paddingTop: '10px' }} spacing={2}>
            <Alert severity='success'>{success}</Alert>
          </Stack>
        )}

        <div style={{ marginTop: '7px', fontSize: '10px' }}>
          <a href='../forgot-password'>Forgot Password</a>
          <br />
        </div>
      </Paper>
    </div>
  );
};

export default LogSign;
