package com.example.Encash.service;

import com.example.Encash.dto.LeaveEncashmentDTO;
import com.example.Encash.model.LeaveEncashment;
import com.example.Encash.repository.LeaveEncashmentRepository;
import org.springframework.stereotype.Service;

@Service
public class LeaveEncashmentService {
    private final LeaveEncashmentRepository repository;

    public LeaveEncashmentService(LeaveEncashmentRepository repository) {
        this.repository = repository;
    }

    public LeaveEncashment saveEncashment(LeaveEncashmentDTO encashmentDTO) {
        LeaveEncashment encashment = new LeaveEncashment();
        encashment.setEmployeeId(encashmentDTO.getEmployeeId());
        encashment.setEncashmentDate(encashmentDTO.getEncashmentDate());
        encashment.setEncashedLeaves(encashmentDTO.getEncashedLeaves());
        encashment.setAmount(encashmentDTO.getAmount());
        return repository.save(encashment);
    }

    public long countEncashmentsByYear(int year) {
        return repository.findAll().stream()
                .filter(e -> e.getEncashmentDate().getYear() == year)
                .count();
    }

    public double totalEncashmentAmountByYear(int year) {
        return repository.findAll().stream()
                .filter(e -> e.getEncashmentDate().getYear() == year)
                .mapToDouble(e -> e.getAmount())
                .sum();
    }
}
