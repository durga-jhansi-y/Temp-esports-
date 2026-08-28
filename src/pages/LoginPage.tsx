import { useState, type FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import styles from './AuthPages.module.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const requestedPath = (location.state as { from?: string } | null)?.from;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const session = await login({ email, password });
      const defaultDestination =
        session.user.role === 'ADMIN'
          ? '/admin'
          : session.user.role === 'PLAYER'
            ? '/player-dashboard'
            : '/dashboard';
      navigate(requestedPath ?? defaultDestination, { replace: true });
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : 'Unable to sign in.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.page}>
      <div className={styles.card}>
        <span className={styles.badge}>
          <span className={styles.badgeDot} aria-hidden="true" />
          Secure workspace access
        </span>

        <h1 className={styles.title}>
          Welcome <span className={styles.gradientText}>back.</span>
        </h1>
        <p className={styles.subtitle}>Enter your credentials to access your esports workspace.</p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="login-email">Email</label>
            <input
              id="login-email"
              className={styles.input}
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="login-password">Password</label>
            <div className={styles.inputShell}>
              <input
                id="login-password"
                className={styles.input}
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                autoComplete="current-password"
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

          <div className={styles.forgotRow}>
            <Link className={styles.textLink} to="#">Forgot password?</Link>
          </div>

          {error && (
            <div className={styles.error} role="alert">
              {error}
            </div>
          )}

          <button className={styles.primaryButton} type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Signing In…' : 'Sign In'}
          </button>
        </form>

        <p className={styles.footerText}>
          Don&apos;t have an account?
          <Link className={styles.textLink} to="/register">Register</Link>
        </p>
      </div>
    </section>
  );
}

export default LoginPage;