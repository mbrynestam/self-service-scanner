import { motion } from "framer-motion";
import { Clock, Zap, TrendingDown, Timer } from "lucide-react";

const comparisonData = [
  {
    traditional: { label: "Förstudie", value: "50 000 – 150 000 kr" },
    buyr: { label: "Sprint", value: "25 000 – 75 000 kr" },
  },
  {
    traditional: { label: "Design & koncept", value: "100 000 – 300 000 kr" },
    buyr: { label: "Prototyp", value: "ingår i sprinten" },
  },
  {
    traditional: { label: "Projekttid", value: "3–6 månader" },
    buyr: { label: "Tid till prototyp", value: "dagar/veckor" },
  },
  {
    traditional: { label: "Beslutsläge", value: "Stora beslut tidigt" },
    buyr: { label: "Beslutsläge", value: "Testa innan ni investerar" },
  },
];

export default function TraditionalComparison() {
  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
          Vad kostar detta traditionellt?
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Så här ser verkligheten ut – vi jobbar på ett smartare sätt.
        </p>
      </motion.div>

      {/* Comparison Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="max-w-4xl mx-auto mb-12"
      >
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-2 border-b border-border">
            <div className="p-4 md:p-6 bg-muted/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                  <Clock className="w-5 h-5 text-muted-foreground" />
                </div>
                <span className="font-display font-bold text-muted-foreground">Traditionellt</span>
              </div>
            </div>
            <div className="p-4 md:p-6 bg-primary/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                <span className="font-display font-bold text-foreground">Med Buyr</span>
              </div>
            </div>
          </div>

          {/* Rows */}
          {comparisonData.map((row, index) => (
            <div
              key={index}
              className={`grid grid-cols-2 ${
                index < comparisonData.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <div className="p-4 md:p-6 bg-muted/10">
                <p className="text-xs text-muted-foreground mb-1">{row.traditional.label}</p>
                <p className="font-medium text-muted-foreground">{row.traditional.value}</p>
              </div>
              <div className="p-4 md:p-6">
                <p className="text-xs text-muted-foreground mb-1">{row.buyr.label}</p>
                <p className="font-medium text-foreground">{row.buyr.value}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Savings indicators */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="max-w-3xl mx-auto"
      >
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl border border-primary/20 p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
              <TrendingDown className="w-6 h-6 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground mb-2">Besparing i pengar</p>
            <p className="font-display text-2xl font-bold text-foreground mb-2">
              50–300% lägre
            </p>
            <p className="text-sm text-muted-foreground">initial investering</p>
          </div>

          <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl border border-primary/20 p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
              <Timer className="w-6 h-6 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground mb-2">Besparing i tid</p>
            <p className="font-display text-2xl font-bold text-foreground mb-2">
              Månader snabbare
            </p>
            <p className="text-sm text-muted-foreground">till testbar lösning</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
