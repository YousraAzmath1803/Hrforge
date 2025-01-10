package com.AMS.attendance.controllers;

import com.AMS.attendance.dtos.MonthlyAttendanceDTO;
import com.AMS.attendance.entities.MonthWorkingDays;
import com.AMS.attendance.entities.MonthlyAttendance;
import com.AMS.attendance.repositories.EmployeeRepository;
import com.AMS.attendance.repositories.MonthlyAttendanceRepository;
import com.AMS.attendance.services.AttendanceService;
import com.AMS.attendance.services.MonthWorkingDaysService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/monthly-attendance")
public class MonthlyAttendanceController {

    @Autowired
    private MonthlyAttendanceRepository monthlyAttendanceRepository;
    @Autowired
    private EmployeeRepository employeeRepository;
    @Autowired
    private MonthWorkingDaysService monthWorkingDaysService;
    @Autowired
    private AttendanceService monthlyAttendanceService;

    @GetMapping("/employee/{employeeId}/year/{year}")
    public ResponseEntity<List<MonthlyAttendance>> getMonthlyAttendance(
            @PathVariable Long employeeId, @PathVariable int year) {
        List<MonthlyAttendance> monthlyAttendance = monthlyAttendanceRepository.findByEmployeeIdAndYear(employeeId, year);
        return ResponseEntity.ok(monthlyAttendance);
    }

}

