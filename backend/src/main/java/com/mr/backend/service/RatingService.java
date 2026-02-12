package com.mr.backend.service;

import com.mr.backend.domain.Movie;
import com.mr.backend.domain.Rating;
import com.mr.backend.domain.User;
import com.mr.backend.dto.RatingRequestDTO;
import com.mr.backend.dto.RatingResponseDTO;
import com.mr.backend.repository.MovieRepository;
import com.mr.backend.repository.RatingRepository;
import com.mr.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class RatingService {

    @Autowired
    private RatingRepository ratingRepository;

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public Optional<RatingResponseDTO> addRating(Long movieId, RatingRequestDTO request) {
        Optional<Movie> movieOpt = movieRepository.findById(movieId);
        Optional<User> userOpt = userRepository.findByUsername(request.getUsername());

        if (movieOpt.isEmpty() || userOpt.isEmpty()) {
            return Optional.empty();
        }

        Movie movie = movieOpt.get();
        User user = userOpt.get();

        // Check if user already has a rating for this movie - reject if exists
        if (ratingRepository.existsByMovieIdAndUserId(movieId, user.getId())) {
            return Optional.empty();
        }

        // Create new rating
        Rating rating = new Rating();
        rating.setRating(request.getRating());
        rating.setComment(request.getComment());
        rating.setMovie(movie);
        rating.setUser(user);

        Rating savedRating = ratingRepository.save(rating);
        return Optional.of(new RatingResponseDTO(savedRating));
    }

    public boolean hasUserRated(Long movieId, String username) {
        Optional<User> userOpt = userRepository.findByUsername(username);
        if (userOpt.isEmpty()) {
            return false;
        }
        return ratingRepository.existsByMovieIdAndUserId(movieId, userOpt.get().getId());
    }
}
