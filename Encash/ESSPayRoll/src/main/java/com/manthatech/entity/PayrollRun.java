package com.manthatech.entity;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "payrolls")
public class PayrollRun {

	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long payrollId;

	    @ManyToOne
	    @JoinColumn(name = "employeeId", nullable = false)
	    @JsonIgnore
	    private Employee employee;

	    private LocalDate payPeriodStart;
	    private LocalDate payPeriodEnd;
	    private LocalDate payDate;
	    private BigDecimal totalEarnings;
	    private BigDecimal totalDeductions;
	    private BigDecimal netPay;

	    private LocalDateTime createdAt = LocalDateTime.now();
	    private LocalDateTime updatedAt = LocalDateTime.now();
	    
	    
		public PayrollRun() {
			
		}
		
		
		public PayrollRun(Long payrollId, Employee employee, LocalDate payPeriodStart, LocalDate payPeriodEnd,
				LocalDate payDate, BigDecimal totalEarnings, BigDecimal totalDeductions, BigDecimal netPay,
				LocalDateTime createdAt, LocalDateTime updatedAt) {
			super();
			this.payrollId = payrollId;
			this.employee = employee;
			this.payPeriodStart = payPeriodStart;
			this.payPeriodEnd = payPeriodEnd;
			this.payDate = payDate;
			this.totalEarnings = totalEarnings;
			this.totalDeductions = totalDeductions;
			this.netPay = netPay;
			this.createdAt = createdAt;
			this.updatedAt = updatedAt;
		}


		public Long getPayrollId() {
			return payrollId;
		}
		public void setPayrollId(Long payrollId) {
			this.payrollId = payrollId;
		}
		public Employee getEmployee() {
			return employee;
		}
		public void setEmployee(Employee employee) {
			this.employee = employee;
		}
		public LocalDate getPayPeriodStart() {
			return payPeriodStart;
		}
		public void setPayPeriodStart(LocalDate payPeriodStart) {
			this.payPeriodStart = payPeriodStart;
		}
		public LocalDate getPayPeriodEnd() {
			return payPeriodEnd;
		}
		public void setPayPeriodEnd(LocalDate payPeriodEnd) {
			this.payPeriodEnd = payPeriodEnd;
		}
		public LocalDate getPayDate() {
			return payDate;
		}
		public void setPayDate(LocalDate payDate) {
			this.payDate = payDate;
		}
		public BigDecimal getTotalEarnings() {
			return totalEarnings;
		}
		public void setTotalEarnings(BigDecimal totalEarnings) {
			this.totalEarnings = totalEarnings;
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
