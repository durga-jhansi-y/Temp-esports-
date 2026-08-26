import {
  BarChart,
  Button,
  Card,
  GradientText,
  Metric,
  PageHeader,
  Progress,
  SectionTitle,
  Status,
  workspaceStyles as s,
} from '../../components/workspace/WorkspaceUI';

function OrganizerDashboardPage() {
  return (
    <>
      <PageHeader
        eyebrow="Login required"
        title={<>Organizer <GradientText>dashboard.</GradientText></>}
        description="Your operational home for active events, registrations, team activity, and business metrics."
        action={<Button>+ Create tournament</Button>}
      />

      <div className={s.gridFour}>
        <Metric label="Active events" value="8" note="3 accepting entries" />
        <Metric label="Registered players" value="1,286" note="+9.8% this month" />
        <Metric label="Gross entry revenue" value="$18.9K" note="+14.2%" />
        <Metric label="Avg fill rate" value="83%" note="+4.1 pts" />
      </div>

      <div className={s.gridTwo} style={{ marginTop: 16 }}>
        <Card accent>
          <div className={s.kpiRow}>
            <div><h2>Registration trend</h2><p className={s.muted}>Weekly completed registrations</p></div>
            <Status>8 weeks</Status>
          </div>
          <BarChart labels={['W1','W2','W3','W4','W5','W6','W7','W8']} values={[42,48,45,57,64,70,76,86]} />
        </Card>

        <Card accent>
          <div className={s.kpiRow}>
            <div><h2>Event operations</h2><p className={s.muted}>Items that need organizer attention.</p></div>
            <Status tone="warning">5 tasks</Status>
          </div>
          <div className={s.list} style={{ marginTop: 12 }}>
            <div className={s.listRow}><span>Approve 12 pending registrations</span><Button small variant="outline">Review</Button></div>
            <div className={s.listRow}><span>Publish Campus Series bracket</span><Button small variant="outline">Publish</Button></div>
            <div className={s.listRow}><span>Resolve 2 match reports</span><Button small variant="outline">Open</Button></div>
          </div>
        </Card>
      </div>

      <section className={s.section}>
        <SectionTitle title="Portfolio performance" description="Intermediate organizer analytics across recent competitions." />
        <div className={s.gridThree}>
          <Card><span className={s.muted}>Registration conversion</span><strong style={{display:'block',fontSize:26,margin:'8px 0'}}>38.4%</strong><Progress value={38} /></Card>
          <Card><span className={s.muted}>Returning participant rate</span><strong style={{display:'block',fontSize:26,margin:'8px 0'}}>61.8%</strong><Progress value={62} /></Card>
          <Card><span className={s.muted}>Event completion</span><strong style={{display:'block',fontSize:26,margin:'8px 0'}}>96.3%</strong><Progress value={96} /></Card>
        </div>
      </section>
    </>
  );
}

export default OrganizerDashboardPage;
