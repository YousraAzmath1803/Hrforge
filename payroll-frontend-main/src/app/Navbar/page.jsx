"use client";
import React, { useState, useEffect } from "react";
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
} from "@mui/material";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BadgeIcon from "@mui/icons-material/Badge";
import HomeIcon from "@mui/icons-material/Home";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AssessmentIcon from "@mui/icons-material/Assessment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DescriptionIcon from "@mui/icons-material/Description";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import UploadIcon from "@mui/icons-material/CloudUpload"; // Added import for UploadIcon
import ReceiptIcon from "@mui/icons-material/Receipt"; // Added import for ReceiptIcon
import { useRouter } from "next/navigation";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Link from "next/link";

const Navbar = () => {
  const router = useRouter();
  const currentPath =
    typeof window !== "undefined" ? window.location.pathname : "";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null); // Added state for profile dropdown
  const theme = useTheme();
  const [pages, setPages] = useState([
    {
      name: "Home",
      path: "/admin/Home",
      icon: <HomeIcon sx={{ color: "white" }} />,
    },
    {
      name: "Employees",
      path: "/admin/employees",
      icon: <AccountCircleIcon sx={{ color: "white" }} />,
    },
    {
      name: "Create Template",
      path: "/admin/salary-templates/create",
      icon: <DescriptionIcon sx={{ color: "white" }} />,
    },
    {
      name: "Bulk Upload",
      path: "/admin/BulkUpload",
      icon: <UploadIcon sx={{ color: "white" }} />,
    },
    {
      name: "Allowances & Deductions",
      path: "/admin/salary-components",
      icon: <AttachMoneyIcon sx={{ color: "white" }} />,
    },
    {
      name: "Payslip",
      path: "/admin/Payslip",
      icon: <ReceiptIcon sx={{ color: "white" }} />,
    },
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

  const handleLogout = () => {
    router.push("/Login");
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 600) {
        setMobileOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <ThemeProvider theme={createTheme({})}>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        <Drawer
          variant="permanent"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          sx={{
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: mobileOpen ? "200px" : "60px",
              boxSizing: "border-box",
              backgroundColor: "#124E66",
              color: "white",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              borderRadius: "0 4px 4px 0",
              transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
            },
          }}
        >
          <Toolbar />
          <List>
            {pages.map((page, index) => (
              <ListItem
                button
                key={index}
                onClick={() => handleNavigation(page.path)}
                selected={currentPath === page.path}
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                    cursor: "pointer",
                  },
                  justifyContent: mobileOpen ? "initial" : "center",
                  px: 2.5,
                  minHeight: "48px", // Adjusted height
                }}
              >
                <Tooltip
                  title={mobileOpen ? "" : page.name}
                  placement="right"
                  disableHoverListener={mobileOpen}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: "48px", // Adjusted width
                      height: "48px", // Adjusted height
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                    }}
                  >
                    {page.icon}
                  </ListItemIcon>
                </Tooltip>
                {mobileOpen && (
                  <ListItemText primary={page.name} sx={{ color: "white" }} />
                )}
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: "background.default",
            marginTop: 0,
            paddingTop: 0,
            transition: theme.transitions.create("margin", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: mobileOpen ? "200px" : "60px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <AppBar
            position="fixed"
            sx={{
              backgroundColor: "#124E66",
              zIndex: 1201,
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
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
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, fontWeight: "bold" }}
              >
                Payroll
              </Typography>
              <IconButton color="inherit" aria-label="notifications">
                <Link href="/admin/Notifications" passHref>
                  <NotificationsIcon sx={{ color: "white" }} />
                </Link>
              </IconButton>
              <IconButton color="inherit" aria-label="settings">
                <Link href="/admin/Settings" passHref>
                  <SettingsIcon sx={{ color: "white" }} />
                </Link>
              </IconButton>
              <IconButton
                color="inherit"
                aria-label="profile"
                onClick={handleProfileMenuOpen}
              >
                <AccountCircleIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleProfileMenuClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
                sx={{
                  "& .MuiMenuItem-root": {
                    "&:hover": {
                      backgroundColor: "#f0f0f0",
                    },
                  },
                  marginTop: "12px",
                  padding: "10px",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  "& .MuiPaper-root": {
                    borderRadius: "8px",
                  },
                }}
              >
                <MenuItem
                  onClick={handleProfileMenuClose}
                  sx={{
                    padding: "10px 20px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    borderRadius: "4px",
                    "&:hover": {
                      backgroundColor: "#e0e0e0",
                    },
                  }}
                >
                  <Link
                    href="/admin/Profile"
                    passHref
                    style={{ textDecoration: "none" }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <AccountCircleIcon sx={{ color: "#124E66" }} />
                      <Typography
                        variant="body1"
                        color="text.primary"
                        sx={{ textDecoration: "none" }}
                      >
                        Profile
                      </Typography>
                    </Box>
                  </Link>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleProfileMenuClose();
                    handleLogout();
                  }}
                  sx={{
                    padding: "10px 20px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    borderRadius: "4px",
                    "&:hover": {
                      backgroundColor: "#e0e0e0",
                    },
                  }}
                >
                  <LogoutIcon sx={{ color: "#124E66" }} />
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
