package com.esports.auth.entity;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class TeamEntityTest {

    @Test
    @DisplayName("Team builder sets core fields and defaults active to true")
    void teamBuilder_setsCoreFieldsAndDefaultActive() {
        Team team = Team.builder()
                .name("CCC Tigers")
                .game("Valorant")
                .region("North America")
                .coach("Coach Kim")
                .build();

        assertThat(team.getName()).isEqualTo("CCC Tigers");
        assertThat(team.getGame()).isEqualTo("Valorant");
        assertThat(team.getRegion()).isEqualTo("North America");
        assertThat(team.getCoach()).isEqualTo("Coach Kim");
        assertThat(team.isActive()).isTrue();
        assertThat(team.getPlayers()).isNotNull();
        assertThat(team.getPlayers()).isEmpty();
    }

    @Test
    @DisplayName("Team can hold related players")
    void team_canHoldRelatedPlayers() {
        Team team = Team.builder()
                .name("CCC Tigers")
                .game("Valorant")
                .build();

        Player player = Player.builder()
                .gamerTag("TigerOne")
                .displayName("Tiger One")
                .game("Valorant")
                .teamName(team.getName())
                .team(team)
                .build();

        team.getPlayers().add(player);

        assertThat(team.getPlayers()).hasSize(1);
        assertThat(team.getPlayers().get(0).getGamerTag()).isEqualTo("TigerOne");
        assertThat(team.getPlayers().get(0).getTeam()).isEqualTo(team);
        assertThat(player.getTeam().getName()).isEqualTo("CCC Tigers");
    }
}