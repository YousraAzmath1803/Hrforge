package com.example.Profile.Management.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import java.time.LocalDate;

@Entity
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Basic Information
    private String name;
    private LocalDate dateOfBirth;
    private String gender;
    private String phone;
    private String address;
    private String email; // Email field to uniquely identify employees

    // Employment Details
    private String employeeId;
    private String jobTitle;
    private String department;
    private LocalDate dateOfJoining;
    private String employmentType; // E.g., Full-Time, Part-Time, Contract

    // Skills
    private String skills; // Comma-separated string or use a collection for more structured data

    // Profile Picture (binary data stored in the database)
    @Lob
    private byte[] profilePicture; // Default to null when not provided

    // Default constructor
    public Employee() {
        this.profilePicture = null; // Ensure profilePicture is null by default
    }

    // Constructor with all fields except profilePicture
    public Employee(String name, LocalDate dateOfBirth, String gender, String phone, String address, String email,
                    String employeeId, String jobTitle, String department, LocalDate dateOfJoining,
                    String employmentType, String skills) {
        this.name = name;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
        this.phone = phone;
        this.address = address;
        this.email = email;
        this.employeeId = employeeId;
        this.jobTitle = jobTitle;
        this.department = department;
        this.dateOfJoining = dateOfJoining;
        this.employmentType = employmentType;
        this.skills = skills;
        this.profilePicture = null; // Explicitly set to null
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(String employeeId) {
        this.employeeId = employeeId;
    }

    public String getJobTitle() {
        return jobTitle;
    }

    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public LocalDate getDateOfJoining() {
        return dateOfJoining;
    }

    public void setDateOfJoining(LocalDate dateOfJoining) {
        this.dateOfJoining = dateOfJoining;
    }

    public String getEmploymentType() {
        return employmentType;
    }

    public void setEmploymentType(String employmentType) {
        this.employmentType = employmentType;
    }

    public String getSkills() {
        return skills;
    }

    public void setSkills(String skills) {
        this.skills = skills;
    }

    public byte[] getProfilePicture() {
        return profilePicture;
    }

    public void setProfilePicture(byte[] profilePicture) {
        this.profilePicture = profilePicture;
    }

    public void setProfilePictureBase64(String s) {

    }
}
