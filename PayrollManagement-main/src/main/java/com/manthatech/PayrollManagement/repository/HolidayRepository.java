package com.manthatech.PayrollManagement.repository;

import com.manthatech.PayrollManagement.model.Holiday;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface HolidayRepository extends JpaRepository<Holiday, Long> {
    List<Holiday> findByDateBetween(LocalDate startDate, LocalDate endDate);
}
