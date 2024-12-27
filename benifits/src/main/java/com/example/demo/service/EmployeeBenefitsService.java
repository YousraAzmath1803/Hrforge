package com.example.demo.service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.EmployeeBenefits;
import com.example.demo.repository.EmployeeBenefitsRepository;

@Service
public class EmployeeBenefitsService {

    @Autowired
    private EmployeeBenefitsRepository employeeBenefitsRepository;

    public EmployeeBenefits createOrUpdateBenefits(EmployeeBenefits benefits) {
        // Automatic calculation based on Indian labor laws
        benefits.setProvidentFund(calculateProvidentFund(benefits.getBasicSalary()));
        benefits.setGratuity(calculateGratuity(benefits.getBasicSalary(),benefits.getJoiningDate()));
        benefits.setInsurance(calculateInsurance(benefits.getBasicSalary()));
        benefits.setOvertimeWages(calculateOvertimeWages(benefits.getOvertimeHours(), benefits.getBasicSalary()));
        benefits.setRetirementBenefit(calculateRetirementBenefit(benefits.getBasicSalary()));
        return employeeBenefitsRepository.save(benefits);
    }

    public List<EmployeeBenefits> getEmployeeBenefits(Long employeeId) {
        return employeeBenefitsRepository.findByEmployeeId(employeeId);
    }

    // Calculation methods based on Indian labor laws

    private double calculateProvidentFund(double basicSalary) {
        // PF is 12% of basic salary
        return basicSalary * 0.12;
    }

    private double calculateGratuity(double basicSalary, LocalDate joiningDate) {
    	 long yearsWorked = ChronoUnit.YEARS.between(joiningDate, LocalDate.now());
        if (yearsWorked < 5) {
            return 0; // Employee must have worked for at least 5 years to be eligible
        }
        return (15.0 / 26.0) * basicSalary * yearsWorked;
    }
    private double calculateInsurance(double basicSalary) {
        // Insurance can be a flat or percentage amount
        return 200000; // Example flat insurance benefit
    }

    private double calculateOvertimeWages(double overtimeHours, double basicSalary) {
        // Overtime wages = 2x hourly wage * overtime hours
        double hourlyWage = basicSalary / 160; // Assuming 160 working hours in a month
        return overtimeHours * hourlyWage * 2;
    }

    private double calculateRetirementBenefit(double basicSalary) {
        // Retirement benefit as a flat or percentage-based amount
    	 return basicSalary * 0.20; // Example flat retirement benefit
    }
}
