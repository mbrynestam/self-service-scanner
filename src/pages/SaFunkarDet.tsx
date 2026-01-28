import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Users, Lightbulb, Zap, TestTube, Rocket, CheckCircle2, Target, Clock } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Users,
    title: "Förstå era köpare på riktigt",
    time: "1–2 dagar",
    color: "primary",
    description: "Vi arbetar tillsammans med ert säljteam för att förstå hur era köpare faktiskt tänker och agerar.",
    points: [
      "Idealkunder och köpsituationer",
      "Vanliga frågor och invändningar",
      "Friktion, oro och osäkerhet i köpprocessen",
      "Vad som ofta stoppar affärer från att gå vidare",
    ],
    result: "En tydlig bild av vad köpare behöver kunna göra själva för att ta nästa steg.",
  },
  {
    number: "02",
    icon: Lightbulb,
    title: "Välj rätt self-service att testa",
    time: "Workshop",
    color: "primary",
    description: "Med insikterna från steg 1 håller vi en fokuserad workshop där vi identifierar vilka self-service-verktyg som skulle göra störst skillnad.",
    examples: [
      "Priskalkylator",
      "Självtest / assessment",
      "Konfigurator",
      "Väljarverktyg",
    ],
    result: "Vi bestämmer vilken lösning som är mest värd att testa först.",
  },
  {
    number: "03",
    icon: Zap,
    title: "Få en klickbar prototyp med AI",
    time: "Några dagar",
    color: "primary",
    description: "Nu använder vi AI och moderna verktyg för att snabbt skapa en interaktiv prototyp. Detta är inte en powerpoint eller wireframe — utan en länk ni kan klicka runt i.",
    capabilities: [
      "Testa själva internt",
      "Visa för säljteamet",
      "Låta riktiga kunder prova",
    ],
    result: "Ni upplever hur lösningen faktiskt skulle fungera i verkligheten.",
  },
  {
    number: "04",
    icon: TestTube,
    title: "Testa och ta beslut med trygghet",
    time: "Dagar till någon vecka",
    color: "primary",
    description: "Innan något byggs \"på riktigt\" använder vi prototypen för att samla insikter.",
    questions: [
      "Vad förstår användare direkt?",
      "Var uppstår frågor?",
      "Vad skapar mest värde?",
    ],
    result: "Ni vet om lösningen är rätt — innan ni investerar i implementation.",
  },
];

const nextStepOptions = [
  {
    number: "1",
    title: "Vi gör en skarp version med hjälp av AI och moderna verktyg",
    description: "Snabb och kostnadseffektiv väg till ett fungerande verktyg.",
  },
  {
    number: "2",
    title: "Vi bygger en mer skräddarsydd lösning",
    description: "För mer avancerade behov och integrationer.",
  },
  {
    number: "3",
    title: "Ni tar vidare utvecklingen själva eller med annan partner",
    description: "Ni har prototypen, flödeslogiken och riktningen.",
  },
];

export default function SaFunkarDet() {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Så tar vi fram self-service som{" "}
              <span className="gradient-text">faktiskt fungerar</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Vi kombinerar ert säljteams insikter med AI-driven prototyping för att snabbt testa nya sätt för köpare att komma vidare på egen hand.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Process Overview */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="font-display text-2xl md:text-3xl font-bold text-center mb-10">
              Processen i korthet
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 rounded-2xl bg-secondary/50">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <p className="font-display font-bold text-foreground">Ni bidrar med kunskap om affären.</p>
              </div>
              <div className="text-center p-6 rounded-2xl bg-secondary/50">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <p className="font-display font-bold text-foreground">Vi driver processen och tempot.</p>
              </div>
              <div className="text-center p-6 rounded-2xl bg-secondary/50">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <p className="font-display font-bold text-foreground">AI gör det möjligt att testa direkt.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Steps Timeline */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Vertical connecting line */}
          <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-primary/20 hidden md:block lg:-translate-x-px" />

          <div className="space-y-12 lg:space-y-16">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                <div className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                  {/* Step indicator - centered on desktop */}
                  <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 z-10">
                    <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
                      <step.icon className="w-7 h-7 text-primary-foreground" />
                    </div>
                  </div>

                  {/* Content - alternating sides */}
                  <div className={`${index % 2 === 0 ? 'lg:pr-16 lg:text-right' : 'lg:col-start-2 lg:pl-16'}`}>
                    {/* Mobile icon */}
                    <div className="flex lg:hidden items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                        <step.icon className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <span className="font-mono text-primary text-lg">{step.number}</span>
                    </div>

                    <div className={`flex flex-wrap items-center gap-3 mb-4 ${index % 2 === 0 ? 'lg:justify-end' : ''}`}>
                      <span className="hidden lg:inline font-mono text-primary text-lg">{step.number}</span>
                      <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground">
                        {step.title}
                      </h2>
                    </div>

                    <div className={`inline-block px-3 py-1 rounded-full bg-muted text-sm text-muted-foreground mb-4`}>
                      ⏱ {step.time}
                    </div>

                    <p className="text-lg text-muted-foreground mb-6">
                      {step.description}
                    </p>

                    {/* Points list */}
                    {step.points && (
                      <div className={`mb-6 ${index % 2 === 0 ? 'lg:flex lg:justify-end' : ''}`}>
                        <div>
                          <p className={`text-sm font-medium text-foreground mb-3 ${index % 2 === 0 ? 'lg:text-right' : ''}`}>Vi kartlägger:</p>
                          <ul className={`space-y-2 ${index % 2 === 0 ? 'lg:text-right' : ''}`}>
                            {step.points.map((point) => (
                              <li key={point} className={`flex items-center gap-2 ${index % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}>
                                <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                                <span className="text-muted-foreground">{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}

                    {/* Examples list */}
                    {step.examples && (
                      <div className={`mb-6 ${index % 2 === 0 ? 'lg:flex lg:justify-end' : ''}`}>
                        <div>
                          <p className={`text-sm font-medium text-foreground mb-3 ${index % 2 === 0 ? 'lg:text-right' : ''}`}>Det kan till exempel handla om:</p>
                          <ul className={`space-y-2 ${index % 2 === 0 ? 'lg:text-right' : ''}`}>
                            {step.examples.map((example) => (
                              <li key={example} className={`flex items-center gap-2 ${index % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}>
                                <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                                <span className="text-muted-foreground">{example}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}

                    {/* Capabilities list */}
                    {step.capabilities && (
                      <div className={`mb-6 ${index % 2 === 0 ? 'lg:flex lg:justify-end' : ''}`}>
                        <div>
                          <p className={`text-sm font-medium text-foreground mb-3 ${index % 2 === 0 ? 'lg:text-right' : ''}`}>Ni kan:</p>
                          <ul className={`space-y-2 ${index % 2 === 0 ? 'lg:text-right' : ''}`}>
                            {step.capabilities.map((capability) => (
                              <li key={capability} className={`flex items-center gap-2 ${index % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}>
                                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                                <span className="text-muted-foreground">{capability}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}

                    {/* Questions list */}
                    {step.questions && (
                      <div className={`mb-6 ${index % 2 === 0 ? 'lg:flex lg:justify-end' : ''}`}>
                        <ul className={`space-y-2 ${index % 2 === 0 ? 'lg:text-right' : ''}`}>
                          {step.questions.map((question) => (
                            <li key={question} className={`flex items-center gap-2 ${index % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}>
                              <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                              <span className="text-muted-foreground">{question}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Result */}
                    <div className={`p-4 rounded-xl bg-primary/10 border border-primary/20 ${index % 2 === 0 ? 'lg:ml-auto lg:max-w-md' : 'lg:max-w-md'}`}>
                      <p className="text-sm">
                        <span className="text-primary font-medium">Resultat: </span>
                        <span className="text-foreground">{step.result}</span>
                      </p>
                    </div>
                  </div>

                  {/* Empty column for layout on alternating rows */}
                  {index % 2 === 0 && <div className="hidden lg:block" />}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Step 5 - Next Steps */}
      <section className="py-24 bg-card relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
                <Rocket className="w-8 h-8 text-primary-foreground" />
              </div>
              <div>
                <span className="font-mono text-primary text-lg">05</span>
                <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground">
                  Välj hur ni vill gå vidare
                </h2>
              </div>
            </div>

            <p className="text-lg text-muted-foreground mb-10">
              När värdet är bevisat väljer ni nästa steg:
            </p>

            <div className="space-y-6">
              {nextStepOptions.map((option, index) => (
                <motion.div
                  key={option.number}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex gap-4 p-6 rounded-2xl bg-secondary/50 hover:bg-secondary/80 transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-primary-foreground">{option.number}</span>
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-foreground mb-1">
                      {option.title}
                    </h3>
                    <p className="text-muted-foreground">{option.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Key Message */}
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="gradient-border rounded-3xl p-8 lg:p-12 card-gradient">
              <div className="grid md:grid-cols-3 gap-8 md:gap-4">
                <div>
                  <p className="font-display text-xl lg:text-2xl font-bold text-foreground mb-2">Ni driver riktningen.</p>
                  <div className="w-12 h-1 bg-primary mx-auto rounded-full" />
                </div>
                <div>
                  <p className="font-display text-xl lg:text-2xl font-bold text-foreground mb-2">Vi driver processen.</p>
                  <div className="w-12 h-1 bg-primary mx-auto rounded-full" />
                </div>
                <div>
                  <p className="font-display text-xl lg:text-2xl font-bold gradient-text text-xl lg:text-2xl font-bold mb-2">AI driver hastigheten.</p>
                  <div className="w-12 h-1 bg-primary mx-auto rounded-full" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline Expectation */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <Clock className="w-6 h-6 text-primary" />
              <h2 className="font-display text-2xl md:text-3xl font-bold">
                Från första samtal till testbar lösning – på veckor
              </h2>
            </div>
            <p className="text-lg text-muted-foreground">
              Många verktyg kan vara redo att publiceras inom några veckor. Effekten märks ofta direkt när köpare får möjlighet att komma vidare på egen hand.
            </p>
          </motion.div>
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
              Redo att komma igång?
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
