package com.example.moderatedfeed.repository;


import com.example.moderatedfeed.entity.Post;
import com.example.moderatedfeed.entity.PostStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByStatus(PostStatus status);
}
