package in.manthatech.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import in.manthatech.entity.Employee;
import in.manthatech.service.EmployeeService;

@RestController
@RequestMapping("/api/emp")
public class EmployeeController {

	@Autowired
    private EmployeeService employeeService;

    // Search endpoint for employees
    @GetMapping("/search")
    public ResponseEntity<List<Employee>> searchEmployees(@RequestParam("searchTerm") String searchTerm) {
        List<Employee> employees = employeeService.searchEmployees(searchTerm);
        return ResponseEntity.ok(employees);
    }
    
    @GetMapping("/all")
    public ResponseEntity<List<Employee>> getAllEmployees() {
        List<Employee> employees = employeeService.getAllEmployees();
        return ResponseEntity.ok(employees);
    }
}
