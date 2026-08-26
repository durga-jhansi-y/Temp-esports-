import { useMemo, useState } from 'react';
import styles from './RankingsPage.module.css';

type RankingRow = {
  rank: number;
  initial: string;
  team: string;
  record: string;
  rating: number;
  movement: number;
  form: number;
};

const rankings: RankingRow[] = [
  {
    rank: 1,
    initial: 'T',
    team: 'Team Nova',
    record: '18–3',
    rating: 1842,
    movement: 2,
    form: 94,
  },
  {
    rank: 2,
    initial: 'V',
    team: 'Vanta GG',
    record: '16–5',
    rating: 1760,
    movement: 0,
    form: 88,
  },
  {
    rank: 3,
    initial: 'T',
    team: 'Team Apex',
    record: '15–6',
    rating: 1692,
    movement: 1,
    form: 82,
  },
  {
    rank: 4,
    initial: 'R',
    team: 'Riptide',
    record: '14–7',
    rating: 1611,
    movement: -2,
    form: 76,
  },
  {
    rank: 5,
    initial: 'E',
    team: 'Eclipse',
    record: '13–8',
    rating: 1574,
    movement: 3,
    form: 72,
  },
  {
    rank: 6,
    initial: 'O',
    team: 'Orion',
    record: '12–9',
    rating: 1510,
    movement: -1,
    form: 68,
  },
];

function RankingsPage() {
  const [search, setSearch] = useState('');

  const filteredRankings = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return rankings;
    }

    return rankings.filter((row) =>
      [
        row.rank.toString(),
        row.team,
        row.record,
        row.rating.toString(),
        row.movement.toString(),
      ].some((value) => value.toLowerCase().includes(query)),
    );
  }, [search]);

  const movementContent = (movement: number) => {
    if (movement > 0) {
      return <span className={styles.up}>▲ {movement}</span>;
    }

    if (movement < 0) {
      return <span className={styles.down}>▼ {Math.abs(movement)}</span>;
    }

    return <span className={styles.neutral}>—</span>;
  };

  return (
    <div className={styles.page}>
      <main className={styles.wrap}>
        <section className={styles.pageHead}>
          <div className={styles.headingCopy}>
            <span className={styles.subtitle}>Public analytics</span>

            <h1>
              League <span className={styles.gradientText}>rankings.</span>
            </h1>

            <p className={styles.muted}>
              Public leaderboard combining results, opponent strength, recent
              form, and match differential.
            </p>
          </div>

          <label className={styles.searchBar}>
            <span className={styles.searchIcon} aria-hidden="true">
              ⌕
            </span>

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search ranking"
              aria-label="Search rankings"
            />
          </label>
        </section>

        <section
          className={styles.metricGrid}
          aria-label="Ranking summary"
        >
          <article className={styles.metric}>
            <span>Teams ranked</span>
            <strong>128</strong>
            <small>Across active leagues</small>
          </article>

          <article className={styles.metric}>
            <span>Rating leader</span>
            <strong>1,842</strong>
            <small>Team Nova</small>
          </article>

          <article className={styles.metric}>
            <span>Largest move</span>
            <strong>+7</strong>
            <small>This week</small>
          </article>
        </section>

        <section className={`${styles.card} ${styles.accentCard}`}>
          <div className={styles.tableWrap}>
            <table className={styles.rankingTable}>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Team</th>
                  <th>Record</th>
                  <th>Rating</th>
                  <th>7d move</th>
                  <th>Form score</th>
                </tr>
              </thead>

              <tbody>
                {filteredRankings.map((row) => (
                  <tr key={row.rank}>
                    <td className={styles.rank}>
                      {row.rank}
                    </td>

                    <td>
                      <div className={styles.teamLine}>
                        <div
                          className={styles.teamLogo}
                          aria-hidden="true"
                        >
                          {row.initial}
                        </div>

                        <strong>{row.team}</strong>
                      </div>
                    </td>

                    <td>{row.record}</td>

                    <td>
                      {row.rating.toLocaleString()}
                    </td>

                    <td>
                      {movementContent(row.movement)}
                    </td>

                    <td>
                      <div
                        className={styles.progress}
                        aria-label={`${row.team} form score ${row.form}%`}
                      >
                        <span
                          style={{
                            width: `${row.form}%`,
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredRankings.length === 0 && (
              <div className={styles.emptyState}>
                No rankings match “{search}”.
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        Interactive frontend mock-up • Simulated esports and analytics data
      </footer>
    </div>
  );
}

export default RankingsPage;