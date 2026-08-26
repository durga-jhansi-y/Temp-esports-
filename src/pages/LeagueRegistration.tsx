import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './AuthPages.module.css';

function LeagueRegistration() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <section className={styles.page}>
      <div className={`${styles.card} ${styles.leagueCard}`}>
        <span className={styles.badge}>
          <span className={styles.badgeDot} aria-hidden="true" />
          Public · League setup
        </span>

        <h1 className={styles.title}>
          Launch your <span className={styles.gradientText}>league.</span>
        </h1>
        <p className={styles.subtitle}>Spin up your own branded esports platform in minutes.</p>

        <form className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="organization-name">Organization name</label>
            <input
              id="organization-name"
              className={styles.input}
              type="text"
              placeholder="Acme Esports League"
              autoComplete="organization"
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="league-address">Your address</label>
            <div className={styles.inlineAddress}>
              <input
                id="league-address"
                className={styles.input}
                type="text"
                placeholder="acme"
                spellCheck={false}
              />
              <span className={styles.domainSuffix}>.esportsleaguehub.com</span>
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="owner-name">Your name</label>
            <input
              id="owner-name"
              className={styles.input}
              type="text"
              placeholder="Jordan Smith"
              autoComplete="name"
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="league-email">Email</label>
            <input
              id="league-email"
              className={styles.input}
              type="email"
              placeholder="you@acme.com"
              autoComplete="email"
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="league-password">Password</label>
            <div className={styles.inputShell}>
              <input
                id="league-password"
                className={styles.input}
                type={showPassword ? 'text' : 'password'}
                placeholder="At least 6 characters"
                autoComplete="new-password"
              />
              <button
                className={styles.passwordToggle}
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="league-confirm-password">Confirm password</label>
            <div className={styles.inputShell}>
              <input
                id="league-confirm-password"
                className={styles.input}
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Re-enter password"
                autoComplete="new-password"
              />
              <button
                className={styles.passwordToggle}
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
              >
                {showConfirmPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <button className={styles.primaryButton} type="button">Create my league</button>
        </form>

        <div className={styles.previewNote}>
          Frontend setup only. This keeps your current league-creation behavior unchanged and does not add or modify backend authentication.
        </div>

        <p className={styles.footerText}>
          Already have an account?
          <Link className={styles.textLink} to="/login">Sign In</Link>
        </p>
      </div>
    </section>
  );
}

export default LeagueRegistration;