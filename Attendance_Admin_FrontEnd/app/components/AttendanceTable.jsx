'use client';
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Select,
  MenuItem,
  TextField,
  TablePagination,
  Modal,
  IconButton,
  Menu,
  MenuItem as MenuOption,
  SelectChangeEvent,
  Card,
  FilledTextFieldProps,
  OutlinedTextFieldProps,
  StandardTextFieldProps,
  TextFieldVariants,
  FormControl,
  InputLabel
} from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import { LocalizationProvider, DateCalendar, StaticDatePicker, PickersDay, PickersDayProps  } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import saveAs from 'file-saver';
import * as XLSX from 'xlsx';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CloseIcon from '@mui/icons-material/Close';
import isBetween from 'dayjs/plugin/isBetween';
import axios from 'axios';
dayjs.extend(isBetween);

import durationPlugin from 'dayjs/plugin/duration';

dayjs.extend(durationPlugin);
  

const AttendanceTable = () => {
      

  // const [department, setDepartment] = useState('');
  const [shift, setShift] = useState('');
  const [employeeList, setEmployeeList] = useState([]);
  const [filteredData, setFilteredData] = useState(employeeList);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [weeks, setWeeks] = useState([]);
 
  const [selectedWeek, setSelectedWeek] = useState(null);
  
  const [selectedDate, setSelectedDate] = useState(dayjs().startOf('month').toDate());
const [selectedDay, setSelectedDay] = useState(dayjs().date());
const [filteredEmployeess, setFilteredEmployeess] = useState(employeeList);
const [selectedFilteredEmployees, setSelectedFilteredEmployees] = useState(employeeList.attendanceDetails);
const [department, setDepartment] = useState('');
const [selectedDepartment, setSelectedDepartment] = useState('');

const [selectedYear, setSelectedYear] = useState(dayjs().year());
const [selectedMonth, setSelectedMonth] = useState(dayjs().month() + 1); // dayjs months are 0-indexed
  const [daysInMonth, setDaysInMonth] = useState(dayjs().date());

  const [day, setDay] = useState(dayjs().date());
  const [year, setYear] = useState(dayjs().year());
  const [month, setMonth] = useState(dayjs().month() + 1);

  const [selectedStatus, setSelectedStatus] = useState('All');

  const [id, setId] = useState(null);
  const [loading, setLoading] = useState(false);

  


  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const formattedDate = dayjs().year(selectedYear).month(selectedMonth - 1).date(selectedDay).format('YYYY-MM-DD');
        const response = await fetch(`http://localhost:9099/api/timerecords/all/employee-data/date/${formattedDate}`);
        const data = await response.json();
  
        // Transform the data to fit your table structure
        const transformedData = data.map(record => ({
          id: record.employeeId,
          date: record.date,
          name: record.employeeName,
          department: record.department,
          // loginTime: record.clockInTime.split('.')[0],  // Remove milliseconds
          // logoutTime: record.clockOutTime ? record.clockOutTime.split('.')[0] : 'N/A',  // Remove milliseconds
          loginTime: formatTime(record.clockInTime.split('.')[0]),  // Format time (hours and minutes)
          logoutTime: record.clockOutTime ? formatTime(record.clockOutTime.split('.')[0]) : 'N/A',  // Format time (hours and minutes)
          // breakTime: formatTime(record.breakTime || "00:00"),  // Format break time
          // totalLoginHours: formatTime(record.duration || "00:00"),  // Format total working hours
          // totalLoginHours: calculateLoginHours(record.clockInTime, record.clockOutTime),
        // loginTime: formatTimeInHoursAndMinutes(record.clockInTime.split('.')[0]),  // Format time (hours and minutes)
        // logoutTime: record.clockOutTime ? formatTimeInHoursAndMinutes(record.clockOutTime.split('.')[0]) : 'N/A',  // Format time (hours and minutes)
        // breakTime: formatDuration(record.breakTime || 0),  // Format break time (hours and minutes)
        // totalWorkingHours: formatDuration(record.duration || 0),  // Format total working hours (hours and minutes)
        // totalLoginHours: calculateLoginHours(record.clockInTime, record.clockOutTime),

        breakTime: extractHoursAndMinutes(record.breakTime || "0 hours 0 minutes"),  // Format break time (hours and minutes)
        totalLoginHours: extractHoursAndMinutes(record.duration || "0 hours 0 minutes"),  // Format total working hours (hours and minutes)
          status: determineStatus(record)
        }));
  
       
        setEmployeeList(transformedData); 
        setFilteredEmployeess(transformedData);
        console.log("Filtered employees:", filteredEmployeess);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };
  
    const initialWeeks = generateWeeks(selectedYear, selectedMonth);
    setWeeks(initialWeeks);
    if (initialWeeks.length > 0) {
      setSelectedWeek(initialWeeks[0]);
    }
  
    setDaysInMonth(dayjs(`${selectedYear}-${selectedMonth}`).daysInMonth());
  
    // Fetch data from the API
    fetchEmployeeData();
  
    // Perform the search
    // handleSearch();

    // Set up polling to fetch and update data every 2 seconds
  const intervalId = setInterval(() => {
    fetchEmployeeData();
  }, 5000); // 5000 ms = 5 seconds

  // Cleanup interval on component unmount
  return () => clearInterval(intervalId);
  
  }, [ selectedYear, selectedMonth, selectedDay, selectedStatus]);
  

  useEffect(() => {
    handleSearch();
  }, [search, selectedDepartment, employeeList]);

  useEffect(() => {
    console.log("Filtered employees after search:", filteredEmployeess);
  }, [filteredEmployeess]);

  const calculateLoginHours = (clockInTime, clockOutTime) => {
    if (!clockInTime || !clockOutTime) return "00:00";
    
    const startTime = new Date(`1970-01-01T${clockInTime.split('.')[0]}`);
    const endTime = new Date(`1970-01-01T${clockOutTime.split('.')[0]}`);
    
    const diffMs = endTime - startTime;
    
    const hours = Math.floor(diffMs / (1000 * 60 * 60)).toString().padStart(2, '0');
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
    const seconds = Math.floor((diffMs % (1000 * 60)) / 1000).toString().padStart(2, '0');
    
    return `${hours}:${minutes}`;
  };

  // Convert seconds to hours and minutes format (e.g., 1 hours 30 minutes)
const formatDuration = (totalSeconds) => {
  if (isNaN(totalSeconds)) return "00 hours 00 minutes";  // Fallback in case of NaN
  
  const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
  const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
  
  return `${hours} : ${minutes} `;
};

// Calculate total login hours without seconds
// const calculateLoginHours = (clockInTime, clockOutTime) => {
//   if (!clockInTime || !clockOutTime) return "00 hours 00 minutes";
  
//   // const startTime = new Date(`1970-01-01T${clockInTime.split('.')[0]}`);
//   // const endTime = new Date(`1970-01-01T${clockOutTime.split('.')[0]}`);
  
//   // const diffMs = endTime - startTime;
//   // const totalSeconds = diffMs / 1000;
  
//   // return formatDuration(totalSeconds);  // Return formatted duration in "hours minutes"
//   try {
//     const startTime = new Date(`1970-01-01T${clockInTime.split('.')[0]}`);
//     const endTime = new Date(`1970-01-01T${clockOutTime.split('.')[0]}`);
    
//     const diffMs = endTime - startTime;
//     const totalSeconds = diffMs / 1000;
    
//     if (isNaN(totalSeconds)) return "00 hours 00 minutes";  // Handle invalid differences
    
//     return formatDuration(totalSeconds);  // Return formatted duration in "hours minutes"
//   } catch (error) {
//     console.error("Error calculating login hours:", error);
//     return "00 hours 00 minutes";  // Fallback for errors
//   }
// };





  // const formatTime = (timeString) => {
  //   const [hours, minutes, seconds] = timeString.match(/(\d+)/g).map(unit => unit.padStart(2, '0'));
  //   return `${hours}:${minutes}:${seconds}`;
  // };

  // const formatTimeInHoursAndMinutes = (time) => {
  //   // const [hours, minutes] = time.split(':');  // Extract only hours and minutes
  //   // return `${hours} : ${minutes} `;

  //   if (!time) return "00:00";
  // const [hours, minutes] = time.split(':');
  
  // if (!hours || !minutes || isNaN(hours) || isNaN(minutes)) {
  //   return "00:00";  // Fallback in case of invalid data
  // }
  
  // return `${hours}:${minutes}`;  // Return hours and minutes only
  // };

  const formatTime = (time) => {
    if (!time) return "00:00";
    
    const [hours, minutes] = time.split(':');  // Extract hours and minutes only
    return `${hours}h ${minutes}m`;
  };

  const extractHoursAndMinutes = (timeString) => {
    const hoursMatch = timeString.match(/(\d+)\s*hours?/);
    const minutesMatch = timeString.match(/(\d+)\s*minutes?/);
    
    const hours = hoursMatch ? hoursMatch[1].padStart(2, '0') : '00';
    const minutes = minutesMatch ? minutesMatch[1].padStart(2, '0') : '00';
    
    return `${hours}h ${minutes}m`;
  };

  
  const determineStatus = (record) => {
    if (record.clockInTime || !record.clockOutTime) return 'Present';
    if (!record.clockInTime && !record.clockOutTime) return 'Absent';
    return 'Unknown';
  };
  


  // Selected Employee Records


  // useEffect(() => {
  //   if (modalOpen) {
  //     handleRowClick(year, month);
  //   }
  // }, [modalOpen, year, month]);
  

//   const fetchEmployeeData = async ( year, month) => {
//     const response = await fetch(`http://localhost:9099/api/timerecords/employees/1`);
//     const data = await response.json();
//     console.log('Fetched employee data:', data);

//     // Filter and format the records here after data is fetched
//     const filteredRecords = filterRecordsByDate(data.timeRecords, year, month);
//     // const formattedRecords = filteredRecords.map(record => ({
//     //     ...record,
//     //     clockInTime: record.clockInTime.split('.')[0], // Remove milliseconds
//     //     clockOutTime: record.clockOutTime ? record.clockOutTime.split('.')[0] : 'N/A', // Remove milliseconds
//     //     totalLoginHours: calculateLoginHours(record.clockInTime, record.clockOutTime)
//     // }));
    
//     const formattedRecords = formatRecords(filteredRecords);

//     setSelectedEmployee({
//       ...data,
//       timeRecords: formattedRecords,
//     });
// };

// const convertDurationToHHMMSS = (isoDuration) => {
//   const duration = dayjs.duration(isoDuration);
//   const hours = Math.floor(duration.asHours()).toString().padStart(2, '0');
//   const minutes = duration.minutes().toString().padStart(2, '0');
//   const seconds = duration.seconds().toString().padStart(2, '0');
  
//   return `${hours}:${minutes}:${seconds}`;
// };



// const filterRecordsByDate = (timeRecords, year, month) => {
//   if (!timeRecords) return [];

//   // const startOfMonth = dayjs().year(year).month(month - 1).startOf('month');
//   // const endOfMonth = dayjs().year(year).month(month - 1).endOf('month');

//   const startOfMonth = dayjs(`${year}-${String(month).padStart(2, '0')}-01`).startOf('month');
//   const endOfMonth = dayjs(`${year}-${String(month).padStart(2, '0')}-01`).endOf('month');

//   //  return timeRecords.filter(record => {
//   //     const recordDate = dayjs(record.date);
//   //     return recordDate.isBetween(startOfMonth, endOfMonth, null, '[]');
//   // });

//   return timeRecords.filter(record => {
//     const recordDate = dayjs(record.date);
//     console.log("Record date:", recordDate.format("YYYY-MM-DD"));

//     // Filter records where the record date falls within the selected month and year
//     return recordDate.isSame(startOfMonth, 'month');
//   });
// };


// const formatRecords = (records) => {

//   if (!Array.isArray(records)) {
//     console.error("Expected an array but got:", records);
//     return [];
//   }
//   return records.map(record => ({
//     ...record,
//     clockInTime: record.clockInTime.split('.')[0], // Remove milliseconds
//     clockOutTime: record.clockOutTime ? record.clockOutTime.split('.')[0] : 'N/A', // Remove milliseconds
//     totalLoginHours: calculateLoginHours(record.clockInTime, record.clockOutTime),
//     breakTime: convertDurationToHHMMSS(record.breakTime),
//   }));
// };


 // Selected Employee Records ends
  

  const generateWeeks = (year, month) => {
    const weeksInMonth = [];
    
    // Find the first Monday of the month
    let startDate = dayjs(new Date(year, month - 1, 1));
    const firstMonday = startDate.startOf('month').day() === 0 
      ? startDate.startOf('month').subtract(6, 'day')
      : startDate.startOf('month').startOf('week').add(1, 'day');
  
    // If the first Monday is in the previous month, adjust it
    if (firstMonday.month() !== month - 1) {
      startDate = firstMonday;
    } else {
      startDate = firstMonday;
    }
  
    // Define the end of the month
    const endDate = dayjs(new Date(year, month, 0));
    
    while (startDate.isBefore(endDate)) {
      const weekStart = startDate;
      const weekEnd = startDate.add(6, 'day').isBefore(endDate) ? startDate.add(6, 'day') : endDate;
  
      weeksInMonth.push(`${weekStart.format('DD MMM')} - ${weekEnd.format('DD MMM')}`);
      
      // Move to the next week
      startDate = startDate.add(7, 'day');
    }
  
    return weeksInMonth;
  };
  const handleDepartmentChange = (event) => {
    console.log('Selected Department:', event.target.value);
    setSelectedDepartment(event.target.value);
  };

  const handleShiftChange = (event) => {
    setShift(event.target.value);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
    
  };

  // handleSelectedYearChange

  const handleSelectedYearChange = (event) => {
    setYear(event.target.value);
    
  };
 
  const handleMonthChange = (event) => {
    const month = event.target.value;
    setSelectedMonth(month);
  
  };

  // handleSelectedMonthChange

  const handleSelectedMonthChange = (event) => {
    const month = event.target.value;
    setMonth(month);
  
  };

 
  const handleDayChange = (event) => {
    setSelectedDay(event.target.value);
  };
  const handleWeekChange = (event) => {
    setSelectedWeek(event.target.value);
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  

  const handleSearch = () => {
    const selectedDate = dayjs().year(selectedYear).month(selectedMonth - 1).date(selectedDay);

    // Filter based on the selected date
    const filteredByDate = employeeList.filter(employee =>
      dayjs(employee.date).isSame(selectedDate, 'day')
    );

    // Further filter based on departmentv
    const filteredByDepartment = selectedDepartment
      ? filteredByDate.filter(employee => employee.department === selectedDepartment)
      : filteredByDate;

    // Further filter based on search term
    const filteredBySearch = filteredByDepartment.filter(employee =>
      employee.name.toLowerCase().includes(search.toLowerCase())
    );

  // Further filter based on status
  // const filteredByStatus = selectedStatus === 'All'
  // ? filteredBySearch
  // : filteredBySearch.filter(employee => employee.status === selectedStatus);

  console.log('Filtered By Department:', filteredByDepartment);
  console.log('Filtered By Search:', filteredBySearch);

setFilteredEmployeess(filteredBySearch);
    //setFilteredEmployeess(filtered);
  };



  
  const handleSearchChange = (event) => {
    console.log('Search Input:', event.target.value); // Debugging line
    setSearch(event.target.value);
  };
  
  
  
  const getCount = (status) => {
    return filteredData.filter((item) => item.status === status).length;
  };


  const handleChangePage = (_event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // const handleRowClick = (employee) => {
  //   setSelectedEmployee(employee);
  //   setModalOpen(true);
  // };

//   const handleRowClick = async (employee) => {
//     setModalOpen(true);
    
//     // Fetch employee attendance details by ID
//     try {
//         const response = await axios.get(`http://localhost:9099/api/timerecords/employees/${employee.id}`);
//         setSelectedEmployee(response.data);  // Store the fetched employee data
//     } catch (error) {
//         console.error('Error fetching employee data:', error);
//     }
// };

  // const handleClose = () => {
  //   setModalOpen(false);
  // };


  useEffect(() => {
    if (selectedEmployee) {
      fetchEmployeeData(selectedEmployee.id);
    }
  }, [selectedEmployee]);

  const fetchEmployeeData = async (employeeId) => {
    try {
      const response = await axios.get(
        `http://localhost:9099/api/timerecords/employees/${employeeId}`
      );
      setSelectedEmployee(response.data); // Store the fetched employee data
    } catch (error) {
      console.error('Error fetching employee data:', error);
    }
  };

  // Filter records by year and month
  const getFilteredTimeRecords = () => {
    if (selectedEmployee && selectedEmployee.timeRecords) {
      return selectedEmployee.timeRecords.filter((record) => {
        const recordDate = dayjs(record.date);
        return (
          recordDate.year() === year && recordDate.month() + 1 === month
        );
      });
    }
    return [];
  };

  const filteredRecords = getFilteredTimeRecords(); // Use the filtered records

  // const formatTimeEmployee = (time) => {
  //   return dayjs(time, "HH:mm:ss.SSS").format("HH:mm"); // Format to hr:min
  // };

  const formatTimeEmployee = (time) => {
    if (!time) return "00:00";
    
    const [hours, minutes] = time.split(':');  // Extract hours and minutes only
    return `${hours}h ${minutes}m`;
  };

  const formatTotalTime = (timeString) => {
    const timeParts = timeString.match(/(\d+)\s*hours?\s*(\d+)?\s*minutes?/);
    if (timeParts) {
      const hours = timeParts[1] || '0';
      const minutes = timeParts[2] || '0';
      return `${hours}h ${minutes}m`;
    }
    return timeString; // Return the original if the format doesn't match
  };




  const handleDownload = () => {
    if (filteredRecords) {
      const ws = XLSX.utils.json_to_sheet(filteredRecords);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Attendance');
      const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
      const buf = new ArrayBuffer(wbout.length);
      const view = new Uint8Array(buf);
      for (let i = 0; i < wbout.length; i++) view[i] = wbout.charCodeAt(i) & 0xff;
      saveAs(new Blob([buf], { type: 'application/octet-stream' }), 'attendance.xlsx');
    }
  };



  // const handleRowClick = (employee) => {
  //   setModalOpen(true);
  //   setSelectedEmployee(employee);
  // };

  // const handleRowClick = (employee) => {
  //   if (modalOpen) {
  //     // Close the modal if it's already open, then open it again for the new employee
  //     setModalOpen(false);
  //     setTimeout(() => {
  //       setSelectedEmployee(employee);
  //       setModalOpen(true);
  //     }, 300); // Brief delay before reopening
  //   } else {
  //     // If the modal is not open, simply open it with the new employee
  //     setSelectedEmployee(employee);
  //     setModalOpen(true);
  //   }
  // };
  

  const handleRowClick = async (employee) => {
    setLoading(true); // Start loading
    setModalOpen(false); // Close modal
  
    // Fetch data or set selected employee after a small delay
    setTimeout(() => {
      setSelectedEmployee(employee);
      setLoading(false); // End loading
      setModalOpen(true); // Reopen modal
    }, 300); // Optional delay
  };

  const handleClose = () => {
    setModalOpen(false);
   setSelectedEmployee(null);  // Clear selected employee when modal is closed
};

 const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  
  

  const handleDownloadEmployees = () => {
    if (filteredEmployeess) {
      const ws = XLSX.utils.json_to_sheet(filteredEmployeess);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Attendance');
      const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
      const buf = new ArrayBuffer(wbout.length);
      const view = new Uint8Array(buf);
      for (let i = 0; i < wbout.length; i++) view[i] = wbout.charCodeAt(i) & 0xff;
      saveAs(new Blob([buf], { type: 'application/octet-stream' }), 'attendance.xlsx');
    }
  };

  
  return (
<>

      <Box sx={{ margin: 1,  padding: 3, borderRadius: 2}}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
          <Typography variant="h5" component="div" sx={{ color: '#3f51b5', fontSize: '1.5rem' }}>
            Employees Daily Attendance
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Select value={selectedDepartment} onChange={handleDepartmentChange} displayEmpty sx={{ marginRight: 2, fontSize: '1.0rem', width: '180px' }}>
              <MenuItem value="">All Departments</MenuItem>
              <MenuItem value="HR">HR</MenuItem>
              <MenuItem value="IT">IT</MenuItem>
              
              {/* Add other department options */}
            </Select>
            <Select value={selectedYear} onChange={handleYearChange} sx={{ marginRight: 2, fontSize: '1.0rem' }}>
              {Array.from({ length: 5 }, (_, i) => (
                <MenuItem key={i} value={dayjs().year() - i}>
                  {dayjs().year() - i}
                </MenuItem>
              ))}
            </Select>
            <Select value={selectedMonth} onChange={handleMonthChange} sx={{ marginRight: 2, fontSize: '1.0rem' }}>
              {Array.from({ length: 12 }, (_, i) => (
                <MenuItem key={i} value={i + 1}>
                  {dayjs(new Date().setMonth(i)).format('MMMM')}
                </MenuItem>
              ))}
            </Select>

            <Select value={selectedDay || ''} onChange={handleDayChange} sx={{ marginRight: 2 }}>
                   {Array.from({ length: daysInMonth }, (_, i) => (
                    <MenuItem key={i} value={i + 1}>
                      {i + 1}
                    </MenuItem>
                  ))}
                </Select>

                <IconButton onClick={handleMenuOpen}>
                  <MoreVert />
                 </IconButton>
                <Menu anchorEl={anchorEl}
                 open={Boolean(anchorEl)}
                   onClose={handleMenuClose}
                >
                 <MenuOption onClick={handleDownloadEmployees}>Download Report</MenuOption>
                </Menu>
          
         
          </Box>
          
        </Box>
        <TextField
          value={search}
          onChange={handleSearchChange}
          placeholder="Search Employee"
          variant="outlined"
          size="small"
          sx={{ marginBottom: 2, width: '30%' }}
        />

     
       
        <TableContainer component={Paper}>
          <Table aria-label="employee attendance table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ backgroundColor: '#3f51b5', color: '#fff', fontSize: '1rem' }}>Date</TableCell>
                <TableCell sx={{ backgroundColor: '#3f51b5', color: '#fff', fontSize: '1rem' }}>Employee Id</TableCell>
                <TableCell sx={{ backgroundColor: '#3f51b5', color: '#fff', fontSize: '1rem' }}>Employee Name</TableCell>
                <TableCell sx={{ backgroundColor: '#3f51b5', color: '#fff', fontSize: '1rem' }}>Department</TableCell>
                <TableCell sx={{ backgroundColor: '#3f51b5', color: '#fff', fontSize: '1rem' }}>ClockIn</TableCell>
                <TableCell sx={{ backgroundColor: '#3f51b5', color: '#fff', fontSize: '1rem' }}>ClockOut</TableCell>
                <TableCell sx={{ backgroundColor: '#3f51b5', color: '#fff', fontSize: '1rem' }}>Break Time</TableCell>
                <TableCell sx={{ backgroundColor: '#3f51b5', color: '#fff', fontSize: '1rem' }}>Total Login Hours</TableCell>
                {/* <TableCell sx={{ backgroundColor: '#3f51b5', color: '#fff', fontSize: '1rem' }}>Total Working Hours</TableCell> */}
                {/* <TableCell sx={{ backgroundColor: '#3f51b5', color: '#fff', fontSize: '1rem' }}>Status
                <Select
                value={selectedStatus}
                onChange={handleStatusChange}
                displayEmpty
                sx={{ marginLeft: 1, fontSize: '0.9rem', backgroundColor: '#fff', color: '#000', padding: '0.1px 4px', 
                  lineHeight: 1.5 }}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Present">Present</MenuItem>
                <MenuItem value="Absent">Absent</MenuItem>
                <MenuItem value="Leave">Leave</MenuItem>
              </Select>


                </TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
            {filteredEmployeess.length === 0 ? (
    <TableRow>
      <TableCell colSpan={10} style={{ textAlign: 'center', fontStyle: 'ariel' }}>
        No attendance records available
      </TableCell>
    </TableRow>
  ) : (
              filteredEmployeess.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((employee) => (
                <TableRow key={employee.id}
                style={
                  employee.status === 'Holiday' ? { backgroundColor: '#f0e68c', textAlign: 'center' } :
                  {}
                }
                >
                  <TableCell>{employee.date}</TableCell>
                  {employee.status === 'Holiday' ? (
                <TableCell colSpan={9} style={{ textAlign: 'center' }}>Holiday</TableCell>
              ) : (
                <>
                  <TableCell>{employee.id}</TableCell>
                  <TableCell
                  sx={{ cursor: 'pointer', color: '#1e90ff' }}
                  onClick={() => handleRowClick(employee)}
                  >{employee.name}</TableCell>
                  <TableCell>{employee.department}</TableCell>
                  <TableCell>{employee.loginTime}</TableCell>
                  <TableCell>{employee.logoutTime}</TableCell>
                  <TableCell>{employee.breakTime}</TableCell>
                  <TableCell>{employee.totalLoginHours}</TableCell>
                  {/* <TableCell>{employee.totalLoginHours}</TableCell> */}
                  {/* <TableCell style={
                      employee.status === 'Present' ? { color: 'green' } :
                      employee.status === 'Absent' ? { color: 'red' } :
                      {}
                    } sx={{fontWeight: 'bold'}}>{employee.status}</TableCell> */}
                </>
              )}
                </TableRow>
            ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredEmployeess.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
      
     
<Modal
      open={modalOpen}
      onClose={(event, reason) => {
        if (reason !== 'backdropClick') {
          handleClose();
        }
      }}
      id={id}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          padding: 4,
          backgroundColor: 'white',
          margin: 'auto',
          marginTop: '2%',
          width: '80%',
          borderRadius: 2,
          boxShadow: 24,
          overflowY: 'auto',
          maxHeight: '80vh',
          p: 4,
          bgcolor: 'background.paper',
        }}
      >
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 160,
            top: 30,
            color: (theme) => theme.palette.grey[15],
          }}
        >
          <CloseIcon />
        </IconButton>

        {selectedEmployee && (
          <>
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 4,
                position: 'sticky',
                top: 0,
                backgroundColor: 'white',
                zIndex: 1,
                paddingBottom: '10px',
                paddingTop: '10px',
                borderBottom: '1px solid #ddd',
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  marginBottom: 2,
                  color: '#3f51b5',
                  fontSize: '1.5rem',
                }}
              >
                {selectedEmployee.name}'s Attendance Details
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                <Select
                  value={year}
                  onChange={handleSelectedYearChange}
                  sx={{ marginRight: 2, fontSize: '1.0rem' }}
                >
                  {Array.from({ length: 5 }, (_, i) => (
                    <MenuItem key={i} value={dayjs().year() - i}>
                      {dayjs().year() - i}
                    </MenuItem>
                  ))}
                </Select>
                <Select
                  value={month}
                  onChange={handleSelectedMonthChange}
                  sx={{ marginRight: 2, fontSize: '1.0rem' }}
                >
                  {Array.from({ length: 12 }, (_, i) => (
                    <MenuItem key={i} value={i + 1}>
                      {dayjs(new Date().setMonth(i)).format('MMMM')}
                    </MenuItem>
                  ))}
                </Select>

                {/* <Button
                  variant="contained"
                  sx={{ backgroundColor: '#3f51b5', color: '#fff', marginLeft: 2, fontSize: '0.8rem' }}
                >
                  Search
                </Button> */}
                <IconButton onClick={handleMenuOpen}>
                  <MoreVert />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={handleDownload}>Download Report</MenuItem>
                </Menu>
              </Box>
            </Box>
           
{loading ? (
  <Typography>Loading...</Typography>
) : (
            <TableContainer component={Paper}>
              <Table aria-label="attendance details table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', fontSize: '1rem' }}>
                      Date
                    </TableCell>
                    <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', fontSize: '1rem' }}>
                      Login Time
                    </TableCell>
                    <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', fontSize: '1rem' }}>
                      Logout Time
                    </TableCell>
                    <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', fontSize: '1rem' }}>
                      Break Time
                    </TableCell>
                    {/* <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', fontSize: '1rem' }}>
                      Total Working Hours
                    </TableCell> */}
                    <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', fontSize: '1rem' }}>
                      Total Login Hours
                    </TableCell>
                    {/* <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', fontSize: '1rem' }}>
                      Status
                    </TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
  {/* {selectedEmployee && selectedEmployee.timeRecords && selectedEmployee.timeRecords.length > 0 ? ( */}
    {/* // selectedEmployee.timeRecords.map((detail, index) => ( */}

      {filteredRecords.length > 0 ? (
        // filteredRecords.map((record, index) => (
          filteredRecords.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((record, index) => (
      <TableRow key={index}>
        <TableCell>{record.date}</TableCell>
        <TableCell>{formatTimeEmployee(record.clockInTime)}</TableCell>
      <TableCell>{formatTimeEmployee(record.clockOutTime)}</TableCell>
      <TableCell>{formatTotalTime(record.totalBreakTime)}</TableCell> {/* Break Time */}
      <TableCell>{formatTotalTime(record.totalDuration)}</TableCell> {/* Total Login Hours */}
        {/* <TableCell>{record.clockInTime}</TableCell>
        <TableCell>{record.clockOutTime}</TableCell>
        <TableCell>{record.totalBreakTime}</TableCell>
        <TableCell>{record.totalDuration}</TableCell> */}
        {/* <TableCell style={
          detail.status === 'Present' ? { color: 'green' } :
            detail.status === 'Absent' ? { color: 'red' } :
              {}
        } sx={{ fontWeight: 'bold' }}>{detail.status}</TableCell> */}
      </TableRow>
    ))
  ) : (
    <TableRow>
      <TableCell colSpan={6} align="center">
        No attendance records available.
      </TableCell>
    </TableRow>
  )}
</TableBody>
              </Table>
            </TableContainer>
            )}
            {/* <TablePagination
  rowsPerPageOptions={[5, 10, 25]}
  component="div"
  count={selectedEmployee && selectedEmployee.timeRecords ? selectedEmployee.timeRecords.length : 0}
  rowsPerPage={rowsPerPage}
  page={page}
  onPageChange={handleChangePage}
  onRowsPerPageChange={handleChangeRowsPerPage}
/> */}

<TablePagination
  rowsPerPageOptions={[5, 10, 25]}
  component="div"
  count={filteredRecords.length} // Use the length of the filtered records
  rowsPerPage={rowsPerPage}
  page={page}
  onPageChange={handleChangePage}
  onRowsPerPageChange={handleChangeRowsPerPage}
/>

            {/* <Box sx={{ marginTop: 4 }}> */}
              {/* <Typography variant="h6" sx={{ color: '#3f51b5', fontSize: '1.2rem' }}>Monthly Attendance Status</Typography> */}

              {/* <Box sx={{ display: 'flow', alignItems: 'center', marginTop: 2 }}>
                <Typography variant="body1" sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
                  Total Days Present:
                  <Typography component="span" variant="body2" style={{ fontSize: '1rem', color: 'green', fontWeight: 'bold', marginLeft: 2 }}>
                    {selectedEmployee.timeRecords.filter(detail => detail.status === 'Present').length}
                  </Typography>
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
                  Total Days Absent:
                  <Typography component="span" variant="body2" style={{ fontSize: '1rem', color: 'red', fontWeight: 'bold' }}>
                    {selectedEmployee.timeRecords.filter(detail => detail.status === 'Absent').length}
                  </Typography>
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
                  Total Days Leave:
                  <Typography component="span" variant="body2" style={{ fontSize: '1rem', color: 'orange', fontWeight: 'bold' }}>
                    {selectedEmployee.timeRecords.filter(detail => detail.status === 'Leave').length}
                  </Typography>
                </Typography>
              </Box> */}
            {/* </Box> */}
          </>
        )}
      </Box>
    </Modal>




      </> 
  );
};

export default AttendanceTable;
