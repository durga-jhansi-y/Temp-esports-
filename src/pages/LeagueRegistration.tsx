import React from 'react';
import { Link } from 'react-router-dom';

function LeagueRegistration() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 70px)', padding: '40px 20px' }}>
      <div style={{ backgroundColor: '#111115', padding: '40px', borderRadius: '12px', border: '1px solid #27272A', width: '100%', maxWidth: '450px', textAlign: 'center' }}>
        
        <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', margin: '0 0 8px 0', color: 'white' }}>Launch your league</h2>
        <p style={{ color: '#A1A1AA', fontSize: '0.9rem', margin: '0 0 32px 0' }}>Spin up your own branded esports platform in minutes.</p>

        <form style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
          
          <div>
            <label style={{ display: 'block', color: 'white', fontSize: '0.85rem', marginBottom: '8px', fontWeight: 'bold' }}>Organization name</label>
            <input 
              type="text" 
              placeholder="Acme Esports League" 
              style={{ backgroundColor: '#16161A', border: '1px solid #27272A', color: 'white', padding: '12px', borderRadius: '6px', width: '100%', boxSizing: 'border-box', outline: 'none' }} 
            />
          </div>

          <div>
            <label style={{ display: 'block', color: 'white', fontSize: '0.85rem', marginBottom: '8px', fontWeight: 'bold' }}>Your address</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input 
                type="text" 
                placeholder="acme" 
                style={{ flex: 1, backgroundColor: '#16161A', border: '1px solid #27272A', color: 'white', padding: '12px', borderRadius: '6px', outline: 'none' }} 
              />
              <span style={{ color: '#A1A1AA', fontSize: '0.9rem' }}>.esportsleaguehub.com</span>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', color: 'white', fontSize: '0.85rem', marginBottom: '8px', fontWeight: 'bold' }}>Your name</label>
            <input 
              type="text" 
              placeholder="Jordan Smith" 
              style={{ backgroundColor: '#16161A', border: '1px solid #27272A', color: 'white', padding: '12px', borderRadius: '6px', width: '100%', boxSizing: 'border-box', outline: 'none' }} 
            />
          </div>

          <div>
            <label style={{ display: 'block', color: 'white', fontSize: '0.85rem', marginBottom: '8px', fontWeight: 'bold' }}>Email</label>
            <input 
              type="email" 
              placeholder="you@acme.com" 
              style={{ backgroundColor: '#16161A', border: '1px solid #27272A', color: 'white', padding: '12px', borderRadius: '6px', width: '100%', boxSizing: 'border-box', outline: 'none' }} 
            />
          </div>

          <div>
            <label style={{ display: 'block', color: 'white', fontSize: '0.85rem', marginBottom: '8px', fontWeight: 'bold' }}>Password</label>
            <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#16161A', border: '1px solid #27272A', borderRadius: '6px', paddingRight: '12px' }}>
              <input 
                type="password" 
                placeholder="At least 6 characters" 
                style={{ flex: 1, backgroundColor: 'transparent', border: 'none', color: 'white', padding: '12px', outline: 'none' }} 
              />
              <span style={{ cursor: 'pointer', color: '#A1A1AA' }}>👁️</span>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', color: 'white', fontSize: '0.85rem', marginBottom: '8px', fontWeight: 'bold' }}>Confirm password</label>
            <input 
              type="password" 
              placeholder="Re-enter password" 
              style={{ backgroundColor: '#16161A', border: '1px solid #27272A', color: 'white', padding: '12px', borderRadius: '6px', width: '100%', boxSizing: 'border-box', outline: 'none' }} 
            />
          </div>

          <button 
            type="button" 
            style={{ marginTop: '16px', padding: '12px', borderRadius: '6px', backgroundColor: '#8b8b8f', color: 'black', fontWeight: 'bold', border: 'none', cursor: 'pointer', width: '100%' }}>
            Create my league
          </button>
        </form>

        <p style={{ color: '#A1A1AA', fontSize: '0.85rem', marginTop: '24px' }}>
          Already have an account? <Link to="/login" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Sign In</Link>
        </p>
      </div>
    </div>
  );
}

export default LeagueRegistration;