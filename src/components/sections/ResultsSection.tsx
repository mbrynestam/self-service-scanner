import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Check } from "lucide-react";

const results = [
  {
    title: "Kortare säljcykler",
    description: "Köpare som kan researcha själva fattar beslut snabbare.",
  },
  {
    title: "Högre konvertering",
    description: "Transparens och kontroll bygger förtroende som leder till affär.",
  },
  {
    title: "Bättre kvalificerade leads",
    description: "Self-service-verktyg filtrerar bort dåliga matchningar automatiskt.",
  },
  {
    title: "Skalbar säljprocess",
    description: "Dina verktyg jobbar dygnet runt utan att öka personalkostnader.",
  },
  {
    title: "Större affärsvärde",
    description: "Köpare som förstår värdet själva är villiga att betala mer.",
  },
  {
    title: "Bättre kundupplevelse",
    description: "Moderna köpare uppskattar företag som respekterar deras tid.",
  },
];

export default function ResultsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground">
            Resultat som{" "}
            <span className="gradient-text">driver tillväxt</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Det här händer när du låter köpare ta kontroll över sin köpresa.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {results.map((result, index) => (
            <motion.div
              key={result.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="flex items-start gap-4 p-4"
            >
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center mt-0.5">
                <Check className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                  {result.title}
                </h3>
                <p className="text-muted-foreground text-sm">{result.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
