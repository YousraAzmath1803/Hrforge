"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EmployeeForm from "./EmployeeForm";
import FullTimeSalaryForm from "./FullTimeSalaryForm";
import EmployeeSensitiveInfoForm from "./EmployeeSensitiveInfoForm";
import { useEmployeeContext, EmployeeProvider } from "./EmployeeContext";
import { useRouter } from "next/navigation";

const steps = ["Add Employee Details", "Create Salary", "Add Additional Info"];

function StepContent({ step }) {
  switch (step) {
    case 0:
      return <EmployeeForm />;
    case 1:
      return <FullTimeSalaryForm />;
    case 2:
      return <EmployeeSensitiveInfoForm />;
    default:
      return <Typography>Unknown step</Typography>;
  }
}

export default function HorizontalLinearStepper({ initialMode, employeeId }) {
  const [activeStep, setActiveStep] = React.useState(0);
  const { employeeData, updateEmployeeData } = useEmployeeContext();
  const router = useRouter();

  React.useEffect(() => {
    if ((initialMode === "edit") !== employeeData.isExisting) {
      updateEmployeeData({
        id: employeeId,
        isExisting: initialMode === "edit",
      });
    }
  }, [initialMode, updateEmployeeData, employeeData.isExisting]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleAllEmployees = () => {
    router.push("/admin/employees");
  };

  const handleAddNewEmployee = () => {
    updateEmployeeData({
      id: null,
      isExisting: false,
    });
    router.push("/admin/employees/new");
  };

  const isNextDisabled = () => {
    return false;
  };

  const commonStyles = {
    width: "100%",
    padding: "10px",
  };

  const editStyles = {
    padding: "40px",
  };

  const combinedStyles =
    initialMode === "edit" ? { ...commonStyles, ...editStyles } : commonStyles;

  const buttonStyles = {
    margin: "8px",
    padding: "8px 16px",
    fontSize: "14px",
    borderRadius: "4px",
  };
  const fixedButtonStyles = {
    margin: "8px",
    padding: "8px 16px",
    fontSize: "14px",
    borderRadius: "4px",
    position: "fixed",
    bottom: "20px", // adjust to your desired distance from bottom
    right: "20px",
  };

  return (
    <Box style={combinedStyles}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography
            color="success"
            variant="h4"
            textAlign="center"
            style={{ marginTop: "32px", marginBottom: "8px" }}
          >
            Employee {initialMode === "edit" ? "Updated" : "Added"} Successfully
          </Typography>
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              paddingTop: "16px",
            }}
          >
            <Button
              onClick={handleAllEmployees}
              style={buttonStyles}
              color="secondary"
              variant="contained"
            >
              All Employees
            </Button>
            <Button
              onClick={handleAddNewEmployee}
              style={buttonStyles}
              color="primary"
              variant="contained"
            >
              Add New Employee
            </Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Box my={3}>
            <StepContent step={activeStep} />
          </Box>
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              paddingTop: "16px",
              marginBottom: "16px",
            }}
          >
            {activeStep !== 0 && (
              <Button
                color="secondary"
                variant="outlined"
                disabled={activeStep === 0}
                onClick={handleBack}
                style={{
                  margin: "8px",
                  padding: "8px 16px",
                  fontSize: "14px",
                  borderRadius: "4px",
                  position: "fixed",
                  bottom: "20px",
                  left: "80px",
                }}
              >
                Back
              </Button>
            )}
            <Box style={{ flex: "1 1 auto" }} />
            <Button
              onClick={handleNext}
              variant="contained"
              color="primary"
              disabled={isNextDisabled()}
              style={{
                margin: "8px",
                padding: "8px 16px",
                fontSize: "14px",
                borderRadius: "4px",
                position: "fixed",
                bottom: "20px", // adjust to your desired distance from bottom
                right: "20px",
              }}
            >
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
