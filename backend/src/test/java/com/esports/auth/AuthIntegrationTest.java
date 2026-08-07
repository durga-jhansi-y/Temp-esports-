package com.esports.auth;

import com.esports.auth.dto.LoginRequest;
import com.esports.auth.dto.RegisterRequest;
import com.esports.auth.entity.Role;
import com.esports.auth.entity.User;
import com.esports.auth.repository.UserRepository;
import com.esports.auth.security.JwtService;
import com.esports.auth.service.AuthService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the complete authentication flow.
 *
 * Tests cover:
 *   - Registration creates a BCrypt-hashed user with Role.USER
 *   - Duplicate email/username registration → 409 Conflict
 *   - Duplicate username registration → 409 Conflict
 *   - Valid login returns a JWT
 *   - Invalid password login → 401 Unauthorized
 *   - Validation failures → 400 Bad Request
 *   - Protected endpoint without JWT → 401 Unauthorized
 *   - Protected endpoint with valid JWT → 200 OK
 *   - Invalid/tampered JWT → 401 Unauthorized
 *   - USER cannot access ADMIN endpoint → 403 Forbidden
 */
@SpringBootTest
@AutoConfigureMockMvc
class AuthIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthService authService;

    @Autowired
    private JwtService jwtService;

    @BeforeEach
    void setUp() {
        userRepository.deleteAll();
    }

    // ── Registration Tests ────────────────────────────────────────────────────

    @Test
    @DisplayName("Registration: valid request creates user with BCrypt hash and USER role")
    void register_validRequest_createsUser() throws Exception {
        RegisterRequest request = buildRegisterRequest(
                "keepa", "keepa@example.com", "SecurePassword123!");

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.token").isNotEmpty())
                .andExpect(jsonPath("$.tokenType").value("Bearer"))
                .andExpect(jsonPath("$.username").value("keepa"))
                .andExpect(jsonPath("$.role").value("USER"))
                // Security: password/hash must NEVER appear in the response
                .andExpect(jsonPath("$.password").doesNotExist())
                .andExpect(jsonPath("$.passwordHash").doesNotExist());

        // Verify DB state
        User saved = userRepository.findByEmail("keepa@example.com").orElseThrow();
        assertThat(saved.getRole()).isEqualTo(Role.USER);
        assertThat(saved.getPasswordHash()).isNotEqualTo("SecurePassword123!");
        assertThat(passwordEncoder.matches("SecurePassword123!", saved.getPasswordHash())).isTrue();
    }

    @Test
    @DisplayName("Registration: duplicate email → 409 Conflict")
    void register_duplicateEmail_returnsConflict() throws Exception {
        RegisterRequest first = buildRegisterRequest(
                "keepa1", "duplicate@example.com", "SecurePassword123!");
        authService.register(first);

        RegisterRequest second = buildRegisterRequest(
                "keepa2", "duplicate@example.com", "AnotherPassword456!");

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(second)))
                .andExpect(status().isConflict());
    }

    @Test
    @DisplayName("Registration: duplicate username → 409 Conflict")
    void register_duplicateUsername_returnsConflict() throws Exception {
        RegisterRequest first = buildRegisterRequest(
                "keepa", "keepa1@example.com", "SecurePassword123!");
        authService.register(first);

        RegisterRequest second = buildRegisterRequest(
                "keepa", "keepa2@example.com", "AnotherPassword456!");

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(second)))
                .andExpect(status().isConflict());
    }

    @Test
    @DisplayName("Registration: missing required fields → 400 Bad Request")
    void register_missingFields_returnsBadRequest() throws Exception {
        // No email, no password
        String payload = "{\"username\": \"keepa\"}";

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(payload))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.details").exists());
    }

    @Test
    @DisplayName("Registration: invalid email format → 400 Bad Request")
    void register_invalidEmail_returnsBadRequest() throws Exception {
        RegisterRequest request = buildRegisterRequest("keepa", "not-an-email", "SecurePass123!");

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());
    }

    // ── Login Tests ───────────────────────────────────────────────────────────

    @Test
    @DisplayName("Login: valid credentials return JWT")
    void login_validCredentials_returnsJwt() throws Exception {
        authService.register(buildRegisterRequest(
                "keepa", "keepa@example.com", "SecurePassword123!"));

        LoginRequest login = new LoginRequest();
        login.setEmail("keepa@example.com");
        login.setPassword("SecurePassword123!");

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(login)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").isNotEmpty())
                .andExpect(jsonPath("$.tokenType").value("Bearer"))
                .andExpect(jsonPath("$.password").doesNotExist())
                .andExpect(jsonPath("$.passwordHash").doesNotExist());
    }

    @Test
    @DisplayName("Login: wrong password → 401 Unauthorized")
    void login_wrongPassword_returnsUnauthorized() throws Exception {
        authService.register(buildRegisterRequest(
                "keepa", "keepa@example.com", "SecurePassword123!"));

        LoginRequest login = new LoginRequest();
        login.setEmail("keepa@example.com");
        login.setPassword("WrongPassword999!");

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(login)))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @DisplayName("Login: non-existent user → 401 Unauthorized")
    void login_nonExistentUser_returnsUnauthorized() throws Exception {
        LoginRequest login = new LoginRequest();
        login.setEmail("ghost@example.com");
        login.setPassword("AnyPassword123!");

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(login)))
                .andExpect(status().isUnauthorized());
    }

    // ── Protected Endpoint Tests ──────────────────────────────────────────────

    @Test
    @DisplayName("Protected endpoint: no JWT → 401 Unauthorized")
    void protectedEndpoint_noJwt_returnsUnauthorized() throws Exception {
        mockMvc.perform(get("/api/test/user"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @DisplayName("Protected endpoint: valid JWT → 200 OK")
    void protectedEndpoint_validJwt_returnsOk() throws Exception {
        String token = authService.register(buildRegisterRequest(
                "keepa", "keepa@example.com", "SecurePassword123!")).getToken();

        mockMvc.perform(get("/api/test/user")
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").exists());
    }

    @Test
    @DisplayName("Protected endpoint: tampered JWT → 401 Unauthorized")
    void protectedEndpoint_tamperedJwt_returnsUnauthorized() throws Exception {
        String token = authService.register(buildRegisterRequest(
                "keepa", "keepa@example.com", "SecurePassword123!")).getToken();

        // Tamper by appending garbage to the token
        String tamperedToken = token + "tampered";

        mockMvc.perform(get("/api/test/user")
                        .header("Authorization", "Bearer " + tamperedToken))
                .andExpect(status().isUnauthorized());
    }

    // ── Role Authorization Tests ──────────────────────────────────────────────

    @Test
    @DisplayName("RBAC: USER role cannot access ADMIN endpoint → 403 Forbidden")
    void adminEndpoint_userRole_returnsForbidden() throws Exception {
        String token = authService.register(buildRegisterRequest(
                "keepa", "keepa@example.com", "SecurePassword123!")).getToken();

        mockMvc.perform(get("/api/test/admin")
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isForbidden());
    }

    @Test
    @DisplayName("RBAC: ADMIN role can access ADMIN endpoint → 200 OK")
    void adminEndpoint_adminRole_returnsOk() throws Exception {
        // Create an admin user directly via repository (simulating seeded admin)
        User admin = User.builder()
                .username("admin")
                .email("admin@esports.com")
                .passwordHash(passwordEncoder.encode("AdminPass123!"))
                .role(Role.ADMIN)
                .build();
        userRepository.save(admin);

        LoginRequest login = new LoginRequest();
        login.setEmail("admin@esports.com");
        login.setPassword("AdminPass123!");

        String token = authService.login(login).getToken();

        mockMvc.perform(get("/api/test/admin")
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Admin access granted"));
    }

    // ── Helper ───────────────────────────────────────────────────────────────

    private RegisterRequest buildRegisterRequest(
            String username, String email, String password) {
        RegisterRequest request = new RegisterRequest();
        request.setUsername(username);
        request.setEmail(email);
        request.setPassword(password);
        return request;
    }
}
