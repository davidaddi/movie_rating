package com.mr.backend.service;

import com.mr.backend.domain.Movie;
import com.mr.backend.dto.MovieWithDetailsDTO;
import com.mr.backend.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MovieService {

    @Autowired
    private MovieRepository movieRepository;

    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }
    
    @Transactional(readOnly = true)
    public Optional<MovieWithDetailsDTO> getMovieWithDetails(Long id) {
        Optional<Movie> movie = movieRepository.findByIdWithDetails(id);
        return movie.map(MovieWithDetailsDTO::new);
    }

    @Transactional(readOnly = true)
    public List<Movie> searchMovies(String name, String description, String actor, Integer year, Double minRating) {
        // Convert empty strings to null for proper query handling
        String nameParam = (name != null && name.trim().isEmpty()) ? null : name;
        String descParam = (description != null && description.trim().isEmpty()) ? null : description;
        String actorParam = (actor != null && actor.trim().isEmpty()) ? null : actor;
        
        List<Movie> movies = movieRepository.searchMovies(nameParam, descParam, actorParam, year);
        
        // Filter by minimum rating if specified
        if (minRating != null) {
            movies = movies.stream()
                    .filter(movie -> {
                        if (movie.getRatings() == null || movie.getRatings().isEmpty()) {
                            return false;
                        }
                        double avgRating = movie.getRatings().stream()
                                .mapToDouble(rating -> rating.getRating())
                                .average()
                                .orElse(0.0);
                        return avgRating >= minRating;
                    })
                    .collect(Collectors.toList());
        }
        
        return movies;
    }
}
