import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './AuthPages.module.css';

function RegistrationPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <section className={styles.page}>
      <div className={styles.card}>
        <span className={styles.badge}>
          <span className={styles.badgeDot} aria-hidden="true" />
          Player registration
        </span>

        <h1 className={styles.title}>
          Create an <span className={styles.gradientText}>account.</span>
        </h1>
        <p className={styles.subtitle}>Enter your details to register for Esports League Hub.</p>

        <form className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="register-email">Email</label>
            <input
              id="register-email"
              className={styles.input}
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="register-dob">Date of birth</label>
            <input
              id="register-dob"
              className={styles.input}
              type="date"
              autoComplete="bday"
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="register-password">Password</label>
            <div className={styles.inputShell}>
              <input
                id="register-password"
                className={styles.input}
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
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
            <label className={styles.label} htmlFor="register-confirm-password">Confirm password</label>
            <div className={styles.inputShell}>
              <input
                id="register-confirm-password"
                className={styles.input}
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm Password"
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

          <button className={styles.primaryButton} type="button">Register</button>
        </form>

        <p className={styles.footerText}>
          Already have an account?
          <Link className={styles.textLink} to="/login">Sign In</Link>
        </p>
      </div>
    </section>
  );
}

export default RegistrationPage;