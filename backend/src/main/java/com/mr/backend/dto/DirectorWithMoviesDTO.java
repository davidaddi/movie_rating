package com.mr.backend.dto;

import com.mr.backend.domain.Director;
import com.mr.backend.domain.Movie;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

public class DirectorWithMoviesDTO {
    private Long id;
    private String firstname;
    private String lastname;
    private Date birthdate;
    private List<MovieInfo> movies;

    public DirectorWithMoviesDTO(Director director) {
        this.id = director.getId();
        this.firstname = director.getFirstname();
        this.lastname = director.getLastname();
        this.birthdate = director.getBirthdate();
        
        if (director.getMovies() != null && !director.getMovies().isEmpty()) {
            this.movies = director.getMovies().stream()
                .map(MovieInfo::new)
                .collect(Collectors.toList());
        } else {
            this.movies = new ArrayList<>();
        }
    }

    public static class MovieInfo {
        private Long id;
        private String name;
        private String imageUrl;
        private Date releaseDate;

        public MovieInfo(Movie movie) {
            this.id = movie.getId();
            this.name = movie.getName();
            this.imageUrl = movie.getImageUrl();
            this.releaseDate = movie.getReleaseDate();
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

        public Date getReleaseDate() {
            return releaseDate;
        }

        public void setReleaseDate(Date releaseDate) {
            this.releaseDate = releaseDate;
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
