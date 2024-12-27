package com.example.chatbot.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.time.LocalDateTime;

@Entity
public class Conversation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userMessage;
    private String aiResponse;
    private LocalDateTime timestamp;

    // Default constructor
    public Conversation() {
        // Default constructor for JPA
    }

    // Constructor with parameters
    public Conversation(String userMessage, String aiResponse, LocalDateTime timestamp) {
        this.userMessage = userMessage;
        this.aiResponse = aiResponse;
        this.timestamp = timestamp;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserMessage() {
        return userMessage;
    }

    public void setUserMessage(String userMessage) {
        this.userMessage = userMessage;
    }

    public String getAiResponse() {
        return aiResponse;
    }

    public void setAiResponse(String aiResponse) {
        this.aiResponse = aiResponse;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    // Custom Methods
    public boolean isRecent() {
        return timestamp != null && timestamp.isAfter(LocalDateTime.now().minusDays(1));
    }

    public String summarize() {
        return "Message: " + userMessage + " | Response: " + aiResponse;
    }

    @Override
    public String toString() {
        return "Conversation{" +
                "id=" + id +
                ", userMessage='" + userMessage + '\'' +
                ", aiResponse='" + aiResponse + '\'' +
                ", timestamp=" + timestamp +
                '}';
    }

    public void setBotResponse(String botResponse) {
    }
}
