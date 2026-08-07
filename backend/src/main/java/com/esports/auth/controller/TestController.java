package com.esports.auth.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/**
 * Test controller to verify JWT authentication and role-based authorization.
 *
 * Endpoints:
 *   GET /api/test/user  — requires authenticated USER or ADMIN
 *   GET /api/test/admin — requires ADMIN role only
 *
 * These endpoints exist purely for manual and automated testing of auth/RBAC.
 * They can be removed or replaced with real feature endpoints later.
 */
@RestController
@RequestMapping("/api/test")
public class TestController {

    /**
     * Accessible by any authenticated user (USER or ADMIN).
     * Returns 401 if no valid JWT is supplied.
     */
    @GetMapping("/user")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<Map<String, String>> userEndpoint(Authentication authentication) {
        return ResponseEntity.ok(Map.of(
                "message", "Authenticated access successful",
                "user", authentication.getName()
        ));
    }

    /**
     * Accessible by ADMIN role only.
     * Returns 401 if no valid JWT, 403 if authenticated but not ADMIN.
     */
    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, String>> adminEndpoint(Authentication authentication) {
        return ResponseEntity.ok(Map.of(
                "message", "Admin access granted",
                "user", authentication.getName()
        ));
    }
}
