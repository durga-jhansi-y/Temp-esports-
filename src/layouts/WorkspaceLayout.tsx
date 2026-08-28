import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import styles from './WorkspaceLayout.module.css';

const workspaceLinks = [
  { to: '/dashboard', icon: '⌂', label: 'Dashboard' },
  { to: '/tournament-manager', icon: '◫', label: 'Tournament Manager' },
  { to: '/team-workspace', icon: '◇', label: 'Team Workspace' },
  { to: '/organizer-analytics', icon: '⌁', label: 'Advanced Analytics' },
  { to: '/branding', icon: '✦', label: 'Branding' },
  { to: '/monetization', icon: '$', label: 'Monetization' },
  { to: '/billing', icon: '▤', label: 'Billing' },
  { to: '/account-integrations', icon: '⚙', label: 'Account & Integrations' },
  { to: '/help', icon: '?', label: 'Help' },
];

const playerLinks = [
  { to: '/player-dashboard', icon: '◉', label: 'Player Dashboard' },
  { to: '/dashboard', icon: '⌂', label: 'Dashboard' },
  { to: '/tournament-manager', icon: '◫', label: 'Tournament Manager' },
  { to: '/team-workspace', icon: '◇', label: 'Team Workspace' },
  { to: '/organizer-analytics', icon: '⌁', label: 'Advanced Analytics' },
  { to: '/branding', icon: '✦', label: 'Branding' },
  { to: '/monetization', icon: '$', label: 'Monetization' },
  { to: '/billing', icon: '▤', label: 'Billing' },
  { to: '/account-integrations', icon: '⚙', label: 'Account & Integrations' },
  { to: '/help', icon: '?', label: 'Help' },
];

const adminLinks = [
  { to: '/admin', icon: '⌂', label: 'Admin Dashboard' },
  { to: '/admin/users', icon: '◉', label: 'Users & Roles' },
  { to: '/admin/control', icon: '⚙', label: 'Admin Control' },
  { to: '/admin/integrity', icon: '◈', label: 'Integrity Review' },
  { to: '/admin/audit', icon: '▦', label: 'Companies & Audit' },
];

interface WorkspaceLayoutProps {
  mode?: 'workspace' | 'admin';
}

function WorkspaceLayout({ mode = 'workspace' }: WorkspaceLayoutProps) {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const links =
    mode === 'admin'
      ? adminLinks
      : user?.role === 'PLAYER'
        ? playerLinks
        : workspaceLinks;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <span className={styles.sectionLabel}>
          {mode === 'admin' ? 'Admin only' : 'Signed-in workspace'}
        </span>

        <div className={styles.identity}>
          <strong>{user?.displayName ?? user?.email}</strong>
          <span>{user?.role}</span>
        </div>

        <nav className={styles.sideNav} aria-label={mode === 'admin' ? 'Admin navigation' : 'Workspace navigation'}>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/admin'}
              className={({ isActive }) => `${styles.sideLink} ${isActive ? styles.active : ''}`}
            >
              <b aria-hidden="true">{link.icon}</b>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className={styles.separator} />

        {mode === 'admin' ? (
          <NavLink className={styles.sideLink} to="/dashboard">
            ← Signed-in workspace
          </NavLink>
        ) : (
          <NavLink className={styles.sideLink} to="/">
            ← Public website
          </NavLink>
        )}

        <button className={styles.logoutButton} type="button" onClick={handleLogout}>
          Sign out
        </button>
      </aside>

      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
}

export default WorkspaceLayout;