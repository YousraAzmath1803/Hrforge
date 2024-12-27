package com.example.taxmanagement.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "employee_tax")
public class EmployeeTax {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int employeeId;

    @Column(nullable = false)
    private String employeeName;

    @Column(nullable = false)
    private int taxYear;

    @Column(nullable = false)
    private double totalIncome;

    @Column
    private double taxDeducted;

    @Column
    private double remainingTaxLiability;

    // Getters and Setters
    public int getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(int employeeId) {
        this.employeeId = employeeId;
    }

    public String getEmployeeName() {
        return employeeName;
    }

    public void setEmployeeName(String employeeName) {
        this.employeeName = employeeName;
    }

    public int getTaxYear() {
        return taxYear;
    }

    public void setTaxYear(int taxYear) {
        this.taxYear = taxYear;
    }

    public double getTotalIncome() {
        return totalIncome;
    }

    public void setTotalIncome(double totalIncome) {
        this.totalIncome = totalIncome;
    }

    public double getTaxDeducted() {
        return taxDeducted;
    }

    public void setTaxDeducted(double taxDeducted) {
        this.taxDeducted = taxDeducted;
    }

    public double getRemainingTaxLiability() {
        return remainingTaxLiability;
    }

    public void setRemainingTaxLiability(double remainingTaxLiability) {
        this.remainingTaxLiability = remainingTaxLiability;
    }
}
