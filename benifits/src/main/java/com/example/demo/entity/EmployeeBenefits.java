package com.example.demo.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "employee_benefits")
public class EmployeeBenefits {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

   // @NotNull(message = "Employee ID cannot be null")
    @Column(nullable = false)
    private Long employeeId;

    @NotNull(message = "Name cannot be null")
    @Size(min = 1, max = 100, message = "Name must be between 1 and 100 characters")
    @Column(nullable = false)
    private String name;

    @NotNull(message = "Basic salary cannot be null")
    @Min(value = 0, message = "Basic salary must be positive")
    @Column(nullable = false)
    private double basicSalary;

    @Min(value = 0, message = "Provident Fund must be positive")
    @Column(nullable = false)
    private double providentFund;
    
    @NotNull(message = "Joining date cannot be null")
    @Column(nullable = false)
    private LocalDate joiningDate;

    @Override
	public String toString() {
		return "EmployeeBenefits [id=" + id + ", employeeId=" + employeeId + ", name=" + name + ", basicSalary="
				+ basicSalary + ", providentFund=" + providentFund + ", gratuity=" + gratuity + ", insurance="
				+ insurance + ", overtimeHours=" + overtimeHours + ", overtimeWages=" + overtimeWages
				+ ", retirementBenefit=" + retirementBenefit + ", benefitCalculationType=" + benefitCalculationType
				+ "]";
	}

	@Min(value = 0, message = "Gratuity must be positive")
    @Column(nullable = false)
    private double gratuity;

    @Min(value = 0, message = "Insurance must be positive")
    @Column(nullable = false)
    private double insurance;

    public EmployeeBenefits(Long id, @NotNull(message = "Employee ID cannot be null") Long employeeId,
			@NotNull(message = "Name cannot be null") @Size(min = 1, max = 100, message = "Name must be between 1 and 100 characters") String name,
			@NotNull(message = "Basic salary cannot be null") @Min(value = 0, message = "Basic salary must be positive") double basicSalary,
			@Min(value = 0, message = "Provident Fund must be positive") double providentFund,
			@NotNull(message = "Joining date cannot be null") LocalDate joiningDate,
			@Min(value = 0, message = "Gratuity must be positive") double gratuity,
			@Min(value = 0, message = "Insurance must be positive") double insurance,
			@Min(value = 0, message = "Overtime hours must be positive") double overtimeHours,
			@Min(value = 0, message = "Overtime wages must be positive") double overtimeWages,
			@Min(value = 0, message = "Retirement Benefit must be positive") double retirementBenefit,
			@NotNull(message = "Benefit calculation type cannot be null") String benefitCalculationType,
			@NotNull @Min(value = 0, message = "Years of service must be positive") int yearsOfService) {
		super();
		this.id = id;
		this.employeeId = employeeId;
		this.name = name;
		this.basicSalary = basicSalary;
		this.providentFund = providentFund;
		this.joiningDate = joiningDate;
		this.gratuity = gratuity;
		this.insurance = insurance;
		this.overtimeHours = overtimeHours;
		this.overtimeWages = overtimeWages;
		this.retirementBenefit = retirementBenefit;
		this.benefitCalculationType = benefitCalculationType;
		this.yearsOfService = yearsOfService;
	}

	@Min(value = 0, message = "Overtime hours must be positive")
    @Column(nullable = false)
    private double overtimeHours;

    public LocalDate getJoiningDate() {
		return joiningDate;
	}




	public void setJoiningDate(LocalDate joiningDate) {
		this.joiningDate = joiningDate;
	}

	@Min(value = 0, message = "Overtime wages must be positive")
    @Column(nullable = false)
    private double overtimeWages;
    
    public EmployeeBenefits() {
    }

	


	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getEmployeeId() {
		return employeeId;
	}

	public void setEmployeeId(Long employeeId) {
		this.employeeId = employeeId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public double getBasicSalary() {
		return basicSalary;
	}

	public void setBasicSalary(double basicSalary) {
		this.basicSalary = basicSalary;
	}

	public double getProvidentFund() {
		return providentFund;
	}

	public void setProvidentFund(double providentFund) {
		this.providentFund = providentFund;
	}

	public double getGratuity() {
		return gratuity;
	}

	public void setGratuity(double gratuity) {
		this.gratuity = gratuity;
	}

	public double getInsurance() {
		return insurance;
	}

	public void setInsurance(double insurance) {
		this.insurance = insurance;
	}

	public double getOvertimeHours() {
		return overtimeHours;
	}

	public void setOvertimeHours(double overtimeHours) {
		this.overtimeHours = overtimeHours;
	}

	public double getOvertimeWages() {
		return overtimeWages;
	}

	public void setOvertimeWages(double overtimeWages) {
		this.overtimeWages = overtimeWages;
	}

	public double getRetirementBenefit() {
		return retirementBenefit;
	}

	public void setRetirementBenefit(double retirementBenefit) {
		this.retirementBenefit = retirementBenefit;
	}

	public String getBenefitCalculationType() {
		return benefitCalculationType;
	}

	public void setBenefitCalculationType(String benefitCalculationType) {
		this.benefitCalculationType = benefitCalculationType;
	}

	@Min(value = 0, message = "Retirement Benefit must be positive")
    @Column(nullable = false)
    private double retirementBenefit;

    @NotNull(message = "Benefit calculation type cannot be null")
    @Column(nullable = false)
    private String benefitCalculationType; // e.g., "India", "Global"
    
   
    public int getYearsOfService() {
		return yearsOfService;
	}




	public void setYearsOfService(int yearsOfService) {
		this.yearsOfService = yearsOfService;
	}

	@NotNull
    @Min(value = 0, message = "Years of service must be positive")
    @Column(nullable = false)
    private int yearsOfService;




}
