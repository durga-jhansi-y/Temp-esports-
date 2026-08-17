package com.esports.auth.dto.match;

import com.esports.auth.entity.MatchStatus;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class UpdateMatchRequest {
    private Long homeTeamId;
    private Long awayTeamId;
    private Long tournamentId;
    private LocalDateTime scheduledAt;

    @Size(max = 200, message = "Venue must not exceed 200 characters")
    private String venue;

    @PositiveOrZero(message = "Home score cannot be negative")
    private Integer homeScore;

    @PositiveOrZero(message = "Away score cannot be negative")
    private Integer awayScore;

    private MatchStatus status;
}
