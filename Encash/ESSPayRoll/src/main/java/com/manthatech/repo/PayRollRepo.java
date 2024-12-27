package com.manthatech.repo;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.manthatech.entity.PayRollEntity;

@Repository
public interface PayRollRepo extends JpaRepository <PayRollEntity, Long> {

	List<PayRollEntity> findByEmployee_EmployeeId(Long employeeId);
	
	
}
