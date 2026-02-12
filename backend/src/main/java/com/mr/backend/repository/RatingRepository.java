package com.mr.backend.repository;

import com.mr.backend.domain.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RatingRepository extends JpaRepository<Rating, Long> {
    List<Rating> findByMovieId(Long movieId);
    List<Rating> findByUserId(Long userId);
    Optional<Rating> findByMovieIdAndUserId(Long movieId, Long userId);
    boolean existsByMovieIdAndUserId(Long movieId, Long userId);
}
