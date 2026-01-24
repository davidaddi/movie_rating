package com.mr.backend.dto;

import com.mr.backend.domain.Actor;
import com.mr.backend.domain.ActorParticipation;
import com.mr.backend.domain.Movie;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

public class ActorWithMoviesDTO {
    private Long id;
    private String firstname;
    private String lastname;
    private Date birthdate;
    private List<MovieInfo> movies;

    public ActorWithMoviesDTO(Actor actor) {
        this.id = actor.getId();
        this.firstname = actor.getFirstname();
        this.lastname = actor.getLastname();
        this.birthdate = actor.getBirthdate();
        
        if (actor.getParticipations() != null) {
            this.movies = actor.getParticipations().stream()
                .map(participation -> new MovieInfo(participation.getMovie(), participation.getNameInMovie()))
                .collect(Collectors.toList());
        }
    }

    public static class MovieInfo {
        private Long id;
        private String name;
        private String imageUrl;
        private String roleInMovie;

        public MovieInfo(Movie movie, String roleInMovie) {
            this.id = movie.getId();
            this.name = movie.getName();
            this.imageUrl = movie.getImageUrl();
            this.roleInMovie = roleInMovie;
        }

        // Getters and Setters
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

        public String getImageUrl() {
            return imageUrl;
        }

        public void setImageUrl(String imageUrl) {
            this.imageUrl = imageUrl;
        }

        public String getRoleInMovie() {
            return roleInMovie;
        }

        public void setRoleInMovie(String roleInMovie) {
            this.roleInMovie = roleInMovie;
        }
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

    public List<MovieInfo> getMovies() {
        return movies;
    }

    public void setMovies(List<MovieInfo> movies) {
        this.movies = movies;
    }
}
