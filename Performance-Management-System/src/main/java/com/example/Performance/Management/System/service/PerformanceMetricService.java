//package com.example.Performance.Management.System.service;
//
//import com.example.Performance.Management.System.model.Employee;
//import com.example.Performance.Management.System.model.PerformanceMetric;
//import com.example.Performance.Management.System.repository.EmployeeRepository;
//import com.example.Performance.Management.System.repository.PerformanceMetricRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.time.LocalDate;
//import java.util.List;
//
//@Service
//public class PerformanceMetricService {
//
//    @Autowired
//    private PerformanceMetricRepository performanceMetricRepository;
//
//    @Autowired
//    private EmployeeRepository employeeRepository;
//
//    @Autowired
//    private EmailService emailService;
//
//    // Retrieve performance metrics by employee ID
//    public List<PerformanceMetric> getMetricsByEmployeeId(Long employeeId) {
//        Employee employee = employeeRepository.findById(employeeId)
//                .orElseThrow(() -> new RuntimeException("Employee not found with id: " + employeeId));
//        return performanceMetricRepository.findAllByEmployee(employee);
//    }
//
//    // Add a new performance metric for an employee
//    public PerformanceMetric addMetricForEmployee(Long employeeId, PerformanceMetric metric) {
//        Employee employee = employeeRepository.findById(employeeId)
//                .orElseThrow(() -> new RuntimeException("Employee not found with id: " + employeeId));
//        metric.setEmployee(employee);
//
//        // Check for low code quality and send notifications if necessary
//        checkAndSendNotifications(metric, employee);
//
//        return performanceMetricRepository.save(metric);
//    }
//
//    // Retrieve a performance metric by its ID
//    public PerformanceMetric getMetricById(Long id) {
//        return performanceMetricRepository.findById(id)
//                .orElseThrow(() -> new RuntimeException("Metric not found with id: " + id));
//    }
//
//    // Update an existing performance metric
//    public PerformanceMetric updateMetric(PerformanceMetric metric) {
//        // Check for low code quality and send notifications if necessary
//        checkAndSendNotifications(metric, metric.getEmployee());
//
//        return performanceMetricRepository.save(metric);
//    }
//
//    // Delete a performance metric by its ID
//    public void deleteMetric(Long id) {
//        if (performanceMetricRepository.existsById(id)) {
//            performanceMetricRepository.deleteById(id);
//        } else {
//            throw new RuntimeException("Metric not found with id: " + id);
//        }
//    }
//
//    // Method to send notifications one day before the review date
//    public void notifyBeforeReviewDate() {
//        LocalDate today = LocalDate.now();
//        LocalDate tomorrow = today.plusDays(1);
//
//        List<PerformanceMetric> metricsDueForReview = performanceMetricRepository.findAllByReviewDate(tomorrow);
//        for (PerformanceMetric metric : metricsDueForReview) {
//            emailService.sendReviewReminderToUser(metric.getEmployee().getEmail());
//            emailService.sendReviewReminderToAdmin("gnaneshreddy850@gmail.com", metric.getEmployee().getEmployeeId());
//        }
//    }
//
//    // New method to check code quality and send notifications
//    private void checkAndSendNotifications(PerformanceMetric metric, Employee employee) {
//        if (metric.getCodeQuality() < 70) {
//            // Send user-specific notification
//            emailService.sendLowQualityNotificationToUser(employee.getEmail());
//
//            // Send admin-specific notification separately
//            emailService.sendLowQualityNotificationToAdmin("gnaneshreddy850@gmail.com", employee.getEmployeeId());
//        }
//    }
//
//    public void sendLowQualityNotifications(String email, Long employeeId) {
//    }
//}
package com.example.Performance.Management.System.service;

import com.example.Performance.Management.System.model.Employee;
import com.example.Performance.Management.System.model.PerformanceMetric;
import com.example.Performance.Management.System.repository.EmployeeRepository;
import com.example.Performance.Management.System.repository.PerformanceMetricRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class PerformanceMetricService {

    @Autowired
    private PerformanceMetricRepository performanceMetricRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private EmailService emailService;

    private final String ADMIN_EMAIL = "gnaneshreddy850@gmail.com"; // Admin email

    // Retrieve performance metrics by employee ID
    public List<PerformanceMetric> getMetricsByEmployeeId(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found with id: " + employeeId));
        return performanceMetricRepository.findAllByEmployee(employee);
    }

    // Add a new performance metric for an employee
    public PerformanceMetric addMetricForEmployee(Long employeeId, PerformanceMetric metric) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found with id: " + employeeId));
        metric.setEmployee(employee);

        // Check for low code quality and send notifications if necessary
        checkAndSendNotifications(metric, employee);

        return performanceMetricRepository.save(metric);
    }

    // Update an existing performance metric
    public PerformanceMetric updateMetric(PerformanceMetric metric) {
        checkAndSendNotifications(metric, metric.getEmployee());
        return performanceMetricRepository.save(metric);
    }

    // Delete a performance metric by its ID
    public void deleteMetric(Long id) {
        if (performanceMetricRepository.existsById(id)) {
            performanceMetricRepository.deleteById(id);
        } else {
            throw new RuntimeException("Metric not found with id: " + id);
        }
    }

    // Method to send notifications one day before the review date
    public void notifyBeforeReviewDate() {
        LocalDate today = LocalDate.now();
        LocalDate tomorrow = today.plusDays(1);

        List<PerformanceMetric> metricsDueForReview = performanceMetricRepository.findAllByReviewDate(tomorrow);
        for (PerformanceMetric metric : metricsDueForReview) {
            emailService.sendReviewReminderToUser(metric.getEmployee().getEmail());
            emailService.sendReviewReminderToAdmin(ADMIN_EMAIL, metric.getEmployee().getEmployeeId());
        }
    }

    // New method to check code quality and send notifications
    private void checkAndSendNotifications(PerformanceMetric metric, Employee employee) {
        if (metric.getCodeQuality() != null && metric.getCodeQuality() < 70) {
            // Send user-specific notification to the user email
            emailService.sendLowQualityNotificationToUser(employee.getEmail());

            // Send admin-specific notification to admin email
            emailService.sendLowQualityNotificationToAdmin(ADMIN_EMAIL, employee.getEmployeeId());
        }
    }

    public void sendLowQualityNotifications(String email, Long employeeId) {
        // Logic to send low quality notifications
    }
}
