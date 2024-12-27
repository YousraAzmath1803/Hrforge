package com.manthatech.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class BirthdayCalendarSettings {

	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    @Column(nullable = false)
	    private Integer notifyDaysInAdvance;

	    @Column(nullable = false)
	    private String notificationMethod = "Email"; // e.g., Email, In-app

	    private String visibilityRole = "ALL"; // e.g., Managers, All employees

	    @Column(nullable = false)
	    private Boolean isNotificationEnabled = true;

		
		public Long getId() {
			return id;
		}

		public void setId(Long id) {
			this.id = id;
		}

		public Integer getNotifyDaysInAdvance() {
			return notifyDaysInAdvance;
		}

		public void setNotifyDaysInAdvance(Integer notifyDaysInAdvance) {
			this.notifyDaysInAdvance = notifyDaysInAdvance;
		}

		public String getNotificationMethod() {
			return notificationMethod;
		}

		public void setNotificationMethod(String notificationMethod) {
			this.notificationMethod = notificationMethod;
		}

		public String getVisibilityRole() {
			return visibilityRole;
		}

		public void setVisibilityRole(String visibilityRole) {
			this.visibilityRole = visibilityRole;
		}

		public Boolean getIsNotificationEnabled() {
			return isNotificationEnabled;
		}

		public void setIsNotificationEnabled(Boolean isNotificationEnabled) {
			this.isNotificationEnabled = isNotificationEnabled;
		}
	    
	    
}
