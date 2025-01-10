
'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Container, Grid, Box, Avatar, Typography, Button, Card, CardContent, IconButton, Menu, MenuItem, TextField, Snackbar, Dialog, DialogTitle, DialogContent, DialogActions, Alert, InputLabel, Select, FormControl, OutlinedInput } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { AltRoute } from '@mui/icons-material';

const Profile = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOption, setSelectedOption] = useState('Profile');
  const [isEditable, setIsEditable] = useState(false); // Track if fields are editable
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    dateofjoin: '',
    dateOfBirth: '',
    employeeName: '',
    department: '',
    jobTitle:'',
    employeeId: '',
    email: '',
    contactNumber: '',
    jobType: '',
    skills: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India', // Assuming country is always India
    password: ''
   
  });
 
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);
  const [fieldToEdit, setFieldToEdit] = useState(''); // To track which field is being edited
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [selectedField, setSelectedField] = useState(null); // To track which field was clicked (email/phone)
  const [showPasswordFields, setShowPasswordFields] = useState(false); // To track password field edit
  const [otpDialogOpen, setOtpDialogOpen] = useState(false);
  const [updatedDetails, setUpdatedDetails] = useState(null); // For showing updated details
  const [notificationOpen, setNotificationOpen] = useState(false); // For showing notification
  const [showOtpField, setShowOtpField] = useState(false);
  const [otp, setOtp] = useState('');
  const [emailEditable, setEmailEditable] = useState(false);
  const [phoneEditable, setPhoneEditable] = useState(false);
  //const [passwords, setPasswords] = useState({ old: '', new: '', confirm: '' });
  const [oldPassword,setOldPassword]=useState('');
  const [confirmPassword,setConfirmPassword]=useState('');
  const [newPassword,setNewPassword]=useState('');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // or 'error'
  const [passwordError, setPasswordError] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageData, setImageData] = useState('');
  const [loading, setLoading] = useState(false);
  const [noImage, setNoImage] = useState(false);
  const passwordRef = useRef(null);
 // Function to close the password fields (similar to Cancel button)
 const closePasswordFields = () => {
  setOldPassword('');
  setNewPassword('');
  setConfirmPassword('');
  setShowPasswordFields(false);
};



  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'old':
        setOldPassword(value);
        break;
      case 'new':
        setNewPassword(value);
        break;
      case 'confirm':
        setConfirmPassword(value);
        break;
      default:
        break;
    }
  };

  //id value 
  const id =1;
    // Function to fetch data from API
    const fetchProfileData = async () => {
     
      try {
        const response = await fetch(`http://localhost:9095/api/employees/${id}`); // Replace with your actual API endpoint
        
    
        const data = await response.json();
        console.log('Fetched data:', data); // Log the fetched data
    
       
    
        // Split the full name into first and last name
        const [firstName, lastName] = data.name.split(' ');
    
        // Assuming the address format is consistent, split it into parts
        const [streetAddress, City, stateZip] = data.address ? data.address.split(','): ['Unknown Street', 'Unknown City', 'NA-00000'];
        const [state, zipCode] = stateZip ? stateZip.split('-') : ['NA', '00000'];
    
       
        setProfileData({
          firstName: firstName || 'Na',
          lastName: lastName || 'Na',
          gender: data.gender || 'male',
          dateofjoin: data.dateOfJoining || 'dd-mm-yyyy',
          dateOfBirth: data.dateOfBirth || 'dd-mm-yyyy',
          employeeName: data.name || 'Na Na',
          department: data.department || 'operations',
          jobTitle: data.jobTitle || 'software Developer',
          employeeId: data.employeeId || 'MTS123',
          email: data.email || 'Na@example.com',
          contactNumber: data.phone || '1234567890',
          jobType: data.employmentType || 'full-time',
          skills: data.skills || 'java,html',
          address: streetAddress || '123 Street Name',
          city: City || 'Na',
          state: state.trim() || 'NA',
          zipCode: zipCode.trim() || '55555',
          country: 'India',  // Assuming country is not part of the API
          password: data.password // Assuming password is not fetched from the API
          //profilePicture: profilePictureUrl || ''
        });
    
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    useEffect(()=>{
      fetchProfileData(); 
      fetchImage();
   }, []);
  
     
   

  const handleSaveChanges = async () => {
    try {
      console.log('Saving changes with data:', profileData);
  
      // Construct the payload with the current state
      const updatedProfileData = {
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        gender: profileData.gender,
        dateOfJoining: profileData.dateofjoin,
        dateOfBirth: profileData.dateOfBirth,
        name: `${profileData.firstName} ${profileData.lastName}`,
        department: profileData.department,
        jobTitle:profileData.jobTitle,
        employeeId: profileData.employeeId,
        email: profileData.email,
        phone: profileData.contactNumber,
        employmentType: profileData.jobType,
        skills: profileData.skills,
       password:profileData.password,
       //profilePicture:profileData.profilePicture,
        address: `${profileData.address}, ${profileData.city}, ${profileData.state} - ${profileData.zipCode}`,
       
      };
      if (newPassword) {
        updatedProfileData.password = newPassword;  // Update with new password if provided
      } else {
        updatedProfileData.password = profileData.password;  // Otherwise, use the existing password
      }
      
  
      // Make the API call to update the profile
      const response = await fetch(`http://localhost:9095/api/employees/${id}`, {
        method: 'PUT', // Specify the method
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProfileData), // Include the body with data
      });
  
      // Check if the response is OK
      if (response.ok) {
        const responseData = await response.json(); // Parse response JSON
        console.log('API Response:', responseData);
        await fetchProfileData();
        setSuccessMessage('Profile updated successfully!');
        setSnackbarSeverity('success'); // Corrected typo from 'sucess' to 'success'
        setSnackbarOpen(true);
      } else {
        console.log('API Response: failed');
        throw new Error('Failed to update profile');
      }
    } catch (error) {
      console.error("Error saving the profile data:", error);
      setSnackbarMessage('Failed to update profile');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setIsEditable(false);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    if (file) {
      uploadImage(file); // Automatically upload image on file selection
    }
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.put(`http://localhost:9095/api/images/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Image uploaded successfully');
      fetchImage(); // Fetch the image after upload
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const fetchImage = async () => {
    setLoading(true);
    setNoImage(false);
    try {
      const response = await axios.get(`http://localhost:9095/api/images/${id}`, {
        responseType: 'arraybuffer',
      });

      const base64 = Buffer.from(response.data, 'binary').toString('base64');
      const imageType = response.headers['content-type'];
      const base64Data = `data:${imageType};base64,${base64}`;
      setImageData(base64Data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching image:', error);
      setLoading(false);
      setNoImage(true);
    }
  };

  

  const handleUpdatePassword =async () => {
    // Validate fields
    if (!oldPassword || !newPassword || !confirmPassword) {
      setSnackbarMessage('Please fill all fields.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }
  
    if (newPassword !== confirmPassword) {
      setSnackbarMessage('New passwords do not match.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }
    
  
    // Check if old password is correct
    const currentPassword = profileData.password;
  
    if (oldPassword !== currentPassword) {
      setSnackbarMessage('Old password is incorrect.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }
 

  try {
    // Simulate saving changes (API call)
     // Replace with actual API call if needed

    profileData.password = newPassword;

    setSnackbarMessage('Password updated successfully.');
    setSnackbarSeverity('info');
    setSnackbarOpen(true);

   
    
    closePasswordFields();
    await handleSaveChanges();
  
    
  } catch (error) {
    console.error('Error updating password:', error);
    setSnackbarMessage('Failed to update password. Please try again.');
    setSnackbarSeverity('error');
    setSnackbarOpen(true);
  } finally {
 
    setShowPasswordFields(false); // Close the password fields after update
  }
  
  };

  

  const handleFieldClick = (field) => {
    setSelectedField(field);
    setOtpDialogOpen(true);
    setFieldToEdit(field);
    setDialogOpen(true);
    setIsOtpSubmitted(false);
     if (field === 'email') {
      setEmailEditable(true);
    } else if (field === 'contactNumber') {
      setPhoneEditable(true);
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setIsOtpSubmitted(false);
    setOtp('');
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

 
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };



  const handleEditClick = () => {
    setIsEditable(!isEditable);
    
  };
  const handleCancelClick = () => {
    setIsEditable(false);
  fetchProfileData();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  
 
  

  const validatePassword = (password) => {
    const passwordPattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d)[A-Za-z\d!@#$%^&*]{5,}$/;
    if (!passwordPattern.test(password)) {
      setPasswordError('Password must be at least 5 characters, include a capital letter, a symbol, and a number');
    } else {
      setPasswordError('');
    }
  };

  const handleSave = async() => {
    setIsEditable(false);
    setUpdatedDetails(profileData);
    setDialogOpen(false);
    setIsOtpSubmitted(false);
    setOtp('');
    let message='';
    if (fieldToEdit === 'email') {
      message ='Email updated successfully';
    } else if (fieldToEdit === 'contactNumber') {
      message='Phone number updated successfully';
    }

    
  
    setSnackbarMessage(message);
  setSnackbarSeverity('success');
    setSnackbarOpen(true);

    await handleSaveChanges();
  };

  const handleNotificationClick = () => {
    setNotificationOpen(true);
  };

  const handleNotificationClose = () => {
    setNotificationOpen(false);
  };

  const handleOtpSubmit = () => {
    // Mock OTP validation
    if (otp === '123456') {
      setEmailEditable(false);
      setShowOtpField(false);
      setIsOtpSubmitted(true);
      //alert('Email updated successfully!');
    } else {
      alert('Invalid OTP. Please try again.');
    }

      // OTP validation logic here
      if (selectedField === 'email') setEmailEditable(true);
      if (selectedField === 'phone') setPhoneEditable(true);
      setOtpDialogOpen(false);
  };
 
  return (
    <Container maxWidth="lg" justifyContent="center" alignItems="center">
      <Grid container spacing={4} mt={1} justifyContent="center">
        <Grid item xs={12}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px',
              backgroundColor: 'primary.main',
              color: 'white',
              borderRadius: '8px',
            }}
          >
            <Typography variant="h5">My Profile</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton color="inherit" onClick={handleNotificationClick}>
                <NotificationsIcon />
              </IconButton>
              <IconButton color="inherit" onClick={handleMenuClick}>
                <Avatar src={imageData || ''} />
              
              </IconButton>
              
            </Box>
          </Box>
        </Grid>

        {/* Sidebar Section */}
        <Grid item xs={12} md={3} height="100%">
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom></Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Button
                  variant={selectedOption === 'Profile' ? 'contained' : 'outlined'}
                  onClick={() => handleOptionSelect('Profile')}
                  sx={{ mb: 1 }}
                >
                  View Profile
                </Button>
                <Button
                  variant={selectedOption === 'Notifications' ? 'contained' : 'outlined'}
                  onClick={() => handleOptionSelect('Notifications')}
                  sx={{ mb: 1 }}
                >
                  Notifications
                </Button>
                <Button
                  variant={selectedOption === 'Password' ? 'contained' : 'outlined'}
                  onClick={() => handleOptionSelect('Password')}
                  sx={{ mb: 1 }}
                >
                  Password & Security
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Profile Details Section */}
        <Grid item xs={12} md={9}>
          {selectedOption === 'Profile' && (
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                 
                    <Avatar
                      src={imageData || ''}
                      sx={{ width: 100, height: 100, mr: 2 }}
                      
                    />
        
               <label htmlFor="upload-photo">
              <IconButton
                component="span"
               
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </label>
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }} // Hide the file input
              id="upload-photo"
              onChange={handleFileChange} // Handle file upload
              //disabled={!isEditable} // Disable when not in edit mode
            />
                  </Box>
                  <Grid container spacing={1} sx={{ ml: 2 }}>
  <Grid item xs={12}>
    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
     {/* {profileData?.employeeName} */}
      {profileData.employeeName}
      {/* The ? mark you see in {profileData?.employeeName} is called the optional chaining operator. 
      It is used to safely access properties of an object that might be null or undefined. */}
    </Typography>
  </Grid>
  <Grid item xs={12}>
    <Typography variant="subtitle1" sx={{ color: 'gray' }}>
      JobTitle: {profileData?.jobTitle}
    </Typography>
    <Typography variant="subtitle2" sx={{ color: 'gray' }}>
      Department: {profileData?.department}
    </Typography>
  </Grid>
  <Grid item xs={12}>
    <Typography variant="body2" sx={{ color: 'gray' }}>
      Employee ID: {profileData.employeeId}
    </Typography>
  </Grid>
</Grid>

                </Box>

                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="First Name"
                      variant="outlined"
                      value={profileData.firstName}
                      name="firstName"
                      onChange={handleInputChange}
                      InputProps={{ readOnly: !isEditable }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Last Name"
                      variant="outlined"
                      value={profileData.lastName}
                      name="lastName"
                      onChange={handleInputChange}
                      InputProps={{ readOnly: !isEditable }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email"
                      variant="outlined"
                      type='email'
                      value={profileData.email}
                      onChange={handleInputChange}
                      InputProps={{ readOnly: !isEditable }}
                     
                         sx={{ '& input[type="email"]': { cursor:'not-allowed' } }} 

                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Contact Number"
                      variant="outlined"
                      type='number'
                      value={profileData.contactNumber}
                      onChange={handleInputChange}
                      InputProps={{readOnly: !isEditable }}
                       sx={{ '& input[type="number"]': { cursor:'not-allowed' } }} 
                    />
                  </Grid>

                 
                  <Grid item xs={12} md={6}>
  <TextField
 
    fullWidth
    label="DOB"
    variant="outlined"
    type="date"
  
    value={profileData.dateOfBirth || ''} // Handle empty initial value
    name="dateOfBirth" // Use consistent naming
    onChange={handleInputChange} 
    InputProps={{ readOnly: !isEditable }}
  /> 
</Grid>

  

  <Grid item xs={12} md={6}>
  <FormControl fullWidth variant="outlined">
    <InputLabel id="gender">Gender</InputLabel>
    <Select
      labelId="gender"
      value={profileData.gender || ''} // Default value set to 'Full Time'
      name="gender"
      label="Gender"
      onChange={handleInputChange} // Allow editing if isEditable is true
      input={
        <OutlinedInput
          label="Gender"
          readOnly={!isEditable}
          sx={{ cursor: !isEditable ? 'not-allowed' : 'text' }}
        />
      }
      MenuProps={{
        disableScrollLock: true,
      }}
      
    >
      <MenuItem value="male">male</MenuItem>
      <MenuItem value="female">female</MenuItem>
    </Select>
  </FormControl>
   </Grid>
             <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="DateOfJoined"
                      variant="outlined"
                      type='date'
                      value={profileData.dateofjoin}
                      InputProps={{ readOnly: true}}
                      sx={{ '& input': { cursor: 'not-allowed' } }}  

                    />
                  </Grid>
                  
                  <Grid item xs={12} md={6}>


<TextField
                      fullWidth
                      label="Job Type"
                      variant="outlined"
                      
                      value={profileData.jobType}
                      InputProps={{ readOnly: true}}
                      sx={{ '& input': { cursor: 'not-allowed' } }}  

                    />
</Grid>

<Grid item xs={12}>
  <TextField
    fullWidth
    label="Skills"
    variant="outlined"
    value={profileData.skills}
    name="skills"
    onChange={handleInputChange} // Allow editing of skills
    InputProps={{ readOnly: !isEditable }}
  />
</Grid>
    
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Address"
                      variant="outlined"
                      value={profileData.address}
                      name="address"
                      onChange={handleInputChange}
                      InputProps={{ readOnly: !isEditable }}
                    /> {isEditable && (
                      <Typography variant="body2" color="textSecondary" style={{ marginTop: 4 }}>
                        Use only " / " for separation
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="City"
                      variant="outlined"
                      value={profileData.city}
                      name="city"
                      onChange={handleInputChange}
                      InputProps={{ readOnly: !isEditable }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="State"
                      variant="outlined"
                      value={profileData.state}
                      name="state"
                      onChange={handleInputChange}
                      InputProps={{ readOnly: !isEditable }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Zip Code"
                      variant="outlined"
                      value={profileData.zipCode}
                      name="zipCode"
                      onChange={handleInputChange}
                      InputProps={{ readOnly: !isEditable }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Country"
                      variant="outlined"
                      value={profileData.country}
                      name="country"
                      onChange={handleInputChange}
                      InputProps={{ readOnly: !isEditable }}
                    />
                  </Grid>
                </Grid>

                {isEditable ? (
                  <Box sx={{ mt: 3,}}>
                    <Button variant="contained" onClick={handleSaveChanges} sx={{mr:2}}>
                      Save
                    </Button>
                    
                    <Button   variant="contained"  onClick={handleCancelClick} >
                          Cancel
                    </Button>
                  </Box>
                ) : (
                  <Box sx={{ mt: 3 }}>
                    <Button variant="contained" onClick={handleEditClick}>
                      Edit
                    </Button>
                  </Box>
                )}
              </CardContent>
          
            </Card>
          )} <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000} // Closes automatically after 3 seconds
          onClose={handleSnackbarClose}
        >
          <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
            {successMessage}
          </Alert>
        </Snackbar>

          {selectedOption === 'Notifications' && (
            <Card>
              <CardContent>
                <Typography variant="h6">Notifications</Typography>
                <Box>
                  <Typography>New notification about upcoming events</Typography>
                  <Typography> one new notification</Typography>
                  {/* Add more notification items here */}
                </Box>
              </CardContent>
            </Card>
          )}

          {selectedOption === 'Password' && (
          
<div>
      <Card>
        <CardContent>
          <Typography variant="h6">Profile Settings</Typography>
          <Grid container spacing={2} mt={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                value={profileData.email}
                InputProps={{ readOnly: !emailEditable }}
                onClick={() => handleFieldClick('email')}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Phone Number"
                variant="outlined"
                value={profileData.contactNumber}
                InputProps={{ readOnly: !phoneEditable }}
                onClick={() => handleFieldClick('contactNumber')}
              />
            </Grid>
            <Grid item xs={12}>
              {!showPasswordFields ? (
                <TextField
                  fullWidth
                  label="Password"
                  variant="outlined"
                  value=''
                  InputProps={{ readOnly: true }}
                  onClick={() => {setFieldToEdit('password');
                    setShowPasswordFields(true)} }
                />
              ) : (
                <>
                  <TextField
                    fullWidth
                    label="Old Password"
                    variant="outlined"
                    name="old"
                    type="password"
                    value={oldPassword}
                    
                    onChange={handlePasswordChange }
                     autoComplete="new-password"
                    sx={{ mt: 1 }}
                  />
                  <TextField
                    fullWidth
                    label="New Password"
                    variant="outlined"
                    name="new"
                    type="password"
                    value={newPassword}
                 
                   onChange={(e) => {
    handlePasswordChange(e); // Handle password change logic
    validatePassword(e.target.value); // Validate password logic
  }} error={!!passwordError}
  helperText={passwordError}
                    sx={{ mt: 1 }}
                  />
                  <TextField
                    fullWidth
                    label="Confirm New Password"
                    variant="outlined"
                    name="confirm"
                    type="password"
                    value={confirmPassword}
                    //onChange={handlePasswordChange}
                   
                      onChange={(e) => {
    handlePasswordChange(e); // Handle password change logic
    validatePassword(e.target.value); // Validate password logic
  }}
                    error={!!passwordError}
                    helperText={passwordError}
                    sx={{ mt: 1 }}
                  />
            

<Button
        variant="contained"
       onClick={handleUpdatePassword}
     
        sx={{ mt: 2 }}
        disabled={!oldPassword || !newPassword || !confirmPassword}
      >
        Update Password
      </Button>
      <Button  
  variant="outlined"
  onClick={closePasswordFields}
  sx={{ mt: 2, ml:1}}
>
  Cancel
</Button>
 
                </>
              )}
             
            </Grid>
          </Grid>
        </CardContent>
      </Card>
   

  {/* Password Snackbar */}
  <Snackbar
    open={snackbarOpen && fieldToEdit === 'password'}
    autoHideDuration={3000}
    onClose={handleSnackbarClose}
  >
    <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
      {snackbarMessage}
    </Alert>
  </Snackbar>
                  
   
   {/* Dialog for OTP and editing fields */}
   <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>{`Edit ${fieldToEdit === 'email' ? 'Email' : 'Phone Number'}`}</DialogTitle>
        <DialogContent>
          {!isOtpSubmitted ? (
            <>
              <Typography>Enter the OTP sent to your registered number:</Typography>
              <TextField
                fullWidth
                label="Enter OTP"
                variant="outlined"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                sx={{ mt: 2 }}
              />
              <Button
                variant="contained"
                onClick={handleOtpSubmit }
                sx={{ mt: 2 }}
              >
                Submit OTP
              </Button>
            </>
          ) : (
            <>
              <TextField
                fullWidth
                label={`New ${fieldToEdit === 'email' ? 'Email' : 'Phone Number'}`}
                variant="outlined"
                value={profileData[fieldToEdit]}
                onChange={(e) =>
                  setProfileData({ ...profileData, [fieldToEdit]: e.target.value })
                }
                sx={{ mt: 2 }}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          {isOtpSubmitted && (
            <Button variant="contained" onClick={handleSave }>
              Save
            </Button>
          )}
          <Button variant="outlined" onClick={handleDialogClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for success messages */}
      {/* Email/Phone Snackbar */}
      <Snackbar
  open={snackbarOpen && (fieldToEdit === 'email' || fieldToEdit === 'contactNumber')}
  autoHideDuration={3000}
  onClose={handleSnackbarClose}
>
  <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
    {snackbarMessage}
  </Alert>
</Snackbar>
      </div>
                  )}
                
        </Grid>
      </Grid>
      
      <Snackbar
        open={notificationOpen}
        autoHideDuration={6000}
        onClose={handleNotificationClose}
        message="New Notification"
     
      />
    </Container>
  );
};

export default Profile;
