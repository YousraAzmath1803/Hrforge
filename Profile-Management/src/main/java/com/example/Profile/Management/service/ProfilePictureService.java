package com.example.Profile.Management.service;

import com.example.Profile.Management.model.ProfilePicture;
import com.example.Profile.Management.model.Employee; // Make sure to import Employee
import com.example.Profile.Management.repository.ProfilePictureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProfilePictureService {

    @Autowired
    private ProfilePictureRepository profilePictureRepository;

    // Save or update profile picture
    public ProfilePicture saveProfilePicture(Long employeeId, byte[] imageData) {
        ProfilePicture profilePicture = new ProfilePicture();
        profilePicture.setPictureData(imageData);

        // Create an Employee object or fetch it from the repository if needed
        Employee employee = new Employee();
        employee.setId(employeeId);
        profilePicture.setEmployee(employee); // Associate the employee with the profile picture

        return profilePictureRepository.save(profilePicture);
    }

    // Retrieve profile picture by employee ID
    public Optional<ProfilePicture> getProfilePictureByEmployeeId(Long employeeId) {
        return profilePictureRepository.findByEmployeeId(employeeId);
    }

    // Delete profile picture by ID
    public void deleteProfilePicture(Long id) {
        if (!profilePictureRepository.existsById(id)) {
            throw new IllegalArgumentException("Profile picture with ID " + id + " does not exist.");
        }
        profilePictureRepository.deleteById(id);
    }
}
