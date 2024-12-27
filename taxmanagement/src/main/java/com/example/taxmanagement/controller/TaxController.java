package com.example.taxmanagement.controller;

import com.example.taxmanagement.entity.EmployeeTax;
import com.example.taxmanagement.service.NotificationService;
import com.example.taxmanagement.service.TaxCalculationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tax")
public class TaxController {

    private final TaxCalculationService taxCalculationService;
    private final NotificationService notificationService;

    public TaxController(TaxCalculationService taxCalculationService, NotificationService notificationService) {
        this.taxCalculationService = taxCalculationService;
        this.notificationService = notificationService;
    }

    // Calculate Tax for an Employee
    @PostMapping("/calculate")
    public EmployeeTax calculateTax(@RequestBody EmployeeTax tax) {
        return taxCalculationService.calculateTax(tax);
    }

    // Send Notifications
    @PostMapping("/notifications/send")
    public void sendNotifications(@RequestParam int employeeId, @RequestParam String message) {
        notificationService.sendNotification(employeeId, message);
    }

    // Send Bulk Reminders
    @PostMapping("/notifications/reminders")
    public void sendBulkReminders(@RequestBody List<Integer> employeeIds, @RequestParam String message) {
        notificationService.sendReminders(employeeIds, message);
    }
}
