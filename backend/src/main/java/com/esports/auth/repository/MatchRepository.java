package com.esports.auth.repository;

import com.esports.auth.entity.Match;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MatchRepository extends JpaRepository<Match, Long> {
    boolean existsByHomeTeam_IdOrAwayTeam_Id(Long homeTeamId, Long awayTeamId);

    List<Match> findByHomeTeam_IdOrAwayTeam_IdOrderByScheduledAtAsc(
            Long homeTeamId, Long awayTeamId);
}
