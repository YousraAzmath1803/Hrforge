"use client";
import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  Grid,
  Tabs,
  Tab,
  Box,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Paper,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Alert,
  Snackbar,
} from "@mui/material";
import { apiClient } from "@/lib/api";

const API_BASE_URL = "/api";

const calculateAllowancesAndDeductions = (
  grossSalary,
  currentAllowances,
  currentDeductions
) => {
  const gross = parseFloat(grossSalary);

  if (!isNaN(gross)) {
    const basicSalary = gross * 0.5; // 50% of gross salary
    const housingAllowance = gross * 0.2; // 20% of gross salary
    const medicalReimbursement = gross * 0.05; // 5% of gross salary
    const transportAllowances = gross * 0.05; // 5% of gross salary
    const specialAllowances = gross * 0.3; // 30% of gross salary

    const providentFund = gross * 0.12; // 12% of gross salary
    const professionalTax = gross * 0.02; // 2% of gross salary

    const updatedAllowances = currentAllowances.map((allowance) => {
      switch (allowance.allowanceId) {
        case "housing":
          return { ...allowance, amount: Math.round(housingAllowance) };
        case "medical":
          return { ...allowance, amount: Math.round(medicalReimbursement) };
        case "transport":
          return { ...allowance, amount: Math.round(transportAllowances) };
        case "special":
          return { ...allowance, amount: Math.round(specialAllowances) };
        default:
          return allowance;
      }
    });

    const updatedDeductions = currentDeductions.map((deduction) => {
      switch (deduction.deductionId) {
        case "providentFund":
          return { ...deduction, amount: Math.round(providentFund) };
        case "professionalTax":
          return { ...deduction, amount: Math.round(professionalTax) };
        default:
          return deduction;
      }
    });

    return {
      baseSalary: Math.round(basicSalary),
      structureAllowances: updatedAllowances,
      structureDeductions: updatedDeductions,
    };
  }
  return {};
};

const SalaryStructureForm = ({ templateId }) => {
  const [loading, setLoading] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [allowances, setAllowances] = useState([]);
  const [deductions, setDeductions] = useState([]);
  const [countries, setCountries] = useState([]);
  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    baseSalary: "",
    grossSalary: "", // Added grossSalary to formValues
    countryId: "",
    structureAllowances: [],
    structureDeductions: [],
  });
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [allowancesRes, deductionsRes, countriesRes] = await Promise.all([
          apiClient.get(`${API_BASE_URL}/allowances`),
          apiClient.get(`${API_BASE_URL}/deductions`),
          apiClient.get(`${API_BASE_URL}/org/country`),
        ]);

        setAllowances(allowancesRes.data);
        setDeductions(deductionsRes.data);
        setCountries(countriesRes.data);

        if (templateId) {
          const templateRes = await apiClient.get(
            `${API_BASE_URL}/salary-structures/${templateId}`
          );
          setFormValues(templateRes.data);
        } else {
          const mandatoryAllowances = allowancesRes.data
            .filter((a) => a.mandatory)
            .map((a) => ({ allowanceId: a.id, name: a.name, amount: "" }));
          const mandatoryDeductions = deductionsRes.data
            .filter((d) => d.mandatory)
            .map((d) => ({ deductionId: d.id, name: d.name, amount: "" }));

          setFormValues((prev) => ({
            ...prev,
            structureAllowances: mandatoryAllowances,
            structureDeductions: mandatoryDeductions,
          }));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setAlert({
          open: true,
          message: "Error fetching data",
          severity: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [templateId]);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => {
      const updatedValues = { ...prev, [name]: value };
      if (name === "grossSalary") {
        const calculatedValues = calculateAllowancesAndDeductions(
          value,
          prev.structureAllowances,
          prev.structureDeductions
        );
        return { ...updatedValues, ...calculatedValues };
      }
      return updatedValues;
    });
  };

  const handleAmountChange = (type, id, amount) => {
    const key =
      type === "allowance" ? "structureAllowances" : "structureDeductions";
    const idKey = type === "allowance" ? "allowanceId" : "deductionId";

    setFormValues((prev) => ({
      ...prev,
      [key]: prev[key].map((item) =>
        item[idKey] === id ? { ...item, amount } : item
      ),
    }));
  };

  const handleAddItem = (type, item) => {
    const key =
      type === "allowance" ? "structureAllowances" : "structureDeductions";
    const idKey = type === "allowance" ? "allowanceId" : "deductionId";

    setFormValues((prev) => ({
      ...prev,
      [key]: [...prev[key], { [idKey]: item.id, name: item.name, amount: "" }],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (templateId) {
        await apiClient.put(
          `${API_BASE_URL}/salary-structures/${templateId}`,
          formValues
        );
        setAlert({
          open: true,
          message: "Salary structure updated successfully!",
          severity: "success",
        });
      } else {
        await apiClient.post(`${API_BASE_URL}/salary-structures`, formValues);
        setAlert({
          open: true,
          message: "Salary structure created successfully!",
          severity: "success",
        });
      }
    } catch (error) {
      console.error("Error submitting salary structure:", error);
      setAlert({
        open: true,
        message: "Error submitting salary structure. Please try again.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const renderItems = (type) => {
    const items = type === "allowance" ? allowances : deductions;
    const formKey =
      type === "allowance" ? "structureAllowances" : "structureDeductions";
    const idKey = type === "allowance" ? "allowanceId" : "deductionId";

    return (
      <>
        {formValues[formKey].map((item) => {
          const foundItem = items.find((i) => i.id === item[idKey]);
          return (
            <Grid container spacing={2} key={item[idKey]} sx={{ mb: 2 }}>
              <Grid item xs={6}>
                <Typography>{item.name || foundItem?.name}</Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Amount"
                  type="number"
                  value={item.amount}
                  onChange={(e) =>
                    handleAmountChange(type, item[idKey], e.target.value)
                  }
                  sx={{ bgcolor: "#f9f9f9", borderRadius: 1 }}
                />
              </Grid>
            </Grid>
          );
        })}
      </>
    );
  };

  const [showAddDialog, setShowAddDialog] = useState(false);

  const AddItemDialog = ({ type }) => {
    const [selectedItem, setSelectedItem] = useState("");

    const handleAdd = () => {
      if (selectedItem) {
        const item = (type === "allowance" ? allowances : deductions).find(
          (i) => i.id === selectedItem
        );
        handleAddItem(type, item);
        setShowAddDialog(false);
        setSelectedItem("");
      }
    };

    const items = type === "allowance" ? allowances : deductions;
    const formKey =
      type === "allowance" ? "structureAllowances" : "structureDeductions";
    const idKey = type === "allowance" ? "allowanceId" : "deductionId";

    const availableItems = items.filter(
      (item) => !formValues[formKey].some((i) => i[idKey] === item.id)
    );

    return (
      <Dialog
        open={showAddDialog}
        onClose={() => setShowAddDialog(false)}
        maxWidth="md"
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: 2,
            p: 2,
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: "bold", fontSize: "1.5rem" }}>
          Add {type === "allowance" ? "Allowance" : "Deduction"}
        </DialogTitle>
        <DialogContent>
          {/* <FormControl fullWidth required sx={{ mt: 2 }}> */}

          <Select
            value={selectedItem}
            onChange={(e) => setSelectedItem(e.target.value)}
            displayEmpty
            sx={{ bgcolor: "#f9f9f9", borderRadius: 1 }}
            MenuProps={{
              PaperProps: {
                sx: {
                  maxHeight: 200,
                },
              },
            }}
          >
            <MenuItem value="" disabled>
              <em>Select {type === "allowance" ? "Allowance" : "Deduction"}</em>
            </MenuItem>
            {availableItems.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
          {/* </FormControl> */}
        </DialogContent>
        <DialogActions sx={{ justifyContent: "space-between", p: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAdd}
            sx={{ textTransform: "none" }}
          >
            Add
          </Button>
          <Button
            onClick={() => setShowAddDialog(false)}
            sx={{ ml: 1, textTransform: "none" }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="200px"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container
      maxWidth="md"
      sx={{
        mt: 5,
        p: 3,
        borderRadius: 2,
        bgcolor: "#fff",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formValues.name}
              onChange={handleChange}
              required
              sx={{ bgcolor: "#f9f9f9", borderRadius: 1 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={formValues.description}
              onChange={handleChange}
              sx={{ bgcolor: "#f9f9f9", borderRadius: 1 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Base Salary"
              name="baseSalary"
              type="number"
              value={formValues.baseSalary}
              onChange={(e) => {
                handleChange(e);
                const calculatedValues = calculateAllowancesAndDeductions(
                  formValues.grossSalary
                );
                setFormValues((prev) => ({
                  ...prev,
                  ...calculatedValues,
                }));
              }}
              required
              sx={{ bgcolor: "#f9f9f9", borderRadius: 1 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Gross Salary"
              name="grossSalary"
              type="number"
              value={formValues.grossSalary}
              onChange={(e) => {
                handleChange(e);
                const calculatedValues = calculateAllowancesAndDeductions(
                  e.target.value
                );
                setFormValues((prev) => ({
                  ...prev,
                  ...calculatedValues,
                }));
              }}
              required
              sx={{ bgcolor: "#f9f9f9", borderRadius: 1 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl
              fullWidth
              required
              sx={{ bgcolor: "#f9f9f9", borderRadius: 1 }}
            >
              <InputLabel shrink>Country</InputLabel>
              <Select
                value={formValues.countryId}
                name="countryId"
                onChange={handleChange}
                label="Country"
                displayEmpty
              >
                <MenuItem value="" disabled>
                  <em>Select Country</em>
                </MenuItem>
                {countries.map((country) => (
                  <MenuItem key={country.id} value={country.id}>
                    {country.countryName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
          <Tabs value={tabIndex} onChange={handleTabChange} centered>
            <Tab label="Allowances" />
            <Tab label="Deductions" />
          </Tabs>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h6">
            {tabIndex === 0 ? "Allowances" : "Deductions"}
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setShowAddDialog(true)}
            sx={{ textTransform: "none" }}
          >
            Add {tabIndex === 0 ? "Allowance" : "Deduction"}
          </Button>
        </Box>

        <Box sx={{ p: 3 }}>
          {tabIndex === 0 && renderItems("allowance")}
          {tabIndex === 1 && renderItems("deduction")}
        </Box>

        {showAddDialog && (
          <AddItemDialog type={tabIndex === 0 ? "allowance" : "deduction"} />
        )}

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 4, textTransform: "none" }}
          >
            {templateId ? "Update" : "Create"} Salary Structure
          </Button>
        </Box>
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

export default SalaryStructureForm;
