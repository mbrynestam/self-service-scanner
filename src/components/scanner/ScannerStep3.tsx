import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import type { Opportunity } from "./OpportunityScanner";

interface ScannerStep3Props {
  opportunities: Opportunity[];
  onContinue?: () => void;
}

// Map opportunity types to Swedish category labels
const getCategoryLabel = (type: string): string => {
  const typeMap: Record<string, string> = {
    "self-assessment": "Självtest",
    "assessment": "Självtest",
    "solution-finder": "Lösningsväljare",
    "selector": "Lösningsväljare",
    "price-calculator": "Priskalkylator",
    "pricing": "Priskalkylator",
    "roi-calculator": "ROI-kalkylator",
    "configurator": "Konfigurator",
    "booking": "Bokning",
    "maturity-test": "Mognadstest",
    "guide": "Guide",
    "checklist": "Checklista",
  };
  
  // Check for partial matches
  const lowerType = type.toLowerCase();
  for (const [key, label] of Object.entries(typeMap)) {
    if (lowerType.includes(key) || key.includes(lowerType)) {
      return label;
    }
  }
  
  // Default fallback - capitalize first letter
  return type.charAt(0).toUpperCase() + type.slice(1);
};

// Render business value dots (1-3)
function BusinessValueDots({ value }: { value: number }) {
  const dots = Math.min(3, Math.max(1, value));
  return (
    <div className="flex items-center gap-1.5">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className={`w-3 h-3 rounded-full ${
            i <= dots ? "bg-primary" : "bg-primary/30"
          }`}
        />
      ))}
    </div>
  );
}

export default function ScannerStep3({ opportunities }: ScannerStep3Props) {
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

      {/* Opportunity cards grid - not clickable */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {opportunities.slice(0, 6).map((opportunity, index) => {
          const categoryLabel = getCategoryLabel(opportunity.type);
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.08 }}
              className="relative p-5 bg-card rounded-xl border border-border flex flex-col min-h-[180px]"
            >
              {/* Category badge - small green pill */}
              <Badge 
                variant="default" 
                className="w-fit mb-4 text-[11px] px-3 py-0.5 bg-primary hover:bg-primary font-medium"
              >
                {categoryLabel}
              </Badge>

              {/* Title */}
              <h3 className="text-base font-semibold mb-2 leading-tight">
                {opportunity.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-muted-foreground mb-6 flex-1 leading-relaxed">
                {opportunity.description}
              </p>

              {/* Business value - at bottom */}
              <div className="flex items-center justify-between mt-auto">
                <span className="text-xs text-muted-foreground">Affärsvärde</span>
                <BusinessValueDots value={opportunity.fit} />
              </div>
            </motion.div>
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
