import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Lightbulb, Zap, Rocket, CheckCircle2, MessageSquare, Settings, BarChart } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Discovery-samtal",
    description: "Vi börjar med att förstå er verksamhet, era köpare och era utmaningar. Vilka friktionspunkter finns i säljprocessen? Var tappar ni leads?",
    details: ["Kartläggning av köpresan", "Identifiering av pain points", "Målsättning och KPI:er"],
    duration: "1-2 timmar",
  },
  {
    number: "02",
    icon: Lightbulb,
    title: "Strategisk planering",
    description: "Baserat på insikterna tar vi fram en strategi för vilka verktyg som ger störst effekt och hur de bäst integreras i er befintliga process.",
    details: ["Prioritering av verktyg", "Wireframes och koncept", "Teknisk planering"],
    duration: "3-5 dagar",
  },
  {
    number: "03",
    icon: Zap,
    title: "AI-driven prototyp",
    description: "Med hjälp av AI skapar vi snabbt en fungerande prototyp som ni kan testa och ge feedback på innan full produktion.",
    details: ["Interaktiv prototyp", "Användartester", "Iterationer baserat på feedback"],
    duration: "1-2 veckor",
  },
  {
    number: "04",
    icon: Settings,
    title: "Utveckling & Integration",
    description: "Vi bygger den färdiga lösningen med fokus på prestanda, säkerhet och sömlös integration med era system.",
    details: ["Responsiv design", "CRM-integration", "Säkerhet och GDPR"],
    duration: "4-8 veckor",
  },
  {
    number: "05",
    icon: Rocket,
    title: "Lansering",
    description: "Vi hjälper er lansera verktyget med rätt strategi för att maximera adoption och effekt.",
    details: ["Soft launch och testning", "Utbildning av team", "Full lansering"],
    duration: "1 vecka",
  },
  {
    number: "06",
    icon: BarChart,
    title: "Optimering",
    description: "Efter lansering följer vi upp med data, A/B-testar och optimerar kontinuerligt för att förbättra resultaten.",
    details: ["Analys och rapportering", "A/B-testning", "Kontinuerliga förbättringar"],
    duration: "Löpande",
  },
];

export default function SaFunkarDet() {
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
              Från idé till lansering{" "}
              <span className="gradient-text">på rekordtid</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Vår beprövade process kombinerar strategisk expertis med AI-driven
              snabbhet för att leverera verktyg som gör skillnad.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="space-y-16">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center">
                      <step.icon className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <span className="font-mono text-primary text-lg">{step.number}</span>
                  </div>
                  <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                    {step.title}
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    {step.description}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {step.details.map((detail) => (
                      <li key={detail} className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-primary" />
                        <span className="text-foreground">{detail}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm font-medium text-primary">
                    Tidsram: {step.duration}
                  </p>
                </div>

                <div className={`gradient-border rounded-2xl p-8 card-gradient ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div className="h-48 flex items-center justify-center">
                    <step.icon className="w-24 h-24 text-primary/30" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
              Redo att ta första steget?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Boka ett kostnadsfritt discovery-samtal och låt oss utforska hur vi kan
              hjälpa er.
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
