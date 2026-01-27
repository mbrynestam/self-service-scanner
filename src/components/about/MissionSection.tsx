import { motion } from "framer-motion";

export default function MissionSection() {
  const journeySteps = [
    { label: "Söker info", delay: 0 },
    { label: "Jämför", delay: 0.3 },
    { label: "Förstår behov", delay: 0.6 },
    { label: "Utvärderar", delay: 0.9 },
    { label: "Beslutar", delay: 1.2 },
  ];

  return (
    <section className="py-24 bg-card">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
              Vår mission: Göra det enklare för köpare att{" "}
              <span className="gradient-text">komma vidare</span>
            </h2>
            <div className="space-y-4 text-muted-foreground text-lg">
              <p>
                B2B-köpare vill förstå mer innan de vill prata med sälj. De vill se
                prisnivåer, jämföra alternativ, förstå sitt behov och känna trygghet
                i sina beslut.
              </p>
              <p>
                Vår mission är att hjälpa företag möta det beteendet — genom att
                bygga smarta self-service-upplevelser som minskar friktion och för
                köpare närmare affär.
              </p>
            </div>
          </motion.div>

          {/* Buyer journey animation */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="gradient-border rounded-2xl p-8 card-gradient">
              <p className="text-sm text-muted-foreground mb-6 text-center">
                Köpresan rör sig framåt — utan säljkontakt
              </p>
              <div className="flex items-center justify-between relative">
                {/* Connection line */}
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2" />
                <motion.div
                  className="absolute top-1/2 left-0 h-0.5 bg-primary -translate-y-1/2"
                  initial={{ width: "0%" }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, delay: 0.5 }}
                />

                {journeySteps.map((step, index) => (
                  <motion.div
                    key={step.label}
                    className="relative z-10 flex flex-col items-center"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.5 + step.delay }}
                  >
                    <motion.div
                      className="w-4 h-4 rounded-full bg-primary"
                      animate={{ boxShadow: ["0 0 0 0 rgba(116, 245, 161, 0)", "0 0 0 8px rgba(116, 245, 161, 0.3)", "0 0 0 0 rgba(116, 245, 161, 0)"] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                    />
                    <span className="text-xs text-muted-foreground mt-3 whitespace-nowrap">
                      {step.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
