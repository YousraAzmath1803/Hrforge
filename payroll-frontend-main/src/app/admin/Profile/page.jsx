'use client';
import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';

const API_BASE_URL = "http://localhost:8080/api";

const ProfilePage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [role, setRole] = useState('');
  const [department, setDepartment] = useState('');
  const [savedProfile, setSavedProfile] = useState(null);

  const handleSave = () => {
    const profile = { username, email, phoneNumber, address, profilePicture, role, department };
    setSavedProfile(profile);
    console.log('Profile saved:', profile);
  };

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePicture(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = () => {
    setUsername(savedProfile.username);
    setEmail(savedProfile.email);
    setPhoneNumber(savedProfile.phoneNumber);
    setAddress(savedProfile.address);
    setProfilePicture(savedProfile.profilePicture);
    setRole(savedProfile.role);
    setDepartment(savedProfile.department);
    setSavedProfile(null);
  };

  return (
    <Box sx={{ padding: 3, minHeight: '100vh', textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#124E66', textAlign: 'center' }}>
        User Profile
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {!savedProfile ? (
          <>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Button
                variant="contained"
                component="label"
                sx={{
                  padding: '20px',
                  backgroundColor: profilePicture ? 'white' : '#124E66',
                  color: profilePicture ? '#124E66' : 'white',
                  '&:hover': {
                    backgroundColor: profilePicture ? 'white' : '#0d3b4f',
                    color: profilePicture ? '#124E66' : 'white'
                  },
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                {profilePicture ? (
                  <img src={profilePicture} alt="Profile" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
                ) : (
                  <>
                    <UploadFileIcon sx={{ marginBottom: '10px' }} />
                    Upload Profile Picture
                  </>
                )}
                <input type="file" hidden onChange={handleProfilePictureChange} />
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                variant="outlined"
                sx={{ borderRadius: '8px' }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
                sx={{ borderRadius: '8px' }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                variant="outlined"
                sx={{ borderRadius: '8px' }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                variant="outlined"
                sx={{ borderRadius: '8px' }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                variant="outlined"
                sx={{ borderRadius: '8px' }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                variant="outlined"
                sx={{ borderRadius: '8px' }}
              />
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSave}
                sx={{
                  backgroundColor: '#124E66',
                  '&:hover': {
                    backgroundColor: '#0d3b4f',
                  },
                  padding: '10px 30px',
                  borderRadius: '12px',
                  boxShadow: '0 6px 20px rgba(0, 0, 0, 0.12)',
                }}
              >
                Save Profile
              </Button>
            </Grid>
          </>
        ) : (
          <Grid item xs={12} sx={{ textAlign: 'center' }}>
            {savedProfile.profilePicture && (
              <img src={savedProfile.profilePicture} alt="Saved Profile" style={{ width: '100px', height: '100px', borderRadius: '50%', marginBottom: '20px' }} />
            )}
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#124E66' }}>Saved Profile:</Typography>
            <Typography variant="body1" sx={{ marginBottom: '10px' }}><strong>Username:</strong> {savedProfile.username}</Typography>
            <Typography variant="body1" sx={{ marginBottom: '10px' }}><strong>Email:</strong> {savedProfile.email}</Typography>
            <Typography variant="body1" sx={{ marginBottom: '10px' }}><strong>Phone Number:</strong> {savedProfile.phoneNumber}</Typography>
            <Typography variant="body1" sx={{ marginBottom: '10px' }}><strong>Address:</strong> {savedProfile.address}</Typography>
            <Typography variant="body1" sx={{ marginBottom: '10px' }}><strong>Role:</strong> {savedProfile.role}</Typography>
            <Typography variant="body1" sx={{ marginBottom: '10px' }}><strong>Department:</strong> {savedProfile.department}</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleEdit}
              sx={{
                backgroundColor: '#124E66',
                '&:hover': {
                  backgroundColor: '#0d3b4f',
                },
                padding: '10px 30px',
                borderRadius: '12px',
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.12)',
                marginTop: '20px',
              }}
            >
              Edit Profile
            </Button>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default ProfilePage;
