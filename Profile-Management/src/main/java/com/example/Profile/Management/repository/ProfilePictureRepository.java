package com.example.Profile.Management.repository;

import com.example.Profile.Management.model.ProfilePicture;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ProfilePictureRepository extends JpaRepository<ProfilePicture, Long> {

    // Custom query to find a profile picture by the associated employee ID
    @Query("SELECT pp FROM ProfilePicture pp WHERE pp.employee.id = :employeeId")
    Optional<ProfilePicture> findByEmployeeId(@Param("employeeId") Long employeeId);
}
