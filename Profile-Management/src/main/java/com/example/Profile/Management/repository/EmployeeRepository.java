package com.example.Profile.Management.repository;

import com.example.Profile.Management.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    // Custom query method to find an employee by employeeId
    Optional<Employee> findByEmployeeId(String employeeId);

    // Custom query method to find an employee by email
    Optional<Employee> findByEmail(String email);
}
