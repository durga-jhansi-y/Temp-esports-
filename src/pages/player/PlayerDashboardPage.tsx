import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  GradientText,
  Metric,
  PageHeader,
  SectionTitle,
  Status,
  workspaceStyles as s,
} from '../../components/workspace/WorkspaceUI';
import {
  createPlayer,
  getPlayers,
  type CreatePlayerRequest,
  type Player,
} from '../../services/playerService';
import styles from './PlayerPages.module.css';

const emptyForm: CreatePlayerRequest = {
  gamerTag: '',
  displayName: '',
  game: '',
  teamName: '',
  country: '',
  active: true,
};

function PlayerDashboardPage() {
  const navigate = useNavigate();
  const [players, setPlayers] = useState<Player[]>([]);
  const [form, setForm] = useState<CreatePlayerRequest>(emptyForm);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const loadPlayers = async () => {
    setError('');

    try {
      setPlayers(await getPlayers());
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : 'Unable to load players.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadPlayers();
  }, []);

  const filteredPlayers = useMemo(() => {
    const query = search.trim().toLowerCase();

    return players.filter((player) => {
      const matchesSearch =
        !query ||
        player.gamerTag.toLowerCase().includes(query) ||
        player.displayName.toLowerCase().includes(query) ||
        player.game.toLowerCase().includes(query) ||
        (player.teamName ?? '').toLowerCase().includes(query) ||
        (player.country ?? '').toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === 'ALL' ||
        (statusFilter === 'ACTIVE' && player.active) ||
        (statusFilter === 'INACTIVE' && !player.active);

      return matchesSearch && matchesStatus;
    });
  }, [players, search, statusFilter]);

  const activeCount = players.filter((player) => player.active).length;
  const gamesCount = new Set(players.map((player) => player.game)).size;
  const teamsCount = new Set(
    players.map((player) => player.teamName).filter(Boolean),
  ).size;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setMessage('');
    setIsSubmitting(true);

    try {
      const created = await createPlayer({
        ...form,
        gamerTag: form.gamerTag.trim(),
        displayName: form.displayName.trim(),
        game: form.game.trim(),
        teamName: form.teamName?.trim() || undefined,
        country: form.country?.trim() || undefined,
      });

      setPlayers((current) => [...current, created]);
      setForm(emptyForm);
      setMessage(`Player ${created.gamerTag} was created in H2 successfully.`);
    } catch (createError) {
      setError(
        createError instanceof Error
          ? createError.message
          : 'Unable to create player.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <PageHeader
        eyebrow="Player workspace"
        title={
          <>
            Player <GradientText>dashboard.</GradientText>
          </>
        }
        description="Create player profiles, browse the H2-backed player directory, and open a profile to review or update it."
      />

      {error && <div className={styles.error} role="alert">{error}</div>}
      {message && <div className={styles.message}>{message}</div>}

      <div className={s.gridFour}>
        <Metric label="Total players" value={String(players.length)} note="Stored in H2" />
        <Metric label="Active players" value={String(activeCount)} note="Currently active" />
        <Metric label="Games" value={String(gamesCount)} note="Distinct titles" />
        <Metric label="Teams" value={String(teamsCount)} note="Assigned teams" />
      </div>

      <div className={s.gridTwo} style={{ marginTop: 16 }}>
        <Card accent>
          <SectionTitle
            title="Create player profile"
            description="POST /api/players"
          />

          <form className={styles.formGrid} onSubmit={handleSubmit}>
            <div className={styles.field}>
              <label htmlFor="player-gamer-tag">Gamer tag</label>
              <input
                id="player-gamer-tag"
                className={styles.input}
                value={form.gamerTag}
                minLength={3}
                maxLength={30}
                required
                onChange={(event) =>
                  setForm((current) => ({ ...current, gamerTag: event.target.value }))
                }
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="player-display-name">Display name</label>
              <input
                id="player-display-name"
                className={styles.input}
                value={form.displayName}
                maxLength={100}
                required
                onChange={(event) =>
                  setForm((current) => ({ ...current, displayName: event.target.value }))
                }
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="player-game">Game</label>
              <input
                id="player-game"
                className={styles.input}
                value={form.game}
                maxLength={80}
                required
                onChange={(event) =>
                  setForm((current) => ({ ...current, game: event.target.value }))
                }
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="player-team">Team name (optional)</label>
              <input
                id="player-team"
                className={styles.input}
                value={form.teamName ?? ''}
                maxLength={100}
                placeholder="Must already exist in H2"
                onChange={(event) =>
                  setForm((current) => ({ ...current, teamName: event.target.value }))
                }
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="player-country">Country (optional)</label>
              <input
                id="player-country"
                className={styles.input}
                value={form.country ?? ''}
                maxLength={60}
                onChange={(event) =>
                  setForm((current) => ({ ...current, country: event.target.value }))
                }
              />
            </div>

            <label className={styles.checkboxRow}>
              <input
                type="checkbox"
                checked={form.active ?? true}
                onChange={(event) =>
                  setForm((current) => ({ ...current, active: event.target.checked }))
                }
              />
              Active player
            </label>

            <div className={`${styles.actions} ${styles.fieldFull}`}>
              <button className={styles.primaryButton} type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Creating…' : 'Create player'}
              </button>
            </div>
          </form>
        </Card>

        <Card accent>
          <SectionTitle
            title="H2 connectivity"
            description="This page reads and writes the existing Spring Boot Player API."
          />
          <div className={s.list}>
            <div className={s.listRow}><span>Player listing</span><Status tone="live">GET /api/players</Status></div>
            <div className={s.listRow}><span>Profile creation</span><Status tone="live">POST /api/players</Status></div>
            <div className={s.listRow}><span>Profile view</span><Status tone="live">GET /api/players/:id</Status></div>
            <div className={s.listRow}><span>Profile update</span><Status tone="live">PUT /api/players/:id</Status></div>
          </div>
          <p className={s.muted} style={{ marginTop: 16 }}>
            Search and status filtering are performed in React after the player list is loaded, so no additional backend endpoint is required.
          </p>
        </Card>
      </div>

      <section className={s.section}>
        <SectionTitle
          title="Player directory"
          description="Search and filter the player records returned from H2."
        />

        <Card accent>
          <div className={styles.toolbar}>
            <input
              className={styles.input}
              type="search"
              placeholder="Search gamer tag, name, game, team, or country"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />

            <select
              className={styles.select}
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
            >
              <option value="ALL">All statuses</option>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </select>
          </div>

          {isLoading ? (
            <div className={styles.emptyState}>Loading players from the backend…</div>
          ) : filteredPlayers.length === 0 ? (
            <div className={styles.emptyState}>
              {players.length === 0
                ? 'No players are stored in H2 yet. Create the first player profile above.'
                : 'No players match the current search or filter.'}
            </div>
          ) : (
            <div className={s.tableWrap}>
              <table className={s.table}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Gamer tag</th>
                    <th>Display name</th>
                    <th>Game</th>
                    <th>Team</th>
                    <th>Country</th>
                    <th>Status</th>
                    <th>Profile</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPlayers.map((player) => (
                    <tr key={player.id}>
                      <td>{player.id}</td>
                      <td>{player.gamerTag}</td>
                      <td>{player.displayName}</td>
                      <td>{player.game}</td>
                      <td>{player.teamName || '—'}</td>
                      <td>{player.country || '—'}</td>
                      <td>
                        <Status tone={player.active ? 'live' : 'warning'}>
                          {player.active ? 'Active' : 'Inactive'}
                        </Status>
                      </td>
                      <td>
                        <button
                          className={styles.secondaryButton}
                          type="button"
                          onClick={() => navigate(`/players/${player.id}`)}
                        >
                          View / edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </section>
    </>
  );
}

export default PlayerDashboardPage;