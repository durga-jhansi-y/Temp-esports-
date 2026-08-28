import { useEffect, useState, type FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Card,
  GradientText,
  PageHeader,
  SectionTitle,
  Status,
  workspaceStyles as s,
} from '../../components/workspace/WorkspaceUI';
import {
  getPlayer,
  updatePlayer,
  type Player,
  type UpdatePlayerRequest,
} from '../../services/playerService';
import styles from './PlayerPages.module.css';

function PlayerProfilePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const playerId = Number(id);

  const [player, setPlayer] = useState<Player | null>(null);
  const [form, setForm] = useState<UpdatePlayerRequest>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadPlayer = async () => {
      if (!Number.isInteger(playerId) || playerId <= 0) {
        setError('Invalid player ID.');
        setIsLoading(false);
        return;
      }

      try {
        const loaded = await getPlayer(playerId);
        setPlayer(loaded);
        setForm({
          gamerTag: loaded.gamerTag,
          displayName: loaded.displayName,
          game: loaded.game,
          teamName: loaded.teamName ?? '',
          country: loaded.country ?? '',
          active: loaded.active,
        });
      } catch (loadError) {
        setError(
          loadError instanceof Error
            ? loadError.message
            : 'Unable to load player profile.',
        );
      } finally {
        setIsLoading(false);
      }
    };

    void loadPlayer();
  }, [playerId]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setMessage('');
    setIsSaving(true);

    try {
      const updated = await updatePlayer(playerId, {
        gamerTag: form.gamerTag?.trim(),
        displayName: form.displayName?.trim(),
        game: form.game?.trim(),
        teamName: form.teamName?.trim() ?? '',
        country: form.country?.trim() ?? '',
        active: form.active,
      });

      setPlayer(updated);
      setForm({
        gamerTag: updated.gamerTag,
        displayName: updated.displayName,
        game: updated.game,
        teamName: updated.teamName ?? '',
        country: updated.country ?? '',
        active: updated.active,
      });
      setMessage('Player profile was updated in H2 successfully.');
    } catch (saveError) {
      setError(
        saveError instanceof Error
          ? saveError.message
          : 'Unable to update player profile.',
      );
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className={styles.emptyState}>Loading player profile…</div>;
  }

  return (
    <>
      <PageHeader
        eyebrow="Player profile"
        title={
          <>
            Player <GradientText>profile.</GradientText>
          </>
        }
        description="View the selected H2 player record and update it through PUT /api/players/:id."
      />

      {error && <div className={styles.error} role="alert">{error}</div>}
      {message && <div className={styles.message}>{message}</div>}

      {!player ? (
        <Card accent>
          <div className={styles.emptyState}>The requested player could not be displayed.</div>
          <div className={styles.actions}>
            <button className={styles.secondaryButton} type="button" onClick={() => navigate('/player-dashboard')}>
              Back to players
            </button>
          </div>
        </Card>
      ) : (
        <div className={s.gridTwo}>
          <Card accent>
            <div className={s.kpiRow}>
              <div>
                <h2>{player.gamerTag}</h2>
                <p className={s.muted}>{player.displayName}</p>
              </div>
              <Status tone={player.active ? 'live' : 'warning'}>
                {player.active ? 'Active' : 'Inactive'}
              </Status>
            </div>

            <div className={styles.profileGrid}>
              <div className={styles.profileItem}><span>Player ID</span><strong>{player.id}</strong></div>
              <div className={styles.profileItem}><span>Game</span><strong>{player.game}</strong></div>
              <div className={styles.profileItem}><span>Team</span><strong>{player.teamName || 'Not assigned'}</strong></div>
              <div className={styles.profileItem}><span>Country</span><strong>{player.country || 'Not provided'}</strong></div>
            </div>

            <div className={styles.actions}>
              <button className={styles.secondaryButton} type="button" onClick={() => navigate('/player-dashboard')}>
                Back to player dashboard
              </button>
            </div>
          </Card>

          <Card accent>
            <SectionTitle title="Edit player" description="PUT /api/players/:id" />

            <form className={styles.formGrid} onSubmit={handleSubmit}>
              <div className={styles.field}>
                <label htmlFor="edit-gamer-tag">Gamer tag</label>
                <input
                  id="edit-gamer-tag"
                  className={styles.input}
                  value={form.gamerTag ?? ''}
                  minLength={3}
                  maxLength={30}
                  required
                  onChange={(event) => setForm((current) => ({ ...current, gamerTag: event.target.value }))}
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="edit-display-name">Display name</label>
                <input
                  id="edit-display-name"
                  className={styles.input}
                  value={form.displayName ?? ''}
                  maxLength={100}
                  required
                  onChange={(event) => setForm((current) => ({ ...current, displayName: event.target.value }))}
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="edit-game">Game</label>
                <input
                  id="edit-game"
                  className={styles.input}
                  value={form.game ?? ''}
                  maxLength={80}
                  required
                  onChange={(event) => setForm((current) => ({ ...current, game: event.target.value }))}
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="edit-team">Team name (optional)</label>
                <input
                  id="edit-team"
                  className={styles.input}
                  value={form.teamName ?? ''}
                  maxLength={100}
                  placeholder="Must already exist in H2"
                  onChange={(event) => setForm((current) => ({ ...current, teamName: event.target.value }))}
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="edit-country">Country (optional)</label>
                <input
                  id="edit-country"
                  className={styles.input}
                  value={form.country ?? ''}
                  maxLength={60}
                  onChange={(event) => setForm((current) => ({ ...current, country: event.target.value }))}
                />
              </div>

              <label className={styles.checkboxRow}>
                <input
                  type="checkbox"
                  checked={form.active ?? false}
                  onChange={(event) => setForm((current) => ({ ...current, active: event.target.checked }))}
                />
                Active player
              </label>

              <div className={`${styles.actions} ${styles.fieldFull}`}>
                <button className={styles.primaryButton} type="submit" disabled={isSaving}>
                  {isSaving ? 'Saving…' : 'Save changes'}
                </button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </>
  );
}

export default PlayerProfilePage;