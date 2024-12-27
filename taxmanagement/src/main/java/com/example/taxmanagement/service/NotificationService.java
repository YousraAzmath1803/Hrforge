package com.example.taxmanagement.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {
    @Autowired
    private JavaMailSender mailSender;

    public void sendNotificationToAdmin(String subject, String message, String adminEmail) {
        SimpleMailMessage email = new SimpleMailMessage();
        email.setTo(adminEmail);
        email.setSubject(subject);
        email.setText(message);

        mailSender.send(email);
        System.out.println("Notification sent to admin: " + adminEmail);
    }

    public void sendNotification(int employeeId, String message) {
    }

    public void sendReminders(List<Integer> employeeIds, String message) {
    }
}

