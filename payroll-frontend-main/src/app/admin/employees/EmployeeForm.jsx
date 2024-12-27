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
  Switch,
  Snackbar,
  Alert,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import axios from "axios";
import { useEmployeeContext } from "./EmployeeContext";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/api";

const API_BASE_URL = "/api";

const EmployeeForm = () => {
  const router = useRouter();
  const { employeeData, updateEmployeeData } = useEmployeeContext();
  const [employee, setEmployee] = useState({
    employeeId: null,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    hireDate: null,
    employeeType: "",
    jobId: null,
    departmentId: null,
    enabled: true,
    currentSalaryId: null,
    countryId: null,
  });

  const [jobs, setJobs] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [employeeTypes, setEmployeeTypes] = useState([]);
  const [countries, setCountries] = useState([]);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const [isEmployeeAdded, setIsEmployeeAdded] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [jobsRes, deptsRes, typesRes, countriesRes] = await Promise.all([
          apiClient.get(`${API_BASE_URL}/jobs`),
          apiClient.get(`${API_BASE_URL}/departments`),
          apiClient.get(`${API_BASE_URL}/employees/employee-types`),
          apiClient.get(`${API_BASE_URL}/org/country`),
        ]);

        setJobs(jobsRes.data);
        setDepartments(deptsRes.data);
        setEmployeeTypes(typesRes.data);
        setCountries(countriesRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (employeeData.isExisting && employeeData.id && !employee.employeeId) {
      const fetchEmployee = async () => {
        try {
          const response = await apiClient.get(
            `${API_BASE_URL}/employees/${employeeData.id}`
          );
          const fetchedData = response.data;
          setEmployee({
            ...response.data,
            jobId: fetchedData.job?.jobId || null,
            departmentId: fetchedData.department?.departmentId || null,
            countryId: fetchedData.country?.id || null,
            hireDate: response.data.hireDate
              ? new Date(response.data.hireDate)
              : null,
          });
        } catch (error) {
          console.error("Error fetching employee:", error);
        }
      };
      fetchEmployee();
    }
  }, [employeeData.isExisting, employeeData.id, employee.employeeId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
    console.log(name, value);
  };

  const handleDateChange = (date) => {
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      hireDate: date,
    }));
  };

  const handleEnabled = (event) => {
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      enabled: event.target.checked,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!employee.firstName) newErrors.firstName = "First Name is required";
    if (!employee.lastName) newErrors.lastName = "Last Name is required";
    if (!employee.email || !emailRegex.test(employee.email))
      newErrors.email = "Valid Email is required";
    if (!employee.hireDate) newErrors.hireDate = "Hire Date is required";
    if (!employee.employeeType)
      newErrors.employeeType = "Employee Type is required";
    if (!employee.jobId) newErrors.jobId = "Job is required";
    if (!employee.departmentId)
      newErrors.departmentId = "Department is required";
    if (!employee.countryId) newErrors.countryId = "Country is required";
    if (employee.phone && !phoneRegex.test(employee.phone))
      newErrors.phone = "Valid Phone Number is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setAlert({
        open: true,
        message: "Please fill in all required fields correctly.",
        severity: "error",
      });
      return;
    }

    try {
      const payload = {
        ...employee,
        hireDate: employee.hireDate
          ? employee.hireDate.toISOString().split("T")[0]
          : null,
      };

      let response;
      if (employeeData.isExisting) {
        response = await apiClient.put(
          `${API_BASE_URL}/employees/${employee.employeeId}`,
          payload
        );

        updateEmployeeData({
          id: employee.employeeId,
          currentSalaryId: employee.currentSalaryId,
        });
      } else {
        response = await apiClient.post(`${API_BASE_URL}/employees`, payload);
        updateEmployeeData({
          id: response.data.employeeId,
          isExisting: false,
        });
        setIsEmployeeAdded(true);
      }

      setAlert({
        open: true,
        message: "Employee saved successfully.",
        severity: "success",
      });
      console.log("Employee saved:", response.data);
    } catch (error) {
      setAlert({
        open: true,
        message: "Error saving employee.",
        severity: "error",
      });
      console.error("Error saving employee:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      }
    }
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
        }}
      >
        <Typography
          variant="h4"
          align="center"
          mb={3}
          gutterBottom
          color="primary"
        >
          {employeeData.isExisting ? "Update Employee" : "Add Employee"}
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {["firstName", "lastName", "email"].map((field, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label={field
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}
                  name={field}
                  onChange={handleChange}
                  value={employee[field]}
                  type={field === "email" ? "email" : "text"}
                  required
                  error={!!errors[field]}
                  helperText={errors[field]}
                  InputLabelProps={{ shrink: true }}
                  sx={{ marginBottom: "16px" }}
                />
              </Grid>
            ))}

            <Grid item xs={12} sm={6} md={4}>
              <DatePicker
                label="Hire Date"
                value={employee.hireDate}
                onChange={handleDateChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    required
                    error={!!errors.hireDate}
                    helperText={errors.hireDate}
                    InputLabelProps={{ shrink: true }}
                    sx={{ marginBottom: "16px" }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <FormControl
                fullWidth
                required
                sx={{ marginBottom: "16px" }}
                error={!!errors.employeeType}
              >
                <InputLabel shrink>Employee Type</InputLabel>
                <Select
                  value={employee.employeeType}
                  name="employeeType"
                  onChange={handleChange}
                  label="Employee Type"
                >
                  {employeeTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
                {errors.employeeType && (
                  <Typography color="error">{errors.employeeType}</Typography>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <FormControl
                fullWidth
                required
                sx={{ marginBottom: "16px" }}
                error={!!errors.jobId}
              >
                <InputLabel shrink>Job</InputLabel>
                <Select
                  value={employee.jobId}
                  name="jobId"
                  onChange={handleChange}
                  label="Job"
                >
                  {jobs.map((job) => (
                    <MenuItem key={job.jobId} value={job.jobId}>
                      {job.jobTitle}
                    </MenuItem>
                  ))}
                </Select>
                {errors.jobId && (
                  <Typography color="error">{errors.jobId}</Typography>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <FormControl
                fullWidth
                required
                sx={{ marginBottom: "16px" }}
                error={!!errors.departmentId}
              >
                <InputLabel shrink>Department</InputLabel>
                <Select
                  value={employee.departmentId}
                  name="departmentId"
                  onChange={handleChange}
                  label="Department"
                >
                  {departments.map((dept) => (
                    <MenuItem key={dept.departmentId} value={dept.departmentId}>
                      {dept.departmentName}
                    </MenuItem>
                  ))}
                </Select>
                {errors.departmentId && (
                  <Typography color="error">{errors.departmentId}</Typography>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <FormControl
                fullWidth
                required
                sx={{ marginBottom: "16px" }}
                error={!!errors.countryId}
              >
                <InputLabel shrink>Country</InputLabel>
                <Select
                  value={employee.countryId}
                  name="countryId"
                  onChange={handleChange}
                  label="Country"
                >
                  {countries.map((country) => (
                    <MenuItem key={country.id} value={country.id}>
                      {country.countryName}
                    </MenuItem>
                  ))}
                </Select>
                {errors.countryId && (
                  <Typography color="error">{errors.countryId}</Typography>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                variant="outlined"
                label="Phone"
                name="phone"
                onChange={handleChange}
                value={employee.phone}
                type="tel"
                error={!!errors.phone}
                helperText={errors.phone}
                InputLabelProps={{ shrink: true }}
                sx={{ marginBottom: "16px" }}
              />
            </Grid>

            <Grid item xs={6} sm={4} md={3}>
              <Box
                display="flex"
                alignItems="center"
                border={1}
                borderColor="divider"
                borderRadius={1}
                p={1}
              >
                <Typography
                  variant="body1"
                  color="primary"
                  mr={2}
                  sx={{ fontWeight: "600" }}
                >
                  Status
                </Typography>
                <Switch
                  checked={employee.enabled}
                  onChange={handleEnabled}
                  color="success"
                />
                <Typography variant="body2" color="textSecondary" ml={1}>
                  {employee.enabled ? "Active" : "Inactive"}
                </Typography>
              </Box>
            </Grid>
          </Grid>

          {!isEmployeeAdded && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
              <Button type="submit" variant="contained" color="primary">
                {employeeData.isExisting ? "Update" : "Add"} Employee
              </Button>
            </Box>
          )}
        </Box>
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

export default EmployeeForm;
