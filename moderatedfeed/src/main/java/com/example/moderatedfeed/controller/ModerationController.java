package com.example.moderatedfeed.controller;
import com.example.moderatedfeed.entity.Flag;
import com.example.moderatedfeed.service.ModerationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/moderation")
public class ModerationController {
    private final ModerationService moderationService;

    public ModerationController(ModerationService moderationService) {
        this.moderationService = moderationService;
    }

    @GetMapping("/flags")
    public ResponseEntity<List<Flag>> getAllFlags() {
        return ResponseEntity.ok(moderationService.getAllFlags());
    }

    @PostMapping("/flags")
    public ResponseEntity<Flag> createFlag(@RequestBody Flag flag) {
        return ResponseEntity.ok(moderationService.createFlag(flag));
    }

    @DeleteMapping("/flags/{id}")
    public ResponseEntity<Void> resolveFlag(@PathVariable Long id) {
        moderationService.resolveFlag(id);
        return ResponseEntity.noContent().build();
    }
}
