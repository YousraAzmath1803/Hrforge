package com.example.chatbot.Controller;

import com.example.chatbot.Service.ChatbotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/api/chatbot")
public class ChatbotController {

    private final ChatbotService chatbotService;

    @Autowired
    public ChatbotController(ChatbotService chatbotService) {
        this.chatbotService = chatbotService;
    }

    @PostMapping("/message")
    public ResponseEntity<String> getResponse(@RequestBody String userMessage) {
        if (userMessage == null || userMessage.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Please provide a valid message.");
        }

        if (userMessage.length() > 1000) {
            return ResponseEntity.badRequest().body("Message is too long. Please limit it to 1000 characters.");
        }

        try {
            // Get the chatbot's response and save the conversation (both user message and response)
            String botResponse = chatbotService.getResponse(userMessage);
            return ResponseEntity.ok(botResponse);
        } catch (Exception e) {
            // Log the exception if needed
            // e.g., logger.error("Error processing message", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while processing your request. Please try again later.");
        }
    }

    @PostMapping("/sendEmail")
    public ResponseEntity<String> sendEmail(@RequestBody String userMessage) {
        try {
            chatbotService.sendSupportEmail(userMessage);
            return ResponseEntity.ok("Email sent successfully.");
        } catch (Exception e) {
            // Log the exception if needed
            // e.g., logger.error("Error sending email", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while sending the email. Please try again later.");
        }
    }
}
