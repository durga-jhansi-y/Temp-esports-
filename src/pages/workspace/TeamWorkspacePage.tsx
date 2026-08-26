import { Button, Card, GradientText, Metric, PageHeader, Progress, Status, workspaceStyles as s } from '../../components/workspace/WorkspaceUI';

function TeamWorkspacePage() {
  return (
    <>
      <PageHeader eyebrow="Login required" title={<>Team <GradientText>workspace.</GradientText></>} description="Manage roster eligibility, invitations, upcoming matches, availability, and performance preparation." action={<Button>Invite player</Button>} />
      <div className={s.gridThree}>
        <Metric label="Active roster" value="5 / 6" note="1 open slot" />
        <Metric label="Upcoming matches" value="4" note="Next 7 days" />
        <Metric label="Eligibility" value="100%" note="Verified" />
      </div>
      <div className={s.gridTwo} style={{marginTop:16}}>
        <Card accent><div className={s.kpiRow}><h2>Roster management</h2><Status tone="live">Verified</Status></div><div className={s.list}><div className={s.listRow}><span>J. Miller • Captain</span><Button small variant="outline">Manage</Button></div><div className={s.listRow}><span>A. Patel • Starter</span><Button small variant="outline">Manage</Button></div><div className={s.listRow}><span>M. Chen • Starter</span><Button small variant="outline">Manage</Button></div><div className={s.listRow}><span>S. Rivera • Starter</span><Button small variant="outline">Manage</Button></div></div></Card>
        <Card accent><h2>Upcoming schedule</h2><div className={s.list}><div className={s.listRow}><span>vs. Nova Prime</span><b>Aug 25 • 7:30</b></div><div className={s.listRow}><span>vs. Harbor Five</span><b>Aug 28 • 8:00</b></div><div className={s.listRow}><span>vs. Apex Blue</span><b>Aug 31 • 5:00</b></div></div></Card>
      </div>
      <section className={s.section}><Card accent><div className={s.kpiRow}><div><h2>Preparation analytics</h2><p className={s.muted}>Protected team-level insights from recent matches.</p></div><Status>Intermediate</Status></div><div className={s.inlineStats}><div><span>First-map win rate</span><strong>68%</strong><Progress value={68}/></div><div><span>Clutch conversion</span><strong>41%</strong><Progress value={41}/></div><div><span>Avg round diff</span><strong>+3.8</strong><Progress value={64}/></div><div><span>Late-map win rate</span><strong>72%</strong><Progress value={72}/></div></div></Card></section>
    </>
  );
}
export default TeamWorkspacePage;
