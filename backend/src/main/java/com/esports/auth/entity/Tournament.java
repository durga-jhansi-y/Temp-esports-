package com.esports.auth.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

/**
 * Tournament entity — represents a single tournament within a League.
 *
 * Relationship:
 *   Many Tournaments → One League (this side owns the foreign key: league_id).
 *
 * JSON recursion prevention:
 *   TournamentResponse DTO exposes leagueId (Long) instead of the full League object,
 *   so bidirectional serialization cycles cannot occur.
 */
@Entity
@Table(name = "tournaments")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Tournament {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(length = 500)
    private String description;

    @Column(nullable = false, length = 100)
    private String game;

    @Column(length = 200)
    private String location;

    @Column(nullable = false)
    private LocalDate startDate;

    @Column(nullable = false)
    private LocalDate endDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    @Builder.Default
    private TournamentStatus status = TournamentStatus.UPCOMING;

    /**
     * The League this tournament belongs to.
     * This side owns the foreign key column (league_id in the tournaments table).
     */
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "league_id", nullable = false)
    private League league;
}
