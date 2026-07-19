import React from 'react';
import styles from './TrustPage.module.css';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { SectionTitle } from '../components/ui/SectionTitle';
import { SecurityBar } from '../components/ui/SecurityBar';

export default function TrustPage() {
  const features = [
    { icon: '🔒', title: 'Secure Authentication', desc: 'Your account is protected with industry-leading encryption and 2FA.' },
    { icon: '🛡️', title: 'Data Protection', desc: 'We comply with global data protection regulations to keep your info safe.' },
    { icon: '⚖️', title: 'Fair Matchmaking', desc: 'Our algorithms ensure a level playing field for all competitive matches.' },
    { icon: '✅', title: 'Verified Organizers', desc: 'Every tournament organizer is vetted for legitimacy and quality.' },
    { icon: '🤝', title: 'Community Safety', desc: 'Proactive moderation tools to keep toxicity out of your games.' },
    { icon: '⚡', title: 'Reliable Platform', desc: 'Built on modern infrastructure for maximum uptime and zero lag.' },
  ];

  const stats = [
    { label: 'Players', value: '1000+' },
    { label: 'Tournaments', value: '250+' },
    { label: 'Uptime', value: '99.9%' },
    { label: 'Communities', value: '50+' },
  ];

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <h1>Trusted by Players and Tournament Organizers</h1>
        <p>Join thousands of competitive gamers on a platform built for security, reliability, and fair play. Your esports journey is safe with us.</p>
        <Button>Join Now</Button>
      </section>

      {/* Security Bar */}
      <SecurityBar />

      {/* Trust Features Section */}
      <section className={styles.featuresSection}>
        <SectionTitle title="Platform Features" />
        <div className={styles.featuresGrid}>
          {features.map((feature, idx) => (
            <Card key={idx} className={styles.featureCard}>
              <div className={styles.icon}>{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className={styles.whyChooseUs}>
        <SectionTitle title="Why Choose Us" />
        <div className={styles.whyLayout}>
          <div className={styles.imagePlaceholder}>
            [ Illustration / Image Placeholder ]
          </div>
          <div>
            <ul className={styles.benefitsList}>
              <li>
                <span className={styles.checkIcon}>✔</span>
                <span>Secure accounts and transactions</span>
              </li>
              <li>
                <span className={styles.checkIcon}>✔</span>
                <span>Fast, responsive 24/7 support</span>
              </li>
              <li>
                <span className={styles.checkIcon}>✔</span>
                <span>Trusted by the esports community worldwide</span>
              </li>
              <li>
                <span className={styles.checkIcon}>✔</span>
                <span>Modern infrastructure for zero downtime</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className={styles.statsSection}>
        <div className={styles.statsGrid}>
          {stats.map((stat, idx) => (
            <Card key={idx} className={styles.statCard}>
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <h2>Ready to Level Up?</h2>
        <p>Start your competitive journey today with a platform you can trust.</p>
        <Button>Join the Community</Button>
      </section>
    </div>
  );
}
