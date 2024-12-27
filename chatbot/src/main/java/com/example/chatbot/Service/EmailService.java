package com.example.chatbot.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    public void sendSupportEmail(String userMessage) {
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo("gnaneshreddy850@gmail.com");  // Support team's email address
        mailMessage.setSubject("User Assistance Request");
        mailMessage.setText("A user has requested assistance:\n\n" + userMessage);

        javaMailSender.send(mailMessage);
    }
}
