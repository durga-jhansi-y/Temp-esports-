import {
  Button,
  Card,
  GradientText,
  PageHeader,
  Status,
  workspaceStyles as s,
} from '../../components/workspace/WorkspaceUI';

function AdminControlPage() {
  return (
    <>
      <PageHeader
        admin
        eyebrow="Admin only • Controls"
        title={
          <>
            Platform <GradientText>control.</GradientText>
          </>
        }
        description="Centralize administrative feature flags, access policy, operational thresholds, and platform safety settings."
        action={<Button>Save controls</Button>}
      />

      <div className={s.gridTwo}>
        <Card
          accent
          admin
        >
          <h2>Access policy</h2>

          <div className={s.list}>
            <label className={s.listRow}>
              <span>Require organizer verification</span>
              <input
                type="checkbox"
                defaultChecked
              />
            </label>

            <label className={s.listRow}>
              <span>Require MFA for admins</span>
              <input
                type="checkbox"
                defaultChecked
              />
            </label>

            <label className={s.listRow}>
              <span>Allow self-service league creation</span>
              <input
                type="checkbox"
                defaultChecked
              />
            </label>

            <label className={s.listRow}>
              <span>Allow public team creation</span>
              <input type="checkbox" />
            </label>
          </div>
        </Card>

        <Card
          accent
          admin
        >
          <h2>Operational thresholds</h2>

          <form className={s.formGrid}>
            <div className={s.field}>
              <label>Integrity escalation score</label>
              <input
                type="number"
                defaultValue="78"
              />
            </div>

            <div className={s.field}>
              <label>Payout manual-review threshold</label>
              <input defaultValue="$2,500" />
            </div>

            <div className={s.field}>
              <label>Registration velocity alert</label>
              <input defaultValue="35 / minute" />
            </div>

            <Button>Save thresholds</Button>
          </form>
        </Card>
      </div>

      <section className={s.section}>
        <Card
          accent
          admin
        >
          <h2>Feature controls</h2>

          <p className={s.muted}>
            Mock administrative switches for staged platform releases.
          </p>

          <div
            className={s.gridThree}
            style={{ marginTop: 18 }}
          >
            <Card admin>
              <h3>Advanced forecasting</h3>

              <p className={s.muted}>
                Enable expert forecast panels for Pro organizers.
              </p>

              <Status tone="live">Enabled</Status>
            </Card>

            <Card admin>
              <h3>Sponsor marketplace</h3>

              <p className={s.muted}>
                Allow league operators to publish sponsor inventory.
              </p>

              <Status tone="live">Enabled</Status>
            </Card>

            <Card admin>
              <h3>Automated payout routing</h3>

              <p className={s.muted}>
                Mock staged rollout of payout automation.
              </p>

              <Status tone="warning">In review</Status>
            </Card>
          </div>
        </Card>
      </section>

      <section className={s.section}>
        <Card admin>
          <div className={s.kpiRow}>
            <div>
              <h2>Change governance</h2>

              <p className={s.muted}>
                Critical controls should be auditable and attributable to an
                authorized admin.
              </p>
            </div>

            <Button variant="outline">
              Open audit log
            </Button>
          </div>
        </Card>
      </section>
    </>
  );
}

export default AdminControlPage;