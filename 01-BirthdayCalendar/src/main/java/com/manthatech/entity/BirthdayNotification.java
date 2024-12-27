package com.manthatech.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class BirthdayNotification {

	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long notificationId;

	    @ManyToOne
	    @JoinColumn(name = "employee_id", nullable = false)
	    private EmpBirthday employee;

	    @Column(nullable = false)
	    private LocalDate notificationDate;

	    @Column(nullable = false)
	    private Boolean isSent = false;

		public Long getNotificationId() {
			return notificationId;
		}

		public void setNotificationId(Long notificationId) {
			this.notificationId = notificationId;
		}

		public EmpBirthday getEmployee() {
			return employee;
		}

		public void setEmployee(EmpBirthday employee) {
			this.employee = employee;
		}

		public LocalDate getNotificationDate() {
			return notificationDate;
		}

		public void setNotificationDate(LocalDate notificationDate) {
			this.notificationDate = notificationDate;
		}

		public Boolean getIsSent() {
			return isSent;
		}

		public void setIsSent(Boolean isSent) {
			this.isSent = isSent;
		}
	    
	    
}
