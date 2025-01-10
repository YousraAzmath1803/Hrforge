
'use client'
import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Switch,
  Popover,
  CssBaseline,
  TextField,
  InputAdornment,
  Avatar,
  Snackbar,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import InboxIcon from '@mui/icons-material/Inbox';
import EventNoteIcon from '@mui/icons-material/EventNote';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import InfoIcon from '@mui/icons-material/Info';
import GroupIcon from '@mui/icons-material/Group';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from 'next/navigation';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import { useDarkModeStore } from './store';
import axios from 'axios';

// Define the main navigation pages
const pages = [
  { name: 'Home', path: '/', icon: <HomeIcon sx={{ color: 'white' }}/> },
  { name: 'Inbox', path: '/inbox', icon: <InboxIcon sx={{ color: 'white' }} /> },
  { name: 'Finance', path: '/finance', icon: <AttachMoneyIcon sx={{ color: 'white' }}/> },
  { name: 'About', path: '/about', icon: <InfoIcon sx={{ color: 'white' }}/> },
  { name: 'My Teams', path: '/my-teams', icon: <GroupIcon sx={{ color: 'white' }}/> },
];

// Define the profile submenu pages
const profileSubmenu = [
  { name: 'Leave', path: '/profile/leave', icon: <EventNoteIcon sx={{ color: 'white' }}/> },
  { name: 'Attendance', path: '/profile/attendance', icon: <AccessTimeIcon sx={{ color: 'white' }}/> },
  { name: 'Performance', path: '/profile/performance', icon: <AttachMoneyIcon sx={{ color: 'white' }}/> }
];

const Navbar = () => {
  const router = useRouter();
  const theme = useTheme();
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
  
  // State for profile menu in sidebar
  const { darkMode, toggleDarkMode } = useDarkModeStore();
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  
  // State for profile menu in navbar
  const [profileNavAnchorEl, setProfileNavAnchorEl] = useState(null);
  const [profileNavOpen, setProfileNavOpen] = useState(false);
  

  const [mobileOpen, setMobileOpen] = useState(false);
  const isProfileMenuOpen = Boolean(profileAnchorEl);
  const isProfileNavMenuOpen = Boolean(profileNavAnchorEl);

  const [selectedFile, setSelectedFile] = useState(null);
  const [imageData, setImageData] = useState('');
  const [loading, setLoading] = useState(false);
  const [noImage, setNoImage] = useState(false);
  

  // Handle navigation to different pages
  const handleNavigation = (path) => {
    router.push(path);
  };

  // Open the profile menu in sidebar
  const handleProfileMenuOpen = (event) => {
    setProfileAnchorEl(event.currentTarget);
    setProfileOpen(true);
  };

  // Close the profile menu in sidebar
  const handleProfileMenuClose = () => {
    setProfileAnchorEl(null);
    setProfileOpen(false);
  };

  // Open the profile menu in navbar
  const handleProfileNavMenuOpen = (event) => {
    setProfileNavAnchorEl(event.currentTarget);
    setProfileNavOpen(true);
  };

  // Close the profile menu in navbar
  const handleProfileNavMenuClose = () => {
    setProfileNavAnchorEl(null);
    setProfileNavOpen(false);
  };

  // Toggle the dark mode
 

  // Toggle the mobile drawer
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  
  const id=1;
 
  const fetchImage = async () => {
    setLoading(true);
    setNoImage(false);
    try {
      const response = await axios.get(`http://localhost:9095/api/images/${id}`, {
        responseType: 'arraybuffer',
      });

      const base64 = Buffer.from(response.data, 'binary').toString('base64');
      const imageType = response.headers['content-type'];
      const base64Data = `data:${imageType};base64,${base64}`;
      setImageData(base64Data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching image:', error);
      setLoading(false);
      setNoImage(true);
    }
  };

  useEffect(()=>{
    const intervalId = setInterval(() => {
    fetchImage();
    }, 1000);
  },[])

  

  // State and functions for clock functionality
  const [clockedIn, setClockedIn] = useState(false);
  const [clockInTime, setClockInTime] = useState(null);
  const [clockOutTime, setClockOutTime] = useState(null);

  // Function to handle clock in
  const handleClockIn = () => {
    const now = new Date();
    setClockInTime(now);
    setClockedIn(true);
    setClockOutTime(null); // Clear the clock-out time on new clock-in
  };

  // Function to handle clock out
  const handleClockOut = () => {
    const now = new Date();
    setClockOutTime(now);
    setClockedIn(false);
    // Store the attendance data or send to server
    // You can add your logic here to handle attendance data storage
  };

  // Calculate total logged-in time
  const calculateTotalTime = () => {
    if (clockInTime && clockOutTime) {
      const totalTime = Math.abs(clockOutTime.getTime() - clockInTime.getTime());
      const totalHours = Math.floor(totalTime / (1000 * 60 * 60));
      const totalMinutes = Math.floor((totalTime / (1000 * 60)) % 60);
      const totalSeconds = Math.floor((totalTime / 1000) % 60);
      return `${totalHours} hours ${totalMinutes} minutes ${totalSeconds} seconds`;
    }
    return 'Clock in to calculate time';
  };
  const [notificationOpen, setNotificationOpen] = useState(false);
  const handleNotificationClick = () => {
    setNotificationOpen(true);
  };
  const handleNotificationClose = () => {
    setNotificationOpen(false);
  };
 
  return (
    <>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
     
      
        {/* Drawer for mobile */}
        <Drawer
          variant="persistent"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: '200px', // Define the width or use 'auto' for dynamic width
              boxSizing: 'border-box',
              marginTop: 0,
              paddingTop: 0, // Remove top margin
              backgroundColor: '#4615B2', // Change this line to set the background color of the Drawer
              color: '#FFFFFF', // Optional: Set the text color
            },
          }}
        >
          <Toolbar /> {/* Remove space at top */}
          <Box sx={{ overflow: 'hidden', padding: 1 }}>
            <TextField
              variant="outlined"
              placeholder="Search..."
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: '500px', // Make the search bar curved
                  backgroundColor: 'transparent', // Optional: Set background color
                  height: '40px',
                  color:'white' // Decrease the height
                },
              }}
            />
          </Box>
          {/* sidebar start */}
          <Box sx={{ overflow: 'hidden', display: 'flex', flexGrow: 1 }}>
            <List>
              {pages.map((page, index) => (
                <ListItem
                  button
                  key={index}
                  onClick={() => handleNavigation(page.path)}
                  selected={currentPath === page.path} // Highlight current page
                >
                  <ListItemIcon>{page.icon}</ListItemIcon>
                  <ListItemText primary={page.name} />
                </ListItem>
              ))}
              <ListItem 
                button 
                onClick={handleProfileMenuOpen}
                selected={profileOpen}
              >
                <ListItemIcon>
                  <AccountCircleIcon sx={{color:"white"}}/>
                </ListItemIcon>
                <ListItemText primary="Profile"  />
                {/* <ExpandMoreIcon /> */}
              </ListItem>
              <Popover
                open={profileOpen}
                anchorEl={profileAnchorEl}
                onClose={handleProfileMenuClose}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                PaperProps={{
                  sx: {
                    backgroundColor: '#4615B2', // Same as drawer background
                    color: 'white', // Same as drawer text color
                  },
                }}
              >
                <List component="nav" aria-label="profile-submenu">
                  {profileSubmenu.map((submenuItem, index) => (
                    <ListItem
                      button
                      key={index}
                      sx={{ paddingLeft: theme.spacing(2) }}
                      onClick={() => {
                        handleNavigation(submenuItem.path);
                        handleProfileMenuClose();
                      }}
                      selected={currentPath === submenuItem.path} // Highlight current page
                    >
                      <ListItemIcon>{submenuItem.icon}</ListItemIcon>
                      <ListItemText primary={submenuItem.name} />
                    </ListItem>
                  ))}
                </List>
              </Popover>
             
            </List>
          </Box>
          {/* end sidebar */}
        </Drawer>

        {/* Main content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: 'background.default',
            marginTop: 0,
            paddingTop: 0,
            transition: theme.transitions.create('margin', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: mobileOpen ? '160px' : '-100px', // Adjust margin for the main content based on sidebar state
          }}
        >
          {/* Navigation Bar */}
          <AppBar position="fixed" sx={{ backgroundColor: '#4615B2', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ marginRight: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                HR Forge
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
                {/* <Typography sx={{ marginRight: 2 }}>
                  {clockedIn ? `Clock In: ${clockInTime?.toLocaleTimeString()}` : `Clock Out: ${clockOutTime?.toLocaleTimeString()}`}
                </Typography>
                <Switch checked={clockedIn} onChange={clockedIn ? handleClockOut : handleClockIn} color="default" /> */}
                <IconButton color="inherit" onClick={() => handleNavigation('/settings')}>
                  <SettingsIcon sx={{ color: 'white' }} />
                </IconButton>
                <IconButton color="inherit" onClick={handleNotificationClick}>
                <NotificationsIcon />
              </IconButton>
                <IconButton color="inherit" onClick={handleProfileNavMenuOpen}>
                <Avatar src={imageData || ''} />
                </IconButton>
                <Snackbar
  open={notificationOpen}
  autoHideDuration={3000}
  onClose={handleNotificationClose}
  message="New Notification"

/>
                <Popover
                  open={isProfileNavMenuOpen}
                  anchorEl={profileNavAnchorEl}
                  onClose={handleProfileNavMenuClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  PaperProps={{
                    sx: {
                      backgroundColor: '#4615B2', // Same as app bar background
                      color: 'white', // Same as app bar text color
                    },
                  }}
                >
                  <List component="nav" aria-label="profile-nav-submenu">
                  <ListItem button onClick={() => {
                      handleNavigation('/my-profile');
                      handleProfileNavMenuClose();
                    }}>
                      <ListItemText primary="View Profile" />
                    </ListItem>
                    <ListItem button onClick={() => {
                      handleNavigation('/change-password');
                      handleProfileNavMenuClose();
                    }}>
                      <ListItemText primary="Change Password" />
                    </ListItem>
                    <ListItem button onClick={() => {
                      handleNavigation('/login');
                      handleProfileNavMenuClose();
                    }}>
                      <ListItemText primary="Logout" />
                    </ListItem>
                    <ListItem>
                    
              <Switch checked={darkMode} onChange={toggleDarkMode} />
              {darkMode ? 'Dark Mode' : 'Light Mode'}
          
                    </ListItem>
                  </List>
                </Popover>
              </Box>
            </Toolbar>
          </AppBar>
          <Toolbar /> 
        </Box>
       
      </Box>
    </>
  );
};
export default Navbar;
