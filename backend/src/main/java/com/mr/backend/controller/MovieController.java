package com.mr.backend.controller;

import com.mr.backend.domain.Movie;
import com.mr.backend.dto.MovieWithDetailsDTO;
import com.mr.backend.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/movies")
public class MovieController {

    @Autowired
    private MovieService movieService;

    @GetMapping
    public List<Movie> getAllMovies() {
        return movieService.getAllMovies();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<MovieWithDetailsDTO> getMovieWithDetails(@PathVariable Long id) {
        return movieService.getMovieWithDetails(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/search")
    public List<Movie> searchMovies(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String description,
            @RequestParam(required = false) String actor,
            @RequestParam(required = false) Integer year,
            @RequestParam(required = false) Double minRating) {
        return movieService.searchMovies(name, description, actor, year, minRating);
    }
}
