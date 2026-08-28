import {
  useState,
  type FormEvent,
} from 'react';

import {
  Link,
  useNavigate,
} from 'react-router-dom';

import { useAuth } from '../auth/AuthContext';

function RegistrationPage() {
  const [
    username,
    setUsername,
  ] = useState('');

  const [
    email,
    setEmail,
  ] = useState('');

  const [
    password,
    setPassword,
  ] = useState('');

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState('');

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState('');

  const [
    isSubmitting,
    setIsSubmitting,
  ] = useState(false);

  const { register } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setError('');

    if (
      password !== confirmPassword
    ) {
      setError(
        'Passwords do not match.',
      );

      return;
    }

    setIsSubmitting(true);

    try {
      const session =
        await register({
          username,
          email,
          password,
        });

      const destination =
        session.user.role === 'ADMIN'
          ? '/admin'
          : '/dashboard';

      navigate(
        destination,
        {
          replace: true,
        },
      );
    } catch (
      registrationError
    ) {
      setError(
        registrationError instanceof
          Error
          ? registrationError.message
          : 'Unable to create account.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle = {
    backgroundColor: '#16161A',

    border:
      '1px solid #27272A',

    color: 'white',

    padding: '12px',

    borderRadius: '6px',

    width: '100%',

    boxSizing:
      'border-box' as const,

    outline: 'none',
  };

  return (
    <div
      style={{
        display: 'flex',

        justifyContent:
          'center',

        alignItems: 'center',

        minHeight:
          'calc(100vh - 70px)',

        padding: '20px',
      }}
    >
      <div
        style={{
          backgroundColor:
            '#111115',

          padding: '40px',

          borderRadius:
            '12px',

          border:
            '1px solid #27272A',

          width: '100%',

          maxWidth: '400px',

          textAlign: 'center',
        }}
      >
        <h2
          style={{
            fontSize:
              '1.75rem',

            fontWeight:
              'bold',

            margin:
              '0 0 8px 0',

            color: 'white',
          }}
        >
          Create an Account
        </h2>

        <p
          style={{
            color: '#A1A1AA',

            fontSize:
              '0.9rem',

            margin:
              '0 0 24px 0',
          }}
        >
          Enter your details
          to register
        </p>

        <form
          onSubmit={
            handleSubmit
          }
          style={{
            display: 'flex',

            flexDirection:
              'column',

            gap: '16px',

            textAlign: 'left',
          }}
        >
          <input
            type="text"
            placeholder="Username"
            aria-label="Username"
            value={username}
            onChange={(
              event,
            ) =>
              setUsername(
                event.target
                  .value,
              )
            }
            minLength={3}
            maxLength={50}
            required
            style={
              inputStyle
            }
          />

          <input
            type="email"
            placeholder="Email"
            aria-label="Email"
            value={email}
            onChange={(
              event,
            ) =>
              setEmail(
                event.target
                  .value,
              )
            }
            maxLength={100}
            required
            style={
              inputStyle
            }
          />

          <div>
            <label
              style={{
                display:
                  'block',

                color:
                  'white',

                fontSize:
                  '0.85rem',

                marginBottom:
                  '8px',

                fontWeight:
                  'bold',
              }}
            >
              Date of birth
            </label>

            <input
              type="date"
              style={{
                ...inputStyle,

                color:
                  '#A1A1AA',

                colorScheme:
                  'dark',
              }}
            />
          </div>

          <div
            style={{
              display:
                'flex',

              alignItems:
                'center',

              backgroundColor:
                '#16161A',

              border:
                '1px solid #27272A',

              borderRadius:
                '6px',

              paddingRight:
                '12px',
            }}
          >
            <input
              type={
                showPassword
                  ? 'text'
                  : 'password'
              }
              placeholder="Password"
              aria-label="Password"
              value={password}
              onChange={(
                event,
              ) =>
                setPassword(
                  event.target
                    .value,
                )
              }
              minLength={8}
              maxLength={128}
              required
              style={{
                flex: 1,

                backgroundColor:
                  'transparent',

                border: 'none',

                color: 'white',

                padding: '12px',

                outline: 'none',
              }}
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  (previous) =>
                    !previous,
                )
              }
              style={{
                background:
                  'none',

                border: 'none',

                color:
                  '#A1A1AA',

                cursor:
                  'pointer',

                fontSize:
                  '0.8rem',
              }}
            >
              {showPassword
                ? 'Hide'
                : 'Show'}
            </button>
          </div>

          <div
            style={{
              display:
                'flex',

              alignItems:
                'center',

              backgroundColor:
                '#16161A',

              border:
                '1px solid #27272A',

              borderRadius:
                '6px',

              paddingRight:
                '12px',
            }}
          >
            <input
              type={
                showConfirmPassword
                  ? 'text'
                  : 'password'
              }
              placeholder="Confirm Password"
              aria-label="Confirm Password"
              value={
                confirmPassword
              }
              onChange={(
                event,
              ) =>
                setConfirmPassword(
                  event.target
                    .value,
                )
              }
              minLength={8}
              maxLength={128}
              required
              style={{
                flex: 1,

                backgroundColor:
                  'transparent',

                border: 'none',

                color: 'white',

                padding: '12px',

                outline: 'none',
              }}
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(
                  (previous) =>
                    !previous,
                )
              }
              style={{
                background:
                  'none',

                border: 'none',

                color:
                  '#A1A1AA',

                cursor:
                  'pointer',

                fontSize:
                  '0.8rem',
              }}
            >
              {showConfirmPassword
                ? 'Hide'
                : 'Show'}
            </button>
          </div>

          {error && (
            <p
              style={{
                color:
                  '#F87171',

                fontSize:
                  '0.85rem',

                margin: 0,
              }}
              role="alert"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={
              isSubmitting
            }
            style={{
              marginTop:
                '8px',

              padding:
                '12px',

              borderRadius:
                '6px',

              backgroundColor:
                'white',

              color:
                'black',

              fontWeight:
                'bold',

              border: 'none',

              cursor:
                isSubmitting
                  ? 'not-allowed'
                  : 'pointer',

              opacity:
                isSubmitting
                  ? 0.7
                  : 1,

              width:
                '100%',
            }}
          >
            {isSubmitting
              ? 'Creating account...'
              : 'Register'}
          </button>
        </form>

        <p
          style={{
            color:
              '#A1A1AA',

            fontSize:
              '0.85rem',

            marginTop:
              '24px',
          }}
        >
          Already have an
          account?{' '}

          <Link
            to="/login"
            style={{
              color:
                'white',

              textDecoration:
                'none',

              fontWeight:
                'bold',
            }}
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegistrationPage;