import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
  IconButton,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useEmployeeContext } from "./EmployeeContext"; // Adjust the import path as needed
import DeleteIcon from "@mui/icons-material/Delete";
import { apiClient } from "@/lib/api";

const API_BASE_URL = "/api";

const FullTimeSalaryForm = () => {
  const { employeeData } = useEmployeeContext();
  const [formData, setFormData] = useState({
    id: null,
    employeeId: null,
    paymentDate: null,
    paymentPeriod: "",
    salaryStructureId: "",
    customBaseSalary: "",
    baseMultiplier: "",
    lopDays: "",
    customAllowances: [],
    customDeductions: [],
  });
  const [templates, setTemplates] = useState([]);
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [isSalaryAdded, setIsSalaryAdded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!formData.employeeId) {
        setFormData((prevData) => ({
          ...prevData,
          employeeId: employeeData.id || "",
        }));
      }

      if (templates.length === 0) {
        try {
          const response = await apiClient.get(
            `${API_BASE_URL}/salary-structures`
          );
          setTemplates(response.data);
        } catch (error) {
          console.log(error);
        }
      }

      if (employeeData.isExisting && employeeData.id && !formData.id) {
        try {
          const empRes = await apiClient.get(
            `${API_BASE_URL}/employees/${employeeData.id}`
          );
          const salaryId = empRes.data.currentSalaryId;
          const response = await apiClient.get(
            `${API_BASE_URL}/salaries/${salaryId}`
          );
          setFormData({
            ...response.data,
            paymentDate: response.data.paymentDate
              ? new Date(response.data.paymentDate)
              : null,
            salaryStructureId: response.data.salaryStructureId || "",
            customBaseSalary: response.data.customBaseSalary || "",
            baseMultiplier: response.data.baseMultiplier || "",
            lopDays: response.data.lopDays || "",
          });
        } catch (error) {
          console.error("Error fetching salary:", error);
        }
      }
    };

    fetchData();
  }, [employeeData.id, employeeData.isExisting, formData.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setFormData((prevData) => ({
      ...prevData,
      paymentDate: date,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.paymentPeriod)
      newErrors.paymentPeriod = "Payment Period is required";
    if (!formData.lopDays && formData.lopDays !== 0)
      newErrors.lopDays = "LOP Days is required";
    if (!formData.paymentDate)
      newErrors.paymentDate = "Payment Date is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setAlert({
        open: true,
        message: "Please fix the errors in the form",
        severity: "error",
      });
      return;
    }

    const payload = {
      type: "fulltime",
      ...formData,
      paymentDate: formData.paymentDate.toISOString().split("T")[0],
      customAllowances: formData.customAllowances.map((allowance) => ({
        allowanceId: allowance.allowanceId,
        amount: parseFloat(allowance.amount),
      })),
      customDeductions: formData.customDeductions.map((deduction) => ({
        deductionId: deduction.deductionId,
        amount: parseFloat(deduction.amount),
      })),
    };

    try {
      let response;
      if (formData.id) {
        response = await apiClient.put(
          `${API_BASE_URL}/salaries/${formData.id}`,
          payload
        );
      } else {
        response = await apiClient.post(`${API_BASE_URL}/salaries`, payload);
        console.log("Salary created:", response.data);

        const currentSalaryId = response.data.id;
        const employeeId = response.data.employeeId;

        const updatePayload = { currentSalaryId };
        await apiClient.put(
          `${API_BASE_URL}/employees/${employeeId}`,
          updatePayload
        );

        console.log("Employee updated with new salary ID");
      }
      setAlert({
        open: true,
        message: "Salary saved successfully",
        severity: "success",
      });
      setIsSalaryAdded(true);
    } catch (error) {
      console.error("Error:", error);
      setAlert({
        open: true,
        message: "Error saving salary",
        severity: "error",
      });
    }
  };

  const addAllowance = () => {
    setFormData((prevData) => ({
      ...prevData,
      customAllowances: [
        ...prevData.customAllowances,
        { allowanceId: "", amount: "" },
      ],
    }));
  };

  const removeAllowance = (index) => {
    setFormData((prevData) => {
      const newAllowances = [...prevData.customAllowances];
      newAllowances.splice(index, 1);
      return { ...prevData, customAllowances: newAllowances };
    });
  };

  const addDeduction = () => {
    setFormData((prevData) => ({
      ...prevData,
      customDeductions: [
        ...prevData.customDeductions,
        { deductionId: "", amount: "" },
      ],
    }));
  };

  const removeDeduction = (index) => {
    setFormData((prevData) => {
      const newDeductions = [...prevData.customDeductions];
      newDeductions.splice(index, 1);
      return { ...prevData, customDeductions: newDeductions };
    });
  };

  const handleAllowanceChange = (index, field, value) => {
    setFormData((prevData) => {
      const newAllowances = [...prevData.customAllowances];
      newAllowances[index][field] = value;
      return { ...prevData, customAllowances: newAllowances };
    });
  };

  const handleDeductionChange = (index, field, value) => {
    setFormData((prevData) => {
      const newDeductions = [...prevData.customDeductions];
      newDeductions[index][field] = value;
      return { ...prevData, customDeductions: newDeductions };
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container
        sx={{
          padding: "24px",
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: "800px",
          minHeight: "600px",
        }}
      >
        <Typography
          variant="h4"
          my={3}
          color="primary"
          textAlign="center"
          gutterBottom
        >
          {formData.id ? "Update" : "Create"} Full Time Salary
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Employee ID"
                name="employeeId"
                value={formData.employeeId}
                onChange={handleChange}
                disabled
                required
                sx={{ marginBottom: "16px" }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth sx={{ marginBottom: "16px" }}>
                {formData.id && <InputLabel>Salary Template</InputLabel>}
                <Select
                  value={formData.salaryStructureId}
                  name="salaryStructureId"
                  onChange={handleChange}
                  label="Salary Template"
                >
                  {templates.map((template) => (
                    <MenuItem key={template.id} value={template.id}>
                      {template.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Payment Period"
                name="paymentPeriod"
                value={formData.paymentPeriod}
                onChange={handleChange}
                required
                error={!!errors.paymentPeriod}
                helperText={errors.paymentPeriod}
                sx={{ marginBottom: "16px" }}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="LOP Days"
                name="lopDays"
                type="number"
                value={formData.lopDays}
                onChange={handleChange}
                required
                error={!!errors.lopDays}
                helperText={errors.lopDays}
                sx={{ marginBottom: "16px" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <DatePicker
                label="Payment Date"
                value={formData.paymentDate}
                onChange={handleDateChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    required
                    error={!!errors.paymentDate}
                    helperText={errors.paymentDate}
                    sx={{ marginBottom: "16px" }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Custom Base Salary"
                name="customBaseSalary"
                type="number"
                value={formData.customBaseSalary}
                onChange={handleChange}
                sx={{ marginBottom: "16px" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Base Multiplier"
                name="baseMultiplier"
                type="number"
                value={formData.baseMultiplier}
                onChange={handleChange}
                sx={{ marginBottom: "16px" }}
              />
            </Grid>

            {/* Custom Allowances */}
            <Grid item xs={12}>
              <Typography variant="h6">Custom Allowances</Typography>
              {formData.customAllowances.map((allowance, index) => (
                <Grid container spacing={2} key={index}>
                  <Grid item xs={5}>
                    <TextField
                      fullWidth
                      label="Allowance ID"
                      value={allowance.allowanceId}
                      onChange={(e) =>
                        handleAllowanceChange(
                          index,
                          "allowanceId",
                          e.target.value
                        )
                      }
                      margin="normal"
                      sx={{ marginBottom: "16px" }}
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      fullWidth
                      label="Amount"
                      type="number"
                      value={allowance.amount}
                      onChange={(e) =>
                        handleAllowanceChange(index, "amount", e.target.value)
                      }
                      margin="normal"
                      sx={{ marginBottom: "16px" }}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <IconButton
                      color="error"
                      onClick={() => removeAllowance(index)}
                      sx={{ marginTop: "24px" }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              ))}
              <Button onClick={addAllowance}>Add Allowance</Button>
            </Grid>

            {/* Custom Deductions */}
            <Grid item xs={12}>
              <Typography variant="h6">Custom Deductions</Typography>
              {formData.customDeductions.map((deduction, index) => (
                <Grid container spacing={2} key={index}>
                  <Grid item xs={5}>
                    <TextField
                      fullWidth
                      label="Deduction ID"
                      value={deduction.deductionId}
                      onChange={(e) =>
                        handleDeductionChange(
                          index,
                          "deductionId",
                          e.target.value
                        )
                      }
                      margin="normal"
                      sx={{ marginBottom: "16px" }}
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      fullWidth
                      label="Amount"
                      type="number"
                      value={deduction.amount}
                      onChange={(e) =>
                        handleDeductionChange(index, "amount", e.target.value)
                      }
                      margin="normal"
                      sx={{ marginBottom: "16px" }}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <IconButton
                      color="error"
                      onClick={() => removeDeduction(index)}
                      sx={{ marginTop: "24px" }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              ))}
              <Button onClick={addDeduction}>Add Deduction</Button>
            </Grid>

            {!isSalaryAdded && (
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Button type="submit" variant="contained" color="primary">
                    {formData.id ? "Update" : "Create"} Salary
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
    </LocalizationProvider>
  );
};

export default FullTimeSalaryForm;
