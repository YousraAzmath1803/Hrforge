package com.manthatech.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.manthatech.dto.BirthdayNotificationDTO;
import com.manthatech.dto.EmpBirthdayDTO;
import com.manthatech.entity.BirthdayCalendarSettings;
import com.manthatech.entity.EmpBirthday;
import com.manthatech.repo.BirthdayCalendarSettingsRepo;
import com.manthatech.repo.EmpRepo;
import com.manthatech.utils.EmailUtils;

import jakarta.mail.MessagingException;

@Service
public class EmpService {

	  @Autowired
	    private EmpRepo empRepository;
	  
	  
	  @Autowired
	    private BirthdayCalendarSettingsRepo repository;

	
	  
	    @Value("${birthday.notify.days-in-advance:7}") // Default to 7 if not configured
	    private int defaultDaysInAdvance;

	    public int getDaysInAdvanceSetting() {
	        return repository.findTopByOrderByIdDesc()
	                .map(BirthdayCalendarSettings::getNotifyDaysInAdvance)
	                .orElse(defaultDaysInAdvance);
	    }


	  
	  public EmpBirthdayDTO getEmployeeDetails(Long id) {
	        EmpBirthday emp = empRepository.findById(id)
	                .orElseThrow(() -> new RuntimeException("Employee not found"));

	        return mapToDTO(emp);
	    }

	    // Get birthdays grouped by day for a specific month
	    public Map<Integer, List<EmpBirthdayDTO>> getBirthdaysByMonth(int month) {
	        List<EmpBirthday> employees = empRepository.findByBirthMonth(month);
	        Map<Integer, List<EmpBirthdayDTO>> birthdaysByDay = new HashMap<>();

	        for (EmpBirthday emp : employees) {
	            int day = emp.getBirthDate().getDayOfMonth();
	            birthdaysByDay
	                    .computeIfAbsent(day, k -> new ArrayList<>())
	                    .add(mapToDTO(emp));
	        }

	        return birthdaysByDay;
	    }

	    // Map entity to DTO
	    private EmpBirthdayDTO mapToDTO(EmpBirthday emp) {
	        EmpBirthdayDTO dto = new EmpBirthdayDTO();
	        dto.setEmployeeId(emp.getEmployeeId());
	        dto.setName(emp.getFirstName() + " " + emp.getLastName());
	        dto.setBirthDate(emp.getBirthDate());
	        dto.setDepartment(emp.getDepartment());
	        dto.setYearsWithCompany(emp.getYearsWithCompany());
	        dto.setPhoto(emp.getPhoto());
	        return dto;
	    }
	    
	    
	    //
	    
	    public List<BirthdayNotificationDTO> getUpcomingBirthdays() {
	    	
	    int daysInAdvance = getDaysInAdvanceSetting(); 
	    	
	        LocalDate currentDate = LocalDate.now();
	        LocalDate endDate = currentDate.plusDays(daysInAdvance); 

	        List<EmpBirthday> upcomingBirthdays = empRepository.findUpcomingBirthdays(currentDate, endDate);

	        return upcomingBirthdays.stream()
	                .map(this::mapToNotificationDTO)
	                .collect(Collectors.toList());
	    }

	    private BirthdayNotificationDTO mapToNotificationDTO(EmpBirthday emp) {
	        BirthdayNotificationDTO dto = new BirthdayNotificationDTO();
	        dto.setPhoto(emp.getPhoto());
	        dto.setName(emp.getFirstName() + " " + emp.getLastName());
	        dto.setBirthDate(emp.getBirthDate());
	        return dto;
	    }
	    
	    //
	    
	    public void sendWish(Long employeeId) {
	        // Fetch employee details
	        EmpBirthday employee = empRepository.findById(employeeId)
	                .orElseThrow(() -> new RuntimeException("Employee not found"));

	    
	        
	        // Send an email or any other wish action
	        String message = "Happy Birthday, " + employee.getFirstName() + "!";
	        try {
				EmailUtils.sendEmail(employee.getEmail(), "Birthday Wishes", message);
			} catch (MessagingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
	        
	    }
	    
	    public List<EmpBirthday> searchEmployees(String keyword) {
	        return empRepository.searchByKeyword(keyword);
	    }
	    
	    
	   
}
