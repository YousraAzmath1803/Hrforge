// 'use client';
// import React, { useState } from 'react';
// import { 
//   Box, 
//   Button, 
//   IconButton, 
//   InputBase, 
//   Paper, 
//   Table, 
//   TableBody, 
//   TableCell, 
//   TableContainer, 
//   TableHead, 
//   TableRow, 
//   Typography, 
//   Dialog, 
//   DialogActions, 
//   DialogContent, 
//   DialogTitle, 
//   TextField 
// } from '@mui/material';
// import { Edit, Delete, Search } from '@mui/icons-material';
// const holidaysData = [
//   { date: '01/01/2020', name: "New Year's Day" },
//   { date: '20/01/2020', name: 'Martin Luther King Jr. Day' },
//   { date: '07/02/2020', name: "President's Day" },
//   { date: '25/05/2020', name: 'Memorial Day' },
//   { date: '21/06/2020', name: "Father's Day" },
//   { date: '03/07/2020', name: 'Independence Day' },
//   { date: '07/09/2020', name: 'Labor Day' },
//   { date: '06/10/2020', name: 'Cabrini Day' },
//   { date: '12/10/2020', name: 'Columbus Day' },
//   { date: '12/11/2020', name: 'Veterans Day' },
// ];
// const ManageHoliday = () => {
//   const [search, setSearch] = useState('');
//   const [holidays, setHolidays] = useState(holidaysData);
//   const [editIndex, setEditIndex] = useState(null);
//   const [editedHoliday, setEditedHoliday] = useState({ date: '', name: '' });
//   const [openDialog, setOpenDialog] = useState(false);
//   const [deleteIndex, setDeleteIndex] = useState(null);
//   const handleSearchChange = (event) => {
//     setSearch(event.target.value);
//   };
//   const filteredHolidays = holidays.filter(holiday => 
//     holiday.name.toLowerCase().includes(search.toLowerCase())
//   );
//   const handleEditClick = (index) => {
//     setEditIndex(index);
//     setEditedHoliday(holidays[index]);
//   };
//   const handleSaveEdit = () => {
//     setHolidays(prevHolidays => {
//       const newHolidays = [...prevHolidays];
//       newHolidays[editIndex] = editedHoliday;
//       return newHolidays;
//     });
//     setEditIndex(null);
//     setEditedHoliday({ date: '', name: '' });
//   };
//   const handleDeleteClick = (index) => {
//     setDeleteIndex(index);
//     setOpenDialog(true);
//   };
//   const handleConfirmDelete = () => {
//     setHolidays(prevHolidays => {
//       return prevHolidays.filter((_, i) => i !== deleteIndex);
//     });
//     setOpenDialog(false);
//     setDeleteIndex(null);
//   };
//   const handleCancelDelete = () => {
//     setOpenDialog(false);
//     setDeleteIndex(null);
//   };
//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setEditedHoliday(prev => ({ ...prev, [name]: value }));
//   };
//   return (
//     <Box 
//       sx={{ 
//         display: 'flex', 
//         background: 'linear-gradient(to bottom, #ffffff, #a0c4ff)', 
//         minHeight: '100vh' 
//       }}
//     >
//       {/* Sidebar space */}
//       <Box sx={{ width: '240px', display: { xs: 'none', md: 'block' } }} />
      
//       {/* Main content area */}
//       <Box sx={{ flexGrow: 1, p: 2 }}>
//         <Typography variant="h4" gutterBottom>
//           Manage Holiday
//         </Typography>
//         <Paper
//           component="form"
//           sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, mb: 2 }}
//         >
//           <InputBase
//             sx={{ ml: 1, flex: 1 }}
//             placeholder="Search Holiday"
//             inputProps={{ 'aria-label': 'search holiday' }}
//             value={search}
//             onChange={handleSearchChange}
//           />
//           <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
//             <Search />
//           </IconButton>
//         </Paper>
//         <TableContainer component={Paper}>
//           <Table sx={{ minWidth: 650 }} aria-label="simple table">
//             <TableHead>
//               <TableRow>
//                 <TableCell>Date</TableCell>
//                 <TableCell>Holiday</TableCell>
//                 <TableCell align="right">Action</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {filteredHolidays.map((holiday, index) => (
//                 <TableRow key={index}>
//                   <TableCell>
//                     {editIndex === index ? (
//                       <TextField
//                         name="date"
//                         value={editedHoliday.date}
//                         onChange={handleChange}
//                       />
//                     ) : (
//                       holiday.date
//                     )}
//                   </TableCell>
//                   <TableCell>
//                     {editIndex === index ? (
//                       <TextField
//                         name="name"
//                         value={editedHoliday.name}
//                         onChange={handleChange}
//                       />
//                     ) : (
//                       holiday.name
//                     )}
//                   </TableCell>
//                   <TableCell align="right">
//                     {editIndex === index ? (
//                       <Button
//                         variant="contained"
//                         color="primary"
//                         onClick={handleSaveEdit}
//                       >
//                         Save
//                       </Button>
//                     ) : (
//                       <>
//                         <Button
//                           variant="outlined"
//                           startIcon={<Edit />}
//                           sx={{ mr: 1 }}
//                           onClick={() => handleEditClick(index)}
//                         >
//                           Edit Holiday
//                         </Button>
//                         <Button
//                           variant="contained"
//                           color="error"
//                           startIcon={<Delete />}
//                           onClick={() => handleDeleteClick(index)}
//                         >
//                           Delete
//                         </Button>
//                       </>
//                     )}
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         {/* Confirmation Dialog */}
//         <Dialog
//           open={openDialog}
//           onClose={handleCancelDelete}
//         >
//           <DialogTitle>Confirm Deletion</DialogTitle>
//           <DialogContent>
//             <Typography>Are you sure you want to delete this holiday?</Typography>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleCancelDelete}>Cancel</Button>
//             <Button onClick={handleConfirmDelete} color="error">Delete</Button>
//           </DialogActions>
//         </Dialog>
//       </Box>
//     </Box>
//   );
// };
// export default ManageHoliday;


// 'use client';
// import React, { useState } from 'react';
// import {
//   Box,
//   Button,
//   IconButton,
//   InputBase,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Typography,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   TextField,
//   Alert
// } from '@mui/material';
// import { Edit, Delete, Search } from '@mui/icons-material';
// const holidaysData = [
//   { id: 1, date: '01/01/2020', name: "New Year's Day" },
//   { id: 2, date: '20/01/2020', name: 'Martin Luther King Jr. Day' },
//   { id: 3, date: '07/02/2020', name: "President's Day" },
//   { id: 4, date: '25/05/2020', name: 'Memorial Day' },
//   { id: 5, date: '21/06/2020', name: "Father's Day" },
//   { id: 6, date: '03/07/2020', name: 'Independence Day' },
//   { id: 7, date: '07/09/2020', name: 'Labor Day' },
//   { id: 8, date: '06/10/2020', name: 'Cabrini Day' },
//   { id: 9, date: '12/10/2020', name: 'Columbus Day' },
//   { id: 10, date: '12/11/2020', name: 'Veterans Day' },
// ];
// const ManageHoliday = () => {
//   const [search, setSearch] = useState('');
//   const [holidays, setHolidays] = useState(holidaysData);
//   const [editId, setEditId] = useState(null);
//   const [editedHoliday, setEditedHoliday] = useState({ date: '', name: '' });
//   const [openDialog, setOpenDialog] = useState(false);
//   const [deleteId, setDeleteId] = useState(null);
//   const [success, setSuccess] = useState('');
//   const handleSearchChange = (event) => {
//     setSearch(event.target.value);
//   };
//   const filteredHolidays = holidays.filter(holiday =>
//     holiday.name.toLowerCase().includes(search.toLowerCase())
//   );
//   const handleEditClick = (id) => {
//     const holidayToEdit = holidays.find(holiday => holiday.id === id);
//     setEditId(id);
//     setEditedHoliday({ date: holidayToEdit.date, name: holidayToEdit.name });
//     setSuccess('');
//   };
//   const handleSaveEdit = () => {
//     setHolidays(prevHolidays => {
//       return prevHolidays.map(holiday =>
//         holiday.id === editId ? { ...holiday, ...editedHoliday } : holiday
//       );
//     });
//     setEditId(null);
//     setEditedHoliday({ date: '', name: '' });
//     setSuccess('Holiday successfully updated!');
//   };
//   const handleDeleteClick = (id) => {
//     setDeleteId(id);
//     setOpenDialog(true);
//     setSuccess('');
//   };
//   const handleConfirmDelete = () => {
//     setHolidays(prevHolidays => {
//       return prevHolidays.filter(holiday => holiday.id !== deleteId);
//     });
//     setOpenDialog(false);
//     setDeleteId(null);
//     setSuccess('Holiday successfully deleted!');
//   };
//   const handleCancelDelete = () => {
//     setOpenDialog(false);
//     setDeleteId(null);
//   };
//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setEditedHoliday(prev => ({ ...prev, [name]: value }));
//   };
//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         background: 'linear-gradient(to bottom, #FFFFFF, #A0C4FF)',
//         minHeight: '100vh'
//       }}
//     >
//       {/* Sidebar space */}
//       <Box sx={{ width: '240px', display: { xs: 'none', md: 'block' } }} />
//       {/* Main content area */}
//       <Box sx={{ flexGrow: 1, p: 2 }}>
//         <Typography variant="h4" gutterBottom>
//           Manage Holiday
//         </Typography>
//         {success && (
//           <Alert severity="success" sx={{ mb: 2 }}>
//             {success}
//           </Alert>
//         )}
//         <Paper
//           component="form"
//           sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, mb: 2 }}
//         >
//           <InputBase
//             sx={{ ml: 1, flex: 1 }}
//             placeholder="Search Holiday"
//             inputProps={{ 'aria-label': 'search holiday' }}
//             value={search}
//             onChange={handleSearchChange}
//           />
//           <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
//             <Search />
//           </IconButton>
//         </Paper>
//         <TableContainer component={Paper}>
//           <Table sx={{ minWidth: 650 }} aria-label="holiday table">
//             <TableHead>
//               <TableRow>
//                 <TableCell>Date</TableCell>
//                 <TableCell>Holiday</TableCell>
//                 <TableCell align="right">Action</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {filteredHolidays.map((holiday) => (
//                 <TableRow key={holiday.id}>
//                   <TableCell>
//                     {editId === holiday.id ? (
//                       <TextField
//                         name="date"
//                         value={editedHoliday.date}
//                         onChange={handleChange}
//                         variant="standard"
//                       />
//                     ) : (
//                       holiday.date
//                     )}
//                   </TableCell>
//                   <TableCell>
//                     {editId === holiday.id ? (
//                       <TextField
//                         name="name"
//                         value={editedHoliday.name}
//                         onChange={handleChange}
//                         variant="standard"
//                       />
//                     ) : (
//                       holiday.name
//                     )}
//                   </TableCell>
//                   <TableCell align="right">
//                     {editId === holiday.id ? (
//                       <Button
//                         variant="contained"
//                         color="primary"
//                         onClick={handleSaveEdit}
//                         sx={{ mr: 1 }}
//                       >
//                         Save
//                       </Button>
//                     ) : (
//                       <>
//                         <Button
//                           variant="outlined"
//                           startIcon={<Edit />}
//                           sx={{ mr: 1 }}
//                           onClick={() => handleEditClick(holiday.id)}
//                         >
//                           Edit
//                         </Button>
//                         <Button
//                           variant="contained"
//                           color="error"
//                           startIcon={<Delete />}
//                           onClick={() => handleDeleteClick(holiday.id)}
//                         >
//                           Delete
//                         </Button>
//                       </>
//                     )}
//                   </TableCell>
//                 </TableRow>
//               ))}
//               {filteredHolidays.length === 0 && (
//                 <TableRow>
//                   <TableCell colSpan={3} align="center">
//                     No holidays found.
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         {/* Confirmation Dialog */}
//         <Dialog
//           open={openDialog}
//           onClose={handleCancelDelete}
//         >
//           <DialogTitle>Confirm Deletion</DialogTitle>
//           <DialogContent>
//             <Typography>Are you sure you want to delete this holiday?</Typography>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleCancelDelete}>Cancel</Button>
//             <Button onClick={handleConfirmDelete} color="error">Delete</Button>
//           </DialogActions>
//         </Dialog>
//       </Box>
//     </Box>
//   );
// };
// export default ManageHoliday;

// 'use client';
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import {
//   Box,
//   Button,
//   IconButton,
//   InputBase,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Typography,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   TextField,
//   Alert
// } from '@mui/material';
// import { Edit, Delete, Search } from '@mui/icons-material';

// const ManageHoliday = () => {
//   const [search, setSearch] = useState('');
//   const [holidays, setHolidays] = useState([]);
//   const [editId, setEditId] = useState(null);
//   const [editedHoliday, setEditedHoliday] = useState({ date: '', name: '' });
//   const [openDialog, setOpenDialog] = useState(false);
//   const [deleteId, setDeleteId] = useState(null);
//   const [success, setSuccess] = useState('');

//   // Fetch holidays data from the API
//   useEffect(() => {
//     axios
//       .get('http://localhost:9099/holidays/allholidays')
//       .then((response) => {
//         setHolidays(response.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching holidays:', error);
//       });
//   }, []);

//   const handleSearchChange = (event) => {
//     setSearch(event.target.value);
//   };

//   const filteredHolidays = holidays.filter(holiday =>
//     holiday.name.toLowerCase().includes(search.toLowerCase())
//   );

//   const handleEditClick = (id) => {
//     const holidayToEdit = holidays.find(holiday => holiday.id === id);
//     setEditId(id);
//     setEditedHoliday({ date: holidayToEdit.date, name: holidayToEdit.name });
//     setSuccess('');
//   };

//   const handleSaveEdit = () => {
//     setHolidays(prevHolidays => {
//       return prevHolidays.map(holiday =>
//         holiday.id === editId ? { ...holiday, ...editedHoliday } : holiday
//       );
//     });
//     setEditId(null);
//     setEditedHoliday({ date: '', name: '' });
//     setSuccess('Holiday successfully updated!');
//   };

//   const handleDeleteClick = (id) => {
//     setDeleteId(id);
//     setOpenDialog(true);
//     setSuccess('');
//   };

//   const handleConfirmDelete = () => {
//     setHolidays(prevHolidays => {
//       return prevHolidays.filter(holiday => holiday.id !== deleteId);
//     });
//     setOpenDialog(false);
//     setDeleteId(null);
//     setSuccess('Holiday successfully deleted!');
//   };

//   const handleCancelDelete = () => {
//     setOpenDialog(false);
//     setDeleteId(null);
//   };

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setEditedHoliday(prev => ({ ...prev, [name]: value }));
//   };

//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         background: 'linear-gradient(to bottom, #FFFFFF, #A0C4FF)',
//         minHeight: '100vh'
//       }}
//     >
//       {/* Sidebar space */}
//       <Box sx={{ width: '240px', display: { xs: 'none', md: 'block' } }} />
//       {/* Main content area */}
//       <Box sx={{ flexGrow: 1, p: 2 }}>
//         <Typography variant="h4" gutterBottom>
//           Manage Holiday
//         </Typography>
//         {success && (
//           <Alert severity="success" sx={{ mb: 2 }}>
//             {success}
//           </Alert>
//         )}
//         <Paper
//           component="form"
//           sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, mb: 2 }}
//         >
//           <InputBase
//             sx={{ ml: 1, flex: 1 }}
//             placeholder="Search Holiday"
//             inputProps={{ 'aria-label': 'search holiday' }}
//             value={search}
//             onChange={handleSearchChange}
//           />
//           <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
//             <Search />
//           </IconButton>
//         </Paper>
//         <TableContainer component={Paper}>
//           <Table sx={{ minWidth: 650 }} aria-label="holiday table">
//             <TableHead>
//               <TableRow>
//                 <TableCell>Date</TableCell>
//                 <TableCell>Holiday</TableCell>
//                 <TableCell align="right">Action</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {filteredHolidays.map((holiday) => (
//                 <TableRow key={holiday.id}>
//                   <TableCell>
//                     {editId === holiday.id ? (
//                       <TextField
//                         name="date"
//                         value={editedHoliday.date}
//                         onChange={handleChange}
//                         variant="standard"
//                       />
//                     ) : (
//                       holiday.date
//                     )}
//                   </TableCell>
//                   <TableCell>
//                     {editId === holiday.id ? (
//                       <TextField
//                         name="name"
//                         value={editedHoliday.name}
//                         onChange={handleChange}
//                         variant="standard"
//                       />
//                     ) : (
//                       holiday.name
//                     )}
//                   </TableCell>
//                   <TableCell align="right">
//                     {editId === holiday.id ? (
//                       <Button
//                         variant="contained"
//                         color="primary"
//                         onClick={handleSaveEdit}
//                         sx={{ mr: 1 }}
//                       >
//                         Save
//                       </Button>
//                     ) : (
//                       <>
//                         <Button
//                           variant="outlined"
//                           startIcon={<Edit />}
//                           sx={{ mr: 1 }}
//                           onClick={() => handleEditClick(holiday.id)}
//                         >
//                           Edit
//                         </Button>
//                         <Button
//                           variant="contained"
//                           color="error"
//                           startIcon={<Delete />}
//                           onClick={() => handleDeleteClick(holiday.id)}
//                         >
//                           Delete
//                         </Button>
//                       </>
//                     )}
//                   </TableCell>
//                 </TableRow>
//               ))}
//               {filteredHolidays.length === 0 && (
//                 <TableRow>
//                   <TableCell colSpan={3} align="center">
//                     No holidays found.
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         {/* Confirmation Dialog */}
//         <Dialog
//           open={openDialog}
//           onClose={handleCancelDelete}
//         >
//           <DialogTitle>Confirm Deletion</DialogTitle>
//           <DialogContent>
//             <Typography>Are you sure you want to delete this holiday?</Typography>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleCancelDelete}>Cancel</Button>
//             <Button onClick={handleConfirmDelete} color="error">Delete</Button>
//           </DialogActions>
//         </Dialog>
//       </Box>
//     </Box>
//   );
// };
// export default ManageHoliday;



'use client';
import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  IconButton,
  InputBase,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Alert,
} from '@mui/material';
import { Edit, Delete, Search } from '@mui/icons-material';
import axios from 'axios'; // Import axios for API calls

const ManageHoliday = () => {
  const [search, setSearch] = useState('');
  const [holidays, setHolidays] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editedHoliday, setEditedHoliday] = useState({ date: '', name: '' });
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [success, setSuccess] = useState('');

  // Fetch holidays from the API when the component mounts
  useEffect(() => {
    axios
      .get('http://localhost:9099/holidays/allholidays')
      .then((response) => {
        setHolidays(response.data);
      })
      .catch((error) => {
        console.error('Error fetching holidays:', error);
      });
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const filteredHolidays = holidays.filter((holiday) =>
    holiday.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleEditClick = (id) => {
    const holidayToEdit = holidays.find((holiday) => holiday.id === id);
    setEditId(id);
    setEditedHoliday({ date: holidayToEdit.date, name: holidayToEdit.name });
    setSuccess('');
  };

  const handleSaveEdit = () => {
    setHolidays((prevHolidays) => {
      return prevHolidays.map((holiday) =>
        holiday.id === editId ? { ...holiday, ...editedHoliday } : holiday
      );
    });
    setEditId(null);
    setEditedHoliday({ date: '', name: '' });
    setSuccess('Holiday successfully updated!');
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setOpenDialog(true);
    setSuccess('');
  };

  const handleConfirmDelete = () => {
    axios
      .delete(`http://localhost:9099/holidays/deleteholiday/${deleteId}`)
      .then((response) => {
        setHolidays((prevHolidays) => {
          return prevHolidays.filter((holiday) => holiday.id !== deleteId);
        });
        setOpenDialog(false);
        setDeleteId(null);
        setSuccess('Holiday successfully deleted!');
      })
      .catch((error) => {
        console.error('Error deleting holiday:', error);
        setOpenDialog(false);
        setDeleteId(null);
      });
  };

  const handleCancelDelete = () => {
    setOpenDialog(false);
    setDeleteId(null);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditedHoliday((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        background: 'linear-gradient(to bottom, #FFFFFF, #A0C4FF)',
        minHeight: '100vh',
      }}
    >
      {/* Sidebar space */}
      <Box sx={{ width: '240px', display: { xs: 'none', md: 'block' } }} />
      {/* Main content area */}
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <Typography variant="h4" gutterBottom>
          Holidays List
        </Typography>
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}
        <Paper
          component="form"
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, mb: 2 }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search Holiday"
            inputProps={{ 'aria-label': 'search holiday' }}
            value={search}
            onChange={handleSearchChange}
          />
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            <Search />
          </IconButton>
        </Paper>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="holiday table">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Holiday</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredHolidays.map((holiday) => (
                <TableRow key={holiday.id}>
                  <TableCell>
                    {editId === holiday.id ? (
                      <TextField
                        name="date"
                        value={editedHoliday.date}
                        onChange={handleChange}
                        variant="standard"
                      />
                    ) : (
                      holiday.date
                    )}
                  </TableCell>
                  <TableCell>
                    {editId === holiday.id ? (
                      <TextField
                        name="name"
                        value={editedHoliday.name}
                        onChange={handleChange}
                        variant="standard"
                      />
                    ) : (
                      holiday.name
                    )}
                  </TableCell>
                  <TableCell align="right">
                    {editId === holiday.id ? (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSaveEdit}
                        sx={{ mr: 1 }}
                      >
                        Save
                      </Button>
                    ) : (
                      <>
                        <Button
                          variant="outlined"
                          startIcon={<Edit />}
                          sx={{ mr: 1 }}
                          onClick={() => handleEditClick(holiday.id)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          startIcon={<Delete />}
                          onClick={() => handleDeleteClick(holiday.id)}
                        >
                          Delete
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
              {filteredHolidays.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    No holidays found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {/* Confirmation Dialog */}
        <Dialog open={openDialog} onClose={handleCancelDelete}>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <Typography>Are you sure you want to delete this holiday?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelDelete}>Cancel</Button>
            <Button onClick={handleConfirmDelete} color="error">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default ManageHoliday;



