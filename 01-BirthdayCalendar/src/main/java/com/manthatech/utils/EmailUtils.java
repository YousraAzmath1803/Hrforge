package com.manthatech.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Component
public class EmailUtils {


	
	 @Autowired
	    private static JavaMailSender mailSender;


	    @Autowired
	    public void setMailSender(JavaMailSender mailSender) {
	        EmailUtils.mailSender = mailSender;
	    }

	    public static void sendEmail(String to, String subject, String body) throws MessagingException {
	        MimeMessage message = mailSender.createMimeMessage();
	        MimeMessageHelper helper = new MimeMessageHelper(message, true);
	        helper.setTo(to);
	        helper.setSubject(subject);
	        helper.setText(body, true);  // true means the body is HTML
	        mailSender.send(message);
	    }
}
