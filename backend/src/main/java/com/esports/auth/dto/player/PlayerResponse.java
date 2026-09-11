package com.esports.auth.dto.player;

import com.esports.auth.entity.Player;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class PlayerResponse {

    private Long id;
    private String gamerTag;
    private String displayName;
    private String game;
    private String teamName;
    private String country;
    private String rosterRole;
    private boolean eligibilityVerified;
    private boolean active;

    public static PlayerResponse from(Player player) {
        return PlayerResponse.builder()
                .id(player.getId())
                .gamerTag(player.getGamerTag())
                .displayName(player.getDisplayName())
                .game(player.getGame())
                .teamName(player.getTeamName())
                .country(player.getCountry())
                .rosterRole(player.getRosterRole())
                .eligibilityVerified(player.isEligibilityVerified())
                .active(player.isActive())
                .build();
    }
}