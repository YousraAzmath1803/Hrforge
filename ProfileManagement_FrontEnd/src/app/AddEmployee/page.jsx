'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container, TextField, Button, Typography, Grid, MenuItem, Select, FormControl, InputLabel, Dialog, DialogActions, DialogContent, DialogContentText, Box
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // Import check icon

export default function AddEmployee() {
  const initialFormData = {
    firstName: '',
    lastName: '',
    name: '', // We'll construct this during submission
    jobTitle: '',
    department: '',
    email: '',
    phone: '',
    dateOfJoining: '',
    employeeId: '',
    employmentType: '',
    skills: '',
    address: '',
    dateOfBirth: '',
    gender: '', // Added gender field
  };

  const [formData, setFormData] = useState(initialFormData);
  const [openDialog, setOpenDialog] = useState(false); // State to control popup
  const [employeeId, setEmployeeId] = useState(null); // Placeholder for employee ID

  useEffect(() => {
    // Example: Split a full name if provided
    if (formData.name) {
      const [firstName, ...lastNameParts] = formData.name.split(' ');
      setFormData({
        ...formData,
        firstName: firstName || '',
        lastName: lastNameParts.join(' ') || ''
      });
    }
  }, [formData.name]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Combine firstName and lastName into fullName
    const { firstName, lastName } = formData;
    const name = `${firstName} ${lastName}`; // Construct full name

    try {
      // Update formData with fullName
      const updatedFormData = {
        ...formData,
        name, // Adding the combined fullName to the data
      };

      const response = await axios.post('http://localhost:9095/api/employees', updatedFormData);
      console.log('Employee added:', response.data);
      setEmployeeId(response.data.id); // Save employee ID for later use

      setOpenDialog(true); // Open dialog after successful submission
    } catch (error) {
      if (error.response && error.response.status === 409) {
        // Handle conflict error
        alert(error.response.data); // Display the error message
      } else {
        console.error('Error adding employee:', error);
      }
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData(initialFormData); // Reset form when the dialog closes
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: 'white', 
      display: 'flex', 
      paddingLeft: '0px', 
      justifyContent: 'center', 
      alignItems: 'center',
    }}>
      <Container sx={{ 
        backgroundColor: 'white', 
        padding: '20px', 
        borderRadius: '8px', 
        width: '70%', 
        minHeight: '100vh', 
        margin: '0px', 
        boxSizing: 'border-box',
      }}>
       <Typography 
  variant="h4" 
  sx={{ 
    mb: 3, 
    textAlign: 'center', 
    color: '#333', // Darker, neutral color for a professional look
    fontWeight: '600', // Semi-bold for emphasis without being too heavy
    letterSpacing: '1px', // Subtle spacing for clarity
    textTransform: 'capitalize', // Keeps the title neat and consistent
    fontFamily: "'Montserrat', sans-serif", // A modern, professional font
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)', // Light shadow for subtle depth
  }}
>
  Add New Employee
</Typography>


        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* First Name */}
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                type="text"
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>         
            {/* Last Name */}
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                type="text"
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            {/* Employee ID */}
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                type="text"
                label="Employee Id"
                name="employeeId"
                value={formData.employeeId}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            {/* Department Dropdown */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Department</InputLabel>
                <Select
                  required
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  variant="outlined"
                  label="Department"
                >
                  <MenuItem value="HR">HR</MenuItem>
                  <MenuItem value="Finance">Finance</MenuItem>
                  <MenuItem value="Developer">IT</MenuItem>
                  <MenuItem value="Marketing">Sales</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {/* Gender Dropdown */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Gender</InputLabel>
                <Select
                  required
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  variant="outlined"
                  label="Gender"
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {/* Employment Type Dropdown */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Employment Type</InputLabel>
                <Select
                  required
                  name="employmentType"
                  value={formData.employmentType}
                  onChange={handleChange}
                  variant="outlined"
                  label="Employment Type"
                >
                  <MenuItem value="Full-time">Full-time</MenuItem>
                  <MenuItem value="Part-time">Part-time</MenuItem>
                  <MenuItem value="Contract">Contract</MenuItem>
                  <MenuItem value="Intern">Intern</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {/* Job Title */}
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                type="text"
                label="Job Title"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            {/* Email */}
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                type="email"
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            {/* Phone Number */}
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                type="tel"
                label="Phone No"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            {/* Date of Joining */}
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                type="date"
                label="Date Of Joining"
                name="dateOfJoining"
                InputLabelProps={{ shrink: true }}
                value={formData.dateOfJoining}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            {/* Skills */}
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                type="text"
                label="Skills"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
             {/* Date of Birth */}
             <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                type="date"
                label="Date Of Birth"
                name="dateOfBirth"
                InputLabelProps={{ shrink: true }}
                value={formData.dateOfBirth}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
              {/* Address */}
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                type="text"
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
           
           <Grid item xs={12}>
             <Button type="submit" variant="contained" color="primary" fullWidth>
               Add Employee
             </Button>
           </Grid>
         </Grid>
       </form>

       {/* Success Dialog */}
       <Dialog open={openDialog} onClose={handleCloseDialog}>
         <DialogContent sx={{ backgroundColor: 'green', color: 'white', textAlign: 'center' }}>
           <Box display="flex" justifyContent="center" alignItems="center">
             <CheckCircleIcon sx={{ fontSize: 50, color: 'white' }} />
           </Box>
           <DialogContentText sx={{ fontSize: '20px', fontWeight: 'bold' }}>
             New employee added successfully!
           </DialogContentText>
         </DialogContent>
         <DialogActions>
           <Button onClick={handleCloseDialog} autoFocus>
             OK
           </Button>
         </DialogActions>
       </Dialog>
     </Container>
   </div>
 );
}









