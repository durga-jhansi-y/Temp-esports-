import React from 'react';
import styles from './LandingPage.module.css';
import { Button } from '../components/ui/Button'; // Adjust this path based on your folder structure

export default function LandingPage() {
  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        
        {/* Left Column: Copy & Call to Action */}
        <div className={styles.heroContent}>
          <p className={styles.subtitle}>
            White-Label Esports Platform
          </p>
          
          <h1>
            Launch your own branded esports platform.{' '}
            <span className={styles.highlight}>Your brand, your domain, real prize pools.</span>
          </h1>
          
          <p className={styles.description}>
            Esports League Hub is the white label engine behind real tournaments, automated brackets, and real PayPal prize pools & entry fees - live on your own subdomain in minutes. No code, no devs.
          </p>

          <div className={styles.inputGroup}>
            <span className={styles.inputPrefix}>Your league name</span>
            <input 
              type="text" 
              placeholder="yourbrand.esportsleaguehub.com"
              className={styles.inputField}
            />
            
            <Button 
              variant="primary" 
              size="medium"
              className={styles.ctaButton}
            >
              Launch your league - free &rarr;
            </Button>
          </div>
        </div>

        {/* Right Column: Mock Dashboard / Card */}
        <div className={styles.mockDashboard}>
          <div className={styles.mockUrl}>yourbrand.esportsleaguehub.com/dashboard</div>
          
          <div className={styles.mockStats}>
            <div>
              <div className={styles.mockStatValue}>$12,400</div>
              <div className={styles.mockStatLabel}>Prize pool</div>
            </div>
            <div>
              <div className={styles.mockStatValue}>$3,180</div>
              <div className={styles.mockStatLabel}>Entry revenue</div>
            </div>
            <div>
              <div className={styles.mockStatValue}>512</div>
              <div className={styles.mockStatLabel}>Players</div>
            </div>
          </div>
          
          <div className={styles.matchSection}>
            <p className={styles.matchHeader}>Single elimination Round 2</p>
            
            <div className={`${styles.matchRow} ${styles.matchRowBorder}`}>
              <span className={styles.team}>Team Nova</span> 
              <span className={styles.vs}>VS</span> 
              <span className={styles.team}>Team Apex</span>
            </div>
            
            <div className={styles.matchRow}>
              <span className={styles.team}>Riptide</span> 
              <span className={styles.vs}>VS</span> 
              <span className={styles.team}>Vanta GG</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}