import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Search, Zap, TestTube, Rocket, CheckCircle2, Globe } from "lucide-react";
import ScannerSection from "@/components/sections/ScannerSection";

const aiSprintSteps = [
  {
    number: "01",
    icon: Search,
    title: "Identifiera köparens genvägar",
    time: "1–2 dagar",
    description: "Vi analyserar er köpresa med hjälp av AI och identifierar var köpare vill kunna göra mer själva – innan de pratar med sälj.",
    points: [
      "AI analyserar frågor, säljmaterial och friktion",
      "Kort prioriteringsworkshop",
      "Ni väljer 1–3 idéer att testa direkt",
    ],
    feeling: "Insikt i expressfart",
  },
  {
    number: "02",
    icon: Zap,
    title: "Bygg en klickbar prototyp med AI",
    time: "Timmar till några dagar",
    description: "Vi bygger en interaktiv prototyp av ert self-service-verktyg. Inte en skiss – något ni kan klicka på och visa internt.",
    points: [
      "Priskalkylator, assessment, configurator eller selector",
      "Byggs snabbt med AI + no-code",
      "Klar för test nästan direkt",
    ],
    feeling: "Wow, det finns redan",
  },
  {
    number: "03",
    icon: TestTube,
    title: "Testa innan ni investerar",
    time: "Dagar",
    description: "Innan ni startar ett större projekt testar vi prototypen med säljteam och riktiga användare.",
    points: [
      "Samla feedback",
      "Se hur användare beter sig",
      "Justera snabbt med hjälp av AI",
    ],
    feeling: "Beslut baserade på beteende, inte åsikter",
  },
];

const scalingStep = {
  number: "04",
  icon: Rocket,
  title: "Skala det som fungerar",
  time: "Veckor, inte månader",
  description: "När ni vet att lösningen fungerar gör vi den produktionsklar – eller så bygger ni själva med vårt stöd.",
  points: [
    "Integration i webb och CRM",
    "Anpassning för verkliga säljflöden",
    "Mätning och optimering",
  ],
  feeling: "Trygg investering – värdet är redan bevisat",
};

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
              Från problem till bevis{" "}
              <span className="gradient-text">på dagar</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              En linjär men snabb rörelse från Problem → Prototyp → Test → Skala.
              AI driver hastigheten, ni driver riktningen.
            </p>
          </motion.div>
        </div>
      </section>

      {/* AI Sprint Phase */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Phase Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-12"
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="font-display font-bold text-primary">AI-Sprint</span>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-primary/50 to-transparent" />
            <span className="text-sm text-muted-foreground">Steg 1–3</span>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical connecting line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-primary/20 hidden lg:block" />

            <div className="space-y-8 lg:space-y-12">
              {aiSprintSteps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="grid lg:grid-cols-[80px_1fr] gap-6 lg:gap-12">
                    {/* Step number circle */}
                    <div className="hidden lg:flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center relative z-10">
                        <step.icon className="w-7 h-7 text-primary-foreground" />
                      </div>
                    </div>

                    {/* Content card */}
                    <div className="gradient-border rounded-2xl overflow-hidden">
                      <div className="card-gradient p-6 lg:p-8">
                        {/* Mobile icon */}
                        <div className="flex lg:hidden items-center gap-3 mb-4">
                          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                            <step.icon className="w-6 h-6 text-primary-foreground" />
                          </div>
                          <span className="font-mono text-primary text-lg">{step.number}</span>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 mb-4">
                          <span className="hidden lg:inline font-mono text-primary text-lg">{step.number}</span>
                          <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground">
                            {step.title}
                          </h2>
                          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/30">
                            <Sparkles className="w-3.5 h-3.5 text-primary" />
                            <span className="text-xs font-medium text-primary">AI-drivet</span>
                          </div>
                        </div>

                        <div className="inline-block px-3 py-1 rounded-full bg-muted text-sm text-muted-foreground mb-4">
                          ⏱ {step.time}
                        </div>

                        <p className="text-lg text-muted-foreground mb-6">
                          {step.description}
                        </p>

                        <ul className="space-y-3 mb-6">
                          {step.points.map((point) => (
                            <li key={point} className="flex items-start gap-3">
                              <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                              <span className="text-foreground">{point}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="pt-4 border-t border-border">
                          <p className="text-sm text-muted-foreground">
                            <span className="text-primary font-medium">Känsla:</span> {step.feeling}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <section className="py-8">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-4"
          >
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-border" />
            <div className="px-6 py-3 rounded-full border border-border bg-card">
              <span className="text-muted-foreground">Värdet är bevisat → Nu skalar vi</span>
            </div>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-border" />
          </motion.div>
        </div>
      </section>

      {/* Scaling Phase */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Phase Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-12"
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/30">
              <Rocket className="w-5 h-5 text-orange-400" />
              <span className="font-display font-bold text-orange-400">Skalningsfas</span>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-orange-500/50 to-transparent" />
            <span className="text-sm text-muted-foreground">Steg 4</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="grid lg:grid-cols-[80px_1fr] gap-6 lg:gap-12">
              {/* Step number circle */}
              <div className="hidden lg:flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                  <scalingStep.icon className="w-7 h-7 text-white" />
                </div>
              </div>

              {/* Content card */}
              <div className="rounded-2xl overflow-hidden border-2 border-orange-500/30 bg-gradient-to-br from-orange-500/5 to-transparent">
                <div className="p-6 lg:p-8">
                  {/* Mobile icon */}
                  <div className="flex lg:hidden items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                      <scalingStep.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="font-mono text-orange-400 text-lg">{scalingStep.number}</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="hidden lg:inline font-mono text-orange-400 text-lg">{scalingStep.number}</span>
                    <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground">
                      {scalingStep.title}
                    </h2>
                  </div>

                  <div className="inline-block px-3 py-1 rounded-full bg-orange-500/10 text-sm text-orange-400 mb-4">
                    ⏱ {scalingStep.time}
                  </div>

                  <p className="text-lg text-muted-foreground mb-6">
                    {scalingStep.description}
                  </p>

                  <ul className="space-y-3 mb-6">
                    {scalingStep.points.map((point) => (
                      <li key={point} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                        <span className="text-foreground">{point}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-4 border-t border-orange-500/20">
                    <p className="text-sm text-muted-foreground">
                      <span className="text-orange-400 font-medium">Känsla:</span> {scalingStep.feeling}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Scanner CTA Section */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-3">
              Vill ni se detta på er egen webbplats?
            </h2>
            <p className="text-muted-foreground">
              Låt vår AI analysera era self-service-möjligheter på 60 sekunder.
            </p>
          </motion.div>
        </div>
        <ScannerSection variant="compact" />
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
              Redo att starta er AI-sprint?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              På några dagar kan ni ha en klickbar prototyp att testa. 
              Boka ett samtal så berättar vi hur.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="xl" asChild>
                <Link to="/kontakt">
                  Boka strategisamtal
                  <ArrowRight className="ml-2" />
                </Link>
              </Button>
              <Button variant="heroOutline" size="xl" asChild>
                <Link to="/priser">
                  Se priser
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
