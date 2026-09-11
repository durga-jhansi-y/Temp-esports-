import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMatches, type Match } from '../services/matchService';
import styles from './SchedulePage.module.css';

const statusOptions = [
  { value: 'ALL', label: 'All' },
  { value: 'IN_PROGRESS', label: 'Live' },
  { value: 'SCHEDULED', label: 'Upcoming' },
  { value: 'COMPLETED', label: 'Completed' },
];

function dateKey(value: Date) {
  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, '0');
  const day = String(value.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function SchedulePage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [month, setMonth] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState(() => dateKey(new Date()));
  const [gameFilter, setGameFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadMatches = async () => {
      try {
        const loaded = (await getMatches()).sort(
          (a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime(),
        );
        setMatches(loaded);

        if (loaded.length > 0) {
          const now = new Date();
          const todayKey = dateKey(now);
          const hasToday = loaded.some((match) => dateKey(new Date(match.scheduledAt)) === todayKey);
          if (!hasToday) {
            const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
            const relevantMatch = loaded.find((match) => new Date(match.scheduledAt).getTime() >= startOfToday) ?? loaded[loaded.length - 1];
            const relevantDate = new Date(relevantMatch.scheduledAt);
            setMonth(new Date(relevantDate.getFullYear(), relevantDate.getMonth(), 1));
            setSelectedDate(dateKey(relevantDate));
          }
        }
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : 'Unable to load schedule.');
      } finally {
        setIsLoading(false);
      }
    };

    void loadMatches();
  }, []);

  const games = useMemo(
    () => Array.from(new Set(matches.map((match) => match.game))).sort(),
    [matches],
  );

  const filteredMatches = useMemo(
    () => matches.filter((match) =>
      (gameFilter === 'ALL' || match.game === gameFilter) &&
      (statusFilter === 'ALL' || match.status === statusFilter),
    ),
    [matches, gameFilter, statusFilter],
  );

  const matchesByDate = useMemo(() => {
    const grouped = new Map<string, Match[]>();
    filteredMatches.forEach((match) => {
      const key = dateKey(new Date(match.scheduledAt));
      grouped.set(key, [...(grouped.get(key) ?? []), match]);
    });
    return grouped;
  }, [filteredMatches]);

  const days = useMemo(() => {
    const year = month.getFullYear();
    const monthIndex = month.getMonth();
    const firstWeekday = new Date(year, monthIndex, 1).getDay();
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    const cells: Array<number | null> = Array.from({ length: firstWeekday }, () => null);
    for (let day = 1; day <= daysInMonth; day += 1) cells.push(day);
    while (cells.length % 7 !== 0) cells.push(null);
    return cells;
  }, [month]);

  const selectedMatches = matchesByDate.get(selectedDate) ?? [];
  const selectedDateLabel = new Date(`${selectedDate}T12:00:00`).toLocaleDateString(undefined, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const changeMonth = (offset: number) => {
    const next = new Date(month.getFullYear(), month.getMonth() + offset, 1);
    setMonth(next);
    setSelectedDate(dateKey(next));
  };

  return (
    <div className={styles.page}>
      <main className={styles.wrap}>
        <header className={styles.pageHead}>
          <div>
            <span className={styles.eyebrow}>A7 · Competition calendar</span>
            <h1>Esports <span>schedule.</span></h1>
            <p>See live, upcoming, and completed matches on one calendar, then open any matchup for full details.</p>
          </div>
          <div className={styles.liveSummary}>
            <span>LIVE NOW</span>
            <strong>{matches.filter((match) => match.status === 'IN_PROGRESS').length}</strong>
            <small>{matches.filter((match) => match.status === 'SCHEDULED').length} upcoming</small>
          </div>
        </header>

        <div className={styles.filters}>
          <div className={styles.filterGroup}>
            <button className={gameFilter === 'ALL' ? styles.activeFilter : ''} onClick={() => setGameFilter('ALL')}>All Games</button>
            {games.map((game) => (
              <button key={game} className={gameFilter === game ? styles.activeFilter : ''} onClick={() => setGameFilter(game)}>{game}</button>
            ))}
          </div>
          <div className={styles.filterGroup}>
            {statusOptions.map((option) => (
              <button key={option.value} className={statusFilter === option.value ? styles.activeFilter : ''} onClick={() => setStatusFilter(option.value)}>
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {error && <div className={styles.emptyState}>{error}</div>}
        {isLoading ? (
          <div className={styles.emptyState}>Loading competition calendar…</div>
        ) : (
          <div className={styles.layout}>
            <section className={styles.calendarCard}>
              <div className={styles.monthHeader}>
                <button onClick={() => changeMonth(-1)} aria-label="Previous month">‹</button>
                <h2>{month.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}</h2>
                <button onClick={() => changeMonth(1)} aria-label="Next month">›</button>
              </div>

              <div className={styles.weekdays}>
                {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day) => <span key={day}>{day}</span>)}
              </div>

              <div className={styles.calendarGrid}>
                {days.map((day, index) => {
                  if (day === null) return <div key={`blank-${index}`} className={styles.blankDay} />;
                  const key = dateKey(new Date(month.getFullYear(), month.getMonth(), day));
                  const dayMatches = matchesByDate.get(key) ?? [];
                  const hasLive = dayMatches.some((match) => match.status === 'IN_PROGRESS');
                  const isSelected = key === selectedDate;
                  const isToday = key === dateKey(new Date());

                  return (
                    <button
                      key={key}
                      className={`${styles.dayCell} ${isSelected ? styles.selectedDay : ''} ${isToday ? styles.today : ''}`}
                      onClick={() => setSelectedDate(key)}
                    >
                      <span className={styles.dayNumber}>{day}</span>
                      {dayMatches.length > 0 && (
                        <div className={styles.dayEvents}>
                          {hasLive && <i className={styles.liveEvent}>LIVE</i>}
                          <strong>{dayMatches.length}</strong>
                          <small>{dayMatches.length === 1 ? 'match' : 'matches'}</small>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </section>

            <aside className={styles.agendaCard}>
              <div className={styles.agendaHead}>
                <span>SELECTED DATE</span>
                <h2>{selectedDateLabel}</h2>
                <p>{selectedMatches.length} scheduled event{selectedMatches.length === 1 ? '' : 's'}</p>
              </div>

              <div className={styles.agendaList}>
                {selectedMatches.length === 0 ? (
                  <div className={styles.noEvents}>No matches for this date with the current filters.</div>
                ) : selectedMatches.map((match) => (
                  <Link key={match.id} to={`/matches/${match.id}`} className={styles.matchCard}>
                    <div className={styles.matchTime}>
                      <strong>{new Date(match.scheduledAt).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</strong>
                      <span className={match.status === 'IN_PROGRESS' ? styles.liveStatus : ''}>{match.status.replace('_', ' ')}</span>
                    </div>
                    <div className={styles.matchInfo}>
                      <strong>{match.homeTeamName} <span>vs</span> {match.awayTeamName}</strong>
                      <small>{match.game}{match.tournamentName ? ` · ${match.tournamentName}` : ''}</small>
                      {match.venue && <small>{match.venue}</small>}
                    </div>
                    <div className={styles.score}>{match.status === 'SCHEDULED' ? '—' : `${match.homeScore}–${match.awayScore}`}</div>
                  </Link>
                ))}
              </div>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
}

export default SchedulePage;