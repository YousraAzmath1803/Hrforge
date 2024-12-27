package com.example.moderatedfeed.entity;

import jakarta.persistence.*;
        import lombok.Data;

@Data
@Entity
public class Flag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Post post;

    private String reason; // E.g., Spam, Inappropriate, etc.

    public String getFlaggedAt() {
        return "";
    }
}

//package com.example.moderatedfeed.entity;
//
//import jakarta.persistence.*;
//import lombok.Data;
//
//import java.time.LocalDateTime;
//
//@Data
//@Entity
//public class Flag {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    @ManyToOne
//    private Post post;
//
//    private String reason; // E.g., Spam, Inappropriate, etc.
//
//    @Enumerated(EnumType.STRING)
//    private FlagStatus status = FlagStatus.PENDING; // Default flag status
//
//    private LocalDateTime flaggedAt = LocalDateTime.now(); // Timestamp when the flag was created
//
//    private class FlagStatus {
//        public static FlagStatus PENDING;
//    }
//}
