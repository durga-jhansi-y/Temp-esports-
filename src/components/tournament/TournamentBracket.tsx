import { Link } from 'react-router-dom';
import type { Match } from '../../services/matchService';
import styles from './TournamentBracket.module.css';

type BracketRound = {
  label: string;
  matches: Match[];
};

function sortMatches(matches: Match[]) {
  return [...matches].sort(
    (a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime(),
  );
}

function buildRounds(matches: Match[]): BracketRound[] {
  const ordered = sortMatches(matches);
  if (ordered.length === 0) return [];
  if (ordered.length === 1) return [{ label: 'Final', matches: ordered }];

  // With no explicit round metadata yet, infer a standard single-elimination bracket
  // from chronological match order. The backend can later replace this inference with
  // roundName / roundNumber / bracketPosition without changing this component's UI.
  const rounds: BracketRound[] = [];
  let remaining = ordered.length;
  let cursor = 0;
  let roundSize = Math.ceil(remaining / 2);

  while (remaining > 1) {
    const matchesAfterThisRound = remaining - roundSize;
    const label = matchesAfterThisRound <= 1
      ? 'Semifinal'
      : matchesAfterThisRound <= 3
        ? 'Quarterfinal'
        : `Round of ${roundSize * 2}`;

    rounds.push({
      label,
      matches: ordered.slice(cursor, cursor + roundSize),
    });

    cursor += roundSize;
    remaining -= roundSize;
    roundSize = Math.max(1, Math.ceil(remaining / 2));
  }

  if (cursor < ordered.length) {
    rounds.push({ label: 'Final', matches: ordered.slice(cursor) });
  } else if (rounds.length > 0) {
    rounds[rounds.length - 1].label = 'Final';
  }

  return rounds;
}

function winnerId(match: Match) {
  if (match.status !== 'COMPLETED') return null;
  if (match.homeScore === match.awayScore) return null;
  return match.homeScore > match.awayScore ? match.homeTeamId : match.awayTeamId;
}

function TeamRow({
  teamId,
  teamName,
  score,
  winner,
}: {
  teamId: number;
  teamName: string;
  score: number;
  winner: boolean;
}) {
  return (
    <div className={`${styles.teamRow} ${winner ? styles.winner : ''}`}>
      <span className={styles.teamLogo} aria-hidden="true">{teamName.charAt(0).toUpperCase()}</span>
      <Link to={`/teams/${teamId}`}>{teamName}</Link>
      <strong>{score}</strong>
    </div>
  );
}

export default function TournamentBracket({ matches }: { matches: Match[] }) {
  const rounds = buildRounds(matches);

  if (rounds.length === 0) {
    return (
      <div className={styles.emptyState}>
        Bracket matches will appear here once matches are linked to this tournament.
      </div>
    );
  }

  return (
    <div className={styles.bracketViewport}>
      <div className={styles.bracket} style={{ gridTemplateColumns: `repeat(${rounds.length}, minmax(230px, 1fr))` }}>
        {rounds.map((round, roundIndex) => (
          <section className={styles.round} key={`${round.label}-${roundIndex}`}>
            <div className={styles.roundHeader}>
              <span>{round.label}</span>
              <small>{round.matches.length} {round.matches.length === 1 ? 'match' : 'matches'}</small>
            </div>

            <div className={styles.roundMatches}>
              {round.matches.map((match) => {
                const winningTeamId = winnerId(match);
                const isLive = match.status === 'IN_PROGRESS';

                return (
                  <article className={`${styles.matchCard} ${isLive ? styles.liveCard : ''}`} key={match.id}>
                    <Link className={styles.matchLink} to={`/matches/${match.id}`} aria-label={`Open match ${match.id}`} />
                    <div className={styles.matchMeta}>
                      <span className={isLive ? styles.liveLabel : styles.statusLabel}>
                        {isLive && <span className={styles.liveDot} aria-hidden="true" />}
                        {match.status.replace('_', ' ')}
                      </span>
                      <span>Single elim.</span>
                    </div>

                    <TeamRow
                      teamId={match.homeTeamId}
                      teamName={match.homeTeamName}
                      score={match.homeScore}
                      winner={winningTeamId === match.homeTeamId}
                    />
                    <TeamRow
                      teamId={match.awayTeamId}
                      teamName={match.awayTeamName}
                      score={match.awayScore}
                      winner={winningTeamId === match.awayTeamId}
                    />

                    {roundIndex < rounds.length - 1 && (
                      <span className={styles.connector} aria-hidden="true" />
                    )}
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}