import styles from './TrustPage.module.css';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { SectionTitle } from '../components/ui/SectionTitle';
import { SecurityBar } from '../components/ui/SecurityBar';

export default function TrustPage() {
  // --- Original Platform Features ---
  const features = [
    { icon: '🔒', title: 'Secure Authentication', desc: 'Your account is protected with industry-leading encryption and 2FA.' },
    { icon: '🛡️', title: 'Data Protection', desc: 'We comply with global data protection regulations to keep your info safe.' },
    { icon: '⚖️', title: 'Fair Matchmaking', desc: 'Our algorithms ensure a level playing field for all competitive matches.' },
    { icon: '✅', title: 'Verified Organizers', desc: 'Every tournament organizer is vetted for legitimacy and quality.' },
    { icon: '🤝', title: 'Community Safety', desc: 'Proactive moderation tools to keep toxicity out of your games.' },
    { icon: '⚡', title: 'Reliable Platform', desc: 'Built on modern infrastructure for maximum uptime and zero lag.' },
  ];

  // --- Original Platform Stats ---
  const stats = [
    { label: 'Players', value: '1000+' },
    { label: 'Tournaments', value: '250+' },
    { label: 'Uptime', value: '99.9%' },
    { label: 'Communities', value: '50+' },
  ];

  // --- Mockup: Integrity Metrics ---
  const integrityMetrics = [
    { label: 'Match reports resolved', value: '96.8%', sub: 'Within target SLA' },
    { label: 'Disputes / 100', value: '1.7', sub: '-29% vs baseline', isUp: true },
    { label: 'Verified organizers', value: '92%', sub: 'Active leagues' },
    { label: 'Integrity review', value: '24h', sub: 'Median resolution' },
  ];

  // --- Mockup: Core Pillars ---
  const pillars = [
    { title: 'Transparent rules', desc: 'Publish formats, eligibility, check-in rules, map pools, seeding, and dispute windows before registration.' },
    { title: 'Traceable results', desc: 'Public brackets and match history give participants and spectators a consistent record of competition.' },
    { title: 'Structured review', desc: 'Reports become review cases with evidence, status, ownership, and audit history instead of informal moderation.' }
  ];

  // --- Mockup: Workflow Steps ---
  const workflowSteps = [
    { num: '01', title: 'Signal', desc: 'A report, payment issue, or match anomaly creates a signal.' },
    { num: '02', title: 'Triage', desc: 'Severity and evidence determine review priority.' },
    { num: '03', title: 'Review', desc: 'Authorized staff inspect context, history, and supporting evidence.' },
    { num: '04', title: 'Decision', desc: 'The case records a reasoned outcome and leaves an audit trail.' },
  ];

  return (
    <div className={styles.container}>
      {/* Hero Section (Merged) */}
      <section className={styles.hero}>
        <span className={styles.subtitle}>Public • Trust & integrity</span>
        <h1>
          Competition built for <span className={styles.grad}>credible outcomes.</span>
        </h1>
        <p className={styles.heroDesc}>
          Clear event rules, transparent match history, moderation workflows, and integrity review help organizers operate communities users can trust. Join thousands of competitive gamers on a platform built for security, reliability, and fair play.
        </p>
        <div className={styles.heroActions}>
          <Button>Join Now</Button>
          {/* Assuming Button accepts a variant prop, otherwise fallback to class */}
          <Button variant="outline" className={styles.outlineBtn}>View trust report</Button>
        </div>
      </section>

      {/* Integrity Metrics Grid (Mockup) */}
      <section className={styles.metricsSection}>
        <div className={styles.metricsGrid}>
          {integrityMetrics.map((metric, idx) => (
            <div key={idx} className={styles.metricCard}>
              <span className={styles.metricLabel}>{metric.label}</span>
              <strong className={styles.metricValue}>{metric.value}</strong>
              <small className={`${styles.metricSub} ${metric.isUp ? styles.metricUp : ''}`}>
                {metric.sub}
              </small>
            </div>
          ))}
        </div>
      </section>

      {/* Security Bar */}
      <SecurityBar />

      {/* Core Trust Pillars (Mockup) */}
      <section className={styles.pillarsSection}>
        <div className={styles.threeGrid}>
          {pillars.map((pillar, idx) => (
            <Card key={idx} className={styles.pillarCard}>
              <h2>{pillar.title}</h2>
              <p>{pillar.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Integrity Workflow (Mockup) */}
      <section className={styles.workflowSection}>
        <div className={styles.sectionHead}>
          <h2>Integrity workflow</h2>
          <p>The v2 moderation concept is expanded here using structured visual treatment.</p>
        </div>
        <div className={styles.workflowGrid}>
          {workflowSteps.map((step, idx) => (
            <Card key={idx} className={styles.workflowCard}>
              <span className={styles.stepNum}>{step.num}</span>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Platform Features Section (Original) */}
      <section className={styles.featuresSection}>
        <SectionTitle title="Platform Security Features" />
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

      {/* Why Choose Us (Original) */}
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

      {/* Statistics Section (Original) */}
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

      {/* KPI / Callout Section (Mockup) */}
      <section className={styles.kpiSection}>
        <Card className={styles.kpiCard}>
          <div className={styles.kpiRow}>
            <div className={styles.kpiText}>
              <h2>Signals are prompts for investigation—not conclusions.</h2>
              <p>The admin integrity dashboard intentionally separates anomaly indicators from enforcement decisions.</p>
            </div>
            <Button variant="outline" className={styles.outlineBtn}>Preview admin integrity</Button>
          </div>
        </Card>
      </section>

      {/* CTA Section (Original) */}
      <section className={styles.ctaSection}>
        <h2>Ready to Level Up?</h2>
        <p>Start your competitive journey today with a platform you can trust.</p>
        <Button>Join the Community</Button>
      </section>
    </div>
  );
}