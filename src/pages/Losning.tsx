import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Layers, Zap, BarChart3, Users } from "lucide-react";

const features = [
  {
    icon: Layers,
    title: "Modulärt och skalbart",
    description: "Börja med ett verktyg och bygg ut efter behov. Alla våra lösningar är designade för att växa med er.",
  },
  {
    icon: Zap,
    title: "Snabb time-to-value",
    description: "Med AI-prototyping kan ni se resultat på veckor istället för månader.",
  },
  {
    icon: BarChart3,
    title: "Data-drivet",
    description: "Inbyggd analytics som visar exakt hur besökare interagerar med era verktyg.",
  },
  {
    icon: Users,
    title: "Anpassat för B2B",
    description: "Designat för komplexa köpresor med flera beslutsfattare och långa säljcykler.",
  },
];

const benefits = [
  "Kvalificera leads automatiskt med interaktiva verktyg",
  "Förkorta säljcykeln genom att ge köpare rätt information direkt",
  "Frigör säljarnas tid för högvärdiga aktiviteter",
  "Samla värdefull data om köparnas behov och preferenser",
  "Skapa en differentierande upplevelse som sticker ut",
  "Öka konverteringen med personaliserade rekommendationer",
];

export default function Losning() {
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
              Self-service tools som{" "}
              <span className="gradient-text">konverterar</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Vi bygger interaktiva verktyg som låter B2B-köpare utforska, beräkna
              och ta beslut – på egna villkor och i sin egen takt.
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

      {/* Features Grid */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Byggt för moderna B2B-köpare
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Varje lösning vi bygger är designad med köparens perspektiv i fokus.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="gradient-border rounded-2xl p-6"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
                Fördelar som syns på{" "}
                <span className="gradient-text">sista raden</span>
              </h2>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.li
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-foreground">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="gradient-border rounded-2xl p-8 card-gradient"
            >
              <div className="text-center mb-8">
                <p className="text-muted-foreground mb-2">Genomsnittlig ROI</p>
                <p className="font-display text-6xl font-bold gradient-text">324%</p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <p className="font-display text-3xl font-bold text-foreground mb-1">40%</p>
                  <p className="text-sm text-muted-foreground">Kortare säljcykel</p>
                </div>
                <div className="text-center">
                  <p className="font-display text-3xl font-bold text-foreground mb-1">3x</p>
                  <p className="text-sm text-muted-foreground">Fler kvalificerade leads</p>
                </div>
              </div>
            </motion.div>
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
              Redo att komma igång?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Boka ett kostnadsfritt strategisamtal och upptäck hur self-service tools
              kan transformera er säljprocess.
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
