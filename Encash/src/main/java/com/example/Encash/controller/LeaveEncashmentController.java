package com.example.Encash.controller;

import com.example.Encash.dto.LeaveEncashmentDTO;
import com.example.Encash.model.LeaveEncashment;
import com.example.Encash.service.LeaveEncashmentService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/encashments")
public class LeaveEncashmentController {

    private final LeaveEncashmentService service;

    public LeaveEncashmentController(LeaveEncashmentService service) {
        this.service = service;
    }

    @PostMapping("/add")
    public LeaveEncashment addEncashment(@RequestBody LeaveEncashmentDTO encashmentDTO) {
        return service.saveEncashment(encashmentDTO);
    }

    @GetMapping("/count")
    public long getEncashmentCount(@RequestParam int year) {
        return service.countEncashmentsByYear(year);
    }

    @GetMapping("/total-amount")
    public double getTotalEncashmentAmount(@RequestParam int year) {
        return service.totalEncashmentAmountByYear(year);
    }
}
