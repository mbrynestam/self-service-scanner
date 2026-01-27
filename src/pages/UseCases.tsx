import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Calculator, Boxes, LineChart, Settings, FileText, Users } from "lucide-react";

const useCases = [
  {
    icon: Calculator,
    title: "Priskalkylatorer",
    description: "Ge köpare möjlighet att konfigurera sin lösning och se prisuppskattningar i realtid. Sluta skicka \"kontakta oss för pris\" – ge dem svaren direkt.",
    benefits: ["Högre konvertering", "Kvalificerade leads", "Kortare säljcykler"],
    example: "En SaaS-plattform implementerade en priskalkylator och såg 65% ökning i demo-bokningar.",
  },
  {
    icon: Boxes,
    title: "Produktkonfiguratorer",
    description: "Interaktiva verktyg där köpare bygger ihop sin perfekta lösning med visuell feedback och rekommendationer.",
    benefits: ["Bättre produktförståelse", "Färre returer", "Högre ordervärden"],
    example: "Ett industriföretag ökade genomsnittligt ordervärde med 40% efter lansering.",
  },
  {
    icon: LineChart,
    title: "ROI-kalkylatorer",
    description: "Hjälp köpare bevisa värdet internt med data-drivna business cases som de kan dela med beslutsfattare.",
    benefits: ["Snabbare interna beslut", "Starkare business case", "Fler avslut"],
    example: "B2B-företag såg 50% kortare tid från första kontakt till signerat avtal.",
  },
  {
    icon: Settings,
    title: "Self-service onboarding",
    description: "Guida nya kunder genom setup och konfiguration utan manuellt stöd – sparar tid för er och förbättrar upplevelsen för dem.",
    benefits: ["Lägre supportkostnader", "Snabbare time-to-value", "Högre kundnöjdhet"],
    example: "Supportärenden minskade med 70% efter implementation av guidad onboarding.",
  },
  {
    icon: FileText,
    title: "Behovsanalyser",
    description: "Interaktiva frågeformulär som hjälper köpare identifiera sina behov och matchar dem med rätt lösning.",
    benefits: ["Bättre leads", "Personaliserad upplevelse", "Ökad engagemang"],
    example: "Leads från behovsanalysen hade 3x högre konverteringsgrad till kund.",
  },
  {
    icon: Users,
    title: "Partner-verktyg",
    description: "Ge era partners verktyg för att sälja mer effektivt – från offertkonfiguratorer till utbildningsplattformar.",
    benefits: ["Aktivare partners", "Ökad partnersälj", "Starkare relationer"],
    example: "Partner-driven försäljning ökade med 120% första året.",
  },
];

export default function UseCasesPage() {
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
              Use cases som{" "}
              <span className="gradient-text">driver resultat</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Se hur olika typer av self-service verktyg kan accelerera er
              säljprocess och öka konverteringen.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="space-y-16">
            {useCases.map((useCase, index) => (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="gradient-border rounded-2xl p-8 lg:p-12"
              >
                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                        <useCase.icon className="w-7 h-7 text-primary" />
                      </div>
                      <h2 className="font-display text-2xl font-bold text-foreground">
                        {useCase.title}
                      </h2>
                    </div>
                    <p className="text-lg text-muted-foreground mb-6">
                      {useCase.description}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {useCase.benefits.map((benefit) => (
                        <span
                          key={benefit}
                          className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium"
                        >
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="bg-secondary/50 rounded-xl p-6">
                    <p className="text-sm text-muted-foreground mb-2">Resultat i verkligheten:</p>
                    <p className="text-foreground font-medium">{useCase.example}</p>
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
              Vilken utmaning vill ni lösa?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Boka ett samtal så diskuterar vi hur self-service tools kan hjälpa er
              specifika situation.
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
