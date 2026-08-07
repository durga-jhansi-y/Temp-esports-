package com.esports.auth.service;

import com.esports.auth.dto.league.CreateLeagueRequest;
import com.esports.auth.dto.league.LeagueResponse;
import com.esports.auth.dto.league.UpdateLeagueRequest;
import com.esports.auth.dto.tournament.TournamentResponse;
import com.esports.auth.entity.League;
import com.esports.auth.exception.ResourceNotFoundException;
import com.esports.auth.repository.LeagueRepository;
import com.esports.auth.repository.TournamentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service for League CRUD operations.
 *
 * Business rules enforced here:
 *   - League name must be unique.
 *   - endDate must not be before startDate.
 *   - Deleting a League does NOT delete its Tournaments (no cascade).
 *     The caller must decide what to do with orphaned tournaments.
 */
@Service
@RequiredArgsConstructor
@Transactional
public class LeagueService {

    private final LeagueRepository leagueRepository;
    private final TournamentRepository tournamentRepository;

    /**
     * Creates a new League.
     *
     * @throws IllegalArgumentException if name is already taken
     * @throws IllegalStateException    if endDate is before startDate
     */
    public LeagueResponse createLeague(CreateLeagueRequest request) {
        if (leagueRepository.existsByName(request.getName())) {
            throw new IllegalArgumentException(
                    "A league with the name '" + request.getName() + "' already exists");
        }

        validateDateRange(request.getStartDate(), request.getEndDate());

        League league = League.builder()
                .name(request.getName())
                .description(request.getDescription())
                .game(request.getGame())
                .region(request.getRegion())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .build();  // status defaults to UPCOMING via @Builder.Default

        return LeagueResponse.from(leagueRepository.save(league));
    }

    /**
     * Returns all leagues.
     */
    @Transactional(readOnly = true)
    public List<LeagueResponse> getAllLeagues() {
        return leagueRepository.findAll()
                .stream()
                .map(LeagueResponse::from)
                .toList();
    }

    /**
     * Returns a single league by ID.
     *
     * @throws ResourceNotFoundException if not found
     */
    @Transactional(readOnly = true)
    public LeagueResponse getLeagueById(Long id) {
        League league = findLeagueOrThrow(id);
        return LeagueResponse.from(league);
    }

    /**
     * Updates an existing league. Only non-null fields in the request are applied.
     *
     * @throws ResourceNotFoundException if not found
     * @throws IllegalStateException     if date range is invalid after update
     */
    public LeagueResponse updateLeague(Long id, UpdateLeagueRequest request) {
        League league = findLeagueOrThrow(id);

        if (request.getName() != null) {
            league.setName(request.getName());
        }
        if (request.getDescription() != null) {
            league.setDescription(request.getDescription());
        }
        if (request.getGame() != null) {
            league.setGame(request.getGame());
        }
        if (request.getRegion() != null) {
            league.setRegion(request.getRegion());
        }
        if (request.getStartDate() != null) {
            league.setStartDate(request.getStartDate());
        }
        if (request.getEndDate() != null) {
            league.setEndDate(request.getEndDate());
        }
        if (request.getStatus() != null) {
            league.setStatus(request.getStatus());
        }

        validateDateRange(league.getStartDate(), league.getEndDate());

        return LeagueResponse.from(leagueRepository.save(league));
    }

    /**
     * Deletes a league by ID.
     * Does NOT cascade-delete tournaments — they remain with a dangling league_id.
     * The API consumer should handle tournament cleanup before deleting a league.
     *
     * @throws ResourceNotFoundException if not found
     */
    public void deleteLeague(Long id) {
        findLeagueOrThrow(id);
        leagueRepository.deleteById(id);
    }

    /**
     * Returns all tournaments belonging to a specific league.
     *
     * @throws ResourceNotFoundException if league is not found
     */
    @Transactional(readOnly = true)
    public List<TournamentResponse> getTournamentsByLeagueId(Long leagueId) {
        findLeagueOrThrow(leagueId);  // ensures league exists
        return tournamentRepository.findByLeagueId(leagueId)
                .stream()
                .map(TournamentResponse::from)
                .toList();
    }

    // ── Helpers ──────────────────────────────────────────────────────────────

    public League findLeagueOrThrow(Long id) {
        return leagueRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("League", id));
    }

    private void validateDateRange(java.time.LocalDate startDate, java.time.LocalDate endDate) {
        if (endDate.isBefore(startDate)) {
            throw new IllegalStateException(
                    "End date (" + endDate + ") cannot be before start date (" + startDate + ")");
        }
    }
}
