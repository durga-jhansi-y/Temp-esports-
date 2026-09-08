import { useEffect, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Card,
  GradientText,
  Metric,
  PageHeader,
  Status,
  workspaceStyles as s,
} from '../../components/workspace/WorkspaceUI';
import {
  getEsportsDataMode,
  setEsportsDataMode,
  type EsportsDataMode,
} from '../../services/dataMode';
import { getLeagues, type League } from '../../services/leagueService';
import {
  createTournament,
  getTournaments,
  updateTournament,
  type Tournament,
  type TournamentStatus,
} from '../../services/tournamentService';

const emptyForm = {
  name: '',
  description: '',
  game: '',
  location: '',
  startDate: '',
  endDate: '',
  leagueId: '',
  status: 'UPCOMING' as TournamentStatus,
};

function TournamentManagerPage() {
  const navigate = useNavigate();
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [leagues, setLeagues] = useState<League[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [dataMode, setDataModeState] = useState<EsportsDataMode>(getEsportsDataMode);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const loadData = async () => {
    try {
      setIsLoading(true);
      setError('');
      const [tournamentResult, leagueResult] = await Promise.all([
        getTournaments(),
        getLeagues(),
      ]);
      setTournaments(tournamentResult);
      setLeagues(leagueResult);
    } catch (err) {
      setTournaments([]);
      setLeagues([]);
      setError(err instanceof Error ? err.message : 'Failed to load tournament data.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadData();
  }, [dataMode]);

  const changeDataMode = (mode: EsportsDataMode) => {
    setEsportsDataMode(mode);
    setDataModeState(mode);
    setEditingId(null);
    setForm(emptyForm);
    setMessage('');
    setError('');
  };

  const resetForm = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  const startEdit = (tournament: Tournament) => {
    setEditingId(tournament.id);
    setForm({
      name: tournament.name,
      description: tournament.description ?? '',
      game: tournament.game,
      location: tournament.location ?? '',
      startDate: tournament.startDate,
      endDate: tournament.endDate,
      leagueId: String(tournament.leagueId),
      status: tournament.status,
    });
    setMessage('');
    setError('');
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage('');
    setError('');

    if (!form.name.trim() || !form.game.trim() || !form.startDate || !form.endDate || !form.leagueId) {
      setError('Name, game, start date, end date, and league are required.');
      return;
    }

    if (form.endDate < form.startDate) {
      setError('End date cannot be before start date.');
      return;
    }

    const leagueId = Number(form.leagueId);
    if (!Number.isFinite(leagueId)) {
      setError('Select a valid league.');
      return;
    }

    try {
      const basePayload = {
        name: form.name.trim(),
        description: form.description.trim() || undefined,
        game: form.game.trim(),
        location: form.location.trim() || undefined,
        startDate: form.startDate,
        endDate: form.endDate,
        leagueId,
      };

      if (editingId) {
        const updated = await updateTournament(editingId, { ...basePayload, status: form.status });
        setMessage(`Updated ${updated.name}.`);
      } else {
        const created = await createTournament(basePayload);
        setMessage(`Created ${created.name}.`);
      }

      resetForm();
      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save tournament.');
    }
  };

  const activeCount = tournaments.filter((item) => item.status === 'ACTIVE').length;
  const upcomingCount = tournaments.filter((item) => item.status === 'UPCOMING').length;
  const completedCount = tournaments.filter((item) => item.status === 'COMPLETED').length;

  return (
    <>
      <PageHeader
        eyebrow="Login required"
        title={<>Tournament <GradientText>manager.</GradientText></>}
        description="Create and edit tournaments through /api/tournaments while keeping public tournament discovery and details outside the workspace."
      />

      <div className={s.gridFour}>
        <Metric label="Total" value={String(tournaments.length)} note={dataMode === 'backend' ? 'Backend API' : 'Backend + sample data'} />
        <Metric label="Active" value={String(activeCount)} note="Currently running" />
        <Metric label="Upcoming" value={String(upcomingCount)} note="Scheduled next" />
        <Metric label="Completed" value={String(completedCount)} note="Finished events" />
      </div>

      <section className={s.section}>
        <div className={s.gridTwo}>
          <Card accent>
            <div className={s.kpiRow}>
              <div>
                <h2>{editingId ? 'Edit tournament' : 'Create tournament'}</h2>
                <p className={s.muted}>All writes use the backend and require authentication for POST and PUT requests.</p>
              </div>
              <Status tone={dataMode === 'backend-sample' ? 'warning' : 'live'}>{dataMode === 'backend-sample' ? 'Sample data included' : 'Backend-only mode'}</Status>
            </div>

            <form className={s.formGrid} style={{ marginTop: 16 }} onSubmit={handleSubmit}>
              <div className={s.field}>
                <label htmlFor="tournament-data-mode">Data source</label>
                <select id="tournament-data-mode" value={dataMode} onChange={(event) => changeDataMode(event.target.value as EsportsDataMode)}>
                  <option value="backend">Backend data only</option>
                  <option value="backend-sample">Backend + sample data</option>
                </select>
              </div>

              <div className={s.field}><label htmlFor="tournament-name">Name</label><input id="tournament-name" value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} /></div>
              <div className={s.field}><label htmlFor="tournament-description">Description</label><textarea id="tournament-description" rows={3} value={form.description} onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))} /></div>
              <div className={s.field}><label htmlFor="tournament-game">Game</label><input id="tournament-game" value={form.game} onChange={(event) => setForm((current) => ({ ...current, game: event.target.value }))} /></div>
              <div className={s.field}><label htmlFor="tournament-location">Location</label><input id="tournament-location" value={form.location} onChange={(event) => setForm((current) => ({ ...current, location: event.target.value }))} /></div>
              <div className={s.gridTwo}>
                <div className={s.field}><label htmlFor="tournament-start">Start date</label><input id="tournament-start" type="date" value={form.startDate} onChange={(event) => setForm((current) => ({ ...current, startDate: event.target.value }))} /></div>
                <div className={s.field}><label htmlFor="tournament-end">End date</label><input id="tournament-end" type="date" value={form.endDate} onChange={(event) => setForm((current) => ({ ...current, endDate: event.target.value }))} /></div>
              </div>
              <div className={s.field}>
                <label htmlFor="tournament-league">League</label>
                <select id="tournament-league" value={form.leagueId} onChange={(event) => setForm((current) => ({ ...current, leagueId: event.target.value }))}>
                  <option value="">Select a league</option>
                  {leagues.map((league) => <option key={league.id} value={league.id}>{league.name} (#{league.id})</option>)}
                </select>
              </div>
              {editingId && (
                <div className={s.field}>
                  <label htmlFor="tournament-status">Status</label>
                  <select id="tournament-status" value={form.status} onChange={(event) => setForm((current) => ({ ...current, status: event.target.value as TournamentStatus }))}>
                    <option value="UPCOMING">Upcoming</option>
                    <option value="ACTIVE">Active</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="CANCELLED">Cancelled</option>
                  </select>
                </div>
              )}

              {error && <div className={s.callout}>{error}</div>}
              {message && <div className={s.callout}>{message}</div>}

              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <Button type="submit">{editingId ? 'Update tournament' : 'Create tournament'}</Button>
                {editingId && <Button variant="outline" onClick={resetForm}>Cancel edit</Button>}
              </div>
            </form>
          </Card>

          <Card accent>
            <div className={s.kpiRow}>
              <div><h2>Tournament list</h2><p className={s.muted}>Edit in the workspace or open the public details page.</p></div>
              <Status>{isLoading ? 'Loading' : `${tournaments.length} events`}</Status>
            </div>

            {isLoading ? (
              <p className={s.muted}>Loading tournaments...</p>
            ) : tournaments.length === 0 ? (
              <p className={s.muted}>No tournaments are available.</p>
            ) : (
              <div className={s.list} style={{ marginTop: 12 }}>
                {tournaments.map((tournament) => (
                  <div className={s.listRow} key={tournament.id}>
                    <span>{tournament.name} • {tournament.game} • {tournament.status}</span>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <Button small variant="outline" onClick={() => startEdit(tournament)}>Edit</Button>
                      <Button small variant="ghost" onClick={() => navigate(`/tournaments/${tournament.id}`)}>View</Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </section>
    </>
  );
}

export default TournamentManagerPage;