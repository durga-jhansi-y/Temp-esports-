import React from 'react';
import '../App.css';

function PricingPage() {
  return (
    <div style={{ backgroundColor: '#0A0A0B', color: 'white', padding: '60px 20px', textAlign: 'center' }}>
      <p style={{ color: '#7a5cff', letterSpacing: '1px', fontSize: '0.85rem', fontWeight: 'bold', margin: '0 0 10px 0' }}>
        SIMPLE, TRANSPARENT PRICING
      </p>
      <h2 style={{ fontSize: '2.25rem', fontWeight: '800', marginBottom: '40px' }}>
        Pick your tier. Start free, upgrade when you're earning.
      </h2>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', margin: '0 auto 60px', maxWidth: '1200px', flexWrap: 'wrap', alignItems: 'stretch' }}>
        
        <div style={{ backgroundColor: '#111115', padding: '32px 24px', borderRadius: '12px', flex: '1 1 250px', textAlign: 'left', border: '1px solid #27272A', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: '1.25rem', margin: '0 0 4px 0' }}>Free</h3>
          <p style={{ color: '#71717A', fontSize: '0.9rem', margin: '0 0 16px 0' }}>Your first bracket</p>
          <div style={{ fontSize: '2.5rem', fontWeight: '900', margin: '0 0 24px 0' }}>$0</div>
          <button style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid white', backgroundColor: 'transparent', color: 'white', fontWeight: 'bold', marginBottom: '24px', cursor: 'pointer' }}>Start free</button>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#A1A1AA', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li>✔ 1 ad slot</li>
          </ul>
        </div>

        <div style={{ backgroundColor: '#111115', padding: '32px 24px', borderRadius: '12px', flex: '1 1 250px', textAlign: 'left', border: '1px solid #27272A', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: '1.25rem', margin: '0 0 4px 0' }}>Starter</h3>
          <p style={{ color: '#71717A', fontSize: '0.9rem', margin: '0 0 16px 0' }}>Start earning</p>
          <div style={{ fontSize: '2.5rem', fontWeight: '900', margin: '0 0 24px 0' }}>$49</div>
          <button style={{ width: '100%', padding: '10px', borderRadius: '6px', border: 'none', backgroundColor: '#27272A', color: 'white', fontWeight: 'bold', marginBottom: '24px', cursor: 'pointer' }}>Choose Starter</button>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#A1A1AA', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li>✔ Analytics dashboard</li>
            <li>✔ Monetization & sponsors</li>
            <li>✔ 50% affiliate revenue share</li>
            <li>✔ 3 ad slots</li>
          </ul>
        </div>

        <div style={{ backgroundColor: '#151226', padding: '32px 24px', borderRadius: '12px', flex: '1 1 250px', textAlign: 'left', border: '2px solid #7a5cff', position: 'relative', display: 'flex', flexDirection: 'column' }}>
          <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#7a5cff', padding: '4px 12px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 'bold', letterSpacing: '0.5px' }}>MOST POPULAR</div>
          <h3 style={{ fontSize: '1.25rem', margin: '0 0 4px 0' }}>Pro</h3>
          <p style={{ color: '#A78BFA', fontSize: '0.9rem', margin: '0 0 16px 0' }}>Scale your league</p>
          <div style={{ fontSize: '2.5rem', fontWeight: '900', margin: '0 0 24px 0' }}>$199</div>
          <button style={{ width: '100%', padding: '10px', borderRadius: '6px', border: 'none', backgroundColor: '#7a5cff', color: 'white', fontWeight: 'bold', marginBottom: '24px', cursor: 'pointer' }}>Choose Pro</button>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#E4E4E7', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li>✔ Analytics dashboard</li>
            <li>✔ Monetization & sponsors</li>
            <li>✔ Live streaming</li>
            <li>✔ Advanced brackets</li>
            <li>✔ 70% affiliate revenue share</li>
            <li>✔ 10 ad slots</li>
          </ul>
        </div>

        <div style={{ backgroundColor: '#111115', padding: '32px 24px', borderRadius: '12px', flex: '1 1 250px', textAlign: 'left', border: '1px solid #27272A', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: '1.25rem', margin: '0 0 4px 0' }}>Elite</h3>
          <p style={{ color: '#71717A', fontSize: '0.9rem', margin: '0 0 16px 0' }}>Go pro</p>
          <div style={{ fontSize: '2.5rem', fontWeight: '900', margin: '0 0 24px 0' }}>$499</div>
          <button style={{ width: '100%', padding: '10px', borderRadius: '6px', border: 'none', backgroundColor: '#27272A', color: 'white', fontWeight: 'bold', marginBottom: '24px', cursor: 'pointer' }}>Choose Elite</button>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#A1A1AA', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li>✔ Analytics dashboard</li>
            <li>✔ Monetization & sponsors</li>
            <li>✔ Live streaming</li>
            <li>✔ Advanced brackets</li>
            <li>✔ NIL athlete hub</li>
            <li>✔ 80% affiliate revenue share</li>
            <li>✔ Unlimited ad slots</li>
          </ul>
        </div>

      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto', borderTop: '1px solid #27272A', paddingTop: '40px', textAlign: 'left' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '16px', color: '#E4E4E7' }}>BUILT FOR REAL PRIZE POOLS</h3>
        <ul style={{ paddingLeft: '20px', color: '#A1A1AA', fontSize: '0.95rem', lineHeight: '1.8' }}>
          <li>Server-authoritative payment capture—amounts can't be tampered with</li>
          <li>COPPA-compliant age gate before any minor data is collected</li>
          <li>Per-tenant row-level isolation—your data is only ever yours</li>
          <li>GDPR-ready data export & deletion</li>
        </ul>
      </div>
    </div>
  );
}

export default PricingPage;