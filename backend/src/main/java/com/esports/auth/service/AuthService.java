package com.esports.auth.service;

import com.esports.auth.dto.AuthResponse;
import com.esports.auth.dto.LoginRequest;
import com.esports.auth.dto.RegisterRequest;
import com.esports.auth.entity.Role;
import com.esports.auth.entity.User;
import com.esports.auth.repository.UserRepository;
import com.esports.auth.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * Authentication service — handles registration and login business logic.
 *
 * Security invariants:
 * - Passwords are always hashed with BCrypt before persistence.
 * - Plaintext passwords are never stored, returned, or logged.
 * - All public registrations receive Role.USER — never Role.ADMIN.
 * - Duplicate email/username registrations are rejected with a meaningful error.
 * - Login delegates credential verification to Spring Security's AuthenticationManager
 *   which uses BCryptPasswordEncoder.matches() internally.
 */
@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;

    /**
     * Registers a new user account.
     *
     * @param request validated registration data
     * @return JWT auth response (no password or hash included)
     * @throws IllegalArgumentException if email or username already exists
     */
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email is already registered: " + request.getEmail());
        }
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new IllegalArgumentException("Username is already taken: " + request.getUsername());
        }

        // Hash the password — plaintext never reaches the database
        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)   // Always USER — never ADMIN for public registration
                .build();

        userRepository.save(user);

        UserDetails userDetails = userDetailsService.loadUserByUsername(user.getEmail());
        String token = jwtService.generateToken(userDetails);

        return AuthResponse.builder()
                .token(token)
                .tokenType("Bearer")
                .username(user.getUsername())
                .role(user.getRole().name())
                .build();
    }

    /**
     * Authenticates a user and returns a JWT on success.
     *
     * @param request login credentials
     * @return JWT auth response (no password or hash included)
     * @throws org.springframework.security.core.AuthenticationException on bad credentials
     */
    public AuthResponse login(LoginRequest request) {
        // Delegates to DaoAuthenticationProvider → BCryptPasswordEncoder.matches()
        // Throws BadCredentialsException (→ 401) if credentials are incorrect
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
        String token = jwtService.generateToken(userDetails);

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found after authentication"));

        return AuthResponse.builder()
                .token(token)
                .tokenType("Bearer")
                .username(user.getUsername())
                .role(user.getRole().name())
                .build();
    }
}
