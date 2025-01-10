
'use client';
import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper, Alert } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// const AddHoliday = () => {
//   const [date, setDate] = useState(null);
//   const [description, setDescription] = useState('');
//   const [success, setSuccess] = useState(false);

//   const handleDateChange = (newDate) => {
//     setDate(newDate);
//   };

//   const handleDescriptionChange = (event) => {
//     setDescription(event.target.value);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
   
//     setSuccess(true);
 
//     setDate(null);
//     setDescription('');
//   };

//   return (
//     <Box 
//       sx={{ 
//         p: 2, 
//         pl: '240px', 
//         minHeight: '100vh', 
//         background: 'linear-gradient(to bottom right, #ffffff 0%, #cce4f7 50%, #99c2ff 100%)', // Gradient background
//       }}
//     >
//       <Typography variant="h4" gutterBottom>
//         Add Holiday
//       </Typography>
//       {success && (
//         <Alert severity="success" sx={{ mb: 2 }}>
//           Holiday successfully updated!
//         </Alert>
//       )}
//       <Paper component="form" sx={{ p: 4 }} onSubmit={handleSubmit}>
//         <Box sx={{ mb: 2 }}>
//           <LocalizationProvider dateAdapter={AdapterDateFns}>
//             <DatePicker
//               label="Date"
//               value={date}
//               onChange={handleDateChange}
//               renderInput={(params) => <TextField {...params} fullWidth required />}
//             />
//           </LocalizationProvider>
//         </Box>
//         <Box sx={{ mb: 2 }}>
//           <TextField
//             label="Description"
//             value={description}
//             onChange={handleDescriptionChange}
//             multiline
//             rows={4}
//             fullWidth
//             required
//           />
//         </Box>
//         <Button type="submit" variant="contained" color="success">
//           Save
//         </Button>
//       </Paper>
//     </Box>
//   );
// };

// export default AddHoliday;

const AddHoliday = () => {
  const [date, setDate] = useState(null);
  const [description, setDescription] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:9099/holidays/addholiday', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: date ? date.toISOString().split('T')[0] : '', // Format date to 'YYYY-MM-DD'
          name: description,
        }),
      });

      if (response.ok) {
        setSuccess(true);
        setDate(null);
        setDescription('');
        setError(null);
      } else {
        throw new Error('Failed to add holiday');
      }
    } catch (err) {
      setError(err.message);
      setSuccess(false);
    }
  };

  return (
    <Box 
      sx={{ 
        p: 2, 
        pl: '260px', 
        minHeight: '100vh', 
        background: 'linear-gradient(to bottom right, #ffffff 0%, #cce4f7 50%, #99c2ff 100%)', 
      }}
    >
      <Typography variant="h4" gutterBottom>
        Add Holiday
      </Typography>
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Holiday successfully added!
        </Alert>
      )}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Paper component="form" sx={{ p: 4 }} onSubmit={handleSubmit}>
        <Box sx={{ mb: 2 }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Date"
              value={date}
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params} fullWidth required />}
            />
          </LocalizationProvider>
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            label="Description"
            value={description}
            onChange={handleDescriptionChange}
            multiline
            rows={4}
            fullWidth
            required
          />
        </Box>
        <Button type="submit" variant="contained" color="success">
          Save
        </Button>
      </Paper>
    </Box>
  );
};

export default AddHoliday;