import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Card,
  GradientText,
  Metric,
  PageHeader,
  SectionTitle,
  Status,
  workspaceStyles as s,
} from '../../components/workspace/WorkspaceUI';
import {
  getEsportsDataMode,
  setEsportsDataMode,
  type EsportsDataMode,
} from '../../services/dataMode';
import { getMatchesByTeamId, type Match } from '../../services/matchService';
import {
  getPlayers,
  updatePlayer,
  type Player,
  type RosterRole,
} from '../../services/playerService';
import {
  createTeam,
  getTeams,
  updateTeam,
  type Team,
} from '../../services/teamService';

const emptyForm = {
  name: '',
  game: '',
  region: '',
  coach: '',
  active: true,
};

type TeamTab = 'overview' | 'roster' | 'matches' | 'statistics' | 'eligibility';

function TeamWorkspacePage() {
  const navigate = useNavigate();
  const [teams, setTeams] = useState<Team[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [selectedTeamId, setSelectedTeamId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<TeamTab>('overview');
  const [addPlayerId, setAddPlayerId] = useState('');
  const [transferPlayerId, setTransferPlayerId] = useState('');
  const [transferTargetTeamId, setTransferTargetTeamId] = useState('');
  const [dataMode, setDataModeState] = useState<EsportsDataMode>(getEsportsDataMode);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const loadWorkspace = async () => {
    try {
      setIsLoading(true);
      setError('');
      const [loadedTeams, loadedPlayers] = await Promise.all([getTeams(), getPlayers()]);
      setTeams(loadedTeams);
      setPlayers(loadedPlayers);
      setSelectedTeamId((current) => {
        if (current && loadedTeams.some((team) => team.id === current)) return current;
        return loadedTeams[0]?.id ?? null;
      });
    } catch (err) {
      setTeams([]);
      setPlayers([]);
      setError(err instanceof Error ? err.message : 'Failed to load team workspace.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadWorkspace();
  }, [dataMode]);

  useEffect(() => {
    const loadTeamMatches = async () => {
      if (!selectedTeamId) {
        setMatches([]);
        return;
      }
      try {
        setMatches(await getMatchesByTeamId(selectedTeamId));
      } catch {
        setMatches([]);
      }
    };
    void loadTeamMatches();
  }, [selectedTeamId, dataMode]);

  const selectedTeam = teams.find((team) => team.id === selectedTeamId) ?? null;
  const roster = useMemo(
    () => selectedTeam ? players.filter((player) => player.teamName === selectedTeam.name) : [],
    [players, selectedTeam],
  );
  const freeAgents = useMemo(
    () => selectedTeam
      ? players.filter((player) => !player.teamName && player.game === selectedTeam.game)
      : [],
    [players, selectedTeam],
  );
  const transferTargets = useMemo(
    () => selectedTeam
      ? teams.filter((team) => team.id !== selectedTeam.id && team.game === selectedTeam.game)
      : [],
    [teams, selectedTeam],
  );

  const activeCount = teams.filter((team) => team.active).length;
  const gameCount = new Set(teams.map((team) => team.game)).size;
  const verifiedCount = roster.filter((player) => player.eligibilityVerified).length;
  const captains = roster.filter((player) => player.rosterRole === 'CAPTAIN').length;
  const benchCount = roster.filter((player) => player.rosterRole === 'BENCH').length;
  const completedMatches = matches.filter((match) => match.status === 'COMPLETED');
  const wins = selectedTeam ? completedMatches.filter((match) => {
    const isHome = match.homeTeamId === selectedTeam.id;
    return isHome ? match.homeScore > match.awayScore : match.awayScore > match.homeScore;
  }).length : 0;
  const losses = completedMatches.length - wins;
  const winRate = completedMatches.length ? Math.round((wins / completedMatches.length) * 100) : 0;

  const changeDataMode = (mode: EsportsDataMode) => {
    setEsportsDataMode(mode);
    setDataModeState(mode);
    setMessage('');
    setError('');
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const startEdit = (team: Team) => {
    setEditingId(team.id);
    setForm({
      name: team.name,
      game: team.game,
      region: team.region ?? '',
      coach: team.coach ?? '',
      active: team.active,
    });
    setMessage('');
    setError('');
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage('');
    setError('');

    if (!form.name.trim() || !form.game.trim()) {
      setError('Team name and game are required.');
      return;
    }

    try {
      const payload = {
        name: form.name.trim(),
        game: form.game.trim(),
        region: form.region.trim() || undefined,
        coach: form.coach.trim() || undefined,
        active: form.active,
      };

      if (editingId) {
        const updated = await updateTeam(editingId, payload);
        setMessage(`Updated ${updated.name}.`);
      } else {
        const created = await createTeam(payload);
        setMessage(`Created ${created.name}.`);
      }

      resetForm();
      await loadWorkspace();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save team.');
    }
  };

  const updateRosterPlayer = async (
    player: Player,
    patch: { teamName?: string; rosterRole?: RosterRole; eligibilityVerified?: boolean },
    successMessage: string,
  ) => {
    try {
      setError('');
      setMessage('');
      await updatePlayer(player.id, patch);
      setMessage(successMessage);
      await loadWorkspace();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to update roster.');
    }
  };

  const addPlayer = async () => {
    if (!selectedTeam || !addPlayerId) return;
    const player = players.find((item) => item.id === Number(addPlayerId));
    if (!player) return;
    await updateRosterPlayer(player, { teamName: selectedTeam.name, rosterRole: 'STARTER' }, `${player.gamerTag} added to ${selectedTeam.name}.`);
    setAddPlayerId('');
  };

  const transferPlayer = async () => {
    const player = roster.find((item) => item.id === Number(transferPlayerId));
    const target = teams.find((team) => team.id === Number(transferTargetTeamId));
    if (!player || !target) return;
    await updateRosterPlayer(player, { teamName: target.name, rosterRole: 'STARTER' }, `${player.gamerTag} transferred to ${target.name}.`);
    setTransferPlayerId('');
    setTransferTargetTeamId('');
  };

  const tabButton = (tab: TeamTab, label: string) => (
    <Button key={tab} small variant={activeTab === tab ? 'primary' : 'ghost'} onClick={() => setActiveTab(tab)}>{label}</Button>
  );

  return (
    <>
      <PageHeader
        eyebrow="Login required"
        title={<>Team <GradientText>workspace.</GradientText></>}
        description="Create teams and manage persistent rosters, roles, transfers, eligibility, matches, and performance from one organizer workspace."
      />

      <div className={s.gridThree}>
        <Metric label="Teams loaded" value={String(teams.length)} note={dataMode === 'backend' ? 'Backend API' : 'Backend + seeded sample data'} />
        <Metric label="Active teams" value={String(activeCount)} note={`${teams.length - activeCount} inactive`} />
        <Metric label="Games represented" value={String(gameCount)} note="Current team list" />
      </div>

      <section className={s.section}>
        <div className={s.gridTwo}>
          <Card accent>
            <div className={s.kpiRow}>
              <div>
                <h2>{editingId ? 'Edit team' : 'Create team'}</h2>
                <p className={s.muted}>All writes use the backend and require a valid login.</p>
              </div>
              <Status tone={dataMode === 'backend-sample' ? 'warning' : 'live'}>{dataMode === 'backend-sample' ? 'Sample data included' : 'Backend-only mode'}</Status>
            </div>

            <form className={s.formGrid} style={{ marginTop: 16 }} onSubmit={handleSubmit}>
              <div className={s.field}>
                <label htmlFor="team-data-mode">Data source</label>
                <select id="team-data-mode" value={dataMode} onChange={(event) => changeDataMode(event.target.value as EsportsDataMode)}>
                  <option value="backend">Backend data only</option>
                  <option value="backend-sample">Backend + sample data</option>
                </select>
              </div>

              <div className={s.field}><label htmlFor="team-name">Team name</label><input id="team-name" value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} /></div>
              <div className={s.field}><label htmlFor="team-game">Game</label><input id="team-game" value={form.game} onChange={(event) => setForm((current) => ({ ...current, game: event.target.value }))} /></div>
              <div className={s.field}><label htmlFor="team-region">Region</label><input id="team-region" value={form.region} onChange={(event) => setForm((current) => ({ ...current, region: event.target.value }))} /></div>
              <div className={s.field}><label htmlFor="team-coach">Coach</label><input id="team-coach" value={form.coach} onChange={(event) => setForm((current) => ({ ...current, coach: event.target.value }))} /></div>
              <div className={s.field}>
                <label htmlFor="team-active">Status</label>
                <select id="team-active" value={form.active ? 'active' : 'inactive'} onChange={(event) => setForm((current) => ({ ...current, active: event.target.value === 'active' }))}>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              {error && <div className={s.callout}>{error}</div>}
              {message && <div className={s.callout}>{message}</div>}

              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <Button type="submit">{editingId ? 'Update team' : 'Create team'}</Button>
                {editingId && <Button variant="outline" onClick={resetForm}>Cancel edit</Button>}
              </div>
            </form>
          </Card>

          <Card accent>
            <div className={s.kpiRow}>
              <div><h2>Team list</h2><p className={s.muted}>Choose Manage for roster operations or View for the public team page.</p></div>
              <Status>{isLoading ? 'Loading' : `${teams.length} teams`}</Status>
            </div>

            {isLoading ? (
              <p className={s.muted}>Loading teams...</p>
            ) : teams.length === 0 ? (
              <p className={s.muted}>No teams are available.</p>
            ) : (
              <div className={s.list} style={{ marginTop: 12 }}>
                {teams.map((team) => (
                  <div className={s.listRow} key={team.id} style={selectedTeamId === team.id ? { borderColor: 'rgba(122, 92, 255, .55)' } : undefined}>
                    <span>{team.name} • {team.game} • {team.region || 'No region'}</span>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      <Button small variant={selectedTeamId === team.id ? 'primary' : 'outline'} onClick={() => { setSelectedTeamId(team.id); setActiveTab('overview'); }}>Manage</Button>
                      <Button small variant="outline" onClick={() => startEdit(team)}>Edit</Button>
                      <Button small variant="ghost" onClick={() => navigate(`/teams/${team.id}`)}>View</Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </section>

      {selectedTeam && (
        <section className={s.section}>
          <Card accent>
            <SectionTitle
              title={`${selectedTeam.name} roster operations`}
              description={`${selectedTeam.game} · ${selectedTeam.region || 'No region'} · ${roster.length} rostered players`}
              right={<Status tone={selectedTeam.active ? 'live' : 'warning'}>{selectedTeam.active ? 'Active team' : 'Inactive team'}</Status>}
            />

            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', margin: '14px 0 18px' }}>
              {tabButton('overview', 'Overview')}
              {tabButton('roster', 'Roster')}
              {tabButton('matches', 'Matches')}
              {tabButton('statistics', 'Statistics')}
              {tabButton('eligibility', 'Eligibility')}
            </div>

            {activeTab === 'overview' && (
              <div className={s.gridFour}>
                <Metric label="Roster size" value={String(roster.length)} note={`${benchCount} benched`} />
                <Metric label="Captains" value={String(captains)} note="Leadership role" />
                <Metric label="Eligibility" value={`${verifiedCount}/${roster.length}`} note="Verified players" />
                <Metric label="Matches" value={String(matches.length)} note={`${completedMatches.length} completed`} />
              </div>
            )}

            {activeTab === 'roster' && (
              <>
                <div className={s.gridTwo}>
                  <div className={s.field}>
                    <label htmlFor="add-roster-player">Add free agent</label>
                    <select id="add-roster-player" value={addPlayerId} onChange={(event) => setAddPlayerId(event.target.value)}>
                      <option value="">Select player</option>
                      {freeAgents.map((player) => <option key={player.id} value={player.id}>{player.gamerTag} · {player.game}</option>)}
                    </select>
                    <div style={{ marginTop: 8 }}><Button small onClick={() => void addPlayer()}>+ Add player</Button></div>
                  </div>

                  <div className={s.field}>
                    <label htmlFor="transfer-player">Transfer player</label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: 8 }}>
                      <select id="transfer-player" value={transferPlayerId} onChange={(event) => setTransferPlayerId(event.target.value)}>
                        <option value="">Player</option>
                        {roster.map((player) => <option key={player.id} value={player.id}>{player.gamerTag}</option>)}
                      </select>
                      <select aria-label="Transfer destination" value={transferTargetTeamId} onChange={(event) => setTransferTargetTeamId(event.target.value)}>
                        <option value="">Destination</option>
                        {transferTargets.map((team) => <option key={team.id} value={team.id}>{team.name}</option>)}
                      </select>
                      <Button small variant="outline" onClick={() => void transferPlayer()}>Transfer</Button>
                    </div>
                  </div>
                </div>

                <div className={s.list} style={{ marginTop: 16 }}>
                  {roster.length === 0 ? <p className={s.muted}>No players are assigned to this team.</p> : roster.map((player) => (
                    <div className={s.listRow} key={player.id}>
                      <span>
                        <strong>{player.gamerTag}</strong> · {player.displayName} · {player.rosterRole} · {player.eligibilityVerified ? '✓ Eligible' : 'Eligibility pending'}
                      </span>
                      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                        {player.rosterRole !== 'CAPTAIN' && <Button small variant="outline" onClick={() => void updateRosterPlayer(player, { rosterRole: 'CAPTAIN' }, `${player.gamerTag} is now a captain.`)}>Make Captain</Button>}
                        <Button small variant="ghost" onClick={() => void updateRosterPlayer(player, { rosterRole: player.rosterRole === 'BENCH' ? 'STARTER' : 'BENCH' }, `${player.gamerTag} moved to ${player.rosterRole === 'BENCH' ? 'starter' : 'bench'}.`)}>{player.rosterRole === 'BENCH' ? 'Make Starter' : 'Bench'}</Button>
                        {!player.eligibilityVerified && <Button small variant="outline" onClick={() => void updateRosterPlayer(player, { eligibilityVerified: true }, `${player.gamerTag} eligibility verified.`)}>Verify</Button>}
                        <Button small variant="ghost" onClick={() => void updateRosterPlayer(player, { teamName: '', rosterRole: 'STARTER' }, `${player.gamerTag} removed from ${selectedTeam.name}.`)}>Remove</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {activeTab === 'matches' && (
              <div className={s.list}>
                {matches.length === 0 ? <p className={s.muted}>No matches are available for this team.</p> : matches.map((match) => (
                  <div className={s.listRow} key={match.id}>
                    <span>{new Date(match.scheduledAt).toLocaleString()} · {match.homeTeamName} {match.homeScore}–{match.awayScore} {match.awayTeamName} · {match.status.replace('_', ' ')}</span>
                    <Button small variant="ghost" onClick={() => navigate(`/matches/${match.id}`)}>Open</Button>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'statistics' && (
              <div className={s.gridFour}>
                <Metric label="Completed" value={String(completedMatches.length)} note="Recorded matches" />
                <Metric label="Wins" value={String(wins)} note="Completed match wins" />
                <Metric label="Losses" value={String(losses)} note="Completed match losses" />
                <Metric label="Win rate" value={`${winRate}%`} note="Completed matches" />
              </div>
            )}

            {activeTab === 'eligibility' && (
              <div className={s.list}>
                {roster.length === 0 ? <p className={s.muted}>No rostered players to verify.</p> : roster.map((player) => (
                  <div className={s.listRow} key={player.id}>
                    <span>{player.gamerTag} · {player.country || 'Country not provided'} · {player.rosterRole}</span>
                    {player.eligibilityVerified ? (
                      <Status tone="live">Verified</Status>
                    ) : (
                      <Button small variant="outline" onClick={() => void updateRosterPlayer(player, { eligibilityVerified: true }, `${player.gamerTag} eligibility verified.`)}>Verify eligibility</Button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </Card>
        </section>
      )}
    </>
  );
}

export default TeamWorkspacePage;