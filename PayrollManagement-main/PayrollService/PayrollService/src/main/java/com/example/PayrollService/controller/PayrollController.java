package com.example.PayrollService.controller;

import com.example.PayrollService.model.Payroll;
import com.example.PayrollService.model.SalaryDetails;
import com.example.PayrollService.service.PayrollService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/payroll")
public class PayrollController {

    @Autowired
    private PayrollService payrollService;

    @PostMapping
    public ResponseEntity<Payroll> createPayroll(@RequestBody Payroll payroll) {
        try {
            Payroll createdPayroll = payrollService.createPayroll(payroll);
            return new ResponseEntity<>(createdPayroll, HttpStatus.CREATED);
        } catch (Exception e) {
            // Log the exception if needed
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Payroll> getPayrollById(@PathVariable("id") Long id) {
        Optional<Payroll> payroll = payrollService.getPayrollById(id);
        return payroll.map(p -> new ResponseEntity<>(p, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping
    public ResponseEntity<List<Payroll>> getAllPayrolls() {
        List<Payroll> payrolls = payrollService.getAllPayrolls();
        return new ResponseEntity<>(payrolls, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Payroll> updatePayroll(@PathVariable("id") Long id, @RequestBody Payroll payroll) {
        try {
            Payroll updatedPayroll = payrollService.updatePayroll(id, payroll);
            return updatedPayroll != null
                    ? new ResponseEntity<>(updatedPayroll, HttpStatus.OK)
                    : new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            // Log the exception if needed
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePayroll(@PathVariable("id") Long id) {
        try {
            boolean isDeleted = payrollService.deletePayroll(id);
            return isDeleted ? new ResponseEntity<>(HttpStatus.NO_CONTENT)
                    : new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            // Log the exception if needed
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/calculate")
    public ResponseEntity<?> calculateSalary(
            @RequestParam double hourlyRate,
            @RequestParam double hoursWorked) {

        // Validation
        if (hourlyRate < 0 || hoursWorked < 0) {
            return new ResponseEntity<>("Hourly rate and hours worked must be non-negative.", HttpStatus.BAD_REQUEST);
        }

        // Calculating salary
        try {
            SalaryDetails salaryDetails = payrollService.calculateSalary(hourlyRate, hoursWorked);
            return new ResponseEntity<>(salaryDetails, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            // Log the exception if needed
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
