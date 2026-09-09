import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getLeague, getLeagues, type League } from '../services/leagueService';
import styles from './TournamentPages.module.css';

export default function LeagueLookupPage() {
  const [leagues, setLeagues] = useState<League[]>([]);
  const [selectedLeague, setSelectedLeague] = useState<League | null>(null);
  const [query, setQuery] = useState('');
  const [leagueId, setLeagueId] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const loadLeagues = async () => {
    try {
      setIsLoading(true);
      setError('');
      setLeagues(await getLeagues());
    } catch (err) {
      setLeagues([]);
      setError(err instanceof Error ? err.message : 'Failed to load leagues.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadLeagues();
  }, []);

  const filteredLeagues = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return leagues;

    return leagues.filter((league) =>
      [league.name, league.game, league.region, league.description ?? '', league.status]
        .join(' ')
        .toLowerCase()
        .includes(normalized),
    );
  }, [leagues, query]);

  const lookupById = async () => {
    const id = Number(leagueId);
    if (!Number.isFinite(id) || id <= 0) {
      setError('Enter a valid league ID.');
      return;
    }

    try {
      setError('');
      setSelectedLeague(await getLeague(id));
    } catch (err) {
      setSelectedLeague(null);
      setError(err instanceof Error ? err.message : 'League lookup failed.');
    }
  };

  return (
    <div className={styles.pageShell}>
      <main className={styles.wrap}>
        <div className={styles.pageHead}>
          <div className={styles.pageHeadCopy}>
            <span className={styles.subtitle}>Public page</span>
            <h1>Find your <span className={styles.gradientText}>league.</span></h1>
            <p className={styles.muted}>
              League information is public to browse. Creating or editing a league now requires sign-in.
            </p>
          </div>
          <div className={styles.buttons}>
            <Link className={styles.buttonPrimary} to="/league-manager">Create or manage a league</Link>
          </div>
        </div>

        <div className={styles.searchBar}>
          <input
            aria-label="Search leagues"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search league, game, region, or status"
          />
          <input
            aria-label="League ID"
            type="number"
            min="1"
            value={leagueId}
            onChange={(event) => setLeagueId(event.target.value)}
            placeholder="League ID"
          />
          <button className={`${styles.buttonOutline} ${styles.buttonSmall}`} type="button" onClick={lookupById}>
            Retrieve ID
          </button>
        </div>

        {error && <div className={styles.emptyState} style={{ marginTop: 18 }}>{error}</div>}

        {selectedLeague && (
          <section className={styles.tournamentSection}>
            <div className={`${styles.card} ${styles.accentCard}`}>
              <div className={styles.kpiRow}>
                <div>
                  <span className={styles.subtitle}>Retrieved league #{selectedLeague.id}</span>
                  <h2 className={styles.tournamentTitle}>{selectedLeague.name}</h2>
                </div>
                <span className={`${styles.status} ${selectedLeague.status === 'ACTIVE' ? styles.statusLive : ''}`}>{selectedLeague.status}</span>
              </div>
              <p className={styles.muted}>{selectedLeague.description || 'No description provided.'}</p>
              <div className={styles.tournamentStats}>
                <div><span className={styles.simNote}>Game</span><strong>{selectedLeague.game}</strong></div>
                <div><span className={styles.simNote}>Region</span><strong>{selectedLeague.region}</strong></div>
                <div><span className={styles.simNote}>Tournaments</span><strong>{selectedLeague.tournamentCount}</strong></div>
              </div>
              <p className={styles.muted} style={{ marginTop: 16 }}>
                {selectedLeague.startDate} ??{selectedLeague.endDate}
              </p>
            </div>
          </section>
        )}

        <section className={styles.tournamentSection}>
          {isLoading ? (
            <div className={styles.emptyState}>Loading leagues...</div>
          ) : filteredLeagues.length > 0 ? (
            <div className={styles.gridThree}>
              {filteredLeagues.map((league) => (
                <article className={`${styles.card} ${styles.accentCard}`} key={league.id}>
                  <div className={styles.kpiRow}>
                    <span className={`${styles.status} ${league.status === 'ACTIVE' ? styles.statusLive : ''}`}>{league.status}</span>
                    <span className={styles.tag}>{league.game}</span>
                  </div>
                  <h2 className={styles.tournamentTitle}>{league.name}</h2>
                  <p className={styles.muted}>{league.description || 'No description provided.'}</p>
                  <div className={styles.tournamentStats}>
                    <div><span className={styles.simNote}>Region</span><strong>{league.region}</strong></div>
                    <div><span className={styles.simNote}>Tournaments</span><strong>{league.tournamentCount}</strong></div>
                    <div><span className={styles.simNote}>League ID</span><strong>{league.id}</strong></div>
                  </div>
                  <div className={styles.buttons}>
                    <button className={`${styles.buttonOutline} ${styles.buttonSmall}`} type="button" onClick={() => setSelectedLeague(league)}>
                      View details
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : !error ? (
            <div className={styles.emptyState}>No leagues match your search.</div>
          ) : null}
        </section>
      </main>

      <footer className={styles.footer}>Public league retrieval ??/api/leagues</footer>
    </div>
  );
}
