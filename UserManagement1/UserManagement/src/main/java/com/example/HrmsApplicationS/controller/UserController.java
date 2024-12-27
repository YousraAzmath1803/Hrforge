package com.example.HrmsApplicationS.controller;

import com.example.HrmsApplicationS.model.User;
import com.example.HrmsApplicationS.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    // Get all users
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        if (users.isEmpty()) {
            return ResponseEntity.noContent().build();  // 204 No Content if no users found
        }
        return ResponseEntity.ok(users);  // 200 OK with users list
    }

    // Create a new user
    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User createdUser = userService.createUser(user);
        return ResponseEntity.status(201).body(createdUser);  // 201 Created with created user
    }

    // Get user by ID
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return userService.getUserById(id)
                .map(user -> ResponseEntity.ok().body(user))  // 200 OK with user found
                .orElse(ResponseEntity.notFound().build());   // 404 Not Found if no user
    }

    // Update user by ID
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User userDetails) {
        try {
            User updatedUser = userService.updateUser(id, userDetails);
            return ResponseEntity.ok().body(updatedUser);  // 200 OK with updated user
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null); // 400 Bad Request for errors
        }
    }

    // Delete user by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        try {
            userService.deleteUser(id);
            return ResponseEntity.ok("User deleted successfully"); // 200 OK with confirmation message
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body("User not found"); // 404 Not Found if user doesn't exist
        }
    }
}
