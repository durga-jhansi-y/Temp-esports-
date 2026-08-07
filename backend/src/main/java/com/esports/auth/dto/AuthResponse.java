package com.esports.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

/**
 * DTO for successful authentication responses.
 *
 * Security: never includes password, passwordHash, or JWT secret.
 */
@Getter
@Builder
@AllArgsConstructor
public class AuthResponse {

    /** JWT Bearer token for authenticated API calls. */
    private String token;

    /** Token type — always "Bearer". */
    private String tokenType;

    /** The authenticated user's username. */
    private String username;

    /** The authenticated user's role (e.g. USER, ADMIN). */
    private String role;
}
