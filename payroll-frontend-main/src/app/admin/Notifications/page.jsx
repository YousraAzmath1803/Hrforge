"use client"
import React, { useState, useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider, Paper, Avatar, IconButton, Badge } from '@mui/material';
import { styled } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete';
import NotificationsIcon from '@mui/icons-material/Notifications';

const API_BASE_URL = "/api";

const NotificationPaper = styled(Paper)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  padding: theme.spacing(2),
  backgroundColor: '#f5f5f5', // Soft grey background
  borderRadius: theme.spacing(1), // Slightly rounded corners
  borderLeft: `5px solid #124E66`, // Blue border for emphasis
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.02)', // Subtle hover effect
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.12)', // Soft shadow
  },
}));

const NotificationAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: '#124E66', // Blue background
  color: '#ffffff', // White icon color
  marginRight: theme.spacing(2),
}));

const NotificationDate = styled(Typography)(({ theme }) => ({
  color: theme.palette.text ? theme.palette.text.secondary : '#000000', // Fallback to black if theme.palette.text is undefined
  fontSize: '0.8rem',
  marginTop: theme.spacing(0.5),
}));

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchedNotifications = [
      { id: 1, type: 'Payroll Update', message: 'Payroll for the month of June has been processed.', date: new Date(2023, 7, 1) },
      { id: 2, type: 'Salary Disbursement', message: 'Salaries have been disbursed to all employees.', date: new Date(2023, 7, 5) },
      { id: 3, type: 'Tax Deduction', message: 'Tax deductions for the fiscal year have been updated.', date: new Date(2023, 7, 10) },
      { id: 4, type: 'Bonus Announcement', message: 'Annual bonuses will be credited by the end of this month.', date: new Date(2023, 7, 15) },
      { id: 5, type: 'Payroll Reminder', message: 'Please review and approve the payroll for the next month.', date: new Date(2023, 7, 20) },
    ];

    setNotifications(fetchedNotifications);
  }, []);

  const handleDelete = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  const formatDistanceToNow = (date) => {
    const now = new Date();
    const distance = now - date;
    const minutes = Math.floor(distance / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''}`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''}`;
    } else {
      return `${minutes} minute${minutes > 1 ? 's' : ''}`;
    }
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: '#ffffff', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#124E66', textAlign: 'center' }}>
        Notifications
      </Typography>
      <List>
        {notifications.map((notification) => (
          <React.Fragment key={notification.id}>
            <NotificationPaper elevation={3}>
              <ListItem
                secondaryAction={
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(notification.id)}>
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <NotificationAvatar>
                  <NotificationsIcon />
                </NotificationAvatar>
                <ListItemText
                  primary={notification.type}
                  secondary={notification.message}
                />
              </ListItem>
              <NotificationDate variant="body2">
                {formatDistanceToNow(notification.date)} ago
              </NotificationDate>
            </NotificationPaper>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default NotificationsPage;
