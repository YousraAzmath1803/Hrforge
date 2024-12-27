package com.manthatech.service;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.manthatech.entity.Employee;
import com.manthatech.entity.PayRollEntity;
import com.manthatech.entity.SalaryStructure;
import com.manthatech.entity.StructureAllowance;
import com.manthatech.entity.StructureDeduction;
import com.manthatech.repo.PayRollRepo;

@Service
public class PayRollService {

	 @Autowired
	    private PayRollRepo payrollrepo;

	   

	    public List<PayRollEntity> getPayrollsByEmployee(Long employeeId) {
	        return payrollrepo.findByEmployee_EmployeeId(employeeId);
	    }

	    public BigDecimal calculateNetSalary(Employee employee) {
	        SalaryStructure salaryStructure = employee.getSalaryStructure();
	        
	        BigDecimal totalAllowances = salaryStructure.getStructureAllowances().stream()
	                .map(StructureAllowance::getAmount)
	                .reduce(BigDecimal.ZERO, BigDecimal::add);

	        BigDecimal totalDeductions = salaryStructure.getStructureDeductions().stream()
	                .map(StructureDeduction::getAmount)
	                .reduce(BigDecimal.ZERO, BigDecimal::add);

	        BigDecimal netSalary = salaryStructure.getBaseSalary()
	                .add(totalAllowances)
	                .subtract(totalDeductions);

	        return netSalary;
	    }
}
