"use client";
import React, { useEffect, useState } from "react";
import {
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
  Snackbar,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/navigation";
import PropTypes from "prop-types";
import { apiClient } from "@/lib/api";

const EditAllowanceDeductionForm = ({ onClose, editItem = {}, editType }) => {
  const router = useRouter();
  const [country, setCountry] = useState([]);
  const [tabValue, setTabValue] = useState(editType === "allowance" ? 0 : 1);
  const [formData, setFormData] = useState({
    id: editItem.id || "",
    name: editItem.name || "",
    description: editItem.description || "",
    taxable: editItem.taxable || false,
    mandatory: editItem.mandatory || false,
    statutory: editItem.statutory || false,
    country_id: editItem.country_id || "",
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await apiClient.get("/api/org/country");
        setCountry(response.data);
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
      const endpoint =
        tabValue === 0
          ? `/api/allowances/${formData.id}`
          : `/api/deductions/${formData.id}`;
      const response = await apiClient.put(endpoint, formData);
      setSnackbar({
        open: true,
        message: "Form submitted successfully!",
        severity: "success",
      });
      onClose();
    } catch (error) {
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
        p: 4,
        boxShadow: 4,
        borderRadius: 3,
        bgcolor: "background.paper",
      }}
    >
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h5" color="primary" fontWeight="bold">
            {tabValue === 0 ? "Edit Allowance" : "Edit Deduction"}
          </Typography>
          <IconButton onClick={onClose} sx={{ color: "grey.600" }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ p: 2, bgcolor: "background.default", borderRadius: 2 }}
        >
          <Grid container spacing={3}>
            {/* Name Field */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="name"
                label="Name"
                value={formData.name}
                onChange={handleInputChange}
                variant="outlined"
                sx={{ mb: 2 }}
              />
            </Grid>

            {/* Description Field */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="description"
                label="Description"
                value={formData.description}
                onChange={handleInputChange}
                multiline
                minRows={3}
                variant="outlined"
                sx={{ mb: 2 }}
              />
            </Grid>

            {/* Country Selection */}
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                <InputLabel>Country</InputLabel>
                <Select
                  value={formData.country_id}
                  name="country_id"
                  onChange={handleInputChange}
                  label="Country"
                >
                  {country.map((c) => (
                    <MenuItem key={c.id} value={c.id}>
                      {c.countryName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Taxable/Statutory & Mandatory Checkboxes */}
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
              />
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Box
                sx={{
                  mt: 3,
                  display: "flex",
                  justifyContent: "center",
                  gap: 2,
                }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{ px: 4, py: 1.5 }}
                >
                  Save {tabValue === 0 ? "Allowance" : "Deduction"}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
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

EditAllowanceDeductionForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  editItem: PropTypes.object,
  editType: PropTypes.string.isRequired,
};

export default EditAllowanceDeductionForm;
