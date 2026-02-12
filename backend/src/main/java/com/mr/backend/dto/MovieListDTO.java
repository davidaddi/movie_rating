package com.mr.backend.dto;

import com.mr.backend.domain.Movie;
import com.mr.backend.domain.Rating;

import java.util.Date;

public class MovieListDTO {
    private Long id;
    private String name;
    private String description;
    private Date releaseDate;
    private String imageUrl;
    private Double avgRating;

    public MovieListDTO(Movie movie) {
        this.id = movie.getId();
        this.name = movie.getName();
        this.description = movie.getDescription();
        this.releaseDate = movie.getReleaseDate();
        this.imageUrl = movie.getImageUrl();
        
        if (movie.getRatings() != null && !movie.getRatings().isEmpty()) {
            this.avgRating = movie.getRatings().stream()
                .mapToDouble(Rating::getRating)
                .average()
                .orElse(0.0);
        } else {
            this.avgRating = 0.0;
        }
    }

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

    public Double getAvgRating() {
        return avgRating;
    }

    public void setAvgRating(Double avgRating) {
        this.avgRating = avgRating;
    }
}
