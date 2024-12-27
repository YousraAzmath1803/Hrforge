package com.manthatech.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class BirthdayGreeting {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long greetingId;

    @ManyToOne
    @JoinColumn(name = "sender_id", nullable = false)
    private EmpBirthday sender;

    @ManyToOne
    @JoinColumn(name = "recipient_id", nullable = false)
    private EmpBirthday recipient;

    @Column(nullable = false)
    private String message;

    @Column(nullable = false)
    private LocalDateTime sentDate = LocalDateTime.now();

	public Long getGreetingId() {
		return greetingId;
	}

	public void setGreetingId(Long greetingId) {
		this.greetingId = greetingId;
	}

	public EmpBirthday getSender() {
		return sender;
	}

	public void setSender(EmpBirthday sender) {
		this.sender = sender;
	}

	public EmpBirthday getRecipient() {
		return recipient;
	}

	public void setRecipient(EmpBirthday recipient) {
		this.recipient = recipient;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public LocalDateTime getSentDate() {
		return sentDate;
	}

	public void setSentDate(LocalDateTime sentDate) {
		this.sentDate = sentDate;
	}
    
    
    
}
