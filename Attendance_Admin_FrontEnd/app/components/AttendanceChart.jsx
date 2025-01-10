'use client';
import React, { useState, useMemo } from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';

// Sample data
const data = [
  { name: '1-Mon', CheckedIn: 65, NotCheckedIn: 30, month: 'Mar', year: '2024', department: 'Finance' },
  { name: '1-Mon', CheckedIn: 15, NotCheckedIn: 30, month: 'Mar', year: '2024', department: 'IT' },
  { name: '1-Mon', CheckedIn: 65, NotCheckedIn: 30, month: 'Mar', year: '2024', department: 'Sales' },
  { name: '2-Tue', CheckedIn: 78, NotCheckedIn: 23, month: 'Mar', year: '2024', department: 'IT' },
   { name: '2-Tue', CheckedIn: 78, NotCheckedIn: 23, month: 'Mar', year: '2024', department: 'Finance' },
   { name: '2-Tue', CheckedIn: 78, NotCheckedIn: 23, month: 'Mar', year: '2024', department: 'Sales' },
   { name: '3-Wed', CheckedIn: 89, NotCheckedIn: 15, month: 'Mar', year: '2024', department: 'Finance' },
   { name: '3-Wed', CheckedIn: 89, NotCheckedIn: 15, month: 'Mar', year: '2024', department: 'IT' },
   { name: '3-Wed', CheckedIn: 89, NotCheckedIn: 15, month: 'Mar', year: '2024', department: 'Sales' },
   { name: '4-Thu', CheckedIn: 96, NotCheckedIn: 12, month: 'Mar', year: '2024', department: 'Finance' },
   { name: '4-Thu', CheckedIn: 96, NotCheckedIn: 12, month: 'Mar', year: '2024', department: 'IT' },
    { name: '4-Thu', CheckedIn: 96, NotCheckedIn: 12, month: 'Mar', year: '2024', department: 'Sales' },
   { name: '5-Fri', CheckedIn: 88, NotCheckedIn: 25, month: 'Mar', year: '2024', department: 'Finance' },
   { name: '5-Fri', CheckedIn: 88, NotCheckedIn: 25, month: 'Mar', year: '2024', department: 'Sales' },
   { name: '5-Fri', CheckedIn: 88, NotCheckedIn: 25, month: 'Mar', year: '2024', department: 'IT' },
   { name: '6-Sat', CheckedIn: 15, Weekend: 70, month: 'Mar', year: '2024', department: 'Finance' },
   { name: '6-Sat', CheckedIn: 15, Weekend: 70, month: 'Mar', year: '2024', department: 'IT' },
   { name: '6-Sat', CheckedIn: 15, Weekend: 70, month: 'Mar', year: '2024', department: 'Sales' },
   { name: '7-Sun', Weekend: 100, month: 'Mar', year: '2024', department: 'Finance' },
   { name: '7-Sun', Weekend: 100, month: 'Mar', year: '2024', department: 'IT' },
   { name: '7-Sun', Weekend: 100, month: 'Mar', year: '2024', department: 'Sales' },
   { name: '8-Mon', CheckedIn: 92, NotCheckedIn: 18, month: 'Mar', year: '2024', department: 'Finance' },
   { name: '8-Mon', CheckedIn: 92, NotCheckedIn: 18, month: 'Mar', year: '2024', department: 'IT' },
   { name: '8-Mon', CheckedIn: 92, NotCheckedIn: 18, month: 'Mar', year: '2024', department: 'Sales' },
   { name: '9-Tue', CheckedIn: 85, NotCheckedIn: 20, month: 'Mar', year: '2024', department: 'Finance' },
   { name: '9-Tue', CheckedIn: 85, NotCheckedIn: 20, month: 'Mar', year: '2024', department: 'Sales' },
   { name: '9-Tue', CheckedIn: 85, NotCheckedIn: 20, month: 'Mar', year: '2024', department: 'IT' },
   { name: '10-Wed', CheckedIn: 95, NotCheckedIn: 10, month: 'Mar', year: '2024', department: 'Finance' },
   { name: '10-Wed', CheckedIn: 95, NotCheckedIn: 10, month: 'Mar', year: '2024', department: 'IT' },
   { name: '10-Wed', CheckedIn: 95, NotCheckedIn: 10, month: 'Mar', year: '2024', department: 'Sales' },
   { name: '11-Thu', CheckedIn: 89, NotCheckedIn: 15, month: 'Mar', year: '2024', department: 'IT' },
   { name: '11-Thu', CheckedIn: 89, NotCheckedIn: 15, month: 'Mar', year: '2024', department: 'Sales' },
   { name: '11-Thu', CheckedIn: 89, NotCheckedIn: 15, month: 'Mar', year: '2024', department: 'Finance' },
   { name: '12-Fri', CheckedIn: 78, NotCheckedIn: 23, month: 'Mar', year: '2024', department: 'Sales' },
   { name: '12-Fri', CheckedIn: 78, NotCheckedIn: 23, month: 'Mar', year: '2024', department: 'IT' },
   { name: '12-Fri', CheckedIn: 78, NotCheckedIn: 23, month: 'Mar', year: '2024', department: 'Finance' },
   { name: '13-Sat', CheckedIn: 15, Weekend: 70, month: 'Mar', year: '2024', department: 'Finance' },
   { name: '13-Sat', CheckedIn: 15, Weekend: 70, month: 'Mar', year: '2024', department: 'IT' },
   { name: '13-Sat', CheckedIn: 15, Weekend: 70, month: 'Mar', year: '2024', department: 'Sales' },
   { name: '14-Sun', Weekend: 89, month: 'Mar', year: '2024', department: 'IT' },
   { name: '14-Sun', Weekend: 89, month: 'Mar', year: '2024', department: 'Sales' },
   { name: '14-Sun', Weekend: 89, month: 'Mar', year: '2024', department: 'Finance' },
   { name: '15-Mon', CheckedIn: 92, NotCheckedIn: 18, month: 'Mar', year: '2024', department: 'Sales' },
   { name: '15-Mon', CheckedIn: 92, NotCheckedIn: 18, month: 'Mar', year: '2024', department: 'Finance' },
   { name: '15-Mon', CheckedIn: 92, NotCheckedIn: 18, month: 'Mar', year: '2024', department: 'IT' },
   { name: '16-Tue', CheckedIn: 85, NotCheckedIn: 20, month: 'Mar', year: '2024', department: 'Finance' },
   { name: '16-Tue', CheckedIn: 85, NotCheckedIn: 20, month: 'Mar', year: '2024', department: 'IT' },
   { name: '16-Tue', CheckedIn: 85, NotCheckedIn: 20, month: 'Mar', year: '2024', department: 'Sales' },
   { name: '17-Wed', CheckedIn: 95, NotCheckedIn: 10, month: 'Mar', year: '2024', department: 'IT' },
   { name: '17-Wed', CheckedIn: 95, NotCheckedIn: 10, month: 'Mar', year: '2024', department: 'Sales' },
   { name: '17-Wed', CheckedIn: 95, NotCheckedIn: 10, month: 'Mar', year: '2024', department: 'Finance' },
   { name: '18-Thu', CheckedIn: 89, NotCheckedIn: 15, month: 'Mar', year: '2024', department: 'Sales' },
   { name: '18-Thu', CheckedIn: 89, NotCheckedIn: 15, month: 'Mar', year: '2024', department: 'Finance' },
   { name: '18-Thu', CheckedIn: 89, NotCheckedIn: 15, month: 'Mar', year: '2024', department: 'IT' },
   { name: '19-Fri', CheckedIn: 78, NotCheckedIn: 23, month: 'Mar', year: '2024', department: 'Finance' },
   { name: '19-Fri', CheckedIn: 78, NotCheckedIn: 23, month: 'Mar', year: '2024', department: 'IT' },
   { name: '19-Fri', CheckedIn: 78, NotCheckedIn: 23, month: 'Mar', year: '2024', department: 'Sales' },
   { name: '20-Sat', CheckedIn: 12, Weekend: 80, month: 'Mar', year: '2024', department: 'IT' },
   { name: '20-Sat', CheckedIn: 12, Weekend: 80, month: 'Mar', year: '2024', department: 'Sales' },
   { name: '20-Sat', CheckedIn: 12, Weekend: 80, month: 'Mar', year: '2024', department: 'Finance' },
   { name: '21-Sun', Weekend: 92, month: 'Mar', year: '2024', department: 'Sales' },
   { name: '21-Sun', Weekend: 92, month: 'Mar', year: '2024', department: 'Finance' },
   { name: '21-Sun', Weekend: 92, month: 'Mar', year: '2024', department: 'IT' },
   { name: '22-Mon', CheckedIn: 92, NotCheckedIn: 18, month: 'Mar', year: '2024', department: 'Sales' },
   { name: '22-Mon', CheckedIn: 92, NotCheckedIn: 18, month: 'Mar', year: '2024', department: 'Finance' },
   { name: '22-Mon', CheckedIn: 92, NotCheckedIn: 18, month: 'Mar', year: '2024', department: 'IT' },
   { name: '23-Tue', CheckedIn: 85, NotCheckedIn: 20, month: 'Mar', year: '2024', department: 'Finance' },
   { name: '23-Tue', CheckedIn: 85, NotCheckedIn: 20, month: 'Mar', year: '2024', department: 'IT' },
   { name: '23-Tue', CheckedIn: 85, NotCheckedIn: 20, month: 'Mar', year: '2024', department: 'Sales' },
   { name: '24-Wed', CheckedIn: 95, NotCheckedIn: 10, month: 'Mar', year: '2024', department: 'IT' },
   { name: '24-Wed', CheckedIn: 95, NotCheckedIn: 10, month: 'Mar', year: '2024', department: 'Sales' },
   { name: '24-Wed', CheckedIn: 95, NotCheckedIn: 10, month: 'Mar', year: '2024', department: 'Finance' },
   { name: '25-Thu', CheckedIn: 89, NotCheckedIn: 15, month: 'Mar', year: '2024', department: 'Sales' },
   { name: '25-Thu', CheckedIn: 89, NotCheckedIn: 15, month: 'Mar', year: '2024', department: 'Finance' },
   { name: '25-Thu', CheckedIn: 89, NotCheckedIn: 15, month: 'Mar', year: '2024', department: 'IT' },
   { name: '26-Fri', CheckedIn: 78, NotCheckedIn: 23, month: 'Mar', year: '2024', department: 'Finance' },
   { name: '26-Fri', CheckedIn: 78, NotCheckedIn: 23, month: 'Mar', year: '2024', department: 'IT' },
   { name: '26-Fri', CheckedIn: 78, NotCheckedIn: 23, month: 'Mar', year: '2024', department: 'Sales' },
   { name: '27-Sat', CheckedIn: 9, Weekend: 85, month: 'Mar', year: '2024', department: 'IT' },
   { name: '27-Sat', CheckedIn: 9, Weekend: 85, month: 'Mar', year: '2024', department: 'Sales' },
   { name: '27-Sat', CheckedIn: 9, Weekend: 85, month: 'Mar', year: '2024', department: 'Finance' },
   { name: '28-Sun', Weekend: 98, month: 'Mar', year: '2024', department: 'Sales' },
   { name: '28-Sun', Weekend: 98, month: 'Mar', year: '2024', department: 'Finance' },
   { name: '28-Sun', Weekend: 98, month: 'Mar', year: '2024', department: 'IT' },
   //{ name: '29-Mon', CheckedIn: 0, NotCheckedIn: 0, Weekend: 0, holiday: true, month: 'Mar', year: '2024', department: 'All Departments, Finance, IT, Sales' }, // Holiday
 { name: '29-Mon', CheckedIn: 0, NotCheckedIn: 0,  holiday: true, month: 'Mar', year: '2024', department: 'Finance' }, // Holiday for Finance
    { name: '29-Mon', CheckedIn: 0, NotCheckedIn: 0, holiday: true, month: 'Mar', year: '2024', department: 'IT' }, // Holiday for IT
    { name: '29-Mon', CheckedIn: 0, NotCheckedIn: 0,  holiday: true, month: 'Mar', year: '2024', department: 'Sales' }, // Holiday for Sales
   //{ name: '29-Mon', CheckedIn: 0, NotCheckedIn: 0, holiday: true, month: 'Mar', year: '2024', department: 'Finance, IT, Sales' },
    { name: '30-Tue', CheckedIn: 92, NotCheckedIn: 18, month: 'Mar', year: '2024', department: 'Finance' },
    { name: '30-Tue', CheckedIn: 92, NotCheckedIn: 18, month: 'Mar', year: '2024', department: 'Sales' },
    { name: '30-Tue', CheckedIn: 92, NotCheckedIn: 18, month: 'Mar', year: '2024', department: 'IT' },
   { name: '31-Wed', CheckedIn: 85, NotCheckedIn: 20, month: 'Mar', year: '2024', department: 'Finance' },
   { name: '31-Wed', CheckedIn: 85, NotCheckedIn: 20, month: 'Mar', year: '2024', department: 'IT' },
   { name: '31-Wed', CheckedIn: 85, NotCheckedIn: 20, month: 'Mar', year: '2024', department: 'Sales' },
   { name: '1-Thu', CheckedIn: 89, NotCheckedIn: 20, month: 'Apr', year: '2024', department: 'Sales' },
   { name: '2-Fri', CheckedIn: 78, NotCheckedIn: 15, month: 'Apr', year: '2024', department: 'Finance' },
   { name: '3-Sat', CheckedIn: 12, Weekend: 83, month: 'Apr', year: '2024', department: 'IT' },
   { name: '4-Sun', Weekend: 99, month: 'Apr', year: '2024', department: 'Sales' },
   { name: '5-Mon', CheckedIn: 92, NotCheckedIn: 35, month: 'Apr', year: '2024', department: 'Sales' },
   { name: '6-Tue', CheckedIn: 85, NotCheckedIn: 40, month: 'Apr', year: '2024', department: 'Finance' },
   { name: '7-Wed', CheckedIn: 95, NotCheckedIn: 45, month: 'Apr', year: '2024', department: 'IT' },
   { name: '8-Thu', CheckedIn: 89, NotCheckedIn: 50, month: 'Apr', year: '2024', department: 'Sales' },
   { name: '9-Fri', CheckedIn: 78, NotCheckedIn: 55, month: 'Apr', year: '2024', department: 'Finance' },
   { name: '10-Sat', CheckedIn: 8, Weekend: 87, month: 'Apr', year: '2024', department: 'IT' },
   { name: '11-Sun', Weekend: 95, month: 'Apr', year: '2024', department: 'Sales' },
   { name: '12-Mon', CheckedIn: 92, NotCheckedIn: 70, month: 'Apr', year: '2024', department: 'Sales' }
  ];
// Generate weeks for the selected month
const generateWeeks = (month, year) => {
  const daysInMonth = new Date(parseInt(year), new Date(Date.parse(month + "1, " + year)).getMonth() + 1, 0).getDate();
  const weeks = [];
  let weekIndex = 1;
  for (let start = 1; start <= daysInMonth; start += 7) {
    weeks.push({ weekIndex, start, end: Math.min(start + 6, daysInMonth) });
    weekIndex++;
  }
  return weeks;
};

// Custom Label for the holiday
const HolidayLabel = (props) => {
  const { x, y, value } = props;
  return (
    <text x={x} y={y} dy={-10} textAnchor="middle" fill="#FFD700" fontSize="14px">
      {value}
    </text>
  );
};

const AttendanceChart = () => {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedDepartment, setSelectedDepartment] = useState('');//All Departments
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [isMonthSelected, setIsMonthSelected] = useState(false);
  const [isDepartmentSelected, setIsDepartmentSelected] = useState(false);

  const filteredData = useMemo(() => {
    return data.filter(item => {
      return (
        (selectedDepartment === '' || item.department === selectedDepartment) &&
        (item.month === selectedMonth && item.year === selectedYear)
      );
    });
  }, [selectedMonth, selectedYear, selectedDepartment]);

  const weeks = useMemo(() => generateWeeks(selectedMonth, selectedYear), [selectedMonth, selectedYear]);

  const weekData = useMemo(() => {
    const week = weeks.find(w => w.weekIndex === selectedWeek);
    if (!week) return [];
    const weekData = filteredData.filter(item => {
      const day = parseInt(item.name.split('-')[0], 10);
      return day >= week.start && day <= week.end;
    });
    // Find the maximum value for CheckedIn, NotCheckedIn, and Weekend
    const maxCheckedIn = Math.max(...weekData.map(item => item.CheckedIn ?? 0), 0);
    const maxNotCheckedIn = Math.max(...weekData.map(item => item.NotCheckedIn ?? 0), 0);
    const maxWeekend = Math.max(...weekData.map(item => item.Weekend ?? 0), 0);

    // Set the holiday value to be larger than any other value
    return weekData.map(item => ({
      ...item,
      holiday: item.holiday ? Math.max(maxCheckedIn, maxNotCheckedIn, maxWeekend) + 10 : undefined
    }));
  }, [filteredData, weeks, selectedWeek]);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
    setIsMonthSelected(true); // Set month as selected
    setSelectedWeek(1); // Reset to week 1 on month change
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
    setSelectedWeek(1); // Reset to week 1 on year change
  };

  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
    setIsDepartmentSelected(true); // Set department as selected
  };

  const handleWeekChange = (event) => {
    setSelectedWeek(event.target.value);
  };

  // Get the week range for the selected week
  const getWeekRange = (weekIndex) => {
    const week = weeks.find(w => w.weekIndex === weekIndex);
    if (week) {
      const startDate = new Date(parseInt(selectedYear), new Date(Date.parse(selectedMonth + "1, " + selectedYear)).getMonth(), week.start);
      const endDate = new Date(parseInt(selectedYear), new Date(Date.parse(selectedMonth + "1, " + selectedYear)).getMonth(), week.end);
      return `${startDate.getDate()} ${startDate.toLocaleString('default', { month: 'short' })} - ${endDate.getDate()} ${endDate.toLocaleString('default', { month: 'short' })}`;
    }
    return '';
  };

  return (
    <Box p={3} display="flex">
      <Box flex={1}>
        <Typography variant="subtitle1" mb={2}>
          <b>Attendance Status - {selectedDepartment} (Week {selectedWeek}: {getWeekRange(selectedWeek)}) {selectedYear}</b>
        </Typography>
        {isMonthSelected && isDepartmentSelected && (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={weekData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="CheckedIn" stackId="a" fill="#8884d8" />
              <Bar dataKey="NotCheckedIn" stackId="a" fill="#FF7F7F" />
              <Bar dataKey="Weekend" stackId="a" fill="#82ca9d" />
              <Bar dataKey="holiday" stackId="a" fill="#FFD700">
                {weekData.map((entry, index) => 
                  entry.holiday !== undefined ? (
                    <Label key={`label-${index}`} position="top" content={<HolidayLabel value="Holiday" />} />
                  ) : null
                )}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </Box>
      <Box sx={{ ml: 2, width: '300px' }}>
        <FormControl variant="outlined" size="small" fullWidth sx={{ mb: 2 }}>
          <InputLabel>Department</InputLabel>
          <Select value={selectedDepartment} onChange={handleDepartmentChange} label="Department">
            <MenuItem value="Finance">Finance</MenuItem>
            <MenuItem value="IT">IT</MenuItem>
            <MenuItem value="Sales">Sales</MenuItem>
          </Select>
        </FormControl>
    
        <FormControl variant="outlined" size="small" fullWidth sx={{ mb: 2 }}>
          <InputLabel>Month</InputLabel>
          <Select value={selectedMonth} onChange={handleMonthChange} label="Month">
            <MenuItem value="Jan">Jan</MenuItem>
            <MenuItem value="Feb">Feb</MenuItem>
            <MenuItem value="Mar">Mar</MenuItem>
            <MenuItem value="Apr">Apr</MenuItem>
            <MenuItem value="May">May</MenuItem>
            <MenuItem value="Jun">Jun</MenuItem>
            <MenuItem value="Jul">Jul</MenuItem>
            <MenuItem value="Aug">Aug</MenuItem>
            <MenuItem value="Sep">Sep</MenuItem>
            <MenuItem value="Oct">Oct</MenuItem>
            <MenuItem value="Nov">Nov</MenuItem>
            <MenuItem value="Dec">Dec</MenuItem>
          </Select>
        </FormControl>
    
        <FormControl variant="outlined" size="small" fullWidth sx={{ mb: 2 }}>
          <InputLabel>Year</InputLabel>
          <Select value={selectedYear} onChange={handleYearChange} label="Year">
            <MenuItem value="2024">2024</MenuItem>
            <MenuItem value="2023">2023</MenuItem>
            <MenuItem value="2022">2022</MenuItem>
            <MenuItem value="2021">2021</MenuItem>
          </Select>
        </FormControl>
    
       
         <FormControl variant="outlined" size="small" fullWidth  sx={{ mr: 2 }}>
            <InputLabel>Week</InputLabel>
            <Select
              label="Week"
              value={selectedWeek}
              onChange={(e) => setSelectedWeek(Number(e.target.value))}
            >
              {weeks.map(week => (
                <MenuItem key={week.weekIndex} value={week.weekIndex}>
                  Week {week.weekIndex}: {week.start} - {week.end}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
      </Box>
    </Box>
  );
};

export default AttendanceChart;