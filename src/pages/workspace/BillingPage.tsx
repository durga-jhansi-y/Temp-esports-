import {
  Button,
  Card,
  GradientText,
  Metric,
  PageHeader,
  Status,
  workspaceStyles as s,
} from '../../components/workspace/WorkspaceUI';

function BillingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Login required • Finance"
        title={
          <>
            Billing & <GradientText>payouts.</GradientText>
          </>
        }
        description="Review subscription status, event charges, payout schedules, and transaction-level operational summaries."
        action={<Button variant="outline">Export statement</Button>}
      />

      <div className={s.gridFour}>
        <Metric
          label="Current plan"
          value="League"
          note="$49 / month"
        />

        <Metric
          label="Next invoice"
          value="$61.40"
          note="Sep 15"
        />

        <Metric
          label="Pending payouts"
          value="$2,640"
          note="2 scheduled"
        />

        <Metric
          label="Payment success"
          value="98.7%"
          note="Healthy"
        />
      </div>

      <div
        className={s.gridTwo}
        style={{ marginTop: 16 }}
      >
        <Card accent>
          <h2>Subscription</h2>

          <div className={s.list}>
            <div className={s.listRow}>
              <span>League plan</span>
              <b>$49 / month</b>
            </div>

            <div className={s.listRow}>
              <span>Custom domain</span>
              <b>$12</b>
            </div>

            <div className={s.listRow}>
              <span>Processing estimate</span>
              <b>$0.40</b>
            </div>

            <div className={s.listRow}>
              <span>Estimated total</span>
              <b>$61.40</b>
            </div>
          </div>

          <Button
            small
            variant="outline"
          >
            Change plan
          </Button>
        </Card>

        <Card accent>
          <h2>Upcoming payouts</h2>

          <div className={s.tableWrap}>
            <table className={s.table}>
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>Capital Clash</td>
                  <td>$1,640</td>
                  <td>Sep 02</td>
                  <td>
                    <Status>Scheduled</Status>
                  </td>
                </tr>

                <tr>
                  <td>Campus Series</td>
                  <td>$1,000</td>
                  <td>Sep 08</td>
                  <td>
                    <Status>Scheduled</Status>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <section className={s.section}>
        <Card accent>
          <h2>Recent transaction activity</h2>

          <div className={s.tableWrap}>
            <table className={s.table}>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>Aug 24</td>
                  <td>Capital Clash entry fees</td>
                  <td>Revenue</td>
                  <td>+$2,184</td>
                  <td>
                    <Status tone="live">Settled</Status>
                  </td>
                </tr>

                <tr>
                  <td>Aug 22</td>
                  <td>Platform subscription</td>
                  <td>Expense</td>
                  <td>-$49</td>
                  <td>
                    <Status tone="live">Paid</Status>
                  </td>
                </tr>

                <tr>
                  <td>Aug 20</td>
                  <td>Sponsor payment</td>
                  <td>Revenue</td>
                  <td>+$900</td>
                  <td>
                    <Status tone="live">Settled</Status>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </section>
    </>
  );
}

export default BillingPage;