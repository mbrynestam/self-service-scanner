import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    description: "Perfekt för att testa konceptet med ett första verktyg.",
    price: "Från 75 000 kr",
    period: "engångsavgift",
    features: [
      "1 self-service verktyg",
      "AI-prototyp ingår",
      "Responsiv design",
      "Grundläggande analytics",
      "CRM-integration",
      "3 månaders support",
    ],
    cta: "Kom igång",
    popular: false,
  },
  {
    name: "Growth",
    description: "För företag som vill skala med flera verktyg.",
    price: "Från 150 000 kr",
    period: "engångsavgift",
    features: [
      "2-3 self-service verktyg",
      "AI-prototyp + iteration",
      "Avancerad analytics & A/B-testning",
      "Full CRM/MA-integration",
      "Personalisering",
      "6 månaders support",
      "Månatlig optimering",
    ],
    cta: "Mest populär",
    popular: true,
  },
  {
    name: "Enterprise",
    description: "Skräddarsydd lösning för stora organisationer.",
    price: "Offert",
    period: "baserat på omfattning",
    features: [
      "Obegränsat antal verktyg",
      "Strategisk rådgivning",
      "Dedikerat team",
      "Enterprise-integrationer",
      "Avancerad säkerhet & compliance",
      "12 månaders support",
      "Löpande utveckling",
      "SLA-garanti",
    ],
    cta: "Kontakta oss",
    popular: false,
  },
];

const addons = [
  { name: "Löpande support & underhåll", price: "Från 5 000 kr/mån" },
  { name: "A/B-testning & optimering", price: "Från 8 000 kr/mån" },
  { name: "Ytterligare integrationer", price: "Från 15 000 kr/st" },
  { name: "Utbildning & workshops", price: "Från 10 000 kr/tillfälle" },
];

export default function Priser() {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 relative overflow-hidden">
        <div className="hero-glow top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30" />
        
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Priser som passar{" "}
              <span className="gradient-text">er ambition</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Transparent prissättning utan dolda avgifter. Välj det paket som
              matchar era behov och budget.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative rounded-2xl p-8 ${
                  plan.popular
                    ? "gradient-border card-gradient scale-105"
                    : "bg-card border border-border"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-sm font-semibold rounded-full">
                    Mest populär
                  </div>
                )}
                
                <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                  {plan.name}
                </h3>
                <p className="text-muted-foreground mb-6">{plan.description}</p>
                
                <div className="mb-6">
                  <p className="font-display text-3xl font-bold text-foreground">
                    {plan.price}
                  </p>
                  <p className="text-sm text-muted-foreground">{plan.period}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={plan.popular ? "hero" : "outline"}
                  className="w-full"
                  asChild
                >
                  <Link to="/kontakt">{plan.cta}</Link>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Tilläggstjänster
            </h2>
            <p className="text-lg text-muted-foreground">
              Anpassa ert paket med extra tjänster efter behov.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {addons.map((addon, index) => (
              <motion.div
                key={addon.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-secondary/50 rounded-xl p-6 border border-border"
              >
                <p className="font-semibold text-foreground mb-2">{addon.name}</p>
                <p className="text-primary font-medium">{addon.price}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
              Osäker på vad som passar?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Boka ett samtal så hjälper vi er hitta rätt lösning baserat på era
              mål och budget.
            </p>
            <Button variant="hero" size="xl" asChild>
              <Link to="/kontakt">
                Boka demo
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
