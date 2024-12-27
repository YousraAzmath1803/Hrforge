//package com.example.moderatedfeed.service;
//
//import com.example.moderatedfeed.entity.Post;
//import com.example.moderatedfeed.entity.PostStatus;
//import com.example.moderatedfeed.repository.PostRepository;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//
//@Service
//public class PostService {
//    private final PostRepository postRepository;
//
//    public PostService(PostRepository postRepository) {
//        this.postRepository = postRepository;
//    }
//
//    public Post createPost(Post post) {
//        return postRepository.save(post);
//    }
//
//    public List<Post> getAllPosts() {
//        return postRepository.findAll();
//    }
//
//    public List<Post> getPostsByStatus(PostStatus status) {
//        return postRepository.findByStatus(status);
//    }
//
//    public void deletePost(Long postId) {
//        postRepository.deleteById(postId);
//    }
//}
//
package com.example.moderatedfeed.service;

import com.example.moderatedfeed.entity.Post;
import com.example.moderatedfeed.entity.PostStatus;
import com.example.moderatedfeed.repository.PostRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class PostService {

    private final PostRepository postRepository;
    private final NotificationService notificationService; // Add NotificationService

    // Constructor to inject PostRepository and NotificationService
    public PostService(PostRepository postRepository, NotificationService notificationService) {
        this.postRepository = postRepository;
        this.notificationService = notificationService;
    }

    // Method to create a post
    public Post createPost(Post post) {
        // Ensure default status is set if not provided
        if (post.getStatus() == null) {
            post.setStatus(PostStatus.DRAFT);
        }

        // Save the post
        Post createdPost = postRepository.save(post);

        // Send notification after creating the post
        notificationService.sendPostCreationNotification(createdPost);

        return createdPost;
    }

    // Method to retrieve all posts
    @Transactional(readOnly = true)
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    // Method to retrieve posts by their status (e.g., DRAFT, PUBLISHED)
    @Transactional(readOnly = true)
    public List<Post> getPostsByStatus(PostStatus status) {
        return postRepository.findByStatus(status);
    }

    // Method to retrieve a post by its ID
    @Transactional(readOnly = true)
    public Optional<Post> getPostById(Long postId) {
        return postRepository.findById(postId);
    }

    // Method to update a post
    public Post updatePost(Long postId, Post updatedPost) {
        return postRepository.findById(postId).map(existingPost -> {
            // Update fields from the provided updatedPost
            existingPost.setTitle(updatedPost.getTitle());
            existingPost.setContent(updatedPost.getContent());
            existingPost.setStatus(updatedPost.getStatus());
            existingPost.setCategory(updatedPost.getCategory());
            existingPost.setScheduledAt(updatedPost.getScheduledAt());
            existingPost.setPrivate(updatedPost.isPrivate());
            existingPost.setImageUrl(updatedPost.getImageUrl());  // Update imageUrl
            existingPost.setVideoUrl(updatedPost.getVideoUrl());  // Update videoUrl

            // Save the updated post
            Post updated = postRepository.save(existingPost);

            // Send notification after updating the post
            notificationService.sendPostUpdateNotification(updated);

            return updated;
        }).orElseThrow(() -> new IllegalArgumentException("Post not found with ID: " + postId));
    }

    // Method to delete a post by its ID
    public void deletePost(Long postId) {
        if (!postRepository.existsById(postId)) {
            throw new IllegalArgumentException("Post not found with ID: " + postId);
        }
        postRepository.deleteById(postId);
    }
}
