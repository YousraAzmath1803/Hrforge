//package com.example.Performance.Management.System.repository;
//
//import com.example.Performance.Management.System.model.PerformanceMetric;
//import com.example.Performance.Management.System.model.Employee; // Import Employee model
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.stereotype.Repository;
//
//import java.util.List;
//
//@Repository
//public interface PerformanceMetricRepository extends JpaRepository<PerformanceMetric, Long> {
//    // Retrieve all performance metrics associated with a specific employee
//    List<PerformanceMetric> findAllByEmployee(Employee employee);
//}
package com.example.Performance.Management.System.repository;

import com.example.Performance.Management.System.model.PerformanceMetric;
import com.example.Performance.Management.System.model.Employee; // Import Employee model
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface PerformanceMetricRepository extends JpaRepository<PerformanceMetric, Long> {
    // Retrieve all performance metrics associated with a specific employee
    List<PerformanceMetric> findAllByEmployee(Employee employee);

    // Retrieve all performance metrics by the review date
    List<PerformanceMetric> findAllByReviewDate(LocalDate reviewDate);
}
