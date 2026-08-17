package com.esports.auth.service;

import com.esports.auth.dto.match.CreateMatchRequest;
import com.esports.auth.dto.match.MatchResponse;
import com.esports.auth.dto.match.UpdateMatchRequest;
import com.esports.auth.entity.Match;
import com.esports.auth.entity.Team;
import com.esports.auth.entity.Tournament;
import com.esports.auth.exception.ResourceNotFoundException;
import com.esports.auth.repository.MatchRepository;
import com.esports.auth.repository.TeamRepository;
import com.esports.auth.repository.TournamentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class MatchService {

    private final MatchRepository matchRepository;
    private final TeamRepository teamRepository;
    private final TournamentRepository tournamentRepository;

    public MatchResponse createMatch(CreateMatchRequest request) {
        Team homeTeam = findTeamOrThrow(request.getHomeTeamId());
        Team awayTeam = findTeamOrThrow(request.getAwayTeamId());
        validateTeams(homeTeam, awayTeam);

        Tournament tournament = request.getTournamentId() == null
                ? null
                : findTournamentOrThrow(request.getTournamentId());
        validateTournamentGame(homeTeam, tournament);

        Match match = Match.builder()
                .homeTeam(homeTeam)
                .awayTeam(awayTeam)
                .tournament(tournament)
                .scheduledAt(request.getScheduledAt())
                .venue(request.getVenue())
                .homeScore(request.getHomeScore() == null ? 0 : request.getHomeScore())
                .awayScore(request.getAwayScore() == null ? 0 : request.getAwayScore())
                .build();

        return MatchResponse.from(matchRepository.save(match));
    }

    @Transactional(readOnly = true)
    public List<MatchResponse> getAllMatches() {
        return matchRepository.findAll().stream()
                .map(MatchResponse::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public MatchResponse getMatchById(Long id) {
        return MatchResponse.from(findMatchOrThrow(id));
    }

    @Transactional(readOnly = true)
    public List<MatchResponse> getMatchesByTeamId(Long teamId) {
        findTeamOrThrow(teamId);
        return matchRepository
                .findByHomeTeam_IdOrAwayTeam_IdOrderByScheduledAtAsc(teamId, teamId)
                .stream()
                .map(MatchResponse::from)
                .toList();
    }

    public MatchResponse updateMatch(Long id, UpdateMatchRequest request) {
        Match match = findMatchOrThrow(id);

        Team homeTeam = request.getHomeTeamId() == null
                ? match.getHomeTeam()
                : findTeamOrThrow(request.getHomeTeamId());
        Team awayTeam = request.getAwayTeamId() == null
                ? match.getAwayTeam()
                : findTeamOrThrow(request.getAwayTeamId());
        validateTeams(homeTeam, awayTeam);

        match.setHomeTeam(homeTeam);
        match.setAwayTeam(awayTeam);

        if (request.getTournamentId() != null) {
            match.setTournament(findTournamentOrThrow(request.getTournamentId()));
        }
        validateTournamentGame(homeTeam, match.getTournament());

        if (request.getScheduledAt() != null) {
            match.setScheduledAt(request.getScheduledAt());
        }
        if (request.getVenue() != null) {
            match.setVenue(request.getVenue());
        }
        if (request.getHomeScore() != null) {
            match.setHomeScore(request.getHomeScore());
        }
        if (request.getAwayScore() != null) {
            match.setAwayScore(request.getAwayScore());
        }
        if (request.getStatus() != null) {
            match.setStatus(request.getStatus());
        }

        return MatchResponse.from(matchRepository.save(match));
    }

    public void deleteMatch(Long id) {
        Match match = findMatchOrThrow(id);
        matchRepository.delete(match);
    }

    private Match findMatchOrThrow(Long id) {
        return matchRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Match", id));
    }

    private Team findTeamOrThrow(Long id) {
        return teamRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Team", id));
    }

    private Tournament findTournamentOrThrow(Long id) {
        return tournamentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tournament", id));
    }

    private void validateTeams(Team homeTeam, Team awayTeam) {
        if (homeTeam.getId().equals(awayTeam.getId())) {
            throw new IllegalStateException("Home team and away team must be different teams");
        }
        if (!homeTeam.getGame().equalsIgnoreCase(awayTeam.getGame())) {
            throw new IllegalStateException("Both teams in a match must play the same game");
        }
    }

    private void validateTournamentGame(Team homeTeam, Tournament tournament) {
        if (tournament != null
                && !homeTeam.getGame().equalsIgnoreCase(tournament.getGame())) {
            throw new IllegalStateException(
                    "The match teams and tournament must use the same game");
        }
    }
}

