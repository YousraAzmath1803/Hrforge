package com.AMS.attendance.controllers;

import com.AMS.attendance.entities.Holiday;
import com.AMS.attendance.services.HolidayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/holidays")
@CrossOrigin(origins = "*")
public class HolidayController {

    @Autowired
    private HolidayService holidayService;
    @GetMapping("/allholidays")
    public List<Holiday> getAllHolidays() {
        return holidayService.getAllHolidays();
    }


    @PostMapping("/addholiday")
    public void addHoliday(@RequestBody Holiday holiday) {
        holidayService.addHoliday(holiday);
    }

    @PostMapping("/addholidays")
    public void addHolidays(@RequestBody List<Holiday> holidays) {
        holidayService.addHolidays(holidays);
    }

    @DeleteMapping("/deleteholiday/{id}")
    public void deleteHoliday(@PathVariable Long id) {
        holidayService.deleteHoliday(id);
    }
    @DeleteMapping("/deletebydate")
    public void deleteHolidaysByDate(@RequestParam LocalDate date) {
        holidayService.deleteHolidaysByDate(date);
    }
    @GetMapping("/count")
    public int getPublicHolidaysCount(@RequestParam LocalDate monthStart, @RequestParam LocalDate monthEnd) {
        return holidayService.getPublicHolidaysCount(monthStart, monthEnd);
    }
    @GetMapping("/upcoming")
    public List<Holiday> getUpcomingHolidays() {
        return holidayService.getUpcomingHolidays();
    }

//    @GetMapping("/totaldays")
//    public int getTotalDaysInMonth(@RequestParam LocalDate date) {
//        return holidayService.getTotalDaysInMonth(date);
//    }


//    @GetMapping("/workingdays")
//    public int getWorkingDaysInMonth(@RequestParam LocalDate date) {
//        return holidayService.getWorkingDaysInMonth(date);
//    }
}
