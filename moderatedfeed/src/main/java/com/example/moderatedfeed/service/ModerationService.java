package com.example.moderatedfeed.service;

import com.example.moderatedfeed.entity.Flag;
import com.example.moderatedfeed.repository.FlagRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ModerationService {
    private final FlagRepository flagRepository;
    private final EmailService emailService;

    public ModerationService(FlagRepository flagRepository, EmailService emailService) {
        this.flagRepository = flagRepository;
        this.emailService = emailService;
    }

    public List<Flag> getAllFlags() {
        return flagRepository.findAll();
    }

    public Flag createFlag(Flag flag) {
        Flag savedFlag = flagRepository.save(flag);

        // Notify moderators via email
        String moderatorEmail = "gnaneshreddy850@gmail.com"; // Replace with actual moderator email
        String subject = "New Flagged Post Notification";
        String body = "Post ID: " + savedFlag.getPost().getId() +
                "\nReason: " + savedFlag.getReason() +
                "\nFlagged At: " + savedFlag.getFlaggedAt();

        emailService.sendEmail(moderatorEmail, subject, body);
        return savedFlag;
    }

    public void resolveFlag(Long flagId) {
        flagRepository.deleteById(flagId);
    }
}
