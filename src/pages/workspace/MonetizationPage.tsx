import { Button, Card, GradientText, Metric, PageHeader, Progress, Status, workspaceStyles as s } from '../../components/workspace/WorkspaceUI';

function MonetizationPage() {
  return (
    <>
      <PageHeader eyebrow="Login required • Business" title={<>League <GradientText>monetization.</GradientText></>} description="Track entry fees, sponsorship inventory, merchandise referrals, and prize-pool commitments from one organizer view." action={<Button>+ Sponsor package</Button>} />
      <div className={s.gridFour}><Metric label="Gross event revenue" value="$18.9K" note="+14.2% MoM"/><Metric label="Sponsor revenue" value="$7.4K" note="3 active partners"/><Metric label="Prize commitments" value="$9.8K" note="Across 8 events"/><Metric label="Net organizer share" value="$11.6K" note="Mock estimate"/></div>
      <div className={s.gridTwo} style={{marginTop:16}}><Card accent><div className={s.kpiRow}><div><h2>Revenue mix</h2><p className={s.muted}>Current season</p></div><Status>Advanced</Status></div><div className={s.list}><div className={s.listRow}><span>Entry fees</span><b>58%</b></div><div className={s.listRow}><span>Sponsorships</span><b>31%</b></div><div className={s.listRow}><span>Merch / affiliate</span><b>7%</b></div><div className={s.listRow}><span>Other</span><b>4%</b></div></div></Card><Card accent><h2>Sponsor inventory</h2><div className={s.tableWrap}><table className={s.table}><thead><tr><th>Package</th><th>Status</th><th>Value</th><th>Delivery</th></tr></thead><tbody><tr><td>Season presenting</td><td><Status tone="live">Active</Status></td><td>$4,000</td><td>82%</td></tr><tr><td>Finals broadcast</td><td><Status tone="warning">Pending</Status></td><td>$2,500</td><td>0%</td></tr><tr><td>MVP award</td><td><Status tone="live">Active</Status></td><td>$900</td><td>67%</td></tr></tbody></table></div></Card></div>
      <section className={s.section}><Card accent><div className={s.kpiRow}><div><h2>Prize-pool exposure</h2><p className={s.muted}>Keep organizer commitments visible before payout deadlines.</p></div><Status>Operational</Status></div><div className={s.gridThree} style={{marginTop:18}}><Metric label="Funded" value="$7.2K" note="73%"/><Metric label="Scheduled" value="$2.6K" note="Next 14 days"/><Metric label="At risk" value="$0" note="Healthy"/></div><div style={{marginTop:16}}><Progress value={73}/></div></Card></section>
    </>
  );
}
export default MonetizationPage;
