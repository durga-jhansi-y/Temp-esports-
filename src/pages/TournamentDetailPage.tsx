import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  getEsportsDataMode,
  setEsportsDataMode,
  type EsportsDataMode,
} from '../services/dataMode';
import { getMatches, type Match } from '../services/matchService';
import {
  getTournament,
  getTournaments,
  type Tournament,
} from '../services/tournamentService';
import styles from './TournamentPages.module.css';

type TabName = 'overview' | 'matches' | 'participants' | 'analytics';

const tabs: { id: TabName; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'matches', label: 'Matches' },
  { id: 'participants', label: 'Participants' },
  { id: 'analytics', label: 'Public analytics' },
];

function formatDateTime(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString();
}

export default function TournamentDetailPage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<TabName>('overview');
  const [tournament, setTournament] = useState<Tournament | null>(null);
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

        let selected: Tournament;
        const parsedId = Number(id);

        if (id && Number.isFinite(parsedId)) {
          selected = await getTournament(parsedId);
        } else {
          const available = await getTournaments();
          if (available.length === 0) {
            throw new Error('No tournaments are available.');
          }
          selected = available[0];
        }

        const allMatches = await getMatches();
        const tournamentMatches = allMatches.filter(
          (match) => match.tournamentId === selected.id,
        );

        if (!cancelled) {
          setTournament(selected);
          setMatches(tournamentMatches);
        }
      } catch (err) {
        if (!cancelled) {
          setTournament(null);
          setMatches([]);
          setError(err instanceof Error ? err.message : 'Failed to load tournament details.');
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
  }, [id, dataMode]);

  const participants = useMemo(() => {
    const teams = new Map<number, string>();
    matches.forEach((match) => {
      teams.set(match.homeTeamId, match.homeTeamName);
      teams.set(match.awayTeamId, match.awayTeamName);
    });
    return [...teams.entries()].map(([teamId, name]) => ({ teamId, name }));
  }, [matches]);

  const changeDataMode = (mode: EsportsDataMode) => {
    setEsportsDataMode(mode);
    setDataModeState(mode);
  };

  if (isLoading) {
    return <div className={styles.pageShell}><main className={styles.wrap}><div className={styles.emptyState}>Loading tournament...</div></main></div>;
  }

  if (!tournament || error) {
    return (
      <div className={styles.pageShell}>
        <main className={styles.wrap}>
          <div className={styles.emptyState}>{error || 'Tournament not found.'}</div>
          <div className={styles.buttons} style={{ marginTop: 16 }}>
            <Link className={styles.buttonOutline} to="/tournaments">Back to tournaments</Link>
          </div>
        </main>
      </div>
    );
  }

  const completed = matches.filter((match) => match.status === 'COMPLETED').length;
  const live = matches.filter((match) => match.status === 'IN_PROGRESS').length;
  const scheduled = matches.filter((match) => match.status === 'SCHEDULED').length;
  const nextMatch = matches
    .filter((match) => match.status === 'SCHEDULED' || match.status === 'IN_PROGRESS')
    .sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime())[0];

  return (
    <div className={styles.pageShell}>
      <main className={styles.wrap}>
        <div className={styles.pageHead}>
          <div className={styles.pageHeadCopy}>
            <div className={styles.inlineStatusRow}>
              <span className={`${styles.status} ${tournament.status === 'ACTIVE' ? styles.statusLive : ''}`}>
                {tournament.status.replace('_', ' ')}
              </span>
              <span className={styles.tag}>{tournament.game}</span>
            </div>

            <h1>{tournament.name} <span className={styles.gradientText}>details.</span></h1>
            <p className={styles.muted}>
              {tournament.description || 'No description provided.'}
            </p>
          </div>

          <div className={styles.buttons}>
            <select
              className={styles.buttonOutline}
              aria-label="Tournament detail data source"
              value={dataMode}
              onChange={(event) => changeDataMode(event.target.value as EsportsDataMode)}
            >
              <option value="backend">Backend data only</option>
              <option value="backend-sample">Backend + sample data</option>
            </select>
            <Link className={styles.buttonOutline} to="/tournaments">Back to tournaments</Link>
          </div>
        </div>

        <div className={styles.tabBar} role="tablist" aria-label="Tournament details">
          {tabs.map((tab) => (
            <button
              aria-selected={activeTab === tab.id}
              className={activeTab === tab.id ? styles.activeTab : ''}
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              type="button"
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <section className={styles.tabPane}>
            <div className={styles.gridFour}>
              <div className={styles.metric}><span>League</span><strong>{tournament.leagueName}</strong><small>League #{tournament.leagueId}</small></div>
              <div className={styles.metric}><span>Location</span><strong>{tournament.location || 'Online / TBD'}</strong><small>Event location</small></div>
              <div className={styles.metric}><span>Participants</span><strong>{participants.length}</strong><small>Derived from matches</small></div>
              <div className={styles.metric}><span>Matches</span><strong>{matches.length}</strong><small>{completed} completed</small></div>
            </div>

            <div className={`${styles.gridTwo} ${styles.sectionSpacing}`}>
              <div className={`${styles.card} ${styles.accentCard}`}>
                <h2>Event schedule</h2>
                <p className={styles.muted}>{tournament.startDate} ??{tournament.endDate}</p>
                <div className={styles.kpiRow}>
                  <span className={styles.simNote}>Status</span>
                  <span className={`${styles.status} ${tournament.status === 'ACTIVE' ? styles.statusLive : ''}`}>{tournament.status}</span>
                </div>
              </div>

              <div className={`${styles.card} ${styles.accentCard}`}>
                <h2>Next active match</h2>
                {nextMatch ? (
                  <>
                    <p className={styles.muted}>{formatDateTime(nextMatch.scheduledAt)} ??{nextMatch.venue || 'Venue TBD'}</p>
                    <div className={styles.featuredMatch}>
                      <div className={styles.teamLine}><div className={styles.teamLogo}>{nextMatch.homeTeamName.charAt(0)}</div><b>{nextMatch.homeTeamName}</b></div>
                      <span className={styles.score}>{nextMatch.status === 'IN_PROGRESS' ? `${nextMatch.homeScore} - ${nextMatch.awayScore}` : 'VS'}</span>
                      <div className={`${styles.teamLine} ${styles.teamLineRight}`}><b>{nextMatch.awayTeamName}</b><div className={styles.teamLogo}>{nextMatch.awayTeamName.charAt(0)}</div></div>
                    </div>
                    <Link className={`${styles.buttonOutline} ${styles.buttonSmall}`} to={`/matches/${nextMatch.id}`}>View match</Link>
                  </>
                ) : (
                  <p className={styles.muted}>No scheduled or live match is currently available.</p>
                )}
              </div>
            </div>
          </section>
        )}

        {activeTab === 'matches' && (
          <section className={styles.tabPane}>
            <div className={`${styles.card} ${styles.accentCard}`}>
              {matches.length === 0 ? (
                <div className={styles.emptyState}>No matches are linked to this tournament.</div>
              ) : (
                <div className={styles.tableWrap}>
                  <table className={styles.table}>
                    <thead><tr><th>Date</th><th>Match</th><th>Score</th><th>Status</th><th>Venue</th><th>Details</th></tr></thead>
                    <tbody>
                      {matches.map((match) => (
                        <tr className={styles.hoverableRow} key={match.id}>
                          <td>{formatDateTime(match.scheduledAt)}</td>
                          <td>{match.homeTeamName} vs {match.awayTeamName}</td>
                          <td>{match.homeScore} - {match.awayScore}</td>
                          <td><span className={`${styles.status} ${match.status === 'IN_PROGRESS' ? styles.statusLive : ''}`}>{match.status.replace('_', ' ')}</span></td>
                          <td>{match.venue || 'TBD'}</td>
                          <td><Link className={`${styles.buttonOutline} ${styles.buttonSmall}`} to={`/matches/${match.id}`}>View</Link></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </section>
        )}

        {activeTab === 'participants' && (
          <section className={styles.tabPane}>
            <div className={styles.card}>
              {participants.length === 0 ? (
                <div className={styles.emptyState}>Participants will appear after matches are linked to this tournament.</div>
              ) : (
                <div className={styles.tableWrap}>
                  <table className={styles.table}>
                    <thead><tr><th>Team</th><th>Team ID</th><th>Details</th></tr></thead>
                    <tbody>
                      {participants.map((team) => (
                        <tr className={styles.hoverableRow} key={team.teamId}>
                          <td>{team.name}</td><td>{team.teamId}</td>
                          <td><Link className={`${styles.buttonOutline} ${styles.buttonSmall}`} to={`/teams/${team.teamId}`}>View team</Link></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </section>
        )}

        {activeTab === 'analytics' && (
          <section className={styles.tabPane}>
            <div className={styles.gridThree}>
              <div className={styles.metric}><span>Live matches</span><strong>{live}</strong><small>IN_PROGRESS</small></div>
              <div className={styles.metric}><span>Scheduled</span><strong>{scheduled}</strong><small>Upcoming matches</small></div>
              <div className={styles.metric}><span>Completed</span><strong>{completed}</strong><small>Finished matches</small></div>
            </div>
          </section>
        )}
      </main>

      <footer className={styles.footer}>
        {dataMode === 'backend' ? 'Backend data only ??/api/tournaments + /api/matches' : 'Backend API + seeded sample data'}
      </footer>
    </div>
  );
}
