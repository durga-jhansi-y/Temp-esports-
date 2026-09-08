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
                .build();

        return LeagueResponse.from(leagueRepository.save(league));
    }

    @Transactional(readOnly = true)
    public List<LeagueResponse> getAllLeagues(boolean includeDemo) {
        return leagueRepository.findAll()
                .stream()
                .filter(league -> includeDemo || !league.isDemoData())
                .map(LeagueResponse::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public LeagueResponse getLeagueById(Long id, boolean includeDemo) {
        League league = findLeagueOrThrow(id);
        if (league.isDemoData() && !includeDemo) {
            throw new ResourceNotFoundException("League", id);
        }
        return LeagueResponse.from(league);
    }

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

    public void deleteLeague(Long id) {
        findLeagueOrThrow(id);
        leagueRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public List<TournamentResponse> getTournamentsByLeagueId(Long leagueId, boolean includeDemo) {
        League league = findLeagueOrThrow(leagueId);
        if (league.isDemoData() && !includeDemo) {
            throw new ResourceNotFoundException("League", leagueId);
        }

        return tournamentRepository.findByLeagueId(leagueId)
                .stream()
                .filter(tournament -> includeDemo || !tournament.isDemoData())
                .map(TournamentResponse::from)
                .toList();
    }

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