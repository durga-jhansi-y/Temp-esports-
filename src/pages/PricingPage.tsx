import React from 'react';
import styles from './PricingPage.module.css';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { SectionTitle } from '../components/ui/SectionTitle';

export default function PricingPage() {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      features: [
        { name: 'Tournament Access', included: true },
        { name: 'Basic Profile', included: true },
        { name: 'Community Forums', included: true },
        { name: 'Team Management', included: false },
        { name: 'Priority Support', included: false },
        { name: 'Analytics', included: false },
        { name: 'Unlimited Registrations', included: false },
      ],
      buttonText: 'Join Free',
      recommended: false,
    },
    {
      name: 'Pro',
      price: '$9.99',
      features: [
        { name: 'Tournament Access', included: true },
        { name: 'Pro Profile Badge', included: true },
        { name: 'Community Forums', included: true },
        { name: 'Team Management', included: true },
        { name: 'Priority Support', included: true },
        { name: 'Analytics', included: false },
        { name: 'Unlimited Registrations', included: false },
      ],
      buttonText: 'Get Started',
      recommended: true,
    },
    {
      name: 'Enterprise',
      price: '$49.99',
      features: [
        { name: 'Tournament Access', included: true },
        { name: 'Verified Organization', included: true },
        { name: 'Community Forums', included: true },
        { name: 'Advanced Team Management', included: true },
        { name: '24/7 Priority Support', included: true },
        { name: 'Advanced Analytics', included: true },
        { name: 'Unlimited Registrations', included: true },
      ],
      buttonText: 'Contact Sales',
      recommended: false,
    },
  ];

  const faqs = [
    {
      q: 'Can I cancel my subscription at any time?',
      a: 'Yes, you can cancel your subscription at any time from your account settings. You will retain access to your plan until the end of your billing cycle.',
    },
    {
      q: 'What payment methods do you accept?',
      a: 'We accept all major credit cards, PayPal, and regional payment options depending on your location.',
    },
    {
      q: 'Do I need a paid plan to play in tournaments?',
      a: 'No! Many of our tournaments are free to enter. Paid plans offer additional features like team management and advanced analytics, but basic participation is free.',
    },
    {
      q: 'Is there a discount for annual billing?',
      a: 'Yes, we offer a 20% discount if you choose to be billed annually instead of monthly.',
    },
  ];

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <h1>Choose the Perfect Plan</h1>
        <p>Whether you are a casual player, a competitive team, or a tournament organizer, we have a plan designed for you.</p>
      </section>

      {/* Pricing Cards */}
      <section className={styles.pricingGrid}>
        {plans.map((plan, idx) => (
          <Card key={idx} className={`${styles.planCard} ${plan.recommended ? styles.recommended : ''}`}>
            {plan.recommended && <div className={styles.recommendedBadge}>Recommended</div>}
            
            {/* Grouped Name and Price into a flex header for layout control */}
            <div className={styles.planHeader}>
              <h2 className={styles.planName}>{plan.name}</h2>
              <div className={styles.planPrice}>
                {plan.price} <span>/ month</span>
              </div>
            </div>

            <ul className={styles.featureList}>
              {plan.features.map((feat, fIdx) => (
                <li key={fIdx}>
                  {feat.included ? (
                    <span className={styles.check}>✔</span>
                  ) : (
                    <span className={styles.cross}>✖</span>
                  )}
                  {feat.name}
                </li>
              ))}
            </ul>

            <div className={styles.buttonWrapper}>
              <Button>{plan.buttonText}</Button>
            </div>
          </Card>
        ))}
      </section>

      {/* Comparison Section */}
      <section className={styles.comparisonSection}>
        <SectionTitle title="Compare Features" />
        <table className={styles.comparisonTable}>
          <thead>
            <tr>
              <th>Feature</th>
              <th>Free</th>
              <th>Pro</th>
              <th>Enterprise</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Tournament Access</td>
              <td>✔</td>
              <td>✔</td>
              <td>✔</td>
            </tr>
            <tr>
              <td>Team Management</td>
              <td>✖</td>
              <td>✔</td>
              <td>✔</td>
            </tr>
            <tr>
              <td>Priority Support</td>
              <td>✖</td>
              <td>✔</td>
              <td>✔</td>
            </tr>
            <tr>
              <td>Analytics</td>
              <td>✖</td>
              <td>✖</td>
              <td>✔</td>
            </tr>
            <tr>
              <td>Unlimited Registrations</td>
              <td>✖</td>
              <td>✖</td>
              <td>✔</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* FAQ Section */}
      <section className={styles.faqSection}>
        <SectionTitle title="Frequently Asked Questions" />
        <div className={styles.faqGrid}>
          {faqs.map((faq, idx) => (
            <div key={idx} className={styles.faqCard}>
              <h4>{faq.q}</h4>
              <p>{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <h2>Ready to upgrade your game?</h2>
        <p>Join the thousands of teams and organizations already using our platform.</p>
        <Button>Subscribe Now</Button>
      </section>
    </div>
  );
}