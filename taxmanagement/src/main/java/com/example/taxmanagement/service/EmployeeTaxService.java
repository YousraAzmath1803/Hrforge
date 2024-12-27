//package com.example.taxmanagement.service;
//
//import com.example.taxmanagement.entity.EmployeeTax;
//import com.example.taxmanagement.repository.EmployeeTaxRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//
//@Service
//public class EmployeeTaxService {
//    @Autowired
//    private EmployeeTaxRepository employeeTaxRepository;
//
//    public List<EmployeeTax> getAllTaxes() {
//        return employeeTaxRepository.findAll();
//    }
//
//    public EmployeeTax addTax(EmployeeTax tax) {
//        return employeeTaxRepository.save(tax);
//    }
//
//    public EmployeeTax getTaxById(int id) {
//        return employeeTaxRepository.findById(id)
//                .orElseThrow(() -> new RuntimeException("Employee not found"));
//    }
//}
package com.example.taxmanagement.service;

import com.example.taxmanagement.entity.EmployeeTax;
import com.example.taxmanagement.repository.EmployeeTaxRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeTaxService {
    @Autowired
    private EmployeeTaxRepository employeeTaxRepository;

    @Autowired
    private NotificationService notificationService;

    private static final String ADMIN_EMAIL = "admin@example.com"; // Replace with actual admin email

    public List<EmployeeTax> getAllTaxes() {
        return employeeTaxRepository.findAll();
    }

    public EmployeeTax addTax(EmployeeTax tax) {
        EmployeeTax savedTax = employeeTaxRepository.save(tax);

        // Send notification to admin
        String subject = "New Tax Record Added";
        String message = "A new tax record has been added for employee: " + tax.getEmployeeName();
        notificationService.sendNotificationToAdmin(subject, message, ADMIN_EMAIL);

        return savedTax;
    }

    public EmployeeTax getTaxById(int id) {
        return employeeTaxRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found"));
    }
}
