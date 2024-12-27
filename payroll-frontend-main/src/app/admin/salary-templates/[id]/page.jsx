"use client"
import React from "react";
import SalaryStructureForm from "../SalaryStructureForm";
import { Box, Typography, Button } from "@mui/material";
import { useRouter } from 'next/navigation'; // Corrected import path

const EditSalaryTemplate = ({ params }) => {
  const { id } = params;
  const router = useRouter();

  return (
    <Box>
      <Box justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>

        <Typography
          variant="h4"
          gutterBottom
          align="center"
          color="primary"
          m={3}
        >

          Update Salary Structure
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => router.push('/admin/salary-templates/create')}
          sx={{ mt: -15}} // Added margin top -5
        >
          Back
        </Button>
      </Box>


      <SalaryStructureForm templateId={id} />
    </Box>
  );
};

export default EditSalaryTemplate;
