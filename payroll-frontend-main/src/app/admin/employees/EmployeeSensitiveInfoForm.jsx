"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Container,
  Grid,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import { useEmployeeContext } from "./EmployeeContext";
import { apiClient } from "@/lib/api";

const API_BASE_URL = "/api";

const EmployeeSensitiveInfoForm = () => {
  const { employeeData } = useEmployeeContext();
  const [formData, setFormData] = useState({
    pan: "",
    bankAccountNumber: "",
    bankName: "",
    ifscCode: "",
    aadhaarNumber: "",
    uan: "",
  });
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    const bankAccountRegex = /^[0-9]{9,18}$/;
    const bankNameRegex = /^[a-zA-Z\s]+$/;
    const ifscCodeRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
    const aadhaarNumberRegex = /^[0-9]{12}$/;
    const uanRegex = /^[0-9]{12}$/;

    if (!formData.pan || !panRegex.test(formData.pan))
      newErrors.pan = "Valid PAN is required";
    if (
      !formData.bankAccountNumber ||
      !bankAccountRegex.test(formData.bankAccountNumber)
    )
      newErrors.bankAccountNumber = "Valid Bank Account Number is required";
    if (!formData.bankName || !bankNameRegex.test(formData.bankName))
      newErrors.bankName = "Valid Bank Name is required";
    if (!formData.ifscCode || !ifscCodeRegex.test(formData.ifscCode))
      newErrors.ifscCode = "Valid IFSC Code is required";
    if (
      !formData.aadhaarNumber ||
      !aadhaarNumberRegex.test(formData.aadhaarNumber)
    )
      newErrors.aadhaarNumber = "Valid Aadhaar Number is required";
    if (!formData.uan || !uanRegex.test(formData.uan))
      newErrors.uan = "Valid UAN is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (employeeData.isExisting && employeeData.id && !formData.pan) {
      const fetchEmployee = async () => {
        try {
          const response = await apiClient.get(
            `${API_BASE_URL}/employees/${employeeData.id}/sensitive-info`
          );
          setFormData(response.data);
        } catch (error) {
          console.error("Error fetching employee Data:", error);
        }
      };
      fetchEmployee();
    }
  }, [employeeData.isExisting, employeeData.id, formData.pan]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setAlert({
        open: true,
        message: "Please fill in all required fields with valid data.",
        severity: "error",
      });
      return;
    }
    try {
      let response;
      if (employeeData.isExisting) {
        response = await apiClient.put(
          `${API_BASE_URL}/employees/${employeeData.id}/sensitive-info`,
          formData
        );
      } else {
        response = await apiClient.put(
          `${API_BASE_URL}/employees/${employeeData.id}/sensitive-info`,
          formData
        );
      }
      if (response.status === 200 || response.status === 201) {
        setAlert({
          open: true,
          message: "Employee sensitive information submitted successfully!",
          severity: "success",
        });
        setIsSubmitted(true);
      } else {
        setAlert({
          open: true,
          message:
            "Failed to submit employee sensitive information. Please try again.",
          severity: "error",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setAlert({
        open: true,
        message: "An error occurred. Please try again.",
        severity: "error",
      });
    }
  };

  return (
    <Container
      sx={{
        padding: "24px",
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        width: "100%",
        maxWidth: "800px",
      }}
    >
      <Typography
        variant="h4"
        my={3}
        color="primary"
        textAlign="center"
        gutterBottom
      >
        Employee Sensitive Information
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="PAN"
              name="pan"
              value={formData.pan}
              onChange={handleChange}
              required
              error={!!errors.pan}
              helperText={errors.pan}
              sx={{ marginBottom: "16px" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Bank Account Number"
              name="bankAccountNumber"
              value={formData.bankAccountNumber}
              onChange={handleChange}
              required
              error={!!errors.bankAccountNumber}
              helperText={errors.bankAccountNumber}
              sx={{ marginBottom: "16px" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Bank Name"
              name="bankName"
              value={formData.bankName}
              onChange={handleChange}
              required
              error={!!errors.bankName}
              helperText={errors.bankName}
              sx={{ marginBottom: "16px" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="IFSC Code"
              name="ifscCode"
              value={formData.ifscCode}
              onChange={handleChange}
              required
              error={!!errors.ifscCode}
              helperText={errors.ifscCode}
              sx={{ marginBottom: "16px" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Aadhaar Number"
              name="aadhaarNumber"
              value={formData.aadhaarNumber}
              onChange={handleChange}
              required
              error={!!errors.aadhaarNumber}
              helperText={errors.aadhaarNumber}
              sx={{ marginBottom: "16px" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="UAN"
              name="uan"
              type="number"
              value={formData.uan}
              onChange={handleChange}
              required
              error={!!errors.uan}
              helperText={errors.uan}
              sx={{ marginBottom: "16px" }}
            />
          </Grid>
          {!isSubmitted && (
            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button type="submit" variant="contained" color="primary">
                  Submit Information
                </Button>
              </Box>
            </Grid>
          )}
        </Grid>
      </form>
      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={() => setAlert({ ...alert, open: false })}
      >
        <Alert
          onClose={() => setAlert({ ...alert, open: false })}
          severity={alert.severity}
          sx={{ width: "100%" }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default EmployeeSensitiveInfoForm;
