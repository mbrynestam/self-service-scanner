import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Calculator, Boxes, LineChart, Settings, FileText, Users } from "lucide-react";

// Import use case images
import pricingCalcImage from "@/assets/usecase-pricing-calculator.jpg";
import configuratorImage from "@/assets/usecase-configurator.jpg";
import roiCalcImage from "@/assets/usecase-roi-calculator.jpg";
import onboardingImage from "@/assets/usecase-onboarding.jpg";
import assessmentImage from "@/assets/usecase-assessment.jpg";
import partnerToolsImage from "@/assets/usecase-partner-tools.jpg";

const useCases = [
  {
    icon: Calculator,
    title: "Priskalkylatorer",
    description: "Ge köpare möjlighet att konfigurera sin lösning och se prisuppskattningar i realtid. Sluta skicka \"kontakta oss för pris\" – ge dem svaren direkt.",
    benefits: ["Högre konvertering", "Kvalificerade leads", "Kortare säljcykler"],
    example: "En SaaS-plattform implementerade en priskalkylator och såg 65% ökning i demo-bokningar.",
    image: pricingCalcImage,
  },
  {
    icon: Boxes,
    title: "Produktkonfiguratorer",
    description: "Interaktiva verktyg där köpare bygger ihop sin perfekta lösning med visuell feedback och rekommendationer.",
    benefits: ["Bättre produktförståelse", "Färre returer", "Högre ordervärden"],
    example: "Ett industriföretag ökade genomsnittligt ordervärde med 40% efter lansering.",
    image: configuratorImage,
  },
  {
    icon: LineChart,
    title: "ROI-kalkylatorer",
    description: "Hjälp köpare bevisa värdet internt med data-drivna business cases som de kan dela med beslutsfattare.",
    benefits: ["Snabbare interna beslut", "Starkare business case", "Fler avslut"],
    example: "B2B-företag såg 50% kortare tid från första kontakt till signerat avtal.",
    image: roiCalcImage,
  },
  {
    icon: Settings,
    title: "Self-service onboarding",
    description: "Guida nya kunder genom setup och konfiguration utan manuellt stöd – sparar tid för er och förbättrar upplevelsen för dem.",
    benefits: ["Lägre supportkostnader", "Snabbare time-to-value", "Högre kundnöjdhet"],
    example: "Supportärenden minskade med 70% efter implementation av guidad onboarding.",
    image: onboardingImage,
  },
  {
    icon: FileText,
    title: "Behovsanalyser",
    description: "Interaktiva frågeformulär som hjälper köpare identifiera sina behov och matchar dem med rätt lösning.",
    benefits: ["Bättre leads", "Personaliserad upplevelse", "Ökad engagemang"],
    example: "Leads från behovsanalysen hade 3x högre konverteringsgrad till kund.",
    image: assessmentImage,
  },
  {
    icon: Users,
    title: "Partner-verktyg",
    description: "Ge era partners verktyg för att sälja mer effektivt – från offertkonfiguratorer till utbildningsplattformar.",
    benefits: ["Aktivare partners", "Ökad partnersälj", "Starkare relationer"],
    example: "Partner-driven försäljning ökade med 120% första året.",
    image: partnerToolsImage,
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
          <div className="space-y-24">
            {useCases.map((useCase, index) => (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center"
              >
                {/* Image - alternating sides */}
                <motion.div 
                  className={`relative group ${index % 2 === 1 ? 'lg:order-2' : ''}`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative rounded-2xl overflow-hidden gradient-border">
                    {/* Animated glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                    
                    {/* Image with zoom effect on hover */}
                    <motion.img
                      src={useCase.image}
                      alt={useCase.title}
                      className="w-full aspect-[4/3] object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6 }}
                    />
                    
                    {/* Floating badge */}
                    <motion.div 
                      className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-card/90 backdrop-blur-sm border border-primary/30 flex items-center gap-2 z-20"
                      initial={{ opacity: 0, y: -10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <useCase.icon className="w-4 h-4 text-primary" />
                      <span className="text-xs font-medium text-foreground">Interaktiv demo</span>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Content */}
                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                      <useCase.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground">
                      {useCase.title}
                    </h2>
                  </div>
                  
                  <p className="text-lg text-muted-foreground mb-6">
                    {useCase.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-3 mb-8">
                    {useCase.benefits.map((benefit) => (
                      <span
                        key={benefit}
                        className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium"
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>

                  {/* Result box */}
                  <div className="gradient-border rounded-xl overflow-hidden">
                    <div className="bg-card p-5">
                      <p className="text-sm text-muted-foreground mb-2">📊 Resultat i verkligheten:</p>
                      <p className="text-foreground font-medium">{useCase.example}</p>
                    </div>
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
