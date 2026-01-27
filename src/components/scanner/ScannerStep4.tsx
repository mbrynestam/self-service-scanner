import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { FocusArea } from "./OpportunityScanner";

interface ScannerStep4Props {
  focusArea: FocusArea;
  url: string;
  onSelectSuggestion: (index: number) => void;
}

const suggestionsByArea: Record<FocusArea, Array<{
  title: string;
  value: "Mycket högt" | "Högt" | "Medium";
  reason: string;
}>> = {
  pricing: [
    {
      title: "Interaktiv priskalkylator",
      value: "Mycket högt",
      reason: "Era köpare behöver förstå kostnadsbild tidigt för att gå vidare i processen.",
    },
    {
      title: "Prisguide med scenarion",
      value: "Högt",
      reason: "Hjälper köpare jämföra olika alternativ och budgetera internt.",
    },
    {
      title: "ROI-kalkylator",
      value: "Högt",
      reason: "Visar affärsvärdet av er lösning för att motivera investeringen.",
    },
  ],
  assessment: [
    {
      title: "Självtest för behovsanalys",
      value: "Mycket högt",
      reason: "Er lösning kräver utbildning innan dialog.",
    },
    {
      title: "Interaktiv mognadsanalys",
      value: "Högt",
      reason: "Hjälper köpare förstå var de står och vad nästa steg bör vara.",
    },
    {
      title: "Checklista för utvärdering",
      value: "Medium",
      reason: "Ger struktur åt köparens interna process.",
    },
  ],
  configurator: [
    {
      title: "Produktkonfigurator",
      value: "Mycket högt",
      reason: "Låter köpare bygga sin lösning och förstå vad som ingår.",
    },
    {
      title: "Paketbyggare",
      value: "Högt",
      reason: "Kombinerar moduler till skräddarsydda paket.",
    },
    {
      title: "Kapacitetsplanerare",
      value: "Högt",
      reason: "Hjälper köpare dimensionera rätt från start.",
    },
  ],
  selector: [
    {
      title: "Produktväljare",
      value: "Mycket högt",
      reason: "Guidar köpare till rätt lösning baserat på deras behov.",
    },
    {
      title: "Jämförelseverktyg",
      value: "Högt",
      reason: "Visar skillnader mellan alternativ på ett tydligt sätt.",
    },
    {
      title: "Rekommendationsmotor",
      value: "Högt",
      reason: "Personaliserad vägledning baserat på köparens svar.",
    },
  ],
};

const valueColors = {
  "Mycket högt": "text-primary",
  "Högt": "text-amber-400",
  "Medium": "text-blue-400",
};

export default function ScannerStep4({ focusArea, url, onSelectSuggestion }: ScannerStep4Props) {
  const suggestions = suggestionsByArea[focusArea];
  const domain = url.replace(/^https?:\/\//, "").split("/")[0];
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col items-center max-w-3xl mx-auto px-4">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-4"
      >
        <h2 className="text-lg md:text-xl font-bold mb-1">
          Self-service-möjligheter för er
        </h2>
        <p className="text-xs text-muted-foreground">
          Baserat på analysen av <span className="text-foreground font-medium">{domain}</span>
        </p>
      </motion.div>

      {/* Suggestion cards - compact */}
      <div className="w-full space-y-2">
        {suggestions.map((suggestion, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 + index * 0.08 }}
            className="group relative bg-card rounded-lg border border-transparent hover:border-primary/30 transition-all duration-300 overflow-hidden"
          >
            <div className="p-3 pl-10">
              {/* Rank badge */}
              <div className="absolute top-3 left-3 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-[10px] font-bold text-primary">#{index + 1}</span>
              </div>

              <div className="flex items-center justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold truncate">{suggestion.title}</h3>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <TrendingUp className={`w-3 h-3 ${valueColors[suggestion.value]}`} />
                      <span className={`text-[10px] font-medium ${valueColors[suggestion.value]}`}>
                        {suggestion.value}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-1 flex-shrink-0">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleExpand(index)}
                    className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground"
                  >
                    <ChevronDown className={`w-4 h-4 transition-transform ${expandedIndex === index ? 'rotate-180' : ''}`} />
                  </Button>
                  <Button
                    variant="hero"
                    size="sm"
                    onClick={() => onSelectSuggestion(index)}
                    className="h-7 text-xs px-2"
                  >
                    Välj
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </div>
              </div>

              {/* Expandable description */}
              <AnimatePresence>
                {expandedIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p className="text-xs text-muted-foreground mt-2 pt-2 border-t border-border/50">
                      {suggestion.reason}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Subtle highlight for top suggestion */}
            {index === 0 && (
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-transparent pointer-events-none" />
            )}
          </motion.div>
        ))}
      </div>

      {/* Bottom note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-[10px] text-muted-foreground text-center mt-3"
      >
        Baserat på best practices för B2B self-service
      </motion.p>
    </div>
  );
}
