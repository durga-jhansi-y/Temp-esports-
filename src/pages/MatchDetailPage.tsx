import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  getEsportsDataMode,
  setEsportsDataMode,
  type EsportsDataMode,
} from '../services/dataMode';
import { getMatch, type Match } from '../services/matchService';
import styles from './TournamentsPage.module.css';

function formatDateTime(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString();
}

export default function MatchDetailPage() {
  const { id } = useParams();
  const matchId = Number(id);
  const [match, setMatch] = useState<Match | null>(null);
  const [dataMode, setDataModeState] = useState<EsportsDataMode>(getEsportsDataMode);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      if (!Number.isFinite(matchId)) {
        setError('Invalid match ID.');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError('');
        const result = await getMatch(matchId);
        if (!cancelled) {
          setMatch(result);
        }
      } catch (err) {
        if (!cancelled) {
          setMatch(null);
          setError(err instanceof Error ? err.message : 'Failed to load match details.');
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
  }, [matchId, dataMode]);

  const changeDataMode = (mode: EsportsDataMode) => {
    setEsportsDataMode(mode);
    setDataModeState(mode);
  };

  if (isLoading) {
    return <div className={styles.pageShell}><main className={styles.wrap}><div className={styles.emptyState}>Loading match...</div></main></div>;
  }

  if (!match || error) {
    return (
      <div className={styles.pageShell}>
        <main className={styles.wrap}>
          <div className={styles.emptyState}>{error || 'Match not found.'}</div>
          <div className={styles.buttons} style={{ marginTop: 16 }}>
            <Link className={styles.buttonOutline} to="/live-center">Back to Live Center</Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.pageShell}>
      <main className={styles.wrap}>
        <div className={styles.pageHead}>
          <div className={styles.pageHeadCopy}>
            <div className={styles.inlineStatusRow}>
              <span className={`${styles.status} ${match.status === 'IN_PROGRESS' ? styles.statusLive : ''}`}>
                {match.status.replace('_', ' ')}
              </span>
              <span className={styles.tag}>{match.tournamentName || 'Independent match'}</span>
            </div>
            <h1>Match <span className={styles.gradientText}>details.</span></h1>
            <p className={styles.muted}>Public match information from /api/matches/{match.id}.</p>
          </div>

          <div className={styles.buttons}>
            <select
              className={styles.buttonOutline}
              aria-label="Match detail data source"
              value={dataMode}
              onChange={(event) => changeDataMode(event.target.value as EsportsDataMode)}
            >
              <option value="api">API data</option>
              <option value="mock">Mock data</option>
            </select>
            <Link className={styles.buttonOutline} to="/live-center">Back to Live Center</Link>
          </div>
        </div>

        <div className={styles.gridFour}>
          <div className={styles.metric}><span>Scheduled</span><strong>{formatDateTime(match.scheduledAt)}</strong><small>Match time</small></div>
          <div className={styles.metric}><span>Venue</span><strong>{match.venue || 'TBD'}</strong><small>Location</small></div>
          <div className={styles.metric}><span>Home score</span><strong>{match.homeScore}</strong><small>{match.homeTeamName}</small></div>
          <div className={styles.metric}><span>Away score</span><strong>{match.awayScore}</strong><small>{match.awayTeamName}</small></div>
        </div>

        <section className={styles.tabPane} style={{ marginTop: 28 }}>
          <div className={`${styles.card} ${styles.accentCard}`}>
            <div className={styles.featuredMatch}>
              <div className={styles.teamLine}>
                <div className={styles.teamLogo}>{match.homeTeamName.charAt(0).toUpperCase()}</div>
                <div>
                  <b>{match.homeTeamName}</b>
                  <div><Link className={`${styles.buttonOutline} ${styles.buttonSmall}`} to={`/teams/${match.homeTeamId}`}>Team details</Link></div>
                </div>
              </div>

              <span className={styles.score}>
                {match.status === 'SCHEDULED' ? 'VS' : `${match.homeScore} - ${match.awayScore}`}
              </span>

              <div className={`${styles.teamLine} ${styles.teamLineRight}`}>
                <div>
                  <b>{match.awayTeamName}</b>
                  <div><Link className={`${styles.buttonOutline} ${styles.buttonSmall}`} to={`/teams/${match.awayTeamId}`}>Team details</Link></div>
                </div>
                <div className={styles.teamLogo}>{match.awayTeamName.charAt(0).toUpperCase()}</div>
              </div>
            </div>

            {match.tournamentId && (
              <div className={styles.buttons} style={{ marginTop: 20 }}>
                <Link className={styles.buttonPrimary} to={`/tournaments/${match.tournamentId}`}>View tournament</Link>
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        {dataMode === 'api' ? 'Real backend data • /api/matches' : 'Mock testing data • API calls disabled'}
      </footer>
    </div>
  );
}