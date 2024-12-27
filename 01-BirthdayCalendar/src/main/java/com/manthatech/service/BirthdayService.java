package com.manthatech.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.manthatech.entity.BirthdayGreeting;
import com.manthatech.entity.EmpBirthday;
import com.manthatech.repo.BirthdayGreetingRepo;
import com.manthatech.repo.EmpRepo;

@Service
public class BirthdayService {

	@Autowired
    private EmpRepo empRepo;

	@Autowired
    private BirthdayGreetingRepo birthdayGreetingRepository;
	
	

    public List<EmpBirthday> getBirthdaysForMonth(int month) {
        return empRepo.findByBirthMonth(month);
    }

    public void sendBirthdayGreeting(Long senderId, Long recipientId, String message) {
    	  Optional<EmpBirthday> sender = empRepo.findById(senderId);
          Optional<EmpBirthday> recipient = empRepo.findById(recipientId);

          if (!sender.isPresent()) {
              throw new IllegalArgumentException("Sender with ID " + senderId + " does not exist.");
          }

          if (!recipient.isPresent()) {
              throw new IllegalArgumentException("Recipient with ID " + recipientId + " does not exist.");
          }

          // Create a new BirthdayGreeting entity and set its properties
          BirthdayGreeting birthdayGreeting = new BirthdayGreeting();
          birthdayGreeting.setSender(sender.get());
          birthdayGreeting.setRecipient(recipient.get());
          birthdayGreeting.setMessage(message);
          birthdayGreeting.setSentDate(LocalDateTime.now());

          // Save the greeting to the database
          birthdayGreetingRepository.save(birthdayGreeting);
          
          
      
    }
    
   
}
