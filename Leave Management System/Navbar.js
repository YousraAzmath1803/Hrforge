// import React from 'react'
// import NotificationsIcon from '@mui/icons-material/Notifications';
// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Box from '@mui/material';
// import AccountCircle from '@mui/icons-material/AccountCircle';



// const Navbar = () => {
//   return (
//     <>
//       <Box sx={{ flexGrow: 1 }}>
//         <AppBar position="static">
//           <Toolbar>

//             <Box sx={{ flexGrow: 1 }} />
//             <Box sx={{ display: { xs: 'none', md: 'flex' } }}>

//               <IconButton size="large"  color="inherit">
//                <NotificationsIcon />
//                </IconButton>
//               <IconButton size="large" edge="end" color="inherit">
//                 <AccountCircle />
//               </IconButton>
//             </Box>
//              </Toolbar>
//          </AppBar>
//          </Box>
//     </>
//   );
// }
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';


const Navbar = () => {
  return (
    <>
    


 

    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ backgroundColor: ' #879fdb' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            HR Forge
          </Typography>

          {/* Notifications Icon */}
          <Tooltip title="Notifications">
            <IconButton color="inherit">
              <NotificationsIcon />
            </IconButton>
          </Tooltip>

          {/* Profile Icon */}
          <Tooltip title="Account settings">
            <IconButton
              edge="end"
              color="inherit"
              // onClick={handleMenu}
            >
              <AccountCircle />
            </IconButton>
          </Tooltip>

          {/* Profile Menu */}
          <Menu
            // anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            // open={Boolean(anchorEl)}
            // onClose={handleClose}
          >
            <MenuItem>Profile</MenuItem>
            <MenuItem >My account</MenuItem>
            <MenuItem >Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
    </>
  );
};

export default Navbar;

    


