package com.esports.auth.entity;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

import static org.assertj.core.api.Assertions.assertThat;

class MatchEntityTest {

    @Test
    @DisplayName("Match builder stores teams and scheduled time")
    void matchBuilder_storesTeamsAndScheduledTime() {
        Team homeTeam = Team.builder()
                .name("CCC Tigers")
                .game("Valorant")
                .build();

        Team awayTeam = Team.builder()
                .name("Loop Lions")
                .game("Valorant")
                .build();

        LocalDateTime scheduledAt = LocalDateTime.of(2026, 9, 1, 18, 30);

        Match match = Match.builder()
                .homeTeam(homeTeam)
                .awayTeam(awayTeam)
                .scheduledAt(scheduledAt)
                .venue("Main Arena")
                .build();

        assertThat(match.getHomeTeam()).isEqualTo(homeTeam);
        assertThat(match.getAwayTeam()).isEqualTo(awayTeam);
        assertThat(match.getScheduledAt()).isEqualTo(scheduledAt);
        assertThat(match.getVenue()).isEqualTo("Main Arena");
        assertThat(match.getHomeScore()).isEqualTo(0);
        assertThat(match.getAwayScore()).isEqualTo(0);
        assertThat(match.getStatus()).isEqualTo(MatchStatus.SCHEDULED);
    }

    @Test
    @DisplayName("Match schedule can be updated")
    void matchSchedule_canBeUpdated() {
        Team homeTeam = Team.builder()
                .name("CCC Tigers")
                .game("Valorant")
                .build();

        Team awayTeam = Team.builder()
                .name("Loop Lions")
                .game("Valorant")
                .build();

        LocalDateTime originalTime = LocalDateTime.of(2026, 9, 1, 18, 30);
        LocalDateTime updatedTime = LocalDateTime.of(2026, 9, 2, 20, 0);

        Match match = Match.builder()
                .homeTeam(homeTeam)
                .awayTeam(awayTeam)
                .scheduledAt(originalTime)
                .build();

        match.setScheduledAt(updatedTime);

        assertThat(match.getScheduledAt()).isEqualTo(updatedTime);
    }
}