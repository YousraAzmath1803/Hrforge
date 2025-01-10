// // 'use client';
// // import React, { useState } from 'react';
// // import { Box, Card, CardContent, Typography, Grid, CircularProgress, Tooltip, List, ListItem, ListItemText, ListItemIcon, Button } from '@mui/material';
// // import { CheckCircle, Warning, BeachAccess, Schedule, MoreTime, ExitToApp, People } from '@mui/icons-material';
// // import Sidebar from '../components/Sidebar'; // Ensure Sidebar is imported
// // import AttendanceChart from '../components/AttendanceChart'; // Import AttendanceChart

// // const attendanceData = [
// //   { label: "Checked In", count: 4500, color: "#4caf50", icon: <CheckCircle sx={{ fontSize: '2.5rem' }} /> },
// //   { label: "Not Checked In", count: 500, color: "#f44336", icon: <Warning sx={{ fontSize: '2.5rem' }} /> },
// //   { label: "On Leave", count: 457, color: "#4caf50", icon: <BeachAccess sx={{ fontSize: '2.5rem' }} /> },
// //   { label: "Late Comers", count: 145, color: "#9e9e9e", icon: <Schedule sx={{ fontSize: '2.5rem' }} /> },
// //   { label: "Overtime", count: 12, color: "#7F00FF", icon: <MoreTime sx={{ fontSize: '2.5rem' }} /> },
// //   //{ label: "Checked Out", count: 250, color: "#ff9800", icon: <ExitToApp sx={{ fontSize: '2.5rem' }} /> },
// // ];

// // const holidays = [
// //   { name: "Kite Festival", date: "Fri, Jan 14 2021", color: "#2196f3", icon: <CheckCircle /> },
// //   { name: "Holi", date: "Mon, Mar 29 2021", color: "#9c27b0", icon: <CheckCircle /> },
// //   { name: "Diwali", date: "Thu, Nov 04 - Nov 07 2021 (4 Days)", color: "#f44336", icon: <CheckCircle /> },
// //   { name: "Christmas", date: "Fri, Dec 25 2021", color: "#ffeb3b", icon: <CheckCircle /> },
// //   // { name: "Sports Day", date: "Fri, Mar 29 2020", color: "#f44336", icon: <CheckCircle /> },
// // ];

// // // Calculate total employees
// // const totalEmployees = attendanceData.reduce((total, item) => total + item.count, 0);

// // // Percentage of checked-in, not checked-in, and late comers employees
// // const checkedInPercentage = (attendanceData[0].count / totalEmployees) * 100;
// // const notCheckedInPercentage = (attendanceData[1].count / totalEmployees) * 100;
// // const lateComersPercentage = (attendanceData[3].count / totalEmployees) * 100;

// // // Determine font size and circle size based on total employees count length
// // const circleSize = 150; // Increased the circle size
// // const fontSize = '1.5rem';

// // const Attendance: React.FC = () => {
// //   const [showAllHolidays, setShowAllHolidays] = useState(false);

// //   const handleToggleHolidayList = () => {
// //     setShowAllHolidays(!showAllHolidays);
// //   };

// //   return (
// //     <Box sx={{ display: 'flex', minHeight: '100vh', background: 'linear-gradient(to bottom, #e0f7fa, #ffffff)', padding: '20px', marginLeft: '240px', backgroundColor: 'beige' }}>
// //       <Sidebar /> {/* Ensure Sidebar is included */}
// //       <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
// //         <Grid container spacing={3}>
// //           {/* Display the circular statistics chart */}
// //           <Grid item xs={12} sm={6} md={4} lg={3}>
// //             <Card>
// //               <CardContent>
// //                 <Typography variant="h6">Overview</Typography>
// //                 <Tooltip title={`Checked In: ${checkedInPercentage.toFixed(2)}%, Not Checked In: ${notCheckedInPercentage.toFixed(2)}%, Late Comers: ${lateComersPercentage.toFixed(2)}%`}>
// //                   <Box display="flex" justifyContent="center" alignItems="center" position="relative">
// //                     <CircularProgress variant="determinate" value={100} size={circleSize} thickness={4} style={{ color: '#e0e0e0', position: 'absolute' }} />
// //                     <CircularProgress variant="determinate" value={checkedInPercentage} size={circleSize} thickness={4} style={{ color: '#4caf50' }} />
// //                     <CircularProgress variant="determinate" value={notCheckedInPercentage} size={circleSize} thickness={4} style={{ color: '#f44336', position: 'absolute' }} />
// //                     <CircularProgress variant="determinate" value={lateComersPercentage} size={circleSize} thickness={4} style={{ color: '#9e9e9e', position: 'absolute' }} />
// //                     <Box position="absolute" display="flex" flexDirection="column" alignItems="center">
// //                       <Typography variant="h6" sx={{ fontSize }}>
// //                         {totalEmployees}
// //                       </Typography>
// //                       <Typography variant="body2" sx={{ fontSize: '0.75rem', fontWeight: 'bold' }}>
// //                         Total Employees
// //                       </Typography>
// //                     </Box>
// //                   </Box>
// //                 </Tooltip>
// //               </CardContent>
// //             </Card>
// //           </Grid>

// //           {/* Display Total Employees */}
// //           <Grid item xs={12} sm={6} md={4} lg={3}>
// //             <Card>
// //               <CardContent>
// //                 <Box sx={{ color: "#2196f3", fontSize: '2.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
// //                   <People sx={{ fontSize: '2.5rem' }} />
// //                 </Box>
// //                 <Typography variant="h6">Total Employees</Typography>
// //                 <Typography variant="h4" sx={{ color: "#2196f3" }}>
// //                   {totalEmployees}
// //                 </Typography>
// //               </CardContent>
// //             </Card>
// //           </Grid>

// //           {/* Display Checked In */}
// //           <Grid item xs={12} sm={6} md={4} lg={3}>
// //             <Card>
// //               <CardContent>
// //                 <Box sx={{ color: "#4caf50", fontSize: '2.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
// //                   <CheckCircle sx={{ fontSize: '2.5rem' }} />
// //                 </Box>
// //                 <Typography variant="h6">Checked In</Typography>
// //                 <Typography variant="h4" sx={{ color: "#4caf50" }}>
// //                   {attendanceData[0].count}
// //                 </Typography>
// //               </CardContent>
// //             </Card>
// //           </Grid>

// //           {/* Display Not Checked In */}
// //           <Grid item xs={12} sm={6} md={4} lg={3}>
// //             <Card>
// //               <CardContent>
// //                 <Box sx={{ color: "#f44336", fontSize: '2.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
// //                   <Warning sx={{ fontSize: '2.5rem' }} />
// //                 </Box>
// //                 <Typography variant="h6">Not Checked In</Typography>
// //                 <Typography variant="h4" sx={{ color: "#f44336" }}>
// //                   {attendanceData[1].count}
// //                 </Typography>
// //               </CardContent>
// //             </Card>
// //           </Grid>

// //           {/* Display other attendance data */}
// //           {attendanceData.slice(2).map((item, index) => (
// //             <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
// //               <Card>
// //                 <CardContent>
// //                   <Box sx={{ color: item.color, fontSize: '2.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
// //                     {item.icon}
// //                   </Box>
// //                   <Typography variant="h6">{item.label}</Typography>
// //                   <Typography variant="h4" sx={{ color: item.color }}>
// //                     {item.count}
// //                   </Typography>
// //                 </CardContent>
// //               </Card>
// //             </Grid>
// //           ))}

// //           {/* Display Holidays */}
// //           <Grid item xs={12} sm={6} md={4} lg={3}>
// //             <Card>
// //               <CardContent>
// //                 <Typography variant="h6">Upcoming Holidays</Typography>
// //                 <Button 
// //                   onClick={handleToggleHolidayList} 
// //                   sx={{ 
// //                     marginBottom: '10px', 
// //                     fontWeight: 'bold', 
// //                     textTransform: 'none',
// //                     '&:hover': {
// //                       color: 'green',
// //                       textShadow: '0 0 8px green'
// //                     }
// //                   }}
// //                 >
// //                   {showAllHolidays ? 'Hide List' : 'Show List'}
// //                 </Button>
// //                 <List>
// //                   {showAllHolidays
// //                     ? holidays.map((holiday, index) => (
// //                         <ListItem key={index}>
// //                           <ListItemIcon>
// //                             <CheckCircle sx={{ color: holiday.color, fontSize: '2.5rem' }} />
// //                           </ListItemIcon>
// //                           <ListItemText
// //                             primary={holiday.name}
// //                             secondary={holiday.date}
// //                             primaryTypographyProps={{ variant: 'body1' }}
// //                             secondaryTypographyProps={{ variant: 'body2' }}
// //                           />
// //                         </ListItem>
// //                       ))
// //                     : holidays.slice(0, 1).map((holiday, index) => (
// //                         <ListItem key={index}>
// //                           <ListItemIcon>
// //                             <CheckCircle sx={{ color: holiday.color, fontSize: '2.5rem' }} />
// //                           </ListItemIcon>
// //                           <ListItemText
// //                             primary={holiday.name}
// //                             secondary={holiday.date}
// //                             primaryTypographyProps={{ variant: 'body1' }}
// //                             secondaryTypographyProps={{ variant: 'body2' }}
// //                           />
// //                         </ListItem>
// //                       ))}
// //                 </List>
// //               </CardContent>
// //             </Card>
// //           </Grid>
// //         </Grid>
// //         <br/>
// //         <br/>

// //         <Box mt={4}>
// //           <Card>
// //             <CardContent>
// //               <Typography variant="h6" gutterBottom>
// //                 Attendance by Department
// //               </Typography>
// //               <AttendanceChart />
// //             </CardContent>
// //           </Card>
// //         </Box>
// //         <br/>
// //         <br/>
// //       </Box>
// //     </Box>
// //   );
// // };

// // export default Attendance;


// 'use client';
// import React, { useState } from 'react';
// import { Box, Card, CardContent, Typography, Grid, CircularProgress, Tooltip, List, ListItem, ListItemText, ListItemIcon, Button } from '@mui/material';
// import { CheckCircle, Warning, BeachAccess, Schedule, MoreTime, People } from '@mui/icons-material';
// import { Dialog, DialogTitle, DialogContent, Table, TableBody, TableCell, TableHead, TableRow, IconButton, TablePagination } from '@mui/material';
// import Sidebar from '../components/Sidebar'; // Ensure Sidebar is imported
// import CloseIcon from '@mui/icons-material/Close';
// import AttendanceChart from '../components/AttendanceChart'; // Import AttendanceChart
// import AttendanceTable from '../components/AttendanceTable';

// const attendanceData = [
//   { label: "Checked In", count: 4500, color: "#4caf50", icon: <CheckCircle sx={{ fontSize: '2.5rem' }} /> },
//   { label: "Not Checked In", count: 500, color: "#f44336", icon: <Warning sx={{ fontSize: '2.5rem' }} /> },
//   { label: "On Leave", count: 457, color: "#4caf50", icon: <BeachAccess sx={{ fontSize: '2.5rem' }} /> },
//   { label: "Late Comers", count: 145, color: "#9e9e9e", icon: <Schedule sx={{ fontSize: '2.5rem' }} /> },
//   { label: "Overtime", count: 12, color: "#7F00FF", icon: <MoreTime sx={{ fontSize: '2.5rem' }} /> },
//   // { label: "Checked Out", count: 250, color: "#ff9800", icon: <ExitToApp sx={{ fontSize: '2.5rem' }} /> },
// ];

// const holidays = [
//   { name: "Kite Festival", date: "Fri, Jan 14 2024", color: "#2196f3", icon: <CheckCircle /> },
//   { name: "Holi", date: "Mon, Mar 29 2024", color: "#9c27b0", icon: <CheckCircle /> },
//   { name: "Diwali", date: "Thu, Nov 04 - Nov 07 2024 (4 Days)", color: "#f44336", icon: <CheckCircle /> },
//   { name: "Christmas", date: "Fri, Dec 25 2024", color: "#ffeb3b", icon: <CheckCircle /> },
//    { name: "Sports Day", date: "Fri, Mar 29 2024", color: "#f44336", icon: <CheckCircle /> },
// ];

// type Employee = {
//   id: number;
//   name: string;
//   department: string;
//   status: string;
// };
// // Sample employee data
// const employees: Employee[] = [
//   { id: 1, name: 'John Doe', department: 'HR', status: 'On Leave' },
//   { id: 2, name: 'Jane Smith', department: 'Finance', status: 'Not Checked In' },
//   { id: 3, name: 'Jim Brown', department: 'IT', status: 'On Leave' },
//   // Add more employees as needed
// ];
// // Filter employees by status
// const getEmployeesByStatus = (status: string): Employee[] => {
//   return employees.filter(emp => emp.status === status);
// };
// // Calculate total employees
// const totalEmployees = attendanceData.reduce((total, item) => total + item.count, 0);

// // Percentage of checked-in, not checked-in, and late comers employees
// const checkedInPercentage = (attendanceData[0].count / totalEmployees) * 100;
// const notCheckedInPercentage = (attendanceData[1].count / totalEmployees) * 100;
// const lateComersPercentage = (attendanceData[3].count / totalEmployees) * 100;

// // Determine font size and circle size based on total employees count length
// const circleSize = 150; // Increased the circle size
// const fontSize = '1.5rem';

// //Rizwana' code






// const Attendance: React.FC = () => {


//   const [showAllHolidays, setShowAllHolidays] = useState(false);

//   const handleToggleHolidayList = () => {
//     setShowAllHolidays(!showAllHolidays);
//   };

//   const [openDialog, setOpenDialog] = useState<boolean>(false);
//   const [dialogTitle, setDialogTitle] = useState<string>('');
//   const [dialogData, setDialogData] = useState<Employee[]>([]);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const handleCardClick = (label: React.SetStateAction<string>) => {
//     const status = label === 'On Leave' ? 'On Leave' : 'Not Checked In';
//     const filteredEmployees = getEmployeesByStatus(status);
//     setDialogTitle(label);
//     setDialogData(filteredEmployees);
//     setOpenDialog(true);
//   };
//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//   };
//   const handleChangePage = (_event: any, newPage: React.SetStateAction<number>) => {
//     setPage(newPage);
//   };
//   const handleChangeRowsPerPage = (event: { target: { value: string; }; }) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   return (
//     <Box sx={{ display: 'flex', minHeight: '100vh', background: 'linear-gradient(to bottom, #e0f7fa, #ffffff)', padding: '20px', marginLeft: '240px', backgroundColor: 'beige' }}>
//       <Sidebar /> {/* Ensure Sidebar is included */}
//       <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//         <Grid container spacing={3}>
//           {/* Display the circular statistics chart */}
//           <Grid item xs={12} sm={6} md={4} lg={3}>
//             <Card>
//               <CardContent>
//                 <Typography variant="h6">Overview</Typography>
//                 <Tooltip title={`Checked In: ${checkedInPercentage.toFixed(2)}%, Not Checked In: ${notCheckedInPercentage.toFixed(2)}%, Late Comers: ${lateComersPercentage.toFixed(2)}%`}>
//                   <Box display="flex" justifyContent="center" alignItems="center" position="relative">
//                     <CircularProgress variant="determinate" value={100} size={circleSize} thickness={4} style={{ color: '#e0e0e0', position: 'absolute' }} />
//                     <CircularProgress variant="determinate" value={checkedInPercentage} size={circleSize} thickness={4} style={{ color: '#4caf50' }} />
//                     <CircularProgress variant="determinate" value={notCheckedInPercentage} size={circleSize} thickness={4} style={{ color: '#f44336', position: 'absolute' }} />
//                     {/* <CircularProgress variant="determinate" value={lateComersPercentage} size={circleSize} thickness={4} style={{ color: '#9e9e9e', position: 'absolute' }} /> */}
//                     <Box position="absolute" display="flex" flexDirection="column" alignItems="center">
//                       <Typography variant="h6" sx={{ fontSize }}>
//                         {totalEmployees}
//                       </Typography>
//                       <Typography variant="body2" sx={{ fontSize: '0.75rem', fontWeight: 'bold' }}>
//                         Total Employees
//                       </Typography>
//                     </Box>
//                   </Box>
//                 </Tooltip>
//               </CardContent>
//             </Card>
//           </Grid>

//           {/* Display Total Employees */}
//           <Grid item xs={12} sm={6} md={4} lg={3}>
//             <Card>
//               <CardContent>
//                 <Box sx={{ color: "#2196f3", fontSize: '2.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
//                   <People sx={{ fontSize: '2.5rem' }} />
//                 </Box>
//                 <Typography variant="h6">Total Employees</Typography>
//                 <Typography variant="h4" sx={{ color: "#2196f3" }}>
//                   {totalEmployees}
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>

//           {/* Display Checked In */}
//           <Grid item xs={12} sm={6} md={4} lg={3}>
//             <Card>
//               <CardContent>
//                 <Box sx={{ color: "#4caf50", fontSize: '2.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
//                   <CheckCircle sx={{ fontSize: '2.5rem' }} />
//                 </Box>
//                 <Typography variant="h6">Checked In</Typography>
//                 <Typography variant="h4" sx={{ color: "#4caf50" }}>
//                   {attendanceData[0].count}
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>

//           {/* Display Not Checked In */}
//           <Grid item xs={12} sm={6} md={4} lg={3}>
//             <Card>
//               <CardContent>
//                 <Box sx={{ color: "#f44336", fontSize: '2.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
//                   <Warning sx={{ fontSize: '2.5rem' }} />
//                 </Box>
//                 <Typography variant="h6">Not Checked In</Typography>
//                 <Typography variant="h4" sx={{ color: "#f44336" }}>
//                   {attendanceData[1].count}
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>

//           {/* Display other attendance data */}
//           {attendanceData.slice(2).map((item, index) => (
//             <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
//             <Card
//                 onClick={() => item.label !== 'Total Employees' && handleCardClick(item.label)}
//                 sx={{ cursor: item.label !== 'Total Employees' ? 'pointer' : 'default' }}
//               >               
//               <CardContent>
//                   <Box sx={{ color: item.color, fontSize: '2.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
//                     {item.icon}
//                   </Box>
//                   <Typography variant="h6">{item.label}</Typography>
//                   <Typography variant="h4" sx={{ color: item.color }}>
//                     {item.count}
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}

//           {/* Display Holidays */}
//           <Grid item xs={12} sm={6} md={4} lg={3}>
//             <Card>
//               <CardContent>
//                 <Typography variant="h6">Upcoming Holidays</Typography>
//                 <Button 
//                   onClick={handleToggleHolidayList} 
//                   sx={{ 
//                     marginBottom: '10px', 
//                     fontWeight: 'bold', 
//                     textTransform: 'none',
//                     '&:hover': {
//                       color: 'green',
//                       textShadow: '0 0 8px green'
//                     }
//                   }}
//                 >
//                   {showAllHolidays ? 'Hide List' : 'Show List'}
//                 </Button>
//                 <Box sx={{ maxHeight: showAllHolidays ? 200 : 'auto', overflowY: 'auto' }}>
//                   <List>
//                     {showAllHolidays
//                       ? holidays.map((holiday, index) => (
//                           <ListItem key={index}>
//                             <ListItemIcon>
//                               <CheckCircle sx={{ color: holiday.color, fontSize: '2.5rem' }} />
//                             </ListItemIcon>
//                             <ListItemText
//                               primary={holiday.name}
//                               secondary={holiday.date}
//                               primaryTypographyProps={{ variant: 'body1' }}
//                               secondaryTypographyProps={{ variant: 'body2' }}
//                             />
//                           </ListItem>
//                         ))
//                       : holidays.slice(0, 1).map((holiday, index) => (
//                           <ListItem key={index}>
//                             <ListItemIcon>
//                               <CheckCircle sx={{ color: holiday.color, fontSize: '2.5rem' }} />
//                             </ListItemIcon>
//                             <ListItemText
//                               primary={holiday.name}
//                               secondary={holiday.date}
//                               primaryTypographyProps={{ variant: 'body1' }}
//                               secondaryTypographyProps={{ variant: 'body2' }}
//                             />
//                           </ListItem>
//                         ))}
//                   </List>
//                 </Box>
//               </CardContent>
//             </Card>
//           </Grid>
//         </Grid>
//         <br/>
//         <br/>



       

//         {/* Dialog for showing employee details */}
//         <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
//           <DialogTitle>
//             {dialogTitle}
//             <IconButton
//               aria-label="close"
//               onClick={handleCloseDialog}
//               sx={{
//                 position: 'absolute',
//                 right: 8,
//                 top: 8,
//                 color: (theme) => theme.palette.grey[500],
//               }}
//             >
//               <CloseIcon />
//             </IconButton>
//           </DialogTitle>
//           <DialogContent>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#F5F5F5' }}>Employee ID</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#F5F5F5' }}>Employee Name</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#F5F5F5' }}>Department</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {dialogData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((employee:any) => (
//                   <TableRow key={employee.id}>
//                     <TableCell>{employee.id}</TableCell>
//                     <TableCell>{employee.name}</TableCell>
//                     <TableCell>{employee.department}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//             <TablePagination
//               rowsPerPageOptions={[5, 10, 25]}
//               component="div"
//               count={dialogData.length}
//               rowsPerPage={rowsPerPage}
//               page={page}
//               onPageChange={handleChangePage}
//               onRowsPerPageChange={handleChangeRowsPerPage}
//             />
//           </DialogContent>
//         </Dialog>


//       </Box>
//     </Box>
//   );
// };

// export default Attendance;







// 'use client';

// import React, { useState } from 'react';
// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   Grid,
//   CircularProgress,
//   Tooltip,
//   List,
//   ListItem,
//   ListItemText,
//   ListItemIcon,
//   Button,
// } from '@mui/material';
// import {
//   CheckCircle,
//   Warning,
//   BeachAccess,
//   People,
// } from '@mui/icons-material';
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
//   IconButton,
//   TablePagination,
// } from '@mui/material';
// import Sidebar from '../components/Sidebar'; // Ensure Sidebar is imported
// import CloseIcon from '@mui/icons-material/Close';
// import AttendanceChart from '../components/AttendanceChart'; // Import AttendanceChart
// import AttendanceTable from '../components/AttendanceTable';

// const attendanceData = [
//   {
//     label: 'Checked In',
//     count: 4500,
//     color: '#4caf50',
//     icon: <CheckCircle sx={{ fontSize: '2.5rem' }} />,
//   },
//   {
//     label: 'Not Checked In',
//     count: 500,
//     color: '#f44336',
//     icon: <Warning sx={{ fontSize: '2.5rem' }} />,
//   },
//   {
//     label: 'On Leave',
//     count: 457,
//     color: '#4caf50',
//     icon: <BeachAccess sx={{ fontSize: '2.5rem' }} />,
//   },
// ];

// const holidays = [
//   { name: 'Kite Festival', date: 'Fri, Jan 14 2024', color: '#2196f3', icon: <CheckCircle /> },
//   { name: 'Holi', date: 'Mon, Mar 29 2024', color: '#9c27b0', icon: <CheckCircle /> },
//   { name: 'Diwali', date: 'Thu, Nov 04 - Nov 07 2024 (4 Days)', color: '#f44336', icon: <CheckCircle /> },
//   { name: 'Christmas', date: 'Fri, Dec 25 2024', color: '#ffeb3b', icon: <CheckCircle /> },
//   { name: 'Sports Day', date: 'Fri, Mar 29 2024', color: '#f44336', icon: <CheckCircle /> },
// ];

// // Sample employee data
// const employees = [
//   { id: 1, name: 'John Doe', department: 'HR', status: 'On Leave' },
//   { id: 2, name: 'Jane Smith', department: 'Finance', status: 'Not Checked In' },
//   { id: 3, name: 'Jim Brown', department: 'IT', status: 'On Leave' },
//   { id: 4, name: 'Sarah Connor', department: 'Engineering', status: 'Checked In' },
//   // Add more employees as needed
// ];

// // Filter employees by status
// const getEmployeesByStatus = (status: string) => {
//   return employees.filter((emp) => emp.status === status);
// };

// // Calculate total employees
// const totalEmployees = attendanceData.reduce((total, item) => total + item.count, 0);

// // Percentage of checked-in and not checked-in employees
// const checkedInPercentage = (attendanceData[0].count / totalEmployees) * 100;
// const notCheckedInPercentage = (attendanceData[1].count / totalEmployees) * 100;

// // Determine font size and circle size based on total employees count length
// const circleSize = 150; // Increased the circle size
// const fontSize = '1.5rem';

// // Function to get formatted date
// const getCurrentFormattedDate = () => {
//   const date = new Date();
//   const day = date.getDate();
//   const month = date.toLocaleString('default', { month: 'short' }); // Get abbreviated month name
//   return Today: ${day}, ${month};
// };

// const Attendance = () => {
//   const [showAllHolidays, setShowAllHolidays] = useState(false);
//   const handleToggleHolidayList = () => {
//     setShowAllHolidays(!showAllHolidays);
//   };

//   const [openDialog, setOpenDialog] = useState(false);
//   const [dialogTitle, setDialogTitle] = useState('');
//   const [dialogData, setDialogData] = useState([]);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);

//   const handleCardClick = (label: React.SetStateAction<string>) => {
//     let filteredEmployees = [];

//     switch (label) {
//       case 'Checked In':
//         filteredEmployees = getEmployeesByStatus('Checked In');
//         break;
//       case 'Not Checked In':
//         filteredEmployees = getEmployeesByStatus('Not Checked In');
//         break;
//       case 'On Leave':
//         filteredEmployees = getEmployeesByStatus('On Leave');
//         break;
//       case 'Total Employees':
//         filteredEmployees = employees; // Show all employees
//         break;
//       default:
//         return;
//     }

//     setDialogTitle(label);
//     setDialogData(filteredEmployees);
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//   };

//   const handleChangePage = (_event: any, newPage: React.SetStateAction<number>) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event: { target: { value: string; }; }) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         minHeight: '100vh',
//         background: 'linear-gradient(to bottom, #e0f7fa, #ffffff)',
//         padding: '20px',
//         marginLeft: '240px',
//         backgroundColor: 'beige',
//       }}
//     >
//       <Sidebar /> {/* Ensure Sidebar is included */}
//       <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//         <Grid container spacing={3}>
//           {/* Display the current date above the Overview */}
//           <Grid item xs={12}>
//             <Typography variant="h6" gutterBottom>
//               {getCurrentFormattedDate()}
//             </Typography>
//           </Grid>

//           {/* Display the circular statistics chart */}
//           <Grid item xs={12} sm={6} md={4} lg={3}>
//             <Card>
//               <CardContent>
//                 <Typography variant="h6">Overview</Typography>
//                 <Tooltip
//                   title={`Checked In: ${checkedInPercentage.toFixed(
//                     2
//                   )}%, Not Checked In: ${notCheckedInPercentage.toFixed(2)}%`}
//                 >
//                   <Box
//                     display="flex"
//                     justifyContent="center"
//                     alignItems="center"
//                     position="relative"
//                   >
//                     <CircularProgress
//                       variant="determinate"
//                       value={100}
//                       size={circleSize}
//                       thickness={4}
//                       style={{ color: '#e0e0e0', position: 'absolute' }}
//                     />
//                     <CircularProgress
//                       variant="determinate"
//                       value={checkedInPercentage}
//                       size={circleSize}
//                       thickness={4}
//                       style={{ color: '#4caf50' }}
//                     />
//                     <CircularProgress
//                       variant="determinate"
//                       value={notCheckedInPercentage}
//                       size={circleSize}
//                       thickness={4}
//                       style={{ color: '#f44336', position: 'absolute' }}
//                     />
//                     <Box
//                       position="absolute"
//                       display="flex"
//                       flexDirection="column"
//                       alignItems="center"
//                     >
//                       <Typography variant="h6" sx={{ fontSize }}>
//                         {totalEmployees}
//                       </Typography>
//                       <Typography
//                         variant="body2"
//                         sx={{ fontSize: '0.75rem', fontWeight: 'bold' }}
//                       >
//                         Total Employees
//                       </Typography>
//                     </Box>
//                   </Box>
//                 </Tooltip>
//               </CardContent>
//             </Card>
//           </Grid>

//           {/* Display Total Employees */}
//           <Grid item xs={12} sm={6} md={4} lg={3}>
//             <Card
//               onClick={() => handleCardClick('Total Employees')}
//               sx={{ cursor: 'pointer' }}
//             >
//               <CardContent>
//                 <Box
//                   sx={{
//                     color: '#2196f3',
//                     fontSize: '2.5rem',
//                     display: 'flex',
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     marginBottom: '10px',
//                   }}
//                 >
//                   <People sx={{ fontSize: '2.5rem' }} />
//                 </Box>
//                 <Typography variant="h6">Total Employees</Typography>
//                 <Typography variant="h4" sx={{ color: '#2196f3' }}>
//                   {totalEmployees}
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>

//           {/* Display Checked In */}
//           <Grid item xs={12} sm={6} md={4} lg={3}>
//             <Card
//               onClick={() => handleCardClick('Checked In')}
//               sx={{ cursor: 'pointer' }}
//             >
//               <CardContent>
//                 <Box
//                   sx={{
//                     color: '#4caf50',
//                     fontSize: '2.5rem',
//                     display: 'flex',
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     marginBottom: '10px',
//                   }}
//                 >
//                   <CheckCircle sx={{ fontSize: '2.5rem' }} />
//                 </Box>
//                 <Typography variant="h6">Checked In</Typography>
//                 <Typography variant="h4" sx={{ color: '#4caf50' }}>
//                   {attendanceData[0].count}
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>

//           {/* Display Not Checked In */}
//           <Grid item xs={12} sm={6} md={4} lg={3}>
//             <Card
//               onClick={() => handleCardClick('Not Checked In')}
//               sx={{ cursor: 'pointer' }}
//             >
//               <CardContent>
//                 <Box
//                   sx={{
//                     color: '#f44336',
//                     fontSize: '2.5rem',
//                     display: 'flex',
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     marginBottom: '10px',
//                   }}
//                 >
//                   <Warning sx={{ fontSize: '2.5rem' }} />
//                 </Box>
//                 <Typography variant="h6">Not Checked In</Typography>
//                 <Typography variant="h4" sx={{ color: '#f44336' }}>
//                   {attendanceData[1].count}
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>

//           {/* Display On Leave */}
//           <Grid item xs={12} sm={6} md={4} lg={3}>
//             <Card
//               onClick={() => handleCardClick('On Leave')}
//               sx={{ cursor: 'pointer' }}
//             >
//               <CardContent>
//                 <Box
//                   sx={{
//                     color: '#ffeb3b',
//                     fontSize: '2.5rem',
//                     display: 'flex',
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     marginBottom: '10px',
//                   }}
//                 >
//                   <BeachAccess sx={{ fontSize: '2.5rem' }} />
//                 </Box>
//                 <Typography variant="h6">On Leave</Typography>
//                 <Typography variant="h4" sx={{ color: '#ffeb3b' }}>
//                   {attendanceData[2].count}
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>

//           {/* Display Holidays */}
//           <Grid item xs={12} sm={6} md={4} lg={3}>
//             <Card>
//               <CardContent>
//                 <Typography variant="h6">Upcoming Holidays</Typography>
//                 <Button
//                   onClick={handleToggleHolidayList}
//                   sx={{
//                     marginBottom: '10px',
//                     fontWeight: 'bold',
//                     textTransform: 'none',
//                     '&:hover': {
//                       color: 'green',
//                       textShadow: '0 0 8px green',
//                     },
//                   }}
//                 >
//                   {showAllHolidays ? 'Hide List' : 'Show List'}
//                 </Button>
//                 <Box
//                   sx={{ maxHeight: showAllHolidays ? 200 : 'auto', overflowY: 'auto' }}
//                 >
//                   <List>
//                     {showAllHolidays
//                       ? holidays.map((holiday, index) => (
//                           <ListItem key={index}>
//                             <ListItemIcon>
//                               <CheckCircle
//                                 sx={{ color: holiday.color, fontSize: '2.5rem' }}
//                               />
//                             </ListItemIcon>
//                             <ListItemText
//                               primary={holiday.name}
//                               secondary={holiday.date}
//                               primaryTypographyProps={{ variant: 'body1' }}
//                               secondaryTypographyProps={{ variant: 'body2' }}
//                             />
//                           </ListItem>
//                         ))
//                       : holidays.slice(0, 1).map((holiday, index) => (
//                           <ListItem key={index}>
//                             <ListItemIcon>
//                               <CheckCircle
//                                 sx={{ color: holiday.color, fontSize: '2.5rem' }}
//                               />
//                             </ListItemIcon>
//                             <ListItemText
//                               primary={holiday.name}
//                               secondary={holiday.date}
//                               primaryTypographyProps={{ variant: 'body1' }}
//                               secondaryTypographyProps={{ variant: 'body2' }}
//                             />
//                           </ListItem>
//                         ))}
//                   </List>
//                 </Box>
//               </CardContent>
//             </Card>
//           </Grid>
//         </Grid>

//         <Box mt={4}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6" gutterBottom>
//                 Attendance by Department
//               </Typography>
//               <AttendanceChart />
//             </CardContent>
//           </Card>
//         </Box>

        
// <br/>
// <br/>

// <Box mt={4}>
// <Card>
//   <CardContent>

//     <AttendanceTable/>
//   </CardContent>
// </Card>
// </Box>
// <br/>
// <br/>
// <br/>
// <br/>
// <br/>
// <br/>

//         {/* Dialog for showing employee details */}
//         <Dialog
//           open={openDialog}
//           onClose={handleCloseDialog}
//           maxWidth="md"
//           fullWidth
//         >
//           <DialogTitle>
//             {dialogTitle}
//             <IconButton
//               aria-label="close"
//               onClick={handleCloseDialog}
//               sx={{
//                 position: 'absolute',
//                 right: 8,
//                 top: 8,
//                 color: (theme) => theme.palette.grey[500],
//               }}
//             >
//               <CloseIcon />
//             </IconButton>
//           </DialogTitle>
//           <DialogContent>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell
//                     sx={{ fontWeight: 'bold', backgroundColor: '#F5F5F5' }}
//                   >
//                     Employee ID
//                   </TableCell>
//                   <TableCell
//                     sx={{ fontWeight: 'bold', backgroundColor: '#F5F5F5' }}
//                   >
//                     Employee Name
//                   </TableCell>
//                   <TableCell
//                     sx={{ fontWeight: 'bold', backgroundColor: '#F5F5F5' }}
//                   >
//                     Department
//                   </TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {dialogData
//                   .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                   .map((employee) => (
//                     <TableRow key={employee.id}>
//                       <TableCell>{employee.id}</TableCell>
//                       <TableCell>{employee.name}</TableCell>
//                       <TableCell>{employee.department}</TableCell>
//                     </TableRow>
//                   ))}
//               </TableBody>
//             </Table>
//             <TablePagination
//               rowsPerPageOptions={[5, 10, 25]}
//               component="div"
//               count={dialogData.length}
//               rowsPerPage={rowsPerPage}
//               page={page}
//               onPageChange={handleChangePage}
//               onRowsPerPageChange={handleChangeRowsPerPage}
//             />
//           </DialogContent>
//         </Dialog>
//       </Box>
//     </Box>
//   );
// };

// export default Attendance;




// 'use client';

// import React, { useState } from 'react';
// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   Grid,
//   CircularProgress,
//   Tooltip,
//   List,
//   ListItem,
//   ListItemText,
//   ListItemIcon,
//   Button,
// } from '@mui/material';
// import {
//   CheckCircle,
//   Warning,
//   BeachAccess,
//   People,
//   Close as CloseIcon,
// } from '@mui/icons-material';
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
//   IconButton,
//   TablePagination,
// } from '@mui/material';
// import {Bar} from 'recharts';
// import Sidebar from '../components/Sidebar'; // Ensure Sidebar is imported
// import AttendanceChart from '../components/AttendanceChart'; // Import AttendanceChart
// import AttendanceTable from '../components/AttendanceTable';

// // Sample attendance data
// const attendanceData = [
//   {
//     label: 'Checked In',
//     count: 4500,
//     color: '#4caf50',
//     icon: <CheckCircle sx={{ fontSize: '2.5rem' }} />,
//   },
//   {
//     label: 'Not Checked In',
//     count: 500,
//     color: '#f44336',
//     icon: <Warning sx={{ fontSize: '2.5rem' }} />,
//   },
//   {
//     label: 'On Leave',
//     count: 457,
//     color: '#ffeb3b',
//     icon: <BeachAccess sx={{ fontSize: '2.5rem' }} />,
//   },
// ];

// // Sample holidays data
// const holidays = [
//   { name: 'Kite Festival', date: 'Fri, Jan 14 2024', color: '#2196f3', icon: <CheckCircle /> },
//   { name: 'Holi', date: 'Mon, Mar 29 2024', color: '#9c27b0', icon: <CheckCircle /> },
//   { name: 'Diwali', date: 'Thu, Nov 04 - Nov 07 2024 (4 Days)', color: '#f44336', icon: <CheckCircle /> },
//   { name: 'Christmas', date: 'Fri, Dec 25 2024', color: '#ffeb3b', icon: <CheckCircle /> },
//   { name: 'Sports Day', date: 'Fri, Mar 29 2024', color: '#f44336', icon: <CheckCircle /> },
// ];

// // Sample employee data
// const employees = [
//   { id: 1, name: 'John Doe', department: 'HR', status: 'On Leave' },
//   { id: 2, name: 'Jane Smith', department: 'Finance', status: 'Not Checked In' },
//   { id: 3, name: 'Jim Brown', department: 'IT', status: 'On Leave' },
//   { id: 4, name: 'Sarah Connor', department: 'Engineering', status: 'Checked In' },
//   // Add more employees as needed
// ];

// // Filter employees by status
// const getEmployeesByStatus = (status) => {
//   return employees.filter((emp) => emp.status === status);
// };

// // Calculate total employees
// const totalEmployees = attendanceData.reduce((total, item) => total + item.count, 0);

// // Percentage of checked-in and not checked-in employees
// const checkedInPercentage = (attendanceData[0].count / totalEmployees) * 100;
// const notCheckedInPercentage = (attendanceData[1].count / totalEmployees) * 100;

// // Determine font size and circle size based on total employees count length
// const circleSize = 150; // Increased the circle size
// const fontSize = '1.5rem';

// // Function to get formatted date
// const getCurrentFormattedDate = () => {
//   const date = new Date();
//   const day = date.getDate();
//   const month = date.toLocaleString('default', { month: 'short' }); // Get abbreviated month name
//   return  `Today:  ${day} ${month} ` ;
// };

// const Attendance = () => {
//   const [showAllHolidays, setShowAllHolidays] = useState(false);
//   const handleToggleHolidayList = () => {
//     setShowAllHolidays(!showAllHolidays);
//   };

//   const [openDialog, setOpenDialog] = useState(false);
//   const [dialogTitle, setDialogTitle] = useState('');
//   const [dialogData, setDialogData] = useState([]);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);

//   const handleCardClick = (label) => {
//     let filteredEmployees = [];

//     switch (label) {
//       case 'Checked In':
//         filteredEmployees = getEmployeesByStatus('Checked In');
//         break;
//       case 'Not Checked In':
//         filteredEmployees = getEmployeesByStatus('Not Checked In');
//         break;
//       case 'On Leave':
//         filteredEmployees = getEmployeesByStatus('On Leave');
//         break;
//       case 'Total Employees':
//         filteredEmployees = employees; // Show all employees
//         break;
//       default:
//         return;
//     }

//     setDialogTitle(label);
//     setDialogData(filteredEmployees);
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//   };

//   const handleChangePage = (_event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         minHeight: '100vh',
//         background: 'linear-gradient(to bottom, #e0f7fa, #ffffff)',
//         padding: '20px',
//         marginLeft: '240px',
//         backgroundColor: 'beige',
//       }}
//     >
//       <Sidebar /> {/* Ensure Sidebar is included */}
//       <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//         <Grid container spacing={3}>
//           {/* Display the current date above the Overview */}
//           <Grid item xs={12}>
//             <Typography variant="h6" gutterBottom>
//               {getCurrentFormattedDate()}
//             </Typography>
//           </Grid>

//           {/* Display the circular statistics chart */}
//           <Grid item xs={12} sm={6} md={4} lg={3}>
//             <Card>
//               <CardContent>
//                 <Typography variant="h6">Overview</Typography>
//                 <Tooltip
//                   title={`Checked In: ${checkedInPercentage.toFixed(
//                     2
//                   )}%, Not Checked In: ${notCheckedInPercentage.toFixed(2)}%`}
//                 >
//                   <Box
//                     display="flex"
//                     justifyContent="center"
//                     alignItems="center"
//                     position="relative"
//                   >
//                     <CircularProgress
//                       variant="determinate"
//                       value={100}
//                       size={circleSize}
//                       thickness={4}
//                       style={{ color: '#e0e0e0', position: 'absolute' }}
//                     />
//                     <CircularProgress
//                       variant="determinate"
//                       value={checkedInPercentage}
//                       size={circleSize}
//                       thickness={4}
//                       style={{ color: '#4caf50' }}
//                     />
//                     <CircularProgress
//                       variant="determinate"
//                       value={notCheckedInPercentage}
//                       size={circleSize}
//                       thickness={4}
//                       style={{ color: '#f44336', position: 'absolute' }}
//                     />
//                     <Box
//                       position="absolute"
//                       display="flex"
//                       flexDirection="column"
//                       alignItems="center"
//                     >
//                       <Typography variant="h6" sx={{ fontSize }}>
//                         {totalEmployees}
//                       </Typography>
//                       <Typography
//                         variant="body2"
//                         sx={{ fontSize: '0.75rem', fontWeight: 'bold' }}
//                       >
//                         Total Employees
//                       </Typography>
//                     </Box>
//                   </Box>
                  
//                 </Tooltip>
//               </CardContent>
//             </Card>
//           </Grid>

//           {/* Display Total Employees */}
//           <Grid item xs={12} sm={6} md={4} lg={3}>
//             <Card
//               onClick={() => handleCardClick('Total Employees')}
//               sx={{ cursor: 'pointer' }}
//             >
//               <CardContent>
//                 <Box
//                   sx={{
//                     color: '#2196f3',
//                     fontSize: '2.5rem',
//                     display: 'flex',
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     marginBottom: '10px',
//                   }}
//                 >
//                   <People sx={{ fontSize: '2.5rem' }} />
//                 </Box>
//                 <Typography variant="h6">Total Employees</Typography>
//                 <Typography variant="h4" sx={{ color: '#2196f3' }}>
//                   {totalEmployees}
//                 </Typography>
//               </CardContent>
              
//             </Card>
//           </Grid>

//           {/* Display Checked In */}
//           <Grid item xs={12} sm={6} md={4} lg={3}>
//             <Card
//               onClick={() => handleCardClick('Checked In')}
//               sx={{ cursor: 'pointer' }}
//             >
//               <CardContent>
//                 <Box
//                   sx={{
//                     color: '#4caf50',
//                     fontSize: '2.5rem',
//                     display: 'flex',
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     marginBottom: '10px',
//                   }}
//                 >
//                   <CheckCircle sx={{ fontSize: '2.5rem' }} />
//                 </Box>
//                 <Typography variant="h6">Checked In</Typography>
//                 <Typography variant="h4" sx={{ color: '#4caf50' }}>
//                   {attendanceData[0].count}
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>

//           {/* Display Not Checked In */}
//           <Grid item xs={12} sm={6} md={4} lg={3}>
//             <Card
//               onClick={() => handleCardClick('Not Checked In')}
//               sx={{ cursor: 'pointer' }}
//             >
//               <CardContent>
//                 <Box
//                   sx={{
//                     color: '#f44336',
//                     fontSize: '2.5rem',
//                     display: 'flex',
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     marginBottom: '10px',
//                   }}
//                 >
//                   <Warning sx={{ fontSize: '2.5rem' }} />
//                 </Box>
//                 <Typography variant="h6">Not Checked In</Typography>
//                 <Typography variant="h4" sx={{ color: '#f44336' }}>
//                   {attendanceData[1].count}
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>

//           {/* Display On Leave */}
//           <Grid item xs={12} sm={6} md={4} lg={3}>
//             <Card
//               onClick={() => handleCardClick('On Leave')}
//               sx={{ cursor: 'pointer' }}
//             >
//               <CardContent>
//                 <Box
//                   sx={{
//                     color: '#ffeb3b',
//                     fontSize: '2.5rem',
//                     display: 'flex',
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     marginBottom: '10px',
//                   }}
//                 >
//                   <BeachAccess sx={{ fontSize: '2.5rem' }} />
//                 </Box>
//                 <Typography variant="h6">On Leave</Typography>
//                 <Typography variant="h4" sx={{ color: '#ffeb3b' }}>
//                   {attendanceData[2].count}
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>

//           {/* Display Holidays */}
//           <Grid item xs={12} sm={6} md={4} lg={3}>
//             <Card>
//               <CardContent>
//                 <Typography variant="h6">Upcoming Holidays</Typography>
//                 <Button
//                   onClick={handleToggleHolidayList}
//                   sx={{
//                     marginBottom: '10px',
//                     fontWeight: 'bold',
//                     textTransform: 'none',
//                     '&:hover': {
//                       color: 'green',
//                       textShadow: '0 0 8px green',
//                     },
//                   }}
//                 >
//                   {showAllHolidays ? 'Hide List' : 'Show List'}
//                 </Button>
//                 <Box
//                   sx={{ maxHeight: showAllHolidays ? 200 : 'auto', overflowY: 'auto' }}
//                 >
//                   <List>
//                     {showAllHolidays
//                       ? holidays.map((holiday, index) => (
//                           <ListItem key={index}>
//                             <ListItemIcon>
//                               <CheckCircle
//                                 sx={{ color: holiday.color, fontSize: '2.5rem' }}
//                               />
//                             </ListItemIcon>
//                             <ListItemText
//                               primary={holiday.name}
//                               secondary={holiday.date}
//                               primaryTypographyProps={{ variant: 'body1' }}
//                               secondaryTypographyProps={{ variant: 'body2' }}
//                             />
//                           </ListItem>
//                         ))
//                       : holidays.slice(0, 1).map((holiday, index) => (
//                           <ListItem key={index}>
//                             <ListItemIcon>
//                               <CheckCircle
//                                 sx={{ color: holiday.color, fontSize: '2.5rem' }}
//                               />
//                             </ListItemIcon>
//                             <ListItemText
//                               primary={holiday.name}
//                               secondary={holiday.date}
//                               primaryTypographyProps={{ variant: 'body1' }}
//                               secondaryTypographyProps={{ variant: 'body2' }}
//                             />
//                           </ListItem>
//                         ))}
//                   </List>
//                 </Box>
//               </CardContent>
//             </Card>
//           </Grid>
//         </Grid>

//         <Box mt={4}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6" gutterBottom>
//                 Attendance by Department
//               </Typography>
//               <AttendanceChart />
//             </CardContent>
//           </Card>
//         </Box>

//         <br/>
// <br/>

// <Box mt={4}>
// <Card>
//   <CardContent>

//     <AttendanceTable />
//   </CardContent>
// </Card>
// </Box>
// <br/>
// <br/>
// <br/>
// <br/>
// <br/>
// <br/>

//         {/* Dialog for showing employee details */}
//         <Dialog
//           open={openDialog}
//           onClose={handleCloseDialog}
//           maxWidth="md"
//           fullWidth
//         >
//           <DialogTitle>
//             {dialogTitle}
//             <IconButton
//               aria-label="close"
//               onClick={handleCloseDialog}
//               sx={{
//                 position: 'absolute',
//                 right: 8,
//                 top: 8,
//                 color: (theme) => theme.palette.grey[500],
//               }}
//             >
//               <CloseIcon />
//             </IconButton>
//           </DialogTitle>
//           <DialogContent>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell
//                     sx={{ fontWeight: 'bold', backgroundColor: '#F5F5F5' }}
//                   >
//                     Employee ID
//                   </TableCell>
//                   <TableCell
//                     sx={{ fontWeight: 'bold', backgroundColor: '#F5F5F5' }}
//                   >
//                     Employee Name
//                   </TableCell>
//                   <TableCell
//                     sx={{ fontWeight: 'bold', backgroundColor: '#F5F5F5' }}
//                   >
//                     Department
//                   </TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {dialogData
//                   .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                   .map((employee) => (
//                     <TableRow key={employee.id}>
//                       <TableCell>{employee.id}</TableCell>
//                       <TableCell>{employee.name}</TableCell>
//                       <TableCell>{employee.department}</TableCell>
//                     </TableRow>
//                   ))}
//               </TableBody>
//             </Table>
//             <TablePagination
//               rowsPerPageOptions={[5, 10, 25]}
//               component="div"
//               count={dialogData.length}
//               rowsPerPage={rowsPerPage}
//               page={page}
//               onPageChange={handleChangePage}
//               onRowsPerPageChange={handleChangeRowsPerPage}
//             />
//           </DialogContent>
//         </Dialog>
//       </Box>
//     </Box>
//   );
// };

// export default Attendance;


'use client';

import React, { useState,useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
  Tooltip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
} from '@mui/material';
import {
  CheckCircle,
  Warning,
  BeachAccess,
  People,
  Close as CloseIcon,
} from '@mui/icons-material';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  TablePagination,
} from '@mui/material';
import {Bar} from 'recharts';
import Sidebar from '../components/Sidebar'; // Ensure Sidebar is imported
import AttendanceChart from '../components/AttendanceChart'; // Import AttendanceChart
import AttendanceTable from '../components/AttendanceTable';
//import AttendanceTable from '../components/AttendanceTable';

// Sample attendance data
const attendanceData = [
  {
    label: 'Checked In',
    count: 4500,
    color: '#4caf50',
    icon: <CheckCircle sx={{ fontSize: '2.5rem' }} />,
  },
  {
    label: 'Not Checked In',
    count: 500,
    color: '#f44336',
    icon: <Warning sx={{ fontSize: '2.5rem' }} />,
  },
  {
    label: 'On Leave',
    count: 457,
    color: '#ffeb3b',
    icon: <BeachAccess sx={{ fontSize: '2.5rem' }} />,
  },
];

// Sample holidays data
const holidays = [
  { name: 'Kite Festival', date: 'Fri, Jan 14 2024', color: '#2196f3', icon: <CheckCircle /> },
  { name: 'Holi', date: 'Mon, Mar 29 2024', color: '#9c27b0', icon: <CheckCircle /> },
  { name: 'Diwali', date: 'Thu, Nov 04 - Nov 07 2024 (4 Days)', color: '#f44336', icon: <CheckCircle /> },
  { name: 'Christmas', date: 'Fri, Dec 25 2024', color: '#ffeb3b', icon: <CheckCircle /> },
  { name: 'Sports Day', date: 'Fri, Mar 29 2024', color: '#f44336', icon: <CheckCircle /> },
];

// Sample employee data
const employees = [
  { id: 1, name: 'John Doe', department: 'HR', status: 'On Leave' },
  { id: 2, name: 'Jane Smith', department: 'Finance', status: 'Not Checked In' },
  { id: 3, name: 'Jim Brown', department: 'IT', status: 'On Leave' },
  { id: 4, name: 'Sarah Connor', department: 'Engineering', status: 'Checked In' },
  // Add more employees as needed
];

// Filter employees by status
const getEmployeesByStatus = (status) => {
  return employees.filter((emp) => emp.status === status);
};

// Calculate total employees
const totalEmployees = attendanceData.reduce((total, item) => total + item.count, 0);

// Percentage of checked-in and not checked-in employees
const checkedInPercentage = (attendanceData[0].count / totalEmployees) * 100;
const notCheckedInPercentage = (attendanceData[1].count / totalEmployees) * 100;

// Determine font size and circle size based on total employees count length
const circleSize = 150; // Increased the circle size
const fontSize = '1.5rem';

// Function to get formatted date
const getCurrentFormattedDate = () => {
  const date = new Date();
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'short' }); // Get abbreviated month name
  return  `Today:  ${day} ${month} ` ;
};

const Attendance = () => {
    const [showAllHolidays, setShowAllHolidays] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogTitle, setDialogTitle] = useState('');
    const [dialogData, setDialogData] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
  
    const [isClient, setIsClient] = useState(false);
  
    // Enable client-side rendering
    useEffect(() => {
      setIsClient(true);
    }, []);
  
    const handleCardClick = (label) => {
      let filteredEmployees = [];
  
      switch (label) {
        case 'Checked In':
          filteredEmployees = getEmployeesByStatus('Checked In');
          break;
        case 'Not Checked In':
          filteredEmployees = getEmployeesByStatus('Not Checked In');
          break;
        case 'On Leave':
          filteredEmployees = getEmployeesByStatus('On Leave');
          break;
        case 'Total Employees':
          filteredEmployees = employees;
          break;
        default:
          return;
      }
  
      setDialogTitle(label);
      setDialogData(filteredEmployees);
      setOpenDialog(true);
    };
  
    const handleCloseDialog = () => {
      setOpenDialog(false);
    };
  
    const handleChangePage = (_event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
  
    const handleToggleHolidayList = () => {
      setShowAllHolidays(!showAllHolidays);
    };
  
    // Calculate total employees
    const totalEmployees = attendanceData.reduce((total, item) => total + item.count, 0);
  
    // Percentage of checked-in and not checked-in employees
    const checkedInPercentage = (attendanceData[0].count / totalEmployees) * 100;
    const notCheckedInPercentage = (attendanceData[1].count / totalEmployees) * 100;
  
    // Determine circle size and font size
    const circleSize = 150;
    const fontSize = '1.5rem';
  
    // Function to get formatted date
    const getCurrentFormattedDate = () => {
      const date = new Date();
      const day = date.getDate();
      const month = date.toLocaleString('default', { month: 'short' }); // Get abbreviated month name
      return `Today: ${day} ${month}`;
    };
  
    if (!isClient) return null; // Prevent server-side rendering mismatch
  
    return (
      <Box
        sx={{
          display: 'flex',
          minHeight: '100vh',
          background: 'linear-gradient(to bottom, #e0f7fa, #ffffff)',
          padding: '20px',
          marginLeft: '240px',
          backgroundColor: 'beige',
        }}
      >
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                {getCurrentFormattedDate()}
              </Typography>
            </Grid>
  
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Overview</Typography>
                  <Tooltip
                    title={`Checked In: ${checkedInPercentage.toFixed(
                      2
                    )}%, Not Checked In: ${notCheckedInPercentage.toFixed(2)}%`}
                  >
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      position="relative"
                    >
                      <CircularProgress
                        variant="determinate"
                        value={100}
                        size={circleSize}
                        thickness={4}
                        style={{ color: '#e0e0e0', position: 'absolute' }}
                      />
                      <CircularProgress
                        variant="determinate"
                        value={checkedInPercentage}
                        size={circleSize}
                        thickness={4}
                        style={{ color: '#4caf50' }}
                      />
                      <CircularProgress
                        variant="determinate"
                        value={notCheckedInPercentage}
                        size={circleSize}
                        thickness={4}
                        style={{ color: '#f44336', position: 'absolute' }}
                      />
                      <Box
                        position="absolute"
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                      >
                        <Typography variant="h6" sx={{ fontSize }}>
                          {totalEmployees}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ fontSize: '0.75rem', fontWeight: 'bold' }}
                        >
                          Total Employees
                        </Typography>
                      </Box>
                    </Box>
                  </Tooltip>
                </CardContent>
              </Card>
            </Grid>
             {/* Display Total Employees */}
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card
              onClick={() => handleCardClick('Total Employees')}
              sx={{ cursor: 'pointer' }}
            >
              <CardContent>
                <Box
                  sx={{
                    color: '#2196f3',
                    fontSize: '2.5rem',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: '10px',
                  }}
                >
                  <People sx={{ fontSize: '2.5rem' }} />
                </Box>
                <Typography variant="h6">Total Employees</Typography>
                <Typography variant="h4" sx={{ color: '#2196f3' }}>
                  {totalEmployees}
                </Typography>
              </CardContent>
              
            </Card>
          </Grid>

          {/* Display Checked In */}
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card
              onClick={() => handleCardClick('Checked In')}
              sx={{ cursor: 'pointer' }}
            >
              <CardContent>
                <Box
                  sx={{
                    color: '#4caf50',
                    fontSize: '2.5rem',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: '10px',
                  }}
                >
                  <CheckCircle sx={{ fontSize: '2.5rem' }} />
                </Box>
                <Typography variant="h6">Checked In</Typography>
                <Typography variant="h4" sx={{ color: '#4caf50' }}>
                  {attendanceData[0].count}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Display Not Checked In */}
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card
              onClick={() => handleCardClick('Not Checked In')}
              sx={{ cursor: 'pointer' }}
            >
              <CardContent>
                <Box
                  sx={{
                    color: '#f44336',
                    fontSize: '2.5rem',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: '10px',
                  }}
                >
                  <Warning sx={{ fontSize: '2.5rem' }} />
                </Box>
                <Typography variant="h6">Not Checked In</Typography>
                <Typography variant="h4" sx={{ color: '#f44336' }}>
                  {attendanceData[1].count}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Display On Leave */}
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card
              onClick={() => handleCardClick('On Leave')}
              sx={{ cursor: 'pointer' }}
            >
              <CardContent>
                <Box
                  sx={{
                    color: '#ffeb3b',
                    fontSize: '2.5rem',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: '10px',
                  }}
                >
                  <BeachAccess sx={{ fontSize: '2.5rem' }} />
                </Box>
                <Typography variant="h6">On Leave</Typography>
                <Typography variant="h4" sx={{ color: '#ffeb3b' }}>
                  {attendanceData[2].count}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Display Holidays */}
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Upcoming Holidays</Typography>
                <Button
                  onClick={handleToggleHolidayList}
                  sx={{
                    marginBottom: '10px',
                    fontWeight: 'bold',
                    textTransform: 'none',
                    '&:hover': {
                      color: 'green',
                      textShadow: '0 0 8px green',
                    },
                  }}
                >
                  {showAllHolidays ? 'Hide List' : 'Show List'}
                </Button>
                <Box
                  sx={{ maxHeight: showAllHolidays ? 200 : 'auto', overflowY: 'auto' }}
                >
                  <List>
                    {showAllHolidays
                      ? holidays.map((holiday, index) => (
                          <ListItem key={index}>
                            <ListItemIcon>
                              <CheckCircle
                                sx={{ color: holiday.color, fontSize: '2.5rem' }}
                              />
                            </ListItemIcon>
                            <ListItemText
                              primary={holiday.name}
                              secondary={holiday.date}
                              primaryTypographyProps={{ variant: 'body1' }}
                              secondaryTypographyProps={{ variant: 'body2' }}
                            />
                          </ListItem>
                        ))
                      : holidays.slice(0, 1).map((holiday, index) => (
                          <ListItem key={index}>
                            <ListItemIcon>
                              <CheckCircle
                                sx={{ color: holiday.color, fontSize: '2.5rem' }}
                              />
                            </ListItemIcon>
                            <ListItemText
                              primary={holiday.name}
                              secondary={holiday.date}
                              primaryTypographyProps={{ variant: 'body1' }}
                              secondaryTypographyProps={{ variant: 'body2' }}
                            />
                          </ListItem>
                        ))}
                  </List>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box mt={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Attendance by Department
              </Typography>
              <AttendanceChart />
            </CardContent>
          </Card>
        </Box>

        <br/>
<br/>

<Box mt={4}>
<Card>
  <CardContent>

    <AttendanceTable />
  </CardContent>
</Card>
</Box>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

        {/* Dialog for showing employee details */}
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            {dialogTitle}
            <IconButton
              aria-label="close"
              onClick={handleCloseDialog}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{ fontWeight: 'bold', backgroundColor: '#F5F5F5' }}
                  >
                    Employee ID
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: 'bold', backgroundColor: '#F5F5F5' }}
                  >
                    Employee Name
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: 'bold', backgroundColor: '#F5F5F5' }}
                  >
                    Department
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dialogData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell>{employee.id}</TableCell>
                      <TableCell>{employee.name}</TableCell>
                      <TableCell>{employee.department}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={dialogData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </DialogContent>
        </Dialog>
      </Box>
    </Box>
  );
};

export default Attendance;

