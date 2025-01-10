package com.AMS.attendance.services;

import com.AMS.attendance.entities.Employee;
import com.AMS.attendance.entities.MonthWorkingDays;
import com.AMS.attendance.entities.MonthlyAttendance;
import com.AMS.attendance.entities.TimeRecord;
import com.AMS.attendance.repositories.EmployeeRepository;
import com.AMS.attendance.repositories.MonthlyAttendanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDate;
import java.util.List;

@Service
public class AttendanceService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private MonthlyAttendanceRepository monthlyAttendanceRepository;
    @Autowired
    private MonthWorkingDaysService monthWorkingDaysService;
    private final Duration requiredWorkingHours = Duration.ofHours(8);

    public void updateMonthlyAttendance(Long employeeId, String month, int year) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found with ID: " + employeeId));

        List<TimeRecord> timeRecords = employee.getTimeRecords();
        long daysPresent = timeRecords.stream()
                .filter(tr -> tr.getDate().getMonth().toString().equalsIgnoreCase(month) &&
                        tr.getDate().getYear() == year &&
                        tr.getDuration() != null && tr.getDuration().compareTo(requiredWorkingHours) >= 0)
                .count();


        MonthWorkingDays monthWorkingDays = monthWorkingDaysService.getAllWorkingDays().stream()
                .filter(mwd -> mwd.getMonthName().equalsIgnoreCase(month) && mwd.getYear() == year)
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Working days data not found for month: " + month + " and year: " + year));

        int workingDays = monthWorkingDays.getWorkingDays();
        int daysAbsent = workingDays - (int) daysPresent;

        MonthlyAttendance monthlyAttendance = new MonthlyAttendance();
        monthlyAttendance.setEmployee(employee);
        monthlyAttendance.setMonth(month);
        monthlyAttendance.setYear(year);
        monthlyAttendance.setDaysPresent((int) daysPresent);
        monthlyAttendance.setDaysAbsent(daysAbsent);

        monthlyAttendanceRepository.save(monthlyAttendance);
    }

}
