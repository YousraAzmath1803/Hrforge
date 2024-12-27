'use client';
import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';

const API_BASE_URL = "/api";

const SettingsPage = () => {
  const [companyName, setCompanyName] = useState('');
  const [payrollFrequency, setPayrollFrequency] = useState('');
  const [currency, setCurrency] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [companyLogo, setCompanyLogo] = useState('');
  const [country, setCountry] = useState('');
  const [savedSettings, setSavedSettings] = useState(null);

  const handleSave = () => {
    const settings = { companyName, payrollFrequency, currency, companyAddress, companyLogo, country };
    setSavedSettings(settings);
    console.log('Settings saved:', settings);
  };

  const handleLogoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCompanyLogo(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = () => {
    setCompanyName(savedSettings.companyName);
    setPayrollFrequency(savedSettings.payrollFrequency);
    setCurrency(savedSettings.currency);
    setCompanyAddress(savedSettings.companyAddress);
    setCompanyLogo(savedSettings.companyLogo);
    setCountry(savedSettings.country);
    setSavedSettings(null);
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#124E66' }}>
        Company Payroll Settings
      </Typography>
      <Paper sx={{ padding: 3, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>
        <Grid container spacing={3}>
          {!savedSettings ? (
            <>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Button
                  variant="contained"
                  sx={{
                    padding: '20px 20px 15px',
                    backgroundColor: companyLogo ? 'white' : '#124E66',
                    color: companyLogo ? '#124E66' : 'white',
                    '&:hover': {
                      backgroundColor: companyLogo ? 'white' : '#0d3b4f',
                      color: companyLogo ? '#124E66' : 'white'
                    },
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '200px',
                    height: '200px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  }}
                  onClick={() => document.getElementById('uploadLogo')?.click()}
                >
                  {companyLogo ? (
                    <img src={companyLogo} alt="Logo" style={{ width: '100%', height: '100%', borderRadius: '8px' }} />
                  ) : (
                    <UploadFileIcon sx={{ fontSize: '5rem' }} />
                  )}
                </Button>
                <input
                  id="uploadLogo"
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  hidden
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Company Name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  variant="outlined"
                  sx={{ backgroundColor: 'white', borderRadius: '4px' }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Company Address"
                  value={companyAddress}
                  onChange={(e) => setCompanyAddress(e.target.value)}
                  variant="outlined"
                  sx={{ backgroundColor: 'white', borderRadius: '4px' }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined" sx={{ backgroundColor: 'white', borderRadius: '4px' }}>
                  <InputLabel>Payroll Frequency</InputLabel>
                  <Select
                    value={payrollFrequency}
                    onChange={(e) => setPayrollFrequency(e.target.value)}
                    label="Payroll Frequency"
                  >
                    <MenuItem value="weekly">Weekly</MenuItem>
                    <MenuItem value="bi-weekly">Bi-Weekly</MenuItem>
                    <MenuItem value="monthly">Monthly</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Currency"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  variant="outlined"
                  sx={{ backgroundColor: 'white', borderRadius: '4px' }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  variant="outlined"
                  sx={{ backgroundColor: 'white', borderRadius: '4px' }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSave}
                  sx={{
                    backgroundColor: '#124E66',
                    '&:hover': {
                      backgroundColor: '#0d3b4f',
                    },
                    padding: '10px 20px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  Save Settings
                </Button>
              </Grid>
            </>
          ) : (
            <Grid item xs={12}>
              <Paper sx={{ padding: 2, marginTop: 2, backgroundColor: '#e0f7fa', position: 'relative' }}>
                {savedSettings.companyLogo && (
                  <img src={savedSettings.companyLogo} alt="Saved Logo" style={{ position: 'absolute', top: '10px', right: '10px', width: '100px', height: '100px', borderRadius: '8px' }} />
                )}
                <Typography variant="h6" gutterBottom>Saved Settings:</Typography>
                <Typography variant="body1"><strong>Company Name:</strong> {savedSettings.companyName}</Typography>
                <Typography variant="body1"><strong>Company Address:</strong> {savedSettings.companyAddress}</Typography>
                <Typography variant="body1"><strong>Payroll Frequency:</strong> {savedSettings.payrollFrequency}</Typography>
                <Typography variant="body1"><strong>Currency:</strong> {savedSettings.currency}</Typography>
                <Typography variant="body1"><strong>Country:</strong> {savedSettings.country}</Typography>
                {savedSettings.companyLogo && (
                  <img src={savedSettings.companyLogo} alt="Saved Logo" style={{ position: 'absolute', top: '10px', right: '10px', width: '100px', height: '100px', borderRadius: '8px' }} />
                )}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleEdit}
                  sx={{
                    backgroundColor: '#124E66',
                    '&:hover': {
                      backgroundColor: '#0d3b4f',
                    },
                    padding: '10px 20px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    marginTop: '10px',
                  }}
                >
                  Edit Settings
                </Button>
              </Paper>
            </Grid>
          )}
        </Grid>
      </Paper>
    </Box>
  );
};

export default SettingsPage;
