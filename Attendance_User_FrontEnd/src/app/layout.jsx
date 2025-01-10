
'use client';
import React from 'react';
 import "./globals.css";
 
import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material';
import { useDarkModeStore } from './store'; // Adjust the import path as needed
import Navbar from './Navbar'; // Adjust the import path as needed


export default function Layout({ children }) {
 
  const { darkMode } = useDarkModeStore();

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: darkMode ? '#90caf9' : '#1976d2',
      },
      background: {
        default: darkMode ? '#121212' : '#fafafa',
        paper: darkMode ? '#424242' : '#ffffff',
      },
    },
  });

  return (
    <html>
      <body>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
      <Navbar />
     <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 1.5,
           mt: 4, // Adjust this value according to your Navbar height
         }}
       >
         {children}
     </Box>
 </Box>
      
    </ThemeProvider>
    </body>
    </html>
  );
}
