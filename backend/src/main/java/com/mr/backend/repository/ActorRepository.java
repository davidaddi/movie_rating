package com.mr.backend.repository;

import com.mr.backend.domain.Actor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ActorRepository extends JpaRepository<Actor, Long> {
    
    @Query("SELECT DISTINCT a FROM Actor a " +
           "LEFT JOIN FETCH a.participations p " +
           "LEFT JOIN FETCH p.movie m " +
           "LEFT JOIN FETCH m.ratings " +
           "WHERE a.id = :id")
    Optional<Actor> findByIdWithMovies(@Param("id") Long id);
}
