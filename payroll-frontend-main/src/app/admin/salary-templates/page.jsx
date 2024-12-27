"use client";
import { apiClient } from "@/lib/api";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const TemplatesPage = () => {
  const [salaryTemplates, setSalaryTemplates] = useState([]);

  useEffect(() => {
    apiClient
      .get("/api/salary-structures")
      .then((response) => {
        setSalaryTemplates(response.data);
      })
      .catch((error) => {
        console.error("Error fetching Templates:", error);
      });
  }, []);

  return (
    <>
      <Box>
        <Typography variant="h4" gutterBottom align="center" color="primary">
          Salary Templates
        </Typography>
      </Box>
      <Box
        mb={4}
        sx={{
          backgroundColor: "#ffffff",
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 1000 }} aria-label="Templates Table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Template Name</TableCell>
                <TableCell align="right">Description</TableCell>
                <TableCell align="right">Base Salary</TableCell>
                <TableCell align="right">Housing Allowance</TableCell>
                <TableCell align="right">Medical Reimbursement</TableCell>
                <TableCell align="right">Transport Allowances</TableCell>
                <TableCell align="right">Special Allowances</TableCell>
                <TableCell align="right">Provident Fund</TableCell>
                <TableCell align="right">Professional Tax</TableCell>
                <TableCell align="right">Country</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {salaryTemplates.map((template) => (
                <TableRow
                  key={template.id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell align="left">{template.id}</TableCell>
                  <TableCell component="th" scope="row">
                    <Typography
                      component="span"
                      fontSize="0.9rem"
                      color="secondary"
                      sx={{
                        ":hover": { textDecoration: "underline" },
                      }}
                    >
                      <Link href={`/admin/salary-templates/${template.id}`}>
                        {template.name}
                      </Link>
                    </Typography>
                  </TableCell>
                  <TableCell align="right">{template.description}</TableCell>
                  <TableCell align="right">{template.baseSalary}</TableCell>
                  <TableCell align="right">
                    {template.housingAllowance || "N/A"}
                  </TableCell>
                  <TableCell align="right">
                    {template.medicalReimbursement || "N/A"}
                  </TableCell>
                  <TableCell align="right">
                    {template.transportAllowance || "N/A"}
                  </TableCell>
                  <TableCell align="right">
                    {template.specialAllowance || "N/A"}
                  </TableCell>
                  <TableCell align="right">
                    {template.providentFund || "N/A"}
                  </TableCell>
                  <TableCell align="right">
                    {template.professionalTax || "N/A"}
                  </TableCell>
                  <TableCell align="right">
                    {template.country_id ? template.countryName : "NA"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default TemplatesPage;
