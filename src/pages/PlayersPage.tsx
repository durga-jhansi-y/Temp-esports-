import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  getPlayers,
  getPlayerShowcase,
  type Player,
} from '../services/playerService';
import styles from './PlayerShowcase.module.css';

function PlayersPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [search, setSearch] = useState('');
  const [game, setGame] = useState('ALL');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadPlayers = async () => {
      try {
        setError('');
        setPlayers(await getPlayers());
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : 'Unable to load players.');
      } finally {
        setIsLoading(false);
      }
    };

    void loadPlayers();
  }, []);

  const games = useMemo(
    () => Array.from(new Set(players.map((player) => player.game))).sort(),
    [players],
  );

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

      return matchesSearch && (game === 'ALL' || player.game === game);
    });
  }, [players, search, game]);

  return (
    <div className={styles.page}>
      <main className={styles.wrap}>
        <header className={styles.pageHead}>
          <div>
            <span className={styles.eyebrow}>Public player directory</span>
            <h1 className={styles.title}>Meet the <span>competitors.</span></h1>
            <p className={styles.description}>
              Explore player identities, teams, roles, eligibility, progression, and achievement highlights.
            </p>
          </div>

          <div className={styles.filters}>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search player or team"
              aria-label="Search players"
            />
            <select value={game} onChange={(event) => setGame(event.target.value)} aria-label="Filter by game">
              <option value="ALL">All games</option>
              {games.map((gameName) => <option key={gameName} value={gameName}>{gameName}</option>)}
            </select>
          </div>
        </header>

        {error && <div className={styles.emptyState}>{error}</div>}
        {isLoading ? (
          <div className={styles.emptyState}>Loading players…</div>
        ) : filteredPlayers.length === 0 ? (
          <div className={styles.emptyState}>No players match the current filters.</div>
        ) : (
          <section className={styles.playerGrid} aria-label="Players">
            {filteredPlayers.map((player) => {
              const showcase = getPlayerShowcase(player);
              return (
                <Link key={player.id} to={`/players/${player.id}`} className={styles.playerCard}>
                  <div className={styles.cardTop}>
                    <div className={styles.avatar}>{player.gamerTag.slice(0, 2).toUpperCase()}</div>
                    <div className={styles.identity}>
                      <span className={styles.rolePill}>{player.rosterRole}</span>
                      <h2>{player.gamerTag}</h2>
                      <p>{player.displayName}</p>
                    </div>
                    <span className={player.active ? styles.liveDot : styles.inactiveDot} aria-label={player.active ? 'Active' : 'Inactive'} />
                  </div>

                  <div className={styles.metaLine}>
                    <span>{player.teamName || 'Free agent'}</span>
                    <span>{player.game}</span>
                    <span>{player.country || 'Global'}</span>
                  </div>

                  <div className={styles.statsGrid}>
                    <div><span>Rating</span><strong>{showcase.rating.toLocaleString()}</strong></div>
                    <div><span>Win rate</span><strong>{showcase.winRate}%</strong></div>
                    <div><span>Matches</span><strong>{showcase.matches}</strong></div>
                    <div><span>MVPs</span><strong>{showcase.mvps}</strong></div>
                  </div>

                  <div className={styles.badgeRow}>
                    {showcase.achievements.slice(0, 2).map((achievement) => (
                      <span key={achievement}>{achievement}</span>
                    ))}
                  </div>
                </Link>
              );
            })}
          </section>
        )}
      </main>
    </div>
  );
}

export default PlayersPage;