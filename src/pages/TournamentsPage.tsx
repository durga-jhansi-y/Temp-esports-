import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './TournamentPages.module.css';

type TournamentStatus = 'live' | 'open' | 'upcoming';

type Tournament = {
  id: number;
  status: TournamentStatus;
  statusLabel: string;
  game: string;
  name: string;
  description: string;
  prizePool: string;
  entrants: string;
  starts: string;
};

const tournaments: Tournament[] = [
  {
    id: 1,
    status: 'live',
    statusLabel: 'Live now',
    game: 'Valorant',
    name: 'Capital Clash Invitational',
    description: 'Regional invitational currently in playoff rounds.',
    prizePool: '$12,000',
    entrants: '64',
    starts: 'Live',
  },
  {
    id: 2,
    status: 'open',
    statusLabel: 'Registration open',
    game: 'Rocket League',
    name: 'Campus Series Fall Open',
    description: 'Open college competition with seeded group stage.',
    prizePool: '$4,500',
    entrants: '86/128',
    starts: 'Sep 12',
  },
  {
    id: 3,
    status: 'open',
    statusLabel: 'Registration open',
    game: 'CS2',
    name: 'Mid-Atlantic Community Cup',
    description:
      'Community-led tournament with public bracket and streamed finals.',
    prizePool: '$6,000',
    entrants: '112/128',
    starts: 'Sep 18',
  },
  {
    id: 4,
    status: 'upcoming',
    statusLabel: 'Upcoming',
    game: 'Overwatch 2',
    name: 'East Coast Championship',
    description: 'Qualifier-based championship for established teams.',
    prizePool: '$18,000',
    entrants: '32',
    starts: 'Oct 3',
  },
  {
    id: 5,
    status: 'open',
    statusLabel: 'Registration open',
    game: 'League of Legends',
    name: 'Night League #8',
    description: 'Weekly league event with rolling seasonal points.',
    prizePool: '$2,500',
    entrants: '78/96',
    starts: 'Sep 5',
  },
  {
    id: 6,
    status: 'upcoming',
    statusLabel: 'Upcoming',
    game: 'Valorant',
    name: 'Winter Major Qualifier',
    description: 'Open qualifier feeding into the winter major.',
    prizePool: '$8,000',
    entrants: '—',
    starts: 'Oct 21',
  },
];

export default function TournamentsPage() {
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | TournamentStatus>(
    'all',
  );
  const [toastMessage, setToastMessage] = useState('');

  const filteredTournaments = useMemo(() => {
    const normalizedQuery = query.toLowerCase().trim();

    return tournaments.filter((tournament) => {
      const matchesStatus =
        statusFilter === 'all' || tournament.status === statusFilter;

      const searchableText = [
        tournament.name,
        tournament.game,
        tournament.description,
        tournament.statusLabel,
      ]
        .join(' ')
        .toLowerCase();

      const matchesQuery =
        normalizedQuery.length === 0 || searchableText.includes(normalizedQuery);

      return matchesStatus && matchesQuery;
    });
  }, [query, statusFilter]);

  const showToast = (message: string) => {
    setToastMessage(message);
    window.setTimeout(() => setToastMessage(''), 2300);
  };

  return (
    <div className={styles.pageShell}>
      <main className={styles.wrap}>
        <div className={styles.pageHead}>
          <div className={styles.pageHeadCopy}>
            <span className={styles.subtitle}>Public page</span>
            <h1>
              Discover <span className={styles.gradientText}>tournaments.</span>
            </h1>
            <p className={styles.muted}>
              Browse live, open, and upcoming competitions. Registration
              actions can require sign-in while event discovery remains public.
            </p>
          </div>

          <div className={styles.buttons}>
            <Link className={styles.buttonPrimary} to="/login">
              Register for an event
            </Link>
          </div>
        </div>

        <div className={styles.searchBar}>
          <input
            aria-label="Search tournaments"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search tournament, game, or description"
            type="search"
            value={query}
          />

          <select
            aria-label="Filter tournaments by status"
            onChange={(event) =>
              setStatusFilter(event.target.value as 'all' | TournamentStatus)
            }
            value={statusFilter}
          >
            <option value="all">All statuses</option>
            <option value="live">Live</option>
            <option value="open">Registration open</option>
            <option value="upcoming">Upcoming</option>
          </select>
        </div>

        <section className={styles.tournamentSection}>
          {filteredTournaments.length > 0 ? (
            <div className={styles.gridThree}>
              {filteredTournaments.map((tournament) => (
                <article
                  className={`${styles.card} ${styles.accentCard}`}
                  key={tournament.id}
                >
                  <div className={styles.kpiRow}>
                    <span
                      className={`${styles.status} ${
                        tournament.status === 'live' ? styles.statusLive : ''
                      }`}
                    >
                      {tournament.statusLabel}
                    </span>
                    <span className={styles.tag}>{tournament.game}</span>
                  </div>

                  <h2 className={styles.tournamentTitle}>{tournament.name}</h2>
                  <p className={styles.muted}>{tournament.description}</p>

                  <div className={styles.tournamentStats}>
                    <div>
                      <span className={styles.simNote}>Prize pool</span>
                      <strong>{tournament.prizePool}</strong>
                    </div>
                    <div>
                      <span className={styles.simNote}>Entrants</span>
                      <strong>{tournament.entrants}</strong>
                    </div>
                    <div>
                      <span className={styles.simNote}>Starts</span>
                      <strong>{tournament.starts}</strong>
                    </div>
                  </div>

                  <div className={styles.buttons}>
                    <Link
                      className={`${styles.buttonPrimary} ${styles.buttonSmall}`}
                      to="/tournament-detail"
                    >
                      View event
                    </Link>
                    <button
                      className={`${styles.buttonOutline} ${styles.buttonSmall}`}
                      onClick={() =>
                        showToast('Tournament added to your watchlist.')
                      }
                      type="button"
                    >
                      Watch
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              No tournaments match your current search and filter.
            </div>
          )}
        </section>
      </main>

      <footer className={styles.footer}>
        Interactive frontend mock-up • Simulated esports and analytics data
      </footer>

      <div
        aria-live="polite"
        className={`${styles.toast} ${toastMessage ? styles.toastVisible : ''}`}
        role="status"
      >
        {toastMessage}
      </div>
    </div>
  );
}