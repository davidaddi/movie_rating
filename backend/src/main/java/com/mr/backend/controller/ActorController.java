package com.mr.backend.controller;

import com.mr.backend.domain.Actor;
import com.mr.backend.dto.ActorDTO;
import com.mr.backend.dto.ActorWithMoviesDTO;
import com.mr.backend.service.ActorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/actors")
public class ActorController {

    @Autowired
    private ActorService actorService;

    @GetMapping
    public List<ActorDTO> getAllActors() {
        return actorService.getAllActors().stream()
                .map(ActorDTO::new)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}/movies")
    public ResponseEntity<ActorWithMoviesDTO> getActorWithMovies(@PathVariable Long id) {
        return actorService.getActorById(id)
                .map(actor -> ResponseEntity.ok(new ActorWithMoviesDTO(actor)))
                .orElse(ResponseEntity.notFound().build());
    }
}
