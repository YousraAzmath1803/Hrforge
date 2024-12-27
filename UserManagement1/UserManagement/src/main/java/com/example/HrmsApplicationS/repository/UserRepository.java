package com.example.HrmsApplicationS.repository;

import com.example.HrmsApplicationS.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Custom query method to find a user by email
    Optional<User> findByEmail(String email);

    // Custom query method to check if a user exists by email
    boolean existsByEmail(String email);
}
