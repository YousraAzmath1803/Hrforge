package com.manthatech.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.manthatech.entity.Employee;

public interface EmployeeRepo extends JpaRepository<Employee, Long>{

	List<Employee> findByFirstName(String firstName);

    
    List<Employee> findByDepartment(String department);


    List<Employee> findByDesignation(String designation);
    

   
}
