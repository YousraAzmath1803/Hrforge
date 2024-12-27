//package com.example.moderatedfeed.entity;
//
//
//import jakarta.persistence.*;
//import lombok.Data;
//
//import java.time.LocalDateTime;
//
//@Data
//@Entity
//public class Post {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    private String title;
//    private String content;
//
//    @Enumerated(EnumType.STRING)
//    private PostStatus status = PostStatus.DRAFT;
//
//    private String category;
//
//    private LocalDateTime createdAt = LocalDateTime.now();
//    private LocalDateTime scheduledAt;
//
//    private boolean isPrivate;
//}
package com.example.moderatedfeed.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@Entity
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, length = 1000)
    private String content;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PostStatus status = PostStatus.DRAFT;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();  // Automatically set createdAt when post is created

    private LocalDateTime scheduledAt;

    @Column(nullable = false)
    private boolean isPrivate;

    @Version
    private Integer version;  // Optimistic locking to handle concurrent updates

    @Column(name = "image_url")
    private String imageUrl;  // URL for the post's image

    @Column(name = "video_url")
    private String videoUrl;  // URL for the post's video

    // Constructor that initializes createdAt to now() if not provided
    public Post(String title, String content, String category, boolean isPrivate, String imageUrl, String videoUrl) {
        this.title = title;
        this.content = content;
        this.category = category;
        this.isPrivate = isPrivate;
        this.createdAt = LocalDateTime.now();  // Ensures createdAt is set when post is created
        this.imageUrl = imageUrl;
        this.videoUrl = videoUrl;
    }

    // Getters and setters for imageUrl and videoUrl
    public String getImageUrl() {
        return imageUrl;  // Return the actual image URL
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getVideoUrl() {
        return videoUrl;  // Return the actual video URL
    }

    public void setVideoUrl(String videoUrl) {
        this.videoUrl = videoUrl;
    }
}
