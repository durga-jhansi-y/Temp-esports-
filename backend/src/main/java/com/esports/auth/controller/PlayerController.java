
package com.esports.auth.controller;

import com.esports.auth.dto.common.ApiResponse;
import com.esports.auth.dto.player.CreatePlayerRequest;
import com.esports.auth.dto.player.PlayerResponse;
import com.esports.auth.dto.player.UpdatePlayerRequest;
import com.esports.auth.service.PlayerService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/players")
@RequiredArgsConstructor
@Tag(name = "Players", description = "Player CRUD operations")
@SecurityRequirement(name = "bearerAuth")
public class PlayerController {

    private final PlayerService playerService;

    @PostMapping
    @Operation(summary = "Create a player")
    public ResponseEntity<ApiResponse<PlayerResponse>> createPlayer(
            @Valid @RequestBody CreatePlayerRequest request) {
        PlayerResponse player = playerService.createPlayer(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Player created successfully", player));
    }

    @GetMapping
    @Operation(summary = "Get all players")
    public ResponseEntity<ApiResponse<List<PlayerResponse>>> getAllPlayers() {
        return ResponseEntity.ok(
                ApiResponse.success("Players retrieved successfully", playerService.getAllPlayers()));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get a player by ID")
    public ResponseEntity<ApiResponse<PlayerResponse>> getPlayerById(@PathVariable Long id) {
        return ResponseEntity.ok(
                ApiResponse.success("Player retrieved successfully", playerService.getPlayerById(id)));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update a player")
    public ResponseEntity<ApiResponse<PlayerResponse>> updatePlayer(
            @PathVariable Long id,
            @Valid @RequestBody UpdatePlayerRequest request) {
        return ResponseEntity.ok(
                ApiResponse.success("Player updated successfully", playerService.updatePlayer(id, request)));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a player")
    public ResponseEntity<ApiResponse<Void>> deletePlayer(@PathVariable Long id) {
        playerService.deletePlayer(id);
        return ResponseEntity.ok(ApiResponse.success("Player deleted successfully"));
    }
}
