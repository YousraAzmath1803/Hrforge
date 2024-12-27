package com.manthatech.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.manthatech.entity.BirthdayCalendarSettings;
import com.manthatech.service.BirthdayCalendarSettingsService;

@RestController
@RequestMapping("/api/birthday-settings")
public class BirthdayCalendarSettingsController {

	@Autowired
    private BirthdayCalendarSettingsService settingsService;

    @GetMapping("/{id}")
    public ResponseEntity<BirthdayCalendarSettings> getSettings(@PathVariable Long id) {
        BirthdayCalendarSettings settings = settingsService.getSettings(id);
        return ResponseEntity.ok(settings);
    }

    @PutMapping("/{id}")
    public ResponseEntity<BirthdayCalendarSettings> updateSettings(
            @PathVariable Long id,
            @RequestBody BirthdayCalendarSettings newSettings) {
        BirthdayCalendarSettings updatedSettings = settingsService.updateSettings(id, newSettings);
        return ResponseEntity.ok(updatedSettings);
    }
}
