package com.esports.auth.dto.match;

import com.esports.auth.entity.Match;
import com.esports.auth.entity.MatchStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
public class MatchResponse {
    private Long id;
    private Long homeTeamId;
    private String homeTeamName;
    private Long awayTeamId;
    private String awayTeamName;
    private Long tournamentId;
    private String tournamentName;
    private LocalDateTime scheduledAt;
    private String venue;
    private Integer homeScore;
    private Integer awayScore;
    private MatchStatus status;

    public static MatchResponse from(Match match) {
        return MatchResponse.builder()
                .id(match.getId())
                .homeTeamId(match.getHomeTeam().getId())
                .homeTeamName(match.getHomeTeam().getName())
                .awayTeamId(match.getAwayTeam().getId())
                .awayTeamName(match.getAwayTeam().getName())
                .tournamentId(match.getTournament() == null ? null : match.getTournament().getId())
                .tournamentName(match.getTournament() == null ? null : match.getTournament().getName())
                .scheduledAt(match.getScheduledAt())
                .venue(match.getVenue())
                .homeScore(match.getHomeScore())
                .awayScore(match.getAwayScore())
                .status(match.getStatus())
                .build();
    }
}
