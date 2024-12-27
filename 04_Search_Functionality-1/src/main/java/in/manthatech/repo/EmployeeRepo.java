package in.manthatech.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import in.manthatech.entity.Employee;

@Repository
public interface EmployeeRepo extends JpaRepository<Employee, Long>{

	 @Query("SELECT e FROM Employee e WHERE "
	            + "LOWER(e.name) LIKE LOWER(CONCAT('%', :searchTerm, '%')) "
	            + "OR LOWER(e.email) LIKE LOWER(CONCAT('%', :searchTerm, '%')) "
	            + "OR LOWER(e.department) LIKE LOWER(CONCAT('%', :searchTerm, '%')) "
	            + "OR LOWER(e.jobTitle) LIKE LOWER(CONCAT('%', :searchTerm, '%')) "
	            + "OR LOWER(e.gender) LIKE LOWER(CONCAT('%', :searchTerm, '%')) "
	            + "OR CAST(e.phone AS string) LIKE CONCAT('%', :searchTerm, '%') "
	            + "OR LOWER(e.address) LIKE LOWER(CONCAT('%', :searchTerm, '%')) "
	            + "OR TO_CHAR(e.dateOfJoining, 'yyyy-MM-dd') LIKE :searchTerm "
	            + "OR LOWER(e.employeeId) LIKE LOWER(CONCAT('%', :searchTerm, '%')) "
	            + "OR LOWER(e.skills) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
	    List<Employee> searchEmployees(@Param("searchTerm") String searchTerm);
	 
	 List<Employee> findAll(); 
}
