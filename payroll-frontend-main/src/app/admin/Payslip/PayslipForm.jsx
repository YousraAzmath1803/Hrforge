// src/app/components/PayslipForm.jsx
"use client";
import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { formatJoiningDate, API_BASE_URL } from "./utils";
import { apiClient } from "@/lib/api";

const PayslipForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    logo: "",
    companyName: "",
    companyAddress: "",
    employeeId: "",
    name: "",
    department: "",
    position: "",
    dateOfJoining: "",
    bankAccount: "",
    panNumber: "",
    uanNumber: "", // Added UAN Number field
    totalDays: "",
    lop: "",
    daysPaid: "",
    basicSalary: "",
    hra: "",
    medicalAllowance: "",
    transportAllowance: "",
    otherAllowances: "",
    providentFund: "",
    professionalTax: "",
    esi: "",
    tds: "",
    otherDeductions: "",
    totalEarnings: "",
    totalDeductions: "",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setFormData((prevData) => ({
        ...prevData,
        logo: localStorage.getItem("logo") || "",
        companyName: localStorage.getItem("companyName") || "",
        companyAddress: localStorage.getItem("companyAddress") || "",
      }));
    }
  }, []);

  const [selectedDate, setSelectedDate] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [originalData, setOriginalData] = useState({});

  const handleLogoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && e.target.result) {
          const logo = e.target.result;
          setFormData((prevData) => ({ ...prevData, logo }));
          localStorage.setItem("logo", logo);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let error = "";

    // Validation logic
    if (name === "daysPaid" || name === "totalDays" || name === "lop") {
      if (!/^\d*\.?\d*$/.test(value)) {
        error = "Please enter a valid number";
      } else if (
        selectedDate &&
        (parseFloat(value) < 0 ||
          parseFloat(value) > selectedDate.daysInMonth())
      ) {
        error = `Please enter a valid day (0-${selectedDate.daysInMonth()})`;
      }
    }

    if (name === "panNumber") {
      const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
      if (!panRegex.test(value)) {
        error = "Please enter a valid PAN number (e.g., ABCDE1234F)";
      }
    }

    if (name === "bankAccount") {
      const accountRegex = /^[0-9]{9,18}$/;
      if (!accountRegex.test(value)) {
        error = "Please enter a valid bank account number";
      }
    }

    if (name === "uanNumber") {
      const uanRegex = /^[0-9]{12}$/;
      if (!uanRegex.test(value)) {
        error = "Please enter a valid UAN number";
      }
    }

    setFormData((prevData) => {
      const updatedData = {
        ...prevData,
        [name]: value,
      };

      if (name === "lop" || name === "totalDays") {
        const lop = parseFloat(updatedData.lop || "0");
        const totalDays = parseFloat(updatedData.totalDays || "0");
        const daysPaid = totalDays - lop;
        updatedData.daysPaid = daysPaid.toString();

        if (updatedData.totalDays === "30") {
          updatedData.basicSalary = (
            parseFloat(updatedData.daysPaid) * 416.66
          ).toFixed(2);
          updatedData.hra = (parseFloat(updatedData.basicSalary) * 0.4).toFixed(
            2
          );
          updatedData.medicalAllowance = (
            parseFloat(updatedData.basicSalary) * 0.1
          ).toFixed(2);
          updatedData.transportAllowance = (
            parseFloat(updatedData.basicSalary) * 0.1
          ).toFixed(2);
          updatedData.otherAllowances = (
            parseFloat(updatedData.basicSalary) * 0.4
          ).toFixed(2);
          updatedData.providentFund = (
            parseFloat(updatedData.basicSalary) * 0.128
          ).toFixed(2);
          updatedData.professionalTax = 200;
          updatedData.esi = 0;
          updatedData.tds = 0;
          updatedData.otherDeductions = 0;

          // Add the updated fields to totalEarnings
          updatedData.totalEarnings = (
            parseFloat(updatedData.basicSalary) +
            parseFloat(updatedData.hra) +
            parseFloat(updatedData.medicalAllowance) +
            parseFloat(updatedData.transportAllowance) +
            parseFloat(updatedData.otherAllowances)
          ).toFixed(2);
        } else if (updatedData.totalDays === "31") {
          updatedData.basicSalary = (
            parseFloat(updatedData.daysPaid) * 403.225
          ).toFixed(2);
          updatedData.hra = (parseFloat(updatedData.basicSalary) * 0.4).toFixed(
            2
          );
          updatedData.medicalAllowance = (
            parseFloat(updatedData.basicSalary) * 0.1
          ).toFixed(2);
          updatedData.transportAllowance = (
            parseFloat(updatedData.basicSalary) * 0.1
          ).toFixed(2);
          updatedData.otherAllowances = (
            parseFloat(updatedData.basicSalary) * 0.4
          ).toFixed(2);
          updatedData.providentFund = (
            parseFloat(updatedData.basicSalary) * 0.128
          ).toFixed(2);
          updatedData.professionalTax = 200;
          updatedData.esi = 0;
          updatedData.tds = 0;
          updatedData.otherDeductions = 0;

          // Add the updated fields to totalEarnings
          updatedData.totalEarnings = (
            parseFloat(updatedData.basicSalary) +
            parseFloat(updatedData.hra) +
            parseFloat(updatedData.medicalAllowance) +
            parseFloat(updatedData.transportAllowance) +
            parseFloat(updatedData.otherAllowances)
          ).toFixed(2);
        } else {
          // LPA (Annual Salary) and Daily Rate logic
          const basicSalary = parseFloat(originalData.basicSalary || 0);
          const dailyRate = basicSalary / totalDays;

          // Update basic salary and related allowances based on daysPaid
          updatedData.basicSalary = (dailyRate * daysPaid).toFixed(2);
          updatedData.hra = (parseFloat(updatedData.basicSalary) * 0.4).toFixed(
            2
          );
          updatedData.medicalAllowance = (
            parseFloat(updatedData.basicSalary) * 0.1
          ).toFixed(2);
          updatedData.transportAllowance = (
            parseFloat(updatedData.basicSalary) * 0.1
          ).toFixed(2);
          updatedData.otherAllowances = (
            parseFloat(updatedData.basicSalary) * 0.4
          ).toFixed(2);
          updatedData.providentFund = (
            parseFloat(updatedData.basicSalary) * 0.128
          ).toFixed(2);
          updatedData.professionalTax = 200; // Assuming a static value for now
          updatedData.esi = 0; // Assuming this is optional or dynamic
          updatedData.tds = 0;
          updatedData.otherDeductions = 0;

          // Calculate total earnings
          updatedData.totalEarnings = (
            parseFloat(updatedData.basicSalary) +
            parseFloat(updatedData.hra) +
            parseFloat(updatedData.medicalAllowance) +
            parseFloat(updatedData.transportAllowance) +
            parseFloat(updatedData.otherAllowances)
          ).toFixed(2);
        }

        // Calculate total deductions
        updatedData.totalDeductions = (
          parseFloat(updatedData.providentFund) +
          parseFloat(updatedData.professionalTax) +
          parseFloat(updatedData.esi) +
          parseFloat(updatedData.tds) +
          parseFloat(updatedData.otherDeductions)
        ).toFixed(2);
      }

      return updatedData;
    });

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleDateChange = (newValue) => {
    setSelectedDate(newValue);
  };

  const handleEmployeeIdChange = async (e) => {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, employeeId: value }));

    if (value) {
      setLoading(true);
      try {
        const response = await apiClient.get(
          `${API_BASE_URL}/payslips/${value}`
        );
        const data = response.data;

        const hra = data.allowances["House Rent Allowance (HRA)"]?.amount || 0;
        const otherAllowances = Object.entries(data.allowances)
          .filter(([key]) => key !== "House Rent Allowance (HRA)")
          .reduce((sum, [, allowance]) => sum + (allowance.amount || 0), 0);

        const tds = data.deductions["Income Tax"]?.amount || 0;
        const otherDeductions = Object.entries(data.deductions)
          .filter(([key]) => key !== "Income Tax")
          .reduce((sum, [, deduction]) => sum + (deduction.amount || 0), 0);

        const totalEarnings =
          parseFloat(data.basicSalary || 0) + hra + otherAllowances;
        const totalDeductions =
          tds +
          otherDeductions +
          parseFloat(data.providentFund || 0) +
          parseFloat(data.professionalTax || 0) +
          parseFloat(data.esi || 0);

        setOriginalData({
          basicSalary: data.basicSalary,
          hra: hra,
          otherAllowances: otherAllowances,
          providentFund: data.providentFund,
          professionalTax: data.professionalTax,
          esi: data.esi,
          tds: tds,
          otherDeductions: otherDeductions,
          totalEarnings: totalEarnings,
          totalDeductions: totalDeductions,
        });

        const averageAllowances =
          Object.values(data.allowances).reduce(
            (sum, allowance) => sum + (allowance.amount || 0),
            0
          ) / Object.keys(data.allowances).length;
        const averageDeductions =
          Object.values(data.deductions).reduce(
            (sum, deduction) => sum + (deduction.amount || 0),
            0
          ) / Object.keys(data.deductions).length;

        setFormData((prev) => {
          const additionalAllowances = Object.entries(data.allowances)
            .filter(
              ([key]) =>
                ![
                  "Housing Allowance",
                  "Medical Reimbursement",
                  "Transport Allowances",
                ].includes(key)
            )
            .reduce((sum, [, allowance]) => sum + (allowance.amount || 0), 0);

          const additionalDeductions = Object.entries(data.deductions)
            .filter(
              ([key]) =>
                !["Provident Fund", "Professional Tax", "TDS", "ESI"].includes(
                  key
                )
            )
            .reduce((sum, [, deduction]) => sum + (deduction.amount || 0), 0);

          return {
            ...prev,
            name: data.employeeName,
            department: data.department,
            position: data.designation,
            dateOfJoining: data.hireDate,
            bankAccount: data.employeeSensitiveInfo.bankAccountNumber,
            panNumber: data.employeeSensitiveInfo.pan,
            uanNumber: data.employeeSensitiveInfo.uan,
            totalDays: data.totalDays,
            lop: data.lopDays,
            daysPaid: data.totalDays - data.lopDays,
            basicSalary: data.basicSalary,
            hra: data.allowances["Housing Allowance"]?.amount || 0,
            medicalAllowance:
              data.allowances["Medical Reimbursement"]?.amount || 0,
            transportAllowance:
              data.allowances["Transport Allowances"]?.amount || 0,
            otherAllowances: averageAllowances + additionalAllowances,
            providentFund: data.deductions["Provident Fund"]?.amount || 0,
            professionalTax: data.deductions["Professional Tax"]?.amount || 0,
            tds: data.deductions["TDS"]?.amount || 0,
            esi: data.deductions["ESI"]?.amount || 0,
            otherDeductions: averageDeductions + additionalDeductions,
            totalEarnings: data.salaryCalculationResult.grossSalary,
            totalDeductions: data.salaryCalculationResult.deductions,
          };
        });
      } catch (error) {
        console.error("Error fetching employee data:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.companyName)
      newErrors.companyName = "Company Name is required";
    if (!formData.companyAddress)
      newErrors.companyAddress = "Company Address is required";
    if (!formData.employeeId) newErrors.employeeId = "Employee ID is required";
    if (!formData.name) newErrors.name = "Employee Name is required";
    if (!formData.department) newErrors.department = "Department is required";
    if (!formData.position) newErrors.position = "Designation is required";
    if (!formData.dateOfJoining)
      newErrors.dateOfJoining = "Date of Joining is required";
    if (!formData.bankAccount)
      newErrors.bankAccount = "Account Number is required";
    if (!formData.panNumber) newErrors.panNumber = "PAN Number is required";
    if (!formData.uanNumber) newErrors.uanNumber = "UAN Number is required"; // Validate UAN Number
    if (!formData.daysPaid) newErrors.daysPaid = "No. of Paid days is required";
    if (!formData.totalDays) newErrors.totalDays = "Total Days is required";
    if (formData.lop < 0) newErrors.lop = "LOP is required";
    // Add more validations as needed

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formattedJoiningDate =
      formatJoiningDate(formData.dateOfJoining) || "";
    const formattedMonthYear = selectedDate
      ? selectedDate.format("MM YYYY")
      : "";

    localStorage.setItem("companyName", formData.companyName);
    localStorage.setItem("companyAddress", formData.companyAddress);

    onSubmit({ ...formData, formattedJoiningDate, formattedMonthYear });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ mt: 3, p: 3, backgroundColor: "#f9f9f9", borderRadius: 2 }}
    >
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ color: "#124E66" }}
      >
        Generate Payslip
      </Typography>
      <Grid container spacing={3}>
        <Grid container item xs={12} spacing={5}>
          <Grid item xs={12} sm={4}>
            <Button
              variant="contained"
              sx={{
                padding: "20px 20px 15px",
                backgroundColor: formData.logo ? "white" : "#124E66",
                color: formData.logo ? "#124E66" : "white",
                "&:hover": {
                  backgroundColor: formData.logo ? "white" : "white",
                  color: formData.logo ? "#124E66" : "#124E66",
                },
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "50%",
                height: "100%",
              }}
              onClick={() => document.getElementById("uploadLogo")?.click()}
            >
              {formData.logo ? (
                <img
                  src={formData.logo}
                  alt="Logo"
                  style={{ width: "100%", height: "100%" }}
                />
              ) : (
                <UploadFileIcon sx={{ fontSize: "5rem" }} />
              )}
            </Button>
            <input
              id="uploadLogo"
              type="file"
              accept="image/*"
              onChange={handleLogoChange}
              hidden
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            sx={{ textAlign: "left", marginLeft: -17, marginTop: 4 }}
          >
            {formData.logo ? (
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => {
                  setFormData({ ...formData, logo: "" });
                  localStorage.removeItem("logo");
                }}
              >
                Remove Logo
              </Button>
            ) : (
              <Typography variant="body1">
                Upload Logo (240x240 pixels, max 1MB)
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} sm={6} sx={{ textAlign: "center", marginTop: 3 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                views={["year", "month"]}
                openTo="month"
                label="Select Month and Year"
                value={selectedDate}
                onChange={handleDateChange}
                slotProps={{
                  textField: {
                    onFocus: (e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      e.target.blur(); // Prevent default focus behavior
                      const dialog = document.querySelector('[role="dialog"]');
                      if (dialog) {
                        dialog.click(); // Activate datepicker
                      }
                    },
                  },
                }}
                inputFormat="MM/YYYY"
              />
            </LocalizationProvider>
          </Grid>
        </Grid>

        <Grid container item xs={12} spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="companyName"
              label="Company Name"
              fullWidth
              value={formData.companyName}
              onChange={handleChange}
              error={!!errors.companyName}
              helperText={errors.companyName}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="companyAddress"
              label="Company Address"
              fullWidth
              value={formData.companyAddress}
              onChange={handleChange}
              error={!!errors.companyAddress}
              helperText={errors.companyAddress}
              required
            />
          </Grid>
        </Grid>

        <Grid container item xs={12} spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="employeeId"
              label="Employee ID"
              fullWidth
              value={formData.employeeId}
              onChange={handleEmployeeIdChange}
              error={!!errors.employeeId}
              helperText={errors.employeeId}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="name"
              label="Employee Name"
              fullWidth
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
              required
            />
          </Grid>
        </Grid>

        <Grid container item xs={12} spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="department"
              label="Department"
              fullWidth
              value={formData.department}
              onChange={handleChange}
              error={!!errors.department}
              helperText={errors.department}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="position"
              label="Designation"
              fullWidth
              value={formData.position}
              onChange={handleChange}
              error={!!errors.position}
              helperText={errors.position}
            />
          </Grid>
        </Grid>

        <Grid container item xs={12} spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              name="dateOfJoining"
              label="Date of Joining"
              type="date"
              fullWidth
              value={formData.dateOfJoining}
              onChange={handleChange}
              error={!!errors.dateOfJoining}
              helperText={errors.dateOfJoining}
              InputLabelProps={{ shrink: true }} // Show the date format after selecting the field
              required
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              name="bankAccount"
              label="Account Number"
              fullWidth
              value={formData.bankAccount}
              onChange={handleChange}
              error={!!errors.bankAccount}
              helperText={errors.bankAccount}
              required
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              name="panNumber"
              label="PAN Number"
              fullWidth
              value={formData.panNumber}
              onChange={handleChange}
              error={!!errors.panNumber}
              helperText={errors.panNumber}
              required
            />
          </Grid>
        </Grid>

        <Grid container item xs={12} spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              name="uanNumber"
              label="UAN Number"
              fullWidth
              value={formData.uanNumber}
              onChange={handleChange}
              error={!!errors.uanNumber}
              helperText={errors.uanNumber}
              required
            />
          </Grid>
        </Grid>

        <Grid container item xs={12} spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              name="totalDays"
              label="Total Days"
              type="number"
              fullWidth
              value={formData.totalDays}
              onChange={handleChange}
              error={!!errors.totalDays}
              helperText={errors.totalDays}
              required
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              name="lop"
              label="LOP"
              type="number"
              fullWidth
              value={formData.lop}
              onChange={handleChange}
              error={!!errors.lop}
              helperText={errors.lop}
              required
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              name="daysPaid"
              label="No. of Paid Days"
              type="number"
              fullWidth
              value={formData.daysPaid}
              onChange={handleChange}
              error={!!errors.daysPaid}
              helperText={errors.daysPaid}
              required
            />
          </Grid>
        </Grid>

        <Grid container item xs={12} spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              name="basicSalary"
              label="Basic Salary"
              fullWidth
              value={
                formData.basicSalary === ""
                  ? ""
                  : Math.round(formData.basicSalary)
              }
              onChange={handleChange}
              error={!!errors.basicSalary}
              helperText={errors.basicSalary}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              name="hra"
              label="House Rent Allowance"
              fullWidth
              value={formData.hra === "" ? "" : Math.round(formData.hra)}
              onChange={handleChange}
              error={!!errors.hra}
              helperText={errors.hra}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              name="medicalAllowance"
              label="Medical Allowance"
              fullWidth
              value={
                formData.medicalAllowance === ""
                  ? ""
                  : Math.round(formData.medicalAllowance)
              }
              onChange={handleChange}
              error={!!errors.medicalAllowance}
              helperText={errors.medicalAllowance}
            />
          </Grid>
        </Grid>
        <Grid container item xs={12} spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              name="transportAllowance"
              label="Transport Allowance"
              fullWidth
              value={
                formData.transportAllowance === ""
                  ? ""
                  : Math.round(formData.transportAllowance)
              }
              onChange={handleChange}
              error={!!errors.transportAllowance}
              helperText={errors.transportAllowance}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              name="otherAllowances"
              label="Other Allowances"
              fullWidth
              value={
                formData.otherAllowances === ""
                  ? ""
                  : Math.round(formData.otherAllowances)
              }
              onChange={handleChange}
              error={!!errors.otherAllowances}
              helperText={errors.otherAllowances}
            />
          </Grid>
        </Grid>
        <Grid container item xs={12} spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              name="providentFund"
              label="Provident Fund"
              fullWidth
              value={
                formData.providentFund === ""
                  ? ""
                  : Math.round(formData.providentFund)
              }
              onChange={handleChange}
              error={!!errors.providentFund}
              helperText={errors.providentFund}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              name="professionalTax"
              label="Professional Tax"
              fullWidth
              value={
                formData.professionalTax === ""
                  ? ""
                  : Math.round(formData.professionalTax)
              }
              onChange={handleChange}
              error={!!errors.professionalTax}
              helperText={errors.professionalTax}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              name="esi"
              label="ESI"
              fullWidth
              value={formData.esi === "" ? "" : Math.round(formData.esi)}
              onChange={handleChange}
              error={!!errors.esi}
              helperText={errors.esi}
            />
          </Grid>
        </Grid>
        <Grid container item xs={12} spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              name="tds"
              label="TDS"
              fullWidth
              value={formData.tds === "" ? "" : Math.round(formData.tds)}
              onChange={handleChange}
              error={!!errors.tds}
              helperText={errors.tds}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              name="otherDeductions"
              label="Other Deductions"
              fullWidth
              value={
                formData.otherDeductions === ""
                  ? ""
                  : Math.round(formData.otherDeductions)
              }
              onChange={handleChange}
              error={!!errors.otherDeductions}
              helperText={errors.otherDeductions}
            />
          </Grid>
        </Grid>

        {/* Totals */}
        <Grid container item xs={12} spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              name="totalEarnings"
              label="Total Earnings"
              fullWidth
              value={
                formData.totalEarnings === ""
                  ? ""
                  : Math.round(formData.totalEarnings)
              }
              onChange={handleChange}
              error={!!errors.totalEarnings}
              helperText={errors.totalEarnings}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              name="totalDeductions"
              label="Total Deductions"
              fullWidth
              value={
                formData.totalDeductions === ""
                  ? ""
                  : Math.round(formData.totalDeductions)
              }
              onChange={handleChange}
              error={!!errors.totalDeductions}
              helperText={errors.totalDeductions}
            />
          </Grid>
        </Grid>

        {/* Submit button */}
        <Grid container item xs={12} justifyContent="center" spacing={2}>
          <Grid item xs={12} sm={3}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#124E66",
                color: "white",
                "&:hover": { backgroundColor: "#0D3B4D" },
                whiteSpace: "nowrap",
              }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "View Payslip"}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PayslipForm;
