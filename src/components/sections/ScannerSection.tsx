import { motion } from "framer-motion";
import OpportunityScanner from "@/components/scanner/OpportunityScanner";

interface ScannerSectionProps {
  variant?: "full" | "compact";
}

export default function ScannerSection({ variant = "full" }: ScannerSectionProps) {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      <div className="hero-glow left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30" />
      
      <div className="container relative z-10">
        {variant === "full" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              AI-driven analys
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Se vad era köpare borde kunna <span className="gradient-text">göra själva</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Få en AI-analys av hur era köpare kan göra mer själva – på 60 sekunder.
            </p>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto bg-card/50 backdrop-blur-sm rounded-3xl border border-border p-6 md:p-10"
        >
          <OpportunityScanner embedded />
        </motion.div>
      </div>
    </section>
  );
}
