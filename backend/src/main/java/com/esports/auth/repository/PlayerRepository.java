package com.esports.auth.repository;

import com.esports.auth.entity.Player;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlayerRepository extends JpaRepository<Player, Long> {

    boolean existsByGamerTag(String gamerTag);
}

