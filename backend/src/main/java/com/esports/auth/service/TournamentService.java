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
 */
@Service
@RequiredArgsConstructor
@Transactional
public class TournamentService {

    private final TournamentRepository tournamentRepository;
    private final LeagueService leagueService;

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
                .build();

        return TournamentResponse.from(tournamentRepository.save(tournament));
    }

    @Transactional(readOnly = true)
    public List<TournamentResponse> getAllTournaments(boolean includeDemo) {
        return tournamentRepository.findAll()
                .stream()
                .filter(tournament -> includeDemo || !tournament.isDemoData())
                .map(TournamentResponse::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public TournamentResponse getTournamentById(Long id, boolean includeDemo) {
        Tournament tournament = findTournamentOrThrow(id);
        if (tournament.isDemoData() && !includeDemo) {
            throw new ResourceNotFoundException("Tournament", id);
        }
        return TournamentResponse.from(tournament);
    }

    @Transactional(readOnly = true)
    public List<TournamentResponse> getTournamentsByLeagueId(Long leagueId, boolean includeDemo) {
        return leagueService.getTournamentsByLeagueId(leagueId, includeDemo);
    }

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
            League newLeague = leagueService.findLeagueOrThrow(request.getLeagueId());
            tournament.setLeague(newLeague);
        }

        validateDateRange(tournament.getStartDate(), tournament.getEndDate());

        return TournamentResponse.from(tournamentRepository.save(tournament));
    }

    public void deleteTournament(Long id) {
        findTournamentOrThrow(id);
        tournamentRepository.deleteById(id);
    }

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