import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Sparkles, Clock, Target, Shield } from "lucide-react";

const differentiators = [
  {
    icon: Sparkles,
    title: "AI-driven snabbhet",
    description: "Prototyp på dagar istället för månader. Testa koncept snabbt och iterera baserat på feedback.",
  },
  {
    icon: Target,
    title: "B2B-expertis",
    description: "Vi specialiserar oss på komplexa B2B-köpresor och förstår utmaningarna med långa säljcykler och många beslutsfattare.",
  },
  {
    icon: Clock,
    title: "Fullservice leverans",
    description: "Från strategi till design, utveckling och support – vi tar hand om hela processen.",
  },
  {
    icon: Shield,
    title: "Beprövade resultat",
    description: "Våra kunder ser i snitt 40% kortare säljcykler och 3x fler kvalificerade leads.",
  },
];

export default function DifferentiatorsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-card">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Varför företag väljer{" "}
              <span className="gradient-text">oss</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Vi kombinerar djup B2B-kompetens med modern teknik och AI för att
              leverera verktyg som faktiskt gör skillnad.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6">
            {differentiators.map((diff, index) => (
              <motion.div
                key={diff.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-secondary/50 border border-border hover:border-primary/30 transition-colors duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <diff.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">
                  {diff.title}
                </h3>
                <p className="text-sm text-muted-foreground">{diff.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
