package com.esports.auth.dto.tournament;

import com.esports.auth.entity.Tournament;
import com.esports.auth.entity.TournamentStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

/**
 * DTO for Tournament API responses.
 *
 * JSON recursion prevention:
 *   This DTO exposes leagueId (Long) instead of the full League entity.
 *   This breaks the bidirectional cycle: League → Tournament → League → ...
 */
@Getter
@Builder
@AllArgsConstructor
public class TournamentResponse {

    private Long id;
    private String name;
    private String description;
    private String game;
    private String location;
    private LocalDate startDate;
    private LocalDate endDate;
    private TournamentStatus status;

    /** ID of the League this tournament belongs to. */
    private Long leagueId;

    /** Name of the League (for convenience, avoids a second lookup on the client). */
    private String leagueName;

    /**
     * Converts a Tournament entity to a TournamentResponse DTO.
     */
    public static TournamentResponse from(Tournament tournament) {
        return TournamentResponse.builder()
                .id(tournament.getId())
                .name(tournament.getName())
                .description(tournament.getDescription())
                .game(tournament.getGame())
                .location(tournament.getLocation())
                .startDate(tournament.getStartDate())
                .endDate(tournament.getEndDate())
                .status(tournament.getStatus())
                .leagueId(tournament.getLeague().getId())
                .leagueName(tournament.getLeague().getName())
                .build();
    }
}
