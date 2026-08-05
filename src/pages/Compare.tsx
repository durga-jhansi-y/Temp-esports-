import { SEOHead } from "../components/seo/SEOHead";
import { Card } from "../components/ui/Card";
import { Check, X } from "lucide-react";
import { Button } from "../components/ui/Button";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import styles from "./Compare.module.css";

const competitorData = {
  challonge: {
    name: "Challonge",
    tagline: "Free Tournament Bracket Generator",
    features: [
      { feature: "Automated Bracket Generation", elara: true, competitor: true },
      { feature: "White Label Customization", elara: true, competitor: false },
      { feature: "Sponsor Integration", elara: true, competitor: false },
      { feature: "NIL Athlete Marketplace", elara: true, competitor: false },
      { feature: "Live Match Streaming", elara: true, competitor: false },
      { feature: "Analytics Dashboard", elara: true, competitor: "Limited" },
      { feature: "Multi-Tournament Support", elara: true, competitor: true },
      { feature: "Team Registration", elara: true, competitor: true },
      { feature: "Revenue Monetization", elara: true, competitor: false },
      { feature: "College Esports Features", elara: true, competitor: false },
    ],
    pricing: "Free tier, limited features for pro",
    bestFor: "Casual grassroots tournaments",
  },
  battlefy: {
    name: "Battlefy",
    tagline: "Team-Based Esports Platform",
    features: [
      { feature: "Automated Bracket Generation", elara: true, competitor: true },
      { feature: "White Label Customization", elara: true, competitor: false },
      { feature: "Sponsor Integration", elara: true, competitor: "Limited" },
      { feature: "NIL Athlete Marketplace", elara: true, competitor: false },
      { feature: "Live Match Streaming", elara: true, competitor: true },
      { feature: "Analytics Dashboard", elara: true, competitor: true },
      { feature: "Multi-Tournament Support", elara: true, competitor: true },
      { feature: "Team Registration", elara: true, competitor: true },
      { feature: "Revenue Monetization", elara: true, competitor: false },
      { feature: "College Esports Features", elara: true, competitor: false },
    ],
    pricing: "Free for small tournaments, complex pricing for enterprise",
    bestFor: "League of Legends and team-based games",
  },
  toornament: {
    name: "Toornament",
    tagline: "White Label Tournament Platform",
    features: [
      { feature: "Automated Bracket Generation", elara: true, competitor: true },
      { feature: "White Label Customization", elara: true, competitor: true },
      { feature: "Sponsor Integration", elara: true, competitor: "Basic" },
      { feature: "NIL Athlete Marketplace", elara: true, competitor: false },
      { feature: "Live Match Streaming", elara: true, competitor: true },
      { feature: "Analytics Dashboard", elara: true, competitor: true },
      { feature: "Multi-Tournament Support", elara: true, competitor: true },
      { feature: "Team Registration", elara: true, competitor: true },
      { feature: "Revenue Monetization", elara: true, competitor: "Limited" },
      { feature: "College Esports Features", elara: true, competitor: false },
    ],
    pricing: "White label requires enterprise contract",
    bestFor: "Enterprise tournament organizers",
  },
  playvs: {
    name: "PlayVS",
    tagline: "Scholastic Esports Platform",
    features: [
      { feature: "Automated Bracket Generation", elara: true, competitor: true },
      { feature: "White Label Customization", elara: true, competitor: false },
      { feature: "Sponsor Integration", elara: true, competitor: false },
      { feature: "NIL Athlete Marketplace", elara: true, competitor: false },
      { feature: "Live Match Streaming", elara: true, competitor: "Limited" },
      { feature: "Analytics Dashboard", elara: true, competitor: true },
      { feature: "K-12 School Support", elara: true, competitor: true },
      { feature: "College/University Support", elara: true, competitor: false },
      { feature: "Revenue Monetization", elara: true, competitor: false },
      { feature: "Independent League Support", elara: true, competitor: false },
    ],
    pricing: "School/district contracts only",
    bestFor: "K-12 high school esports only",
  },
};

type CompetitorKey = keyof typeof competitorData;

export const Compare = () => {
  const navigate = useNavigate();
  const { competitor } = useParams<{ competitor: string }>();

  if (!competitor || !(competitor in competitorData)) {
    return <Navigate to="/" replace />;
  }

  const validCompetitor = competitor as CompetitorKey;
  const data = competitorData[validCompetitor];

  const seoTitle = `Elara Arena vs ${data.name} - Best ${
    validCompetitor === "playvs" ? "College" : "White Label"
  } Esports Tournament Platform 2026`;

  const seoDescription = `Compare Elara Arena vs ${data.name}. Elara offers white label customization, sponsor integration, and NIL marketplace that ${data.name} doesn't. See the full comparison.`;

  return (
    <main className={styles.comparePage}>
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        keywords={`elara vs ${validCompetitor}, ${data.name} alternative, best tournament software, white label esports platform, college esports software`}
        canonical={`https://hub.esportsleaguehub.com/compare/${validCompetitor}`}
      />

      <div className={styles.container}>
        <section className={styles.hero}>
          <h1>Elara Arena vs {data.name}</h1>
          <p>
            Why Elara Arena is the better choice for{" "}
            {validCompetitor === "playvs"
              ? "college and independent esports"
              : "white label tournament management"}
          </p>
        </section>

        <Card
          className={styles.centeredCard}
          heading="Feature Comparison"
          description={`Side-by-side comparison of Elara Arena and ${data.name}`}
        >
          <div className={styles.tableWrapper}>
            <table className={styles.comparisonTable}>
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Elara Arena</th>
                  <th>{data.name}</th>
                </tr>
              </thead>
              <tbody>
                {data.features.map((item, index) => (
                  <tr key={index}>
                    <td>{item.feature}</td>
                    <td>{renderFeatureValue(item.elara)}</td>
                    <td>{renderFeatureValue(item.competitor)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <div className={styles.cardGrid}>
          <Card
            className={styles.centeredCard}
            heading="Elara Arena"
            description="White Label Esports Platform with Sponsor Integration"
          >
            <div className={styles.cardContent}>
              <section className={styles.infoBlock}>
                <h3>Best For:</h3>
                <p>
                  {validCompetitor === "playvs"
                    ? "College esports, independent leagues, gaming venues, branded tournaments"
                    : "Organizations wanting full customization with sponsor monetization"}
                </p>
              </section>

              <section className={styles.infoBlock}>
                <h3>Pricing:</h3>
                <p>Free tier with white label options available</p>
              </section>

              <section className={styles.infoBlock}>
                <h3>Unique Advantages:</h3>
                <ul className={styles.cleanList}>
                  <li>✓ NIL athlete marketplace</li>
                  <li>✓ Integrated sponsor visibility</li>
                  <li>✓ Complete white label customization</li>
                  <li>✓ Revenue monetization built-in</li>
                </ul>
              </section>

              <Button
                onClick={() => navigate("/get-started")}
                className={styles.fullButton}
              >
                Get Started with Elara
              </Button>
            </div>
          </Card>

          <Card
            className={styles.centeredCard}
            heading={data.name}
            description={data.tagline}
          >
            <div className={styles.cardContent}>
              <section className={styles.infoBlock}>
                <h3>Best For:</h3>
                <p>{data.bestFor}</p>
              </section>

              <section className={styles.infoBlock}>
                <h3>Pricing:</h3>
                <p>{data.pricing}</p>
              </section>

              <section className={styles.infoBlock}>
                <h3>Limitations:</h3>
                <ul className={styles.cleanList}>
                  {data.features
                    .filter(
                      (feature) =>
                        !feature.competitor ||
                        feature.competitor === "Limited" ||
                        feature.competitor === "Basic"
                    )
                    .slice(0, 4)
                    .map((feature, index) => (
                      <li key={index}>
                        ✗{" "}
                        {feature.feature === "White Label Customization"
                          ? "No white label"
                          : `No ${feature.feature.toLowerCase()}`}
                      </li>
                    ))}
                </ul>
              </section>
            </div>
          </Card>
        </div>

        <Card className={`${styles.centeredCard} ${styles.highlightCard}`}>
          <section className={styles.fullWidthCardContent}>
            <h2 className={styles.sectionTitle}>
              Why Organizations Choose Elara Over {data.name}
            </h2>

            <div className={styles.reasonGrid}>
              <article className={styles.reasonItem}>
                <h3 className={styles.reasonTitle}>
                  <Check className={styles.inlineIcon} />
                  Complete White Label Control
                </h3>
                <p>
                  Fully customize your tournament platform with your brand
                  colors, logo, and domain. {data.name}{" "}
                  {validCompetitor === "toornament"
                    ? "requires enterprise contracts"
                    : "doesn't offer this"}
                  .
                </p>
              </article>

              <article className={styles.reasonItem}>
                <h3 className={styles.reasonTitle}>
                  <Check className={styles.inlineIcon} />
                  Built-In Sponsor Monetization
                </h3>
                <p>
                  Generate revenue through integrated sponsor placements, banner
                  ads, and NIL athlete profiles. Turn tournaments into profit
                  centers.
                </p>
              </article>

              <article className={styles.reasonItem}>
                <h3 className={styles.reasonTitle}>
                  <Check className={styles.inlineIcon} />
                  {validCompetitor === "playvs"
                    ? "College & Independent League Support"
                    : "No Lock-In Contracts"}
                </h3>
                <p>
                  {validCompetitor === "playvs"
                    ? "Unlike PlayVS which only serves K-12 schools, Elara supports college esports, independent leagues, and gaming venues."
                    : "Start free and scale as you grow. No enterprise contracts or complex pricing tiers."}
                </p>
              </article>

              <article className={styles.reasonItem}>
                <h3 className={styles.reasonTitle}>
                  <Check className={styles.inlineIcon} />
                  NIL Athlete Marketplace
                </h3>
                <p>
                  First platform with integrated NIL (Name, Image, Likeness)
                  athlete profiles for college esports monetization
                  opportunities.
                </p>
              </article>
            </div>
          </section>
        </Card>

        <section className={styles.cta}>
          <h2>Ready to Switch to Elara Arena?</h2>
          <p>
            Join hundreds of tournament organizers who've made the switch from{" "}
            {data.name}
          </p>

          <div className={styles.ctaButtons}>
            <Button size="large" onClick={() => navigate("/get-started")}>
              Get Started Free
            </Button>
            <Button
              size="large"
              variant="outline"
              onClick={() => navigate("/help")}
            >
              Learn More
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
};

function renderFeatureValue(value: boolean | string) {
  if (value === true) {
    return <Check className={styles.checkIcon} />;
  }

  if (value === false) {
    return <X className={styles.xIcon} />;
  }

  return <span className={styles.limitedText}>{value}</span>;
}

export default Compare;