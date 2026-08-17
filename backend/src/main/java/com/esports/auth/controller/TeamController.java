package com.esports.auth.controller;

import com.esports.auth.config.OpenApiConfig;
import com.esports.auth.dto.common.ApiResponse;
import com.esports.auth.dto.team.CreateTeamRequest;
import com.esports.auth.dto.team.TeamResponse;
import com.esports.auth.dto.team.UpdateTeamRequest;
import com.esports.auth.service.TeamService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/teams")
@RequiredArgsConstructor
@Tag(name = "Teams", description = "Team CRUD operations")
@SecurityRequirement(name = OpenApiConfig.SECURITY_SCHEME_NAME)
public class TeamController {

    private final TeamService teamService;

    @PostMapping
    @Operation(summary = "Create a team")
    public ResponseEntity<ApiResponse<TeamResponse>> createTeam(
            @Valid @RequestBody CreateTeamRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(
                        "Team created successfully", teamService.createTeam(request)));
    }

    @GetMapping
    @Operation(summary = "Get all teams")
    public ResponseEntity<ApiResponse<List<TeamResponse>>> getAllTeams() {
        return ResponseEntity.ok(ApiResponse.success(
                "Teams retrieved successfully", teamService.getAllTeams()));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get a team by ID")
    public ResponseEntity<ApiResponse<TeamResponse>> getTeamById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(
                "Team retrieved successfully", teamService.getTeamById(id)));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update a team")
    public ResponseEntity<ApiResponse<TeamResponse>> updateTeam(
            @PathVariable Long id,
            @Valid @RequestBody UpdateTeamRequest request) {
        return ResponseEntity.ok(ApiResponse.success(
                "Team updated successfully", teamService.updateTeam(id, request)));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a team")
    public ResponseEntity<ApiResponse<Void>> deleteTeam(@PathVariable Long id) {
        teamService.deleteTeam(id);
        return ResponseEntity.ok(ApiResponse.success("Team deleted successfully"));
    }
}

