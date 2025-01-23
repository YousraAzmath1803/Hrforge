
// import React from 'react';
// import styles from '../styles/Employees.module.css';
// import Sidebar from '../components/Sidebar';
// import { useState } from 'react';

// const employees = () => {
//   const [showForm, setShowForm] = useState(false);
//   const handleButtonClick = () => {
//     setShowForm(true);
//     setShowForm(!showForm);  
//   };
//   return (
//     <>
//     <Sidebar/>
//     <div className={styles.container}>
     
//       <main className={styles.mainContent}>
       
//           <h1>Employees</h1>
//           <div className={styles.header}>
//           <div className={styles.searchContainer}>
//             <input type="text" placeholder="Search by employee" className={styles.searchInput} />
//             <button className={styles.searchButton}>Search</button>
//           </div>
//           <button className={styles.createButton} onClick={handleButtonClick}>+ Add New Employee</button>
//           {showForm && (
//       <div className={styles.addEmployee}>
//           <h2>New Employee</h2>
//           <label htmlFor="name">Name:</label>
//           <input 
//             type="text" 
//             placeholder="Name" 
            
//             className={styles.input}
            
//           />
//           <label htmlFor="role">Role:</label>
//           <input 
//             type="text" 
//             placeholder="Role" 
            
//             className={styles.input}
            
//           />
        
//           <button className={styles.button} >Add Employee</button>
//         </div>
//       )}
       

//           </div>

//         <table className={styles.table}>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Role</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
           
//               <tr >
//                 <td>teja</td>
//                 <td>developer</td>
//                 <td>
//                   <button className={styles.editButton}>Edit</button>
//                   <button className={styles.deleteButton}>Delete</button>
//                 </td>
                
//               </tr>
            
//           </tbody>
//         </table>
//       </main>
//     </div>
//     </>
//   );
// };

// export default employees;

// const employeeslist = [
//   { name: 'John Doe', role: 'Developer' },
//   { name: 'Jane Smith', role: 'Designer' },
// ];

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import styles from '../styles/Employees.module.css';
// import Sidebar from '../components/Sidebar';

// const Employees = () => {
//   const [employees, setEmployees] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     // Fetching employees from the backend
//     axios.get('http://localhost:8080/api/employees')
//       .then(response => {
//         setEmployees(response.data);
//       })
//       .catch(error => {
//         console.error("There was an error fetching the employees!", error);
//       });
//   }, []);

//   // Filter employees based on the search term
//   const filteredEmployees = employees.filter(employee =>
//     employee.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <>
//       <Sidebar />
//       <div className={styles.container}>
//         <main className={styles.mainContent}>
//           <h1>Employees</h1>
//           <div className={styles.header}>
//             <div className={styles.searchContainer}>
//               <input
//                 type="text"
//                 placeholder="Search by employee"
//                 className={styles.searchInput}
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//               <button className={styles.searchButton}>Search</button>
//             </div>
//             <button className={styles.createButton}>+ Add New Employee</button>
//           </div>

//           <table className={styles.table}>
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Role</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredEmployees.map((employee, index) => (
//                 <tr key={index}>
//                   <td>{employee.name}</td>
//                   <td>{employee.role}</td>
//                   <td>
//                     <button className={styles.editButton}>Edit</button>
//                     <button className={styles.deleteButton}>Delete</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </main>
//       </div>
//     </>
//   );
// };

// export default Employees;

// /pages/employees.js
// import React, { useState, useEffect } from 'react';
// import { fetchEmployees, createEmployee, updateEmployee, deleteEmployee } from '../services/api';
// import EmployeeTable from '../components/EmployeeTable';
// import EmployeeForm from '../components/EmployeeForm';
// import { Container, Button, Dialog, DialogTitle, DialogContent } from '@mui/material';

// const Employees = () => {
//   const [employees, setEmployees] = useState([]);
//   const [isFormOpen, setIsFormOpen] = useState(false);
//   const [editingEmployee, setEditingEmployee] = useState(null);

//   const loadEmployees = async () => {
//     const response = await fetchEmployees();
//     setEmployees(response.data);
//   };

//   useEffect(() => {
//     loadEmployees();
//   }, []);

//   const handleAdd = () => {
//     setEditingEmployee(null);
//     setIsFormOpen(true);
//   };

//   const handleEdit = (employee) => {
//     setEditingEmployee(employee);
//     setIsFormOpen(true);
//   };

//   const handleDelete = async (id) => {
//     await deleteEmployee(id);
//     loadEmployees();
//   };

//   const handleFormSubmit = async (employee) => {
//     if (editingEmployee) {
//       await updateEmployee(editingEmployee.id, employee);
//     } else {
//       await createEmployee(employee);
//     }
//     setIsFormOpen(false);
//     loadEmployees();
//   };

//   return (
//     <Container>
//       <Button variant="contained" color="primary" onClick={handleAdd} sx={{ mb: 2 }}>Add Employee</Button>
//       <EmployeeTable employees={employees} onEdit={handleEdit} onDelete={handleDelete} />
//       <Dialog open={isFormOpen} onClose={() => setIsFormOpen(false)}>
//         <DialogTitle>{editingEmployee ? 'Edit Employee' : 'Add Employee'}</DialogTitle>
//         <DialogContent>
//           <EmployeeForm onSubmit={handleFormSubmit} initialData={editingEmployee} />
//         </DialogContent>
//       </Dialog>
//     </Container>
//   );
// };

// export default Employees;

// pages/index.js
// import React, { useState, useEffect } from 'react';
// import { Container, Typography, Button, TextField, MenuItem, FormControl, InputLabel, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
// import { Delete, Edit } from '@mui/icons-material';
// import axios from 'axios';

// const Home = () => {
//     const [employees, setEmployees] = useState([]);
//     const [selectedEmployee, setSelectedEmployee] = useState(null);
//     const [formData, setFormData] = useState({
//         name: '',
//         designation: '',
//         email: '',
//         employerType: 'FULL_TIME'
//     });

//     // Fetch employees from backend
//     const fetchEmployees = async () => {
//         const response = await axios.get('http://localhost:8080/api/employees');
//         setEmployees(response.data);
//     };

//     useEffect(() => {
//         fetchEmployees();
//     }, []);

//     // Handle form change
//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     // Handle form submit
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (selectedEmployee) {
//             await axios.put(`http://localhost:8080/api/employees/${selectedEmployee.id}`, formData);
           
//         } else {
//             await axios.post('http://localhost:8080/api/employees', formData);
           
//         }
//         setFormData({ name: '', designation: '', email: '', employerType: 'FULL_TIME' });
//         setSelectedEmployee(null);
//         fetchEmployees();
//     };

//     // Handle delete
//     const handleDelete = async (id) => {
//         await axios.delete(`http://localhost:8080/api/employees/${id}`);
//         fetchEmployees();
//     };

//     // Handle edit
//     const handleEdit = (employee) => {
//         setSelectedEmployee(employee);
//         setFormData(employee);
//     };

//     return (
//         <Container>
//             <Typography variant="h4" gutterBottom>
//                 Employee Management
//             </Typography>

//             {/* Employee Form */}
//             <form onSubmit={handleSubmit}>
//                 <TextField
//                     label="Name"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     fullWidth
//                     margin="normal"
//                 />
//                 <TextField
//                     label="Designation"
//                     name="designation"
//                     value={formData.designation}
//                     onChange={handleChange}
//                     fullWidth
//                     margin="normal"
//                 />
//                 <TextField
//                     label="Email"
//                     name="email"
//                     type="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     fullWidth
//                     margin="normal"
//                 />
//                 <FormControl fullWidth margin="normal">
//                     <InputLabel>Employer Type</InputLabel>
//                     <Select
//                         name="employerType"
//                         value={formData.employerType}
//                         onChange={handleChange}
//                     >
//                         <MenuItem value="FULL_TIME">Full Time</MenuItem>
//                         <MenuItem value="PART_TIME">Part Time</MenuItem>
//                         <MenuItem value="INTERNSHIP">Internship</MenuItem>
//                     </Select>
//                 </FormControl>
//                 <Button type="submit" variant="contained" color="primary">
//                     {selectedEmployee ? 'Update' : 'Create'} Employee
//                 </Button>
//             </form>

//             {/* Employee Table */}
//             <TableContainer component={Paper} style={{ marginTop: '20px' }}>
//                 <Table>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell>Name</TableCell>
//                             <TableCell>Designation</TableCell>
//                             <TableCell>Email</TableCell>
//                             <TableCell>Employer Type</TableCell>
//                             <TableCell>Actions</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {employees.map((employee) => (
//                             <TableRow key={employee.id}>
//                                 <TableCell>{employee.name}</TableCell>
//                                 <TableCell>{employee.designation}</TableCell>
//                                 <TableCell>{employee.email}</TableCell>
//                                 <TableCell>{employee.employerType}</TableCell>
//                                 <TableCell>
//                                     <IconButton onClick={() => handleEdit(employee)} color="primary">
//                                         <Edit />
//                                     </IconButton>
//                                     <IconButton onClick={() => handleDelete(employee.id)} color="secondary">
//                                         <Delete />
//                                     </IconButton>
//                                 </TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//         </Container>
//     );
// };

// export default Home;



// pages/index.js
// import React, { useState, useEffect } from 'react';
// import { Container, Typography, Button, TextField, MenuItem, FormControl, InputLabel, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
// import { Delete, Edit } from '@mui/icons-material';
// import axios from 'axios';

// const Home = () => {
//     const [employees, setEmployees] = useState([]);
//     const [selectedEmployee, setSelectedEmployee] = useState(null);
//     const [formData, setFormData] = useState({
//         name: '',
//         designation: '',
//         email: '',
//         employerType: 'FULL_TIME'
//     });
//     const [error, setError] = useState(null);

//     // Fetch employees from backend
//     const fetchEmployees = async () => {
//         try {
//             const response = await axios.get('/api/employees');
//             setEmployees(response.data);
//         } catch (err) {
//             console.error("Error fetching employees:", err);
//             setError("Failed to load employees. Please try again later.");
//         }
//     };

//     useEffect(() => {
//         fetchEmployees();
//     }, []);

//     // Handle form change
//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     // Handle form submit
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             if (selectedEmployee) {
//                 await axios.put(`/api/employees/${selectedEmployee.id}`, formData);
//             } else {
//                 await axios.post('/api/employees', formData);
//             }
//             setFormData({ name: '', designation: '', email: '', employerType: 'FULL_TIME' });
//             setSelectedEmployee(null);
//             fetchEmployees();
//         } catch (err) {
//             console.error("Error saving employee:", err);
//             setError("Failed to save employee. Please try again.");
//         }
//     };

//     // Handle delete
//     const handleDelete = async (id) => {
//         try {
//             await axios.delete(`/api/employees/${id}`);
//             fetchEmployees();
//         } catch (err) {
//             console.error("Error deleting employee:", err);
//             setError("Failed to delete employee. Please try again.");
//         }
//     };

//     // Handle edit
//     const handleEdit = (employee) => {
//         setSelectedEmployee(employee);
//         setFormData(employee);
//     };

//     return (
//         <Container>
//             <Typography variant="h4" gutterBottom>
//                 Employee Management
//             </Typography>

//             {/* Display error message */}
//             {error && <Typography color="error">{error}</Typography>}

//             {/* Employee Form */}
//             <form onSubmit={handleSubmit}>
//                 <TextField
//                     label="Name"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     fullWidth
//                     margin="normal"
//                 />
//                 <TextField
//                     label="Designation"
//                     name="designation"
//                     value={formData.designation}
//                     onChange={handleChange}
//                     fullWidth
//                     margin="normal"
//                 />
//                 <TextField
//                     label="Email"
//                     name="email"
//                     type="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     fullWidth
//                     margin="normal"
//                 />
//                 <FormControl fullWidth margin="normal">
//                     <InputLabel>Employer Type</InputLabel>
//                     <Select
//                         name="employerType"
//                         value={formData.employerType}
//                         onChange={handleChange}
//                     >
//                         <MenuItem value="FULL_TIME">Full Time</MenuItem>
//                         <MenuItem value="PART_TIME">Part Time</MenuItem>
//                         <MenuItem value="INTERNSHIP">Internship</MenuItem>
//                     </Select>
//                 </FormControl>
//                 <Button type="submit" variant="contained" color="primary">
//                     {selectedEmployee ? 'Update' : 'Create'} Employee
//                 </Button>
//             </form>

//             {/* Employee Table */}
//             <TableContainer component={Paper} style={{ marginTop: '20px' }}>
//                 <Table>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell>Name</TableCell>
//                             <TableCell>Designation</TableCell>
//                             <TableCell>Email</TableCell>
//                             <TableCell>Employer Type</TableCell>
//                             <TableCell>Actions</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {employees.map((employee) => (
//                             <TableRow key={employee.id}>
//                                 <TableCell>{employee.name}</TableCell>
//                                 <TableCell>{employee.designation}</TableCell>
//                                 <TableCell>{employee.email}</TableCell>
//                                 <TableCell>{employee.employerType}</TableCell>
//                                 <TableCell>
//                                     <IconButton onClick={() => handleEdit(employee)} color="primary">
//                                         <Edit />
//                                     </IconButton>
//                                     <IconButton onClick={() => handleDelete(employee.id)} color="secondary">
//                                         <Delete />
//                                     </IconButton>
//                                 </TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//         </Container>
//     );
// };

// export default Home;

// import React, { useState, useEffect } from 'react';
// import { Container, Typography, Button, TextField, MenuItem, FormControl, InputLabel, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
// import { Delete, Edit } from '@mui/icons-material';
// import axios from 'axios';

// const Home = () => {
//     const [employees, setEmployees] = useState([]);
//     const [selectedEmployee, setSelectedEmployee] = useState(null);
//     const [formData, setFormData] = useState({
//         name: '',
//         designation: '',
//         email: '',
//         employerType: 'FULL_TIME'
//     });

//     // Fetch employees from backend
//     const fetchEmployees = async () => {
//         try {
//             const response = await axios.get('http://localhost:8080/api/employees');
//             setEmployees(response.data);
//         } catch (error) {
//             console.error("Error fetching employees:", error);
//         }
//     };

//     useEffect(() => {
//         fetchEmployees();
//     }, []);

//     // Handle form change
//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     // Handle form submit
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             if (selectedEmployee) {
//                 await axios.put(`http://localhost:8080/api/employees/${selectedEmployee.id}`, formData);
//             } else {
//                 await axios.post('http://localhost:8080/api/employees', formData);
//             }
//             setFormData({ name: '', designation: '', email: '', employerType: 'FULL_TIME' });
//             setSelectedEmployee(null);
//             fetchEmployees();
//         } catch (error) {
//             console.error("Error submitting form:", error);
//         }
//     };

//     // Handle delete
//     const handleDelete = async (id) => {
//         try {
//             await axios.delete(`http://localhost:8080/api/employees/${id}`);
//             fetchEmployees();
//         } catch (error) {
//             console.error("Error deleting employee:", error);
//         }
//     };

//     // Handle edit
//     const handleEdit = (employee) => {
//         setSelectedEmployee(employee);
//         setFormData(employee);
//     };

//     return (
//         <Container>
//             <Typography variant="h4" gutterBottom>
//                 Employee Management
//             </Typography>

//             {/* Employee Form */}
//             <form onSubmit={handleSubmit}>
//                 <TextField
//                     label="Name"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     fullWidth
//                     margin="normal"
//                 />
//                 <TextField
//                     label="Designation"
//                     name="designation"
//                     value={formData.designation}
//                     onChange={handleChange}
//                     fullWidth
//                     margin="normal"
//                 />
//                 <TextField
//                     label="Email"
//                     name="email"
//                     type="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     fullWidth
//                     margin="normal"
//                 />
//                 <FormControl fullWidth margin="normal">
//                     <InputLabel>Employer Type</InputLabel>
//                     <Select
//                         name="employerType"
//                         value={formData.employerType}
//                         onChange={handleChange}
//                     >
//                         <MenuItem value="FULL_TIME">Full Time</MenuItem>
//                         <MenuItem value="PART_TIME">Part Time</MenuItem>
//                         <MenuItem value="INTERNSHIP">Internship</MenuItem>
//                     </Select>
//                 </FormControl>
//                 <Button type="submit" variant="contained" color="primary">
//                     {selectedEmployee ? 'Update' : 'Create'} Employee
//                 </Button>
//             </form>

//             {/* Employee Table */}
//             <TableContainer component={Paper} style={{ marginTop: '20px' }}>
//                 <Table>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell>Name</TableCell>
//                             <TableCell>Designation</TableCell>
//                             <TableCell>Email</TableCell>
//                             <TableCell>Employer Type</TableCell>
//                             <TableCell>Actions</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {employees.map((employee) => (
//                             <TableRow key={employee.id}>
//                                 <TableCell>{employee.name}</TableCell>
//                                 <TableCell>{employee.designation}</TableCell>
//                                 <TableCell>{employee.email}</TableCell>
//                                 <TableCell>{employee.employerType}</TableCell>
//                                 <TableCell>
//                                     <IconButton onClick={() => handleEdit(employee)} color="primary">
//                                         <Edit />
//                                     </IconButton>
//                                     <IconButton onClick={() => handleDelete(employee.id)} color="secondary">
//                                         <Delete />
//                                     </IconButton>
//                                 </TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//         </Container>
//     );
// };

// export default Home;


import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, TextField, MenuItem, FormControl, InputLabel, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import axios from 'axios';

const Home = () => {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        designation: '',
        email: '',
        employerType: 'FULL_TIME'
    });

    // Fetch employees from backend
    const fetchEmployees = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/employees');
            console.log("Fetched employees:", response.data); // Log response
            setEmployees(response.data);
        } catch (error) {
            console.error("Error fetching employees:", error);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    // Handle form change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (selectedEmployee) {
                const response = await axios.put(`http://localhost:8080/api/employees/${selectedEmployee.id}`, formData);
                console.log("Updated employee:", response.data); // Log response
            } else {
                const response = await axios.post('http://localhost:8080/api/employees', formData);
                console.log("Created employee:", response.data); // Log response
            }
            setFormData({ name: '', designation: '', email: '', employerType: 'FULL_TIME' });
            setSelectedEmployee(null);
            fetchEmployees();
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    // Handle delete
    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8080/api/employees/${id}`);
            console.log("Deleted employee:", response.data); // Log response
            fetchEmployees();
        } catch (error) {
            console.error("Error deleting employee:", error);
        }
    };

    // Handle edit
    const handleEdit = (employee) => {
        setSelectedEmployee(employee);
        setFormData(employee);
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Employee Management
            </Typography>

            {/* Employee Form */}
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Designation"
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel>Employer Type</InputLabel>
                    <Select
                        name="employerType"
                        value={formData.employerType}
                        onChange={handleChange}
                    >
                        <MenuItem value="FULL_TIME">Full Time</MenuItem>
                        <MenuItem value="PART_TIME">Part Time</MenuItem>
                        <MenuItem value="INTERNSHIP">Internship</MenuItem>
                    </Select>
                </FormControl>
                <Button type="submit" variant="contained" color="primary">
                    {selectedEmployee ? 'Update' : 'Create'} Employee
                </Button>
            </form>

            {/* Employee Table */}
            <TableContainer component={Paper} style={{ marginTop: '20px' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Designation</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Employer Type</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employees.map((employee) => (
                            <TableRow key={employee.id}>
                                <TableCell>{employee.name}</TableCell>
                                <TableCell>{employee.designation}</TableCell>
                                <TableCell>{employee.email}</TableCell>
                                <TableCell>{employee.employerType}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleEdit(employee)} color="primary">
                                        <Edit />
                                    </IconButton>
                                    <IconButton onClick={() => handleDelete(employee.id)} color="secondary">
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default Home;
