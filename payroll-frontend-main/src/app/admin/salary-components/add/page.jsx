"use client";
import React, { useEffect, useState } from "react";
import {
  Tabs,
  Tab,
  Box,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Grid,
  Container,
  Typography,
  IconButton,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/navigation";
import PropTypes from "prop-types";
import { apiClient } from "@/lib/api";

const AllowanceDeductionForm = ({ onClose }) => {
  const router = useRouter();
  const [country, setCountry] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
    isTaxable: false,
    isMandatory: false,
    isStatutory: false,
    country_id: "",
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setFormData({
      id: "",
      name: "",
      description: "",
      taxable: false,
      mandatory: false,
      statutory: false,
      country_id: "",
    });
  };

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await apiClient.get("/api/org/country");
        setCountry(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error Fetching Countries: ", error);
      }
    };
    fetchCountries();
  }, []);

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const endpoint = tabValue === 0 ? "/api/allowances" : "/api/deductions";
      const response = await apiClient.post(endpoint, formData);
      console.log(formData);
      console.log("Form submitted successfully:", response.data);
      setSnackbar({
        open: true,
        message:
          tabValue === 0
            ? "Allowance added successfully!"
            : "Deduction added successfully!",
        severity: "success",
      });
      // Commented out the code for auto clear option after adding the details in the field
      // setFormData({
      //   id: "",
      //   name: "",
      //   description: "",
      //   taxable: false, // Reset taxable to false
      //   mandatory: false, // Reset mandatory to false
      //   statutory: false, // Reset statutory to false
      //   country_id: "",
      // });
    } catch (error) {
      console.log(formData);
      console.error("Error submitting form:", error);
      setSnackbar({
        open: true,
        message: "Error submitting form.",
        severity: "error",
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: 5,
        p: 3,
        borderRadius: 2,
        bgcolor: "#fff",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        position: "relative",
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          color: "#616161",
        }}
      >
        <CloseIcon />
      </IconButton>

      <Box sx={{ width: "100%", mb: 2 }}>
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{ fontWeight: "bold" }}
        >
          {tabValue === 0 ? "Add Allowance" : "Add Deduction"}
        </Typography>

        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          centered
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab label="Allowance" />
          <Tab label="Deduction" />
        </Tabs>
      </Box>

      <Box sx={{ mt: 3 }}>
        <form onSubmit={handleSubmit}>
          <Grid container justifyContent="center" spacing={3}>
            {/* Name Field */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="name"
                label="Name"
                variant="outlined"
                value={formData.name}
                onChange={handleInputChange}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "primary.main",
                    },
                  },
                }}
              />
            </Grid>

            {/* Description Field */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="description"
                label="Description"
                variant="outlined"
                value={formData.description}
                onChange={handleInputChange}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "primary.main",
                    },
                  },
                }}
              />
            </Grid>

            {/* Country Selection */}
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Country</InputLabel>
                <Select
                  value={formData.country_id}
                  name="country_id"
                  onChange={handleInputChange}
                  label="Country"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused fieldset": {
                        borderColor: "primary.main",
                      },
                    },
                  }}
                >
                  {country.map((country) => (
                    <MenuItem key={country.id} value={country.id}>
                      {country.countryName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Taxable and Mandatory Checkboxes */}
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              {tabValue === 0 ? (
                <FormControlLabel
                  control={
                    <Checkbox
                      name="taxable"
                      checked={formData.taxable}
                      onChange={handleInputChange}
                    />
                  }
                  label="Is Taxable"
                  sx={{
                    color: "#616161",
                    "& .MuiCheckbox-root": {
                      "&.Mui-checked": {
                        color: "primary.main",
                      },
                    },
                  }}
                />
              ) : (
                <FormControlLabel
                  control={
                    <Checkbox
                      name="statutory"
                      checked={formData.statutory}
                      onChange={handleInputChange}
                    />
                  }
                  label="Is Statutory"
                  sx={{
                    color: "#616161",
                    "& .MuiCheckbox-root": {
                      "&.Mui-checked": {
                        color: "primary.main",
                      },
                    },
                  }}
                />
              )}

              <FormControlLabel
                control={
                  <Checkbox
                    name="mandatory"
                    checked={formData.mandatory}
                    onChange={handleInputChange}
                  />
                }
                label="Is Mandatory"
                sx={{
                  color: "#616161",
                  "& .MuiCheckbox-root": {
                    "&.Mui-checked": {
                      color: "primary.main",
                    },
                  },
                }}
              />
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{
                    width: "50%",
                    bgcolor: "primary.main",
                    "&:hover": {
                      bgcolor: "primary.dark",
                    },
                  }}
                >
                  {tabValue === 0 ? "Add Allowance" : "Add Deduction"}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>

      {/* Snackbar Notification */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

AllowanceDeductionForm.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default AllowanceDeductionForm;
