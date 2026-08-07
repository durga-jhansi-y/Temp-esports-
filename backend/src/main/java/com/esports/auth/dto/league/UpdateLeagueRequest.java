package com.esports.auth.dto.league;

import com.esports.auth.entity.LeagueStatus;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

/**
 * DTO for updating an existing League.
 * All fields are optional — only non-null fields are applied in the service.
 */
@Getter
@Setter
public class UpdateLeagueRequest {

    @Size(max = 100, message = "League name must not exceed 100 characters")
    private String name;

    @Size(max = 500, message = "Description must not exceed 500 characters")
    private String description;

    @Size(max = 100, message = "Game must not exceed 100 characters")
    private String game;

    @Size(max = 100, message = "Region must not exceed 100 characters")
    private String region;

    private LocalDate startDate;

    private LocalDate endDate;

    private LeagueStatus status;
}
