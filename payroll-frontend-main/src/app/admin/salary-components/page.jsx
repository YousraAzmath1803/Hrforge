"use client";
import { apiClient } from "@/lib/api";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  IconButton,
  Paper,
  Snackbar,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import AllowanceDeductionForm from "./add/page";
import EditAllowanceDeductionForm from "./edit/page";

const API_BASE_URL = "/api";

// const countryIdMap = {
//   1: "United States",
//   2: "Canada",
//   3: "India",
//   4: "United Kingdom",
// };

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const AllowancePage = () => {
  const [value, setValue] = React.useState(0);
  const [loading, setLoading] = useState(true);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [allowances, setAllowances] = useState([]);
  const [deductions, setDeductions] = useState([]);
  const [country, setCountry] = useState([]); // Assuming you have a state for countries
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editItem, setEditItem] = useState({});
  const [countryIdMap, setCountryIdMap] = useState({});
  const [editType, setEditType] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const fetchAllowancesAndDeductions = () => {
    setLoading(true);
    apiClient
      .get(`${API_BASE_URL}/allowances`)
      .then((response) => {
        setAllowances(response.data.sort((a, b) => a.id - b.id));
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching allowances:", error);
      });

    apiClient
      .get(`${API_BASE_URL}/deductions`)
      .then((response) => {
        setDeductions(response.data.sort((a, b) => a.id - b.id));
      })
      .catch((error) => {
        console.error("Error fetching deductions:", error);
      });

    // Fetch countries data
    apiClient
      .get(`${API_BASE_URL}/org/country`)
      .then((response) => {
        setCountry(response.data);
        setCountryIdMap(
          response.data.map(
            (country) => (countryIdMap[country.id] = country.countryName)
          )
        );

        console.log(countryIdMap);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAllowancesAndDeductions();
  }, []);

  const highlightText = (value) => ({
    color: value ? "green" : "inherit",
  });

  const handleDelete = async (id, type) => {
    try {
      const endpoint =
        type === "allowance"
          ? `${API_BASE_URL}/allowances/${id}`
          : `${API_BASE_URL}/deductions/${id}`;
      await apiClient.delete(endpoint);
      fetchAllowancesAndDeductions();
      setSnackbar({
        open: true,
        message: `${
          type === "allowance" ? "Allowance" : "Deduction"
        } deleted successfully`,
        severity: "success",
      });
    } catch (error) {
      console.error("Error deleting item:", error);
      setSnackbar({
        open: true,
        message: `Error deleting ${
          type === "allowance" ? "Allowance" : "Deduction"
        }`,
        severity: "error",
      });
    }
  };

  const handleEdit = (item, type) => {
    setEditItem(item);
    setEditType(type);
    setOpenEditDialog(true);
  };

  const handleOpenFormDialog = () => {
    setOpenFormDialog(true);
  };

  const handleCloseFormDialog = () => {
    setOpenFormDialog(false);
    fetchAllowancesAndDeductions();
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    fetchAllowancesAndDeductions();
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: "", severity: "success" });
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom align="center" color="primary">
        Allowances and Deductions
      </Typography>
      <Box
        mb={3}
        sx={{
          display: "flex",
          justifyContent: "end",
          alignItems: "end",
        }}
      >
        <Button
          variant="outlined"
          color="secondary"
          sx={{ width: "120px" }}
          onClick={handleOpenFormDialog}
        >
          Add New
        </Button>
      </Box>
      <Dialog
        open={openFormDialog}
        onClose={handleCloseFormDialog}
        maxWidth="sm"
        fullWidth
      >
        <AllowanceDeductionForm onClose={handleCloseFormDialog} />
      </Dialog>
      <Dialog
        open={openEditDialog}
        onClose={handleCloseEditDialog}
        maxWidth="sm"
        fullWidth
      >
        <EditAllowanceDeductionForm
          onClose={handleCloseEditDialog}
          editItem={editItem}
          editType={editType}
        />
      </Dialog>
      <Box
        mb={4}
        sx={{
          backgroundColor: "#ffffff",
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Box>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            centered
            aria-label="allowance and deductions tabs"
          >
            <Tab label="Allowances" {...a11yProps(0)} />
            <Tab label="Deductions" {...a11yProps(1)} />
          </Tabs>
        </Box>

        <CustomTabPanel value={value} index={0}>
          {loading ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
            >
              <CircularProgress />
            </Box>
          ) : (
            <Box>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="component table">
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Allowance Name</TableCell>
                      <TableCell align="right">Description</TableCell>
                      <TableCell align="right">Taxable</TableCell>
                      <TableCell align="right">Mandatory</TableCell>
                      <TableCell align="right">Country</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {allowances.map((allowance) => (
                      <TableRow
                        key={allowance.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="left">{allowance.id}</TableCell>
                        <TableCell component="th" scope="row">
                          {allowance.name}
                        </TableCell>
                        <TableCell align="right">
                          {allowance.description}
                        </TableCell>
                        <TableCell align="right">
                          <Typography sx={highlightText(allowance.taxable)}>
                            {allowance.taxable ? "Yes" : "No"}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography sx={highlightText(allowance.mandatory)}>
                            {allowance.mandatory ? "Yes" : "No"}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          {allowance.country_id
                            ? country.filter(
                                (country) => country.id === allowance.country_id
                              )[0]
                              ? country.filter(
                                  (country) =>
                                    country.id === allowance.country_id
                                )[0].countryName
                              : "NA"
                            : "NA"}
                        </TableCell>
                        <TableCell align="right">
                          <IconButton
                            color="primary"
                            onClick={() => handleEdit(allowance, "allowance")}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            color="secondary"
                            onClick={() =>
                              handleDelete(allowance.id, "allowance")
                            }
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
        </CustomTabPanel>

        <CustomTabPanel value={value} index={1}>
          {loading ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
            >
              <CircularProgress />
            </Box>
          ) : (
            <Box>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Deduction Name</TableCell>
                      <TableCell align="right">Description</TableCell>
                      <TableCell align="right">Statutory</TableCell>
                      <TableCell align="right">Mandatory</TableCell>
                      <TableCell align="right">Country</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {deductions.map((deduction) => (
                      <TableRow
                        key={deduction.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="left">{deduction.id}</TableCell>
                        <TableCell component="th" scope="row">
                          {deduction.name}
                        </TableCell>
                        <TableCell align="right">
                          {deduction.description}
                        </TableCell>
                        <TableCell align="right">
                          <Typography sx={highlightText(deduction.statutory)}>
                            {deduction.statutory ? "Yes" : "No"}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography sx={highlightText(deduction.mandatory)}>
                            {deduction.mandatory ? "Yes" : "No"}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          {countryIdMap[deduction.country_id]
                            ? countryIdMap[deduction.country_id]
                            : "NA"}
                        </TableCell>
                        <TableCell align="right">
                          <IconButton
                            color="primary"
                            onClick={() => handleEdit(deduction, "deduction")}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            color="secondary"
                            onClick={() =>
                              handleDelete(deduction.id, "deduction")
                            }
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
        </CustomTabPanel>
      </Box>
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

export default AllowancePage;
