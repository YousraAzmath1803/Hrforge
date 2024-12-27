package com.manthatech.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.manthatech.entity.BirthdayCalendarSettings;
import com.manthatech.repo.BirthdayCalendarSettingsRepo;

@Service
public class BirthdayCalendarSettingsService {

	 @Autowired
	    private BirthdayCalendarSettingsRepo settingsRepository;

	    public BirthdayCalendarSettings getSettings(Long id) {
	        return settingsRepository.findById(id)
	                .orElseThrow(() -> new RuntimeException("Settings not found for this ID: " + id));
	    }

	    public BirthdayCalendarSettings updateSettings(Long id, BirthdayCalendarSettings newSettings) {
	        BirthdayCalendarSettings existingSettings = getSettings(id);
	        existingSettings.setIsNotificationEnabled(newSettings.getIsNotificationEnabled());
	        existingSettings.setNotifyDaysInAdvance(newSettings.getNotifyDaysInAdvance());
	        existingSettings.setNotificationMethod(newSettings.getNotificationMethod());
	        existingSettings.setVisibilityRole(newSettings.getVisibilityRole());
	        return settingsRepository.save(existingSettings);
	    }
}
