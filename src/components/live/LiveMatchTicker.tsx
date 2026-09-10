import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMatches, type Match } from '../../services/matchService';
import styles from './LiveMatchTicker.module.css';

const MAX_TICKER_MATCHES = 6;

function formatStartTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
  });
}

function teamInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('');
}

function MatchTickerItem({ match }: { match: Match }) {
  const isLive = match.status === 'IN_PROGRESS';

  return (
    <Link
      className={styles.tickerItem}
      to={`/matches/${match.id}`}
      aria-label={`View ${match.homeTeamName} versus ${match.awayTeamName}`}
    >
      <span className={`${styles.state} ${isLive ? styles.liveState : styles.upcomingState}`}>
        <span className={styles.stateDot} aria-hidden="true" />
        {isLive ? 'LIVE' : 'UPCOMING'}
      </span>

      <span className={styles.teamBadge} aria-hidden="true">
        {teamInitials(match.homeTeamName)}
      </span>
      <strong>{match.homeTeamName}</strong>

      <span className={styles.score}>
        {isLive ? `${match.homeScore} — ${match.awayScore}` : 'vs'}
      </span>

      <strong>{match.awayTeamName}</strong>
      <span className={styles.teamBadge} aria-hidden="true">
        {teamInitials(match.awayTeamName)}
      </span>

      <span className={styles.meta}>
        {match.game || match.tournamentName || 'Esports'}
        <span aria-hidden="true">•</span>
        {isLive ? match.venue || 'Live match' : formatStartTime(match.scheduledAt)}
      </span>
    </Link>
  );
}

export default function LiveMatchTicker() {
  const [matches, setMatches] = useState<Match[]>([]);

  const loadMatches = useCallback(async () => {
    try {
      const available = await getMatches();
      setMatches(available);
    } catch {
      // The ticker is supplemental. If the API is unavailable, keep the layout clean.
      setMatches([]);
    }
  }, []);

  useEffect(() => {
    void loadMatches();

    const refresh = () => void loadMatches();
    window.addEventListener('esports-data-mode-changed', refresh);

    const interval = window.setInterval(refresh, 30_000);
    return () => {
      window.removeEventListener('esports-data-mode-changed', refresh);
      window.clearInterval(interval);
    };
  }, [loadMatches]);

  const tickerMatches = useMemo(() => {
    const now = Date.now();

    return matches
      .filter((match) => {
        if (match.status === 'IN_PROGRESS') return true;
        if (match.status !== 'SCHEDULED') return false;

        const scheduled = new Date(match.scheduledAt).getTime();
        return Number.isNaN(scheduled) || scheduled >= now - 60 * 60 * 1000;
      })
      .sort((a, b) => {
        if (a.status === 'IN_PROGRESS' && b.status !== 'IN_PROGRESS') return -1;
        if (a.status !== 'IN_PROGRESS' && b.status === 'IN_PROGRESS') return 1;
        return new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime();
      })
      .slice(0, MAX_TICKER_MATCHES);
  }, [matches]);

  if (tickerMatches.length === 0) return null;

  const shouldScroll = tickerMatches.length > 1;

  return (
    <section className={styles.ticker} aria-label="Live and upcoming esports matches">
      <div className={styles.edgeLabel}>MATCH CENTER</div>
      <div className={styles.viewport}>
        <div className={`${styles.track} ${shouldScroll ? styles.scrolling : ''}`}>
          {tickerMatches.map((match) => (
            <MatchTickerItem key={`primary-${match.id}`} match={match} />
          ))}
          {shouldScroll &&
            tickerMatches.map((match) => (
              <MatchTickerItem key={`duplicate-${match.id}`} match={match} />
            ))}
        </div>
      </div>
    </section>
  );
}