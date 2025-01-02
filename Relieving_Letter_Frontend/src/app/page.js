"use client";
import { TextField, Button, Box, Typography } from "@mui/material"; // Ensure correct import
import React, { useState, useEffect } from "react"; // Import useState and useEffect for managing form state and hydration
import axios from "axios"; // Import axios for making API calls

export default function YourComponent() {
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    joiningDate: "",
    relievingDate: "",
    relievingReason: "",
    companyAddress: "",
    companyName: "",
    email: "",
  });

  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      console.log("Submitting form data:", formData); // Log form data
      const response = await axios.post(
        "http://localhost:8080/api/employee",
        formData
      );
      console.log("Employee created:", response.data);
      alert("Offer letter sent successfully!"); // Added user feedback for success
    } catch (error) {
      console.error("Failed to Send realieving letter:", "Network Error"); // Improved error logging
      alert("Failed to send relieving letter. Please try again."); // Added user feedback for error
    }
  };

  if (!isHydrated) {
    return null;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        p: 2,
        margin: "auto",
        maxWidth: "sm",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Typography variant="h4" sx={{ mb: 2, color: "#007bff", width: "100%" }}>
        Relieving Letter{" "}
      </Typography>
      <TextField
        id="name"
        label="Name"
        variant="outlined"
        sx={{ mb: 2, width: "100%" }}
        onChange={handleChange}
        value={formData.name}
      />
      <TextField
        id="position"
        label="Position"
        variant="outlined"
        sx={{ mb: 2, width: "100%" }}
        onChange={handleChange}
        value={formData.position}
      />
      <TextField
        id="joiningDate"
        label="Joining Date"
        variant="outlined"
        sx={{ mb: 2, width: "100%" }}
        onChange={handleChange}
        type="date"
        InputLabelProps={{ shrink: true }}
        value={formData.joiningDate}
      />
      <TextField
        id="relievingDate"
        label="Relieving Date"
        variant="outlined"
        sx={{ mb: 2, width: "100%" }}
        onChange={handleChange}
        type="date"
        InputLabelProps={{ shrink: true }}
        value={formData.relievingDate}
      />
      <TextField
        id="relievingReason"
        label="Relieving Reason"
        variant="outlined"
        sx={{ mb: 2, width: "100%" }}
        onChange={handleChange}
        value={formData.relievingReason}
      />
      <TextField
        id="companyAddress"
        label="Company Address"
        variant="outlined"
        sx={{ mb: 2, width: "100%" }}
        onChange={handleChange}
        value={formData.companyAddress}
      />
      <TextField
        id="companyName"
        label="Company Name"
        variant="outlined"
        sx={{ mb: 2, width: "100%" }}
        onChange={handleChange}
        value={formData.companyName}
      />
      <TextField
        id="email"
        label="Email"
        variant="outlined"
        sx={{ mb: 2, width: "100%" }}
        onChange={handleChange}
        value={formData.email}
      />
      <Button
        variant="contained"
        color="primary"
        sx={{ width: "100%", backgroundColor: "#007bff" }}
        onClick={handleSubmit}
      >
        Generate Relieving Letter
      </Button>
    </Box>
  );
}
