import { SEOHead } from "../components/seo/SEOHead";
import { Card } from "../components/ui/Card";
import { Check, X } from "lucide-react";
import { Button } from "../components/ui/Button";
import { useNavigate, useParams, Navigate } from "react-router-dom";

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
    <main className="min-h-screen px-6">
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        keywords={`elara vs ${validCompetitor}, ${data.name} alternative, best tournament software, white label esports platform, college esports software`}
        canonical={`https://hub.esportsleaguehub.com/compare/${validCompetitor}`}
      />

      <div className="max-w-6xl mx-auto space-y-8 py-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Elara Arena vs {data.name}</h1>
          <p className="text-xl text-muted-foreground">
            Why Elara Arena is the better choice for{" "}
            {validCompetitor === "playvs"
              ? "college and independent esports"
              : "white label tournament management"}
          </p>
        </div>

        <Card
          heading="Feature Comparison"
          description={`Side-by-side comparison of Elara Arena and ${data.name}`}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-semibold">Feature</th>
                  <th className="text-center p-4 font-semibold text-primary">
                    Elara Arena
                  </th>
                  <th className="text-center p-4 font-semibold">{data.name}</th>
                </tr>
              </thead>
              <tbody>
                {data.features.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-muted/50">
                    <td className="p-4">{item.feature}</td>
                    <td className="text-center p-4">
                      {renderFeatureValue(item.elara)}
                    </td>
                    <td className="text-center p-4">
                      {renderFeatureValue(item.competitor)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* 👇 THIS IS THE CORRECTED GRID WRAPPER (Changed gap-6 to gap-12) 👇 */}
        <div className="grid md:grid-cols-2 gap-12">
          <Card
            heading="Elara Arena"
            description="White Label Esports Platform with Sponsor Integration"
          >
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Best For:</h3>
                <p className="text-sm text-muted-foreground">
                  {validCompetitor === "playvs"
                    ? "College esports, independent leagues, gaming venues, branded tournaments"
                    : "Organizations wanting full customization with sponsor monetization"}
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Pricing:</h3>
                <p className="text-sm text-muted-foreground">
                  Free tier with white label options available
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Unique Advantages:</h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>✓ NIL athlete marketplace</li>
                  <li>✓ Integrated sponsor visibility</li>
                  <li>✓ Complete white label customization</li>
                  <li>✓ Revenue monetization built-in</li>
                </ul>
              </div>

              <Button onClick={() => navigate("/get-started")} className="w-full">
                Get Started with Elara
              </Button>
            </div>
          </Card>

          <Card heading={data.name} description={data.tagline}>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Best For:</h3>
                <p className="text-sm text-muted-foreground">{data.bestFor}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Pricing:</h3>
                <p className="text-sm text-muted-foreground">{data.pricing}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Limitations:</h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
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
              </div>
            </div>
          </Card>
        </div>
        {/* 👆 END OF UPDATED GRID WRAPPER 👆 */}

        <Card className="bg-primary/5 border-primary">
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-4">
              Why Organizations Choose Elara Over {data.name}
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  Complete White Label Control
                </h3>
                <p className="text-sm text-muted-foreground">
                  Fully customize your tournament platform with your brand
                  colors, logo, and domain. {data.name}{" "}
                  {validCompetitor === "toornament"
                    ? "requires enterprise contracts"
                    : "doesn't offer this"}
                  .
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  Built-In Sponsor Monetization
                </h3>
                <p className="text-sm text-muted-foreground">
                  Generate revenue through integrated sponsor placements, banner
                  ads, and NIL athlete profiles. Turn tournaments into profit
                  centers.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  {validCompetitor === "playvs"
                    ? "College & Independent League Support"
                    : "No Lock-In Contracts"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {validCompetitor === "playvs"
                    ? "Unlike PlayVS which only serves K-12 schools, Elara supports college esports, independent leagues, and gaming venues."
                    : "Start free and scale as you grow. No enterprise contracts or complex pricing tiers."}
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  NIL Athlete Marketplace
                </h3>
                <p className="text-sm text-muted-foreground">
                  First platform with integrated NIL (Name, Image, Likeness)
                  athlete profiles for college esports monetization
                  opportunities.
                </p>
              </div>
            </div>
          </div>
        </Card>

        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Ready to Switch to Elara Arena?</h2>
          <p className="text-muted-foreground">
            Join hundreds of tournament organizers who've made the switch from{" "}
            {data.name}
          </p>

          <div className="flex gap-4 justify-center">
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
        </div>
      </div>
    </main>
  );
};

function renderFeatureValue(value: boolean | string) {
  if (value === true) {
    return <Check className="h-5 w-5 text-green-600 mx-auto" />;
  }

  if (value === false) {
    return <X className="h-5 w-5 text-red-500 mx-auto" />;
  }

  return <span className="text-sm text-muted-foreground">{value}</span>;
}

export default Compare;