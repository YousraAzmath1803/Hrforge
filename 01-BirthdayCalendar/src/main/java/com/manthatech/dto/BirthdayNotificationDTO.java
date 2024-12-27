package com.manthatech.dto;

import java.time.LocalDate;

public class BirthdayNotificationDTO {

	 private byte[] photo;
	    private String name; // Combined first and last name
	    private LocalDate birthDate;
		public byte[] getPhoto() {
			return photo;
		}
		public void setPhoto(byte[] photo) {
			this.photo = photo;
		}
		public String getName() {
			return name;
		}
		public void setName(String name) {
			this.name = name;
		}
		public LocalDate getBirthDate() {
			return birthDate;
		}
		public void setBirthDate(LocalDate birthDate) {
			this.birthDate = birthDate;
		}
	    
	    
}
