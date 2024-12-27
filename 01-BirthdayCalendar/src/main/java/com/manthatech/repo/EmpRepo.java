package com.manthatech.repo;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.manthatech.entity.EmpBirthday;

@Repository
public interface EmpRepo extends JpaRepository<EmpBirthday, Long>{

	 //List<EmpBirthday> findByBirthDateMonth(int month);
	 
	List<EmpBirthday> findByEmployeeId(Long employeeId);

	 @Query("SELECT e FROM EmpBirthday e WHERE EXTRACT(MONTH FROM e.birthDate) = :month")
	    List<EmpBirthday> findEmployeesByBirthMonth(@Param("month") int month);
	 
	@Query("SELECT e FROM EmpBirthday e WHERE EXTRACT(MONTH FROM e.birthDate) = :month")
	    List<EmpBirthday> findByBirthMonth(@Param("month") int month);
	
	@Query("SELECT e FROM EmpBirthday e WHERE " +
		       "EXTRACT(MONTH FROM e.birthDate) = EXTRACT(MONTH FROM CAST(:currentDate AS date)) AND " +
		       "EXTRACT(DAY FROM e.birthDate) BETWEEN EXTRACT(DAY FROM CAST(:currentDate AS date)) AND EXTRACT(DAY FROM CAST(:endDate AS date))")
		List<EmpBirthday> findUpcomingBirthdays(@Param("currentDate") LocalDate currentDate, @Param("endDate") LocalDate endDate);

	@Query("SELECT e FROM EmpBirthday e WHERE " +
			"LOWER(CONCAT(e.firstName, ' ', e.lastName)) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
	        "LOWER(e.department) LIKE LOWER(CONCAT('%', :keyword, '%'))")
	    List<EmpBirthday> searchByKeyword(@Param("keyword") String keyword);
}
