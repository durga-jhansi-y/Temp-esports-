package com.esports.auth.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

/**
 * Development CORS configuration for the React/Vite frontend.
 *
 * React/Vite:
 *
 *     http://localhost:5173
 *
 * Spring Boot:
 *
 *     http://localhost:8080
 *
 * This configuration is appropriate for local H2 development
 * and frontend/backend connectivity testing.
 *
 * Production origins can be moved into environment-specific
 * configuration later.
 */
@Configuration
public class CorsConfig {

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration =
                new CorsConfiguration();

        /*
         * Allow the standard Vite development addresses.
         */
        configuration.setAllowedOrigins(
                List.of(
                        "http://localhost:5173"
                )
        );

        /*
         * HTTP methods the frontend may use.
         */
        configuration.setAllowedMethods(
                List.of(
                        "GET",
                        "POST",
                        "PUT",
                        "PATCH",
                        "DELETE",
                        "OPTIONS"
                )
        );

        /*
         * Headers required by REST requests and JWT.
         */
        configuration.setAllowedHeaders(
                List.of(
                        "Authorization",
                        "Content-Type"
                )
        );

        /*
         * Authentication uses Authorization: Bearer <JWT>
         * rather than browser cookies.
         */
        configuration.setAllowCredentials(
                false
        );

        /*
         * Browser may cache the CORS preflight response
         * for one hour.
         */
        configuration.setMaxAge(
                3600L
        );

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        /*
         * Apply the CORS rules to all backend endpoints.
         */
        source.registerCorsConfiguration(
                "/**",
                configuration
        );

        return source;
    }
}