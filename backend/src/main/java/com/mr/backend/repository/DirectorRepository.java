package com.mr.backend.repository;

import com.mr.backend.domain.Director;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DirectorRepository extends JpaRepository<Director, Long> {
    
    @Query("SELECT d FROM Director d LEFT JOIN FETCH d.movies WHERE d.id = :id")
    Optional<Director> findByIdWithMovies(@Param("id") Long id);
}
