import { useEffect, useMemo, useState } from 'react';
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

function initials(value: string) {
  return value
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('');
}

function matchResult(match: Match, teamId: number): 'W' | 'L' | 'D' | null {
  if (match.status !== 'COMPLETED') return null;

  const isHome = match.homeTeamId === teamId;
  const teamScore = isHome ? match.homeScore : match.awayScore;
  const opponentScore = isHome ? match.awayScore : match.homeScore;

  if (teamScore === opponentScore) return 'D';
  return teamScore > opponentScore ? 'W' : 'L';
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
        const [teamResult, matchResultData] = await Promise.all([
          getTeam(teamId),
          getMatchesByTeamId(teamId),
        ]);
        if (!cancelled) {
          setTeam(teamResult);
          setMatches(matchResultData);
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

  const completedMatches = useMemo(
    () => matches
      .filter((match) => match.status === 'COMPLETED')
      .sort((a, b) => new Date(b.scheduledAt).getTime() - new Date(a.scheduledAt).getTime()),
    [matches],
  );

  const results = useMemo(
    () => completedMatches
      .map((match) => matchResult(match, teamId))
      .filter((result): result is 'W' | 'L' | 'D' => result !== null),
    [completedMatches, teamId],
  );

  const wins = results.filter((result) => result === 'W').length;
  const losses = results.filter((result) => result === 'L').length;
  const winRate = results.length === 0 ? 0 : Math.round((wins / results.length) * 100);
  const winStreak = results.findIndex((result) => result !== 'W');
  const currentWinStreak = results.length === 0 ? 0 : winStreak === -1 ? results.length : winStreak;
  const recentForm = results.slice(0, 5);

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

  const roster = team.players ?? [];

  return (
    <div className={styles.pageShell}>
      <main className={styles.wrap}>
        <div className={styles.profileActions}>
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

        <section className={styles.teamProfileHero}>
          <div className={styles.largeTeamLogo} aria-hidden="true">{initials(team.name)}</div>
          <div className={styles.teamProfileCopy}>
            <div className={styles.inlineStatusRow}>
              <span className={`${styles.status} ${team.active ? styles.statusLive : ''}`}>
                {team.active ? 'Active team' : 'Inactive team'}
              </span>
              <span className={styles.tag}>{team.game}</span>
            </div>
            <p className={styles.teamEyebrow}>Team profile</p>
            <h1>{team.name}</h1>
            <p className={styles.muted}>
              {team.game} • {team.region || 'Region not listed'}
              {team.coach ? ` • Coach ${team.coach}` : ''}
            </p>
          </div>
        </section>

        <div className={`${styles.gridFour} ${styles.teamMetrics}`}>
          <div className={styles.metric}><span>Record</span><strong>{wins}-{losses}</strong><small>{results.length} completed matches</small></div>
          <div className={styles.metric}><span>Win rate</span><strong>{winRate}%</strong><small>Completed match results</small></div>
          <div className={styles.metric}><span>Win streak</span><strong>{currentWinStreak}</strong><small>Current consecutive wins</small></div>
          <div className={styles.metric}><span>Roster</span><strong>{roster.length}</strong><small>Players linked to team</small></div>
        </div>

        <div className={`${styles.gridTwo} ${styles.sectionSpacing}`}>
          <section className={`${styles.card} ${styles.accentCard}`}>
            <div className={styles.kpiRow}>
              <div>
                <h2>Roster</h2>
                <p className={styles.muted}>Players linked through the existing Team ↔ Player relationship.</p>
              </div>
              <span className={styles.tag}>{roster.length} players</span>
            </div>

            {roster.length === 0 ? (
              <div className={styles.emptyState} style={{ marginTop: 16 }}>No players are linked to this team yet.</div>
            ) : (
              <div className={styles.rosterGrid}>
                {roster.map((player) => (
                  <article className={styles.rosterPlayer} key={player.id}>
                    <div className={styles.playerAvatar} aria-hidden="true">{initials(player.gamerTag)}</div>
                    <div>
                      <strong>{player.gamerTag}</strong>
                      <span>{player.displayName}</span>
                    </div>
                    <small>{player.country || '—'}</small>
                  </article>
                ))}
              </div>
            )}
          </section>

          <section className={`${styles.card} ${styles.accentCard}`}>
            <h2>Recent form</h2>
            <p className={styles.muted}>Most recent completed matches, newest first.</p>
            {recentForm.length === 0 ? (
              <div className={styles.emptyState} style={{ marginTop: 16 }}>No completed results are available yet.</div>
            ) : (
              <div className={styles.formRow} aria-label="Recent match form">
                {recentForm.map((result, index) => (
                  <span
                    className={`${styles.formBadge} ${result === 'W' ? styles.formWin : result === 'L' ? styles.formLoss : styles.formDraw}`}
                    key={`${result}-${index}`}
                  >
                    {result}
                  </span>
                ))}
              </div>
            )}
          </section>
        </div>

        <section className={styles.tabPane} style={{ marginTop: 18 }}>
          <div className={`${styles.card} ${styles.accentCard}`}>
            <div className={styles.kpiRow}>
              <div>
                <h2>Match history</h2>
                <p className={styles.muted}>Scheduled, live, and completed matches involving {team.name}.</p>
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