package com.manthatech.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.manthatech.entity.BirthdayGreeting;

@Repository
public interface BirthdayGreetingRepo extends JpaRepository<BirthdayGreeting, Long>{

}
