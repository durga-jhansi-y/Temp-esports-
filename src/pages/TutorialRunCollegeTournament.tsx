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
      <article className={styles.container}>
        
        {/* Header */}
        <header className={`${styles.hero} text-center flex flex-col items-center`}>
          <span className={styles.subtitlePill}>College Esports Guide</span>
          <h1>
            How to Run a College Esports Tournament in <span className={styles.highlight}>2026</span>
          </h1>
          <p className="max-w-2xl mx-auto">
            Complete step-by-step guide to organizing successful college esports tournaments with automated bracket generation, sponsor integration, and NIL compliance.
          </p>
          <div className={`${styles.metaInfo} justify-center`}>
            <span>Updated: June 2026</span>
            <span>•</span>
            <span>15 min read</span>
          </div>
        </header>

        {/* Quick Start Summary Card */}
        <Card className={`${styles.cardGlass} ${styles.accentCardBar}`}>
          <div className={`${styles.cardContent} flex flex-col items-center text-center`}>
            <h2 className="text-xl font-semibold mb-3 text-white">Quick Start Summary</h2>
            <p className={`mb-4 text-sm max-w-3xl ${styles.textMuted}`}>
              Running a college esports tournament requires 3 core components: tournament software for bracket management, sponsor partnerships for revenue, and compliance with NCAA NIL rules. This guide walks you through each step.
            </p>
            <Button onClick={() => navigate('/get-started')} className={styles.ctaButtonPrimary}>
              Start Your Tournament Free &rarr;
            </Button>
          </div>
        </Card>

        {/* Step 1 */}
        <section className={styles.stepWrapper}>
          <h2 className={`${styles.sectionTitle} flex flex-col items-center text-center`}>
            <Calendar className="h-8 w-8 text-[#a890ff] mb-2" />
            Step 1: Plan Your Tournament
          </h2>

          <Card className={styles.cardGlass}>
            <div className={`${styles.cardHeader} flex flex-col items-center text-center`}>
              <h3 className={styles.cardTitle}>Choose Tournament Format</h3>
              <p className={styles.cardDescription}>Select the right format for your college esports event</p>
            </div>

            <div className={`${styles.cardContent} space-y-8 flex flex-col items-center`}>
              <div className="w-full flex flex-col items-center">
                <h4 className="mb-2 text-center font-semibold text-[#a890ff]">Single Elimination (Recommended for Beginners)</h4>
                {/* Changed to w-fit and text-left, switched to list-outside for cleaner wrapping */}
                {/* <ul className={`w-fit mx-auto list-disc list-outside space-y-1 pl-5 text-left text-sm ${styles.textMuted}`}></ul> */ }
                <ul className={`w-fit list-none p-0 text-left space-y-1 text-sm ${styles.textMuted}`}>
                  <li className="grid grid-cols-[8px_auto] items-start gap-x-3">
                    <span className="leading-5">•</span>
                    <span>Fastest format - complete in one day</span>
                  </li>

                  <li className="grid grid-cols-[8px_auto] items-start gap-x-3">
                    <span className="leading-5">•</span>
                    <span>16-32 teams ideal for college campus events</span>
                  </li>

                  <li className="grid grid-cols-[8px_auto] items-start gap-x-3">
                    <span className="leading-5">•</span>
                    <span>Best for League of Legends, Valorant, CS2</span>
                  </li>

                  <li className="grid grid-cols-[8px_auto] items-start gap-x-3">
                    <span className="leading-5">•</span>
                    <span>Automated bracket generation with Elara Arena</span>
                  </li>
                </ul>
              </div>

              <div className="w-full flex flex-col items-center">
                <h4 className="font-semibold mb-2 text-[#a890ff] text-center">Double Elimination (More Competitive)</h4>
                <ul className={`list-disc list-outside space-y-1 text-sm ${styles.textMuted} text-left w-fit pl-5`}>
                  <li>Fairer format - everyone gets two chances</li>
                  <li>Takes 1.5-2x longer than single elimination</li>
                  <li>Popular for fighting games, Rocket League</li>
                  <li>Winners bracket and losers bracket automatically managed</li>
                </ul>
              </div>

              <div className="w-full flex flex-col items-center">
                <h4 className="font-semibold mb-2 text-[#a890ff] text-center">Round Robin (League Format)</h4>
                <ul className={`list-disc list-outside space-y-1 text-sm ${styles.textMuted} text-left w-fit pl-5`}>
                  <li>Every team plays every other team</li>
                  <li>Best for 8-12 team seasonal leagues</li>
                  <li>Great for intramural college esports</li>
                  <li>Requires multiple weeks/months to complete</li>
                </ul>
              </div>
            </div>
          </Card>

          <Card className={styles.cardGlass}>
            <div className={`${styles.cardHeader} flex flex-col items-center text-center`}>
              <h3 className={styles.cardTitle}>Set Tournament Details</h3>
            </div>
            <div className={styles.cardContent}>
              <div className="grid md:grid-cols-2 gap-6 text-sm text-center">
                <div className="flex flex-col items-center">
                  <strong className="text-white mb-1">Date & Time:</strong>
                  <p className={styles.textMuted}>Weekend afternoons work best for college students. 1pm-8pm is ideal.</p>
                </div>
                <div className="flex flex-col items-center">
                  <strong className="text-white mb-1">Prize Pool:</strong>
                  <p className={styles.textMuted}>$500-$2,000 for college tournaments. Use sponsor funding (see Step 4).</p>
                </div>
                <div className="flex flex-col items-center">
                  <strong className="text-white mb-1">Team Size:</strong>
                  <p className={styles.textMuted}>5v5 for League/Valorant, 3v3 for Rocket League, 1v1 for fighting games.</p>
                </div>
                <div className="flex flex-col items-center">
                  <strong className="text-white mb-1">Platform:</strong>
                  <p className={styles.textMuted}>PC (most common), Console (for Madden/FIFA), or both.</p>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Step 2 */}
        <section className={styles.stepWrapper}>
          <h2 className={`${styles.sectionTitle} flex flex-col items-center text-center`}>
            <Users className="h-8 w-8 text-[#a890ff] mb-2" />
            Step 2: Set Up Tournament Registration
          </h2>

          <Card className={styles.cardGlass}>
            <div className={`${styles.cardHeader} flex flex-col items-center text-center`}>
              <h3 className={styles.cardTitle}>Create Registration Form</h3>
              <p className={styles.cardDescription}>Using Elara Arena's automated system</p>
            </div>
            <div className={`${styles.cardContent} space-y-6 flex flex-col items-center`}>
              <ol className="list-decimal list-inside space-y-5 text-sm text-slate-200 text-center w-full">
                <li>
                  <strong className="text-white">Create tournament in Elara Arena</strong>
                  <div className={`mt-1 ${styles.textMuted}`}>Click "Create Tournament" → Enter details → Auto-generate registration link</div>
                </li>
                <li>
                  <strong className="text-white">Set registration requirements</strong>
                  <div className={`mt-1 ${styles.textMuted}`}>College email verification (.edu), team name, roster of 5-8 players, captain contact</div>
                </li>
                <li>
                  <strong className="text-white">Entry fee (optional)</strong>
                  <div className={`mt-1 ${styles.textMuted}`}>$15-25 per team, or free with sponsor funding. PayPal integration built-in.</div>
                </li>
                <li>
                  <strong className="text-white">Set registration deadline</strong>
                  <div className={`mt-1 ${styles.textMuted}`}>1 week before tournament date. Auto-close registration at deadline.</div>
                </li>
              </ol>

              <div className={`${styles.infoCallout} text-center flex flex-col items-center w-full max-w-2xl`}>
                <h4 className="font-semibold mb-1 text-[#a890ff]">Pro Tip: NIL Compliance</h4>
                <p className={`text-sm ${styles.textMuted}`}>
                  If offering prize money to NCAA athletes, ensure compliance with NIL rules. Elara Arena includes NIL athlete profile system for transparent sponsorship deals.
                </p>
              </div>
            </div>
          </Card>
        </section>

        {/* Step 3 */}
        <section className={styles.stepWrapper}>
          <h2 className={`${styles.sectionTitle} flex flex-col items-center text-center`}>
            <Trophy className="h-8 w-8 text-[#a890ff] mb-2" />
            Step 3: Generate Brackets & Manage Matches
          </h2>

          <Card className={styles.cardGlass}>
            <div className={`${styles.cardHeader} flex flex-col items-center text-center`}>
              <h3 className={styles.cardTitle}>Automated Bracket Generation</h3>
              <p className={styles.cardDescription}>Let Elara Arena handle the complex math</p>
            </div>
            <div className={`${styles.cardContent} space-y-8 flex flex-col items-center`}>
              
              <div className="grid md:grid-cols-2 gap-6 w-full">
                <div className="flex flex-col items-center text-center gap-2">
                  <CheckCircle2 className="h-6 w-6 text-emerald-400" />
                  <div>
                    <strong className="text-sm text-white">Automatic seeding</strong>
                    <p className={`text-sm mt-1 ${styles.textMuted}`}>Teams automatically placed based on registration order or rankings</p>
                  </div>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <CheckCircle2 className="h-6 w-6 text-emerald-400" />
                  <div>
                    <strong className="text-sm text-white">Live bracket updates</strong>
                    <p className={`text-sm mt-1 ${styles.textMuted}`}>Scores update in real-time as matches complete</p>
                  </div>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <CheckCircle2 className="h-6 w-6 text-emerald-400" />
                  <div>
                    <strong className="text-sm text-white">Next match automatic scheduling</strong>
                    <p className={`text-sm mt-1 ${styles.textMuted}`}>Winners advance automatically, no manual bracket management</p>
                  </div>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <CheckCircle2 className="h-6 w-6 text-emerald-400" />
                  <div>
                    <strong className="text-sm text-white">Public bracket viewer</strong>
                    <p className={`text-sm mt-1 ${styles.textMuted}`}>Share bracket link for spectators and participants</p>
                  </div>
                </div>
              </div>

              <Button onClick={() => navigate('/tournaments')} className={`w-full max-w-md ${styles.ctaButtonOutline}`}>
                See Tournament Management Demo
              </Button>
            </div>
          </Card>
        </section>

        {/* Step 4 */}
        <section className={styles.stepWrapper}>
          <h2 className={`${styles.sectionTitle} flex flex-col items-center text-center`}>
            <DollarSign className="h-8 w-8 text-[#a890ff] mb-2" />
            Step 4: Secure Sponsors & Generate Revenue
          </h2>

          <Card className={styles.cardGlass}>
            <div className={`${styles.cardHeader} flex flex-col items-center text-center`}>
              <h3 className={styles.cardTitle}>Tournament Monetization Strategy</h3>
              <p className={styles.cardDescription}>Turn your tournament into a revenue generator</p>
            </div>
            <div className={`${styles.cardContent} space-y-8 flex flex-col items-center`}>
              <div className="w-full">
                <h4 className="font-semibold mb-3 text-[#a890ff] text-center">Sponsor Integration (Built into Elara)</h4>
                <ul className={`list-disc list-inside space-y-2 text-sm ${styles.textMuted} text-center`}>
                  <li><strong className="text-white">Banner ads</strong> - Top/bottom of tournament page ($200-500 value)</li>
                  <li><strong className="text-white">Sidebar sponsors</strong> - Visible during live matches ($150-300 value)</li>
                  <li><strong className="text-white">Stream overlays</strong> - For Twitch/YouTube broadcasts ($300-600 value)</li>
                  <li><strong className="text-white">NIL athlete profiles</strong> - Student athletes can secure individual deals</li>
                </ul>
              </div>

              <div className="w-full">
                <h4 className="font-semibold mb-4 text-[#a890ff] text-center">Sponsor Prospects for College Esports</h4>
                <div className="grid md:grid-cols-2 gap-6 text-sm text-center">
                  <div className="flex flex-col items-center">
                    <strong className="text-white mb-1">Gaming Brands:</strong>
                    <p className={styles.textMuted}>Razer, HyperX, Logitech, Corsair</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <strong className="text-white mb-1">Energy Drinks:</strong>
                    <p className={styles.textMuted}>G Fuel, Red Bull, Monster</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <strong className="text-white mb-1">Local Businesses:</strong>
                    <p className={styles.textMuted}>Pizza shops, PC cafes, gaming stores</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <strong className="text-white mb-1">University Partners:</strong>
                    <p className={styles.textMuted}>Student orgs, campus rec, IT department</p>
                  </div>
                </div>
              </div>

              <div className={`${styles.infoCallout} text-center flex flex-col items-center w-full max-w-2xl`}>
                <p className="text-sm font-semibold mb-1 text-white">Average Sponsorship Value per College Tournament:</p>
                <p className={`text-3xl font-extrabold ${styles.highlight}`}>$1,500 - $3,000</p>
                <p className={`text-xs mt-1 ${styles.textMuted}`}>Based on 200+ tournaments managed through Elara Arena</p>
              </div>
            </div>
          </Card>
        </section>

        {/* Step 5 */}
        <section className={styles.stepWrapper}>
          <h2 className={`${styles.sectionTitle} flex flex-col items-center text-center`}>
            <BarChart className="h-8 w-8 text-[#a890ff] mb-2" />
            Step 5: Promote Your Tournament
          </h2>

          <Card className={styles.cardGlass}>
            <div className={`${styles.cardHeader} flex flex-col items-center text-center`}>
              <h3 className={styles.cardTitle}>Marketing Channels for College Esports</h3>
            </div>
            <div className={styles.cardContent}>
              <div className="grid md:grid-cols-2 gap-6 text-sm w-full">
                <div className="flex flex-col items-center text-center gap-2">
                  <CheckCircle2 className="h-6 w-6 text-[#a890ff]" />
                  <div className={styles.textMuted}>
                    <strong className="text-white block mb-1">Discord servers</strong> 
                    Post in college gaming servers, esports club channels, game-specific communities
                  </div>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <CheckCircle2 className="h-6 w-6 text-[#a890ff]" />
                  <div className={styles.textMuted}>
                    <strong className="text-white block mb-1">Instagram/Twitter</strong> 
                    Create tournament graphics, countdown posts, player spotlights
                  </div>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <CheckCircle2 className="h-6 w-6 text-[#a890ff]" />
                  <div className={styles.textMuted}>
                    <strong className="text-white block mb-1">Campus flyers</strong> 
                    Post in dorms, student union, gaming lab, computer science building
                  </div>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <CheckCircle2 className="h-6 w-6 text-[#a890ff]" />
                  <div className={styles.textMuted}>
                    <strong className="text-white block mb-1">Email blast</strong> 
                    Through esports club mailing list, student org newsletter
                  </div>
                </div>
                <div className="flex flex-col items-center text-center gap-2 md:col-span-2">
                  <CheckCircle2 className="h-6 w-6 text-[#a890ff]" />
                  <div className={styles.textMuted}>
                    <strong className="text-white block mb-1">Partner orgs</strong> 
                    Cross-promote with other student gaming organizations
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* CTA Banner Card */}
        <Card className={`${styles.cardGlass} ${styles.accentCardBar}`}>
          <div className={`${styles.cardContent} p-10 flex flex-col items-center text-center`}>
            <h2 className="text-2xl font-bold mb-4 text-white">Ready to Run Your College Tournament?</h2>
            <p className={`mb-6 max-w-2xl ${styles.textMuted}`}>
              Elara Arena provides everything you need: automated brackets, sponsor integration, NIL compliance, and live match tracking. Used by 200+ college esports programs.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="large" onClick={() => navigate('/get-started')} className={styles.ctaButtonPrimary}>
                Start Your Tournament Free
              </Button>
              <Button size="large" onClick={() => navigate('/compare/playvs')} className={styles.ctaButtonOutline}>
                Compare vs PlayVS
              </Button>
            </div>
          </div>
        </Card>

        {/* FAQ */}
        <section className={`${styles.faqSection} flex flex-col items-center text-center`}>
          <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
          <div className="space-y-8 w-full max-w-3xl">
            <div className="flex flex-col items-center">
              <h3 className="font-semibold mb-2 text-[#a890ff]">How much does it cost to run a college esports tournament?</h3>
              <p className={`text-sm ${styles.textMuted}`}>
                With Elara Arena's free tier, your only costs are prize pool ($500-2000) and optional venue rental. Most costs are covered by sponsors.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="font-semibold mb-2 text-[#a890ff]">What games are best for college tournaments?</h3>
              <p className={`text-sm ${styles.textMuted}`}>
                League of Legends, Valorant, CS2, Rocket League, and Super Smash Bros are most popular. Choose games with active player bases on your campus.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="font-semibold mb-2 text-[#a890ff]">Do I need special software for tournament brackets?</h3>
              <p className={`text-sm ${styles.textMuted}`}>
                Yes. Manual bracket management is error-prone. Elara Arena automates bracket generation, seeding, and match tracking with NIL compliance built-in.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="font-semibold mb-2 text-[#a890ff]">How do NIL rules affect college esports tournaments?</h3>
              <p className={`text-sm ${styles.textMuted}`}>
                NCAA athletes can now earn money through esports tournaments. Use Elara's NIL marketplace to ensure compliant sponsor deals and prize money distribution.
              </p>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <nav className={`${styles.navSection} flex flex-col items-center text-center`}>
          <h3 className="font-semibold mb-4 text-white">Related Guides</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => navigate('/help')} className={`justify-center ${styles.ctaButtonOutline}`}>
              Tournament Management Help Center
            </Button>
            <Button onClick={() => navigate('/compare/playvs')} className={`justify-center ${styles.ctaButtonOutline}`}>
              Elara vs PlayVS Comparison
            </Button>
          </div>
        </nav>

      </article>
    </main>
  );
};

export default TutorialRunCollegeTournament;