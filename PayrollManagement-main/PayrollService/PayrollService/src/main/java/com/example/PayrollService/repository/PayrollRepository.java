package com.example.PayrollService.repository;

import com.example.PayrollService.model.Payroll;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface PayrollRepository extends JpaRepository<Payroll, Long> {

    // Custom query method to find Payrolls by employeeId
    List<Payroll> findByEmployeeId(int employeeId);

    // Custom query method to find Payrolls within a date range
    List<Payroll> findByCreatedAtBetween(LocalDateTime startDate, LocalDateTime endDate);
}
