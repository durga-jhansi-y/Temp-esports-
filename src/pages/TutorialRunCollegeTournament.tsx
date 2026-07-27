import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, Calendar, Users, Trophy, DollarSign, BarChart } from "lucide-react";

// Adjust these paths if your components are located elsewhere in src
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";

import styles from "./TutorialRunCollegeTournament.module.css";

export const TutorialRunCollegeTournament = () => {
  const navigate = useNavigate();

  return (
    <main className={styles.mainLayout}>
      <div className={styles.container}>
        
        {/* Updated vertical spacing between major sections: space-y-16 */}
        <article className="flex flex-col gap-24 py-8">
          
          {/* Header */}
          <header className="flex flex-col gap-4">
            <span className={styles.subtitlePill}>College Esports Guide</span>
            <h1 className={styles.headingMain}>
              How to Run a College Esports Tournament in <span className={styles.highlight}>2026</span>
            </h1>
            <p className="text-xl text-slate-300">
              Complete step-by-step guide to organizing successful college esports tournaments with automated bracket generation, sponsor integration, and NIL compliance.
            </p>
            <div className={styles.metaInfo}>
              <span>Updated: June 2026</span>
              <span>•</span>
              <span>15 min read</span>
            </div>
          </header>

          {/* Quick Start Summary Card */}
          <Card className={`${styles.cardGlass} ${styles.accentCardBar}`}>
            <div className={styles.cardContent}>
              <h2 className="text-xl font-semibold mb-3 text-white">Quick Start Summary</h2>
              <p className={`mb-4 text-sm ${styles.textMuted}`}>
                Running a college esports tournament requires 3 core components: tournament software for bracket management, sponsor partnerships for revenue, and compliance with NCAA NIL rules. This guide walks you through each step.
              </p>
              <Button onClick={() => navigate('/get-started')} className={styles.ctaButtonPrimary}>
                Start Your Tournament Free &rarr;
              </Button>
            </div>
          </Card>

          {/* Step 1 */}
          {/* Updated margin & spacing: space-y-10 mt-12 */}
          <section className="flex flex-col gap-10">
            <h2 className={styles.sectionTitle}>
              <Calendar className="h-8 w-8 text-[#a890ff]" />
              Step 1: Plan Your Tournament (2-4 Weeks Before)
            </h2>

            <Card className={styles.cardGlass}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>Choose Tournament Format</h3>
                <p className={styles.cardDescription}>Select the right format for your college esports event</p>
              </div>
              <div className={`${styles.cardContent} space-y-6`}>
                <div>
                  <h4 className="font-semibold mb-2 text-[#a890ff]">Single Elimination (Recommended for Beginners)</h4>
                  <ul className={`list-disc pl-6 space-y-1 text-sm ${styles.textMuted}`}>
                    <li>Fastest format - complete in one day</li>
                    <li>16-32 teams ideal for college campus events</li>
                    <li>Best for League of Legends, Valorant, CS2</li>
                    <li>Automated bracket generation with Elara Arena</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 text-[#a890ff]">Double Elimination (More Competitive)</h4>
                  <ul className={`list-disc pl-6 space-y-1 text-sm ${styles.textMuted}`}>
                    <li>Fairer format - everyone gets two chances</li>
                    <li>Takes 1.5-2x longer than single elimination</li>
                    <li>Popular for fighting games, Rocket League</li>
                    <li>Winners bracket and losers bracket automatically managed</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 text-[#a890ff]">Round Robin (League Format)</h4>
                  <ul className={`list-disc pl-6 space-y-1 text-sm ${styles.textMuted}`}>
                    <li>Every team plays every other team</li>
                    <li>Best for 8-12 team seasonal leagues</li>
                    <li>Great for intramural college esports</li>
                    <li>Requires multiple weeks/months to complete</li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className={styles.cardGlass}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>Set Tournament Details</h3>
              </div>
              <div className={styles.cardContent}>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong className="text-white">Date & Time:</strong>
                    <p className={styles.textMuted}>Weekend afternoons work best for college students. 1pm-8pm is ideal.</p>
                  </div>
                  <div>
                    <strong className="text-white">Prize Pool:</strong>
                    <p className={styles.textMuted}>$500-$2,000 for college tournaments. Use sponsor funding (see Step 4).</p>
                  </div>
                  <div>
                    <strong className="text-white">Team Size:</strong>
                    <p className={styles.textMuted}>5v5 for League/Valorant, 3v3 for Rocket League, 1v1 for fighting games.</p>
                  </div>
                  <div>
                    <strong className="text-white">Platform:</strong>
                    <p className={styles.textMuted}>PC (most common), Console (for Madden/FIFA), or both.</p>
                  </div>
                </div>
              </div>
            </Card>
          </section>

          {/* Step 2 */}
          <section className="flex flex-col gap-10">
            <h2 className={styles.sectionTitle}>
              <Users className="h-8 w-8 text-[#a890ff]" />
              Step 2: Set Up Tournament Registration
            </h2>

            <Card className={styles.cardGlass}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>Create Registration Form</h3>
                <p className={styles.cardDescription}>Using Elara Arena's automated system</p>
              </div>
              <div className={`${styles.cardContent} space-y-4`}>
                <ol className="list-decimal pl-6 space-y-3 text-sm text-slate-200">
                  <li>
                    <strong className="text-white">Create tournament in Elara Arena</strong>
                    <p className={styles.textMuted}>Click "Create Tournament" → Enter details → Auto-generate registration link</p>
                  </li>
                  <li>
                    <strong className="text-white">Set registration requirements</strong>
                    <p className={styles.textMuted}>College email verification (.edu), team name, roster of 5-8 players, captain contact</p>
                  </li>
                  <li>
                    <strong className="text-white">Entry fee (optional)</strong>
                    <p className={styles.textMuted}>$15-25 per team, or free with sponsor funding. PayPal integration built-in.</p>
                  </li>
                  <li>
                    <strong className="text-white">Set registration deadline</strong>
                    <p className={styles.textMuted}>1 week before tournament date. Auto-close registration at deadline.</p>
                  </li>
                </ol>

                <div className={styles.infoCallout}>
                  <h4 className="font-semibold mb-1 text-[#a890ff]">Pro Tip: NIL Compliance</h4>
                  <p className={`text-sm ${styles.textMuted}`}>
                    If offering prize money to NCAA athletes, ensure compliance with NIL rules. Elara Arena includes NIL athlete profile system for transparent sponsorship deals.
                  </p>
                </div>
              </div>
            </Card>
          </section>

          {/* Step 3 */}
          <section className="flex flex-col gap-10">
            <h2 className={styles.sectionTitle}>
              <Trophy className="h-8 w-8 text-[#a890ff]" />
              Step 3: Generate Brackets & Manage Matches
            </h2>

            <Card className={styles.cardGlass}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>Automated Bracket Generation</h3>
                <p className={styles.cardDescription}>Let Elara Arena handle the complex math</p>
              </div>
              <div className={`${styles.cardContent} space-y-6`}>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5 shrink-0" />
                    <div>
                      <strong className="text-sm text-white">Automatic seeding</strong>
                      <p className={`text-sm ${styles.textMuted}`}>Teams automatically placed based on registration order or rankings</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5 shrink-0" />
                    <div>
                      <strong className="text-sm text-white">Live bracket updates</strong>
                      <p className={`text-sm ${styles.textMuted}`}>Scores update in real-time as matches complete</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5 shrink-0" />
                    <div>
                      <strong className="text-sm text-white">Next match automatic scheduling</strong>
                      <p className={`text-sm ${styles.textMuted}`}>Winners advance automatically, no manual bracket management</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5 shrink-0" />
                    <div>
                      <strong className="text-sm text-white">Public bracket viewer</strong>
                      <p className={`text-sm ${styles.textMuted}`}>Share bracket link for spectators and participants</p>
                    </div>
                  </div>
                </div>

                <Button onClick={() => navigate('/tournaments')} className={`w-full ${styles.ctaButtonOutline}`}>
                  See Tournament Management Demo
                </Button>
              </div>
            </Card>
          </section>

          {/* Step 4 */}
          <section className="flex flex-col gap-10">
            <h2 className={styles.sectionTitle}>
              <DollarSign className="h-8 w-8 text-[#a890ff]" />
              Step 4: Secure Sponsors & Generate Revenue
            </h2>

            <Card className={styles.cardGlass}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>Tournament Monetization Strategy</h3>
                <p className={styles.cardDescription}>Turn your tournament into a revenue generator</p>
              </div>
              <div className={`${styles.cardContent} space-y-6`}>
                <div>
                  <h4 className="font-semibold mb-2 text-[#a890ff]">Sponsor Integration (Built into Elara)</h4>
                  <ul className={`list-disc pl-6 space-y-2 text-sm ${styles.textMuted}`}>
                    <li><strong className="text-white">Banner ads</strong> - Top/bottom of tournament page ($200-500 value)</li>
                    <li><strong className="text-white">Sidebar sponsors</strong> - Visible during live matches ($150-300 value)</li>
                    <li><strong className="text-white">Stream overlays</strong> - For Twitch/YouTube broadcasts ($300-600 value)</li>
                    <li><strong className="text-white">NIL athlete profiles</strong> - Student athletes can secure individual deals</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 text-[#a890ff]">Sponsor Prospects for College Esports</h4>
                  <div className="grid md:grid-cols-2 gap-3 text-sm">
                    <div>
                      <strong className="text-white">Gaming Brands:</strong>
                      <p className={styles.textMuted}>Razer, HyperX, Logitech, Corsair</p>
                    </div>
                    <div>
                      <strong className="text-white">Energy Drinks:</strong>
                      <p className={styles.textMuted}>G Fuel, Red Bull, Monster</p>
                    </div>
                    <div>
                      <strong className="text-white">Local Businesses:</strong>
                      <p className={styles.textMuted}>Pizza shops, PC cafes, gaming stores</p>
                    </div>
                    <div>
                      <strong className="text-white">University Partners:</strong>
                      <p className={styles.textMuted}>Student orgs, campus rec, IT department</p>
                    </div>
                  </div>
                </div>

                <div className={styles.infoCallout}>
                  <p className="text-sm font-semibold mb-1 text-white">Average Sponsorship Value per College Tournament:</p>
                  <p className={`text-3xl font-extrabold ${styles.highlight}`}>$1,500 - $3,000</p>
                  <p className={`text-xs mt-1 ${styles.textMuted}`}>Based on 200+ tournaments managed through Elara Arena</p>
                </div>
              </div>
            </Card>
          </section>

          {/* Step 5 */}
          <section className="flex flex-col gap-10">
            <h2 className={styles.sectionTitle}>
              <BarChart className="h-8 w-8 text-[#a890ff]" />
              Step 5: Promote Your Tournament
            </h2>

            <Card className={styles.cardGlass}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>Marketing Channels for College Esports</h3>
              </div>
              <div className={styles.cardContent}>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-[#a890ff] mt-0.5 shrink-0" />
                    <div className={styles.textMuted}>
                      <strong className="text-white">Discord servers</strong> - Post in college gaming servers, esports club channels, game-specific communities
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-[#a890ff] mt-0.5 shrink-0" />
                    <div className={styles.textMuted}>
                      <strong className="text-white">Instagram/Twitter</strong> - Create tournament graphics, countdown posts, player spotlights
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-[#a890ff] mt-0.5 shrink-0" />
                    <div className={styles.textMuted}>
                      <strong className="text-white">Campus flyers</strong> - Post in dorms, student union, gaming lab, computer science building
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-[#a890ff] mt-0.5 shrink-0" />
                    <div className={styles.textMuted}>
                      <strong className="text-white">Email blast</strong> - Through esports club mailing list, student org newsletter
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-[#a890ff] mt-0.5 shrink-0" />
                    <div className={styles.textMuted}>
                      <strong className="text-white">Partner orgs</strong> - Cross-promote with other student gaming organizations
                    </div>
                  </li>
                </ul>
              </div>
            </Card>
          </section>

          {/* CTA Banner Card */}
          <Card className={`${styles.cardGlass} ${styles.accentCardBar} mt-16`}>
            <div className={`${styles.cardContent} p-10`}>
              <h2 className="text-2xl font-bold mb-4 text-white">Ready to Run Your College Tournament?</h2>
              <p className={`mb-6 ${styles.textMuted}`}>
                Elara Arena provides everything you need: automated brackets, sponsor integration, NIL compliance, and live match tracking. Used by 200+ college esports programs.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" onClick={() => navigate('/get-started')} className={styles.ctaButtonPrimary}>
                  Start Your Tournament Free
                </Button>
                <Button size="lg" onClick={() => navigate('/compare/playvs')} className={styles.ctaButtonOutline}>
                  Compare vs PlayVS
                </Button>
              </div>
            </div>
          </Card>

          {/* FAQ */}
          <section className="border-t border-slate-800 pt-12 mt-16">
            <h2 className="text-2xl font-bold mb-6 text-white">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-1 text-[#a890ff]">How much does it cost to run a college esports tournament?</h3>
                <p className={`text-sm ${styles.textMuted}`}>
                  With Elara Arena's free tier, your only costs are prize pool ($500-2000) and optional venue rental. Most costs are covered by sponsors.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-1 text-[#a890ff]">What games are best for college tournaments?</h3>
                <p className={`text-sm ${styles.textMuted}`}>
                  League of Legends, Valorant, CS2, Rocket League, and Super Smash Bros are most popular. Choose games with active player bases on your campus.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-1 text-[#a890ff]">Do I need special software for tournament brackets?</h3>
                <p className={`text-sm ${styles.textMuted}`}>
                  Yes. Manual bracket management is error-prone. Elara Arena automates bracket generation, seeding, and match tracking with NIL compliance built-in.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-1 text-[#a890ff]">How do NIL rules affect college esports tournaments?</h3>
                <p className={`text-sm ${styles.textMuted}`}>
                  NCAA athletes can now earn money through esports tournaments. Use Elara's NIL marketplace to ensure compliant sponsor deals and prize money distribution.
                </p>
              </div>
            </div>
          </section>

          {/* Navigation */}
          <nav className="border-t border-slate-800 pt-8 mt-12">
            <h3 className="font-semibold mb-3 text-white">Related Guides</h3>
            <div className="grid md:grid-cols-2 gap-3">
              <Button onClick={() => navigate('/help')} className={`justify-start ${styles.ctaButtonOutline}`}>
                Tournament Management Help Center
              </Button>
              <Button onClick={() => navigate('/compare/playvs')} className={`justify-start ${styles.ctaButtonOutline}`}>
                Elara vs PlayVS Comparison
              </Button>
            </div>
          </nav>

        </article>
      </div>
    </main>
  );
};

export default TutorialRunCollegeTournament;