import { Button, Card, GradientText, Metric, PageHeader, Progress, Status, workspaceStyles as s } from '../../components/workspace/WorkspaceUI';

const tournaments = [
  ['Campus Series Fall Open', 'Registration', '86 / 128', 67, 'Manage'],
  ['Capital Clash Invitational', 'Live', '64 / 64', 100, 'Bracket'],
  ['Winter Major Qualifier', 'Draft', '—', 8, 'Configure'],
] as const;

function TournamentManagerPage() {
  return (
    <>
      <PageHeader eyebrow="Login required" title={<>Tournament <GradientText>manager.</GradientText></>} description="Operate registration, seeding, bracket publication, result review, and participant communications." action={<Button>+ New tournament</Button>} />
      <div className={s.gridFour}>
        <Metric label="Draft" value="2" note="Not public" />
        <Metric label="Registration open" value="3" note="486 entrants" />
        <Metric label="Live" value="1" note="Healthy" />
        <Metric label="Completed" value="12" note="This quarter" />
      </div>

      <section className={s.section} style={{marginTop:20}}>
        <Card accent>
          <div className={s.kpiRow}><div><h2>Active tournaments</h2><p className={s.muted}>Manage the operational state of current events.</p></div><Status>Organizer only</Status></div>
          <div className={s.tableWrap} style={{marginTop:12}}>
            <table className={s.table}><thead><tr><th>Event</th><th>Status</th><th>Entrants</th><th>Fill rate</th><th>Next action</th></tr></thead>
              <tbody>{tournaments.map(([event,status,entrants,fill,action]) => <tr key={event}><td>{event}</td><td><Status tone={status === 'Live' ? 'live' : status === 'Draft' ? 'warning' : 'default'}>{status}</Status></td><td>{entrants}</td><td><Progress value={fill} /></td><td><Button small variant="outline">{action}</Button></td></tr>)}</tbody>
            </table>
          </div>
        </Card>
      </section>

      <section className={s.section}>
        <div className={s.gridTwo}>
          <Card accent><h2>Registration funnel</h2><p className={s.muted}>Campus Series Fall Open</p><div className={s.list} style={{marginTop:12}}><div className={s.listRow}><span>Event page visitors</span><b>2,418</b></div><div className={s.listRow}><span>Registration started</span><b>624</b></div><div className={s.listRow}><span>Registration completed</span><b>486</b></div><div className={s.listRow}><span>Payment complete</span><b>472</b></div></div></Card>
          <Card accent><h2>Operational quality</h2><p className={s.muted}>Current event portfolio</p><div className={s.list} style={{marginTop:12}}><div className={s.listRow}><span>Match reports resolved &lt; 2h</span><b>94%</b></div><div className={s.listRow}><span>Registration verification success</span><b>98.1%</b></div><div className={s.listRow}><span>Bracket publication on time</span><b>100%</b></div></div></Card>
        </div>
      </section>
    </>
  );
}
export default TournamentManagerPage;
