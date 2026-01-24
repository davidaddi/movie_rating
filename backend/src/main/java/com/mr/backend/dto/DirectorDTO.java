package com.mr.backend.dto;

import com.mr.backend.domain.Director;

import java.util.Date;

public class DirectorDTO {
    private Long id;
    private String firstname;
    private String lastname;
    private Date birthdate;

    public DirectorDTO(Director director) {
        this.id = director.getId();
        this.firstname = director.getFirstname();
        this.lastname = director.getLastname();
        this.birthdate = director.getBirthdate();
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public Date getBirthdate() {
        return birthdate;
    }

    public void setBirthdate(Date birthdate) {
        this.birthdate = birthdate;
    }
}
