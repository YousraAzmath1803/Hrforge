"use client";
import React from "react";
import HorizontalLinearStepper from "../EmployeeStepper";
import { Box } from "@mui/material";
import { EmployeeProvider } from "../EmployeeContext";

const AddEmployeePage = () => {
  return (
    <>
      <Box m={4}>
        <EmployeeProvider>
          <HorizontalLinearStepper initialMode="add" />
        </EmployeeProvider>
      </Box>
    </>
  );
};

export default AddEmployeePage;
