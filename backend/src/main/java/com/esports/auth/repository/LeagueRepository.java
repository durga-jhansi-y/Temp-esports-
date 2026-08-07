package com.esports.auth.repository;

import com.esports.auth.entity.League;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository for League persistence.
 */
@Repository
public interface LeagueRepository extends JpaRepository<League, Long> {

    /** Check for duplicate league names. */
    boolean existsByName(String name);
}
