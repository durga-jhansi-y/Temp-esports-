import { Button, Card, GradientText, PageHeader, Status, workspaceStyles as s } from '../../components/workspace/WorkspaceUI';

const guides = [
  ['Getting started','Create a league, configure public pages, invite staff, and publish your first tournament.'],
  ['Tournament operations','Registration, seeding, brackets, match reports, disputes, and event completion.'],
  ['Branding & domains','League identity, custom domain setup, sponsor placements, and public content.'],
  ['Payments & payouts','Entry fees, invoices, payout schedules, payment status, and reconciliation.'],
  ['Analytics','Understand registration funnels, retention, benchmarks, and forecast indicators.'],
  ['Account & integrations','Connected services, account security, API access, and league profile settings.'],
];

function HelpPage() {
  return (
    <>
      <PageHeader eyebrow="Login required • Support" title={<>Help <GradientText>center.</GradientText></>} description="Find guidance for event operations, branding, payments, integrations, and common participant issues." action={<Button>Contact support</Button>} />
      <div className={s.gridThree}>{guides.map(([title,desc]) => <Card key={title} accent className={s.helpCard}><h3>{title}</h3><p className={s.muted}>{desc}</p><Button small variant="outline">Open guide</Button></Card>)}</div>
      <section className={s.section}><div className={s.gridTwo}><Card accent><h2>System status</h2><div className={s.list}><div className={s.listRow}><span>Core API</span><Status tone="live">Healthy</Status></div><div className={s.listRow}><span>Payments</span><Status tone="live">Healthy</Status></div><div className={s.listRow}><span>Notifications</span><Status tone="live">Healthy</Status></div></div></Card><Card accent><h2>Need an admin?</h2><p className={s.muted}>Role, integrity, and platform-level issues are handled in the protected admin workspace.</p><div style={{marginTop:16}}><Button small variant="outline">Preview admin guidance</Button></div></Card></div></section>
    </>
  );
}
export default HelpPage;
