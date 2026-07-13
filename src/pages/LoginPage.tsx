import React from 'react';
import { Link } from 'react-router-dom';

function LoginPage() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 70px)', padding: '20px' }}>
      <div style={{ backgroundColor: '#111115', padding: '40px', borderRadius: '12px', border: '1px solid #27272A', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
        
        <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', margin: '0 0 8px 0', color: 'white' }}>Welcome Back</h2>
        <p style={{ color: '#A1A1AA', fontSize: '0.9rem', margin: '0 0 24px 0' }}>Enter your credentials to access your account</p>

        <form style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
          
          <input 
            type="email" 
            placeholder="Email" 
            style={{ backgroundColor: '#16161A', border: '1px solid #27272A', color: 'white', padding: '12px', borderRadius: '6px', width: '100%', boxSizing: 'border-box', outline: 'none' }} 
          />

          <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#16161A', border: '1px solid #27272A', borderRadius: '6px', paddingRight: '12px' }}>
            <input 
              type="password" 
              placeholder="Password" 
              style={{ flex: 1, backgroundColor: 'transparent', border: 'none', color: 'white', padding: '12px', outline: 'none' }} 
            />
            <span style={{ cursor: 'pointer', color: '#A1A1AA' }}>👁️</span>
          </div>

          <div style={{ textAlign: 'left', margin: '4px 0 8px 0' }}>
            <Link to="#" style={{ color: 'white', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 'bold' }}>Forgot password?</Link>
          </div>

          <button 
            type="button" 
            style={{ padding: '12px', borderRadius: '6px', backgroundColor: 'white', color: 'black', fontWeight: 'bold', border: 'none', cursor: 'pointer', width: '100%' }}>
            Sign In
          </button>
        </form>

        <p style={{ color: '#A1A1AA', fontSize: '0.85rem', marginTop: '24px' }}>
          Don't have an account? <Link to="/register" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Register</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;