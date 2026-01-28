package com.mr.backend.repository;

import com.mr.backend.domain.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {
    
    @Query("SELECT m FROM Movie m " +
           "LEFT JOIN FETCH m.director " +
           "LEFT JOIN FETCH m.actorParticipations ap " +
           "LEFT JOIN FETCH ap.actor " +
           "WHERE m.id = :id")
    Optional<Movie> findByIdWithDetails(@Param("id") Long id);
}
