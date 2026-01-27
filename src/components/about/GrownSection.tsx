import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Compass, Fingerprint, ArrowRight } from "lucide-react";

export default function GrownSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          {/* Experience badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <span className="text-sm font-medium text-primary">25+ års erfarenhet av B2B-köpresor</span>
          </div>
          
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
            En del av <span className="gradient-text">Grown</span> – byggt på lång erfarenhet
          </h2>
        </motion.div>

        {/* Intro text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <p className="text-lg text-muted-foreground mb-4">
            Personerna bakom Grown har arbetat med B2B-strategi och köpbeteenden sedan mitten 
            av 1990-talet. Under åren har fokus alltid varit detsamma: att hjälpa företag 
            anpassa sin marknadsföring och försäljning till hur köpare faktiskt vill köpa.
          </p>
          <p className="text-lg text-muted-foreground">
            Grown samlar idag denna strategiska kompetens och hjälper B2B-företag förstå vad 
            som behöver förändras för att bygga förtroende tidigare i köpresan.
          </p>
        </motion.div>

        {/* Two columns with connection line */}
        <div className="relative max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 relative">
            {/* Connection line - horizontal on desktop, vertical on mobile */}
            <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0">
              <motion.div
                className="flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <motion.div 
                  className="w-12 h-0.5 bg-primary/50"
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  style={{ transformOrigin: "left" }}
                />
                <ArrowRight className="w-4 h-4 text-primary" />
                <motion.div 
                  className="w-12 h-0.5 bg-primary/50"
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  style={{ transformOrigin: "left" }}
                />
              </motion.div>
            </div>

            {/* Grown - Strategy */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="gradient-border rounded-2xl p-6 md:p-8 card-gradient relative z-10"
            >
              <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center mb-6">
                <Compass className="w-7 h-7 text-muted-foreground" />
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                Grown
              </h3>
              <p className="text-primary font-medium mb-4">Förstår hur köpare tänker</p>
              <p className="text-muted-foreground text-sm">
                Strategi, positionering och insikt i hur B2B-köpresor verkligen fungerar.
              </p>
            </motion.div>

            {/* Mobile connection arrow */}
            <div className="md:hidden flex justify-center -my-4 relative z-0">
              <motion.div
                className="flex flex-col items-center gap-1"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                <div className="w-0.5 h-6 bg-primary/50" />
                <ArrowRight className="w-4 h-4 text-primary rotate-90" />
                <div className="w-0.5 h-6 bg-primary/50" />
              </motion.div>
            </div>

            {/* Buyr - Self-service */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="gradient-border rounded-2xl p-6 md:p-8 card-gradient relative z-10"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <Fingerprint className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                Buyr
              </h3>
              <p className="text-primary font-medium mb-4">Bygger hur köpare kan agera</p>
              <p className="text-muted-foreground text-sm">
                Konkreta, testbara self-service-verktyg som hjälper köpare komma vidare på egen hand.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Why Buyr exists */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="max-w-3xl mx-auto mt-16"
        >
          <div className="bg-card rounded-2xl border border-border p-8 text-center">
            <h3 className="font-display text-xl font-bold text-foreground mb-4">
              Därför finns Buyr
            </h3>
            <p className="text-muted-foreground mb-4">
              Buyr skapades som en fristående satsning från Grown med ett tydligt uppdrag:
            </p>
            <p className="text-lg font-medium text-foreground mb-6">
              Att göra det möjligt för företag att snabbt testa och införa self-service-lösningar 
              som hjälper köpare komma vidare på egen hand.
            </p>
            <p className="text-muted-foreground text-sm">
              Self-service har länge varit en central del i Growns arbete med att bygga förtroende, 
              utbilda köpare och skapa bättre säljdialoger. Buyr är specialiserat på att ta just 
              den delen hela vägen till verkliga, interaktiva lösningar.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
