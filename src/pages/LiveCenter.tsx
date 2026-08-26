import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import styles from './LiveCenter.module.css';

type LiveMatch = {
  id: number;
  game: string;
  event: string;
  leftTeam: string;
  leftInitial: string;
  rightTeam: string;
  rightInitial: string;
  score: string;
  detail: string;
};

const liveMatches: LiveMatch[] = [
  {
    id: 1,
    game: 'Valorant',
    event: 'Capital Clash',
    leftTeam: 'Nova',
    leftInitial: 'N',
    rightTeam: 'Apex',
    rightInitial: 'A',
    score: '2 : 1',
    detail: 'Map 3 • 11:42',
  },
  {
    id: 2,
    game: 'Rocket League',
    event: 'Campus Series',
    leftTeam: 'Orion',
    leftInitial: 'O',
    rightTeam: 'Riptide',
    rightInitial: 'R',
    score: '1 : 1',
    detail: 'Game 4 • OT',
  },
  {
    id: 3,
    game: 'CS2',
    event: 'Community Cup',
    leftTeam: 'Vanta',
    leftInitial: 'V',
    rightTeam: 'Eclipse',
    rightInitial: 'E',
    score: '9 : 7',
    detail: 'Map 2 • Round 17',
  },
  {
    id: 4,
    game: 'Overwatch 2',
    event: 'Open Scrim League',
    leftTeam: 'Falcon',
    leftInitial: 'F',
    rightTeam: 'Arcadia',
    rightInitial: 'A',
    score: '2 : 0',
    detail: 'Map 3 • 06:14',
  },
];

const metrics = [
  { label: 'Matches live', value: '7', note: 'Across 4 games' },
  { label: 'Current viewers', value: '11.8K', note: 'Published streams' },
  { label: 'Avg map margin', value: '3.4', note: 'Competitive balance' },
  { label: 'Upsets today', value: '5', note: 'Seed differential ≥ 6' },
];

export default function LiveCenter() {
  const [query, setQuery] = useState('');
  const [followedMatches, setFollowedMatches] = useState<number[]>([]);

  const filteredMatches = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return liveMatches;
    }

    return liveMatches.filter((match) =>
      [
        match.game,
        match.event,
        match.leftTeam,
        match.rightTeam,
        match.score,
        match.detail,
      ].some((value) => value.toLowerCase().includes(normalizedQuery)),
    );
  }, [query]);

  const toggleFollow = (matchId: number) => {
    setFollowedMatches((current) =>
      current.includes(matchId)
        ? current.filter((id) => id !== matchId)
        : [...current, matchId],
    );
  };

  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <header className={styles.pageHead}>
          <div className={styles.pageIntro}>
            <span className={styles.subtitle}>Public page</span>
            <h1 className={styles.title}>
              Live <span className={styles.gradientText}>match center.</span>
            </h1>
            <p className={styles.description}>
              A spectator-focused view for real-time scores, game state,
              streams, and event context.
            </p>
          </div>

          <label className={styles.searchBar}>
            <Search className={styles.searchIcon} size={17} aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search live matches"
              aria-label="Search live matches"
            />
          </label>
        </header>

        <section className={styles.liveGrid} aria-label="Live matches">
          {filteredMatches.map((match) => {
            const isFollowing = followedMatches.includes(match.id);

            return (
              <article key={match.id} className={`${styles.card} ${styles.accentCard}`}>
                <div className={styles.cardTopRow}>
                  <span className={styles.liveStatus}>
                    <span className={`${styles.dot} ${styles.livePulse}`} />
                    Live
                  </span>
                  <span className={styles.tag}>{match.game}</span>
                </div>

                <p className={styles.eventName}>{match.event}</p>

                <div className={styles.matchRow}>
                  <div className={styles.teamLine}>
                    <span className={styles.teamLogo}>{match.leftInitial}</span>
                    <strong>{match.leftTeam}</strong>
                  </div>

                  <span className={styles.score}>{match.score}</span>

                  <div className={`${styles.teamLine} ${styles.teamLineRight}`}>
                    <strong>{match.rightTeam}</strong>
                    <span className={styles.teamLogo}>{match.rightInitial}</span>
                  </div>
                </div>

                <div className={styles.cardBottomRow}>
                  <span className={styles.matchDetail}>{match.detail}</span>
                  <button
                    type="button"
                    className={`${styles.followButton} ${
                      isFollowing ? styles.following : ''
                    }`}
                    onClick={() => toggleFollow(match.id)}
                    aria-pressed={isFollowing}
                  >
                    {isFollowing ? 'Following' : 'Follow'}
                  </button>
                </div>
              </article>
            );
          })}
        </section>

        {filteredMatches.length === 0 && (
          <div className={styles.emptyState} role="status">
            No live matches match “{query}”.
          </div>
        )}

        <section className={styles.analyticsSection}>
          <div className={styles.sectionHead}>
            <div>
              <span className={styles.subtitle}>Public analytics</span>
              <h2>Live competition pulse</h2>
            </div>
          </div>

          <div className={styles.metricGrid}>
            {metrics.map((metric) => (
              <article key={metric.label} className={styles.metricCard}>
                <span className={styles.metricLabel}>{metric.label}</span>
                <strong>{metric.value}</strong>
                <small>{metric.note}</small>
              </article>
            ))}
          </div>
        </section>
      </div>

      <footer className={styles.footer}>
        Interactive frontend mock-up • Simulated esports and analytics data
      </footer>
    </div>
  );
}