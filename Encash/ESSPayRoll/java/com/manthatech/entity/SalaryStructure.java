package com.manthatech.entity;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;


@Entity
@Table(name = "salary_structures")
public class SalaryStructure {

	   @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long ssid;
	    private String name;
	    private String description;
	    private BigDecimal baseSalary;
	    
	    @OneToMany(mappedBy = "salaryStructure", cascade = CascadeType.ALL, orphanRemoval = true)
	    private Set<StructureAllowance> structureAllowances = new HashSet<>();

	    @OneToMany(mappedBy = "salaryStructure", cascade = CascadeType.ALL, orphanRemoval = true)
	    private Set<StructureDeduction> structureDeductions = new HashSet<>();

	    
	    public SalaryStructure() {
			
		}
		
		
		







		public Set<StructureAllowance> getStructureAllowances() {
			return structureAllowances;
		}





		public void setStructureAllowances(Set<StructureAllowance> structureAllowances) {
			this.structureAllowances = structureAllowances;
		}





		public Set<StructureDeduction> getStructureDeductions() {
			return structureDeductions;
		}





		public void setStructureDeductions(Set<StructureDeduction> structureDeductions) {
			this.structureDeductions = structureDeductions;
		}





		





		public SalaryStructure(Long ssid, String name, String description, BigDecimal baseSalary,
				Set<StructureAllowance> structureAllowances, Set<StructureDeduction> structureDeductions) {
			super();
			this.ssid = ssid;
			this.name = name;
			this.description = description;
			this.baseSalary = baseSalary;
			this.structureAllowances = structureAllowances;
			this.structureDeductions = structureDeductions;
		}




		





		
		public Long getSsid() {
			return ssid;
		}










		public void setSsid(Long ssid) {
			this.ssid = ssid;
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
		public BigDecimal getBaseSalary() {
			return baseSalary;
		}
		public void setBaseSalary(BigDecimal baseSalary) {
			this.baseSalary = baseSalary;
		}

	    
	    
}
