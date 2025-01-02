'use client';
import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  useTheme,
  Tooltip,
  Menu,
  MenuItem,
} from '@mui/material';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BadgeIcon from '@mui/icons-material/Badge';
import HomeIcon from '@mui/icons-material/Home';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AssessmentIcon from '@mui/icons-material/Assessment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DescriptionIcon from '@mui/icons-material/Description';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { useRouter } from 'next/navigation';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Link from 'next/link';

const Navbar = () => {
  const router = useRouter();
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const [pages, setPages] = useState([
    { name: 'Home', path: '', icon: <HomeIcon sx={{ color: 'white' }} /> },
    { name: 'User Management', path: '/Pages/Employee', icon: <FileCopyIcon sx={{ color: 'white' }} /> }
  ]);

  const handleNavigation = (path) => {
    router.push(path);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 600) {
        setMobileOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const drawerStyles = {
    flexShrink: 0,
    '& .MuiDrawer-paper': {
      width: mobileOpen ? '220px' : '70px',
      boxSizing: 'border-box',
      marginTop: 0,
      paddingTop: 0,
      backgroundColor: '#2C3E50',
      color: '#ECF0F1',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      borderRadius: '0 8px 8px 0',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
  };

  const listItemStyles = {
    '&:hover': {
      backgroundColor: 'rgba(236, 240, 241, 0.2)',
    },
    justifyContent: mobileOpen ? 'initial' : 'center',
    px: 2.5,
    minHeight: '56px',
  };

  const listItemIconStyles = {
    minWidth: '56px',
    height: '56px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ECF0F1',
  };

  const menuItemStyles = {
    padding: '10px 20px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    borderRadius: '4px',
    '&:hover': {
      backgroundColor: '#1ABC9C',
      color: 'white',
    },
  };

  return (
    <ThemeProvider theme={createTheme({})}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <Drawer
          variant="permanent"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          sx={drawerStyles}
        >
          <Toolbar />
          <List>
            {pages.map((page, index) => (
              <ListItem
                button // Ensure this is a boolean
                key={index}
                onClick={() => handleNavigation(page.path)}
                selected={currentPath === page.path}
                sx={listItemStyles}
              >
                <Tooltip title={mobileOpen ? '' : page.name} placement="right" disableHoverListener={mobileOpen}>
                  <ListItemIcon sx={listItemIconStyles}>
                    {page.icon}
                  </ListItemIcon>
                </Tooltip>
                {mobileOpen && <ListItemText primary={page.name} sx={{ color: '#ECF0F1' }} />}
              </ListItem>
            ))}
          </List>
        </Drawer>
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
            marginLeft: mobileOpen ? '220px' : '70px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}
        >
          <AppBar position="fixed" sx={{ background: 'linear-gradient(45deg, #1ABC9C, #16A085)', zIndex: 1201, boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ marginRight: 2 }}
              >
                <MenuOpenIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                Payroll
              </Typography>
              <IconButton color="inherit" aria-label="notifications">
                <Link href="/Notifications" passHref>
                  <NotificationsIcon sx={{ color: 'white' }} />
                </Link>
              </IconButton>
              <IconButton color="inherit" aria-label="profile" onClick={handleProfileMenuOpen}>
                <AccountCircleIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleProfileMenuClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
                sx={{
                  '& .MuiMenuItem-root': {
                    '&:hover': {
                      backgroundColor: '#1ABC9C',
                      color: 'white',
                    },
                  },
                  marginTop: '12px',
                  padding: '10px',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  '& .MuiPaper-root': {
                    borderRadius: '8px',
                  },
                }}
              >
                <MenuItem onClick={handleProfileMenuClose} sx={menuItemStyles}>
                  <AccountCircleIcon sx={{ color: '#2C3E50' }} />
                  <Typography variant="body1" color="text.primary">
                    Profile
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleProfileMenuClose} sx={menuItemStyles}>
                  <LogoutIcon sx={{ color: '#2C3E50' }} />
                  <Typography variant="body1" color="text.primary">
                    Logout
                  </Typography>
                </MenuItem>
              </Menu>
            </Toolbar>
          </AppBar>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Navbar;