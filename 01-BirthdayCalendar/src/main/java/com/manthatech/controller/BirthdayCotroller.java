package com.manthatech.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.manthatech.entity.EmpBirthday;
import com.manthatech.service.BirthdayService;

@RestController
@RequestMapping("/api/birthday")
public class BirthdayCotroller {

	  @Autowired
	    private BirthdayService birthdayService;

	    @GetMapping("/upcoming")
	    public List<EmpBirthday> getUpcomingBirthdays(@RequestParam int month) {
	        return birthdayService.getBirthdaysForMonth(month);
	    }

	    @PostMapping("/greet")
	    public ResponseEntity<?> sendGreeting(@RequestParam Long senderId, 
	                                          @RequestParam Long recipientId, 
	                                          @RequestParam String message) {
	        birthdayService.sendBirthdayGreeting(senderId, recipientId, message);
	        return ResponseEntity.ok("Greeting sent successfully!");
	    }
	   
}
