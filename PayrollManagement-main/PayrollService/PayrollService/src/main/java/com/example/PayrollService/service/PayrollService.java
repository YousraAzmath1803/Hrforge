package com.example.PayrollService.service;

import com.example.PayrollService.model.Payroll;
import com.example.PayrollService.model.SalaryDetails;
import com.example.PayrollService.repository.PayrollRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PayrollService {

    @Autowired
    private PayrollRepository payrollRepository;

    // Create a new payroll entry
    public Payroll createPayroll(Payroll payroll) {
        return payrollRepository.save(payroll);
    }

    // Retrieve payroll by ID
    public Optional<Payroll> getPayrollById(Long id) {
        return payrollRepository.findById(id);
    }

    // Retrieve all payroll entries
    public List<Payroll> getAllPayrolls() {
        return payrollRepository.findAll();
    }

    // Update an existing payroll entry
    public Payroll updatePayroll(Long id, Payroll payroll) {
        Optional<Payroll> existingPayrollOpt = payrollRepository.findById(id);
        if (existingPayrollOpt.isPresent()) {
            Payroll existingPayroll = existingPayrollOpt.get();

            existingPayroll.setEmployeeId(payroll.getEmployeeId());
            existingPayroll.setHourlyRate(payroll.getHourlyRate());
            existingPayroll.setHoursWorked(payroll.getHoursWorked());
            existingPayroll.setGrossPay(payroll.getGrossPay());
            existingPayroll.setFederalIncomeTax(payroll.getFederalIncomeTax());
            existingPayroll.setStateIncomeTax(payroll.getStateIncomeTax());
            existingPayroll.setSocialSecurityTax(payroll.getSocialSecurityTax());
            existingPayroll.setMedicareTax(payroll.getMedicareTax());
            existingPayroll.setHealthInsurance(payroll.getHealthInsurance());
            existingPayroll.setRetirementContributions(payroll.getRetirementContributions());
            existingPayroll.setTotalDeductions(payroll.getTotalDeductions());
            existingPayroll.setNetPay(payroll.getNetPay());
            existingPayroll.setCreatedAt(payroll.getCreatedAt());

            return payrollRepository.save(existingPayroll);
        } else {
            return null;
        }
    }

    // Delete a payroll entry
    public boolean deletePayroll(Long id) {
        Optional<Payroll> payroll = payrollRepository.findById(id);
        if (payroll.isPresent()) {
            payrollRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }

    // Calculate salary based on hourly rate and hours worked
    public SalaryDetails calculateSalary(double hourlyRate, double hoursWorked) {
        if (hourlyRate < 0 || hoursWorked < 0) {
            throw new IllegalArgumentException("Hourly rate and hours worked must be non-negative.");
        }

        double grossPay = hourlyRate * hoursWorked;
        double federalTax = grossPay * 0.1; // Assuming 10% for federal tax
        double stateTax = grossPay * 0.05; // Assuming 5% for state tax
        double socialSecurityTax = grossPay * 0.062; // Assuming 6.2% for social security tax
        double medicareTax = grossPay * 0.0145; // Assuming 1.45% for Medicare tax
        double healthInsurance = 100.0; // Assuming a fixed health insurance cost
        double retirementContribution = grossPay * 0.05; // Assuming 5% for retirement contribution

        double totalDeductions = federalTax + stateTax + socialSecurityTax + medicareTax + healthInsurance + retirementContribution;
        double netPay = grossPay - totalDeductions;

        return new SalaryDetails(grossPay, federalTax, stateTax, socialSecurityTax, medicareTax, healthInsurance, retirementContribution, totalDeductions, netPay);
    }
}
