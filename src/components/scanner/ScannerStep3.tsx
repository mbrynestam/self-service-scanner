import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import type { Opportunity } from "./OpportunityScanner";

interface ScannerStep3Props {
  opportunities: Opportunity[];
  onSelect: (opportunity: Opportunity) => void;
}

// Map opportunity types to display categories
const categoryLabels: Record<string, string> = {
  "self-assessment": "Självtest",
  "solution-finder": "Lösningsväljare",
  "price-calculator": "Priskalkylator",
  "configurator": "Konfigurator",
  "booking": "Bokning",
  "roi-calculator": "ROI-kalkylator",
  "maturity-test": "Mognadstest",
  "guide": "Guide",
};

// Render business value dots (1-3)
function BusinessValueDots({ value }: { value: number }) {
  const dots = Math.min(3, Math.max(1, value));
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className={`w-2.5 h-2.5 rounded-full ${
            i <= dots ? "bg-primary" : "bg-muted"
          }`}
        />
      ))}
    </div>
  );
}

export default function ScannerStep3({ opportunities, onSelect }: ScannerStep3Props) {
  return (
    <div className="flex flex-col items-center max-w-4xl mx-auto px-4">
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xl md:text-2xl font-bold text-center mb-2"
      >
        Klar! Här är era <span className="text-primary">self-service-möjligheter</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-muted-foreground text-center mb-6 text-sm"
      >
        Exempel på vad som är möjligt – inte rekommendationer på vad ni ska bygga.
      </motion.p>

      {/* Opportunity cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {opportunities.slice(0, 6).map((opportunity, index) => {
          const categoryLabel = categoryLabels[opportunity.type] || opportunity.type;
          
          return (
            <motion.button
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.08 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(opportunity)}
              className="group relative p-4 bg-card rounded-xl border border-border hover:border-primary/50 transition-all duration-300 text-left flex flex-col h-full min-h-[160px]"
            >
              {/* Category badge */}
              <Badge 
                variant="default" 
                className="w-fit mb-3 text-xs bg-primary/90 hover:bg-primary"
              >
                {categoryLabel}
              </Badge>

              {/* Title */}
              <h3 className="text-base font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                {opportunity.title}
              </h3>

              {/* Description */}
              <p className="text-xs text-muted-foreground mb-4 flex-1 line-clamp-3">
                {opportunity.description}
              </p>

              {/* Business value */}
              <div className="flex items-center justify-between mt-auto pt-2">
                <span className="text-xs text-muted-foreground">Affärsvärde</span>
                <BusinessValueDots value={opportunity.fit} />
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Bottom note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-xs text-muted-foreground text-center mt-6 max-w-xl"
      >
        Vilket verktyg som är rätt att bygga beror på er säljprocess, era mål och er interna mognad. Det avgörs bäst tillsammans.
      </motion.p>
    </div>
  );
}
