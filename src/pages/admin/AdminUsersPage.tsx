import { Button, Card, GradientText, Metric, PageHeader, Status, workspaceStyles as s } from '../../components/workspace/WorkspaceUI';

const users = [
  ['u-10482','Jordan Miller','Organizer','Verified','Active'],
  ['u-10481','Alex Chen','Player','Verified','Active'],
  ['u-10479','Morgan Rivera','Organizer','Pending','Active'],
  ['u-10473','Sam Patel','Player','Verified','Suspended'],
  ['u-10470','Taylor Brooks','Admin','Verified','Active'],
];

function AdminUsersPage() {
  return (
    <>
      <PageHeader admin eyebrow="Admin only" title={<>Users & <GradientText>roles.</GradientText></>} description="Review account status, platform roles, verification, and administrative actions." />
      <div className={s.gridFour}><Metric admin label="Total users" value="12,486" note="All accounts"/><Metric admin label="Organizers" value="642" note="5.1% of users"/><Metric admin label="Admins" value="11" note="Privileged roles"/><Metric admin label="Suspended" value="38" note="0.30%"/></div>
      <section className={s.section} style={{marginTop:20}}><Card accent admin><div className={s.tableWrap}><table className={s.table}><thead><tr><th>User ID</th><th>User</th><th>Role</th><th>Verification</th><th>Status</th><th>Action</th></tr></thead><tbody>{users.map(([id,name,role,verification,status]) => <tr key={id}><td>{id}</td><td>{name}</td><td>{role}</td><td><Status tone={verification === 'Verified' ? 'live' : 'warning'}>{verification}</Status></td><td><Status tone={status === 'Suspended' ? 'warning' : 'live'}>{status}</Status></td><td><Button small variant="outline">Review</Button></td></tr>)}</tbody></table></div></Card></section>
    </>
  );
}
export default AdminUsersPage;
