import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './navBar.module.css';

function NavBar() {
  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `${styles.navLink} ${isActive ? styles.active : ''}`;

  return (
    <nav className={styles.nav}>
      <div className={styles.navInner}>
        <NavLink to="/" end className={styles.brand}>
          <span className={styles.brandMark} aria-hidden="true" />
          Esports League Hub
        </NavLink>

        <div className={styles.links}>
          <NavLink to="/" end className={getNavLinkClass}>
            Platform
          </NavLink>

          <NavLink to="/pricing" className={getNavLinkClass}>
            Pricing
          </NavLink>

          <NavLink to="/questions" className={getNavLinkClass}>
            For Players
          </NavLink>

          <NavLink to="/trust" className={getNavLinkClass}>
            Trust
          </NavLink>
        </div>

        <div className={styles.actions}>
          <NavLink to="/login" className={styles.actionLink}>
            Sign in
          </NavLink>

          <NavLink
            to="/register"
            className={`${styles.actionLink} ${styles.competeAction}`}
          >
            Compete
          </NavLink>

          <NavLink
            to="/launch"
            className={`${styles.actionLink} ${styles.primaryAction}`}
          >
            Launch your league
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;