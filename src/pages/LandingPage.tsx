import React from 'react';
import '../App.css';

function LandingPage() {
  return (
    <div id="center" style={{ backgroundColor: '#0A0A0B', color: 'white', minHeight: 'calc(100vh - 70px)' }}>
      <div className="hero" style={{ maxWidth: '1200px', width: '100%', padding: '0 20px', display: 'flex', gap: '40px', alignItems: 'center', flexWrap: 'wrap' }}>
        
        <div style={{ flex: '1 1 500px', textAlign: 'left' }}>
          <p style={{ color: '#7a5cff', letterSpacing: '2px', fontSize: '0.85rem', fontWeight: 'bold', margin: '0 0 10px 0' }}>
            WHITE-LABEL ESPORTS PLATFORM
          </p>
          <h1 style={{ fontSize: '3rem', lineHeight: '1.2', margin: '0 0 20px 0', fontWeight: '800' }}>
            Launch your own branded esports platform. <span style={{ color: '#7a5cff' }}>Your brand, your domain, real prize pools.</span>
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#aaa', lineHeight: '1.6', margin: '0 0 30px 0' }}>
            Esports League Hub is the white label engine behind real tournaments, automated brackets, and real PayPal prize pools & entry fees - live on your own subdomain in minutes. No code, no devs.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#16161A', padding: '6px', borderRadius: '8px', border: '1px solid #27272A' }}>
            <span style={{ color: '#71717A', paddingLeft: '12px', fontSize: '0.9rem', whiteSpace: 'nowrap' }}>Your league name</span>
            <input 
              type="text" 
              placeholder="yourbrand.esportsleaguehub.com"
              style={{ background: 'transparent', border: 'none', color: 'white', flex: 1, padding: '0 12px', outline: 'none', fontSize: '0.9rem' }}
            />
            <button style={{ marginLeft: '20px', padding: '10px 20px', borderRadius: '6px', backgroundColor: 'white', color: 'black', fontWeight: 'bold', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap' }}>
              Launch your league - free &rarr;
            </button>
          </div>
        </div>

        <div style={{ flex: '1 1 450px', backgroundColor: '#111115', borderRadius: '12px', border: '1px solid #27272A', padding: '24px', textAlign: 'left' }}>
          <div style={{ fontSize: '0.8rem', color: '#71717A', marginBottom: '16px' }}>yourbrand.exportsleaguehub.com/dashboard</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
            <div>
              <div style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>$12,400</div>
              <div style={{ color: '#71717A', fontSize: '0.8rem' }}>Prize pool</div>
            </div>
            <div>
              <div style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>$3,180</div>
              <div style={{ color: '#71717A', fontSize: '0.8rem' }}>Entry revenue</div>
            </div>
            <div>
              <div style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>512</div>
              <div style={{ color: '#71717A', fontSize: '0.8rem' }}>Players</div>
            </div>
          </div>
          
          <div style={{ borderTop: '1px solid #27272A', paddingTop: '16px' }}>
            <p style={{ color: '#7a5cff', fontSize: '0.8rem', margin: '0 0 12px 0', fontWeight: 'bold' }}>Single elimination Round 2</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #1c1c21' }}>
              <span style={{ fontWeight: '500' }}>Team Nova</span> <span style={{ color: '#71717A' }}>VS</span> <span style={{ fontWeight: '500' }}>Team Apex</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
              <span style={{ fontWeight: '500' }}>Riptide</span> <span style={{ color: '#71717A' }}>VS</span> <span style={{ fontWeight: '500' }}>Vanta GG</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default LandingPage;