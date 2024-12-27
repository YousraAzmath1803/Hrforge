package com.example.taxmanagement.controller;

import com.example.taxmanagement.entity.InvestmentDeclaration;
import com.example.taxmanagement.repository.InvestmentDeclarationRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/investments")
public class InvestmentDeclarationController {

    private final InvestmentDeclarationRepository investmentDeclarationRepository;

    public InvestmentDeclarationController(InvestmentDeclarationRepository investmentDeclarationRepository) {
        this.investmentDeclarationRepository = investmentDeclarationRepository;
    }

    // Fetch all investment declarations
    @GetMapping
    public List<InvestmentDeclaration> getAllDeclarations() {
        return investmentDeclarationRepository.findAll();
    }

    // Fetch investment declarations by employee ID
    @GetMapping("/employee/{employeeId}")
    public List<InvestmentDeclaration> getDeclarationsByEmployee(@PathVariable int employeeId) {
        return investmentDeclarationRepository.findByEmployee_EmployeeId(employeeId);
    }

    // Create or Update an investment declaration
    @PostMapping
    public ResponseEntity<InvestmentDeclaration> createOrUpdateDeclaration(@RequestBody InvestmentDeclaration investmentDeclaration) {
        InvestmentDeclaration savedDeclaration = investmentDeclarationRepository.save(investmentDeclaration);
        return ResponseEntity.ok(savedDeclaration);
    }

    // Approve an investment declaration
    @PutMapping("/{declarationId}/approve")
    public ResponseEntity<InvestmentDeclaration> approveDeclaration(@PathVariable int declarationId) {
        InvestmentDeclaration declaration = investmentDeclarationRepository.findById(declarationId)
                .orElseThrow(() -> new RuntimeException("Declaration not found"));

        declaration.setApproved(true);
        InvestmentDeclaration updatedDeclaration = investmentDeclarationRepository.save(declaration);
        return ResponseEntity.ok(updatedDeclaration);
    }

    // Delete an investment declaration
    @DeleteMapping("/{declarationId}")
    public ResponseEntity<String> deleteDeclaration(@PathVariable int declarationId) {
        investmentDeclarationRepository.deleteById(declarationId);
        return ResponseEntity.ok("Investment Declaration deleted successfully.");
    }
}

