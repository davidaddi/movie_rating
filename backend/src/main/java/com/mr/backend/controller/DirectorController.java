package com.mr.backend.controller;

import com.mr.backend.domain.Director;
import com.mr.backend.dto.DirectorDTO;
import com.mr.backend.dto.DirectorWithMoviesDTO;
import com.mr.backend.service.DirectorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/directors")
public class DirectorController {

    @Autowired
    private DirectorService directorService;

    @GetMapping
    public List<DirectorDTO> getAllDirectors() {
        return directorService.getAllDirectors().stream()
                .map(DirectorDTO::new)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}/movies")
    public ResponseEntity<DirectorWithMoviesDTO> getDirectorWithMovies(@PathVariable Long id) {
        return directorService.getDirectorById(id)
                .map(director -> ResponseEntity.ok(new DirectorWithMoviesDTO(director)))
                .orElse(ResponseEntity.notFound().build());
    }
}
