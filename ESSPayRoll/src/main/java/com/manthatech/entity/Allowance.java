package com.manthatech.entity;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "allowances")
public class Allowance {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long aid;

    private String name;
    private String description;
    private boolean isTaxable;
    private boolean isMandatory;
    
    @ManyToOne
    @JoinColumn(name = "employeeId", nullable = false)
    @JsonIgnore
    private Employee employee;
    
    @ManyToOne
    @JoinColumn(name = "pid", nullable = false)
    @JsonIgnore
    private PayRollEntity payrollEntity;
    
    @ManyToOne
    @JoinColumn(name = "payrollId", nullable = false)
    @JsonIgnore
    private PayrollRun payrollrun;
    
    
	public Allowance() {
		
	}
	
	


	public Allowance(Long aid, String name, String description, boolean isTaxable, boolean isMandatory,
			Employee employee, PayRollEntity payrollEntity, PayrollRun payrollrun) {
		super();
		this.aid = aid;
		this.name = name;
		this.description = description;
		this.isTaxable = isTaxable;
		this.isMandatory = isMandatory;
		this.employee = employee;
		this.payrollEntity = payrollEntity;
		this.payrollrun = payrollrun;
	}



	
	public Long getAid() {
		return aid;
	}




	public void setAid(Long aid) {
		this.aid = aid;
	}




	public String getName() {
		return name;
	}











	public void setName(String name) {
		this.name = name;
	}











	public String getDescription() {
		return description;
	}











	public void setDescription(String description) {
		this.description = description;
	}











	public boolean isTaxable() {
		return isTaxable;
	}











	public void setTaxable(boolean isTaxable) {
		this.isTaxable = isTaxable;
	}











	public boolean isMandatory() {
		return isMandatory;
	}











	public void setMandatory(boolean isMandatory) {
		this.isMandatory = isMandatory;
	}











	public Employee getEmployee() {
		return employee;
	}











	public void setEmployee(Employee employee) {
		this.employee = employee;
	}











	























	public PayRollEntity getPayrollEntity() {
		return payrollEntity;
	}


































	public void setPayrollEntity(PayRollEntity payrollEntity) {
		this.payrollEntity = payrollEntity;
	}


































	public PayrollRun getPayrollrun() {
		return payrollrun;
	}











	public void setPayrollrun(PayrollRun payrollrun) {
		this.payrollrun = payrollrun;
	}











	





    
    
}


