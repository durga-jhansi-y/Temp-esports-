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

function AdminDashboardPage() {
  return (
    <>
      <PageHeader
        admin
        eyebrow="Admin only • Platform analytics"
        title={
          <>
            Platform <GradientText>control center.</GradientText>
          </>
        }
        description="Platform-wide operational, financial, growth, and integrity analytics unavailable to normal users."
        action={<Button variant="outline">Export report</Button>}
      />

      <div className={s.gridFour}>
        <Metric
          admin
          label="Total users"
          value="12,486"
          note="+8.1% MoM"
        />

        <Metric
          admin
          label="Platform revenue"
          value="$84.2K"
          note="30-day gross"
        />

        <Metric
          admin
          label="Payout exposure"
          value="$31.6K"
          note="Pending + scheduled"
        />

        <Metric
          admin
          label="Integrity risk"
          value="0.82%"
          note="Flagged matches"
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
              <h2>User growth</h2>
              <p className={s.muted}>Registered platform users</p>
            </div>

            <Status tone="admin">Admin</Status>
          </div>

          <BarChart
            labels={[
              'Jan',
              'Feb',
              'Mar',
              'Apr',
              'May',
              'Jun',
              'Jul',
              'Aug',
            ]}
            values={[34, 41, 48, 53, 60, 66, 76, 88]}
          />
        </Card>

        <Card
          accent
          admin
        >
          <h2>Administrative queues</h2>

          <div className={s.list}>
            <div className={s.listRow}>
              <span>Organizer verification</span>
              <b>8</b>
            </div>

            <div className={s.listRow}>
              <span>Payout review</span>
              <b>2</b>
            </div>

            <div className={s.listRow}>
              <span>Integrity escalations</span>
              <b>5</b>
            </div>

            <div className={s.listRow}>
              <span>User appeals</span>
              <b>3</b>
            </div>
          </div>
        </Card>
      </div>

      <section className={s.section}>
        <div className={s.gridThree}>
          <Card admin>
            <h3>Users & Roles</h3>

            <p className={s.muted}>
              Role changes, status, verification, and user lifecycle
              administration.
            </p>
          </Card>

          <Card admin>
            <h3>Integrity Review</h3>

            <p className={s.muted}>
              Disputes, anomaly signals, evidence, and case decisions.
            </p>
          </Card>

          <Card admin>
            <h3>System Health</h3>

            <p className={s.muted}>
              API success 99.98% • Payment webhooks healthy • Queue lag 0.8s.
            </p>
          </Card>
        </div>
      </section>

      <section className={s.section}>
        <div className={s.gridTwo}>
          <Card
            accent
            admin
          >
            <h2>Operational queue</h2>

            <div className={s.tableWrap}>
              <table className={s.table}>
                <thead>
                  <tr>
                    <th>Queue</th>
                    <th>Open</th>
                    <th>Oldest</th>
                    <th>SLA risk</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>Organizer verifications</td>
                    <td>8</td>
                    <td>19h</td>
                    <td>
                      <Status tone="live">Low</Status>
                    </td>
                  </tr>

                  <tr>
                    <td>Integrity disputes</td>
                    <td>5</td>
                    <td>2d</td>
                    <td>
                      <Status tone="warning">High</Status>
                    </td>
                  </tr>

                  <tr>
                    <td>Pending payouts</td>
                    <td>2</td>
                    <td>31h</td>
                    <td>
                      <Status>Medium</Status>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>

          <Card
            accent
            admin
          >
            <h2>Anomaly signal summary</h2>

            <p className={s.muted}>
              Signals require investigation; they are not automatic conclusions.
            </p>

            <div className={s.list}>
              <div className={s.listRow}>
                <span>Failed payout attempts</span>
                <b>7</b>
              </div>

              <div className={s.listRow}>
                <span>New account velocity</span>
                <b>+18%</b>
              </div>

              <div className={s.listRow}>
                <span>Dispute rate</span>
                <b>1.7 / 100</b>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </>
  );
}

export default AdminDashboardPage;