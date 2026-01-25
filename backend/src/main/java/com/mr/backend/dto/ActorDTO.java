package com.mr.backend.dto;

import com.mr.backend.domain.Actor;

import java.util.Date;

public class ActorDTO {
    private Long id;
    private String firstname;
    private String lastname;
    private Date birthdate;

    public ActorDTO(Actor actor) {
        this.id = actor.getId();
        this.firstname = actor.getFirstname();
        this.lastname = actor.getLastname();
        this.birthdate = actor.getBirthdate();
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
