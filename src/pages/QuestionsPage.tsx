import React, { useState } from 'react';
import styles from './QuestionsPage.module.css';
import { Button } from '../components/ui/Button'; // Adjust this path
import { Card } from '../components/ui/Card'; // Adjust this path

export default function QuestionsPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Storing FAQs in an array mirrors the clean architecture of TrustPage
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
      
      {/* THE OTHER DOOR */}
      <Card 
        className={styles.otherDoorCard}
        heading={
          <>
            <span className={styles.subtitle}>THE OTHER DOOR</span>
            <span className={styles.title}>Not launching a league – just here to win?</span>
          </>
        }
        description={
          <span className={styles.description}>
            Find a tournament, climb the ladder, win real prizes.
          </span>
        }
      >
        <div className={styles.featuresList}>
          <div className={styles.featureItem}>🏆 Join a tournament</div>
          <div className={styles.featureItem}>📊 Track your stats</div>
          <div className={styles.featureItem}>📡 Watch live matches</div>
        </div>

        {/* Updated Button styling to align with the red/peach aesthetic */}
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
      </Card>

      {/* QUESTIONS SECTION */}
      <section className={styles.faqSection}>
        <h2>Questions</h2>
        
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