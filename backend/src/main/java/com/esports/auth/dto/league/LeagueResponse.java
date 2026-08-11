package com.esports.auth.dto.league;

import com.esports.auth.entity.League;
import com.esports.auth.entity.LeagueStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

/**
 * DTO for League API responses.
 * Never exposes the tournaments list directly — only a count.
 * This prevents exposing large nested collections in list endpoints.
 */
@Getter
@Builder
@AllArgsConstructor
public class LeagueResponse {

    private Long id;
    private String name;
    private String description;
    private String game;
    private String region;
    private LocalDate startDate;
    private LocalDate endDate;
    private LeagueStatus status;

    /** Number of tournaments in this league. */
    private int tournamentCount;

    /**
     * Converts a League entity to a LeagueResponse DTO.
     */
    public static LeagueResponse from(League league) {
        return LeagueResponse.builder()
                .id(league.getId())
                .name(league.getName())
                .description(league.getDescription())
                .game(league.getGame())
                .region(league.getRegion())
                .startDate(league.getStartDate())
                .endDate(league.getEndDate())
                .status(league.getStatus())
                .tournamentCount(league.getTournaments().size())
                .build();
    }
}
