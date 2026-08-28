package com.esports.auth.config;

import com.esports.auth.security.JwtAuthFilter;

import lombok.RequiredArgsConstructor;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.http.HttpMethod;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;

import org.springframework.security.authentication.dao.DaoAuthenticationProvider;

import org.springframework.security.config.Customizer;

import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;

import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;

import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;

import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;

import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.core.userdetails.UserDetailsService;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.security.web.SecurityFilterChain;

import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * Spring Security configuration.
 *
 * Security design decisions:
 *
 * - STATELESS session:
 *   No server-side sessions.
 *   JWT carries authentication state.
 *
 * - CSRF disabled:
 *   Appropriate for a stateless REST API
 *   using JWT authentication.
 *
 * - CORS enabled:
 *   Allows the React/Vite frontend to communicate
 *   with Spring Boot.
 *
 * - Authentication endpoints are public.
 *
 * - JWT filter runs before Spring Security's
 *   UsernamePasswordAuthenticationFilter.
 *
 * - BCrypt is used for passwords.
 *
 * - @EnableMethodSecurity allows @PreAuthorize.
 */
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;

    private final UserDetailsService userDetailsService;

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http
    ) throws Exception {

        http

                /*
                 * Stateless JWT API does not use
                 * browser cookie-based CSRF protection.
                 */
                .csrf(
                        AbstractHttpConfigurer::disable
                )

                /*
                 * Use the centralized CorsConfigurationSource
                 * defined in CorsConfig.java.
                 */
                .cors(
                        Customizer.withDefaults()
                )

                /*
                 * Allow the H2 console to appear in an iframe.
                 *
                 * Required for:
                 *
                 * http://localhost:8080/h2-console
                 */
                .headers(
                        headers ->
                                headers.frameOptions(
                                        HeadersConfigurer
                                                .FrameOptionsConfig
                                                ::sameOrigin
                                )
                )

                /*
                 * API authorization rules.
                 */
                .authorizeHttpRequests(
                        auth -> auth

                                /*
                                 * Registration does not require
                                 * an existing JWT.
                                 */
                                .requestMatchers(
                                        HttpMethod.POST,
                                        "/api/auth/register"
                                )
                                .permitAll()

                                /*
                                 * Login does not require
                                 * an existing JWT.
                                 */
                                .requestMatchers(
                                        HttpMethod.POST,
                                        "/api/auth/login"
                                )
                                .permitAll()

                                /*
                                 * Existing public league GET routes.
                                 */
                                .requestMatchers(
                                        HttpMethod.GET,
                                        "/api/leagues/**"
                                )
                                .permitAll()

                                /*
                                 * Existing public tournament GET routes.
                                 */
                                .requestMatchers(
                                        HttpMethod.GET,
                                        "/api/tournaments/**"
                                )
                                .permitAll()

                                /*
                                 * H2 console for development testing.
                                 *
                                 * Production configuration should
                                 * normally disable this.
                                 */
                                .requestMatchers(
                                        "/h2-console/**"
                                )
                                .permitAll()

                                /*
                                 * Admin-only backend routes.
                                 */
                                .requestMatchers(
                                        "/api/admin/**"
                                )
                                .hasRole("ADMIN")

                                /*
                                 * Everything else requires
                                 * authentication.
                                 */
                                .anyRequest()
                                .authenticated()
                )

                /*
                 * JWT authentication is stateless.
                 */
                .sessionManagement(
                        session ->
                                session.sessionCreationPolicy(
                                        SessionCreationPolicy.STATELESS
                                )
                )

                /*
                 * Use the configured username/password
                 * AuthenticationProvider for login.
                 */
                .authenticationProvider(
                        authenticationProvider()
                )

                /*
                 * Read and authenticate JWT Bearer tokens
                 * before Spring's username/password filter.
                 */
                .addFilterBefore(
                        jwtAuthFilter,
                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }

    /**
     * Password hashing configuration.
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * Connects Spring Authentication to:
     *
     * - UserDetailsService
     * - BCryptPasswordEncoder
     */
    @Bean
    public AuthenticationProvider authenticationProvider() {

        DaoAuthenticationProvider provider =
                new DaoAuthenticationProvider();

        provider.setUserDetailsService(
                userDetailsService
        );

        provider.setPasswordEncoder(
                passwordEncoder()
        );

        return provider;
    }

    /**
     * AuthenticationManager is used by AuthService
     * when validating login credentials.
     */
    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration configuration
    ) throws Exception {

        return configuration
                .getAuthenticationManager();
    }
}