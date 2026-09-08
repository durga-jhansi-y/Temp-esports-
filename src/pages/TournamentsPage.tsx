import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  getEsportsDataMode,
  setEsportsDataMode,
  type EsportsDataMode,
} from '../services/dataMode';
import {
  getTournaments,
  type Tournament,
  type TournamentStatus,
} from '../services/tournamentService';
import styles from './TournamentsPage.module.css';

function statusLabel(status: TournamentStatus) {
  return status.charAt(0) + status.slice(1).toLowerCase();
}

export default function TournamentsPage() {
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | TournamentStatus>('ALL');
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [dataMode, setDataModeState] = useState<EsportsDataMode>(getEsportsDataMode);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        setIsLoading(true);
        setError('');
        const result = await getTournaments();
        if (!cancelled) {
          setTournaments(result);
        }
      } catch (err) {
        if (!cancelled) {
          setTournaments([]);
          setError(err instanceof Error ? err.message : 'Failed to load tournaments.');
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    void load();
    return () => {
      cancelled = true;
    };
  }, [dataMode]);

  const filteredTournaments = useMemo(() => {
    const normalizedQuery = query.toLowerCase().trim();

    return tournaments.filter((tournament) => {
      const matchesStatus = statusFilter === 'ALL' || tournament.status === statusFilter;
      const searchableText = [
        tournament.name,
        tournament.game,
        tournament.description ?? '',
        tournament.location ?? '',
        tournament.leagueName,
        tournament.status,
      ].join(' ').toLowerCase();

      return matchesStatus && (!normalizedQuery || searchableText.includes(normalizedQuery));
    });
  }, [query, statusFilter, tournaments]);

  const changeDataMode = (mode: EsportsDataMode) => {
    setEsportsDataMode(mode);
    setDataModeState(mode);
  };

  return (
    <div className={styles.pageShell}>
      <main className={styles.wrap}>
        <div className={styles.pageHead}>
          <div className={styles.pageHeadCopy}>
            <span className={styles.subtitle}>Public page</span>
            <h1>Discover <span className={styles.gradientText}>tournaments.</span></h1>
            <p className={styles.muted}>
              Tournament discovery stays public while creation and editing live in the signed-in workspace.
            </p>
          </div>

          <div className={styles.buttons}>
            <Link className={styles.buttonPrimary} to="/tournament-manager">Manage tournaments</Link>
          </div>
        </div>

        <div className={styles.searchBar}>
          <input
            aria-label="Search tournaments"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search tournament, game, league, or location"
            type="search"
            value={query}
          />

          <select
            aria-label="Filter tournaments by status"
            onChange={(event) => setStatusFilter(event.target.value as 'ALL' | TournamentStatus)}
            value={statusFilter}
          >
            <option value="ALL">All statuses</option>
            <option value="ACTIVE">Active</option>
            <option value="UPCOMING">Upcoming</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>

          <select
            aria-label="Tournament data source"
            value={dataMode}
            onChange={(event) => changeDataMode(event.target.value as EsportsDataMode)}
          >
            <option value="api">API data</option>
            <option value="mock">Mock data</option>
          </select>
        </div>

        <section className={styles.tournamentSection}>
          {error && <div className={styles.emptyState}>{error}</div>}

          {isLoading ? (
            <div className={styles.emptyState}>Loading tournaments...</div>
          ) : filteredTournaments.length > 0 ? (
            <div className={styles.gridThree}>
              {filteredTournaments.map((tournament) => (
                <article className={`${styles.card} ${styles.accentCard}`} key={tournament.id}>
                  <div className={styles.kpiRow}>
                    <span className={`${styles.status} ${tournament.status === 'ACTIVE' ? styles.statusLive : ''}`}>
                      {statusLabel(tournament.status)}
                    </span>
                    <span className={styles.tag}>{tournament.game}</span>
                  </div>

                  <h2 className={styles.tournamentTitle}>{tournament.name}</h2>
                  <p className={styles.muted}>{tournament.description || 'No description provided.'}</p>

                  <div className={styles.tournamentStats}>
                    <div>
                      <span className={styles.simNote}>League</span>
                      <strong>{tournament.leagueName}</strong>
                    </div>
                    <div>
                      <span className={styles.simNote}>Location</span>
                      <strong>{tournament.location || 'Online / TBD'}</strong>
                    </div>
                    <div>
                      <span className={styles.simNote}>Dates</span>
                      <strong>{tournament.startDate} → {tournament.endDate}</strong>
                    </div>
                  </div>

                  <div className={styles.buttons}>
                    <Link className={`${styles.buttonPrimary} ${styles.buttonSmall}`} to={`/tournaments/${tournament.id}`}>
                      View event
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : !error ? (
            <div className={styles.emptyState}>
              {tournaments.length === 0
                ? `No tournaments are available in ${dataMode === 'api' ? 'the backend' : 'mock data'}.`
                : 'No tournaments match your current search and filter.'}
            </div>
          ) : null}
        </section>
      </main>

      <footer className={styles.footer}>
        {dataMode === 'api' ? 'Real backend data • /api/tournaments' : 'Mock testing data • API calls disabled'}
      </footer>
    </div>
  );
}