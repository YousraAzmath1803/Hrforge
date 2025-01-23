
import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Checkbox, FormControlLabel, FormControl, InputLabel, Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import axios from 'axios';
import styles from '../styles/leavetype.module.css'; 

const Home = () => {
    const [formData, setFormData] = useState({
        name: '',
        isPaid: false,
        duration: 'DAYS',
    });
    const [leaveTypes, setLeaveTypes] = useState([]);
    const [editingId, setEditingId] = useState(null);

    // Fetch all leave types
    const fetchLeaveTypes = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/leavetypes/all');
            console.log("Fetched leave types:", response.data);
            setLeaveTypes(response.data);
        } catch (error) {
            console.error("Error fetching leave types:", error);
        }
    };

    useEffect(() => {
        fetchLeaveTypes();
    }, []);

    // Handle form input change
    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    // Handle form submission for creating/updating leave types
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                // Update existing leave type if editingId is set
                const response = await axios.put(`http://localhost:8080/api/leavetypes/${editingId}`, formData);
                console.log("Leave type updated:", response.data);
            } else {
                // Create a new leave type if editingId is null
                const response = await axios.post('http://localhost:8080/api/leavetypes/create', formData);
                console.log("Leave type created:", response.data);
            }
            setFormData({ name: '', isPaid: false, duration: 'DAYS' });
            setEditingId(null);
            fetchLeaveTypes();  // Refresh the list of leave types
        } catch (error) {
            console.error("Error creating/updating leave type:", error);
        }
    };

    // Handle edit button click
    const handleEdit = (leaveType) => {
        setFormData({
            name: leaveType.name,
            isPaid: leaveType.isPaid,
            duration: leaveType.duration,
        });
        setEditingId(leaveType.id); // Set the ID of the leaveType being edited
    };

    // Handle delete button click
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/leavetypes/${id}`);
            console.log("Leave type deleted with ID:", id);
            fetchLeaveTypes();  // Refresh the list of leave types to remove deleted entry
        } catch (error) {
            console.error("Error deleting leave type:", error);
        }
    };

    return (
         <div className="container">
            <Typography variant="h5" gutterBottom>
                {editingId ? 'Edit Leave Type' : 'Create Leave Type'}
            </Typography>
            <div className="mainContent">
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={formData.isPaid}
                            onChange={handleChange}
                            name="isPaid"
                        />
                    }
                    label="Is Paid Leave"
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel>Duration</InputLabel>
                    <Select
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                    >
                        <MenuItem value="DAYS">Days</MenuItem>
                        <MenuItem value="HOURS">Hours</MenuItem>
                    </Select>
                </FormControl>
                <Button type="submit" variant="contained" color="primary">
                    {editingId ? 'Update' : 'Create'} Leave Type
                </Button>
            </form>

            <Typography variant="h5" gutterBottom style={{ marginTop: '20px' }}>
                Leave Types
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Is Paid</TableCell>
                            <TableCell>Duration</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {leaveTypes.map((leaveType) => (
                            <TableRow key={leaveType.id}>
                                <TableCell>{leaveType.id}</TableCell>
                                <TableCell>{leaveType.name}</TableCell>
                                <TableCell>{leaveType.isPaid ? "Yes" : "No"}</TableCell>
                                <TableCell>{leaveType.duration}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleEdit(leaveType)} color="primary">
                                        <Edit />
                                    </IconButton>
                                    <IconButton onClick={() => handleDelete(leaveType.id)} color="secondary">
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            </div>
        </div>
    );
};

export default Home;



// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   TextField,
//   Typography,
//   Switch,
//   FormControlLabel,
//   Select,
//   MenuItem,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
// } from "@mui/material";
// import axios from "axios";

// const LeaveTypes = () => {
//   const [leaveTypes, setLeaveTypes] = useState([]);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [formData, setFormData] = useState({
//     id: null,
//     name: "",
//     isPaid: false,
//     duration: "DAYS",
//   });

//   useEffect(() => {
//     fetchLeaveTypes();
//   }, []);

//   const fetchLeaveTypes = async () => {
//     try {
//       const response = await axios.get("http://localhost:8080/api/leave-types");
//       setLeaveTypes(response.data);
//     } catch (error) {
//       console.error("Error fetching leave types:", error);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSwitchChange = (e) => {
//     setFormData({ ...formData, isPaid: e.target.checked });
//   };

//   const handleSubmit = async () => {
//     try {
//       if (formData.id) {
//         await axios.put(`http://localhost:8080/api/leave-types/${formData.id}`, formData);
//       } else {
//         await axios.post("http://localhost:8080/api/leave-types", formData);
//       }
//       fetchLeaveTypes();
//       setOpenDialog(false);
//     } catch (error) {
//       console.error("Error saving leave type:", error);
//     }
//   };

//   const handleEdit = (leaveType) => {
//     setFormData(leaveType);
//     setOpenDialog(true);
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:8080/api/leave-types/${id}`);
//       fetchLeaveTypes();
//     } catch (error) {
//       console.error("Error deleting leave type:", error);
//     }
//   };

//   return (
//     <Box sx={{ padding: 4 }}>
//       <Typography variant="h4" gutterBottom>
//         Leave Types
//       </Typography>
//       <Button variant="contained" onClick={() => setOpenDialog(true)}>
//         Add Leave Type
//       </Button>
//       <TableContainer component={Paper} sx={{ marginTop: 4 }}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>ID</TableCell>
//               <TableCell>Name</TableCell>
//               <TableCell>Paid Leave</TableCell>
//               <TableCell>Duration</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {leaveTypes.map((leaveType) => (
//               <TableRow key={leaveType.id}>
//                 <TableCell>{leaveType.id}</TableCell>
//                 <TableCell>{leaveType.name}</TableCell>
//                 <TableCell>{leaveType.isPaid ? "Yes" : "No"}</TableCell>
//                 <TableCell>{leaveType.duration}</TableCell>
//                 <TableCell>
//                   <Button
//                     variant="outlined"
//                     color="primary"
//                     onClick={() => handleEdit(leaveType)}
//                   >
//                     Edit
//                   </Button>
//                   <Button
//                     variant="outlined"
//                     color="secondary"
//                     onClick={() => handleDelete(leaveType.id)}
//                     sx={{ marginLeft: 1 }}
//                   >
//                     Delete
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
//         <DialogTitle>{formData.id ? "Edit Leave Type" : "Add Leave Type"}</DialogTitle>
//         <DialogContent>
//           <TextField
//             fullWidth
//             label="Name"
//             name="name"
//             value={formData.name}
//             onChange={handleInputChange}
//             sx={{ marginBottom: 2 }}
//           />
//           <FormControlLabel
//             control={
//               <Switch
//                 checked={formData.isPaid}
//                 onChange={handleSwitchChange}
//                 name="isPaid"
//               />
//             }
//             label="Paid Leave"
//           />
//           <Select
//             fullWidth
//             name="duration"
//             value={formData.duration}
//             onChange={handleInputChange}
//             sx={{ marginTop: 2 }}
//           >
//             <MenuItem value="DAYS">DAYS</MenuItem>
//             <MenuItem value="HOURS">HOURS</MenuItem>
//           </Select>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
//           <Button variant="contained" onClick={handleSubmit}>
//             Save
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default LeaveTypes;




// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   TextField,
//   Typography,
//   Switch,
//   FormControlLabel,
//   Select,
//   MenuItem,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
// } from "@mui/material";
// import axios from "axios";

// const LeaveTypes = () => {
//   const [leaveTypes, setLeaveTypes] = useState([]);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [formData, setFormData] = useState({
//     id: null,
//     name: "",
//     isPaid: false,
//     duration: "DAYS",
//   });

//   useEffect(() => {
//     fetchLeaveTypes();
//   }, []);

//   const fetchLeaveTypes = async () => {
//     try {
//       const response = await axios.get("http://localhost:8080/api/leave-types");
//       setLeaveTypes(response.data);
//     } catch (error) {
//       console.error("Error fetching leave types:", error);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSwitchChange = (e) => {
//     setFormData({ ...formData, isPaid: e.target.checked });
//   };

//   const handleSubmit = async () => {
//     try {
//       if (formData.id) {
//         // Update the existing leave type
//         await axios.put(
//           `http://localhost:8080/api/leave-types/${formData.id}`,
//           formData
//         );
//       } else {
//         // Create a new leave type
//         await axios.post("http://localhost:8080/api/leave-types", formData);
//       }
//       fetchLeaveTypes();  // Refresh the list
//       setOpenDialog(false); // Close the dialog
//       setFormData({ id: null, name: "", isPaid: false, duration: "DAYS" }); // Reset form
//     } catch (error) {
//       console.error("Error saving leave type:", error);
//     }
//   };

//   const handleEdit = (leaveType) => {
//     setFormData(leaveType);
//     setOpenDialog(true);
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:8080/api/leave-types/${id}`);
//       fetchLeaveTypes();  // Refresh the list
//     } catch (error) {
//       console.error("Error deleting leave type:", error);
//     }
//   };

//   return (
//     <Box sx={{ padding: 4 }}>
//       <Typography variant="h4" gutterBottom>
//         Leave Types
//       </Typography>
//       <Button variant="contained" onClick={() => setOpenDialog(true)}>
//         Add Leave Type
//       </Button>
//       <TableContainer component={Paper} sx={{ marginTop: 4 }}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>ID</TableCell>
//               <TableCell>Name</TableCell>
//               <TableCell>Paid Leave</TableCell>
//               <TableCell>Duration</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {leaveTypes.map((leaveType) => (
//               <TableRow key={leaveType.id}>
//                 <TableCell>{leaveType.id}</TableCell>
//                 <TableCell>{leaveType.name}</TableCell>
//                 <TableCell>{leaveType.isPaid ? "Yes" : "No"}</TableCell>
//                 <TableCell>{leaveType.duration}</TableCell>
//                 <TableCell>
//                   <Button
//                     variant="outlined"
//                     color="primary"
//                     onClick={() => handleEdit(leaveType)}
//                   >
//                     Edit
//                   </Button>
//                   <Button
//                     variant="outlined"
//                     color="secondary"
//                     onClick={() => handleDelete(leaveType.id)}
//                     sx={{ marginLeft: 1 }}
//                   >
//                     Delete
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Dialog for adding/editing leave type */}
//       <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
//         <DialogTitle>{formData.id ? "Edit Leave Type" : "Add Leave Type"}</DialogTitle>
//         <DialogContent>
//           <TextField
//             fullWidth
//             label="Name"
//             name="name"
//             value={formData.name}
//             onChange={handleInputChange}
//             sx={{ marginBottom: 2 }}
//           />
//           <FormControlLabel
//             control={
//               <Switch
//                 checked={formData.isPaid}
//                 onChange={handleSwitchChange}
//                 name="isPaid"
//               />
//             }
//             label="Paid Leave"
//           />
//           <Select
//             fullWidth
//             name="duration"
//             value={formData.duration}
//             onChange={handleInputChange}
//             sx={{ marginTop: 2 }}
//           >
//             <MenuItem value="DAYS">DAYS</MenuItem>
//             <MenuItem value="HOURS">HOURS</MenuItem>
//           </Select>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
//           <Button variant="contained" onClick={handleSubmit}>
//             Save
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default LeaveTypes;
