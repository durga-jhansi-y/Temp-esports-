import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import {
  getEsportsDataMode,
  setEsportsDataMode,
  type EsportsDataMode,
} from '../services/dataMode';
import { getMatches, type Match, type MatchStatus } from '../services/matchService';
import styles from './LiveCenter.module.css';

function formatDateTime(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString();
}

export default function LiveCenter() {
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | MatchStatus>('ALL');
  const [matches, setMatches] = useState<Match[]>([]);
  const [dataMode, setDataModeState] = useState<EsportsDataMode>(getEsportsDataMode);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        setIsLoading(true);
        setError('');
        const result = await getMatches();
        if (!cancelled) {
          setMatches(result);
        }
      } catch (err) {
        if (!cancelled) {
          setMatches([]);
          setError(err instanceof Error ? err.message : 'Failed to load matches.');
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

  const filteredMatches = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return matches.filter((match) => {
      const matchesStatus = statusFilter === 'ALL' || match.status === statusFilter;
      const searchable = [
        match.homeTeamName,
        match.awayTeamName,
        match.tournamentName ?? '',
        match.venue ?? '',
        match.status,
      ].join(' ').toLowerCase();

      return matchesStatus && (!normalizedQuery || searchable.includes(normalizedQuery));
    });
  }, [matches, query, statusFilter]);

  const metrics = useMemo(() => [
    { label: 'Matches loaded', value: String(matches.length), note: 'Current data source' },
    { label: 'Live now', value: String(matches.filter((match) => match.status === 'IN_PROGRESS').length), note: 'IN_PROGRESS' },
    { label: 'Scheduled', value: String(matches.filter((match) => match.status === 'SCHEDULED').length), note: 'Upcoming matches' },
    { label: 'Completed', value: String(matches.filter((match) => match.status === 'COMPLETED').length), note: 'Finished matches' },
  ], [matches]);

  const changeDataMode = (mode: EsportsDataMode) => {
    setEsportsDataMode(mode);
    setDataModeState(mode);
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
              Browse live, scheduled, and completed matches from /api/matches.
            </p>
          </div>

          <div className={styles.searchBar}>
            <Search className={styles.searchIcon} size={17} aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search teams, tournament, or venue"
              aria-label="Search matches"
            />
            <select
              aria-label="Filter matches by status"
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value as 'ALL' | MatchStatus)}
            >
              <option value="ALL">All statuses</option>
              <option value="IN_PROGRESS">Live</option>
              <option value="SCHEDULED">Scheduled</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
            <select
              aria-label="Match data source"
              value={dataMode}
              onChange={(event) => changeDataMode(event.target.value as EsportsDataMode)}
            >
              <option value="api">API data</option>
              <option value="mock">Mock data</option>
            </select>
          </div>
        </header>

        {error && <div className={styles.emptyState}>{error}</div>}

        {isLoading ? (
          <div className={styles.emptyState}>Loading matches...</div>
        ) : filteredMatches.length > 0 ? (
          <section className={styles.liveGrid} aria-label="Matches">
            {filteredMatches.map((match) => (
              <article key={match.id} className={`${styles.card} ${styles.accentCard}`}>
                <div className={styles.cardTopRow}>
                  <span className={match.status === 'IN_PROGRESS' ? styles.liveStatus : styles.tag}>
                    {match.status === 'IN_PROGRESS' && <span className={`${styles.dot} ${styles.livePulse}`} />}
                    {match.status.replace('_', ' ')}
                  </span>
                  <span className={styles.tag}>{match.tournamentName || 'Independent'}</span>
                </div>

                <p className={styles.eventName}>{formatDateTime(match.scheduledAt)}</p>

                <div className={styles.matchRow}>
                  <div className={styles.teamLine}>
                    <span className={styles.teamLogo}>{match.homeTeamName.charAt(0).toUpperCase()}</span>
                    <strong>{match.homeTeamName}</strong>
                  </div>

                  <span className={styles.score}>
                    {match.status === 'SCHEDULED' ? 'VS' : `${match.homeScore} : ${match.awayScore}`}
                  </span>

                  <div className={`${styles.teamLine} ${styles.teamLineRight}`}>
                    <strong>{match.awayTeamName}</strong>
                    <span className={styles.teamLogo}>{match.awayTeamName.charAt(0).toUpperCase()}</span>
                  </div>
                </div>

                <div className={styles.cardBottomRow}>
                  <span className={styles.matchDetail}>{match.venue || 'Venue TBD'}</span>
                  <Link className={styles.followButton} to={`/matches/${match.id}`}>View details</Link>
                </div>
              </article>
            ))}
          </section>
        ) : !error ? (
          <div className={styles.emptyState} role="status">
            {matches.length === 0
              ? `No matches are available in ${dataMode === 'api' ? 'the backend' : 'mock data'}.`
              : `No matches match “${query}”.`}
          </div>
        ) : null}

        <section className={styles.analyticsSection}>
          <div className={styles.sectionHead}>
            <div>
              <span className={styles.subtitle}>Public analytics</span>
              <h2>Competition pulse</h2>
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
        {dataMode === 'api' ? 'Real backend data • /api/matches' : 'Mock testing data • API calls disabled'}
      </footer>
    </div>
  );
}