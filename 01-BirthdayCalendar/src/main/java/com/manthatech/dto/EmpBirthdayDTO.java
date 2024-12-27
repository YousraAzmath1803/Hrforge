package com.manthatech.dto;

import java.time.LocalDate;

public class EmpBirthdayDTO {

	  private Long employeeId;
	    private String name;
	    private LocalDate birthDate;
	    private String department;
	    private int yearsWithCompany;
	    private byte[] photo;
	    
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
		public LocalDate getBirthDate() {
			return birthDate;
		}
		public void setBirthDate(LocalDate birthDate) {
			this.birthDate = birthDate;
		}
		public String getDepartment() {
			return department;
		}
		public void setDepartment(String department) {
			this.department = department;
		}
		public int getYearsWithCompany() {
			return yearsWithCompany;
		}
		public void setYearsWithCompany(int yearsWithCompany) {
			this.yearsWithCompany = yearsWithCompany;
		}
		public byte[] getPhoto() {
			return photo;
		}
		public void setPhoto(byte[] photo) {
			this.photo = photo;
		}
		
	    
	    
	    
}
