
import { Inter } from 'next/font/google';
 import './globals.css';
import Sidebar from '../components/Sidebar';


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Admin Panel",
  description: "Admin panel-hr forge",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    
      <body className={inter.className}>
      <Sidebar />
      
        {children}
      
      </body>
    </html>
  );
}
// import React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';

// import NotificationsIcon from '@mui/icons-material/Notifications';
// import AccountCircle from '@mui/icons-material/AccountCircle';
// import SettingsIcon from '@mui/icons-material/Settings';
// import { Avatar } from '@mui/material';

// export default function Navbar() {
//   return (
//     <AppBar position="static" style={{ backgroundColor: '#1F1F1F' }}>
//       <Toolbar>
      

//         <IconButton edge="end" color="inherit">
//           <NotificationsIcon />
//         </IconButton>

       
//         <IconButton edge="end" color="inherit">
//           <AccountCircle />
//         </IconButton>

//       </Toolbar>
//     </AppBar>
//   );
// }
