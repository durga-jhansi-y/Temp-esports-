package com.esports.auth.controller;

import com.esports.auth.dto.league.CreateLeagueRequest;
import com.esports.auth.dto.league.LeagueResponse;
import com.esports.auth.dto.league.UpdateLeagueRequest;
import com.esports.auth.dto.tournament.TournamentResponse;
import com.esports.auth.service.LeagueService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for League operations.
 */
@RestController
@RequestMapping("/api/leagues")
@RequiredArgsConstructor
public class LeagueController {

    private final LeagueService leagueService;

    @PostMapping
    public ResponseEntity<LeagueResponse> createLeague(
            @Valid @RequestBody CreateLeagueRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(leagueService.createLeague(request));
    }

    @GetMapping
    public ResponseEntity<List<LeagueResponse>> getAllLeagues() {
        return ResponseEntity.ok(leagueService.getAllLeagues());
    }

    @GetMapping("/{id}")
    public ResponseEntity<LeagueResponse> getLeagueById(@PathVariable Long id) {
        return ResponseEntity.ok(leagueService.getLeagueById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<LeagueResponse> updateLeague(
            @PathVariable Long id,
            @Valid @RequestBody UpdateLeagueRequest request) {
        return ResponseEntity.ok(leagueService.updateLeague(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLeague(@PathVariable Long id) {
        leagueService.deleteLeague(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}/tournaments")
    public ResponseEntity<List<TournamentResponse>> getTournamentsByLeagueId(
            @PathVariable Long id) {
        return ResponseEntity.ok(leagueService.getTournamentsByLeagueId(id));
    }
}
