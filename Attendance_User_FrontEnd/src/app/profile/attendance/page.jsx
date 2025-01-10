
'use client';
import { useState, useEffect } from 'react';
import { Box, Button, Card, CardContent, Container, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Grid, TextField, Dialog, DialogTitle, DialogContent, DialogActions,

 } from '@mui/material';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import isBetween from 'dayjs/plugin/isBetween';
import { Doughnut, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Chart } from 'chart.js';
import { red } from '@mui/material/colors';
import { useTheme } from '@mui/material/styles';
dayjs.extend(isBetween);
dayjs.extend(isoWeek);

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

// // Format duration from seconds to hh:mm:ss format
const formatDuration1 = (seconds ) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
 // return `${hours}h ${minutes}m ${secs}s`;
 return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

const formatDuration = (duration) => {
  if (typeof duration === 'string') {
    const matches = duration.match(/\d+/g);
    if (matches) {
      const [hours, minutes, seconds] = matches.map(Number);
      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
  }
  // Fallback in case the format is unexpected
  return '00:00:00';
};




const Attendance = () => {
  const [startTime, setStartTime] = useState(null);
  const [startTime1, setStartTime1] = useState(null);
 // const [currentBreakStartTime, setCurrentBreakStartTime] = useState(null);
  //const [totalBreakDuration, setTotalBreakDuration] = useState(0);
  const [stopTime, setStopTime] = useState(null);
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [isOnBreak, setIsOnBreak] = useState(false);
  const [totalTime, setTotalTime] = useState(0);
  const [breakTime, setBreakTime] = useState(0);
  const [attendanceDataWeek, setAttendanceDataWeek] = useState([]);
  const [selectedYearWeek, setSelectedYearWeek] = useState(dayjs().year());
  const [selectedMonthWeek, setSelectedMonthWeek] = useState(dayjs().month() + 1);
  const [selectedWeek, setSelectedWeek] = useState('');
  const [weekOptions, setWeekOptions] = useState([]);
  const [dataAvailable, setDataAvailable] = useState(true);

  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [dateRange, setDateRange] = useState([dayjs().startOf('month'), dayjs().endOf('month')]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [filteredAttendanceData, setFilteredAttendanceData] = useState([]);

  const [searchInitiated, setSearchInitiated] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [chartData, setChartData] = useState({
    labels: ['Work Time', 'Break Time', 'Remaining Time'],
    datasets: [{
      label: 'Time',
      data: [isClockedIn ? totalTime : 0, isOnBreak ? breakTime : 0,  8 * 60 * 60 - totalTime - breakTime], // Placeholder values
      backgroundColor: ['#3f51b5', '#4caf50', '#e0e0e0'],
      hoverBackgroundColor: ['#303f9f', '#388e3c', '#c7c7c7'],
      borderWidth: 1,
      borderColor: '#ffffff',
    }],
  });

  const handlePrint = () => {
    const printWindow = window.open('', 'height=600,width=800');
    const printContent = document.getElementById('printable-section').innerHTML;
    
    const headerContent = `
    <div style="text-align: center;">
      <h2>Attendance Report</h2>
      <p><strong>Selected Year:</strong> ${selectedYear}</p>
      ${selectedMonth ? `<p><strong>Selected Month:</strong> ${dayjs().month(selectedMonth - 1).format('MMMM')}</p>` : ''}
      ${selectedDate ? `<p><strong>Selected Date:</strong> ${dayjs().date(selectedDate).format('DD')}</p>` : ''}
      <p><strong>Current Date and Time:</strong> ${new Date().toLocaleString()}</p>
      <hr />
    </div>
    `;
  
    printWindow.document.write('<html><head><title>Attendance Report</title>');
    printWindow.document.write('<style>');
    printWindow.document.write('body { text-align: center; }'); // Center align all body text
    printWindow.document.write('table { border: 1px solid #000; margin: 0 auto; }'); // Center the table
    printWindow.document.write('th, td { border: 1px solid #000; padding: 8px; text-align: left; }');
    printWindow.document.write('@media print { .no-print { display: none; } }');
    printWindow.document.write('</style>');
    printWindow.document.write('</head><body>');
  
    printWindow.document.write(headerContent); // Add header content
   // Check if printContent is empty
   if (!printContent.trim()) {
    printWindow.document.write('<p>No data available</p>'); // Write "No data available" if empty
} else {
    printWindow.document.write(printContent);  // Add table content
}
    printWindow.document.write('</body></html>');
  
    printWindow.focus();
    printWindow.print();
    printWindow.document.close();
  };
  
  useEffect(() => {
    if (selectedMonthWeek) {
      const weeks = getWeeksInMonth(dayjs().year(), selectedMonthWeek);
      setWeekOptions(weeks);
      // Optionally reset selected week if needed
      if (!selectedWeek || !weeks.some((week) => week.start === selectedWeek)) {
        setSelectedWeek(weeks[0]?.start); // Default to the first week if selected week is not available
      }
    }
  }, [selectedMonthWeek]);
  

  useEffect(() => {
    let timer;
   
    if (isClockedIn && startTime) {
      timer = setInterval(() => {
    
        if (!isOnBreak) {
          setTotalTime((prevTotalTime) => prevTotalTime + 1); // Update totalTime in seconds
        } else {
          setBreakTime((prevBreakTime) => prevBreakTime + 1); // Update breakTime in seconds
        }
      }, 1000);
    }
    return () => clearInterval(timer);
    
  }, [isClockedIn, isOnBreak, startTime]);

 //id value
 const id =1;
  const handleClockToggle = async () => {
    const now = new Date();

    if (isClockedIn) {
      // Calculate durations
     
     
      // Open the dialog
      setDialogOpen(true);
    } else {
      // Clock In
      try {
        await fetch(`http://localhost:9090/api/timerecords/clockin/${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            startTime: now.toISOString(),
          }),
        });
        setStartTime(now);
        setStartTime1(now);
        setStopTime(null);
        setIsClockedIn(true);
        setTotalTime(0);
        setBreakTime(0);
      } catch (error) {
        console.error('Error clocking in:', error);
      }
    }
  };


  const handleClockOutConfirm = async () => {
    const now = new Date();

    try {
      await fetch(`http://localhost:9090/api/timerecords/clockout/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          stopTime: now.toISOString(),
          startTime: startTime.toISOString(),
          breakTime,
          totalTime,
        }),
      });
      setStopTime(now);
      setIsClockedIn(false);
      setIsOnBreak(false);
    } catch (error) {
      console.error('Error clocking out:', error);
    }

    setDialogOpen(false);
  };

  const handleBreakToggle = async () => {
    const now = new Date(); // Get the current time
  
    if (isOnBreak) {
      // Break Out
      try {
        await fetch(`http://localhost:9090/api/timerecords/breakout/${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            breakEndTime: now.toISOString(),
          }),
        });

        setIsOnBreak(false);
      
        setBreakTime(prevBreakTime =>( prevBreakTime + (now - startTime))/1000); // Assuming breakTime accumulates
      } catch (error) {
        console.error('Error during break out:', error);
      }
    } else {
      // Break In
      try {
        await fetch(`http://localhost:9090/api/timerecords/breakin/${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            breakStartTime: now.toISOString(),
          }),
        });
        // Update the state to reflect break in
        setIsOnBreak(true);
        //setCurrentBreakStartTime(now);
        setStartTime(now); // Track break start time
      } catch (error) {
        console.error('Error during break in:', error);
      }
    }
  };



  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
    setSelectedMonth(null);
    setSelectedDate(null);
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
    setSelectedDate(null);
  };

const handlerWeekMonthChange = (month) => {
  setSelectedMonthWeek(month);
 // Fetch weeks based on the new month
  const weeks = getWeeksInMonth(selectedYearWeek, month);
  setWeekOptions(weeks);
  // Optionally reset selected week if needed
  setSelectedWeek(null); 
  fetchWeekData();
};
const handleYearWeekChange = (year) => {
  setSelectedYearWeek(year);
  const weeks = getWeeksInMonth(year, selectedMonth);
  setWeekOptions(weeks);
  setSelectedMonthWeek(null);
  setSelectedWeek(null);
  fetchWeekData();
};
 

  const handleWeekChange = (weekStart) => {
    setSelectedWeek(weekStart);
    fetchWeekData();
  };

  // Function to generate the year options based on the selected year
  const getYearOptions = (currentYear) => {
    const startYear = currentYear - 1; // One year before
    const endYear = currentYear + 1; // One year after
    return [startYear, currentYear, endYear];
  };

// useEffect(() => {
//   fetchWeekData();
//   const intervalId = setInterval(() => {
//     fetchWeekData();
//   }, 2000); // 2000 ms = 2 seconds
//   if (selectedMonthWeek) {
//     const weeks = getWeeksInMonth(selectedYearWeek, selectedMonthWeek);
//     setWeekOptions(weeks);
//     if (!selectedWeek || !weeks.some((week) => week.start === selectedWeek)) {
//       setSelectedWeek(weeks[0]?.start);
//     }
//   }
//   return () => clearInterval(intervalId);
// }, [selectedYearWeek, selectedMonthWeek, selectedWeek]);

useEffect(() => {
  // Define a function that handles both fetching data and updating week-related state
  const updateWeekData = () => {
    fetchWeekData(); // Call the existing function to fetch data
    if (selectedMonthWeek) {
      const weeks = getWeeksInMonth(selectedYearWeek, selectedMonthWeek);
      setWeekOptions(weeks);
      // If the selected week is not available, default to the first week
      if (!selectedWeek || !weeks.some((week) => week.start === selectedWeek)) {
        setSelectedWeek(weeks[0]?.start);
      }
    }
  };

  // Initial fetch when the component mounts
  updateWeekData();

  // Set up polling to fetch and update data every 2 seconds
  const intervalId = setInterval(() => {
    updateWeekData();
  }, 5000); // 5000 ms = 5 seconds

  // Cleanup interval on component unmount
  return () => clearInterval(intervalId);
}, [selectedYearWeek, selectedMonthWeek, selectedWeek]); // Dependencies trigger re-fetch on changes


// Prepare data for the bar chart
const prepareChartData = () => {
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const workDuration = new Array(7).fill(0); // Initialize with 0 for each day
  const breakDuration = new Array(7).fill(0); // Initialize with 0 for each day
  const dateLabels = new Array(7).fill(''); // Store the date for each day

  attendanceDataWeek.forEach(record => {
    const recordDate = dayjs(record.date);
    const dayIndex = recordDate.day() === 0 ? 6 : recordDate.day() - 1; // Convert Sunday to index 6
   
    const parseTimeToSeconds = (timeStr) => {
      const timeParts = timeStr.match(/(\d+) hours (\d+) minutes (\d+) seconds/);
      if (timeParts) {
        const hours = parseInt(timeParts[1], 10);
        const minutes = parseInt(timeParts[2], 10);
        const seconds = parseInt(timeParts[3], 10);
        return hours * 3600 + minutes * 60 +seconds ;
      }
      return 0;
    };
    
    workDuration[dayIndex] += parseTimeToSeconds(record.totalDuration.split(':')[0], 10); // Assuming duration is in 'hh:mm:ss'
   breakDuration[dayIndex] += parseTimeToSeconds(record.totalBreakTime.split(':')[0], 10); // Assuming break time is in 'hh:mm:ss'
  
   // Store the date in dd/mm/yyyy format
   dateLabels[dayIndex] = recordDate.format('DD/MM/YYYY');
  });
  return {
    labels: daysOfWeek,
    datasets: [
      {
        label: 'Work Duration',
        data: workDuration,
        backgroundColor: 'blue',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      },
      {
        label: 'Break Duration',
        data: breakDuration,
        backgroundColor: 'green',
        borderColor: 'green',
        borderWidth: 1
      }
    ],
    dateLabels
  };
};

const chartDataWeek = prepareChartData();
const formatSecondsToHHMMSS = (seconds) => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};
const formatToSingleNumber = (seconds) => {
  const hrs = Math.floor(seconds / 3600);
  return hrs;
};

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };
  const daysInMonth = selectedYear&&selectedMonth ?
  dayjs(`${selectedYear}-${selectedMonth}-01`).daysInMonth():31;


  
  
  const handleClear = () => {
    setSelectedYear('');
    setSelectedMonth('');
    setSelectedDate('');
    setFilteredAttendanceData([]);
    setSearchInitiated(false);
  };



  const fetchWeekData = async () => {
    
    try {
     const response = await fetch(`http://localhost:9090/api/timerecords/employees/${id}`);
     // const response = await fetch('/c.json'); // Adjust this to your actual API endpoint
      if (!response.ok) {
        throw new Error('Failed to load JSON data');
      }
      const data = await response.json();
      console.log(data);

      // if (!Array.isArray(data)) {
      //   throw new Error('Fetched data is not an array');
      // }
          // Check if data is an object and wrap it in an array if so
    const dataArray = Array.isArray(data) ? data : [data];

      // Calculate the start and end dates of the selected week
      const startDate = dayjs(selectedWeek);
      const endDate = dayjs(selectedWeek).endOf('week');

      // Filter records within the selected date range
      const weekRecords = dataArray.flatMap(employee => {
        return employee.timeRecords.filter(record => {
          const recordDate = dayjs(record.date);
          return recordDate.isBetween(startDate, endDate, null, '[]');
        });
      });

      if (weekRecords.length > 0 && selectedWeek) {
        setAttendanceDataWeek(weekRecords);
        setDataAvailable(true);
      } else {
        setDataAvailable(false);
        console.error('No records found for the selected week.');
      }
    } catch (error) {
      console.error('Error fetching attendance data:', error);
      setDataAvailable(false);
    }
  };

  const getWeeksInMonth = (year, month) => {
    const startOfMonth = dayjs(`${year}-${month}-01`).startOf('month');
    const endOfMonth = dayjs(startOfMonth).endOf('month');
    let weeks = [];
    let currentStart = startOfMonth;

    while (currentStart.isBefore(endOfMonth)) {
      const weekStart = currentStart.startOf('week').add(1, 'day');
      const weekEnd = currentStart.endOf('week').add(1, 'day').isAfter(endOfMonth) ? endOfMonth : currentStart.endOf('week').add(1, 'day');
      weeks.push({ start: weekStart.format('YYYY-MM-DD'), end: weekEnd.format('YYYY-MM-DD') });
      currentStart = weekEnd.add(1, 'day');
    }

    return weeks;
  };



  const [dataFetched, setDataFetched] = useState(false);
  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:9090/api/timerecords/employees/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('API response:', data);
  
      if (data.timeRecords && data.timeRecords.length > 0) {
        const transformedData = data.timeRecords.map((record) => ({
          date: record.date,
          clockStartTime: record.clockInTime,
          clockStopTime: record.clockOutTime,
          clockBreakTime: formatDuration(record.totalBreakTime),
          clockTotalTime: formatDuration(record.totalDuration),
          clockTotalLoginTime: formatDuration(record.totalLoginDuration),
        }));
  
        // Update state with transformed data
        setAttendanceData(transformedData);
        setFilteredAttendanceData(transformedData); // Initialize filtered data
      } else {
        console.error('No timeRecords found for this employee.');
        setAttendanceData([]); // Clear state if no data
        setFilteredAttendanceData([]); // Clear filtered data
      }
       setDataFetched(true); // Mark data as fetched
    } catch (error) {
      console.error('Error fetching attendance data:', error);
    }
  };
  useEffect(() => {
    if (dataFetched) {
      filterData(selectedYear, selectedMonth, selectedDate);
    }
  }, [dataFetched]); // Runs when dataFetched changes
  
  // useEffect(()=>{
  //   fetchData();
  //   },[]);

  const filterData =  (year, month, date) => {
  
    const filteredData = attendanceData.filter((entry) => {
      const entryDate = dayjs(entry.date);
      console.log('Filtering date:', entryDate.format(), year, month, date);
      return (
        (!year || entryDate.year() === year) &&
        (!month || entryDate.month() + 1 === month) &&
        (!date || entryDate.date() === date)
      );
    });
    filteredData.sort((a, b) => {
      return dayjs(a.date).isBefore(dayjs(b.date)) ? -1 : 1; // Sort ascending
    });
    setFilteredAttendanceData(filteredData);
  };
 

  const handleSearch = async () => {
    setDataFetched(false); // Reset before fetching
    setSearchInitiated(true);
    await fetchData(); // Fetch and update state
    
  };

  const getFormattedDate = (date) => {
    if (!date) return '';
    return dayjs(date).format(' HH:mm:ss');
  };
  // const removeMilliseconds=(timeString)=> {
  //   return timeString.replace(/\.\d+$/, '');
  // }
  const removeMilliseconds = (timeString) => {
    if (typeof timeString === 'string') {
      return timeString.replace(/\.\d+$/, '');
    }
    return timeString; // or you can return an empty string if preferred
  };
  
   const data = {
    labels: ['Work Time', 'Break Time', 'Remaining Time'],
    
    datasets: [
      {
        label: 'Time',
        data: [totalTime, breakTime.toFixed(0), 8 * 60 * 60 - totalTime ], // Assuming an 8-hour day
        backgroundColor: ['#3f51b5', '#4caf50', '#e0e0e0'],
        hoverBackgroundColor: ['#303f9f', '#388e3c', '#c7c7c7'],
        borderWidth: 1,
        borderColor: '#ffffff',
        
      },
    ],
  };

  const options = {
    cutout: '75%',
    rotation: 0,
    circumference: 360, // Ring chart
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label;
            const time = context.raw;
            return `${label}: ${formatDuration1(time)}`;
          },
        },
      },
    },
    elements: {
      arc: {
        borderWidth: 1,
        borderColor: '#ffffff',
      },
    },
  };


const theme = useTheme();
  const [upcomingHolidays, setUpcomingHolidays] = useState([]);

  const fetchUpcomingHolidays = async () => {
    try {
      const response = await fetch('http://localhost:9090/holidays/upcoming');
      if (!response.ok) {
        throw new Error('Failed to fetch upcoming holidays');
      }
      const data = await response.json();
      setUpcomingHolidays(data);
    } catch (error) {
      console.error('Error fetching upcoming holidays:', error);
    }
  };

  useEffect(() => {
    fetchUpcomingHolidays();
  }, []);

  // Group holidays by month and sort them by date
  const groupHolidaysByMonth = (holidays) => {
    return holidays.reduce((acc, holiday) => {
      const month = dayjs(holiday.date).format('MMMM YYYY');
      if (!acc[month]) acc[month] = [];
      acc[month].push(holiday);
      return acc;
    }, {});
  };

  // Sort months by date
  const sortMonths = (groupedHolidays) => {
    return Object.keys(groupedHolidays).sort((a, b) => dayjs(a, 'MMMM YYYY').isBefore(dayjs(b, 'MMMM YYYY')) ? -1 : 1);
  };

  const groupedHolidays = groupHolidaysByMonth(upcomingHolidays);
  const sortedMonths = sortMonths(groupedHolidays);


  return (
    <Container style={{ backgroundColor: 'none', borderColor: '#ffffff', borderWidth: 1, padding: '10px' }}>
  <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
    <Grid container spacing={3} justifyContent="center"
      sx={{
        background: 'transparent',
      
      }}>
     
     
      {/* Grid Item 1 */}
      <Grid item xs={12} sm={6} md={5.2} lg={6} ml={-4} mr={-1.3} mt={1.2} mb={0}
      sx={{background: 'transparent', flexGrow:1}}
       style={{ padding: '12px', height:'388px'}}>
        <Card elevation={3} style={{marginLeft:'23px', padding:'16px', height:'100%', width:'auto'}}>
        <Box display="flex" flexDirection="column" height="100%" width={"auto"}>
          <Box mb={2} display="flex" alignItems="center" justifyContent="space-between" overflow={'scroll'}>
            <Typography variant="h6" gutterBottom>
              Weekly Activity
            </Typography>
            <Box display="flex" alignItems={'center'}>
            <Select
                value={selectedYearWeek}
                onChange={(event) => handleYearWeekChange(event.target.value)}
                displayEmpty
                IconComponent={()=>null}
                disabled={!selectedYearWeek}
                style={{ marginLeft: '16px' }}
              >
                <MenuItem value="" disabled>select year</MenuItem>
                {getYearOptions(selectedYearWeek).map(year => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>

              <Select
                value={selectedMonthWeek || ''}
                onChange={(event) => handlerWeekMonthChange(event.target.value)}
                //disabled = {!selectedYearWeek || !selectedMonthWeek}
                disabled={!selectedYearWeek} // Enable if year is selected
                style={{ marginLeft: '16px' }}
              >
                <MenuItem value="" disabled>select month</MenuItem>
                {Array.from({ length: 12 }, (_, i) => (
                  <MenuItem key={i + 1} value={i + 1}>
                    {dayjs().month(i).format('MMMM')}
                  </MenuItem>
                ))}
              </Select>
             
              <Select
                value={selectedWeek || ''}
                onChange={(event) => handleWeekChange(event.target.value)}
                
                disabled={!selectedWeek}
                style={{ marginLeft: '16px' }}
              ><MenuItem value="" disabled>select week</MenuItem>
                {weekOptions.map((week, index) => (
                  <MenuItem key={index} value={week.start}>
                    {`${dayjs(week.start).format('DD MMM')} - ${dayjs(week.end).format('DD MMM')}`}
                  </MenuItem>
                ))}
              </Select>
              
            </Box>
          </Box>
          <Box flexGrow={1} display="flex" justifyContent="center" alignItems="center"  marginBottom={0} padding={0}>
          <div style={{ width: '100%', height: '100%', padding:'0', margin:'0', overflow:'scroll' }}>
          <Box  sx={{
      minHeight: '300px',  // Minimum height for the Box
      minWidth: '500px',    // Minimum width for the Box
      width: '99.8%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      overflowX:'scroll',
     marginBottom:'-22px',
     marginTop:'-20px'
    }}
     >
          {dataAvailable ? (
          <Bar data={chartDataWeek} options={{
                responsive: true,
                maintainAspectRatio:true,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  tooltip: {
                    callbacks: {
                      label: function (context) {
                        const label = context.dataset.label || '';
                        const duration = formatSecondsToHHMMSS(context.raw); // Convert seconds to hh:mm:ss format
          const dateLabel = chartDataWeek.dateLabels[context.dataIndex]; // Fetch the corresponding date label from chartDataWeek
          return `${label}: ${duration} (Date: ${dateLabel})`;
                        // return `${label}: ${context.raw} hours`;
                      }
                    }
                  }
                },
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: 'Day of Week'
                    }
                  },
                  y: {
                    title: {
                      display: true,
                      text: 'Hours'
                    },
                   
                    ticks: {
                      callback: (value) => formatToSingleNumber(value), // Format y-axis ticks as hh:mm:ss
                      stepSize: 3600 // Set step size to 3600 seconds (1 hour)
                    }
                  }
                }
              }}
              />
            ) : (
              <Typography variant="h6">No data available for the selected period.</Typography>
            )}
          </Box>
          </div>
          </Box>
          </Box>
        </Card>
      </Grid>

      {/* Grid Item 2 */}


<Grid item xs={12} sm={4} md={3.5} lg={3}>
      <Card style={{ height: '360px', width: '100%', overflow:'hidden' }}>
        <CardContent>
          <Typography variant="h6"  
          style={{ position: 'sticky', top: 0, backgroundColor: theme.palette.background.paper, zIndex: 1, backgroundColor: theme.palette.background.paper, }}>
            Upcoming Holidays</Typography>
          <TableContainer style={{ maxHeight: '300px', overflow: 'auto' }}>
            <Table >
           
               {sortedMonths.map((month) => (
        <TableBody key={month}>
          <TableRow>
            <TableCell colSpan={2} style={{ fontWeight: 'bold',   backgroundColor: theme.palette.action.hover,
                    color: theme.palette.text.primary, }}>
              {month}
            </TableCell>
          </TableRow>
          {groupedHolidays[month].map((holiday) => (
            <TableRow key={holiday.date}>
              <TableCell>{dayjs(holiday.date).format('DD/MM/YYYY')}</TableCell>
              <TableCell>{holiday.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      ))}
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Grid>
         {/* Grid Item 3 */}
         <>
       <Grid item xs={12} sm={4} md={3.5} lg={3}  >
        <Card elevation={3} style={{ padding: '10px', height: '360px', minWidth:'220px'}}>
          <Typography variant="h6">Today - {dayjs().format('DD/MM/YYYY')}</Typography>
          <Box mt={0}>
             <Typography variant="body1">
             {startTime1 ? `Logged in at ${getFormattedDate(startTime1)}` : 'Not logged in yet'}
           
           </Typography>
           {stopTime && (
              <Typography variant="body1" mt={0}>
                Logged out at {getFormattedDate(stopTime)}
              </Typography>
             )}
          </Box>
          <Box mt={1} display="flex" justifyContent="center">
            <Box position="relative" display="inline-flex" style={{ width: '100%', height: '100%', maxWidth: '200px', maxHeight: '200x' }}>
              <Doughnut data={data} options={options} />
            </Box>
          </Box>
          <Box p={1.2}  display="flex" justifyContent="center">
            <Button variant="contained" color="primary" onClick={handleClockToggle}>
              {isClockedIn ? 'Clock Out' : 'Clock In'}
            </Button>
            {isClockedIn && (
              <Button variant="contained" color="secondary" onClick={handleBreakToggle} style={{ marginLeft: '16px' }}>
                {isOnBreak ? 'Off Break' : 'On Break'}
              </Button>
            )}
          </Box>
        </Card>
      </Grid>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Do you want to clock out?</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Logged in at: {getFormattedDate(startTime1)}</Typography>
          <Typography variant="body1">Logged out at: {dayjs().format('HH:mm:ss')}</Typography>
          <Typography variant="body1">Login duration at: {formatDuration1(totalTime)}</Typography>
          <Typography variant="body1">Break duration: {formatDuration1(breakTime.toFixed(0))}</Typography>
          <Typography variant="body1">Total work duration: {formatDuration1((totalTime + breakTime).toFixed(0))}</Typography>

          
          
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClockOutConfirm} color="secondary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
      </>
    </Grid>

    {/* Attendance Details Box */}
    
    <Box width="100%" maxWidth="1500px" mb={4} mt={4} ba  >
      <Card elevation={3}  style={{ padding: '17px', backgroundColor: 'transparent' }}>
        <Box display="flex" overflow={'scroll'} justifyContent="space-between" alignItems="center"  >
          <Typography variant="h6">Attendance Details</Typography>
          <Box display="flex" alignItems="center">
            <Select
              value={selectedYear || ''}
              onChange={handleYearChange}
              displayEmpty
              IconComponent={() => null}
              style={{ marginLeft: '16px' }}
            >
              <MenuItem value="" disabled>Select Year</MenuItem>
              {Array.from({ length: 5 }, (_, i) => (
                <MenuItem key={dayjs().year() - i} value={dayjs().year() - i}>
                  {dayjs().year() - i}
                </MenuItem>
              ))}
            </Select>
            <Select
              value={selectedMonth || ''}
              onChange={handleMonthChange}
              displayEmpty
              IconComponent={() => null}
              disabled={!selectedYear}
              style={{ marginLeft: '16px' }}
            >
              <MenuItem value="" disabled>Select Month</MenuItem>
              {Array.from({ length: 12 }, (_, i) => (
                <MenuItem key={i + 1} value={i + 1}>
                  {dayjs().month(i).format('MMMM')}
                </MenuItem>
              ))}
            </Select>
         
             <Select
        value={selectedDate || ''}
        onChange={handleDateChange}
        displayEmpty
        IconComponent={() => null}
        disabled={!selectedMonth}
        style={{ marginLeft: '16px' }}
      >
        <MenuItem value="" disabled>Select Date</MenuItem>
        {Array.from({ length: daysInMonth }, (_, i) => (
          <MenuItem key={i + 1} value={i + 1}>
            {i + 1}
          </MenuItem>
        ))}
      </Select>
        
            
{selectedYear || selectedMonth || selectedDate ? (
              <Button
                variant="contained"
                color="primary"
                onClick={handleSearch}
                style={{ marginLeft: '16px' }}
              >
                Search
              </Button>
            ) : null}

            {(selectedYear || selectedMonth || selectedDate) && (
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleClear}
                style={{ marginLeft: '16px' }}
              >
                Clear
              </Button>
            )}
          </Box>
        </Box>
       {searchInitiated && ( 
        <TableContainer id= 'printable-section'>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>S.No</TableCell>
                {/* <TableCell>ID</TableCell> */}
                <TableCell>Date</TableCell>
                <TableCell>Clock In</TableCell>
                <TableCell>Clock Out</TableCell>
                
                <TableCell>Break Time</TableCell>
                <TableCell>Login Time</TableCell>
                <TableCell>Total Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
  {filteredAttendanceData.map((entry, index) => (
   
      

       
          <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      {/* <TableCell>{entry.id}</TableCell> */}
                      <TableCell>{dayjs(entry.date).format('DD/MM/YYYY')}</TableCell>
                      <TableCell>{removeMilliseconds(entry.clockStartTime)}</TableCell>
                      <TableCell>{removeMilliseconds(entry.clockStopTime)}</TableCell>
                      <TableCell>{entry.clockBreakTime}</TableCell>
                      <TableCell>{entry.clockTotalTime}</TableCell>
                        <TableCell>{(entry.clockTotalLoginTime)}</TableCell>
           </TableRow>
        ))}
      
   
    {/* {isClockedIn && (
                <TableRow >
                  <TableCell> ... </TableCell>
                  <TableCell>{dayjs().format('DD/MM/YYYY')}</TableCell>
                  <TableCell>{getFormattedDate(startTime)}</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>{formatDuration1(breakTime.toFixed(0))}</TableCell>
                  <TableCell>{formatDuration1(totalTime)}</TableCell>
                  <TableCell>{formatDuration1((totalTime + breakTime).toFixed(0))}</TableCell>
                </TableRow>
              )} */}
</TableBody>

          </Table>
        </TableContainer>
         )} 
        </Card>
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Button variant="contained" color="primary" style={{ marginLeft: '16px' }} onClick={handlePrint}>
            Print
          </Button>


        </Box>
        </Box>
      
    </Box>

    </Container>
  );
};

export default Attendance;
 
