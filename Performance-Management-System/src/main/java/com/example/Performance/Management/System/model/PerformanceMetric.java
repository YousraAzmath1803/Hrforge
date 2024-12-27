//package com.example.Performance.Management.System.model;
//
//import com.fasterxml.jackson.annotation.JsonIgnore; // Import JsonIgnore annotation
//import jakarta.persistence.*;
//import java.time.LocalDate;
//
//@Entity
//@Table(name = "performance_metrics")
//public class PerformanceMetric {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @JsonIgnore // Ignore this field when serializing to JSON
//    private Long metricId; // Keeping the ID field for internal use
//
//    @ManyToOne
//    @JoinColumn(name = "employee_id", nullable = false)
//    private Employee employee;
//
//    private int storiesHandled;
//    private double codeQuality;
//    private int bugsFixed;
//    private double testCoverage;
//    private double incidentResponseTime;
//    private boolean timelyDelivery;
//    private int trainingsCompleted;
//    private LocalDate reviewDate;
//
//    // Getters and Setters
//    public Long getMetricId() {
//        return metricId;
//    }
//
//    public void setMetricId(Long metricId) {
//        this.metricId = metricId;
//    }
//
//    public Employee getEmployee() {
//        return employee;
//    }
//
//    public void setEmployee(Employee employee) {
//        this.employee = employee;
//    }
//
//    public int getStoriesHandled() {
//        return storiesHandled;
//    }
//
//    public void setStoriesHandled(int storiesHandled) {
//        this.storiesHandled = storiesHandled;
//    }
//
//    public double getCodeQuality() {
//        return codeQuality;
//    }
//
//    public void setCodeQuality(double codeQuality) {
//        this.codeQuality = codeQuality;
//    }
//
//    public int getBugsFixed() {
//        return bugsFixed;
//    }
//
//    public void setBugsFixed(int bugsFixed) {
//        this.bugsFixed = bugsFixed;
//    }
//
//    public double getTestCoverage() {
//        return testCoverage;
//    }
//
//    public void setTestCoverage(double testCoverage) {
//        this.testCoverage = testCoverage;
//    }
//
//    public double getIncidentResponseTime() {
//        return incidentResponseTime;
//    }
//
//    public void setIncidentResponseTime(double incidentResponseTime) {
//        this.incidentResponseTime = incidentResponseTime;
//    }
//
//    public boolean isTimelyDelivery() {
//        return timelyDelivery;
//    }
//
//    public void setTimelyDelivery(boolean timelyDelivery) {
//        this.timelyDelivery = timelyDelivery;
//    }
//
//    public int getTrainingsCompleted() {
//        return trainingsCompleted;
//    }
//
//    public void setTrainingsCompleted(int trainingsCompleted) {
//        this.trainingsCompleted = trainingsCompleted;
//    }
//
//    public LocalDate getReviewDate() {
//        return reviewDate;
//    }
//
//    public void setReviewDate(LocalDate reviewDate) {
//        this.reviewDate = reviewDate;
//    }
//
//    public boolean isNotificationSent() {
//        return false;
//    }
//
//    public void setNotificationSent(boolean b) {
//    }

//}
package com.example.Performance.Management.System.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "performance_metrics")
public class PerformanceMetric {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonIgnore // Ignore this field when serializing to JSON
    private Long metricId; // Keeping the ID field for internal use

    @ManyToOne
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;

    private int storiesHandled;
    private Double codeQuality; // Changed from double to Double
    private int bugsFixed;
    private double testCoverage;
    private double incidentResponseTime;
    private boolean timelyDelivery;
    private int trainingsCompleted;
    private LocalDate reviewDate;

    // Getters and Setters
    public Long getMetricId() {
        return metricId;
    }

    public void setMetricId(Long metricId) {
        this.metricId = metricId;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public int getStoriesHandled() {
        return storiesHandled;
    }

    public void setStoriesHandled(int storiesHandled) {
        this.storiesHandled = storiesHandled;
    }

    public Double getCodeQuality() {
        return codeQuality;
    }

    public void setCodeQuality(Double codeQuality) {
        this.codeQuality = codeQuality;
    }

    public int getBugsFixed() {
        return bugsFixed;
    }

    public void setBugsFixed(int bugsFixed) {
        this.bugsFixed = bugsFixed;
    }

    public double getTestCoverage() {
        return testCoverage;
    }

    public void setTestCoverage(double testCoverage) {
        this.testCoverage = testCoverage;
    }

    public double getIncidentResponseTime() {
        return incidentResponseTime;
    }

    public void setIncidentResponseTime(double incidentResponseTime) {
        this.incidentResponseTime = incidentResponseTime;
    }

    public boolean isTimelyDelivery() {
        return timelyDelivery;
    }

    public void setTimelyDelivery(boolean timelyDelivery) {
        this.timelyDelivery = timelyDelivery;
    }

    public int getTrainingsCompleted() {
        return trainingsCompleted;
    }

    public void setTrainingsCompleted(int trainingsCompleted) {
        this.trainingsCompleted = trainingsCompleted;
    }

    public LocalDate getReviewDate() {
        return reviewDate;
    }

    public void setReviewDate(LocalDate reviewDate) {
        this.reviewDate = reviewDate;
    }

    public boolean isNotificationSent() {
        return false; // Adjust this if necessary based on your logic
    }

    public void setNotificationSent(boolean notificationSent) {
        // Logic to handle notification status
    }
}
