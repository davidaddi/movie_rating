package com.mr.backend.api;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
        info = @Info(
                title = "Movie Rating API",
                version = "1.0",
                description = "Movie Rating API. Containing the data related to the movie."
        )
)
public class OpenApiConfig {
}

