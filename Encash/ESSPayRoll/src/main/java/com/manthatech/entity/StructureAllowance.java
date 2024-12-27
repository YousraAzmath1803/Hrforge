package com.manthatech.entity;

import java.math.BigDecimal;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "structure_allowances")
public class StructureAllowance {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "ssid")
    @JsonIgnore
    private SalaryStructure salaryStructure;

    @ManyToOne
    @JoinColumn(name = "aid")
    @JsonIgnore
    private Allowance allowance;

    private BigDecimal amount;

	public StructureAllowance() {
		
	}

	public StructureAllowance(Long id, SalaryStructure salaryStructure, Allowance allowance, BigDecimal amount) {
		super();
		this.id = id;
		this.salaryStructure = salaryStructure;
		this.allowance = allowance;
		this.amount = amount;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public SalaryStructure getSalaryStructure() {
		return salaryStructure;
	}

	public void setSalaryStructure(SalaryStructure salaryStructure) {
		this.salaryStructure = salaryStructure;
	}

	public Allowance getAllowance() {
		return allowance;
	}

	public void setAllowance(Allowance allowance) {
		this.allowance = allowance;
	}

	public BigDecimal getAmount() {
		return amount;
	}

	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}
}
