'use client';
import { Box, Toolbar } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';


const Home = () => {
  return (

    <Box sx={{ display: 'flex', height: '100vh' }}>  {/* Full screen height */}
      {/* <Sidebar /> */}
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          p: 3, 
          background: 'linear-gradient(to bottom, #e0f7fa, #ffffff)', // Gradient from light blue to white
        }}
      >
        <Toolbar />
        <div >
          <center><b><h1>Welcome to HRForge Dashboard</h1></b></center>
          {/* Main content goes here */}
        </div>
        
      </Box>

      
    </Box>
  );
};

export default Home;
