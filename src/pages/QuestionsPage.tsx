import React, { useState } from 'react';
import '../App.css';

function QuestionsPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(1);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div style={{ backgroundColor: '#0A0A0B', color: 'white', padding: '60px 20px' }}>
      
      <div style={{ maxWidth: '900px', margin: '0 auto 80px', textAlign: 'center', backgroundColor: '#111115', padding: '40px 20px', borderRadius: '12px', border: '1px solid #27272A' }}>
        <p style={{ color: '#7a5cff', letterSpacing: '1px', fontSize: '0.85rem', fontWeight: 'bold', margin: '0 0 8px 0' }}>THE OTHER DOOR</p>
        <h2 style={{ fontSize: '2rem', fontWeight: '800', margin: '0 0 12px 0' }}>Not launching a league – just here to win?</h2>
        <p style={{ color: '#A1A1AA', margin: '0 0 32px 0' }}>Find a tournament, climb the ladder, win real prizes.</p>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap', marginBottom: '32px' }}>
          <div style={{ fontSize: '1rem', fontWeight: '500' }}>🏆 Join a tournament</div>
          <div style={{ fontSize: '1rem', fontWeight: '500' }}>📊 Track your stats</div>
          <div style={{ fontSize: '1rem', fontWeight: '500' }}>📡 Watch live matches</div>
        </div>

        <button style={{ padding: '12px 24px', borderRadius: '6px', backgroundColor: '#7a5cff', color: 'white', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>
          Register as a player &rarr;
        </button>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '2.25rem', fontWeight: '800', textAlign: 'center', marginBottom: '40px' }}>Questions</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div style={{ borderBottom: '1px solid #27272A', paddingBottom: '16px' }}>
            <div 
              style={{ display: 'flex', justifyContent: 'space-between', cursor: 'pointer', fontWeight: 'bold', fontSize: '1.1rem' }}
              onClick={() => toggleFaq(0)}
            >
              <span>Is it really my brand?</span>
              <span>{openIndex === 0 ? '▲' : '▼'}</span>
            </div>
            {openIndex === 0 && (
              <p style={{ color: '#A1A1AA', marginTop: '12px', fontSize: '0.95rem', lineHeight: '1.6' }}>
                Yours. Always. Your players register into your branded instance and belong to you.
              </p>
            )}
          </div>

          <div style={{ borderBottom: '1px solid #27272A', paddingBottom: '16px' }}>
            <div 
              style={{ display: 'flex', justifyContent: 'space-between', cursor: 'pointer', fontWeight: 'bold', fontSize: '1.1rem' }}
              onClick={() => toggleFaq(1)}
            >
              <span>What's the difference between tiers?</span>
              <span>{openIndex === 1 ? '▲' : '▼'}</span>
            </div>
            {openIndex === 1 && (
              <p style={{ color: '#A1A1AA', marginTop: '12px', fontSize: '0.95rem', lineHeight: '1.6' }}>
                Each tier unlocks more: Starter adds analytics + monetization, Pro adds streaming advanced brackets, Elite adds the NIL. hub. Higher tiers also get a bigger affiliate share and more ad slots.
              </p>
            )}
          </div>

          <div style={{ borderBottom: '1px solid #27272A', paddingBottom: '16px' }}>
            <div 
              style={{ display: 'flex', justifyContent: 'space-between', cursor: 'pointer', fontWeight: 'bold', fontSize: '1.1rem' }}
              onClick={() => toggleFaq(2)}
            >
              <span>Can I upgrade or downgrade later?</span>
              <span>{openIndex === 2 ? '▲' : '▼'}</span>
            </div>
            {openIndex === 2 && (
              <p style={{ color: '#A1A1AA', marginTop: '12px', fontSize: '0.95rem', lineHeight: '1.6' }}>
                Upgrade anytime and the features switch on instantly—no migration, no data loss.
              </p>
            )}
          </div>

          <div style={{ borderBottom: '1px solid #27272A', paddingBottom: '16px' }}>
            <div 
              style={{ display: 'flex', justifyContent: 'space-between', cursor: 'pointer', fontWeight: 'bold', fontSize: '1.1rem' }}
              onClick={() => toggleFaq(3)}
            >
              <span>What's included on the Free tier?</span>
              <span>{openIndex === 3 ? '▲' : '▼'}</span>
            </div>
            {openIndex === 3 && (
              <p style={{ color: '#A1A1AA', marginTop: '12px', fontSize: '0.95rem', lineHeight: '1.6' }}>
                You get access to launch your first standalone bracket with a basic configuration framework and 1 ad slot. We do not take a cut of your prize pools, and we charge a flat subscription that starts at $0.
              </p>
            )}
          </div>
          
          <div style={{ borderBottom: '1px solid #27272A', paddingBottom: '16px' }}>
            <div 
              style={{ display: 'flex', justifyContent: 'space-between', cursor: 'pointer', fontWeight: 'bold', fontSize: '1.1rem' }}
              onClick={() => toggleFaq(4)}
            >
              <span>Do I need to be technical?</span>
              <span>{openIndex === 4 ? '▲' : '▼'}</span>
            </div>
            {openIndex === 4 && (
              <p style={{ color: '#A1A1AA', marginTop: '12px', fontSize: '0.95rem', lineHeight: '1.6' }}>
                No code and no developers are required. You can start on your free subdomain, drop in your logo, pick your colors, and get live in minutes.
              </p>
            )}
          </div>

        </div>
      </div>

    </div>
  );
}

export default QuestionsPage;