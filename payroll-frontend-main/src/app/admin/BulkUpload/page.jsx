"use client";
import React, { useState } from "react";
import {
  Button,
  Grid,
  Input,
  Typography,
  FormControl,
  FormLabel,
  Paper,
  TextField,
  Select,
  MenuItem,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import DeleteIcon from "@mui/icons-material/Delete";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { apiClient } from "@/lib/api";

const API_BASE_URL = "/api";

const BulkPayslip = () => {
  const [employeeIds, setEmployeeIds] = useState("");
  const [template, setTemplate] = useState("");
  const [fileError, setFileError] = useState("");
  const [excelData, setExcelData] = useState([]);
  const [showData, setShowData] = useState(false);
  const [fileName, setFileName] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleDownload = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [excelData[0]],
      body: excelData.slice(1),
      styles: {
        fontSize: 10,
        cellPadding: 3,
        halign: "center",
        valign: "middle",
      },
      headStyles: {
        fillColor: [22, 160, 133],
        textColor: [255, 255, 255],
        fontSize: 12,
        fontStyle: "bold",
      },
      alternateRowStyles: { fillColor: [240, 240, 240] },
      margin: { top: 20 },
    });
    doc.save("excelData.pdf");
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      setUploadedFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        const binaryStr = event.target.result;
        const workbook = XLSX.read(binaryStr, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        setExcelData(data);
        setSuccessMessage("File uploaded successfully");
        setOpenSnackbar(true);
      };
      reader.onerror = () => setFileError("Failed to read the file");
      reader.readAsBinaryString(file);
    }
  };

  const handleRemoveFile = () => {
    setFileName("");
    setUploadedFile(null);
    setExcelData([]);
    setFileError("");
  };

  const handleGenerateDocuments = () => {
    if (!uploadedFile) {
      setFileError("No file uploaded");
      return;
    }

    const formData = new FormData();
    formData.append("file", uploadedFile);

    apiClient
      .post(`${API_BASE_URL}/payslips/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Documents generated successfully", response.data);
        setFileError(""); // Clear any previous error
        setSuccessMessage("Documents generated successfully");
        setOpenSnackbar(true);
      })
      .catch((error) => {
        console.error("Error generating documents", error);
        setFileError("Failed to generate the documents");
      });
  };

  const toggleShowData = () => {
    setShowData((prevState) => !prevState);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Paper
      sx={{
        padding: 4,
        backgroundColor: "#ffffff",
        borderRadius: 4,
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          color: "#34495e",
          fontWeight: "bold",
          mb: 3,
          textAlign: "center",
        }}
      >
        Bulk Payslip Generation
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <FormLabel
              sx={{
                fontWeight: "bold",
                color: "#34495e",
                marginBottom: "8px",
                fontSize: "1.1rem",
              }}
            >
              Select Template
            </FormLabel>
            <Select
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
              sx={{
                backgroundColor: "#f0f3f4",
                borderRadius: "8px",
                padding: "8px",
              }}
            >
              {[
                "Template 1",
                "Template 2",
                "Template 3",
                "Template 4",
                "Template 5",
              ].map((tmpl, idx) => (
                <MenuItem key={idx} value={`template${idx + 1}`}>
                  {tmpl}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* <Grid item xs={12}>
          <TextField
            label="Employee IDs (comma separated)"
            value={employeeIds}
            onChange={(e) => setEmployeeIds(e.target.value)}
            fullWidth
            sx={{
              backgroundColor: "#f0f3f4",
              borderRadius: "8px",
              padding: "8px",
            }}
          />
        </Grid> */}

        <Grid item xs={12}>
          <FormControl>
            <FormLabel
              sx={{
                fontWeight: "bold",
                color: "#34495e",
                marginBottom: "8px",
                fontSize: "1.1rem",
              }}
            >
              Upload Excel File
            </FormLabel>
            <Box display="flex" alignItems="center">
              <Input
                accept=".xlsx, .xls"
                sx={{ display: "none" }}
                id="file-upload"
                type="file"
                onChange={handleFileUpload}
              />
              <label htmlFor="file-upload">
                <IconButton
                  color="primary"
                  component="span"
                  sx={{ backgroundColor: "#2ecc71", color: "#fff" }}
                >
                  <AttachFileIcon />
                </IconButton>
              </label>
              {fileName && (
                <>
                  <Typography
                    variant="body2"
                    sx={{ marginLeft: 1, fontStyle: "italic" }}
                  >
                    {fileName}
                  </Typography>
                  <IconButton
                    color="error"
                    onClick={handleRemoveFile}
                    sx={{ marginLeft: 1 }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </>
              )}
              <IconButton
                color="info"
                onClick={handleOpenDialog}
                sx={{ marginLeft: 1 }}
              >
                <HelpOutlineIcon />
              </IconButton>
            </Box>
            {fileError && (
              <Typography color="error" sx={{ marginTop: 1 }}>
                {fileError}
              </Typography>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                onClick={toggleShowData}
                sx={{
                  borderRadius: 2,
                  fontWeight: "bold",
                  paddingX: 3,
                  paddingY: 1,
                }}
              >
                {showData ? "Hide Data" : "View Data"}
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={handleGenerateDocuments}
                sx={{
                  borderRadius: 2,
                  fontWeight: "bold",
                  paddingX: 3,
                  paddingY: 1,
                }}
              >
                Generate Documents
              </Button>
            </Grid>
          </Grid>
        </Grid>

        {showData && excelData.length > 0 && (
          <Grid item xs={12}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ color: "#34495e", marginBottom: 2, textAlign: "center" }}
            >
              Uploaded Excel Data
            </Typography>
            <TableContainer
              component={Paper}
              sx={{
                maxHeight: 400,
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.05)",
                borderRadius: 2,
              }}
            >
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    {excelData[0].map((header, index) => (
                      <TableCell
                        key={index}
                        sx={{
                          backgroundColor: "#34495e",
                          color: "#ecf0f1",
                          fontWeight: "bold",
                        }}
                      >
                        {header}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {excelData.slice(1).map((row, rowIndex) => (
                    <TableRow key={rowIndex}>
                      {row.map((cell, cellIndex) => (
                        <TableCell key={cellIndex}>{cell}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        )}
      </Grid>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          {successMessage}
        </Alert>
      </Snackbar>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>File Format Hint</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ color: "#34495e", marginTop: 2 }}>
            Please upload an Excel file with the following format:
          </Typography>
          <TableContainer component={Paper} sx={{ marginTop: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>employeeId</TableCell>
                  <TableCell>lop</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>12345</TableCell>
                  <TableCell>2</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>67890</TableCell>
                  <TableCell>0</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default BulkPayslip;
