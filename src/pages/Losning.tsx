import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Calculator, 
  Brain, 
  Boxes, 
  Target, 
  CalendarCheck,
  Tag,
  TrendingUp,
  Clock,
  Zap,
  Phone,
  ArrowRightCircle,
  HandshakeIcon,
  BarChart3
} from "lucide-react";

const warningPoints = [
  "Fler anonyma besökare som aldrig konverterar",
  "Sälj lägger tid på okvalificerade möten",
  "Köpare jämför er på fel grunder",
  "Längre säljcykler och mer prispress",
];

const useCases = [
  {
    number: "1",
    icon: Calculator,
    title: "Priskalkylator",
    color: "from-primary to-emerald-400",
    why: "Alla köpare vill förstå kostnadsbilden för att kunna budgetera, planera och avgöra om lösningen är relevant.",
    risk: "När prisbilden är otydlig upplever köpare att de inte får svar — och går vidare till en konkurrent.",
    results: [
      { icon: Tag, text: "Kortare säljcykel" },
      { icon: Target, text: "Fler kvalificerade leads" },
      { icon: TrendingUp, text: "Högre affärsvärde" },
    ],
    examples: ["Enkel projektkalkylator", "Paket- eller tjänsteestimator", "ROI-baserad priskalkylator"],
    cta: "Se hur en priskalkylator kan fungera för er",
  },
  {
    number: "2",
    icon: Brain,
    title: "Self-Assessment (självtest)",
    color: "from-amber-400 to-orange-500",
    why: "Många köpare är osäkra på sitt faktiska behov och vill förstå sin situation innan de kontaktar en leverantör.",
    risk: "Köpare känner sig osäkra och skjuter upp beslut — eller väljer någon som hjälper dem förstå problemet bättre.",
    results: [
      { icon: Target, text: "Mer utbildade leads" },
      { icon: Phone, text: "Bättre första säljsamtal" },
      { icon: Zap, text: "Snabbare beslutsprocess" },
    ],
    examples: ["Mognadsbedömning", "Riskanalys", "Behovsanalys"],
    cta: "Se hur ett självtest kan fungera för er",
  },
  {
    number: "3",
    icon: Boxes,
    title: "Konfigurator",
    color: "from-blue-400 to-indigo-500",
    why: "Köpare vill förstå hur en lösning kan anpassas till deras situation.",
    risk: "Er lösning upplevs som för generell eller svår att relatera till.",
    results: [
      { icon: Brain, text: "Högre engagemang" },
      { icon: TrendingUp, text: "Större affärer" },
      { icon: HandshakeIcon, text: "Bättre förberedda köpare" },
    ],
    examples: ["Produktkonfigurator", "Lösningsbyggare", "Paketväljare"],
    cta: "Se hur en konfigurator kan fungera för er",
  },
  {
    number: "4",
    icon: Target,
    title: "Väljarverktyg (Self-Selection)",
    color: "from-purple-400 to-pink-500",
    why: "När det finns flera alternativ behöver köpare hjälp att hitta rätt.",
    risk: "Köpare blir överväldigade och lämnar utan att välja.",
    results: [
      { icon: ArrowRightCircle, text: "Fler som går vidare" },
      { icon: Target, text: "Rätt leads till rätt säljare" },
      { icon: Clock, text: "Mindre intern säljtidsåtgång" },
    ],
    examples: ["Produktvägledare", "Tjänsteguide", "Lösningsrådgivare"],
    cta: "Se hur ett väljarverktyg kan fungera för er",
  },
  {
    number: "5",
    icon: CalendarCheck,
    title: "Smart bokning (Self-Scheduling)",
    color: "from-cyan-400 to-teal-500",
    why: "När köpare är redo vill de kunna agera direkt.",
    risk: "Onödigt tapp mellan intresse och kontakt.",
    results: [
      { icon: Zap, text: "Fler bokade möten" },
      { icon: Target, text: "Mer kvalificerade samtal" },
      { icon: BarChart3, text: "Högre konvertering" },
    ],
    examples: ["Mötesbokning", "Demo-förfrågan", "Konsultationsbokning"],
    cta: "Se hur smart bokning kan fungera för er",
  },
];

// Structured data for SEO/AIO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Self-service tools för B2B",
  "provider": {
    "@type": "Organization",
    "name": "Buyr",
    "url": "https://buyr-tools.lovable.app"
  },
  "description": "Vi hjälper B2B-företag att bygga interaktiva self-service verktyg som priskalkylatorer, självtester, konfiguratorer och bokningslösningar. Moderna köpare vill komma längre själva innan de pratar med sälj.",
  "serviceType": "B2B Self-Service Solutions",
  "areaServed": {
    "@type": "Country",
    "name": "Sweden"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Self-service verktyg",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Priskalkylator",
          "description": "Interaktiv priskalkylator som låter köpare förstå kostnadsbilden direkt"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Self-Assessment",
          "description": "Självtest och behovsanalyser som hjälper köpare förstå sin situation"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Konfigurator",
          "description": "Produktkonfiguratorer som visar hur lösningar kan anpassas"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Väljarverktyg",
          "description": "Guider som hjälper köpare välja rätt bland flera alternativ"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Smart bokning",
          "description": "Självbetjäning för mötesbokning och demo-förfrågningar"
        }
      }
    ]
  }
};

export default function Losning() {
  return (
    <Layout>
      <SEO 
        title="Self-service för B2B | Priskalkylatorer, Självtester & Konfiguratorer | Buyr"
        description="Moderna B2B-köpare vill komma längre själva. Vi bygger priskalkylatorer, självtester, konfiguratorer och bokningslösningar som kvalificerar leads och förkortar säljcykeln."
        canonical="/losning"
        structuredData={structuredData}
      />
      
      {/* Hero - Why Self-Service */}
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.header
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <p className="text-primary font-medium mb-4 uppercase tracking-wider text-sm">
              Varför self-service är avgörande
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Moderna B2B-köpare vill{" "}
              <span className="gradient-text">komma längre själva</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Dagens köpare vill förstå pris, alternativ och lösningar innan de pratar med sälj. 
              När de inte får den möjligheten på er webbplats söker de sig vidare — ofta till en konkurrent som gör det enklare.
            </p>
            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto border border-border/50">
              <p className="text-lg text-foreground">
                <span className="text-muted-foreground">Self-service handlar inte om att ersätta sälj.</span>
                <br />
                <span className="font-medium">Det handlar om att hjälpa köpare bli redo för dialog.</span>
              </p>
            </div>
          </motion.header>

          {/* Warning Points */}
          <motion.aside
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-3xl mx-auto"
            aria-label="Risker utan self-service"
          >
            <h2 className="text-lg font-medium text-center mb-6 text-muted-foreground">
              Vad händer om ni inte erbjuder self-service?
            </h2>
            <ul className="grid sm:grid-cols-2 gap-4 mb-8 list-none">
              {warningPoints.map((point, index) => (
                <motion.li
                  key={point}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-3 bg-secondary/50 rounded-xl p-4"
                >
                  <span className="text-muted-foreground shrink-0 mt-0.5" aria-hidden="true">✗</span>
                  <span className="text-foreground">{point}</span>
                </motion.li>
              ))}
            </ul>
            <p className="text-center text-muted-foreground italic">
              Self-service minskar friktion och bygger förtroende redan innan första samtalet.
            </p>
          </motion.aside>
        </div>
      </section>

      {/* Section 2 - Five Types */}
      <section className="py-24 bg-card" aria-labelledby="five-types-heading">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.header
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 id="five-types-heading" className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Fem typer av self-service{" "}
              <span className="gradient-text">vi hjälper er att ta fram</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Det finns flera sätt att hjälpa köpare framåt på egen hand. Här är de fem typer 
              av verktyg vi oftast hjälper B2B-företag att ta fram.
            </p>
          </motion.header>

          {/* Use Case Blocks */}
          <div className="space-y-20">
            {useCases.map((useCase, index) => (
              <motion.article
                key={useCase.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="relative"
                aria-labelledby={`usecase-${useCase.number}-title`}
              >
                {/* Number badge */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 lg:left-0 lg:translate-x-0">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${useCase.color} flex items-center justify-center text-primary-foreground font-bold text-lg`} aria-hidden="true">
                    {useCase.number}
                  </div>
                </div>

                <div className="bg-background rounded-2xl p-8 lg:p-12 border border-border/50">
                  {/* Header */}
                  <header className="flex flex-col lg:flex-row lg:items-center gap-4 mb-8 pt-6 lg:pt-0">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${useCase.color} flex items-center justify-center shrink-0`} aria-hidden="true">
                      <useCase.icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h3 id={`usecase-${useCase.number}-title`} className="font-display text-2xl lg:text-3xl font-bold text-foreground">
                      {useCase.title}
                    </h3>
                  </header>

                  <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Left column - Why & Risk */}
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
                          Varför?
                        </h4>
                        <p className="text-muted-foreground">
                          {useCase.why}
                        </p>
                      </div>

                      <div className="bg-secondary/50 rounded-xl p-5 border border-border/50">
                        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                          Adresserad risk
                        </h4>
                        <p className="text-foreground">
                          {useCase.risk}
                        </p>
                      </div>

                      {/* Results */}
                      <div>
                        <h4 className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
                          Förväntat resultat
                        </h4>
                        <ul className="flex flex-wrap gap-3 list-none">
                          {useCase.results.map((result) => (
                            <li
                              key={result.text}
                              className="flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2"
                            >
                              <result.icon className="w-4 h-4 text-primary" aria-hidden="true" />
                              <span className="text-sm font-medium text-foreground">{result.text}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Right column - Examples & Interactive */}
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                          Exempel
                        </h4>
                        <ul className="flex flex-wrap gap-2 list-none">
                          {useCase.examples.map((example) => (
                            <li
                              key={example}
                              className="px-4 py-2 rounded-lg bg-secondary/50 text-foreground text-sm hover:bg-secondary transition-colors cursor-default"
                            >
                              {example}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Interactive placeholder */}
                      <div className="aspect-video rounded-xl bg-gradient-to-br from-secondary/50 to-secondary flex items-center justify-center border border-border/50 group hover:border-primary/50 transition-colors cursor-pointer">
                        <div className="text-center">
                          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                            <useCase.icon className="w-8 h-8 text-primary" aria-hidden="true" />
                          </div>
                          <p className="text-muted-foreground text-sm">Interaktiv demo kommer snart</p>
                        </div>
                      </div>

                      {/* CTA */}
                      <Button variant="outline" className="w-full group" asChild>
                        <Link to="/kontakt">
                          {useCase.cta}
                          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-24" aria-labelledby="cta-heading">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 id="cta-heading" className="font-display text-3xl md:text-4xl font-bold mb-6">
              Osäker på vilken typ som passar er?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Vi hjälper er identifiera vilken self-service som gör störst skillnad i just er köpresa.
            </p>
            <Button variant="hero" size="xl" asChild>
              <Link to="/kontakt">
                Få en rekommendation för er webbplats
                <ArrowRight className="ml-2" aria-hidden="true" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
