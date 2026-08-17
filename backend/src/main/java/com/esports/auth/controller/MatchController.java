package com.esports.auth.controller;

import com.esports.auth.config.OpenApiConfig;
import com.esports.auth.dto.common.ApiResponse;
import com.esports.auth.dto.match.CreateMatchRequest;
import com.esports.auth.dto.match.MatchResponse;
import com.esports.auth.dto.match.UpdateMatchRequest;
import com.esports.auth.service.MatchService;
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
@RequestMapping("/api/matches")
@RequiredArgsConstructor
@Tag(name = "Matches", description = "Match scheduling, scoring, and CRUD operations")
@SecurityRequirement(name = OpenApiConfig.SECURITY_SCHEME_NAME)
public class MatchController {

    private final MatchService matchService;

    @PostMapping
    @Operation(summary = "Create a match")
    public ResponseEntity<ApiResponse<MatchResponse>> createMatch(
            @Valid @RequestBody CreateMatchRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(
                        "Match created successfully", matchService.createMatch(request)));
    }

    @GetMapping
    @Operation(summary = "Get all matches")
    public ResponseEntity<ApiResponse<List<MatchResponse>>> getAllMatches() {
        return ResponseEntity.ok(ApiResponse.success(
                "Matches retrieved successfully", matchService.getAllMatches()));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get a match by ID")
    public ResponseEntity<ApiResponse<MatchResponse>> getMatchById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(
                "Match retrieved successfully", matchService.getMatchById(id)));
    }

    @GetMapping("/team/{teamId}")
    @Operation(summary = "Get all matches for a team")
    public ResponseEntity<ApiResponse<List<MatchResponse>>> getMatchesByTeamId(
            @PathVariable Long teamId) {
        return ResponseEntity.ok(ApiResponse.success(
                "Team matches retrieved successfully",
                matchService.getMatchesByTeamId(teamId)));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update a match")
    public ResponseEntity<ApiResponse<MatchResponse>> updateMatch(
            @PathVariable Long id,
            @Valid @RequestBody UpdateMatchRequest request) {
        return ResponseEntity.ok(ApiResponse.success(
                "Match updated successfully", matchService.updateMatch(id, request)));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a match")
    public ResponseEntity<ApiResponse<Void>> deleteMatch(@PathVariable Long id) {
        matchService.deleteMatch(id);
        return ResponseEntity.ok(ApiResponse.success("Match deleted successfully"));
    }
}

