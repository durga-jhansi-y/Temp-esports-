import React from 'react';
import '../App.css';
import { SecurityBar } from '../components/ui/SecurityBar'; // Adjust the import path if needed
import { Card } from '../components/ui/Card'; // Adjust the import path based on your folder structure

function TrustPage() {
  return (
    <div style={{ backgroundColor: '#0A0A0B', color: 'white', padding: '60px 20px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.25rem', fontWeight: '800', marginBottom: '40px', lineHeight: '1.3' }}>
          Every tournament you run builds someone else's brand. Until now.
        </h2>

        <div id="next-steps" style={{ marginBottom: '60px' }}>
          <div id="docs">
            <h3 style={{ color: '#EF4444', fontSize: '0.9rem', letterSpacing: '1px', marginBottom: '8px' }}>ON A GENERIC PLATFORM</h3>
            <p style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: '0 0 20px 0' }}>Their logo. Their fees. Their audience.</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'left' }}>
              <li style={{ color: '#A1A1AA' }}>❌ You're a line item on someone else's site</li>
              <li style={{ color: '#A1A1AA' }}>❌ Your players belong to them</li>
              <li style={{ color: '#A1A1AA' }}>❌ They set the cut</li>
            </ul>
          </div>

          <div>
            <h3 style={{ color: '#10B981', fontSize: '0.9rem', letterSpacing: '1px', marginBottom: '8px' }}>ON YOUR PLATFORM</h3>
            <p style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: '0 0 20px 0' }}>Your brand. Your domain. Your revenue.</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'left' }}>
              <li style={{ color: '#E4E4E7' }}>✔ Your logo, colors, and subdomain</li>
              <li style={{ color: '#E4E4E7' }}>✔ Your players are yours</li>
              <li style={{ color: '#E4E4E7' }}>✔ You keep your affiliate split</li>
            </ul>
          </div>
        </div>

        <h2 style={{ fontSize: '2rem', fontWeight: '800', margin: '0 0 8px 0' }}>LIVE IN MINUTES, NOT MONTHS</h2>
        <p style={{ color: '#71717A', margin: '0 0 40px 0' }}>Three steps to live</p>
        
        {/* Added alignItems: 'stretch' to ensure all cards match the height of the tallest one */}
        <div style={{ display: 'flex', gap: '20px', textAlign: 'left', flexWrap: 'wrap', alignItems: 'stretch', marginBottom: '60px' }}>
          
          <Card 
            style={{ flex: '1 1 300px', minWidth: '280px', height: '100%', boxSizing: 'border-box', padding: '24px', backgroundColor: '#111115', borderRadius: '8px', border: '1px solid #27272A' }}
            heading={
              <>
                <div style={{ fontSize: '2rem', color: '#27272A', fontWeight: '900', marginBottom: '12px' }}>01</div>
                <span style={{ fontSize: '1.1rem', margin: '0 0 8px 0', color: 'white', display: 'block' }}>Claim your name</span>
              </>
            }
            description={
              <span style={{ color: '#A1A1AA', fontSize: '0.9rem', margin: 0, lineHeight: '1.5' }}>Pick your subdomain with a live availability check</span>
            }
          />

          <Card 
            style={{ flex: '1 1 300px', minWidth: '280px', height: '100%', boxSizing: 'border-box', padding: '24px', backgroundColor: '#111115', borderRadius: '8px', border: '1px solid #27272A' }}
            heading={
              <>
                <div style={{ fontSize: '2rem', color: '#27272A', fontWeight: '900', marginBottom: '12px' }}>02</div>
                <span style={{ fontSize: '1.1rem', margin: '0 0 8px 0', color: 'white', display: 'block' }}>Brand it</span>
              </>
            }
            description={
              <span style={{ color: '#A1A1AA', fontSize: '0.9rem', margin: 0, lineHeight: '1.5' }}>Drop in your logo, pick your colors-it's instantly yours.</span>
            }
          />

          <Card 
            style={{ flex: '1 1 300px', minWidth: '280px', height: '100%', boxSizing: 'border-box', padding: '24px', backgroundColor: '#111115', borderRadius: '8px', border: '1px solid #27272A' }}
            heading={
              <>
                <div style={{ fontSize: '2rem', color: '#27272A', fontWeight: '900', marginBottom: '12px' }}>03</div>
                <span style={{ fontSize: '1.1rem', margin: '0 0 8px 0', color: 'white', display: 'block' }}>Go live & get paid</span>
              </>
            }
            description={
              <span style={{ color: '#A1A1AA', fontSize: '0.9rem', margin: 0, lineHeight: '1.5' }}>Players register, you run brackets, PayPal handles payouts</span>
            }
          />

        </div>

        <h2 style={{ fontSize: '2rem', fontWeight: '800', margin: '0 0 8px 0' }}>ONE PLATFORM THE WHOLE STACK</h2>
        <p style={{ color: '#71717A', margin: '0 0 40px 0' }}>Everything your league runs on</p>

        {/* Added alignItems: 'stretch' to the second row wrapper as well */}
        <div style={{ display: 'flex', gap: '20px', textAlign: 'left', flexWrap: 'wrap', alignItems: 'stretch' }}>
          
          <Card 
            style={{ flex: '1 1 300px', minWidth: '280px', height: '100%', boxSizing: 'border-box', padding: '24px', backgroundColor: '#111115', borderRadius: '8px', border: '1px solid #1c1c21' }}
            heading={
              <span style={{ fontSize: '1.1rem', margin: '0 0 8px 0', color: '#7a5cff', display: 'block' }}>Run brackets on autopilot</span>
            }
            description={
              <span style={{ color: '#A1A1AA', fontSize: '0.9rem', margin: 0, lineHeight: '1.5' }}>Single/double elimination, round-robin, Swiss seeded, auto advancing, with check-in and dispute handling</span>
            }
          />

          <Card 
            style={{ flex: '1 1 300px', minWidth: '280px', height: '100%', boxSizing: 'border-box', padding: '24px', backgroundColor: '#111115', borderRadius: '8px', border: '1px solid #1c1c21' }}
            heading={
              <span style={{ fontSize: '1.1rem', margin: '0 0 8px 0', color: '#7a5cff', display: 'block' }}>Get paid automatically</span>
            }
            description={
              <span style={{ color: '#A1A1AA', fontSize: '0.9rem', margin: 0, lineHeight: '1.5' }}>PayPal entry fees in prize payouts out-server verified</span>
            }
          />

          <Card 
            style={{ flex: '1 1 300px', minWidth: '280px', height: '100%', boxSizing: 'border-box', padding: '24px', backgroundColor: '#111115', borderRadius: '8px', border: '1px solid #1c1c21' }}
            heading={
              <span style={{ fontSize: '1.1rem', margin: '0 0 8px 0', color: '#7a5cff', display: 'block' }}>Look like a $1M brand</span>
            }
            description={
              <span style={{ color: '#A1A1AA', fontSize: '0.9rem', margin: 0, lineHeight: '1.5' }}>Your subdomain, logo, and colors across the whole experience</span>
            }
          />

        </div>

        {/* --- Added SecurityBar Section --- */}
        <div style={{ marginTop: '80px', display: 'flex', justifyContent: 'center' }}>
          <SecurityBar 
            message="Secure Platform. All entry fees and payouts are encrypted." 
          />
        </div>

      </div>
    </div>
  );
}

export default TrustPage;