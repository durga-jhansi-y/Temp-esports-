import styles from './LandingPage.module.css';
import { Button } from '../components/ui/Button'; // Adjust this path based on your folder structure

export default function LandingPage() {
  return (
    <div className={styles.container}>
      {/* 1. HERO SECTION */}
      <div className={styles.hero}>
        
        {/* Left Column: Copy & Call to Action */}
        <div className={styles.heroContent}>
          <p className={styles.subtitle}>
            White-Label Esports Platform
          </p>
          
          <h1>
            Competitive esports,{' '}
            <span className={styles.highlight}>designed around your league.</span>
          </h1>
          
          <p className={styles.description}>
            Run public competitions, branded communities, live match coverage, and deep organizer analytics from one experience. Esports League Hub is the white label engine behind real tournaments and real prize pools — live on your own subdomain in minutes. No code, no devs.
          </p>

          {/* Primary Action */}
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
              Launch your league &rarr;
            </Button>
          </div>

          {/* Secondary Actions (From Mock-up) */}
          <div className={styles.secondaryActions}>
            <a href="/tournaments" className={styles.btnSolid}>Explore tournaments &rarr;</a>
            <a href="/live-center" className={styles.btnOutline}>Watch live</a>
            <a href="/dashboard" className={styles.btnGhost}>Open workspace preview</a>
          </div>
        </div>

        {/* Right Column: Mock Dashboard / Card */}
        <div className={styles.mockDashboard}>
          <div className={styles.mockUrl}>yourbrand.esportsleaguehub.com/live</div>
          
          <div className={styles.mockStats}>
            <div className={styles.statBlock}>
              <div className={styles.mockStatLabel}>Prize pool</div>
              <div className={styles.mockStatValue}>$18.4K</div>
              <div className={styles.mockStatSub}>Across live events</div>
            </div>
            <div className={styles.statBlock}>
              <div className={styles.mockStatLabel}>Players</div>
              <div className={styles.mockStatValue}>1,842</div>
              <div className={styles.mockStatSub}>+12.4% this month</div>
            </div>
            <div className={styles.statBlock}>
              <div className={styles.mockStatLabel}>Live</div>
              <div className={styles.mockStatValue}>7</div>
              <div className={`${styles.mockStatSub} ${styles.highlightText}`}>● broadcasting</div>
            </div>
          </div>
          
          <div className={styles.matchSection}>
            <div className={`${styles.matchRow} ${styles.matchRowBorder}`}>
              <div className={styles.teamLine}>
                <div className={styles.teamLogo}>N</div>
                <span className={styles.team}>Nova</span>
              </div>
              <span className={styles.score}>2 : 1</span>
              <div className={styles.teamLine}>
                <span className={styles.team}>Apex</span>
                <div className={styles.teamLogo}>A</div>
              </div>
            </div>
            
            <div className={styles.matchRow}>
              <div className={styles.teamLine}>
                <div className={styles.teamLogo}>V</div>
                <span className={styles.team}>Vanta</span>
              </div>
              <span className={styles.score}>0 : 0</span>
              <div className={styles.teamLine}>
                <span className={styles.team}>Riptide</span>
                <div className={styles.teamLogo}>R</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. PUBLIC ANALYTICS SECTION */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <div className={styles.sectionHeadText}>
            <span className={styles.sectionSubtitle}>Public analytics</span>
            <h2>See the competitive pulse before signing in.</h2>
            <p className={styles.sectionMuted}>Basic and intermediate statistics remain visible to spectators and prospective players.</p>
          </div>
          <a href="/rankings" className={styles.btnOutline}>View rankings</a>
        </div>
        
        <div className={styles.gridFour}>
          <div className={styles.metricCard}>
            <span className={styles.metricLabel}>Active tournaments</span>
            <strong className={styles.metricValue}>28</strong>
            <small className={styles.metricSub}>+6 this month</small>
          </div>
          <div className={styles.metricCard}>
            <span className={styles.metricLabel}>Published matches</span>
            <strong className={styles.metricValue}>436</strong>
            <small className={styles.metricSub}>Last 30 days</small>
          </div>
          <div className={styles.metricCard}>
            <span className={styles.metricLabel}>Average entrants</span>
            <strong className={styles.metricValue}>96</strong>
            <small className={styles.metricSub}>Across open events</small>
          </div>
          <div className={styles.metricCard}>
            <span className={styles.metricLabel}>Prize pools</span>
            <strong className={styles.metricValue}>$48.6K</strong>
            <small className={styles.metricSub}>Published total</small>
          </div>
        </div>
      </section>

      {/* 3. NEW MOCK-UP PAGES SECTION */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <div className={styles.sectionHeadText}>
            <span className={styles.sectionSubtitle}>New mock-up pages</span>
            <h2>Explore the expanded frontend.</h2>
          </div>
        </div>
        
        <div className={styles.gridThree}>
          <a href="/tournament-detail" className={styles.featureCard}>
            <h3>Tournament Experience</h3>
            <p>Overview, bracket, participants, schedule, and public event analytics.</p>
          </a>
          <a href="/team-profile" className={styles.featureCard}>
            <h3>Team Profile</h3>
            <p>Roster, form, match history, performance metrics, and team identity.</p>
          </a>
          <a href="/organizer-analytics" className={styles.featureCard}>
            <h3>Organizer Analytics</h3>
            <p>Protected funnels, retention, event benchmarks, and forecasting.</p>
          </a>
        </div>
      </section>

      {/* 4. EXPANDED PLATFORM SECTION */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <div className={styles.sectionHeadText}>
            <span className={styles.sectionSubtitle}>From v2 • Expanded platform</span>
            <h2>Brand, operate, monetize, and support your league.</h2>
            <p className={styles.sectionMuted}>New v3-consistent pages bring over the strongest business and operations concepts from the v2 mock-up.</p>
          </div>
        </div>
        
        <div className={styles.gridFour}>
          <a href="/pricing" className={styles.featureCard}>
            <h3>Pricing</h3>
            <p>Plans and analytics access levels.</p>
          </a>
          <a href="/branding" className={styles.featureCard}>
            <h3>Branding</h3>
            <p>League identity, domain, sponsor placement.</p>
          </a>
          <a href="/monetization" className={styles.featureCard}>
            <h3>Monetization</h3>
            <p>Entry revenue, sponsors, and prize commitments.</p>
          </a>
          <a href="/trust" className={styles.featureCard}>
            <h3>Trust</h3>
            <p>Rules, integrity workflow, and transparent review.</p>
          </a>
        </div>
      </section>
      
    </div>
  );
}