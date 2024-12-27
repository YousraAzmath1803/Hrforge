"use client";
import React, { useState, useEffect } from "react";
import SalaryStructureForm from "../SalaryStructureForm";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/api";

const API_BASE_URL = "/api";

const CreateSalaryTemplate = () => {
  const router = useRouter();
  const [openDialog, setOpenDialog] = useState(false);
  const [salaryStructures, setSalaryStructures] = useState([]);

  const fetchSalaryStructures = async () => {
    try {
      const response = await apiClient.get(`${API_BASE_URL}/salary-structures`);
      setSalaryStructures(response.data);
    } catch (error) {
      console.error("Error fetching salary structures:", error);
    }
  };

  const handleEditRedirect = (id) => {
    router.push(`/admin/salary-templates/${id}`);
    setOpenDialog(false);
  };

  return (
    <Box>
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        color="primary"
        m={3}
      >
        Create Salary Structure
      </Typography>

      <Box display="flex" justifyContent="center" sx={{ mt: 3 }}>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            fetchSalaryStructures();
            setOpenDialog(true);
          }}
          sx={{ width: "300px", textAlign: "center" }} // Width and alignment for button
        >
          Edit Salary Structure
        </Button>
      </Box>

      <SalaryStructureForm />

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Select Salary Structure to Edit</DialogTitle>
        <DialogContent>
          <List>
            {salaryStructures.map((structure) => (
              <ListItem
                button
                key={structure.id}
                onClick={() => handleEditRedirect(structure.id)}
              >
                <ListItemText primary={structure.name} />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenDialog(false)}
            color="primary"
            sx={{ width: "150px", margin: "0 auto" }} // Center the "Cancel" button
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CreateSalaryTemplate;
