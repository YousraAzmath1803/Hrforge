package com.example.Profile.Management.model;

import jakarta.persistence.*;

@Entity
public class ProfilePicture {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    private byte[] pictureData;

    @OneToOne
    @JoinColumn(name = "employee_id", referencedColumnName = "id", nullable = false)
    private Employee employee;

    // Constructors
    public ProfilePicture() {}

    public ProfilePicture(byte[] pictureData, Employee employee) {
        this.pictureData = pictureData;
        this.employee = employee;
    }

    // Constructor to create a ProfilePicture from an employeeId
    public ProfilePicture(Long employeeId, byte[] imageData) {
        this.pictureData = imageData;
        this.employee = new Employee(); // Create a new Employee instance
        this.employee.setId(employeeId); // Set the ID for the employee
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public byte[] getPictureData() {
        return pictureData;
    }

    public void setPictureData(byte[] pictureData) {
        this.pictureData = pictureData;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }
}
