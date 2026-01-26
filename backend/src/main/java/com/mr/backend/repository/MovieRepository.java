package com.mr.backend.repository;

import com.mr.backend.domain.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {
    
    @Query("SELECT m FROM Movie m " +
           "LEFT JOIN FETCH m.director " +
           "LEFT JOIN FETCH m.actorParticipations ap " +
           "LEFT JOIN FETCH ap.actor " +
           "WHERE m.id = :id")
    Optional<Movie> findByIdWithDetails(@Param("id") Long id);

    @Query("SELECT DISTINCT m FROM Movie m " +
           "LEFT JOIN m.actorParticipations ap " +
           "LEFT JOIN ap.actor a " +
           "WHERE (:name IS NULL OR :name = '' OR LOWER(m.name) LIKE LOWER(CONCAT('%', :name, '%'))) " +
           "AND (:description IS NULL OR :description = '' OR LOWER(m.description) LIKE LOWER(CONCAT('%', :description, '%'))) " +
           "AND (:actor IS NULL OR :actor = '' OR " +
           "     LOWER(CAST(a.firstname AS string)) LIKE LOWER(CONCAT('%', :actor, '%')) OR " +
           "     LOWER(CAST(a.lastname AS string)) LIKE LOWER(CONCAT('%', :actor, '%'))) " +
           "AND (:year IS NULL OR EXTRACT(YEAR FROM m.releaseDate) = :year)")
    List<Movie> searchMovies(@Param("name") String name,
                            @Param("description") String description,
                            @Param("actor") String actor,
                            @Param("year") Integer year);
}
