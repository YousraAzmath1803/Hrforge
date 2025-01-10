// // 'use client';

// // import React from 'react';
// // //import { createTheme, ThemeProvider } from "@mui/material";
// // import { createTheme,CssBaseline,ThemeProvider } from '@mui/material';
// // import { useDarkModeStore } from './store';

// // const ThemeWrapper = ({ children }) => {
// //   const { darkMode } = useDarkModeStore();

// //   const theme = createTheme({
// //     palette: {
// //       mode: darkMode ? 'dark' : 'light',
// //       primary: {
// //         main: darkMode ? '#90caf9' : '#1976d2',
// //       },
// //     },
// //   });

// //   return (
// //     <ThemeProvider theme={theme}>
// //          <CssBaseline />
// //       {children}
// //     </ThemeProvider>
// //   );
// // };

// // export default ThemeWrapper;
// 'use client';

// import React from 'react';
// import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
// import { useDarkModeStore } from './store';

// const ThemeWrapper = ({ children }) => {
//   const { darkMode } = useDarkModeStore();

//   const theme = createTheme({
//     palette: {
//       mode: darkMode ? 'dark' : 'light',
//       primary: {
//         main: darkMode ? '#90caf9' : '#1976d2',
//       },
//       background: {
//         default: darkMode ? '#121212' : '#fff',
//         paper: darkMode ? '#1e1e1e' : '#fff',
//       },
//       text: {
//         primary: darkMode ? '#ffffff' : '#000000',
//       },
//     },
//   });

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       {children}
//     </ThemeProvider>
//   );
// };

// export default ThemeWrapper;
