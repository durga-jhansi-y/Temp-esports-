import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function NavBar() {
  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 2rem', backgroundColor: '#0f0f13', color: 'white', alignItems: 'center' }}>
      <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.2rem' }}>
        Esports League Hub
      </Link>
      
      <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none', margin: 0, padding: 0 }}>
        <li>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Platform</Link>
        </li>
        <li>
          <Link to="/pricing" style={{ color: 'white', textDecoration: 'none' }}>Pricing</Link>
        </li>
        <li>
          <Link to="/questions" style={{ color: 'white', textDecoration: 'none' }}>For Players</Link>
        </li>
        <li>
          <Link to="/trust" style={{ color: 'white', textDecoration: 'none' }}>Trust</Link>
        </li>
      </ul>

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Link to="/login" style={{ textDecoration: 'none' }}>
          <button style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}>Sign in</button>
        </Link>
        
        <Link to="/register" style={{ textDecoration: 'none' }}>
          <button style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}>Compete</button>
        </Link>
        
        <Link to="/launch" style={{ textDecoration: 'none' }}>
          <button style={{ padding: '0.5rem 1rem', borderRadius: '4px', backgroundColor: 'white', color: 'black', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>
            Launch your league
          </button>
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;