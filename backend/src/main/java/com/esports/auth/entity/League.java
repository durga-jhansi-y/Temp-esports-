package com.esports.auth.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

/**
 * League entity — represents a competitive esports league.
 *
 * Relationship:
 *   One League → Many Tournaments (bidirectional, tournaments side owns the FK).
 *
 * Cascade note:
 *   No CascadeType.REMOVE — deleting a League does NOT automatically delete
 *   its Tournaments. The service layer must handle this explicitly if needed.
 */
@Entity
@Table(name = "leagues")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class League {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(length = 500)
    private String description;

    @Column(nullable = false, length = 100)
    private String game;

    @Column(nullable = false, length = 100)
    private String region;

    @Column(nullable = false)
    private LocalDate startDate;

    @Column(nullable = false)
    private LocalDate endDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    @Builder.Default
    private LeagueStatus status = LeagueStatus.UPCOMING;

    /**
     * Tournaments belonging to this league.
     * mappedBy = "league" means Tournament.league is the owning side (holds the FK).
     * No cascade — tournaments must be deleted separately.
     */
    @OneToMany(mappedBy = "league", fetch = FetchType.LAZY)
    @Builder.Default
    private List<Tournament> tournaments = new ArrayList<>();
}
