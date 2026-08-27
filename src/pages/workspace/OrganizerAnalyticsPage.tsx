import {
  BarChart,
  Button,
  Card,
  GradientText,
  Metric,
  PageHeader,
  Progress,
  Status,
  workspaceStyles as s,
} from '../../components/workspace/WorkspaceUI';

function OrganizerAnalyticsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Login required • Advanced analytics"
        title={
          <>
            Organizer <GradientText>analytics.</GradientText>
          </>
        }
        description="Deeper event, acquisition, retention, revenue, and operational analytics for league operators."
        action={<Button variant="outline">Last 90 days</Button>}
      />

      <div className={s.gridFour}>
        <Metric
          label="Registration conversion"
          value="38.4%"
          note="+3.8 pts"
        />

        <Metric
          label="Returning players"
          value="61.8%"
          note="+5.2 pts"
        />

        <Metric
          label="Revenue / entrant"
          value="$18.42"
          note="+7.1%"
        />

        <Metric
          label="Forecast fill rate"
          value="89%"
          note="Model estimate"
        />
      </div>

      <div
        className={s.gridTwo}
        style={{ marginTop: 16 }}
      >
        <Card accent>
          <div className={s.kpiRow}>
            <div>
              <h2>Acquisition → registration</h2>
              <p className={s.muted}>Cross-event funnel</p>
            </div>

            <Status>Intermediate</Status>
          </div>

          <div className={s.list}>
            <div className={s.listRow}>
              <span>Unique event visitors</span>
              <b>12,640</b>
            </div>

            <div className={s.listRow}>
              <span>Registration intent</span>
              <b>6,780</b>
            </div>

            <div className={s.listRow}>
              <span>Completed registration</span>
              <b>4,854</b>
            </div>

            <div className={s.listRow}>
              <span>Paid / confirmed</span>
              <b>4,611</b>
            </div>
          </div>
        </Card>

        <Card accent>
          <div className={s.kpiRow}>
            <div>
              <h2>Revenue trend</h2>
              <p className={s.muted}>Gross event revenue</p>
            </div>

            <Status>Advanced</Status>
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
            values={[34, 42, 48, 53, 61, 69, 75, 88]}
          />
        </Card>
      </div>

      <section className={s.section}>
        <div className={s.gridTwo}>
          <Card accent>
            <h2>Retention cohorts</h2>

            <p className={s.muted}>
              Share of entrants returning to another event.
            </p>

            <div className={s.tableWrap}>
              <table className={s.table}>
                <thead>
                  <tr>
                    <th>Cohort</th>
                    <th>30d</th>
                    <th>60d</th>
                    <th>90d</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>May</td>
                    <td>68%</td>
                    <td>55%</td>
                    <td>47%</td>
                  </tr>

                  <tr>
                    <td>June</td>
                    <td>71%</td>
                    <td>58%</td>
                    <td>—</td>
                  </tr>

                  <tr>
                    <td>July</td>
                    <td>73%</td>
                    <td>—</td>
                    <td>—</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>

          <Card accent>
            <div className={s.kpiRow}>
              <div>
                <h2>Fill-rate forecast</h2>

                <p className={s.muted}>
                  Mock expert-level estimate for upcoming events.
                </p>
              </div>

              <Status>Expert preview</Status>
            </div>

            <div className={s.list}>
              <div className={s.listRow}>
                <span>Base case</span>
                <b>89%</b>
              </div>

              <div className={s.listRow}>
                <span>High case</span>
                <b>96%</b>
              </div>
            </div>

            <div className={s.callout}>
              Forecast values are UI mock data until a backend analytics
              endpoint is connected.
            </div>
          </Card>
        </div>
      </section>

      <section className={s.section}>
        <Card accent>
          <div className={s.kpiRow}>
            <div>
              <h2>Event benchmark</h2>

              <p className={s.muted}>
                V2 benchmark content, restyled in the v3 analytics system.
              </p>
            </div>

            <Status>Expert</Status>
          </div>

          <div className={s.tableWrap}>
            <table className={s.table}>
              <thead>
                <tr>
                  <th>Metric</th>
                  <th>Current</th>
                  <th>Baseline</th>
                  <th>Delta</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>Registration conversion</td>
                  <td>61%</td>
                  <td>52%</td>
                  <td>+9 pp</td>
                </tr>

                <tr>
                  <td>No-show rate</td>
                  <td>7.8%</td>
                  <td>10.4%</td>
                  <td>-2.6 pp</td>
                </tr>

                <tr>
                  <td>Disputes / 100</td>
                  <td>1.7</td>
                  <td>2.4</td>
                  <td>-29%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </section>
    </>
  );
}

export default OrganizerAnalyticsPage;