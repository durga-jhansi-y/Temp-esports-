import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../auth/AuthContext';
import styles from './AuthPages.module.css';

function RegistrationPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsSubmitting(true);

    try {
      const session = await register({
        username,
        email,
        password,
      });

      const destination =
        session.user.role === 'ADMIN'
          ? '/admin'
          : '/dashboard';

      navigate(destination, {
        replace: true,
      });
    } catch (registrationError) {
      setError(
        registrationError instanceof Error
          ? registrationError.message
          : 'Unable to create account.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.page}>
      <div className={styles.card}>
        <span className={styles.badge}>
          <span
            className={styles.badgeDot}
            aria-hidden="true"
          />
          Join the competition
        </span>

        <h1 className={styles.title}>
          Create your{' '}
          <span className={styles.gradientText}>
            account.
          </span>
        </h1>

        <p className={styles.subtitle}>
          Enter your details to create your account and
          access the esports platform.
        </p>

        <form
          className={styles.form}
          onSubmit={handleSubmit}
        >
          <div className={styles.field}>
            <label
              className={styles.label}
              htmlFor="register-username"
            >
              Username
            </label>

            <input
              id="register-username"
              className={styles.input}
              type="text"
              placeholder="Choose a username"
              value={username}
              onChange={(event) =>
                setUsername(event.target.value)
              }
              minLength={3}
              maxLength={50}
              required
            />
          </div>

          <div className={styles.field}>
            <label
              className={styles.label}
              htmlFor="register-email"
            >
              Email
            </label>

            <input
              id="register-email"
              className={styles.input}
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              maxLength={100}
              required
            />
          </div>

          <div className={styles.field}>
            <label
              className={styles.label}
              htmlFor="register-date-of-birth"
            >
              Date of birth
            </label>

            <input
              id="register-date-of-birth"
              className={styles.input}
              type="date"
            />
          </div>

          <div className={styles.field}>
            <label
              className={styles.label}
              htmlFor="register-password"
            >
              Password
            </label>

            <div className={styles.inputShell}>
              <input
                id="register-password"
                className={styles.input}
                type={showPassword ? 'text' : 'password'}
                placeholder="Create a password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                minLength={8}
                maxLength={128}
                required
              />

              <button
                className={styles.passwordToggle}
                type="button"
                onClick={() =>
                  setShowPassword(
                    (previous) => !previous,
                  )
                }
                aria-label={
                  showPassword
                    ? 'Hide password'
                    : 'Show password'
                }
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <div className={styles.field}>
            <label
              className={styles.label}
              htmlFor="register-confirm-password"
            >
              Confirm password
            </label>

            <div className={styles.inputShell}>
              <input
                id="register-confirm-password"
                className={styles.input}
                type={
                  showConfirmPassword
                    ? 'text'
                    : 'password'
                }
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(event) =>
                  setConfirmPassword(
                    event.target.value,
                  )
                }
                minLength={8}
                maxLength={128}
                required
              />

              <button
                className={styles.passwordToggle}
                type="button"
                onClick={() =>
                  setShowConfirmPassword(
                    (previous) => !previous,
                  )
                }
                aria-label={
                  showConfirmPassword
                    ? 'Hide confirmation password'
                    : 'Show confirmation password'
                }
              >
                {showConfirmPassword
                  ? 'Hide'
                  : 'Show'}
              </button>
            </div>
          </div>

          {error && (
            <div
              className={styles.error}
              role="alert"
            >
              {error}
            </div>
          )}

          <button
            className={styles.primaryButton}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? 'Creating account...'
              : 'Register'}
          </button>
        </form>

        <p className={styles.footerText}>
          Already have an account?
          <Link
            className={styles.textLink}
            to="/login"
          >
            Sign In
          </Link>
        </p>
      </div>
    </section>
  );
}

export default RegistrationPage;