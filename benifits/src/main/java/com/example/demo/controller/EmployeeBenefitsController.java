package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.EmployeeBenefits;
import com.example.demo.service.EmployeeBenefitsService;

import jakarta.validation.Valid;
@RestController
@RequestMapping("/api/v1/employee-benefits")
public class EmployeeBenefitsController {

    @Autowired
    private EmployeeBenefitsService employeeBenefitsService;


    @PostMapping
    public ResponseEntity<EmployeeBenefits> createOrUpdateBenefits(@RequestBody @Valid EmployeeBenefits benefits) {
        EmployeeBenefits savedBenefits = employeeBenefitsService.createOrUpdateBenefits(benefits);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedBenefits);
    }

    //@PostMapping("/{employeeId}")
    @PostMapping("/employeeid={employeeId}")
    public ResponseEntity<EmployeeBenefits> createOrUpdateBenefits(
        @PathVariable Long employeeId, 
        @RequestBody @Valid EmployeeBenefits benefits) {
        
        // Set employeeId in the benefits object before saving
        benefits.setEmployeeId(employeeId);
        
        // Save or update employee benefits
        EmployeeBenefits savedBenefits = employeeBenefitsService.createOrUpdateBenefits(benefits);
        
        // Return 201 Created with the saved entity
        return ResponseEntity.status(HttpStatus.CREATED).body(savedBenefits);
    }



//    @GetMapping("/{employeeId}")
//    public ResponseEntity<List<EmployeeBenefits>> getBenefits(@PathVariable Long employeeId) {
//        List<EmployeeBenefits> benefitsList = employeeBenefitsService.getEmployeeBenefits(employeeId);
//        return ResponseEntity.ok(benefitsList);
//    }
    
    @GetMapping("/employeeid={employeeId}")
    public ResponseEntity<?> getBenefits(@PathVariable Long employeeId) {
        // Fetch employee benefits from service
        List<EmployeeBenefits> benefitsList = employeeBenefitsService.getEmployeeBenefits(employeeId);

        // If no benefits are found, return 404 with a custom message
        if (benefitsList == null || benefitsList.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("No benefits found for employee with ID: " + employeeId);
        }

        // If benefits exist, return them with 200 OK
        return ResponseEntity.ok(benefitsList);
    }
}
