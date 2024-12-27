package com.manthatech.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.manthatech.dto.BirthdayNotificationDTO;
import com.manthatech.dto.EmpBirthdayDTO;
import com.manthatech.entity.EmpBirthday;
import com.manthatech.service.EmpService;

@RestController
@RequestMapping("/api/birthdays")
public class EmpController {

	 @Autowired
	    private EmpService empService;


	 
	 @GetMapping("/{id}")
	    public ResponseEntity<EmpBirthdayDTO> getEmployeeDetails(@PathVariable Long id) {
	        EmpBirthdayDTO employee = empService.getEmployeeDetails(id);
	        return ResponseEntity.ok(employee);
	    }

	    // Endpoint to get birthdays grouped by day for a specific month
	    @GetMapping("/month/{month}")
	    public ResponseEntity<Map<Integer, List<EmpBirthdayDTO>>> getBirthdaysByMonth(@PathVariable int month) {
	        Map<Integer, List<EmpBirthdayDTO>> birthdays = empService.getBirthdaysByMonth(month);
	        return ResponseEntity.ok(birthdays);
	    }
	    
	    
	    // Endpoint to get upcoming birthdays
	    @GetMapping("/upcoming-birthdays")
	    public ResponseEntity<List<BirthdayNotificationDTO>> getUpcomingBirthdays() {
	        List<BirthdayNotificationDTO> birthdays = empService.getUpcomingBirthdays();
	        return ResponseEntity.ok(birthdays);
	    }
	    
	    @PostMapping("/{employeeId}/send-wish")
	    public ResponseEntity<String> sendWish(@PathVariable Long employeeId) {
	        empService.sendWish(employeeId);
	        return ResponseEntity.ok("Wish sent successfully!");
	    }
	    
	    @GetMapping("/search")
	    public ResponseEntity<List<EmpBirthday>> searchEmployees(@RequestParam String keyword) {
	        List<EmpBirthday> employees = empService.searchEmployees(keyword);
	        return ResponseEntity.ok(employees);
	    }
}
