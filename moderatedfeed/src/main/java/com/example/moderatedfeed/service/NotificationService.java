package com.example.moderatedfeed.service;

import com.example.moderatedfeed.entity.Post;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {

    @Autowired
    private JavaMailSender javaMailSender;

    // Admin email address (can be retrieved from the database or a configuration)
    private static final String ADMIN_EMAIL = "gnaneshreddy850@gmail.com";

    // Method to send email when a new post is created
    public void sendPostCreationNotification(Post post) {
        // Compose the notification email for post creation
        String subject = "New Post Created: " + post.getTitle();
        String body = String.format("A new post has been created:\n\nTitle: %s\nContent: %s\nImage URL: %s\nVideo URL: %s",
                post.getTitle(), post.getContent(), post.getImageUrl(), post.getVideoUrl());

        // Send email to admin
        sendEmail(ADMIN_EMAIL, subject, body);
    }

    // Method to send email when a post is updated
    public void sendPostUpdateNotification(Post post) {
        // Compose the notification email for post update
        String subject = "Post Updated: " + post.getTitle();
        String body = String.format("The post has been updated:\n\nTitle: %s\nUpdated Content: %s\nUpdated Image URL: %s\nUpdated Video URL: %s",
                post.getTitle(), post.getContent(), post.getImageUrl(), post.getVideoUrl());

        // Send email to admin
        sendEmail(ADMIN_EMAIL, subject, body);
    }

    // Method to send an email (generic method)
    private void sendEmail(String to, String subject, String body) {
        // Create a mime message for sending email
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper helper;
        try {
            helper = new MimeMessageHelper(mimeMessage, true);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(body);
            javaMailSender.send(mimeMessage);  // Send the email
        } catch (MessagingException e) {
            e.printStackTrace();  // Log the error if sending fails
        }
    }
}
