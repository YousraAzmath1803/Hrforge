"use client";

import {
  Box,
  Button,
  IconButton,
  Typography,
  CircularProgress,
  TextField,
} from "@mui/material";
import { green, red } from "@mui/material/colors";
import Link from "next/link";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete"; // Import DeleteIcon
import { apiClient } from "@/lib/api";

const API_BASE_URL = "/api";

const Employees = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await apiClient.get(`${API_BASE_URL}/employees`);
        const employeesWithId = response.data
          .map((employee) => ({
            ...employee,
            id: employee.employeeId,
            fullName: employee.firstName + " " + employee.lastName,
            jobName: employee.job.jobTitle,
            departmentName: employee.department.departmentName,
            countryName: employee.country ? employee.country.countryName : "NA",
          }))
          .sort((a, b) => a.employeeId - b.employeeId); // Sort by employeeId
        console.log(employeesWithId);
        setRows(employeesWithId);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    try {
      await apiClient.delete(`${API_BASE_URL}/employees/${id}`);
      setRows((prevRows) => prevRows.filter((row) => row.id !== id));
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredRows = rows.filter((row) =>
    row.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    { field: "employeeId", headerName: "ID", width: 80 },
    {
      field: "fullName",
      headerName: "Name",
      width: 200,
    },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phone", headerName: "Phone", width: 150 },
    { field: "hireDate", headerName: "DOJ", width: 120 },
    {
      field: "enabled",
      headerName: "Status",
      renderCell: (params) => (
        <Typography
          component="span"
          sx={{
            fontSize: "0.85rem",
            fontWeight: "bold",
            padding: "2px 10px",
            borderRadius: "4px",
            backgroundColor: params.value ? green[100] : red[100],
            color: params.value ? green[800] : red[800],
            display: "inline-block",
          }}
        >
          {params.value ? "Active" : "Disabled"}
        </Typography>
      ),
      width: 100,
    },
    { field: "jobName", headerName: "Designation", width: 150 },
    {
      field: "departmentName",
      headerName: "Department",
      width: 130,
    },
    { field: "countryName", headerName: "Country", width: 120 },
    {
      field: "actions",
      headerName: "Actions",
      renderCell: (params) => (
        <>
          <IconButton
            color="primary"
            onClick={() => {
              window.location.href = `/admin/employees/${params.row.id}`;
            }}
          >
            <EditIcon />
          </IconButton>
          {/* Delete button */}
          {/* <IconButton
            color="secondary"
            onClick={() => handleDelete(params.row.id)}
          >
            <DeleteIcon />
          </IconButton> */}
        </>
      ),
      width: 150,
    },
  ];

  return (
    <>
      <Box m={2}>
        <Typography
          variant="h5"
          fontWeight="bold"
          color="primary"
          sx={{ textAlign: "center", flex: 1 }}
        >
          Employee List
        </Typography>
        <Box
          mb={2}
          mt={2}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Link href="/admin/employees/new">
            <Button variant="contained" color="primary">
              Add Employee
            </Button>
          </Link>
          <TextField
            label="Search by Name"
            variant="outlined"
            value={searchQuery}
            onChange={handleSearch}
            className="flex-grow"
          />
        </Box>

        {/* Outer container */}
        <Box
          sx={{
            height: 500,
            width: "100%",
            display: "flex", // Ensures that this container doesn't affect page scroll
            justifyContent: "center",
          }}
        >
          {/* Inner container to control scroll behavior */}
          <Box
            sx={{
              width: "100%",
              maxWidth: 1260, // Limit to a reasonable width if needed
              overflowX: "auto", // Horizontal scroll confined to this box
              "& .MuiDataGrid-root": {
                backgroundColor: "#fff",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#f5f5f5",
                borderBottom: "1px solid #e0e0e0",
                fontSize: "1rem",
                fontWeight: "bold",
              },
              "& .MuiDataGrid-columnHeaderTitle": {
                fontWeight: "bold",
                color: "#333",
              },
              "& .MuiDataGrid-row": {
                "&:nth-of-type(odd)": {
                  backgroundColor: "#f9f9f9",
                },
                "&:hover": {
                  backgroundColor: "#e0f7fa",
                },
              },
              "& .MuiDataGrid-cell": {
                padding: "12px",
                fontSize: "0.95rem",
              },
            }}
          >
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
              <DataGrid
                rows={filteredRows}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 10 },
                  },
                }}
                disableColumnMenu
                disableRowSelectionOnClick
              />
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Employees;
