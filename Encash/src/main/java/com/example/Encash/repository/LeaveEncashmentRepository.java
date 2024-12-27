package com.example.Encash.repository;

import com.example.Encash.model.LeaveEncashment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LeaveEncashmentRepository extends JpaRepository<LeaveEncashment, Long> {
}
