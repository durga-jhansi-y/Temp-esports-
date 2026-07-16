import React from 'react';
import '../App.css';
import { Button } from '../components/ui/Button'; // Adjust this path based on your folder structure
import { Card } from '../components/ui/Card'; // Adjust this path based on your folder structure

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
        
        {/* FREE TIER */}
        <Card
          style={{ flex: '1 1 250px', minWidth: '250px', height: '100%', boxSizing: 'border-box', backgroundColor: '#111115', padding: '32px 24px', borderRadius: '12px', textAlign: 'left', border: '1px solid #27272A', display: 'flex', flexDirection: 'column' }}
          heading={<span style={{ fontSize: '1.25rem', margin: '0 0 4px 0', display: 'block' }}>Free</span>}
          description={<span style={{ color: '#71717A', fontSize: '0.9rem', margin: '0 0 16px 0', display: 'block' }}>Your first bracket</span>}
        >
          <div style={{ fontSize: '2.5rem', fontWeight: '900', margin: '0 0 24px 0' }}>$0</div>
          
          <Button 
            variant="outline" 
            style={{ width: '100%', border: '1px solid white', backgroundColor: 'transparent', color: 'white', marginBottom: '24px' }}
          >
            Start free
          </Button>

          <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#A1A1AA', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li>✔ 1 ad slot</li>
          </ul>
        </Card>

        {/* STARTER TIER */}
        <Card
          style={{ flex: '1 1 250px', minWidth: '250px', height: '100%', boxSizing: 'border-box', backgroundColor: '#111115', padding: '32px 24px', borderRadius: '12px', textAlign: 'left', border: '1px solid #27272A', display: 'flex', flexDirection: 'column' }}
          heading={<span style={{ fontSize: '1.25rem', margin: '0 0 4px 0', display: 'block' }}>Starter</span>}
          description={<span style={{ color: '#71717A', fontSize: '0.9rem', margin: '0 0 16px 0', display: 'block' }}>Start earning</span>}
        >
          <div style={{ fontSize: '2.5rem', fontWeight: '900', margin: '0 0 24px 0' }}>$49</div>
          
          <Button 
            variant="secondary" 
            style={{ width: '100%', backgroundColor: '#27272A', color: 'white', marginBottom: '24px' }}
          >
            Choose Starter
          </Button>

          <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#A1A1AA', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li>✔ Analytics dashboard</li>
            <li>✔ Monetization & sponsors</li>
            <li>✔ 50% affiliate revenue share</li>
            <li>✔ 3 ad slots</li>
          </ul>
        </Card>

        {/* PRO TIER */}
        <Card
          style={{ flex: '1 1 250px', minWidth: '250px', height: '100%', boxSizing: 'border-box', backgroundColor: '#151226', padding: '32px 24px', borderRadius: '12px', textAlign: 'left', border: '2px solid #7a5cff', position: 'relative', display: 'flex', flexDirection: 'column' }}
          heading={
            <>
              <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#7a5cff', padding: '4px 12px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 'bold', letterSpacing: '0.5px' }}>MOST POPULAR</div>
              <span style={{ fontSize: '1.25rem', margin: '0 0 4px 0', display: 'block', color: 'white' }}>Pro</span>
            </>
          }
          description={<span style={{ color: '#A78BFA', fontSize: '0.9rem', margin: '0 0 16px 0', display: 'block' }}>Scale your league</span>}
        >
          <div style={{ fontSize: '2.5rem', fontWeight: '900', margin: '0 0 24px 0' }}>$199</div>
          
          <Button 
            variant="primary" 
            style={{ width: '100%', backgroundColor: '#7a5cff', color: 'white', marginBottom: '24px' }}
          >
            Choose Pro
          </Button>

          <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#E4E4E7', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li>✔ Analytics dashboard</li>
            <li>✔ Monetization & sponsors</li>
            <li>✔ Live streaming</li>
            <li>✔ Advanced brackets</li>
            <li>✔ 70% affiliate revenue share</li>
            <li>✔ 10 ad slots</li>
          </ul>
        </Card>

        {/* ELITE TIER */}
        <Card
          style={{ flex: '1 1 250px', minWidth: '250px', height: '100%', boxSizing: 'border-box', backgroundColor: '#111115', padding: '32px 24px', borderRadius: '12px', textAlign: 'left', border: '1px solid #27272A', display: 'flex', flexDirection: 'column' }}
          heading={<span style={{ fontSize: '1.25rem', margin: '0 0 4px 0', display: 'block' }}>Elite</span>}
          description={<span style={{ color: '#71717A', fontSize: '0.9rem', margin: '0 0 16px 0', display: 'block' }}>Go pro</span>}
        >
          <div style={{ fontSize: '2.5rem', fontWeight: '900', margin: '0 0 24px 0' }}>$499</div>
          
          <Button 
            variant="secondary" 
            style={{ width: '100%', backgroundColor: '#27272A', color: 'white', marginBottom: '24px' }}
          >
            Choose Elite
          </Button>

          <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#A1A1AA', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li>✔ Analytics dashboard</li>
            <li>✔ Monetization & sponsors</li>
            <li>✔ Live streaming</li>
            <li>✔ Advanced brackets</li>
            <li>✔ NIL athlete hub</li>
            <li>✔ 80% affiliate revenue share</li>
            <li>✔ Unlimited ad slots</li>
          </ul>
        </Card>

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