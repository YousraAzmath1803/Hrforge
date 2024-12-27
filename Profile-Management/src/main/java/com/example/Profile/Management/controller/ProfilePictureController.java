package com.example.Profile.Management.controller;
import com.example.Profile.Management.model.Employee;
import com.example.Profile.Management.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.Optional;

@RestController
@RequestMapping("/api/employees/profile/picture")
public class ProfilePictureController {

    @Autowired
    private EmployeeService employeeService;

    // API to upload or update the profile picture by the user
    @PutMapping("/upload/{id}")
    public ResponseEntity<Employee> uploadProfilePicture(@PathVariable Long id, @RequestParam("profilePicture") MultipartFile profilePicture) {
        Optional<Employee> existingEmployeeOpt = employeeService.getEmployeeById(id);
        if (existingEmployeeOpt.isPresent()) {
            try {
                byte[] pictureBytes = profilePicture.getBytes();
                Optional<Employee> updatedEmployeeOpt = employeeService.updateProfilePicture(id, pictureBytes);
                return updatedEmployeeOpt.map(employee -> {
                    convertProfilePictureToBase64(employee); // Convert image to Base64 for response
                    return ResponseEntity.ok(employee);
                }).orElseGet(() -> ResponseEntity.notFound().build());
            } catch (IOException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
            }
        }
        return ResponseEntity.notFound().build();
    }

    // API to retrieve the profile picture as a byte array
    @GetMapping("/view/{id}")
    public ResponseEntity<?> getProfilePicture(@PathVariable Long id) {
        return employeeService.getEmployeeById(id)
                .map(employee -> {
                    byte[] imageData = employee.getProfilePicture();
                    if (imageData != null) {
                        return ResponseEntity.ok()
                                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"profile_picture_" + id + "\"")
                                .contentType(determineImageType(imageData)) // Determine content type
                                .body(imageData);
                    }
                    return ResponseEntity.notFound().build();
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Helper method to determine the content type of the image dynamically (simplified for this example)
    private MediaType determineImageType(byte[] imageData) {
        // Ideally, detect image type from the actual data
        return MediaType.IMAGE_JPEG; // Defaulting to JPEG for this example
    }

    // Helper method to convert profile picture to Base64 string for API response
    private void convertProfilePictureToBase64(Employee employee) {
        if (employee.getProfilePicture() != null) {
            String base64Image = Base64.getEncoder().encodeToString(employee.getProfilePicture());
            employee.setProfilePictureBase64(base64Image); // Set Base64 encoded image string in the response
        }
    }
}

