package com.example.taxmanagement.service;

import com.example.taxmanagement.entity.EmployeeTax;
import org.springframework.stereotype.Service;

@Service
public class TaxCalculationService {

    public EmployeeTax calculateTax(EmployeeTax tax) {
        double totalIncome = tax.getTotalIncome();
        double taxDeducted = 0;

        // Example: Tax slabs
        if (totalIncome <= 250000) {
            taxDeducted = 0; // No tax for income <= 250,000
        } else if (totalIncome <= 500000) {
            taxDeducted = (totalIncome - 250000) * 0.05; // 5% tax
        } else if (totalIncome <= 1000000) {
            taxDeducted = (250000 * 0.05) + ((totalIncome - 500000) * 0.2); // 20% tax
        } else {
            taxDeducted = (250000 * 0.05) + (500000 * 0.2) + ((totalIncome - 1000000) * 0.3); // 30% tax
        }

        tax.setTaxDeducted(taxDeducted);
        tax.setRemainingTaxLiability(totalIncome - taxDeducted); // Assuming income = liability
        return tax;
    }
}
