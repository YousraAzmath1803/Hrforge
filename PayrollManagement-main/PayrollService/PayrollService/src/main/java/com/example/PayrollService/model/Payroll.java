package com.example.PayrollService.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Column;
import jakarta.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Table(name = "payroll")
public class Payroll {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "employee_id")
    private Long employeeId;

    @Column(name = "federal_income_tax")
    private Double federalIncomeTax;

    @Column(name = "gross_pay")
    private Double grossPay;

    @Column(name = "health_insurance")
    private Double healthInsurance;

    @Column(name = "hourly_rate")
    private Double hourlyRate;

    @Column(name = "hours_worked")
    private Double hoursWorked;

    @Column(name = "medicare_tax")
    private Double medicareTax;

    @Column(name = "net_pay")
    private Double netPay;

    @Column(name = "retirement_contributions")
    private Double retirementContributions;

    @Column(name = "social_security_tax")
    private Double socialSecurityTax;

    @Column(name = "state_income_tax")
    private Double stateIncomeTax;

    @Column(name = "total_deductions")
    private Double totalDeductions;

    public Payroll(int i, double v, int i1, double v1, double v2, double v3, double v4, double v5, double v6, double v7, double v8, double v9) {
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    public Double getHourlyRate() {
        return hourlyRate;
    }

    public void setHourlyRate(Double hourlyRate) {
        this.hourlyRate = hourlyRate;
    }

    public Double getHoursWorked() {
        return hoursWorked;
    }

    public void setHoursWorked(Double hoursWorked) {
        this.hoursWorked = hoursWorked;
    }

    public Double getGrossPay() {
        return grossPay;
    }

    public void setGrossPay(Double grossPay) {
        this.grossPay = grossPay;
    }

    public Double getFederalIncomeTax() {
        return federalIncomeTax;
    }

    public void setFederalIncomeTax(Double federalIncomeTax) {
        this.federalIncomeTax = federalIncomeTax;
    }

    public Double getStateIncomeTax() {
        return stateIncomeTax;
    }

    public void setStateIncomeTax(Double stateIncomeTax) {
        this.stateIncomeTax = stateIncomeTax;
    }

    public Double getSocialSecurityTax() {
        return socialSecurityTax;
    }

    public void setSocialSecurityTax(Double socialSecurityTax) {
        this.socialSecurityTax = socialSecurityTax;
    }

    public Double getMedicareTax() {
        return medicareTax;
    }

    public void setMedicareTax(Double medicareTax) {
        this.medicareTax = medicareTax;
    }

    public Double getHealthInsurance() {
        return healthInsurance;
    }

    public void setHealthInsurance(Double healthInsurance) {
        this.healthInsurance = healthInsurance;
    }

    public Double getRetirementContributions() {
        return retirementContributions;
    }

    public void setRetirementContributions(Double retirementContributions) {
        this.retirementContributions = retirementContributions;
    }

    public Double getTotalDeductions() {
        return totalDeductions;
    }

    public void setTotalDeductions(Double totalDeductions) {
        this.totalDeductions = totalDeductions;
    }

    public Double getNetPay() {
        return netPay;
    }

    public void setNetPay(Double netPay) {
        this.netPay = netPay;
    }
}
