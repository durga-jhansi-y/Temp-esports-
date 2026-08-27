import {
  Button,
  Card,
  GradientText,
  PageHeader,
  Progress,
  Status,
  workspaceStyles as s,
} from '../../components/workspace/WorkspaceUI';

function AccountIntegrationsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Login required"
        title={
          <>
            Account & <GradientText>integrations.</GradientText>
          </>
        }
        description="Manage league identity, notifications, security, webhooks, and connected services."
        action={<Button>Save changes</Button>}
      />

      <div className={s.gridTwo}>
        <Card accent>
          <h2>League profile</h2>

          <form className={s.formGrid}>
            <div className={s.field}>
              <label>League name</label>
              <input defaultValue="Capital Esports League" />
            </div>

            <div className={s.field}>
              <label>Public slug</label>
              <input defaultValue="capital-esports" />
            </div>

            <div className={s.field}>
              <label>Contact email</label>
              <input
                type="email"
                defaultValue="ops@example.com"
              />
            </div>

            <Button>Save profile</Button>
          </form>
        </Card>

        <Card accent>
          <h2>Connected services</h2>

          <div className={s.list}>
            <div className={s.listRow}>
              <span>Discord</span>
              <Status tone="live">Connected</Status>
            </div>

            <div className={s.listRow}>
              <span>Twitch</span>
              <Button small variant="outline">
                Connect
              </Button>
            </div>

            <div className={s.listRow}>
              <span>Webhook delivery</span>
              <Status tone="live">Healthy</Status>
            </div>
          </div>
        </Card>
      </div>

      <section className={s.section}>
        <Card accent>
          <div className={s.kpiRow}>
            <div>
              <h2>Security posture</h2>
              <p className={s.muted}>
                Recommended controls for organizer accounts.
              </p>
            </div>

            <strong style={{ fontSize: 24 }}>
              92% complete
            </strong>
          </div>

          <Progress value={92} />

          <div
            className={s.list}
            style={{ marginTop: 16 }}
          >
            <label className={s.listRow}>
              <span>Multi-factor authentication</span>
              <input
                type="checkbox"
                defaultChecked
              />
            </label>

            <label className={s.listRow}>
              <span>Login notifications</span>
              <input
                type="checkbox"
                defaultChecked
              />
            </label>

            <label className={s.listRow}>
              <span>Recovery codes stored</span>
              <input type="checkbox" />
            </label>
          </div>
        </Card>
      </section>
    </>
  );
}

export default AccountIntegrationsPage;