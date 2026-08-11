package com.esports.auth.repository;

import com.esports.auth.entity.Tournament;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository for Tournament persistence.
 */
@Repository
public interface TournamentRepository extends JpaRepository<Tournament, Long> {

    /** Retrieve all tournaments belonging to a specific league. */
    List<Tournament> findByLeagueId(Long leagueId);
}
