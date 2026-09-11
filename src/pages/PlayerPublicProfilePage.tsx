import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  getPlayer,
  getPlayerShowcase,
  type Player,
} from '../services/playerService';
import styles from './PlayerShowcase.module.css';

function PlayerPublicProfilePage() {
  const { id } = useParams();
  const playerId = Number(id);
  const [player, setPlayer] = useState<Player | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadPlayer = async () => {
      if (!Number.isInteger(playerId) || playerId <= 0) {
        setError('Invalid player ID.');
        setIsLoading(false);
        return;
      }

      try {
        setPlayer(await getPlayer(playerId));
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : 'Unable to load player profile.');
      } finally {
        setIsLoading(false);
      }
    };

    void loadPlayer();
  }, [playerId]);

  if (isLoading) {
    return <div className={styles.page}><main className={styles.wrap}><div className={styles.emptyState}>Loading profile…</div></main></div>;
  }

  if (!player || error) {
    return (
      <div className={styles.page}>
        <main className={styles.wrap}>
          <div className={styles.emptyState}>{error || 'Player not found.'}</div>
          <Link className={styles.backLink} to="/players">← Back to players</Link>
        </main>
      </div>
    );
  }

  const showcase = getPlayerShowcase(player);
  const xpIntoLevel = showcase.xp % showcase.nextLevelXp;
  const progress = Math.round((xpIntoLevel / showcase.nextLevelXp) * 100);

  return (
    <div className={styles.page}>
      <main className={styles.profileWrap}>
        <Link className={styles.backLink} to="/players">← Player directory</Link>

        <section className={styles.heroCard}>
          <div className={styles.heroAvatar}>{player.gamerTag.slice(0, 2).toUpperCase()}</div>
          <div className={styles.heroIdentity}>
            <span className={styles.eyebrow}>Competitive profile</span>
            <h1>{player.gamerTag}</h1>
            <p>{player.displayName}</p>
            <div className={styles.profileTags}>
              <span>{player.teamName || 'Free agent'}</span>
              <span>{player.game}</span>
              <span>{player.country || 'Global'}</span>
              <span>{player.rosterRole}</span>
              <span>{player.eligibilityVerified ? '✓ Eligibility verified' : 'Eligibility pending'}</span>
            </div>
          </div>
          <div className={styles.ratingBlock}>
            <span>Rating</span>
            <strong>{showcase.rating.toLocaleString()}</strong>
            <small>{player.active ? 'ACTIVE COMPETITOR' : 'INACTIVE'}</small>
          </div>
        </section>

        <section className={styles.profileStats}>
          <div><span>Win Rate</span><strong>{showcase.winRate}%</strong><small>{showcase.wins}W · {showcase.losses}L</small></div>
          <div><span>Matches</span><strong>{showcase.matches}</strong><small>Career showcase</small></div>
          <div><span>MVPs</span><strong>{showcase.mvps}</strong><small>Performance awards</small></div>
          <div><span>Role</span><strong>{player.rosterRole}</strong><small>{player.teamName || 'Unassigned'}</small></div>
        </section>

        <div className={styles.profileGrid}>
          <section className={styles.panel}>
            <div className={styles.panelHeader}>
              <div><span className={styles.eyebrow}>A10 · Gamification</span><h2>Achievements</h2></div>
              <span className={styles.rarePill}>RARE BADGES</span>
            </div>
            <div className={styles.achievementGrid}>
              {showcase.achievements.map((achievement, index) => (
                <div className={styles.achievementCard} key={achievement}>
                  <span>{index === 0 ? 'LEGENDARY' : index === 1 ? 'EPIC' : 'UNCOMMON'}</span>
                  <strong>{achievement}</strong>
                </div>
              ))}
            </div>
          </section>

          <section className={styles.panel}>
            <div className={styles.panelHeader}>
              <div><span className={styles.eyebrow}>Progression</span><h2>Level {showcase.level}</h2></div>
              <strong className={styles.xpValue}>{xpIntoLevel} / {showcase.nextLevelXp} XP</strong>
            </div>
            <div className={styles.progressTrack} aria-label={`${progress}% to next level`}>
              <div style={{ width: `${progress}%` }} />
            </div>
            <p className={styles.progressCopy}>{showcase.nextLevelXp - xpIntoLevel} XP until Level {showcase.level + 1}</p>
            <div className={styles.streakCard}>
              <span>🔥 CURRENT MOMENTUM</span>
              <strong>{Math.max(3, Math.round(showcase.winRate / 10))} match win streak</strong>
              <small>Keep competing to unlock the next badge tier.</small>
            </div>
          </section>
        </div>

        <p className={styles.demoNote}>
          Identity, team, roster role, and eligibility are backend data. Individual rating/XP statistics are deterministic showcase values until per-player match statistics are added to the data model.
        </p>
      </main>
    </div>
  );
}

export default PlayerPublicProfilePage;