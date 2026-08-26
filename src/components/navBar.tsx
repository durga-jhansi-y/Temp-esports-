import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import styles from './navBar.module.css';

function NavBar() {
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin, logout } = useAuth();

  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `${styles.navLink} ${isActive ? styles.active : ''}`;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.navInner}>
        <NavLink to="/" end className={styles.brand}>
          <span className={styles.brandMark} aria-hidden="true" />
          Esports League Hub
        </NavLink>

        <div className={styles.links}>
          <NavLink to="/" end className={getNavLinkClass}>Platform</NavLink>
          <NavLink to="/pricing" className={getNavLinkClass}>Pricing</NavLink>
          <NavLink to="/questions" className={getNavLinkClass}>For Players</NavLink>
          <NavLink to="/tournament" className={getNavLinkClass}>Tournaments</NavLink>
          <NavLink to="/live-center" className={getNavLinkClass}>Live Matches</NavLink>
          <NavLink to="/team" className={getNavLinkClass}>Teams</NavLink>
          <NavLink to="/rankings" className={getNavLinkClass}>Rankings</NavLink>
          <NavLink to="/trust" className={getNavLinkClass}>Trust</NavLink>
        </div>

        <div className={styles.actions}>
          {isAuthenticated ? (
            <>
              <NavLink to="/dashboard" className={styles.actionLink}>My workspace</NavLink>
              {isAdmin && <NavLink to="/admin" className={`${styles.actionLink} ${styles.primaryAction}`}>Admin</NavLink>}
              <button type="button" className={`${styles.actionLink} ${styles.actionButton}`} onClick={handleLogout}>Sign out</button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={styles.actionLink}>Sign in</NavLink>
              <NavLink to="/register" className={`${styles.actionLink} ${styles.competeAction}`}>Compete</NavLink>
              <NavLink to="/launch" className={`${styles.actionLink} ${styles.primaryAction}`}>Launch your league</NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;