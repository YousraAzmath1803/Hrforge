package com.example.Performance.Management.System;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling; // Import the EnableScheduling annotation

@SpringBootApplication
@EnableScheduling // Enable scheduling for the application
public class PerformanceManagementSystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(PerformanceManagementSystemApplication.class, args);
		System.out.println("Performance Management System Application started successfully.");
	}
}
