package com.manthatech.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "employees")
public class Employee {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long employeeId;

    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String department;
    private String designation;
    private LocalDate hireDate;
    private boolean enabled;

    
    
    public Employee() {
		
	}
    
    
	




	public Employee(Long employeeId, String firstName, String lastName, String email, String phone, String department,
			String designation, LocalDate hireDate, boolean enabled, SalaryStructure salaryStructure, Job job,
			EmployeeType employeeType, LocalDateTime createdAt, LocalDateTime updatedAt) {
		super();
		this.employeeId = employeeId;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.phone = phone;
		this.department = department;
		this.designation = designation;
		this.hireDate = hireDate;
		this.enabled = enabled;
		this.salaryStructure = salaryStructure;
		this.job = job;
		this.employeeType = employeeType;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}







	@ManyToOne
    @JoinColumn(name = "ssid", referencedColumnName = "ssid")
	@JsonIgnore
    private SalaryStructure salaryStructure;
	
	@ManyToOne
    @JoinColumn(name = "job_id", nullable = false)
    private Job job;

    @Enumerated(EnumType.STRING)
    @Column(name = "employee_type")
    private EmployeeType employeeType;

  
    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime updatedAt = LocalDateTime.now();
	public Long getEmployeeId() {
		return employeeId;
	}
	public void setEmployeeId(Long employeeId) {
		this.employeeId = employeeId;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	
	public String getDepartment() {
		return department;
	}





	public void setDepartment(String department) {
		this.department = department;
	}





	public String getDesignation() {
		return designation;
	}





	public void setDesignation(String designation) {
		this.designation = designation;
	}





	public LocalDate getHireDate() {
		return hireDate;
	}
	public void setHireDate(LocalDate hireDate) {
		this.hireDate = hireDate;
	}
	public boolean isEnabled() {
		return enabled;
	}
	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}
	
	public SalaryStructure getSalaryStructure() {
		return salaryStructure;
	}







	public void setSalaryStructure(SalaryStructure salaryStructure) {
		this.salaryStructure = salaryStructure;
	}







	public Job getJob() {
		return job;
	}
	public void setJob(Job job) {
		this.job = job;
	}
	public EmployeeType getEmployeeType() {
		return employeeType;
	}
	public void setEmployeeType(EmployeeType employeeType) {
		this.employeeType = employeeType;
	}
	public LocalDateTime getCreatedAt() {
		return createdAt;
	}
	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}
	public LocalDateTime getUpdatedAt() {
		return updatedAt;
	}
	public void setUpdatedAt(LocalDateTime updatedAt) {
		this.updatedAt = updatedAt;
	}
    
}
