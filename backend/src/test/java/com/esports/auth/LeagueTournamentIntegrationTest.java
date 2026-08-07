package com.esports.auth;

import com.esports.auth.dto.AuthResponse;
import com.esports.auth.dto.LoginRequest;
import com.esports.auth.dto.RegisterRequest;
import com.esports.auth.dto.league.CreateLeagueRequest;
import com.esports.auth.dto.league.LeagueResponse;
import com.esports.auth.dto.league.UpdateLeagueRequest;
import com.esports.auth.dto.tournament.CreateTournamentRequest;
import com.esports.auth.dto.tournament.TournamentResponse;
import com.esports.auth.dto.tournament.UpdateTournamentRequest;
import com.esports.auth.entity.LeagueStatus;
import com.esports.auth.entity.TournamentStatus;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test") // uses H2 memory db if application-test.properties exists, otherwise default
public class LeagueTournamentIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    private String jwtToken;

    @BeforeEach
    public void setupAuth() throws Exception {
        // Register a user to get a token for POST/PUT/DELETE
        RegisterRequest registerReq = new RegisterRequest();
        // Use a unique email/username just in case tests share DB state (though they shouldn't with @Transactional or clean DB)
        String uniqueSuffix = System.currentTimeMillis() + "";
        registerReq.setUsername("testuser" + uniqueSuffix);
        registerReq.setEmail("testuser" + uniqueSuffix + "@example.com");
        registerReq.setPassword("Password123!");

        mockMvc.perform(post("/api/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(registerReq)));

        LoginRequest loginReq = new LoginRequest();
        loginReq.setEmail(registerReq.getEmail());
        loginReq.setPassword("Password123!");

        String loginResponse = mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(loginReq)))
                .andReturn().getResponse().getContentAsString();

        AuthResponse authResponse = objectMapper.readValue(loginResponse, AuthResponse.class);
        jwtToken = authResponse.getToken();
    }

    @Test
    public void testLeagueCrud() throws Exception {
        // 1. Create League
        CreateLeagueRequest createReq = new CreateLeagueRequest();
        createReq.setName("NA Championship " + System.currentTimeMillis());
        createReq.setDescription("A test league");
        createReq.setGame("Valorant");
        createReq.setRegion("North America");
        createReq.setStartDate(LocalDate.of(2026, 9, 1));
        createReq.setEndDate(LocalDate.of(2026, 12, 15));

        String createResStr = mockMvc.perform(post("/api/leagues")
                .header("Authorization", "Bearer " + jwtToken)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(createReq)))
                .andExpect(status().isCreated())
                .andReturn().getResponse().getContentAsString();

        LeagueResponse league = objectMapper.readValue(createResStr, LeagueResponse.class);
        assertThat(league.getId()).isNotNull();
        assertThat(league.getName()).isEqualTo(createReq.getName());
        assertThat(league.getStatus()).isEqualTo(LeagueStatus.UPCOMING);
        
        Long leagueId = league.getId();

        // 2. Get All Leagues (Public)
        String getAllResStr = mockMvc.perform(get("/api/leagues"))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();
        
        List<LeagueResponse> allLeagues = objectMapper.readValue(getAllResStr, new TypeReference<List<LeagueResponse>>() {});
        assertThat(allLeagues).isNotEmpty();

        // 3. Get League by ID (Public)
        mockMvc.perform(get("/api/leagues/" + leagueId))
                .andExpect(status().isOk());

        // 4. Update League
        UpdateLeagueRequest updateReq = new UpdateLeagueRequest();
        updateReq.setStatus(LeagueStatus.ACTIVE);
        
        String updateResStr = mockMvc.perform(put("/api/leagues/" + leagueId)
                .header("Authorization", "Bearer " + jwtToken)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updateReq)))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();

        LeagueResponse updatedLeague = objectMapper.readValue(updateResStr, LeagueResponse.class);
        assertThat(updatedLeague.getStatus()).isEqualTo(LeagueStatus.ACTIVE);
        assertThat(updatedLeague.getName()).isEqualTo(league.getName()); // unmodified

        // 5. Delete League
        mockMvc.perform(delete("/api/leagues/" + leagueId)
                .header("Authorization", "Bearer " + jwtToken))
                .andExpect(status().isNoContent());

        // 6. Verify Deletion
        mockMvc.perform(get("/api/leagues/" + leagueId))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testTournamentCrud() throws Exception {
        // Create a league first
        CreateLeagueRequest leagueReq = new CreateLeagueRequest();
        leagueReq.setName("EU Championship " + System.currentTimeMillis());
        leagueReq.setGame("Valorant");
        leagueReq.setRegion("Europe");
        leagueReq.setStartDate(LocalDate.of(2026, 9, 1));
        leagueReq.setEndDate(LocalDate.of(2026, 12, 15));

        String leagueResStr = mockMvc.perform(post("/api/leagues")
                .header("Authorization", "Bearer " + jwtToken)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(leagueReq)))
                .andReturn().getResponse().getContentAsString();
        
        LeagueResponse league = objectMapper.readValue(leagueResStr, LeagueResponse.class);
        Long leagueId = league.getId();

        // 1. Create Tournament
        CreateTournamentRequest tourneyReq = new CreateTournamentRequest();
        tourneyReq.setName("EU Open Qualifier");
        tourneyReq.setGame("Valorant");
        tourneyReq.setLocation("Berlin");
        tourneyReq.setStartDate(LocalDate.of(2026, 9, 10));
        tourneyReq.setEndDate(LocalDate.of(2026, 9, 15));
        tourneyReq.setLeagueId(leagueId);

        String tourneyResStr = mockMvc.perform(post("/api/tournaments")
                .header("Authorization", "Bearer " + jwtToken)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(tourneyReq)))
                .andExpect(status().isCreated())
                .andReturn().getResponse().getContentAsString();

        TournamentResponse tourney = objectMapper.readValue(tourneyResStr, TournamentResponse.class);
        assertThat(tourney.getId()).isNotNull();
        assertThat(tourney.getLeagueId()).isEqualTo(leagueId);
        Long tourneyId = tourney.getId();

        // 2. Get Tournaments by League ID
        String leagueTourneysStr = mockMvc.perform(get("/api/leagues/" + leagueId + "/tournaments"))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();
        
        List<TournamentResponse> leagueTourneys = objectMapper.readValue(leagueTourneysStr, new TypeReference<List<TournamentResponse>>() {});
        assertThat(leagueTourneys).hasSize(1);
        assertThat(leagueTourneys.get(0).getId()).isEqualTo(tourneyId);

        // 3. Update Tournament
        UpdateTournamentRequest updateReq = new UpdateTournamentRequest();
        updateReq.setStatus(TournamentStatus.ACTIVE);

        String updateResStr = mockMvc.perform(put("/api/tournaments/" + tourneyId)
                .header("Authorization", "Bearer " + jwtToken)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updateReq)))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();

        TournamentResponse updatedTourney = objectMapper.readValue(updateResStr, TournamentResponse.class);
        assertThat(updatedTourney.getStatus()).isEqualTo(TournamentStatus.ACTIVE);

        // 4. Delete Tournament
        mockMvc.perform(delete("/api/tournaments/" + tourneyId)
                .header("Authorization", "Bearer " + jwtToken))
                .andExpect(status().isNoContent());
    }

    @Test
    public void testInvalidDateRange() throws Exception {
        CreateLeagueRequest req = new CreateLeagueRequest();
        req.setName("Invalid League");
        req.setGame("CSGO");
        req.setRegion("Global");
        req.setStartDate(LocalDate.of(2026, 12, 1));
        req.setEndDate(LocalDate.of(2026, 11, 1)); // End before start

        mockMvc.perform(post("/api/leagues")
                .header("Authorization", "Bearer " + jwtToken)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isBadRequest()); // 400 Bad Request due to our IllegalStateException handler
    }

    @Test
    public void testCreateTournamentInvalidLeague() throws Exception {
        CreateTournamentRequest req = new CreateTournamentRequest();
        req.setName("Invalid Tourney");
        req.setGame("CSGO");
        req.setStartDate(LocalDate.of(2026, 1, 1));
        req.setEndDate(LocalDate.of(2026, 1, 5));
        req.setLeagueId(999999L); // non-existent

        mockMvc.perform(post("/api/tournaments")
                .header("Authorization", "Bearer " + jwtToken)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isNotFound()); // 404 Not Found due to ResourceNotFoundException
    }
}
