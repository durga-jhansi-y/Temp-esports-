import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  getEsportsDataMode,
  setEsportsDataMode,
  type EsportsDataMode,
} from '../services/dataMode';
import { getMatchesByTeamId, type Match } from '../services/matchService';
import { getTeam, type Team } from '../services/teamService';
import styles from './TournamentsPage.module.css';

function formatDateTime(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString();
}

export default function TeamDetailPage() {
  const { id } = useParams();
  const teamId = Number(id);
  const [team, setTeam] = useState<Team | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [dataMode, setDataModeState] = useState<EsportsDataMode>(getEsportsDataMode);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      if (!Number.isFinite(teamId)) {
        setError('Invalid team ID.');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError('');
        const [teamResult, matchResult] = await Promise.all([
          getTeam(teamId),
          getMatchesByTeamId(teamId),
        ]);
        if (!cancelled) {
          setTeam(teamResult);
          setMatches(matchResult);
        }
      } catch (err) {
        if (!cancelled) {
          setTeam(null);
          setMatches([]);
          setError(err instanceof Error ? err.message : 'Failed to load team details.');
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
  }, [teamId, dataMode]);

  const changeDataMode = (mode: EsportsDataMode) => {
    setEsportsDataMode(mode);
    setDataModeState(mode);
  };

  if (isLoading) {
    return <div className={styles.pageShell}><main className={styles.wrap}><div className={styles.emptyState}>Loading team...</div></main></div>;
  }

  if (!team || error) {
    return (
      <div className={styles.pageShell}>
        <main className={styles.wrap}>
          <div className={styles.emptyState}>{error || 'Team not found.'}</div>
          <div className={styles.buttons} style={{ marginTop: 16 }}>
            <Link className={styles.buttonOutline} to="/teams">Back to teams</Link>
          </div>
        </main>
      </div>
    );
  }

  const wins = matches.filter((match) => {
    if (match.status !== 'COMPLETED') return false;
    const teamIsHome = match.homeTeamId === team.id;
    const teamScore = teamIsHome ? match.homeScore : match.awayScore;
    const opponentScore = teamIsHome ? match.awayScore : match.homeScore;
    return teamScore > opponentScore;
  }).length;

  const completed = matches.filter((match) => match.status === 'COMPLETED').length;

  return (
    <div className={styles.pageShell}>
      <main className={styles.wrap}>
        <div className={styles.pageHead}>
          <div className={styles.pageHeadCopy}>
            <div className={styles.inlineStatusRow}>
              <span className={`${styles.status} ${team.active ? styles.statusLive : ''}`}>
                {team.active ? 'Active' : 'Inactive'}
              </span>
              <span className={styles.tag}>{team.game}</span>
            </div>
            <h1>{team.name} <span className={styles.gradientText}>details.</span></h1>
            <p className={styles.muted}>
              Public team information and match history from /api/teams/{team.id} and /api/matches/team/{team.id}.
            </p>
          </div>

          <div className={styles.buttons}>
            <select
              className={styles.buttonOutline}
              aria-label="Team detail data source"
              value={dataMode}
              onChange={(event) => changeDataMode(event.target.value as EsportsDataMode)}
            >
              <option value="backend">Backend data only</option>
              <option value="backend-sample">Backend + sample data</option>
            </select>
            <Link className={styles.buttonOutline} to="/teams">Back to teams</Link>
          </div>
        </div>

        <div className={styles.gridFour}>
          <div className={styles.metric}><span>Game</span><strong>{team.game}</strong><small>Team title</small></div>
          <div className={styles.metric}><span>Region</span><strong>{team.region || '—'}</strong><small>Registered region</small></div>
          <div className={styles.metric}><span>Coach</span><strong>{team.coach || '—'}</strong><small>Team coach</small></div>
          <div className={styles.metric}><span>Completed record</span><strong>{wins}-{Math.max(0, completed - wins)}</strong><small>{completed} completed matches</small></div>
        </div>

        <section className={styles.tabPane} style={{ marginTop: 28 }}>
          <div className={`${styles.card} ${styles.accentCard}`}>
            <div className={styles.kpiRow}>
              <div>
                <h2>Team match history</h2>
                <p className={styles.muted}>Scheduled, live, and completed matches involving this team.</p>
              </div>
              <span className={styles.tag}>{matches.length} matches</span>
            </div>

            {matches.length === 0 ? (
              <div className={styles.emptyState} style={{ marginTop: 16 }}>No matches found for this team.</div>
            ) : (
              <div className={styles.tableWrap} style={{ marginTop: 12 }}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Match</th>
                      <th>Tournament</th>
                      <th>Score</th>
                      <th>Status</th>
                      <th>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {matches.map((match) => (
                      <tr className={styles.hoverableRow} key={match.id}>
                        <td>{formatDateTime(match.scheduledAt)}</td>
                        <td>{match.homeTeamName} vs {match.awayTeamName}</td>
                        <td>{match.tournamentName || 'Independent match'}</td>
                        <td>{match.homeScore} - {match.awayScore}</td>
                        <td><span className={`${styles.status} ${match.status === 'IN_PROGRESS' ? styles.statusLive : ''}`}>{match.status.replace('_', ' ')}</span></td>
                        <td><Link className={`${styles.buttonOutline} ${styles.buttonSmall}`} to={`/matches/${match.id}`}>View</Link></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        {dataMode === 'backend' ? 'Backend data only' : 'Backend + seeded sample data'}
      </footer>
    </div>
  );
}