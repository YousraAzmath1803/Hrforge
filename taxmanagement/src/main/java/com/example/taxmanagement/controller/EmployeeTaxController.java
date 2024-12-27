package com.example.taxmanagement.controller;

import com.example.taxmanagement.entity.EmployeeTax;
import com.example.taxmanagement.service.EmployeeTaxService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employee-tax")
public class EmployeeTaxController {
    @Autowired
    private EmployeeTaxService employeeTaxService;

    @GetMapping
    public List<EmployeeTax> getAllTaxes() {
        return employeeTaxService.getAllTaxes();
    }

    @PostMapping
    public EmployeeTax addTax(@RequestBody EmployeeTax tax) {
        return employeeTaxService.addTax(tax);
    }

    @GetMapping("/{id}")
    public EmployeeTax getTaxById(@PathVariable int id) {
        return employeeTaxService.getTaxById(id);
    }
}

