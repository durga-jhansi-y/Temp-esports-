import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  getEsportsDataMode,
  setEsportsDataMode,
  type EsportsDataMode,
} from '../services/dataMode';
import { getTeams, type Team } from '../services/teamService';
import styles from './TeamsPage.module.css';

export default function TeamsPage() {
  const [search, setSearch] = useState('');
  const [teams, setTeams] = useState<Team[]>([]);
  const [dataMode, setDataModeState] = useState<EsportsDataMode>(getEsportsDataMode);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    const loadTeams = async () => {
      try {
        setIsLoading(true);
        setError('');
        const result = await getTeams();
        if (!cancelled) {
          setTeams(result);
        }
      } catch (err) {
        if (!cancelled) {
          setTeams([]);
          setError(err instanceof Error ? err.message : 'Failed to load teams.');
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    void loadTeams();
    return () => {
      cancelled = true;
    };
  }, [dataMode]);

  const filteredTeams = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return teams;
    }

    return teams.filter((team) =>
      [team.name, team.game, team.region ?? '', team.coach ?? '']
        .join(' ')
        .toLowerCase()
        .includes(query),
    );
  }, [search, teams]);

  const changeDataMode = (mode: EsportsDataMode) => {
    setEsportsDataMode(mode);
    setDataModeState(mode);
  };

  return (
    <div className={styles.page}>
      <main className={styles.wrap}>
        <header className={styles.pageHead}>
          <div className={styles.headingContent}>
            <span className={styles.subtitle}>Public page</span>

            <h1 className={styles.title}>
              Competitive <span className={styles.gradientText}>teams.</span>
            </h1>

            <p className={styles.description}>
              Browse team information from the Spring Boot API. The sample-data
              option still uses the backend; it only includes persisted seeded records.
            </p>
          </div>

          <div className={styles.searchBar}>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search team, game, region, or coach"
              aria-label="Search teams"
            />
            <select
              aria-label="Team data source"
              value={dataMode}
              onChange={(event) => changeDataMode(event.target.value as EsportsDataMode)}
            >
              <option value="backend">Backend data only</option>
              <option value="backend-sample">Backend + sample data</option>
            </select>
          </div>
        </header>

        {error && <div className={styles.emptyState}>{error}</div>}

        {isLoading ? (
          <div className={styles.emptyState}>Loading teams...</div>
        ) : filteredTeams.length > 0 ? (
          <section className={styles.teamGrid} aria-label="Competitive teams">
            {filteredTeams.map((team) => (
              <Link
                key={team.id}
                to={`/teams/${team.id}`}
                className={styles.teamCard}
                aria-label={`View ${team.name} team details`}
              >
                <div className={styles.teamLine}>
                  <div className={styles.teamLogo}>
                    {team.name.trim().charAt(0).toUpperCase() || '?'}
                  </div>

                  <div className={styles.teamIdentity}>
                    <h2>{team.name}</h2>
                    <span className={styles.tag}>{team.game}</span>
                  </div>
                </div>

                <div className={styles.statsGrid}>
                  <div className={styles.statItem}>
                    <span>Region</span>
                    <strong>{team.region || 'Not set'}</strong>
                  </div>

                  <div className={styles.statItem}>
                    <span>Coach</span>
                    <strong>{team.coach || 'Not set'}</strong>
                  </div>

                  <div className={styles.statItem}>
                    <span>Status</span>
                    <strong className={team.active ? styles.positive : ''}>
                      {team.active ? 'Active' : 'Inactive'}
                    </strong>
                  </div>
                </div>
              </Link>
            ))}
          </section>
        ) : !error ? (
          <div className={styles.emptyState}>
            {teams.length === 0
              ? `No teams are available in ${dataMode === 'backend' ? 'the backend' : 'backend sample data'}.`
              : `No teams match “${search}”.`}
          </div>
        ) : null}
      </main>

      <footer className={styles.footer}>
        {dataMode === 'backend' ? 'Backend data only • /api/teams' : 'Backend API + seeded sample data'}
      </footer>
    </div>
  );
}