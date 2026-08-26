import { useState, type FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

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
      const defaultDestination = session.user.role === 'ADMIN' ? '/admin' : '/dashboard';
      navigate(requestedPath ?? defaultDestination, { replace: true });
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : 'Unable to sign in.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 'calc(100vh - 70px)',
        padding: '20px',
      }}
    >
      <div
        style={{
          backgroundColor: '#111115',
          padding: '40px',
          borderRadius: '12px',
          border: '1px solid #27272A',
          width: '100%',
          maxWidth: '400px',
          textAlign: 'center',
        }}
      >
        <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', margin: '0 0 8px 0', color: 'white' }}>
          Welcome Back
        </h2>

        <p style={{ color: '#A1A1AA', fontSize: '0.9rem', margin: '0 0 24px 0' }}>
          Enter your credentials to access your account
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
          <input
            type="email"
            placeholder="Email"
            aria-label="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            autoComplete="email"
            style={{ backgroundColor: '#16161A', border: '1px solid #27272A', color: 'white', padding: '12px', borderRadius: '6px', width: '100%', boxSizing: 'border-box', outline: 'none' }}
          />

          <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#16161A', border: '1px solid #27272A', borderRadius: '6px', paddingRight: '12px' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              aria-label="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              autoComplete="current-password"
              style={{ flex: 1, backgroundColor: 'transparent', border: 'none', color: 'white', padding: '12px', outline: 'none' }}
            />
            <button type="button" onClick={() => setShowPassword((prev) => !prev)} style={{ background: 'none', border: 'none', color: '#A1A1AA', cursor: 'pointer', fontSize: '0.8rem' }}>
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          <div style={{ textAlign: 'left', margin: '4px 0 0' }}>
            <Link to="#" style={{ color: 'white', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 'bold' }}>
              Forgot password?
            </Link>
          </div>

          {error && (
            <div role="alert" style={{ color: '#fda4af', background: 'rgba(244,63,94,.08)', border: '1px solid rgba(244,63,94,.2)', borderRadius: '6px', padding: '10px 12px', fontSize: '0.82rem' }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            style={{ marginTop: '8px', padding: '12px', borderRadius: '6px', backgroundColor: 'white', color: 'black', fontWeight: 'bold', border: 'none', cursor: isSubmitting ? 'wait' : 'pointer', width: '100%', opacity: isSubmitting ? 0.7 : 1 }}
          >
            {isSubmitting ? 'Signing In…' : 'Sign In'}
          </button>
        </form>

        <p style={{ color: '#A1A1AA', fontSize: '0.85rem', marginTop: '24px' }}>
          Don&apos;t have an account?{' '}
          <Link to="/register" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
