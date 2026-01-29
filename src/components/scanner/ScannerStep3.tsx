import { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import type { Opportunity } from "./OpportunityScanner";
import ContactModal from "./ContactModal";

interface ScannerStep3Props {
  opportunities: Opportunity[];
  url?: string;
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
    "scheduling": "Bokning",
    "maturity-test": "Mognadstest",
    "guide": "Guide",
    "checklist": "Checklista",
    "other": "Övrigt",
  };
  
  const lowerType = type.toLowerCase();
  for (const [key, label] of Object.entries(typeMap)) {
    if (lowerType.includes(key) || key.includes(lowerType)) {
      return label;
    }
  }
  
  return type.charAt(0).toUpperCase() + type.slice(1);
};

// Convert potentialValue string to number (1-3)
const getBusinessValue = (opportunity: Opportunity): number => {
  if (typeof opportunity.fit === 'number') {
    return Math.min(3, Math.max(1, opportunity.fit));
  }
  
  const valueMap: Record<string, number> = {
    "high": 3,
    "högt": 3,
    "medium": 2,
    "medel": 2,
    "low": 1,
    "lågt": 1,
  };
  
  const value = opportunity.potentialValue?.toLowerCase() || "medium";
  return valueMap[value] || 2;
};

// Render business value dots (1-3)
function BusinessValueDots({ value }: { value: number }) {
  const dots = Math.min(3, Math.max(1, value));
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className={`w-2 h-2 rounded-full ${
            i <= dots ? "bg-primary" : "bg-primary/30"
          }`}
        />
      ))}
    </div>
  );
}

export default function ScannerStep3({ opportunities, url }: ScannerStep3Props) {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  
  // Sort by business value (high to low) and take top 6
  const sortedOpportunities = [...opportunities]
    .sort((a, b) => getBusinessValue(b) - getBusinessValue(a))
    .slice(0, 6);
  
  return (
    <div className="flex flex-col items-center max-w-4xl mx-auto px-4 relative">
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-lg md:text-xl font-bold text-center mb-1"
      >
        Klar! Här är era <span className="text-primary">self-service-möjligheter</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-muted-foreground text-center mb-4 text-xs"
      >
        Exempel på vad som är möjligt – inte rekommendationer på vad ni ska bygga.
      </motion.p>

      {/* Grid layout with equal height cards */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 auto-rows-fr">
        {sortedOpportunities.map((opportunity, index) => {
          const categoryLabel = getCategoryLabel(opportunity.type);
          const businessValue = getBusinessValue(opportunity);
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 + index * 0.06 }}
              className="p-3 bg-card rounded-lg border border-border flex flex-col h-full"
            >
              {/* Category badge - small green pill */}
              <Badge 
                variant="default" 
                className="w-fit mb-2 text-[10px] px-2 py-0 bg-primary hover:bg-primary font-medium"
              >
                {categoryLabel}
              </Badge>

              {/* Title */}
              <h3 className="text-sm font-semibold mb-1 leading-tight">
                {opportunity.title}
              </h3>

              {/* Description */}
              <p className="text-[11px] text-muted-foreground mb-3 leading-relaxed flex-1">
                {opportunity.description}
              </p>

              {/* Business value - at bottom */}
              <div className="flex items-center justify-between mt-auto pt-2 border-t border-border/50">
                <span className="text-[10px] text-muted-foreground">Affärsvärde</span>
                <BusinessValueDots value={businessValue} />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="w-full max-w-md mt-6 text-center"
      >
        <p className="text-xs text-muted-foreground mb-3">
          Nästa steg är att boka ett möte för att visa vad som är möjligt och vad som ger mest effekt för din försäljning.
        </p>
        
        <Button
          onClick={() => setIsContactModalOpen(true)}
          className="h-10 px-6"
        >
          <Calendar className="w-4 h-4 mr-2" />
          Boka samtal
        </Button>
      </motion.div>

      {/* Bottom note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-[10px] text-muted-foreground text-center mt-4 max-w-lg"
      >
        Vilket verktyg som är rätt att bygga beror på er säljprocess, era mål och er interna mognad. Det avgörs bäst tillsammans.
      </motion.p>

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        analyzedUrl={url}
        opportunities={opportunities}
      />
    </div>
  );
}
