import { useState } from 'react';
import { Link } from 'react-router-dom';

{/* PlayerRegistration Page */}
function RegistrationPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 70px)', padding: '20px' }}>
      <div style={{ backgroundColor: '#111115', padding: '40px', borderRadius: '12px', border: '1px solid #27272A', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
        
        <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', margin: '0 0 8px 0', color: 'white' }}>Create an Account</h2>
        <p style={{ color: '#A1A1AA', fontSize: '0.9rem', margin: '0 0 24px 0' }}>Enter your details to register</p>

        <form style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
          
          <input 
            type="email" 
            placeholder="Email" 
            style={{ backgroundColor: '#16161A', border: '1px solid #27272A', color: 'white', padding: '12px', borderRadius: '6px', width: '100%', boxSizing: 'border-box', outline: 'none' }} 
          />

          <div>
            <label style={{ display: 'block', color: 'white', fontSize: '0.85rem', marginBottom: '8px', fontWeight: 'bold' }}>Date of birth</label>
            <input 
              type="date" 
              style={{ backgroundColor: '#16161A', border: '1px solid #27272A', color: '#A1A1AA', padding: '12px', borderRadius: '6px', width: '100%', boxSizing: 'border-box', outline: 'none', colorScheme: 'dark' }} 
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#16161A', border: '1px solid #27272A', borderRadius: '6px', paddingRight: '12px' }}>
            <input 
              type={showPassword ? 'text' : 'password'} 
              placeholder="Password" 
              style={{ flex: 1, backgroundColor: 'transparent', border: 'none', color: 'white', padding: '12px', outline: 'none' }} 
            />
            <button 
              type="button" 
              onClick={() => setShowPassword((prev) => !prev)}
              style={{ background: 'none', border: 'none', color: '#A1A1AA', cursor: 'pointer', fontSize: '0.8rem' }}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#16161A', border: '1px solid #27272A', borderRadius: '6px', paddingRight: '12px' }}>
            <input 
              type={showConfirmPassword ? 'text' : 'password'} 
              placeholder="Confirm Password" 
              style={{ flex: 1, backgroundColor: 'transparent', border: 'none', color: 'white', padding: '12px', outline: 'none' }} 
            />
            <button 
              type="button" 
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              style={{ background: 'none', border: 'none', color: '#A1A1AA', cursor: 'pointer', fontSize: '0.8rem' }}
            >
              {showConfirmPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          <button 
            type="button" 
            style={{ marginTop: '8px', padding: '12px', borderRadius: '6px', backgroundColor: 'white', color: 'black', fontWeight: 'bold', border: 'none', cursor: 'pointer', width: '100%' }}>
            Register
          </button>
        </form>

        <p style={{ color: '#A1A1AA', fontSize: '0.85rem', marginTop: '24px' }}>
          Already have an account? <Link to="/login" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Sign In</Link>
        </p>
      </div>
    </div>
  );
}

export default RegistrationPage;