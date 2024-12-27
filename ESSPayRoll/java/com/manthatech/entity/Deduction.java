package com.manthatech.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "deductions")
public class Deduction {

	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long did;

	    private String name;
	    private String description;
	    private boolean isStatutory;
	    private boolean isMandatory;
	    private boolean isPercentageBased;
	    
	    @ManyToOne
	    @JoinColumn(name = "employee_id", nullable = false)
	    private Employee employee;
	    
	    @ManyToOne
	    @JoinColumn(name = "pid", nullable = false)
	    private PayRollEntity payrollEntity;
	    
	    @ManyToOne
	    @JoinColumn(name = "payroll_id", nullable = false)
	    private PayrollRun payrollrun;
	    
		public Deduction() {
			
		}
	    
	    
	    



		public Deduction(Long did, String name, String description, boolean isStatutory, boolean isMandatory,
				boolean isPercentageBased, Employee employee, PayRollEntity payrollEntity, PayrollRun payrollrun) {
			super();
			this.did = did;
			this.name = name;
			this.description = description;
			this.isStatutory = isStatutory;
			this.isMandatory = isMandatory;
			this.isPercentageBased = isPercentageBased;
			this.employee = employee;
			this.payrollEntity = payrollEntity;
			this.payrollrun = payrollrun;
		}




		

		public Long getDid() {
			return did;
		}






		public void setDid(Long did) {
			this.did = did;
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













		public boolean isStatutory() {
			return isStatutory;
		}













		public void setStatutory(boolean isStatutory) {
			this.isStatutory = isStatutory;
		}













		public boolean isMandatory() {
			return isMandatory;
		}













		public void setMandatory(boolean isMandatory) {
			this.isMandatory = isMandatory;
		}













		public boolean isPercentageBased() {
			return isPercentageBased;
		}













		public void setPercentageBased(boolean isPercentageBased) {
			this.isPercentageBased = isPercentageBased;
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
