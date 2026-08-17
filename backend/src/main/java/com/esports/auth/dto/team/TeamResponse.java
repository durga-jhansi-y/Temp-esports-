package com.esports.auth.dto.team;

import com.esports.auth.entity.Team;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class TeamResponse {
    private Long id;
    private String name;
    private String game;
    private String region;
    private String coach;
    private boolean active;

    public static TeamResponse from(Team team) {
        return TeamResponse.builder()
                .id(team.getId())
                .name(team.getName())
                .game(team.getGame())
                .region(team.getRegion())
                .coach(team.getCoach())
                .active(team.isActive())
                .build();
    }
}

