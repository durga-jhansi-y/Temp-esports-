package com.esports.auth.config;

import com.esports.auth.dto.common.ApiResponse;
import com.esports.auth.security.JwtAuthFilter;

import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.http.HttpServletResponse;

import lombok.RequiredArgsConstructor;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.core.annotation.Order;

import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

import org.springframework.security.config.Customizer;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;

import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;

import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.web.SecurityFilterChain;

import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.io.IOException;

@Configuration
@RequiredArgsConstructor
public class TeamMatchSecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;

    private final ObjectMapper objectMapper;

    @Bean
    @Order(2)
    public SecurityFilterChain teamMatchSecurityFilterChain(
            HttpSecurity http
    ) throws Exception {

        http

                /*
                 * This security chain only applies
                 * to Team and Match API routes.
                 */
                .securityMatcher(
                        "/api/teams",
                        "/api/teams/**",
                        "/api/matches",
                        "/api/matches/**"
                )

                /*
                 * Stateless JWT API.
                 */
                .csrf(
                        AbstractHttpConfigurer::disable
                )

                /*
                 * Use centralized CORS configuration.
                 */
                .cors(
                        Customizer.withDefaults()
                )

                /*
                 * Authorization rules.
                 */
                .authorizeHttpRequests(
                        auth -> auth

                                /*
                                 * Team GET endpoints
                                 * remain public.
                                 */
                                .requestMatchers(
                                        HttpMethod.GET,
                                        "/api/teams",
                                        "/api/teams/**",
                                        "/api/matches",
                                        "/api/matches/**"
                                )
                                .permitAll()

                                /*
                                 * POST / PUT / DELETE and other
                                 * methods require authentication.
                                 */
                                .anyRequest()
                                .authenticated()
                )

                /*
                 * Do not create server-side sessions.
                 */
                .sessionManagement(
                        session ->
                                session.sessionCreationPolicy(
                                        SessionCreationPolicy.STATELESS
                                )
                )

                /*
                 * Return consistent JSON errors.
                 */
                .exceptionHandling(
                        exception ->
                                exception

                                        .authenticationEntryPoint(
                                                (
                                                        request,
                                                        response,
                                                        authException
                                                ) ->
                                                        writeError(
                                                                response,
                                                                HttpStatus.UNAUTHORIZED,
                                                                "Authentication is required"
                                                        )
                                        )

                                        .accessDeniedHandler(
                                                (
                                                        request,
                                                        response,
                                                        accessDeniedException
                                                ) ->
                                                        writeError(
                                                                response,
                                                                HttpStatus.FORBIDDEN,
                                                                "Access denied: insufficient permissions"
                                                        )
                                        )
                )

                /*
                 * Process JWT tokens before Spring's default
                 * username/password filter.
                 */
                .addFilterBefore(
                        jwtAuthFilter,
                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }

    /**
     * Writes the standard API error response.
     */
    private void writeError(
            HttpServletResponse response,
            HttpStatus status,
            String message
    ) throws IOException {

        response.setStatus(
                status.value()
        );

        response.setContentType(
                MediaType.APPLICATION_JSON_VALUE
        );

        objectMapper.writeValue(
                response.getOutputStream(),
                ApiResponse.error(
                        message,
                        null
                )
        );
    }
}