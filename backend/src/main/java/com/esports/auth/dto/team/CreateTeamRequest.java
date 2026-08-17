package com.esports.auth.dto.team;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateTeamRequest {

    @NotBlank(message = "Team name is required")
    @Size(max = 100, message = "Team name must not exceed 100 characters")
    private String name;

    @NotBlank(message = "Game is required")
    @Size(max = 100, message = "Game must not exceed 100 characters")
    private String game;

    @Size(max = 100, message = "Region must not exceed 100 characters")
    private String region;

    @Size(max = 100, message = "Coach must not exceed 100 characters")
    private String coach;

    private Boolean active;
}

