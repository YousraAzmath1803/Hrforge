package com.example.taxmanagement.repository;

import com.example.taxmanagement.entity.InvestmentDeclaration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InvestmentDeclarationRepository extends JpaRepository<InvestmentDeclaration, Integer> {
    // Find all declarations by employee ID
    List<InvestmentDeclaration> findByEmployee_EmployeeId(int employeeId);

    // Find declarations by approval status
    List<InvestmentDeclaration> findByApproved(boolean approved);
}

