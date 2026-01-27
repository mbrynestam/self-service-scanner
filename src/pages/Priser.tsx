import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Zap, DollarSign, Shield } from "lucide-react";
import BudgetCalculator from "@/components/pricing/BudgetCalculator";
import TraditionalComparison from "@/components/pricing/TraditionalComparison";

const benefits = [
  {
    icon: Zap,
    title: "Snabbare",
    description: "Prototyper på dagar istället för månader",
  },
  {
    icon: DollarSign,
    title: "Mer kostnadseffektivt",
    description: "Testa idéer innan stora investeringar",
  },
  {
    icon: Shield,
    title: "Mindre riskfyllt",
    description: "Validera innan ni bygger fullt ut",
  },
];

export default function Priser() {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-20 relative overflow-hidden">
        <div className="hero-glow top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30" />
        
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Vad är ett rimligt första steg{" "}
              <span className="gradient-text">— och vad kan helheten kosta?</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
              Med Buyr börjar ni alltid med en snabb sprint för att validera idéer. 
              Sen väljer ni själva hur långt ni vill ta lösningen.
            </p>

            {/* Benefits row */}
            <div className="flex flex-wrap justify-center gap-6 mb-10">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="flex items-center gap-3 bg-card/50 border border-border rounded-full px-5 py-3"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-foreground text-sm">{benefit.title}</p>
                      <p className="text-xs text-muted-foreground">{benefit.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Budget Calculator */}
      <section className="py-20 lg:py-24 bg-card/30">
        <div className="container mx-auto px-4 lg:px-8">
          <BudgetCalculator />
        </div>
      </section>

      {/* Traditional Comparison */}
      <section className="py-20 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <TraditionalComparison />
        </div>
      </section>

      {/* Key Message */}
      <section className="py-16 bg-primary/5 border-y border-primary/10">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <p className="font-display text-2xl md:text-3xl font-bold text-foreground leading-relaxed">
              "25 000–50 000 kr för att få klarhet och en prototyp är ett{" "}
              <span className="gradient-text">självklart första steg.</span>"
            </p>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
              Redo att börja med en sprint?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Boka ett samtal så berättar vi mer om hur en sprint kan se ut för just er.
            </p>
            <Button variant="hero" size="xl" asChild>
              <Link to="/kontakt">
                Boka samtal
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
            <p className="text-muted-foreground mt-6 text-sm">
              Fast pris. Tydlig omfattning. Testa först, investera sen.
            </p>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
