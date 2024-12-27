package com.example.taxmanagement.repository;

import com.example.taxmanagement.entity.EmployeeTax;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeTaxRepository extends JpaRepository<EmployeeTax, Integer> {
}
