package com.esports.auth.dto.player;

import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdatePlayerRequest {

    @Size(min = 3, max = 30, message = "Gamer tag must be between 3 and 30 characters")
    private String gamerTag;

    @Size(min = 1, max = 100, message = "Display name must be between 1 and 100 characters")
    private String displayName;

    @Size(min = 1, max = 80, message = "Game must be between 1 and 80 characters")
    private String game;

    @Size(max = 100, message = "Team name must not exceed 100 characters")
    private String teamName;

    @Size(max = 60, message = "Country must not exceed 60 characters")
    private String country;

    private Boolean active;
}

