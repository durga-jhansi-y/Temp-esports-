package com.esports.auth.service;

import com.esports.auth.dto.player.CreatePlayerRequest;
import com.esports.auth.dto.player.PlayerResponse;
import com.esports.auth.dto.player.UpdatePlayerRequest;
import com.esports.auth.entity.Player;
import com.esports.auth.exception.ResourceNotFoundException;
import com.esports.auth.repository.PlayerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class PlayerService {

    private final PlayerRepository playerRepository;

    public PlayerResponse createPlayer(CreatePlayerRequest request) {
        if (playerRepository.existsByGamerTag(request.getGamerTag())) {
            throw new IllegalArgumentException("Gamer tag is already taken: " + request.getGamerTag());
        }

        Player player = Player.builder()
                .gamerTag(request.getGamerTag())
                .displayName(request.getDisplayName())
                .game(request.getGame())
                .teamName(request.getTeamName())
                .country(request.getCountry())
                .active(request.getActive() == null || request.getActive())
                .build();

        return PlayerResponse.from(playerRepository.save(player));
    }

    @Transactional(readOnly = true)
    public List<PlayerResponse> getAllPlayers() {
        return playerRepository.findAll().stream()
                .map(PlayerResponse::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public PlayerResponse getPlayerById(Long id) {
        return PlayerResponse.from(findPlayerOrThrow(id));
    }

    public PlayerResponse updatePlayer(Long id, UpdatePlayerRequest request) {
        Player player = findPlayerOrThrow(id);

        if (request.getGamerTag() != null && !request.getGamerTag().equals(player.getGamerTag())) {
            if (playerRepository.existsByGamerTag(request.getGamerTag())) {
                throw new IllegalArgumentException("Gamer tag is already taken: " + request.getGamerTag());
            }
            player.setGamerTag(request.getGamerTag());
        }

        if (request.getDisplayName() != null) {
            player.setDisplayName(request.getDisplayName());
        }
        if (request.getGame() != null) {
            player.setGame(request.getGame());
        }
        if (request.getTeamName() != null) {
            player.setTeamName(request.getTeamName());
        }
        if (request.getCountry() != null) {
            player.setCountry(request.getCountry());
        }
        if (request.getActive() != null) {
            player.setActive(request.getActive());
        }

        return PlayerResponse.from(playerRepository.save(player));
    }

    public void deletePlayer(Long id) {
        findPlayerOrThrow(id);
        playerRepository.deleteById(id);
    }

    private Player findPlayerOrThrow(Long id) {
        return playerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Player", id));
    }
}
