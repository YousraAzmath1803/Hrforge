package com.example.Encash.dto;

import java.time.LocalDate;

public class LeaveEncashmentDTO {

    private Integer employeeId;
    private LocalDate encashmentDate;
    private Integer encashedLeaves;
    private Double amount;

    public Integer getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Integer employeeId) {
        this.employeeId = employeeId;
    }

    public LocalDate getEncashmentDate() {
        return encashmentDate;
    }

    public void setEncashmentDate(LocalDate encashmentDate) {
        this.encashmentDate = encashmentDate;
    }

    public Integer getEncashedLeaves() {
        return encashedLeaves;
    }

    public void setEncashedLeaves(Integer encashedLeaves) {
        this.encashedLeaves = encashedLeaves;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }
}
