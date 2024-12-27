package com.manthatech.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.manthatech.entity.BirthdayCalendarSettings;

@Repository
public interface BirthdayCalendarSettingsRepo extends JpaRepository<BirthdayCalendarSettings, Long>{

	Optional<BirthdayCalendarSettings> findTopByOrderByIdDesc();
	
	Optional<BirthdayCalendarSettings> findById(Long id);
}
