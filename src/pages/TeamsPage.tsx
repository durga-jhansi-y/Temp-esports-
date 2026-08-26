import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './TeamsPage.module.css';

type Team = {
  name: string;
  initials: string;
  game: string;
  record: string;
  rating: string;
  mapDiff: string;
};

const teams: Team[] = [
  {
    name: 'Nova',
    initials: 'N',
    game: 'Valorant',
    record: '18–3',
    rating: '1,842',
    mapDiff: '+14',
  },
  {
    name: 'Vanta GG',
    initials: 'V',
    game: 'Valorant',
    record: '16–5',
    rating: '1,760',
    mapDiff: '+9',
  },
  {
    name: 'Team Apex',
    initials: 'T',
    game: 'CS2',
    record: '15–6',
    rating: '1,692',
    mapDiff: '+7',
  },
  {
    name: 'Riptide',
    initials: 'R',
    game: 'Rocket League',
    record: '14–7',
    rating: '1,611',
    mapDiff: '+5',
  },
  {
    name: 'Eclipse',
    initials: 'E',
    game: 'Valorant',
    record: '13–8',
    rating: '1,574',
    mapDiff: '+4',
  },
  {
    name: 'Orion',
    initials: 'O',
    game: 'Overwatch 2',
    record: '12–9',
    rating: '1,510',
    mapDiff: '+2',
  },
];

export default function TeamsPage() {
  const [search, setSearch] = useState('');

  const filteredTeams = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return teams;
    }

    return teams.filter((team) =>
      `${team.name} ${team.game}`.toLowerCase().includes(query),
    );
  }, [search]);

  return (
    <div className={styles.page}>
      <main className={styles.wrap}>
        <header className={styles.pageHead}>
          <div className={styles.headingContent}>
            <span className={styles.subtitle}>Public page</span>

            <h1 className={styles.title}>
              Competitive <span className={styles.gradientText}>teams.</span>
            </h1>

            <p className={styles.description}>
              Browse rosters, records, rankings, and recent form without
              requiring a user account.
            </p>
          </div>

          <div className={styles.searchBar}>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search team or game"
              aria-label="Search team or game"
            />
          </div>
        </header>

        {filteredTeams.length > 0 ? (
          <section className={styles.teamGrid} aria-label="Competitive teams">
            {filteredTeams.map((team) => (
              <Link
                key={team.name}
                to="/team-profile"
                className={styles.teamCard}
                aria-label={`View ${team.name} team profile`}
              >
                <div className={styles.teamLine}>
                  <div className={styles.teamLogo}>{team.initials}</div>

                  <div className={styles.teamIdentity}>
                    <h2>{team.name}</h2>
                    <span className={styles.tag}>{team.game}</span>
                  </div>
                </div>

                <div className={styles.statsGrid}>
                  <div className={styles.statItem}>
                    <span>Record</span>
                    <strong>{team.record}</strong>
                  </div>

                  <div className={styles.statItem}>
                    <span>Rating</span>
                    <strong>{team.rating}</strong>
                  </div>

                  <div className={styles.statItem}>
                    <span>Map diff</span>
                    <strong className={styles.positive}>{team.mapDiff}</strong>
                  </div>
                </div>
              </Link>
            ))}
          </section>
        ) : (
          <div className={styles.emptyState}>
            No teams match “{search}”. Try a different team or game.
          </div>
        )}
      </main>

      <footer className={styles.footer}>
        Interactive frontend mock-up • Simulated esports and analytics data
      </footer>
    </div>
  );
}