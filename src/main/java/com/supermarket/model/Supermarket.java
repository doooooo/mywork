package com.supermarket.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Entity
public class Supermarket {
	
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
	
	@NotBlank(message = "Arabic Name is mandatory")
	private String arabicName;
	
	@NotBlank(message = "English Name is mandatory")
	private String englishName;
	
	@NotBlank(message = "Address is mandatory")
	private String address;
	
	private String image;
	
	@NotNull(message = "Active status is required")
	private Boolean active;
	
	public Boolean getActive() {
		return active;
	}
	public void setActive(Boolean active) {
		this.active = active;
	}
	public String getArabicName() {
		return arabicName;
	}
	public void setArabicName(String arabicName) {
		this.arabicName = arabicName;
	}
	public String getEnglishName() {
		return englishName;
	}
	public void setEnglishName(String englishName) {
		this.englishName = englishName;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	

}
