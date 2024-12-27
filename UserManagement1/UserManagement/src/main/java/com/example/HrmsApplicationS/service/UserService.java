package com.example.HrmsApplicationS.service;

import com.example.HrmsApplicationS.model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    List<User> getAllUsers();
    User createUser(User user);
    Optional<User> getUserById(Long id);
    User updateUser(Long id, User userDetails);
    void deleteUser(Long id);
}
