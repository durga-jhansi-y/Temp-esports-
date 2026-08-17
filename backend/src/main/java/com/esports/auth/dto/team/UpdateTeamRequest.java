package com.esports.auth.dto.team;

import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateTeamRequest {

    @Size(min = 1, max = 100, message = "Team name must be between 1 and 100 characters")
    private String name;

    @Size(min = 1, max = 100, message = "Game must be between 1 and 100 characters")
    private String game;

    @Size(max = 100, message = "Region must not exceed 100 characters")
    private String region;

    @Size(max = 100, message = "Coach must not exceed 100 characters")
    private String coach;

    private Boolean active;
}

