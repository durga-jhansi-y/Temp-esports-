import {
  Button,
  Card,
  GradientText,
  PageHeader,
  Progress,
  Status,
  workspaceStyles as s,
} from '../../components/workspace/WorkspaceUI';

function BrandingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Login required • Brand workspace"
        title={
          <>
            League <GradientText>branding.</GradientText>
          </>
        }
        description="Manage the public identity of your league while preserving the same competitive product experience."
        action={<Button>Save brand</Button>}
      />

      <div className={s.gridTwo}>
        <Card accent>
          <h2>Brand identity</h2>

          <form className={s.formGrid}>
            <div className={s.field}>
              <label>League display name</label>
              <input defaultValue="Capital Esports League" />
            </div>

            <div className={s.field}>
              <label>Public domain</label>
              <input defaultValue="capital.esportsleaguehub.gg" />
            </div>

            <div className={s.field}>
              <label>Primary accent</label>
              <input defaultValue="#7a5cff" />
            </div>

            <div className={s.field}>
              <label>Tagline</label>
              <input defaultValue="Compete locally. Rise nationally." />
            </div>

            <Button>Save identity</Button>
          </form>
        </Card>

        <Card accent>
          <div className={s.kpiRow}>
            <h2>Live preview</h2>
            <Status>Public</Status>
          </div>

          <div
            style={{
              textAlign: 'center',
              padding: '50px 20px',
            }}
          >
            <div
              style={{
                width: 84,
                height: 84,
                display: 'grid',
                placeItems: 'center',
                margin: '0 auto 16px',
                borderRadius: 24,
                background: 'linear-gradient(135deg,#7a5cff,#6344f5)',
                fontSize: 26,
                fontWeight: 900,
              }}
            >
              CEL
            </div>

            <h2>Capital Esports League</h2>

            <p className={s.muted}>
              Compete locally. Rise nationally.
            </p>

            <div
              style={{
                marginTop: 18,
                display: 'flex',
                gap: 10,
                justifyContent: 'center',
              }}
            >
              <Button small>Explore events</Button>

              <Button
                small
                variant="outline"
              >
                View rankings
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <section className={s.section}>
        <Card accent>
          <h2>Public experience controls</h2>

          <p className={s.muted}>
            Choose what appears across your public league pages.
          </p>

          <div
            className={s.gridThree}
            style={{ marginTop: 18 }}
          >
            <div>
              <h3>Homepage modules</h3>

              <label className={s.listRow}>
                <span>Live match strip</span>
                <input
                  type="checkbox"
                  defaultChecked
                />
              </label>

              <label className={s.listRow}>
                <span>Prize pool summary</span>
                <input
                  type="checkbox"
                  defaultChecked
                />
              </label>

              <label className={s.listRow}>
                <span>Top rankings</span>
                <input
                  type="checkbox"
                  defaultChecked
                />
              </label>
            </div>

            <div>
              <h3>Sponsor placement</h3>

              <p className={s.muted}>
                Reserve branded positions on event and league pages.
              </p>

              <Button
                small
                variant="outline"
              >
                Preview placements
              </Button>
            </div>

            <div>
              <h3>Domain status</h3>

              <Status tone="live">Connected</Status>

              <div style={{ marginTop: 14 }}>
                <Progress value={100} />
              </div>
            </div>
          </div>
        </Card>
      </section>
    </>
  );
}

export default BrandingPage;