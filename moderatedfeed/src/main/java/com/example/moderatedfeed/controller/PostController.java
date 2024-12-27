//package com.example.moderatedfeed.controller;
//
//import com.example.moderatedfeed.entity.Post;
//import com.example.moderatedfeed.entity.PostStatus;
//import com.example.moderatedfeed.service.PostService;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/posts")
//public class PostController {
//    private final PostService postService;
//
//    public PostController(PostService postService) {
//        this.postService = postService;
//    }
//
//    @PostMapping
//    public ResponseEntity<Post> createPost(@RequestBody Post post) {
//        return ResponseEntity.ok(postService.createPost(post));
//    }
//
//    @GetMapping
//    public ResponseEntity<List<Post>> getAllPosts() {
//        return ResponseEntity.ok(postService.getAllPosts());
//    }
//
//    @GetMapping("/status/{status}")
//    public ResponseEntity<List<Post>> getPostsByStatus(@PathVariable PostStatus status) {
//        return ResponseEntity.ok(postService.getPostsByStatus(status));
//    }
//
//    @DeleteMapping("/{id}")
//    public ResponseEntity<Void> deletePost(@PathVariable Long id) {
//        postService.deletePost(id);
//        return ResponseEntity.noContent().build();
//    }
//}
package com.example.moderatedfeed.controller;

import com.example.moderatedfeed.entity.Post;
import com.example.moderatedfeed.entity.PostStatus;
import com.example.moderatedfeed.service.PostService;
import com.example.moderatedfeed.service.NotificationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    private final PostService postService;
    private final NotificationService notificationService; // Notification service for sending notifications

    public PostController(PostService postService, NotificationService notificationService) {
        this.postService = postService;
        this.notificationService = notificationService;
    }

    // Create a new post with optional image and video URLs
    @PostMapping
    public ResponseEntity<Post> createPost(@RequestBody Post post) {
        // Create post via PostService
        Post createdPost = postService.createPost(post);

        // Handle the image and video URLs as per your business logic
        if (post.getImageUrl() != null || post.getVideoUrl() != null) {
            // If there are image or video URLs, ensure they are valid or perform additional logic as needed
            // For example, you might want to validate the URLs or store them in a database or cloud storage
            createdPost.setImageUrl(post.getImageUrl());
            createdPost.setVideoUrl(post.getVideoUrl());
        }

        // Send notification to admin after post creation
        notificationService.sendPostCreationNotification(createdPost); // Send notification to admin

        return ResponseEntity.ok(createdPost); // Return the created post in the response body
    }

    // Get all posts
    @GetMapping
    public ResponseEntity<List<Post>> getAllPosts() {
        List<Post> posts = postService.getAllPosts(); // Retrieve all posts
        return ResponseEntity.ok(posts); // Return the list of posts
    }

    // Get posts by status (DRAFT, PUBLISHED, etc.)
    @GetMapping("/status/{status}")
    public ResponseEntity<List<Post>> getPostsByStatus(@PathVariable PostStatus status) {
        List<Post> posts = postService.getPostsByStatus(status); // Retrieve posts by status
        return ResponseEntity.ok(posts); // Return the list of posts by status
    }

    // Delete a post by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id) {
        postService.deletePost(id); // Delete the post by ID
        return ResponseEntity.noContent().build(); // Return 204 No Content after successful deletion
    }

    // Optional: Update post by ID
    @PutMapping("/{id}")
    public ResponseEntity<Post> updatePost(@PathVariable Long id, @RequestBody Post post) {
        Post updatedPost = postService.updatePost(id, post); // Update the post via PostService
        return ResponseEntity.ok(updatedPost); // Return the updated post
    }
}
