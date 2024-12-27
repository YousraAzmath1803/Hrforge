package in.manthatech.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import in.manthatech.entity.Employee;
import in.manthatech.repo.EmployeeRepo;

@Service
public class EmployeeService {

	 @Autowired
	    private EmployeeRepo employeeRepository;

	    public List<Employee> searchEmployees(String searchTerm) {
	        return employeeRepository.searchEmployees(searchTerm);
	    }
	    
	    public List<Employee> getAllEmployees() {
	        return employeeRepository.findAll();
	    }
}
