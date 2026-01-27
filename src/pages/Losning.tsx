import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Layers, Zap, BarChart3, Users } from "lucide-react";
import roiGraph from "@/assets/roi-graph.jpg";

const features = [
  {
    icon: Layers,
    title: "Börja litet. Skala smart.",
    description: "Ni börjar med ett konkret verktyg och en testbar prototyp. När ni ser vad som fungerar kan ni bygga vidare i er egen takt.",
  },
  {
    icon: Zap,
    title: "Från idé till prototyp på dagar",
    description: "Med AI-drivna sprintar slipper ni långa förstudier. Ni får något klickbart att testa nästan direkt — så beslut kan tas snabbare.",
  },
  {
    icon: BarChart3,
    title: "Designat för att lära och förbättra",
    description: "Varje lösning utformas för att ge insikter om hur köpare tänker, klickar och väljer — så ni kan optimera upplevelsen över tid.",
  },
  {
    icon: Users,
    title: "Skapat för komplex B2B-försäljning",
    description: "Våra lösningar är anpassade för långa köpresor, flera beslutsfattare och behov av tydlig vägledning innan dialog med sälj.",
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
              Byggt för hur B2B-köpare faktiskt vill köpa
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Vi designar self-service-upplevelser som låter köpare utforska, förstå och ta nästa steg på egen hand — innan de vill prata med sälj.
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
                className="rounded-2xl p-6 bg-secondary/50 hover:bg-secondary/80 transition-all duration-300 hover:scale-[1.03] cursor-default"
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
              className="relative rounded-2xl overflow-hidden"
            >
              {/* Graph background image */}
              <img 
                src={roiGraph} 
                alt="ROI growth graph" 
                className="w-full h-auto rounded-2xl"
              />
              
              {/* Overlay with stats */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent flex flex-col justify-end p-8">
                <div className="text-center mb-6">
                  <p className="text-muted-foreground text-sm mb-1">Genomsnittlig ROI</p>
                  <p className="font-display text-5xl md:text-6xl font-bold gradient-text">324%</p>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center bg-card/60 backdrop-blur-sm rounded-xl p-4">
                    <p className="font-display text-2xl md:text-3xl font-bold text-foreground mb-1">40%</p>
                    <p className="text-xs md:text-sm text-muted-foreground">Kortare säljcykel</p>
                  </div>
                  <div className="text-center bg-card/60 backdrop-blur-sm rounded-xl p-4">
                    <p className="font-display text-2xl md:text-3xl font-bold text-foreground mb-1">10x</p>
                    <p className="text-xs md:text-sm text-muted-foreground">Fler kvalificerade leads</p>
                  </div>
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
