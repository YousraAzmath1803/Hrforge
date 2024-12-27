package com.manthatech.controller;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.manthatech.entity.Employee;
import com.manthatech.entity.PayRollEntity;
import com.manthatech.exceptions.ResourceNotFoundException;
import com.manthatech.repo.EmployeeRepo;
import com.manthatech.service.PayRollService;

@RestController
@RequestMapping("/api/payroll")
public class PayRollController {

	
	   @Autowired
	    private PayRollService payrollService;
	   private EmployeeRepo employeerepo;
	   
	    @GetMapping("/employee/{employeeId}")
	    public ResponseEntity<List<PayRollEntity>> getPayrollByEmployee(@PathVariable Long employeeId) {
	        List<PayRollEntity> payrollRuns = payrollService.getPayrollsByEmployee(employeeId);
	        return ResponseEntity.ok(payrollRuns);
	    }

	    @GetMapping("/employee/{employeeId}/net-salary")
	    public ResponseEntity<BigDecimal> getNetSalary(@PathVariable Long employeeId) {
	    	Employee employee = employeerepo.findById(employeeId)
	    	        .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + employeeId));
	        BigDecimal netSalary = payrollService.calculateNetSalary(employee);
	        return ResponseEntity.ok(netSalary);
	    }
}
