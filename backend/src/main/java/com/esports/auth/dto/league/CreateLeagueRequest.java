package com.esports.auth.dto.league;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

/**
 * DTO for creating a new League.
 * Validated with @Valid on the controller.
 */
@Getter
@Setter
public class CreateLeagueRequest {

    @NotBlank(message = "League name is required")
    @Size(max = 100, message = "League name must not exceed 100 characters")
    private String name;

    @Size(max = 500, message = "Description must not exceed 500 characters")
    private String description;

    @NotBlank(message = "Game is required")
    @Size(max = 100, message = "Game must not exceed 100 characters")
    private String game;

    @NotBlank(message = "Region is required")
    @Size(max = 100, message = "Region must not exceed 100 characters")
    private String region;

    @NotNull(message = "Start date is required")
    private LocalDate startDate;

    @NotNull(message = "End date is required")
    private LocalDate endDate;
}
