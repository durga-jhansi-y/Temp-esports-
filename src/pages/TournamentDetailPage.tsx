import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './TournamentPages.module.css';

type TabName = 'overview' | 'bracket' | 'participants' | 'analytics';

const tabs: { id: TabName; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'bracket', label: 'Bracket' },
  { id: 'participants', label: 'Participants' },
  { id: 'analytics', label: 'Public analytics' },
];

export default function TournamentDetailPage() {
  const [activeTab, setActiveTab] = useState<TabName>('overview');
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (message: string) => {
    setToastMessage(message);
    window.setTimeout(() => setToastMessage(''), 2300);
  };

  return (
    <div className={styles.pageShell}>
      <main className={styles.wrap}>
        <div className={styles.pageHead}>
          <div className={styles.pageHeadCopy}>
            <div className={styles.inlineStatusRow}>
              <span className={`${styles.status} ${styles.statusLive}`}>
                <i className={`${styles.dot} ${styles.livePulse}`} />
                Live playoffs
              </span>
              <span className={styles.tag}>Valorant</span>
            </div>

            <h1>
              Capital Clash{' '}
              <span className={styles.gradientText}>Invitational</span>
            </h1>
            <p className={styles.muted}>
              64-team regional invitational • Double elimination playoffs •
              $12,000 prize pool
            </p>
          </div>

          <div className={styles.buttons}>
            <button
              className={styles.buttonPrimary}
              onClick={() => showToast('Event added to your watchlist.')}
              type="button"
            >
              Follow event
            </button>
            <Link className={styles.buttonOutline} to="/login">
              Register / sign in
            </Link>
          </div>
        </div>

        <div className={styles.tabBar} role="tablist" aria-label="Tournament details">
          {tabs.map((tab) => (
            <button
              aria-selected={activeTab === tab.id}
              className={activeTab === tab.id ? styles.activeTab : ''}
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              type="button"
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <section className={styles.tabPane}>
            <div className={styles.gridFour}>
              <div className={styles.metric}>
                <span>Teams remaining</span>
                <strong>8</strong>
                <small>From 64 entrants</small>
              </div>
              <div className={styles.metric}>
                <span>Matches played</span>
                <strong>118</strong>
                <small>92.2% complete</small>
              </div>
              <div className={styles.metric}>
                <span>Peak viewers</span>
                <strong>6.4K</strong>
                <small>Public stream</small>
              </div>
              <div className={styles.metric}>
                <span>Avg match</span>
                <strong>41m</strong>
                <small>-4m vs qualifier</small>
              </div>
            </div>

            <div className={`${styles.gridTwo} ${styles.sectionSpacing}`}>
              <div className={`${styles.card} ${styles.accentCard}`}>
                <h2>Next featured match</h2>
                <p className={styles.muted}>
                  Upper Final • Best of 3 • 7:30 PM ET
                </p>

                <div className={styles.featuredMatch}>
                  <div className={styles.teamLine}>
                    <div className={styles.teamLogo}>N</div>
                    <b>Team Nova</b>
                  </div>
                  <span className={styles.score}>VS</span>
                  <div className={`${styles.teamLine} ${styles.teamLineRight}`}>
                    <b>Vanta GG</b>
                    <div className={styles.teamLogo}>V</div>
                  </div>
                </div>

                <button
                  className={`${styles.buttonOutline} ${styles.buttonSmall}`}
                  onClick={() =>
                    showToast('Reminder set for the mock-up match.')
                  }
                  type="button"
                >
                  Set reminder
                </button>
              </div>

              <div className={`${styles.card} ${styles.accentCard}`}>
                <h2>Schedule progress</h2>
                <p className={styles.muted}>
                  118 of 128 planned matches are complete.
                </p>

                <div className={styles.progressTrack}>
                  <i style={{ width: '92%' }} />
                </div>
                <div className={styles.kpiRow}>
                  <span className={styles.simNote}>Qualifiers complete</span>
                  <span className={styles.simNote}>Finals in progress</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'bracket' && (
          <section className={styles.tabPane}>
            <div className={`${styles.card} ${styles.accentCard}`}>
              <div className={styles.bracket}>
                <div className={styles.round}>
                  <span className={styles.simNote}>Quarterfinals</span>
                  <div className={styles.matchBox}>
                    <div className={`${styles.matchLine} ${styles.winner}`}>
                      <span>Nova</span>
                      <b>2</b>
                    </div>
                    <div className={styles.matchLine}>
                      <span>Orion</span>
                      <b>0</b>
                    </div>
                  </div>
                  <div className={styles.matchBox}>
                    <div className={`${styles.matchLine} ${styles.winner}`}>
                      <span>Vanta</span>
                      <b>2</b>
                    </div>
                    <div className={styles.matchLine}>
                      <span>Riptide</span>
                      <b>1</b>
                    </div>
                  </div>
                </div>

                <div className={styles.round}>
                  <span className={styles.simNote}>Semifinal</span>
                  <div className={styles.matchBox}>
                    <div className={`${styles.matchLine} ${styles.winner}`}>
                      <span>Nova</span>
                      <b>2</b>
                    </div>
                    <div className={styles.matchLine}>
                      <span>Apex</span>
                      <b>1</b>
                    </div>
                  </div>
                  <div className={styles.matchBox}>
                    <div className={styles.matchLine}>
                      <span>Vanta</span>
                      <b>—</b>
                    </div>
                    <div className={styles.matchLine}>
                      <span>Eclipse</span>
                      <b>—</b>
                    </div>
                  </div>
                </div>

                <div className={styles.round}>
                  <span className={styles.simNote}>Grand final</span>
                  <div className={styles.matchBox}>
                    <div className={styles.matchLine}>
                      <span>TBD</span>
                      <b>—</b>
                    </div>
                    <div className={styles.matchLine}>
                      <span>TBD</span>
                      <b>—</b>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'participants' && (
          <section className={styles.tabPane}>
            <div className={styles.card}>
              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Seed</th>
                      <th>Team</th>
                      <th>Record</th>
                      <th>Map diff</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['1', 'Team Nova', '7–0', '+18'],
                      ['2', 'Vanta GG', '6–1', '+14'],
                      ['3', 'Eclipse', '6–2', '+9'],
                      ['4', 'Team Apex', '5–2', '+7'],
                    ].map(([seed, team, record, mapDiff]) => (
                      <tr className={styles.hoverableRow} key={team}>
                        <td className={styles.rank}>{seed}</td>
                        <td>{team}</td>
                        <td>{record}</td>
                        <td>{mapDiff}</td>
                        <td>
                          <span className={`${styles.status} ${styles.statusLive}`}>
                            Active
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'analytics' && (
          <section className={styles.tabPane}>
            <div className={styles.gridThree}>
              <div className={styles.metric}>
                <span>Average viewers</span>
                <strong>3.1K</strong>
                <small>+21% vs qualifier</small>
              </div>
              <div className={styles.metric}>
                <span>Upset rate</span>
                <strong>18%</strong>
                <small>By seeded favorite</small>
              </div>
              <div className={styles.metric}>
                <span>Close maps</span>
                <strong>42%</strong>
                <small>≤ 3-round margin</small>
              </div>
            </div>

            <div
              className={`${styles.card} ${styles.accentCard} ${styles.sectionSpacing}`}
            >
              <h2>Viewer trend</h2>
              <div className={styles.chart}>
                {[
                  ['QF1', 34],
                  ['QF2', 48],
                  ['QF3', 41],
                  ['QF4', 57],
                  ['SF1', 62],
                  ['SF2', 75],
                  ['LB', 68],
                  ['UF', 88],
                ].map(([label, height]) => (
                  <div className={styles.chartColumn} key={label}>
                    <i
                      className={styles.chartBar}
                      style={{ height: `${height}%` }}
                    />
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
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
