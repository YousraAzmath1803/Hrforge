//package com.example.Performance.Management.System.controller;
//
//import com.example.Performance.Management.System.model.PerformanceMetric;
//import com.example.Performance.Management.System.service.PerformanceMetricService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/metrics")
//public class PerformanceMetricController {
//
//    @Autowired
//    private PerformanceMetricService performanceMetricService;
//
//    // Get performance metrics by employee ID
//    @GetMapping("/employee/{employeeId}")
//    public List<PerformanceMetric> getMetricsByEmployeeId(@PathVariable Long employeeId) {
//        return performanceMetricService.getMetricsByEmployeeId(employeeId);
//    }
//
//    // Add a new performance metric
//    @PostMapping("/employee/{employeeId}")
//    public PerformanceMetric addMetricForEmployee(@PathVariable Long employeeId, @RequestBody PerformanceMetric metric) {
//        return performanceMetricService.addMetricForEmployee(employeeId, metric);
//    }
//
//    // Update performance metrics by employee ID
//    @PutMapping("/employee/{employeeId}")
//    public ResponseEntity<List<PerformanceMetric>> updateMetricsByEmployeeId(
//            @PathVariable Long employeeId,
//            @RequestBody PerformanceMetric updatedMetric) {
//
//        List<PerformanceMetric> existingMetrics = performanceMetricService.getMetricsByEmployeeId(employeeId);
//
//        if (existingMetrics.isEmpty()) {
//            return ResponseEntity.notFound().build();
//        }
//
//        // Update each existing metric with the new values
//        for (PerformanceMetric existingMetric : existingMetrics) {
//            existingMetric.setStoriesHandled(updatedMetric.getStoriesHandled());
//            existingMetric.setCodeQuality(updatedMetric.getCodeQuality());
//            existingMetric.setBugsFixed(updatedMetric.getBugsFixed());
//            existingMetric.setTestCoverage(updatedMetric.getTestCoverage());
//            existingMetric.setIncidentResponseTime(updatedMetric.getIncidentResponseTime());
//            existingMetric.setTimelyDelivery(updatedMetric.isTimelyDelivery());
//            existingMetric.setTrainingsCompleted(updatedMetric.getTrainingsCompleted());
//            existingMetric.setReviewDate(updatedMetric.getReviewDate());
//
//            // Save the updated metric
//            performanceMetricService.updateMetric(existingMetric);
//        }
//
//        return ResponseEntity.ok(existingMetrics);
//    }
//
//    // Delete a performance metric by ID
//    @DeleteMapping("/{id}")
//    public ResponseEntity<?> deleteMetric(@PathVariable Long id) {
//        performanceMetricService.deleteMetric(id);
//        return ResponseEntity.ok().build();
//    }
//}
package com.example.Performance.Management.System.controller;

import com.example.Performance.Management.System.model.PerformanceMetric;
import com.example.Performance.Management.System.service.PerformanceMetricService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/metrics")
public class PerformanceMetricController {

    @Autowired
    private PerformanceMetricService performanceMetricService;

    // Get performance metrics by employee ID
    @GetMapping("/employee/{employeeId}")
    public List<PerformanceMetric> getMetricsByEmployeeId(@PathVariable Long employeeId) {
        return performanceMetricService.getMetricsByEmployeeId(employeeId);
    }

    // Add a new performance metric
    @PostMapping("/employee/{employeeId}")
    public PerformanceMetric addMetricForEmployee(@PathVariable Long employeeId, @RequestBody PerformanceMetric metric) {
        return performanceMetricService.addMetricForEmployee(employeeId, metric);
    }

    // Update performance metrics by employee ID
    @PutMapping("/employee/{employeeId}")
    public ResponseEntity<List<PerformanceMetric>> updateMetricsByEmployeeId(
            @PathVariable Long employeeId,
            @RequestBody PerformanceMetric updatedMetric) {

        List<PerformanceMetric> existingMetrics = performanceMetricService.getMetricsByEmployeeId(employeeId);

        if (existingMetrics.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        for (PerformanceMetric existingMetric : existingMetrics) {
            boolean codeQualityUpdated = false; // Track if code quality has been updated

            // Update only if new values are provided (not null)
            if (updatedMetric.getStoriesHandled() != 0) {
                existingMetric.setStoriesHandled(updatedMetric.getStoriesHandled());
            }
            if (updatedMetric.getCodeQuality() != null) {
                // Check if code quality is actually updated
                if (existingMetric.getCodeQuality() == null || !existingMetric.getCodeQuality().equals(updatedMetric.getCodeQuality())) {
                    existingMetric.setCodeQuality(updatedMetric.getCodeQuality());
                    codeQualityUpdated = true; // Mark that code quality has been updated
                }
            }
            if (updatedMetric.getBugsFixed() != 0) {
                existingMetric.setBugsFixed(updatedMetric.getBugsFixed());
            }
            if (updatedMetric.getTestCoverage() != 0) {
                existingMetric.setTestCoverage(updatedMetric.getTestCoverage());
            }
            if (updatedMetric.getIncidentResponseTime() != 0) {
                existingMetric.setIncidentResponseTime(updatedMetric.getIncidentResponseTime());
            }
            if (updatedMetric.isTimelyDelivery()) {
                existingMetric.setTimelyDelivery(updatedMetric.isTimelyDelivery());
            }
            if (updatedMetric.getTrainingsCompleted() != 0) {
                existingMetric.setTrainingsCompleted(updatedMetric.getTrainingsCompleted());
            }
            if (updatedMetric.getReviewDate() != null) {
                existingMetric.setReviewDate(updatedMetric.getReviewDate());
            }

            // Check for low code quality and send notification only if code quality is updated
            if (codeQualityUpdated && existingMetric.getCodeQuality() < 70 && !existingMetric.isNotificationSent()) {
                // Send email notifications
                performanceMetricService.sendLowQualityNotifications(existingMetric.getEmployee().getEmail(), employeeId);
                // Mark notification as sent
                existingMetric.setNotificationSent(true);
            }

            // Save the updated metric
            performanceMetricService.updateMetric(existingMetric);
        }

        return ResponseEntity.ok(existingMetrics);
    }

    // Delete a performance metric by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMetric(@PathVariable Long id) {
        performanceMetricService.deleteMetric(id);
        return ResponseEntity.ok().build();
    }
}
