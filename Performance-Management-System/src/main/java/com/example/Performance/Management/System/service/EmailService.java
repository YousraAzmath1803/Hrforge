//package com.example.Performance.Management.System.service;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.mail.SimpleMailMessage;
//import org.springframework.mail.javamail.JavaMailSender;
//import org.springframework.stereotype.Service;
//
//@Service
//public class EmailService {
//
//    @Autowired
//    private JavaMailSender emailSender;
//
//    // Method to send low code quality notification to the user
//    public void sendLowQualityNotificationToUser(String userEmail) {
//        SimpleMailMessage message = createEmailMessage(userEmail,
//                "Low Code Quality Alert",
//                "Dear User,\n\nYour code quality is below the acceptable level. Please take necessary actions.\n\nBest,\nYour Team");
//        emailSender.send(message);
//    }
//
//    // Method to send low code quality notification to the admin
//    public void sendLowQualityNotificationToAdmin(String adminEmail, Long employeeId) {
//        String subject = "Low Code Quality Alert";
//        String body = "Attention Admin,\n\nEmployee with ID " + employeeId + " has low code quality. Please review.\n\nBest,\nYour Team";
//        SimpleMailMessage message = createEmailMessage(adminEmail, subject, body);
//        emailSender.send(message);
//    }
//
//    // Method to send review reminder to the user
//    public void sendReviewReminderToUser(String userEmail) {
//        SimpleMailMessage message = createEmailMessage(userEmail,
//                "Performance Review Reminder",
//                "Dear User,\n\nYour performance review is scheduled for tomorrow. Please be prepared.\n\nBest,\nYour Team");
//        emailSender.send(message);
//    }
//
//    // Method to send review reminder to the admin
//    public void sendReviewReminderToAdmin(String adminEmail, Long employeeId) {
//        String subject = "Performance Review Reminder";
//        String body = "Attention Admin,\n\nEmployee with ID " + employeeId + " has a performance review scheduled for tomorrow.\n\nBest,\nYour Team";
//        SimpleMailMessage message = createEmailMessage(adminEmail, subject, body);
//        emailSender.send(message);
//    }
//
//    // Helper method to create a SimpleMailMessage
//    private SimpleMailMessage createEmailMessage(String to, String subject, String text) {
//        SimpleMailMessage message = new SimpleMailMessage();
//        message.setTo(to);
//        message.setSubject(subject);
//        message.setText(text);
//        return message;
//    }
//}
package com.example.Performance.Management.System.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender emailSender;

    // Method to send low code quality notification to the user
    public void sendLowQualityNotificationToUser(String userEmail) {
        SimpleMailMessage message = createEmailMessage(
                userEmail,
                "Low Code Quality Alert",
                "Dear User,\n\nYour code quality is below the acceptable level. Please take necessary actions.\n\nBest,\nYour Team"
        );
        emailSender.send(message);
    }

    // Method to send low code quality notification to the admin
    public void sendLowQualityNotificationToAdmin(String adminEmail, Long employeeId) {
        SimpleMailMessage message = createEmailMessage(
                adminEmail,
                "Low Code Quality Alert",
                "Attention Admin,\n\nEmployee with ID " + employeeId + " has low code quality. Please review.\n\nBest,\nYour Team"
        );
        emailSender.send(message);
    }

    // Method to send review reminder to the user
    public void sendReviewReminderToUser(String userEmail) {
        SimpleMailMessage message = createEmailMessage(
                userEmail,
                "Performance Review Reminder",
                "Dear User,\n\nYour performance review is scheduled for tomorrow. Please be prepared.\n\nBest,\nYour Team"
        );
        emailSender.send(message);
    }

    // Method to send review reminder to the admin
    public void sendReviewReminderToAdmin(String adminEmail, Long employeeId) {
        SimpleMailMessage message = createEmailMessage(
                adminEmail,
                "Performance Review Reminder",
                "Attention Admin,\n\nEmployee with ID " + employeeId + " has a performance review scheduled for tomorrow.\n\nBest,\nYour Team"
        );
        emailSender.send(message);
    }

    // Helper method to create a SimpleMailMessage
    private SimpleMailMessage createEmailMessage(String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        return message;
    }
}
