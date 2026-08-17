package com.esports.auth.service;

import com.esports.auth.dto.team.CreateTeamRequest;
import com.esports.auth.dto.team.TeamResponse;
import com.esports.auth.dto.team.UpdateTeamRequest;
import com.esports.auth.entity.Team;
import com.esports.auth.exception.ResourceNotFoundException;
import com.esports.auth.repository.MatchRepository;
import com.esports.auth.repository.TeamRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class TeamService {

    private final TeamRepository teamRepository;
    private final MatchRepository matchRepository;

    public TeamResponse createTeam(CreateTeamRequest request) {
        if (teamRepository.existsByNameIgnoreCase(request.getName())) {
            throw new IllegalArgumentException(
                    "A team with the name '" + request.getName() + "' already exists");
        }

        Team team = Team.builder()
                .name(request.getName())
                .game(request.getGame())
                .region(request.getRegion())
                .coach(request.getCoach())
                .active(request.getActive() == null || request.getActive())
                .build();

        return TeamResponse.from(teamRepository.save(team));
    }

    @Transactional(readOnly = true)
    public List<TeamResponse> getAllTeams() {
        return teamRepository.findAll().stream()
                .map(TeamResponse::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public TeamResponse getTeamById(Long id) {
        return TeamResponse.from(findTeamOrThrow(id));
    }

    public TeamResponse updateTeam(Long id, UpdateTeamRequest request) {
        Team team = findTeamOrThrow(id);

        if (request.getName() != null) {
            if (teamRepository.existsByNameIgnoreCaseAndIdNot(request.getName(), id)) {
                throw new IllegalArgumentException(
                        "A team with the name '" + request.getName() + "' already exists");
            }
            team.setName(request.getName());
        }
        if (request.getGame() != null) {
            if (!team.getGame().equalsIgnoreCase(request.getGame())
                    && matchRepository.existsByHomeTeam_IdOrAwayTeam_Id(id, id)) {
                throw new IllegalStateException(
                        "Team game cannot be changed while matches reference the team");
            }
            team.setGame(request.getGame());
        }
        if (request.getRegion() != null) {
            team.setRegion(request.getRegion());
        }
        if (request.getCoach() != null) {
            team.setCoach(request.getCoach());
        }
        if (request.getActive() != null) {
            team.setActive(request.getActive());
        }

        return TeamResponse.from(teamRepository.save(team));
    }

    public void deleteTeam(Long id) {
        Team team = findTeamOrThrow(id);
        if (matchRepository.existsByHomeTeam_IdOrAwayTeam_Id(id, id)) {
            throw new IllegalStateException(
                    "Team cannot be deleted while one or more matches reference it");
        }
        teamRepository.delete(team);
    }

    @Transactional(readOnly = true)
    public Team findTeamOrThrow(Long id) {
        return teamRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Team", id));
    }
}

