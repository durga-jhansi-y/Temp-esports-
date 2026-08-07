package com.esports.auth.dto.tournament;

import com.esports.auth.entity.TournamentStatus;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

/**
 * DTO for updating an existing Tournament.
 * All fields are optional — only non-null values are applied in the service.
 */
@Getter
@Setter
public class UpdateTournamentRequest {

    @Size(max = 100, message = "Tournament name must not exceed 100 characters")
    private String name;

    @Size(max = 500, message = "Description must not exceed 500 characters")
    private String description;

    @Size(max = 100, message = "Game must not exceed 100 characters")
    private String game;

    @Size(max = 200, message = "Location must not exceed 200 characters")
    private String location;

    private LocalDate startDate;

    private LocalDate endDate;

    private TournamentStatus status;

    /** If provided, moves this tournament to a different league. Service validates the new league exists. */
    private Long leagueId;
}
