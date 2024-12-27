"use client";
import React from "react";
import HorizontalLinearStepper from "../EmployeeStepper";
import { Box, Typography } from "@mui/material";
import { EmployeeProvider } from "../EmployeeContext";

const EditEmployeePage = ({ params }) => {
  const { id } = params;
  return (
    <EmployeeProvider>
      <HorizontalLinearStepper initialMode="edit" employeeId={id} />
    </EmployeeProvider>
  );
};

export default EditEmployeePage;
