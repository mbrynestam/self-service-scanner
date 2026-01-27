import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Zap, Target, Rocket, Clock, Lightbulb, TrendingUp } from "lucide-react";

const sprints = [
  {
    name: "Self-Service Opportunity Sprint",
    price: "25 000 kr",
    description: "För företag som vill förstå var self-service skapar mest affärsvärde.",
    features: [
      "Analys av köpresa, målgrupper och säljprocess",
      "Identifiering av friktion och frågor köpare har",
      "Konkreta förslag på self-service-lösningar",
      "Prioriterad rekommendation: vad ni bör testa först",
    ],
    result: "Ni vet vad ni ska bygga och varför det påverkar affären.",
    icon: Target,
    popular: false,
  },
  {
    name: "Self-Service Prototype Sprint",
    price: "50 000 kr",
    description: "För företag som vill se hur en lösning faktiskt kan fungera.",
    features: [
      "Allt från Opportunity Sprint",
      "Flödesdesign för ett prioriterat verktyg",
      "Klickbar prototyp",
      "Gemensam genomgång och förbättring",
      "Rekommendation för nästa steg",
    ],
    result: "En konkret upplevelse ni kan testa internt och ta beslut utifrån.",
    icon: Zap,
    popular: true,
  },
  {
    name: "Self-Service Innovation Sprint",
    price: "Från 75 000 kr",
    description: "För mer avancerade eller affärskritiska initiativ.",
    features: [
      "Djupare analys av köpresan",
      "Mer avancerade eller flera sammanhängande lösningar",
      "Fler iterationer",
      "Lösningsdesign och roadmap för implementation",
    ],
    result: "En tydlig riktning för hur ni förändrar köpupplevelsen i större skala.",
    icon: Rocket,
    popular: false,
  },
];

const comparison = {
  traditional: [
    "Långa förstudier",
    "Stora investeringar direkt",
    "Mycket planering innan något kan testas",
  ],
  buyr: [
    "Snabba sprintar",
    "Prototyper på dagar",
    "Testa först, investera sen",
  ],
};

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
              Se hur self-service kan förbättra er köpresa{" "}
              <span className="gradient-text">— innan ni bygger något</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-6 max-w-3xl mx-auto">
              Buyr hjälper B2B-företag identifiera, designa och testa self-service-lösningar 
              genom snabba, AI-drivna sprintar.
            </p>
            <p className="text-lg text-foreground/80 mb-10">
              Tydliga fasta priser. Tydlig omfattning. Inga långa projekt från start.
            </p>
            <Button variant="hero" size="xl" asChild>
              <Link to="/kontakt">
                Boka samtal
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Intro: What we actually sell */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Lightbulb className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Vårt erbjudande</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
              Vi börjar med riktning och prototyper – inte stora implementationer
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Dessa sprintar ger er tydlig vägledning och konkreta prototyper som visar hur 
              self-service kan fungera i er köpresa. Målet är att ni ska kunna ta rätt beslut 
              innan ni investerar i att bygga lösningar fullt ut.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sprint Packages */}
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Välj den sprint som passar er
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Från insikt till prototyp – välj det djup som matchar era behov.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {sprints.map((sprint, index) => {
              const IconComponent = sprint.icon;
              return (
                <motion.div
                  key={sprint.name}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative rounded-2xl p-8 flex flex-col ${
                    sprint.popular
                      ? "gradient-border card-gradient scale-105"
                      : "bg-card border border-border"
                  }`}
                >
                  {sprint.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-sm font-semibold rounded-full">
                      Mest populär
                    </div>
                  )}
                  
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      sprint.popular ? "bg-primary/20" : "bg-secondary"
                    }`}>
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                  </div>

                  <h3 className="font-display text-xl font-bold text-foreground mb-2">
                    {sprint.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">{sprint.description}</p>
                  
                  <div className="mb-6">
                    <p className="font-display text-3xl font-bold text-foreground">
                      {sprint.price}
                    </p>
                  </div>

                  <ul className="space-y-3 mb-6 flex-grow">
                    {sprint.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-foreground text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="bg-secondary/50 rounded-xl p-4 mb-6">
                    <p className="text-sm font-medium text-foreground">
                      <span className="text-primary">Resultat:</span> {sprint.result}
                    </p>
                  </div>

                  <Button
                    variant={sprint.popular ? "hero" : "outline"}
                    className="w-full mt-auto"
                    asChild
                  >
                    <Link to="/kontakt">Boka samtal</Link>
                  </Button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* What happens after */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <div className="text-center mb-8">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Vad händer efter sprinten?
              </h2>
            </div>
            <div className="bg-card border border-border rounded-2xl p-8">
              <p className="text-lg text-muted-foreground leading-relaxed text-center">
                Sprintarna ger er riktning och prototyper. Hur lösningen sedan byggs och 
                implementeras beror på komplexitet, teknik och era interna resurser. 
                Vi hjälper er ta rätt nästa steg — oavsett om ni bygger själva eller med partner.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Ett smartare sätt att börja
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-card border border-border rounded-2xl p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                  <Clock className="w-5 h-5 text-muted-foreground" />
                </div>
                <h3 className="font-display text-xl font-bold text-muted-foreground">
                  Traditionellt
                </h3>
              </div>
              <ul className="space-y-4">
                {comparison.traditional.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-muted-foreground">
                    <div className="w-2 h-2 rounded-full bg-muted-foreground/50" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-card border border-primary/30 rounded-2xl p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground">
                  Med Buyr
                </h3>
              </div>
              <ul className="space-y-4">
                {comparison.buyr.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-foreground">
                    <Check className="w-5 h-5 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-card/50">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
              Redo att se hur self-service kan fungera för er?
            </h2>
            <Button variant="hero" size="xl" asChild>
              <Link to="/kontakt">
                Boka första samtal
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
            <p className="text-muted-foreground mt-6">
              Fast pris. Tydlig omfattning. Inga långa projekt från start.
            </p>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
