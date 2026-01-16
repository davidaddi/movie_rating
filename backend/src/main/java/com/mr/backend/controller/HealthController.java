package com.mr.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import jakarta.persistence.EntityManager;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v2/health")
public class HealthController {

    @Autowired(required = false)
    private EntityManager entityManager;

    @GetMapping
    public ResponseEntity<Map<String, Object>> health() {
        Map<String, Object> healthResponse = new HashMap<>();
        healthResponse.put("status", "UP");
        healthResponse.put("api", "OK");

        // Vérifier la connexion à la base de données
        boolean dbHealthy = checkDatabase();
        healthResponse.put("database", dbHealthy ? "OK" : "DOWN");

        HttpStatus status = dbHealthy ? HttpStatus.OK : HttpStatus.SERVICE_UNAVAILABLE;

        return new ResponseEntity<>(healthResponse, status);
    }

    private boolean checkDatabase() {
        try {
            if (entityManager != null) {
                entityManager.createNativeQuery("SELECT 1").getSingleResult();
                return true;
            }
            return false;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}
