import { motion } from "framer-motion";
import { Calendar, Users, FileText, Zap, Bot, Rocket } from "lucide-react";

const beforeSteps = [
  { icon: Calendar, label: "Vecka 1-8: Möten och förstudier" },
  { icon: FileText, label: "Vecka 8-11: Kravspec" },
  { icon: Users, label: "Vecka 12-14: UX-Design" },
  { icon: Calendar, label: "Utveckling" },
];

const afterSteps = [
  { icon: Zap, label: "Dag 1: Kickoff" },
  { icon: Bot, label: "Dag 2-3: AI-prototyp" },
  { icon: Rocket, label: "Dag 4-5: Testad lösning" },
];

export default function AIAcceleratorSection() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
            AI gör det möjligt att testa på{" "}
            <span className="gradient-text">dagar istället för månader</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Det som tidigare krävde månader av förstudier och möten kan idag göras
            på dagar. AI accelererar prototyping och låter oss testa idéer snabbt
            innan ni investerar stort.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Before */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl p-8 bg-secondary/30 border border-border"
          >
            <h3 className="font-display text-xl font-bold mb-6 text-muted-foreground">
              Förr
            </h3>
            <div className="space-y-4">
              {beforeSteps.map((step, index) => (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <step.icon className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 h-0.5 bg-border" />
                  <span className="text-sm text-muted-foreground">{step.label}</span>
                </motion.div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <span className="text-3xl font-bold text-muted-foreground">3+ månader</span>
            </div>
          </motion.div>

          {/* After */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="gradient-border rounded-2xl p-8 card-gradient"
          >
            <h3 className="font-display text-xl font-bold mb-6 text-primary">
              Nu med AI
            </h3>
            <div className="space-y-4">
              {afterSteps.map((step, index) => (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <step.icon className="w-5 h-5 text-primary" />
                  </div>
                  <motion.div 
                    className="flex-1 h-0.5 bg-primary/50"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.15 }}
                    style={{ transformOrigin: "left" }}
                  />
                  <span className="text-sm text-foreground font-medium">{step.label}</span>
                </motion.div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <span className="text-3xl font-bold gradient-text">5 dagar</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
