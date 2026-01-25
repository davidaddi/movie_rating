package com.mr.backend.dto;

import com.mr.backend.domain.ActorParticipation;
import com.mr.backend.domain.Movie;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

public class MovieWithDetailsDTO {
    
    private Long id;
    private String name;
    private String description;
    private Date releaseDate;
    private String imageUrl;
    private DirectorInfo director;
    private List<ActorInfo> actors;

    public MovieWithDetailsDTO(Movie movie) {
        this.id = movie.getId();
        this.name = movie.getName();
        this.description = movie.getDescription();
        this.releaseDate = movie.getReleaseDate();
        this.imageUrl = movie.getImageUrl();
        
        if (movie.getDirector() != null) {
            this.director = new DirectorInfo(
                movie.getDirector().getId(),
                movie.getDirector().getFirstname(),
                movie.getDirector().getLastname()
            );
        }
        
        if (movie.getActorParticipations() != null) {
            this.actors = movie.getActorParticipations().stream()
                .map(ap -> new ActorInfo(
                    ap.getActor().getId(),
                    ap.getActor().getFirstname(),
                    ap.getActor().getLastname(),
                    ap.getNameInMovie()
                ))
                .collect(Collectors.toList());
        } else {
            this.actors = new ArrayList<>();
        }
    }

    public static class DirectorInfo {
        private Long id;
        private String firstname;
        private String lastname;

        public DirectorInfo(Long id, String firstname, String lastname) {
            this.id = id;
            this.firstname = firstname;
            this.lastname = lastname;
        }

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
    }

    public static class ActorInfo {
        private Long id;
        private String firstname;
        private String lastname;
        private String roleInMovie;

        public ActorInfo(Long id, String firstname, String lastname, String roleInMovie) {
            this.id = id;
            this.firstname = firstname;
            this.lastname = lastname;
            this.roleInMovie = roleInMovie;
        }

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

        public String getRoleInMovie() {
            return roleInMovie;
        }

        public void setRoleInMovie(String roleInMovie) {
            this.roleInMovie = roleInMovie;
        }
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(Date releaseDate) {
        this.releaseDate = releaseDate;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public DirectorInfo getDirector() {
        return director;
    }

    public void setDirector(DirectorInfo director) {
        this.director = director;
    }

    public List<ActorInfo> getActors() {
        return actors;
    }

    public void setActors(List<ActorInfo> actors) {
        this.actors = actors;
    }
}
