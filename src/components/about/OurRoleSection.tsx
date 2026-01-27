import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check, Sparkles, Users, Compass, Bot } from "lucide-react";

const benefits = [
  "Blir dialogerna mer kvalificerade",
  "Går besluten snabbare",
  "Blir det lättare att vinna affärer",
];

const contributions = [
  {
    icon: Users,
    title: "Ni bidrar med",
    description: "Djup förståelse för era kunder, affären och verkligheten i säljarbetet",
    color: "bg-secondary",
    iconColor: "text-muted-foreground",
  },
  {
    icon: Compass,
    title: "Vi bidrar med",
    description: "Struktur, metodik och erfarenhet av hur self-service fungerar i komplexa B2B-köpresor",
    color: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    icon: Bot,
    title: "AI bidrar med",
    description: "Hastighet, visualisering och möjligheten att snabbt testa idéer i praktiken",
    color: "bg-accent/10",
    iconColor: "text-accent-foreground",
  },
];

export default function OurRoleSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-card">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
            Vi bygger vidare på{" "}
            <span className="gradient-text">er kunskap om kunderna</span>
          </h2>
        </motion.div>

        {/* Intro text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-3xl mx-auto mb-16"
        >
          <div className="space-y-4 text-lg text-muted-foreground text-center">
            <p>
              <span className="text-foreground font-medium">Ingen känner era kunder så bra som ni gör.</span>{" "}
              Det är ni som hör deras frågor, funderingar och oro varje dag. Ni vet vad som 
              skapar trygghet i dialogen — och vad som ofta stoppar affärer från att gå vidare.
            </p>
            <p>
              I dagens köpresor behöver den tryggheten börja tidigare. Köpare vill förstå mer 
              på egen hand innan de är redo att prata med sälj.
            </p>
          </div>

          {/* Benefits */}
          <div className="mt-8 bg-background/50 rounded-2xl p-6 border border-border">
            <p className="text-muted-foreground mb-4 text-center">
              När de får hjälp redan på webbplatsen:
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {benefits.map((benefit, i) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-lg text-foreground font-medium text-center mt-8"
          >
            Det är där vi kommer in.
          </motion.p>
        </motion.div>

        {/* How we work together */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-5xl mx-auto"
        >
          <h3 className="font-display text-2xl font-bold text-center mb-4">
            Hur vi jobbar tillsammans
          </h3>
          <p className="text-muted-foreground text-center mb-12">
            Vi ser det som ett samarbete där varje del spelar en viktig roll.
          </p>

          {/* Venn diagram */}
          <div className="relative h-[400px] md:h-[450px] flex items-center justify-center mb-12">
            {/* Circle 1 - Customer knowledge */}
            <motion.div
              initial={{ opacity: 0, x: -50, y: -20 }}
              animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="absolute w-48 h-48 md:w-56 md:h-56 rounded-full bg-secondary/60 border border-border flex items-center justify-center"
              style={{ left: "10%", top: "15%" }}
            >
              <div className="text-center p-4">
                <Users className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm font-medium text-foreground">Er kunskap</p>
              </div>
            </motion.div>

            {/* Circle 2 - Buyr methodology */}
            <motion.div
              initial={{ opacity: 0, x: 50, y: -20 }}
              animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="absolute w-48 h-48 md:w-56 md:h-56 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center"
              style={{ right: "10%", top: "15%" }}
            >
              <div className="text-center p-4">
                <Compass className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium text-foreground">Buyrs metodik</p>
              </div>
            </motion.div>

            {/* Circle 3 - AI possibilities */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="absolute w-48 h-48 md:w-56 md:h-56 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center"
              style={{ left: "50%", bottom: "5%", transform: "translateX(-50%)" }}
            >
              <div className="text-center p-4">
                <Bot className="w-8 h-8 text-accent-foreground mx-auto mb-2" />
                <p className="text-sm font-medium text-foreground">AI:s möjligheter</p>
              </div>
            </motion.div>

            {/* Center intersection */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
            >
              <div className="bg-background border-2 border-primary rounded-full px-4 py-3 shadow-lg flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <span className="text-sm font-bold text-foreground whitespace-nowrap">
                  Bättre köpupplevelser
                </span>
              </div>
            </motion.div>
          </div>

          {/* Contribution cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {contributions.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="text-center p-6 rounded-2xl bg-background/50 border border-border"
              >
                <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center mx-auto mb-4`}>
                  <item.icon className={`w-6 h-6 ${item.iconColor}`} />
                </div>
                <p className="text-sm text-muted-foreground mb-2">{item.title}</p>
                <p className="text-foreground font-medium text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Closing statement */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center text-muted-foreground mt-12 max-w-2xl mx-auto"
          >
            Tillsammans gör det att vi kan gå från insikt till testbar lösning på rekordtid — 
            utan att tappa det som är unikt med just er affär.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
