"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from 'next/navigation';
import { Box, Grid, Paper, Typography, Button, Avatar, List, ListItem, ListItemText, CircularProgress } from "@mui/material";
import { styled } from "@mui/system";
import DescriptionIcon from "@mui/icons-material/Description";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import PeopleIcon from "@mui/icons-material/People";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const API_BASE_URL = "/api";

const DashboardPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: "center",
  color: theme.palette.text ? theme.palette.text.secondary : "inherit",
  height: "100%",
  borderRadius: "12px",
  boxShadow: "0 6px 20px rgba(0, 0, 0, 0.12)",
}));

const fakePayrollData = [
  { month: "January", amount: "$20,000" },
  { month: "February", amount: "$22,000" },
  { month: "March", amount: "$18,000" },
  { month: "April", amount: "$25,000" },
  { month: "May", amount: "$23,000" },
  { month: "June", amount: "$19,000" },
];

const fakeRecentActivities = [
  "John Doe updated his profile.",
  "Jane Smith generated a payslip.",
  "Admin added a new employee.",
  "John Doe requested leave.",
  "Jane Smith updated her bank details.",
  "Admin removed an employee.",
];

const HomePage = () => {
  const payrollRef = useRef(null);
  const activitiesRef = useRef(null);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const scrollInterval = setInterval(() => {
      if (payrollRef.current) {
        payrollRef.current.scrollTop += 1;
        if (payrollRef.current.scrollTop >= payrollRef.current.scrollHeight - payrollRef.current.clientHeight) {
          payrollRef.current.scrollTop = 0;
        }
      }
      if (activitiesRef.current) {
        activitiesRef.current.scrollTop += 1;
        if (activitiesRef.current.scrollTop >= activitiesRef.current.scrollHeight - activitiesRef.current.clientHeight) {
          activitiesRef.current.scrollTop = 0;
        }
      }
    }, 50);

    setLoading(false);

    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <Box sx={{ flexGrow: 1, p: 3, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#124E66", textAlign: "center" }}>
        Payroll Management Dashboard
      </Typography>
      
      {/* Welcome Section */}
      <Box sx={{ mb: 4, p: 3, backgroundColor: "#ffffff", borderRadius: 2, boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#124E66" }}>Welcome, Admin!</Typography>
        <Typography variant="body1" sx={{ color: "#555555" }}>Manage payroll, employees, and more from here.</Typography>
      </Box>
      
      {/* Quick Actions */}
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardPaper elevation={3}>
            <Avatar sx={{ bgcolor: "#00796b", margin: "auto", width: 56, height: 56 }}>
              <PeopleIcon fontSize="large" />
            </Avatar>
            <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold", color: "#124E66" }}>Employees</Typography>
            <Typography variant="body2" sx={{ color: "#555555" }}>Manage all employees.</Typography>
            <Button variant="contained" sx={{ mt: 2, backgroundColor: "#124E66", '&:hover': { backgroundColor: "#0d3b4f" }, borderRadius: "8px" }} onClick={() => router.push('/admin/employees')}>View Employees</Button>
          </DashboardPaper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <DashboardPaper elevation={3}>
            <Avatar sx={{ bgcolor: "#d32f2f", margin: "auto", width: 56, height: 56 }}>
              <DescriptionIcon fontSize="large" />
            </Avatar>
            <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold", color: "#124E66" }}>Create Template</Typography>
            <Typography variant="body2" sx={{ color: "#555555" }}>Design new templates.</Typography>
            <Button variant="contained" sx={{ mt: 2, backgroundColor: "#124E66", '&:hover': { backgroundColor: "#0d3b4f" }, borderRadius: "8px" }} onClick={() => router.push('/admin/salary-templates/create')}>Create Template</Button>
          </DashboardPaper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <DashboardPaper elevation={3}>
            <Avatar sx={{ bgcolor: "#f57c00", margin: "auto", width: 56, height: 56 }}>
              <AccountBalanceWalletIcon fontSize="large" />
            </Avatar>
            <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold", color: "#124E66" }}>Payslip</Typography>
            <Typography variant="body2" sx={{ color: "#555555" }}>Generate employee payslips.</Typography>
            <Button variant="contained" sx={{ mt: 2, backgroundColor: "#124E66", '&:hover': { backgroundColor: "#0d3b4f" }, borderRadius: "8px" }} onClick={() => router.push('/admin/Payslip')}>Create Payslip</Button>
          </DashboardPaper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <DashboardPaper elevation={3}>
            <Avatar sx={{ bgcolor: "#3f51b5", margin: "auto", width: 56, height: 56 }}>
              <CloudUploadIcon fontSize="large" />
            </Avatar>
            <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold", color: "#124E66" }}>Bulk Upload</Typography>
            <Typography variant="body2" sx={{ color: "#555555" }}>Upload multiple records at once.</Typography>
            <Button variant="contained" sx={{ mt: 2, backgroundColor: "#124E66", '&:hover': { backgroundColor: "#0d3b4f" }, borderRadius: "8px" }} onClick={() => router.push('/admin/BulkUpload')}>Upload Files</Button>
          </DashboardPaper>
        </Grid>

      </Grid>

      {/* Summary or Charts Section */}
      <Grid container spacing={4} sx={{ mt: 4 }}>
        <Grid item xs={12} md={6}>
          <DashboardPaper>
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#124E66" }}>Payroll Overview</Typography>
            {loading ? (
              <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                <CircularProgress />
              </Box>
            ) : (
              <Box ref={payrollRef} sx={{ height: 200, overflow: "hidden", mt: 2 }}>
                <List>
                  {fakePayrollData.map((data, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={`${data.month}: ${data.amount}`} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}
          </DashboardPaper>
        </Grid>

        <Grid item xs={12} md={6}>
          <DashboardPaper>
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#124E66" }}>Recent Activities</Typography>
            {loading ? (
              <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                <CircularProgress />
              </Box>
            ) : (
              <Box ref={activitiesRef} sx={{ height: 200, overflow: "hidden", mt: 2 }}>
                <List>
                  {fakeRecentActivities.map((activity, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={activity} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}
          </DashboardPaper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePage;
