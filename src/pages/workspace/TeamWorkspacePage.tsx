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

function TeamWorkspacePage() {
  const navigate = useNavigate();
  const [teams, setTeams] = useState<Team[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [dataMode, setDataModeState] = useState<EsportsDataMode>(getEsportsDataMode);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const loadTeams = async () => {
    try {
      setIsLoading(true);
      setError('');
      setTeams(await getTeams());
    } catch (err) {
      setTeams([]);
      setError(err instanceof Error ? err.message : 'Failed to load teams.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadTeams();
  }, [dataMode]);

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
      await loadTeams();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save team.');
    }
  };

  const activeCount = teams.filter((team) => team.active).length;
  const gameCount = new Set(teams.map((team) => team.game)).size;

  return (
    <>
      <PageHeader
        eyebrow="Login required"
        title={<>Team <GradientText>workspace.</GradientText></>}
        description="Create and edit teams through /api/teams. Public team listing and match history remain available outside the workspace."
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
              <div><h2>Team list</h2><p className={s.muted}>Select Edit for authenticated updates or View for the public detail/history page.</p></div>
              <Status>{isLoading ? 'Loading' : `${teams.length} teams`}</Status>
            </div>

            {isLoading ? (
              <p className={s.muted}>Loading teams...</p>
            ) : teams.length === 0 ? (
              <p className={s.muted}>No teams are available.</p>
            ) : (
              <div className={s.list} style={{ marginTop: 12 }}>
                {teams.map((team) => (
                  <div className={s.listRow} key={team.id}>
                    <span>{team.name} • {team.game} • {team.region || 'No region'}</span>
                    <div style={{ display: 'flex', gap: 8 }}>
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
    </>
  );
}

export default TeamWorkspacePage;