package com.esports.auth.config;

import com.esports.auth.entity.League;
import com.esports.auth.entity.LeagueStatus;
import com.esports.auth.entity.Match;
import com.esports.auth.entity.MatchStatus;
import com.esports.auth.entity.Player;
import com.esports.auth.entity.Team;
import com.esports.auth.entity.Tournament;
import com.esports.auth.entity.TournamentStatus;
import com.esports.auth.repository.LeagueRepository;
import com.esports.auth.repository.MatchRepository;
import com.esports.auth.repository.PlayerRepository;
import com.esports.auth.repository.TeamRepository;
import com.esports.auth.repository.TournamentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;

/**
 * Seeds the former frontend mock records into the real backend database.
 *
 * The records are marked with demoData=true so API reads can include or hide
 * them without maintaining a second frontend-only data store.
 */
@Component
@RequiredArgsConstructor
public class DemoDataSeeder implements ApplicationRunner {

    private final LeagueRepository leagueRepository;
    private final TeamRepository teamRepository;
    private final TournamentRepository tournamentRepository;
    private final MatchRepository matchRepository;
    private final PlayerRepository playerRepository;

    @Value("${app.esports.seed-demo-data:true}")
    private boolean seedDemoData;

    @Override
    @Transactional
    public void run(ApplicationArguments args) {
        if (!seedDemoData) {
            return;
        }

        League capitalLeague = seedLeague(
                "Capital Esports League",
                "Sample league used for tournament testing.",
                "Valorant",
                "North America",
                LocalDate.of(2026, 8, 1),
                LocalDate.of(2026, 12, 15),
                LeagueStatus.ACTIVE
        );

        League campusLeague = seedLeague(
                "Campus Championship Series",
                "Sample collegiate league.",
                "Rocket League",
                "East Coast",
                LocalDate.of(2026, 9, 1),
                LocalDate.of(2026, 11, 30),
                LeagueStatus.ACTIVE
        );

        Team nova = seedTeam("Nova", "Valorant", "North America", "A. Rivera", true);
        Team vanta = seedTeam("Vanta GG", "Valorant", "North America", "M. Chen", true);
        Team apex = seedTeam("Team Apex", "CS2", "Mid-Atlantic", "J. Patel", true);
        Team riptide = seedTeam("Riptide", "Rocket League", "East Coast", "K. Brooks", true);
        Team eclipse = seedTeam("Eclipse", "Valorant", "East Coast", null, true);
        Team orion = seedTeam("Orion", "Overwatch 2", "North America", "S. Kim", false);

        seedPlayer("Shadow", "Mason Reed", "United States", nova);
        seedPlayer("Volt", "Jordan Lee", "Canada", nova);
        seedPlayer("Frost", "Evan Park", "United States", nova);
        seedPlayer("Blaze", "Noah Kim", "South Korea", nova);
        seedPlayer("Echo", "Lucas Chen", "United States", nova);

        seedPlayer("Nyx", "Avery Stone", "United States", vanta);
        seedPlayer("Kite", "Ryan Cole", "Canada", vanta);
        seedPlayer("Mako", "Kai Bennett", "United States", vanta);
        seedPlayer("Flux", "Eli Brooks", "United States", vanta);
        seedPlayer("Rune", "Theo Morgan", "United Kingdom", vanta);

        seedPlayer("Wave", "Chris Hale", "United States", riptide);
        seedPlayer("Drift", "Sam Torres", "United States", riptide);
        seedPlayer("Jet", "Alex Grant", "Canada", riptide);

        Tournament capitalClash = seedTournament(
                "Capital Clash Invitational",
                "Regional invitational currently in playoff rounds.",
                "Valorant",
                "Washington, DC",
                LocalDate.of(2026, 9, 5),
                LocalDate.of(2026, 9, 12),
                TournamentStatus.ACTIVE,
                capitalLeague
        );

        Tournament campusOpen = seedTournament(
                "Campus Series Fall Open",
                "Open college competition with a seeded group stage.",
                "Rocket League",
                "Baltimore, MD",
                LocalDate.of(2026, 9, 12),
                LocalDate.of(2026, 9, 20),
                TournamentStatus.UPCOMING,
                campusLeague
        );

        seedTournament(
                "Mid-Atlantic Community Cup",
                "Community tournament with public match results.",
                "CS2",
                "Richmond, VA",
                LocalDate.of(2026, 8, 20),
                LocalDate.of(2026, 8, 24),
                TournamentStatus.COMPLETED,
                capitalLeague
        );

        seedMatch(
                nova,
                vanta,
                capitalClash,
                LocalDateTime.of(2026, 9, 8, 19, 30),
                "Main Stage",
                2,
                1,
                MatchStatus.IN_PROGRESS
        );

        seedMatch(
                vanta,
                eclipse,
                capitalClash,
                LocalDateTime.of(2026, 9, 7, 20, 30),
                "Main Stage",
                2,
                0,
                MatchStatus.COMPLETED
        );

        seedMatch(
                riptide,
                orion,
                campusOpen,
                LocalDateTime.of(2026, 9, 13, 18, 0),
                "Campus Arena",
                0,
                0,
                MatchStatus.SCHEDULED
        );

        seedMatch(
                apex,
                nova,
                capitalClash,
                LocalDateTime.of(2026, 9, 7, 19, 0),
                "Main Stage",
                1,
                2,
                MatchStatus.COMPLETED
        );
    }

    private League seedLeague(
            String name,
            String description,
            String game,
            String region,
            LocalDate startDate,
            LocalDate endDate,
            LeagueStatus status
    ) {
        Optional<League> existingDemo = leagueRepository.findAll().stream()
                .filter(League::isDemoData)
                .filter(league -> league.getName().equalsIgnoreCase(name))
                .findFirst();

        if (existingDemo.isPresent()) {
            return existingDemo.get();
        }

        if (leagueRepository.existsByName(name)) {
            return null;
        }

        return leagueRepository.save(League.builder()
                .name(name)
                .description(description)
                .game(game)
                .region(region)
                .startDate(startDate)
                .endDate(endDate)
                .status(status)
                .demoData(true)
                .build());
    }

    private Team seedTeam(String name, String game, String region, String coach, boolean active) {
        Optional<Team> existing = teamRepository.findByNameIgnoreCase(name);
        if (existing.isPresent()) {
            return existing.get().isDemoData() ? existing.get() : null;
        }

        return teamRepository.save(Team.builder()
                .name(name)
                .game(game)
                .region(region)
                .coach(coach)
                .active(active)
                .demoData(true)
                .build());
    }

    private Tournament seedTournament(
            String name,
            String description,
            String game,
            String location,
            LocalDate startDate,
            LocalDate endDate,
            TournamentStatus status,
            League league
    ) {
        if (league == null) {
            return null;
        }

        Optional<Tournament> existingDemo = tournamentRepository.findAll().stream()
                .filter(Tournament::isDemoData)
                .filter(tournament -> tournament.getName().equalsIgnoreCase(name))
                .findFirst();

        if (existingDemo.isPresent()) {
            return existingDemo.get();
        }

        return tournamentRepository.save(Tournament.builder()
                .name(name)
                .description(description)
                .game(game)
                .location(location)
                .startDate(startDate)
                .endDate(endDate)
                .status(status)
                .league(league)
                .demoData(true)
                .build());
    }

    private void seedPlayer(String gamerTag, String displayName, String country, Team team) {
        if (team == null || playerRepository.existsByGamerTag(gamerTag)) {
            return;
        }

        playerRepository.save(Player.builder()
                .gamerTag(gamerTag)
                .displayName(displayName)
                .game(team.getGame())
                .teamName(team.getName())
                .team(team)
                .country(country)
                .rosterRole(gamerTag.equals("Shadow") || gamerTag.equals("Nyx") || gamerTag.equals("Wave")
                        ? "CAPTAIN"
                        : "STARTER")
                .eligibilityVerified(true)
                .active(true)
                .build());
    }

    private void seedMatch(
            Team homeTeam,
            Team awayTeam,
            Tournament tournament,
            LocalDateTime scheduledAt,
            String venue,
            int homeScore,
            int awayScore,
            MatchStatus status
    ) {
        if (homeTeam == null || awayTeam == null || tournament == null) {
            return;
        }

        boolean alreadySeeded = matchRepository.findAll().stream()
                .filter(Match::isDemoData)
                .anyMatch(match -> match.getScheduledAt().equals(scheduledAt)
                        && match.getHomeTeam().getId().equals(homeTeam.getId())
                        && match.getAwayTeam().getId().equals(awayTeam.getId()));

        if (alreadySeeded) {
            return;
        }

        matchRepository.save(Match.builder()
                .homeTeam(homeTeam)
                .awayTeam(awayTeam)
                .tournament(tournament)
                .scheduledAt(scheduledAt)
                .venue(venue)
                .homeScore(homeScore)
                .awayScore(awayScore)
                .status(status)
                .demoData(true)
                .build());
    }
}