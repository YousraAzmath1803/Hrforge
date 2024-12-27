package com.example.moderatedfeed.repository;

import com.example.moderatedfeed.entity.Flag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FlagRepository extends JpaRepository<Flag, Long> {
}

