'use client';
import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Collapse } from '@mui/material';
import Link from 'next/link';
import { Home, People, EventNote, AddCircle, Settings, ExpandLess, ExpandMore } from '@mui/icons-material';


const Sidebar = () => {

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        
        // width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box',backgroundColor: '' },
      }}
    >
      <List>
        <ListItem button component={Link} href="/">
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} href="/attendance">
          <ListItemIcon>
            <People />
          </ListItemIcon>
          <ListItemText primary="Attendance" />
        </ListItem>
        <ListItem button onClick={handleClick}>
          <ListItemIcon>
            <EventNote />
          </ListItemIcon>
          <ListItemText primary="Holiday" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button component={Link} href="/AddHoliday" sx={{ pl: 4 }}>
              <ListItemIcon>
                <AddCircle />
              </ListItemIcon>
              <ListItemText primary="Add Holiday" />
            </ListItem>
            <ListItem button component={Link} href="/ManageHoliday" sx={{ pl: 4 }}>
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText primary="Manage Holiday" />
            </ListItem>
          </List>
        </Collapse>



      </List>
    </Drawer>
  );
};

export default Sidebar;


