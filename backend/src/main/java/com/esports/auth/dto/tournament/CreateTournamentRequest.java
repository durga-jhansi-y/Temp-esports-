package com.esports.auth.dto.tournament;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

/**
 * DTO for creating a new Tournament.
 * leagueId references an existing League — service validates it exists.
 */
@Getter
@Setter
public class CreateTournamentRequest {

    @NotBlank(message = "Tournament name is required")
    @Size(max = 100, message = "Tournament name must not exceed 100 characters")
    private String name;

    @Size(max = 500, message = "Description must not exceed 500 characters")
    private String description;

    @NotBlank(message = "Game is required")
    @Size(max = 100, message = "Game must not exceed 100 characters")
    private String game;

    @Size(max = 200, message = "Location must not exceed 200 characters")
    private String location;

    @NotNull(message = "Start date is required")
    private LocalDate startDate;

    @NotNull(message = "End date is required")
    private LocalDate endDate;

    @NotNull(message = "League ID is required")
    private Long leagueId;
}
