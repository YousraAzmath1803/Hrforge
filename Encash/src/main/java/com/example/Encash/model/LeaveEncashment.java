package com.example.Encash.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import org.springframework.data.annotation.Id;

import java.time.LocalDate;

@Entity
public class LeaveEncashment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;
    private Integer employeeId;
    private LocalDate encashmentDate;
    private Integer encashedLeaves;
    private Double amount;

    public Long getId() {
        return id;
    }

    public Integer getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Integer employeeId) {
        this.employeeId = employeeId;
    }

    public void setId(Long id) {
        this.id = id;
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
