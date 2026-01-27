import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Lightbulb, Zap, Rocket, CheckCircle2 } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Lightbulb,
    title: "Discovery & Strategi",
    description: "Vi kartlägger er köpresa, identifierar friktionspunkter och definierar vilka self-service verktyg som ger störst effekt.",
    duration: "1-2 veckor",
  },
  {
    number: "02",
    icon: Zap,
    title: "AI-driven prototyp",
    description: "Med hjälp av AI tar vi snabbt fram en fungerande prototyp så ni kan testa, ge feedback och iterera innan full produktion.",
    duration: "1-2 veckor",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Produktion & Lansering",
    description: "Vi bygger den färdiga lösningen med fokus på prestanda, tillgänglighet och sömlös integration med era befintliga system.",
    duration: "4-8 veckor",
  },
  {
    number: "04",
    icon: CheckCircle2,
    title: "Optimering & Support",
    description: "Efter lansering analyserar vi data, A/B-testar och optimerar kontinuerligt för att maximera konvertering och ROI.",
    duration: "Löpande",
  },
];

export default function ProcessSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 lg:py-32 relative overflow-hidden">
      <div className="hero-glow top-1/2 left-0 -translate-y-1/2 opacity-20" />
      
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground">
            Från idé till lansering på{" "}
            <span className="gradient-text">rekordtid</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Tack vare AI-driven prototyping kan ni testa och validera koncept
            innan ni investerar i full produktion.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent -translate-y-1/2" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative"
              >
                <div className="gradient-border rounded-2xl p-6 card-gradient h-full">
                  {/* Number Badge */}
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mb-6">
                    <step.icon className="w-6 h-6 text-primary-foreground" />
                  </div>

                  <p className="text-sm font-mono text-primary mb-2">{step.number}</p>
                  <h3 className="font-display text-xl font-bold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {step.description}
                  </p>
                  <p className="text-sm font-medium text-primary">
                    {step.duration}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
