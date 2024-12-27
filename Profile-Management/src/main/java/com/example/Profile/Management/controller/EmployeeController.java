package com.example.Profile.Management.controller;

import com.example.Profile.Management.model.Employee;
import com.example.Profile.Management.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    private static final String DEFAULT_PASSWORD = "user"; // Default password for login

    // Retrieve all employees
    @GetMapping
    public ResponseEntity<List<Employee>> getAllEmployees() {
        List<Employee> employees = employeeService.getAllEmployees();
        employees.forEach(this::convertProfilePictureToBase64); // Convert images to Base64
        return ResponseEntity.ok(employees);
    }

    // Retrieve an employee by ID
    @GetMapping("/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id) {
        return employeeService.getEmployeeById(id)
                .map(employee -> {
                    convertProfilePictureToBase64(employee);
                    return ResponseEntity.ok(employee);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Create a new employee
    @PostMapping
    public ResponseEntity<Employee> createEmployee(@RequestBody Employee employee) {
        Employee createdEmployee = employeeService.saveEmployee(employee);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdEmployee);
    }

    // Update employee details (full update)
    @PutMapping("/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable Long id, @RequestBody Employee employeeUpdates) {
        return employeeService.getEmployeeById(id)
                .map(existingEmployee -> {
                    // Update all provided fields, keeping existing values for null fields
                    existingEmployee.setName(employeeUpdates.getName() != null ? employeeUpdates.getName() : existingEmployee.getName());
                    existingEmployee.setDateOfBirth(employeeUpdates.getDateOfBirth() != null ? employeeUpdates.getDateOfBirth() : existingEmployee.getDateOfBirth());
                    existingEmployee.setGender(employeeUpdates.getGender() != null ? employeeUpdates.getGender() : existingEmployee.getGender());
                    existingEmployee.setPhone(employeeUpdates.getPhone() != null ? employeeUpdates.getPhone() : existingEmployee.getPhone());
                    existingEmployee.setAddress(employeeUpdates.getAddress() != null ? employeeUpdates.getAddress() : existingEmployee.getAddress());
                    existingEmployee.setEmail(employeeUpdates.getEmail() != null ? employeeUpdates.getEmail() : existingEmployee.getEmail());
                    existingEmployee.setEmployeeId(employeeUpdates.getEmployeeId() != null ? employeeUpdates.getEmployeeId() : existingEmployee.getEmployeeId());
                    existingEmployee.setJobTitle(employeeUpdates.getJobTitle() != null ? employeeUpdates.getJobTitle() : existingEmployee.getJobTitle());
                    existingEmployee.setDepartment(employeeUpdates.getDepartment() != null ? employeeUpdates.getDepartment() : existingEmployee.getDepartment());
                    existingEmployee.setDateOfJoining(employeeUpdates.getDateOfJoining() != null ? employeeUpdates.getDateOfJoining() : existingEmployee.getDateOfJoining());
                    existingEmployee.setEmploymentType(employeeUpdates.getEmploymentType() != null ? employeeUpdates.getEmploymentType() : existingEmployee.getEmploymentType());
                    existingEmployee.setSkills(employeeUpdates.getSkills() != null ? employeeUpdates.getSkills() : existingEmployee.getSkills());

                    // Save the updated employee
                    Employee updatedEmployee = employeeService.saveEmployee(existingEmployee);
                    convertProfilePictureToBase64(updatedEmployee); // Convert image to Base64
                    return ResponseEntity.ok(updatedEmployee);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Delete employee
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable Long id) {
        if (!employeeService.getEmployeeById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        employeeService.deleteEmployee(id);
        return ResponseEntity.noContent().build();
    }

    // Employee login
    @PostMapping("/login")
    public ResponseEntity<Employee> login(@RequestParam(name = "email") String email,
                                          @RequestParam(name = "password") String password) {
        Optional<Employee> employee = employeeService.getEmployeeByEmail(email);
        if (employee.isPresent() && DEFAULT_PASSWORD.equals(password)) {
            return ResponseEntity.ok(employee.get());
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    // Utility function to convert the profile picture byte array to Base64
    private void convertProfilePictureToBase64(Employee employee) {
        if (employee.getProfilePicture() != null) {
            employee.setProfilePictureBase64(Base64.getEncoder().encodeToString(employee.getProfilePicture()));
        }
    }
}
