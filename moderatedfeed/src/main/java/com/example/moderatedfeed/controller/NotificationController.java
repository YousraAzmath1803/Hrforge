package com.example.moderatedfeed.controller;

import com.example.moderatedfeed.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private final EmailService emailService;

    @Autowired
    public NotificationController(EmailService emailService) {
        this.emailService = emailService;
    }

    // Endpoint to send a plain-text email
    @PostMapping("/send")
    public String sendNotification(
            @RequestParam String to,
            @RequestParam String subject,
            @RequestParam String body) {
        emailService.sendEmail(to, subject, body);
        return "Email sent successfully to " + to;
    }
}
