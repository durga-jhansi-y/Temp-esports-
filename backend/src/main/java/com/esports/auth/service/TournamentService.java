package com.esports.auth.service;

import com.esports.auth.dto.tournament.CreateTournamentRequest;
import com.esports.auth.dto.tournament.TournamentResponse;
import com.esports.auth.dto.tournament.UpdateTournamentRequest;
import com.esports.auth.entity.League;
import com.esports.auth.entity.Tournament;
import com.esports.auth.exception.ResourceNotFoundException;
import com.esports.auth.repository.TournamentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service for Tournament CRUD operations.
 *
 * Business rules enforced here:
 *   - leagueId must reference an existing League.
 *   - endDate must not be before startDate.
 *   - When updating leagueId, the new League must exist.
 */
@Service
@RequiredArgsConstructor
@Transactional
public class TournamentService {

    private final TournamentRepository tournamentRepository;
    private final LeagueService leagueService;  // reuses findLeagueOrThrow

    /**
     * Creates a new Tournament and associates it with an existing League.
     *
     * @throws ResourceNotFoundException if leagueId does not exist
     * @throws IllegalStateException     if endDate is before startDate
     */
    public TournamentResponse createTournament(CreateTournamentRequest request) {
        League league = leagueService.findLeagueOrThrow(request.getLeagueId());

        validateDateRange(request.getStartDate(), request.getEndDate());

        Tournament tournament = Tournament.builder()
                .name(request.getName())
                .description(request.getDescription())
                .game(request.getGame())
                .location(request.getLocation())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .league(league)
                .build();  // status defaults to UPCOMING via @Builder.Default

        return TournamentResponse.from(tournamentRepository.save(tournament));
    }

    /**
     * Returns all tournaments.
     */
    @Transactional(readOnly = true)
    public List<TournamentResponse> getAllTournaments() {
        return tournamentRepository.findAll()
                .stream()
                .map(TournamentResponse::from)
                .toList();
    }

    /**
     * Returns a single tournament by ID.
     *
     * @throws ResourceNotFoundException if not found
     */
    @Transactional(readOnly = true)
    public TournamentResponse getTournamentById(Long id) {
        return TournamentResponse.from(findTournamentOrThrow(id));
    }

    /**
     * Returns all tournaments for a specific league.
     */
    @Transactional(readOnly = true)
    public List<TournamentResponse> getTournamentsByLeagueId(Long leagueId) {
        return leagueService.getTournamentsByLeagueId(leagueId);
    }

    /**
     * Updates an existing tournament. Only non-null fields are applied.
     *
     * @throws ResourceNotFoundException if tournament or new league is not found
     * @throws IllegalStateException     if date range is invalid after update
     */
    public TournamentResponse updateTournament(Long id, UpdateTournamentRequest request) {
        Tournament tournament = findTournamentOrThrow(id);

        if (request.getName() != null) {
            tournament.setName(request.getName());
        }
        if (request.getDescription() != null) {
            tournament.setDescription(request.getDescription());
        }
        if (request.getGame() != null) {
            tournament.setGame(request.getGame());
        }
        if (request.getLocation() != null) {
            tournament.setLocation(request.getLocation());
        }
        if (request.getStartDate() != null) {
            tournament.setStartDate(request.getStartDate());
        }
        if (request.getEndDate() != null) {
            tournament.setEndDate(request.getEndDate());
        }
        if (request.getStatus() != null) {
            tournament.setStatus(request.getStatus());
        }
        if (request.getLeagueId() != null) {
            // Validate that the new league exists before changing the relationship
            League newLeague = leagueService.findLeagueOrThrow(request.getLeagueId());
            tournament.setLeague(newLeague);
        }

        validateDateRange(tournament.getStartDate(), tournament.getEndDate());

        return TournamentResponse.from(tournamentRepository.save(tournament));
    }

    /**
     * Deletes a tournament by ID.
     *
     * @throws ResourceNotFoundException if not found
     */
    public void deleteTournament(Long id) {
        findTournamentOrThrow(id);
        tournamentRepository.deleteById(id);
    }

    // ── Helpers ──────────────────────────────────────────────────────────────

    private Tournament findTournamentOrThrow(Long id) {
        return tournamentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tournament", id));
    }

    private void validateDateRange(java.time.LocalDate startDate, java.time.LocalDate endDate) {
        if (endDate.isBefore(startDate)) {
            throw new IllegalStateException(
                    "End date (" + endDate + ") cannot be before start date (" + startDate + ")");
        }
    }
}
