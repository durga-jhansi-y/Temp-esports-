package com.esports.auth.dto.match;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class CreateMatchRequest {

    @NotNull(message = "Home team ID is required")
    private Long homeTeamId;

    @NotNull(message = "Away team ID is required")
    private Long awayTeamId;

    private Long tournamentId;

    @NotNull(message = "Scheduled date/time is required")
    private LocalDateTime scheduledAt;

    @Size(max = 200, message = "Venue must not exceed 200 characters")
    private String venue;

    @PositiveOrZero(message = "Home score cannot be negative")
    private Integer homeScore;

    @PositiveOrZero(message = "Away score cannot be negative")
    private Integer awayScore;
}
