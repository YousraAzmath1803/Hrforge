package com.example.taxmanagement.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "investment_declarations")
public class InvestmentDeclaration {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int declarationId;

    @ManyToOne
    @JoinColumn(name = "employee_id", nullable = false)
    private EmployeeTax employee;

    @Column(nullable = false)
    private String investmentType;

    @Column(nullable = false)
    private double amount;

    @Column
    private String proofDocument;

    @Column
    private boolean approved;

    // Getters and Setters
    public int getDeclarationId() {
        return declarationId;
    }

    public void setDeclarationId(int declarationId) {
        this.declarationId = declarationId;
    }

    public EmployeeTax getEmployee() {
        return employee;
    }

    public void setEmployee(EmployeeTax employee) {
        this.employee = employee;
    }

    public String getInvestmentType() {
        return investmentType;
    }

    public void setInvestmentType(String investmentType) {
        this.investmentType = investmentType;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public String getProofDocument() {
        return proofDocument;
    }

    public void setProofDocument(String proofDocument) {
        this.proofDocument = proofDocument;
    }

    public boolean isApproved() {
        return approved;
    }

    public void setApproved(boolean approved) {
        this.approved = approved;
    }
}

