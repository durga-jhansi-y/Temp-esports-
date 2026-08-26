import { useState } from 'react';
import styles from './QuestionsPage.module.css';
import { Button } from '../components/ui/Button'; // Adjust this path
import { Card } from '../components/ui/Card'; // Adjust this path

export default function QuestionsPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "Is it really my brand?",
      answer: "Yours. Always. Your players register into your branded instance and belong to you."
    },
    {
      question: "What's the difference between tiers?",
      answer: "Each tier unlocks more: Starter adds analytics + monetization, Pro adds streaming advanced brackets, Elite adds the NIL hub. Higher tiers also get a bigger affiliate share and more ad slots."
    },
    {
      question: "Can I upgrade or downgrade later?",
      answer: "Upgrade anytime and the features switch on instantly—no migration, no data loss."
    },
    {
      question: "What's included on the Free tier?",
      answer: "You get access to launch your first standalone bracket with a basic configuration framework and 1 ad slot. We do not take a cut of your prize pools, and we charge a flat subscription that starts at $0."
    },
    {
      question: "Do I need to be technical?",
      answer: "No code and no developers are required. You can start on your free subdomain, drop in your logo, pick your colors, and get live in minutes."
    }
  ];

  return (
    <div className={styles.container}>
      
      {/* HERO SECTION */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.subtitle}>Public • Player experience</span>
          <h1 className={styles.title}>
            Find competition, build a profile, <span className={styles.grad}>track your progress.</span>
          </h1>
          <p className={styles.muted}>
            Players can discover events and competition data without an account, then sign in for registration, team collaboration, saved events, and deeper personal insights.
          </p>
          <div className={styles.buttons}>
            <Button 
              variant="primary" 
              size="medium"
              style={{ 
                background: 'linear-gradient(90deg, #ff0844 0%, #ffb199 100%)', 
                color: 'white', 
                border: 'none',
                fontWeight: '600'
              }}
            >
              Register as a player &rarr;
            </Button>
            <Button variant="outline" size="medium">Browse tournaments</Button>
          </div>
        </div>

        <Card className={styles.heroCard}>
          <span className={styles.tag}>Player snapshot</span>
          <div className={styles.profileHero}>
            <div className={styles.avatar}>R</div>
            <div className={styles.profileInfo}>
              <h2>Riley Chen</h2>
              <p className={styles.muted}>Valorant • Mid-Atlantic</p>
              <span className={styles.statusLive}>
                <i className={styles.dot}></i> Available
              </span>
            </div>
          </div>
          <div className={styles.statsGrid}>
            <div className={styles.metric}>
              <span>Rating</span>
              <strong>1,612</strong>
              <small>+48 this season</small>
            </div>
            <div className={styles.metric}>
              <span>Win rate</span>
              <strong>64%</strong>
              <small>Last 30 matches</small>
            </div>
            <div className={styles.metric}>
              <span>Events</span>
              <strong>14</strong>
              <small>3 podiums</small>
            </div>
          </div>
        </Card>
      </section>

      {/* DISCOVERY SECTION */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <span className={styles.subtitle}>No login required</span>
          <h2>Explore before committing.</h2>
          <p className={styles.muted}>
            Discovery stays open so players can understand an event before sharing account information or joining a roster.
          </p>
        </div>
        <div className={styles.gridFour}>
          <Card className={styles.accentCard}>
            <h3>Discover events</h3>
            <p className={styles.muted}>Filter by game, format, date, prize pool, and registration status.</p>
          </Card>
          <Card className={styles.accentCard}>
            <h3>Watch live</h3>
            <p className={styles.muted}>Follow active matches, scores, schedules, and public competition pulse.</p>
          </Card>
          <Card className={styles.accentCard}>
            <h3>Scout teams</h3>
            <p className={styles.muted}>Review rosters, form, match history, and public performance metrics.</p>
          </Card>
          <Card className={styles.accentCard}>
            <h3>Compare rankings</h3>
            <p className={styles.muted}>See public league standings and recent movement.</p>
          </Card>
        </div>
      </section>

      {/* PROTECTED ACTIONS SECTION */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <span className={styles.subtitle}>Sign-in unlocks</span>
          <h2>Protected player actions.</h2>
        </div>
        <div className={styles.gridThree}>
          <Card>
            <h3>Event registration</h3>
            <p className={styles.muted}>Join eligible tournaments, confirm attendance, and manage registration status.</p>
            <Button variant="outline" size="small" className={styles.actionBtn}>Register</Button>
          </Card>
          <Card>
            <h3>Team collaboration</h3>
            <p className={styles.muted}>Accept invites, manage roster availability, and coordinate upcoming matches.</p>
            <Button variant="outline" size="small" className={styles.actionBtn}>Preview workspace</Button>
          </Card>
          <Card>
            <h3>Personal analytics</h3>
            <p className={styles.muted}>Track event history, performance trend, reliability, and competition milestones.</p>
            <Button variant="outline" size="small" className={styles.actionBtn}>Preview dashboard</Button>
          </Card>
        </div>
      </section>

      {/* QUESTIONS SECTION (FAQ) */}
      <section className={styles.faqSection}>
        <div className={styles.sectionHead}>
          <span className={styles.subtitle}>Platform Info</span>
          <h2>Frequently Asked Questions</h2>
        </div>
        
        <div className={styles.faqContainer}>
          {faqs.map((faq, index) => (
            <div key={index} className={styles.faqItem}>
              <div 
                className={styles.faqHeader}
                onClick={() => toggleFaq(index)}
              >
                <span>{faq.question}</span>
                <span className={styles.faqIcon}>
                  {openIndex === index ? '▲' : '▼'}
                </span>
              </div>
              
              {openIndex === index && (
                <p className={styles.faqAnswer}>
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}