package com.example.PayrollService.model;

public class SalaryDetails {

    private double grossPay;
    private double federalTax;
    private double stateTax;
    private double socialSecurityTax;
    private double medicareTax;
    private double healthInsurance;
    private double retirementContribution;
    private double totalDeductions;
    private double netPay;

    // Default constructor
    public SalaryDetails() {}

    public SalaryDetails(double grossPay, double federalTax, double stateTax,
                         double socialSecurityTax, double medicareTax, double healthInsurance,
                         double retirementContribution, double totalDeductions, double netPay) {
        this.grossPay = grossPay;
        this.federalTax = federalTax;
        this.stateTax = stateTax;
        this.socialSecurityTax = socialSecurityTax;
        this.medicareTax = medicareTax;
        this.healthInsurance = healthInsurance;
        this.retirementContribution = retirementContribution;
        this.totalDeductions = totalDeductions;
        this.netPay = netPay;
    }

    // Getters and setters
    public double getGrossPay() { return grossPay; }
    public void setGrossPay(double grossPay) { this.grossPay = grossPay; }

    public double getFederalTax() { return federalTax; }
    public void setFederalTax(double federalTax) { this.federalTax = federalTax; }

    public double getStateTax() { return stateTax; }
    public void setStateTax(double stateTax) { this.stateTax = stateTax; }

    public double getSocialSecurityTax() { return socialSecurityTax; }
    public void setSocialSecurityTax(double socialSecurityTax) { this.socialSecurityTax = socialSecurityTax; }

    public double getMedicareTax() { return medicareTax; }
    public void setMedicareTax(double medicareTax) { this.medicareTax = medicareTax; }

    public double getHealthInsurance() { return healthInsurance; }
    public void setHealthInsurance(double healthInsurance) { this.healthInsurance = healthInsurance; }

    public double getRetirementContribution() { return retirementContribution; }
    public void setRetirementContribution(double retirementContribution) { this.retirementContribution = retirementContribution; }

    public double getTotalDeductions() { return totalDeductions; }
    public void setTotalDeductions(double totalDeductions) { this.totalDeductions = totalDeductions; }

    public double getNetPay() { return netPay; }
    public void setNetPay(double netPay) { this.netPay = netPay; }
}
