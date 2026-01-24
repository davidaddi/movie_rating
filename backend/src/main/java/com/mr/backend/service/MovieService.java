package com.mr.backend.service;

import com.mr.backend.domain.Movie;
import com.mr.backend.dto.MovieWithDetailsDTO;
import com.mr.backend.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

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
}
