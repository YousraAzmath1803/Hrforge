package com.manthatech.entity;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "payrolless")
public class PayRollEntity {

	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long pid;

	    @ManyToOne
	    @JoinColumn(name = "employeeId", referencedColumnName = "employeeId")
	    private Employee employee;
	 
	    // Mapping to PayrollRun (for payment details and net pay)
	    @ManyToOne
	    @JoinColumn(name = "payrollId", referencedColumnName = "payrollId")
	    private PayrollRun payrollRun;

	    // Mapping to SalaryStructure (for base salary)
	    @ManyToOne
	    @JoinColumn(name = "ssid", referencedColumnName = "ssid")
	    private SalaryStructure salaryStructure;

	    // Mapping to Allowances (list of allowances for this payroll entity)
	    @OneToMany(mappedBy = "payrollEntity", cascade = CascadeType.ALL)
	    private List<Allowance> allowances;

	    // Mapping to Deductions (list of deductions for this payroll entity)
	    @OneToMany(mappedBy = "payrollEntity", cascade = CascadeType.ALL)
	    private List<Deduction> deductions;

	    // Fields to store calculated totals and other necessary data
	    @Column(name = "total_allowances")
	    private BigDecimal totalAllowances;

	    @Column(name = "total_deductions")
	    private BigDecimal totalDeductions;

	    @Column(name = "net_pay")
	    private BigDecimal netPay;  // Can be fetched from PayrollRun

	    @Column(name = "payment_date")
	    private LocalDate paymentDate;  // From PayrollRun

		public PayRollEntity() {
			
		}

		

		public PayRollEntity(Long pid, Employee employee, PayrollRun payrollRun, SalaryStructure salaryStructure,
				List<Allowance> allowances, List<Deduction> deductions, BigDecimal totalAllowances,
				BigDecimal totalDeductions, BigDecimal netPay, LocalDate paymentDate) {
			super();
			this.pid = pid;
			this.employee = employee;
			this.payrollRun = payrollRun;
			this.salaryStructure = salaryStructure;
			this.allowances = allowances;
			this.deductions = deductions;
			this.totalAllowances = totalAllowances;
			this.totalDeductions = totalDeductions;
			this.netPay = netPay;
			this.paymentDate = paymentDate;
		}



		

		public Long getPid() {
			return pid;
		}



		public void setPid(Long pid) {
			this.pid = pid;
		}



		public Employee getEmployee() {
			return employee;
		}

		public void setEmployee(Employee employee) {
			this.employee = employee;
		}

		public PayrollRun getPayrollRun() {
			return payrollRun;
		}

		public void setPayrollRun(PayrollRun payrollRun) {
			this.payrollRun = payrollRun;
		}

		public SalaryStructure getSalaryStructure() {
			return salaryStructure;
		}

		public void setSalaryStructure(SalaryStructure salaryStructure) {
			this.salaryStructure = salaryStructure;
		}

		public List<Allowance> getAllowances() {
			return allowances;
		}

		public void setAllowances(List<Allowance> allowances) {
			this.allowances = allowances;
		}

		public List<Deduction> getDeductions() {
			return deductions;
		}

		public void setDeductions(List<Deduction> deductions) {
			this.deductions = deductions;
		}

		public BigDecimal getTotalAllowances() {
			return totalAllowances;
		}

		public void setTotalAllowances(BigDecimal totalAllowances) {
			this.totalAllowances = totalAllowances;
		}

		public BigDecimal getTotalDeductions() {
			return totalDeductions;
		}

		public void setTotalDeductions(BigDecimal totalDeductions) {
			this.totalDeductions = totalDeductions;
		}

		public BigDecimal getNetPay() {
			return netPay;
		}

		public void setNetPay(BigDecimal netPay) {
			this.netPay = netPay;
		}

		public LocalDate getPaymentDate() {
			return paymentDate;
		}

		public void setPaymentDate(LocalDate paymentDate) {
			this.paymentDate = paymentDate;
		}

	  
	
}
