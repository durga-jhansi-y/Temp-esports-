import {
  BarChart,
  Button,
  Card,
  GradientText,
  Metric,
  PageHeader,
  Status,
  workspaceStyles as s,
} from '../../components/workspace/WorkspaceUI';

function AdminIntegrityPage() {
  return (
    <>
      <PageHeader
        admin
        eyebrow="Admin only • Integrity"
        title={
          <>
            Integrity <GradientText>review.</GradientText>
          </>
        }
        description="Investigate disputes and anomaly signals with evidence, match context, history, and administrative decision tracking."
        action={<Button>Export cases</Button>}
      />

      <div className={s.gridFour}>
        <Metric
          admin
          label="Open cases"
          value="18"
          note="5 high priority"
        />

        <Metric
          admin
          label="Flag rate"
          value="0.82%"
          note="Of published matches"
        />

        <Metric
          admin
          label="Median age"
          value="14h"
          note="-3h this week"
        />

        <Metric
          admin
          label="Escalation rate"
          value="12%"
          note="Last 30 days"
        />
      </div>

      <div
        className={s.gridTwo}
        style={{ marginTop: 16 }}
      >
        <Card
          accent
          admin
        >
          <div className={s.kpiRow}>
            <div>
              <h2>High-priority cases</h2>
              <p className={s.muted}>Simulated review queue</p>
            </div>

            <Status tone="warning">5 priority</Status>
          </div>

          <div className={s.list}>
            <div className={s.listRow}>
              <div>
                <b>#IR-2184 • Match result dispute</b>
                <div className={s.muted}>
                  Capital Clash • Nova vs Apex
                </div>
              </div>

              <Button
                small
                variant="outline"
              >
                Open
              </Button>
            </div>

            <div className={s.listRow}>
              <div>
                <b>#IR-2181 • Account sharing signal</b>
                <div className={s.muted}>
                  Campus Series • Player profile
                </div>
              </div>

              <Button
                small
                variant="outline"
              >
                Open
              </Button>
            </div>

            <div className={s.listRow}>
              <div>
                <b>#IR-2176 • Score anomaly</b>
                <div className={s.muted}>
                  Community Cup • Match #442
                </div>
              </div>

              <Button
                small
                variant="outline"
              >
                Open
              </Button>
            </div>
          </div>
        </Card>

        <Card
          accent
          admin
        >
          <h2>Signal trend</h2>

          <p className={s.muted}>
            Integrity flags by week
          </p>

          <BarChart
            labels={[
              'W1',
              'W2',
              'W3',
              'W4',
              'W5',
              'W6',
              'W7',
              'W8',
            ]}
            values={[62, 51, 74, 48, 44, 39, 35, 31]}
          />
        </Card>
      </div>

      <section className={s.section}>
        <Card admin>
          <div className={s.kpiRow}>
            <div>
              <h2>Case quality analytics</h2>

              <p className={s.muted}>
                Administrative-only operational measures.
              </p>
            </div>

            <Status tone="admin">Admin</Status>
          </div>

          <div className={s.inlineStats}>
            <div>
              <span>Confirmed issue</span>
              <strong>31%</strong>
            </div>

            <div>
              <span>No action</span>
              <strong>54%</strong>
            </div>

            <div>
              <span>Needs evidence</span>
              <strong>15%</strong>
            </div>

            <div>
              <span>SLA met</span>
              <strong>96%</strong>
            </div>
          </div>
        </Card>
      </section>
    </>
  );
}

export default AdminIntegrityPage;