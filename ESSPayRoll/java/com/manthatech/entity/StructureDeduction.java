package com.manthatech.entity;

import java.math.BigDecimal;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "structure_deductions")
public class StructureDeduction {

	  @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long sdid;

	    @ManyToOne
	    @JoinColumn(name = "ssid")
	    @JsonBackReference
	    private SalaryStructure salaryStructure;

	    @ManyToOne
	    @JoinColumn(name = "did")
	    private Deduction deduction;

	    private BigDecimal amount;

		public StructureDeduction() {
			
		}

		

		public StructureDeduction(Long sdid, SalaryStructure salaryStructure, Deduction deduction, BigDecimal amount) {
			super();
			this.sdid = sdid;
			this.salaryStructure = salaryStructure;
			this.deduction = deduction;
			this.amount = amount;
		}

		

		public Long getSdid() {
			return sdid;
		}



		public void setSdid(Long sdid) {
			this.sdid = sdid;
		}



		public SalaryStructure getSalaryStructure() {
			return salaryStructure;
		}

		public void setSalaryStructure(SalaryStructure salaryStructure) {
			this.salaryStructure = salaryStructure;
		}

		public Deduction getDeduction() {
			return deduction;
		}

		public void setDeduction(Deduction deduction) {
			this.deduction = deduction;
		}

		public BigDecimal getAmount() {
			return amount;
		}

		public void setAmount(BigDecimal amount) {
			this.amount = amount;
		}
	    
	    
}
