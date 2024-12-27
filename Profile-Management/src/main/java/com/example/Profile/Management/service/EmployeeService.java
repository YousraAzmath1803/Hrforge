package com.example.Profile.Management.service;

import com.example.Profile.Management.model.Employee;
import com.example.Profile.Management.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    // Retrieve all employees from the repository
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    // Retrieve an employee by their ID
    public Optional<Employee> getEmployeeById(Long id) {
        return employeeRepository.findById(id);
    }

    // Retrieve an employee by their employee ID
    public Optional<Employee> getEmployeeByEmployeeId(String employeeId) {
        return employeeRepository.findByEmployeeId(employeeId);
    }

    // Retrieve an employee by their email
    public Optional<Employee> getEmployeeByEmail(String email) {
        return employeeRepository.findByEmail(email);
    }

    // Save or update an employee in the repository
    public Employee saveEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    // Partial update of specific fields of an employee
    public Optional<Employee> updateProfileFields(Long id, Employee updatedFields) {
        return employeeRepository.findById(id)
                .map(existingEmployee -> {
                    // Update only the provided fields
                    if (updatedFields.getName() != null) existingEmployee.setName(updatedFields.getName());
                    if (updatedFields.getDateOfBirth() != null) existingEmployee.setDateOfBirth(updatedFields.getDateOfBirth());
                    if (updatedFields.getGender() != null) existingEmployee.setGender(updatedFields.getGender());
                    if (updatedFields.getPhone() != null) existingEmployee.setPhone(updatedFields.getPhone());
                    if (updatedFields.getAddress() != null) existingEmployee.setAddress(updatedFields.getAddress());
                    if (updatedFields.getEmail() != null) existingEmployee.setEmail(updatedFields.getEmail());
                    if (updatedFields.getEmployeeId() != null) existingEmployee.setEmployeeId(updatedFields.getEmployeeId());
                    if (updatedFields.getJobTitle() != null) existingEmployee.setJobTitle(updatedFields.getJobTitle());
                    if (updatedFields.getDepartment() != null) existingEmployee.setDepartment(updatedFields.getDepartment());
                    if (updatedFields.getDateOfJoining() != null) existingEmployee.setDateOfJoining(updatedFields.getDateOfJoining());
                    if (updatedFields.getEmploymentType() != null) existingEmployee.setEmploymentType(updatedFields.getEmploymentType());
                    if (updatedFields.getSkills() != null) existingEmployee.setSkills(updatedFields.getSkills());

                    // Save the updated employee
                    Employee updatedEmployee = employeeRepository.save(existingEmployee);
                    // Return the updated employee
                    return Optional.of(updatedEmployee);
                }).orElse(Optional.empty());
    }

    // Update the profile picture of an employee
    public Optional<Employee> updateProfilePicture(Long id, byte[] pictureBytes) {
        return employeeRepository.findById(id)
                .map(employee -> {
                    employee.setProfilePicture(pictureBytes); // Update the profile picture
                    return Optional.of(employeeRepository.save(employee)); // Save and return the updated employee
                }).orElse(Optional.empty()); // Return empty if employee not found
    }

    // Delete an employee by their ID
    public void deleteEmployee(Long id) {
        if (!employeeRepository.existsById(id)) {
            throw new IllegalArgumentException("Employee with ID " + id + " does not exist.");
        }
        employeeRepository.deleteById(id);
    }
}
