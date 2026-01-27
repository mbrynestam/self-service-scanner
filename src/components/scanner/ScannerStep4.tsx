import { motion } from "framer-motion";
import { TrendingUp, ArrowRight, Info } from "lucide-react";
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

  return (
    <div className="flex flex-col items-center max-w-3xl mx-auto px-4">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-5"
      >
        <h2 className="text-xl md:text-2xl font-bold mb-2">
          Här är de starkaste self-service-möjligheterna för er
        </h2>
        <p className="text-sm text-muted-foreground">
          Baserat på analysen av <span className="text-foreground font-medium">{domain}</span>
        </p>
      </motion.div>

      {/* Suggestion cards */}
      <div className="w-full space-y-3">
        {suggestions.map((suggestion, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.1 }}
            className="group relative bg-card rounded-xl border border-transparent hover:border-primary/30 transition-all duration-300 overflow-hidden"
          >
            {/* Rank badge */}
            <div className="absolute top-3 left-3 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-xs font-bold text-primary">#{index + 1}</span>
            </div>

            <div className="p-4 pl-12">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div className="flex-1">
                  <h3 className="text-base font-semibold mb-1">{suggestion.title}</h3>
                  
                  {/* Value indicator */}
                  <div className="flex items-center gap-2">
                    <TrendingUp className={`w-3 h-3 ${valueColors[suggestion.value]}`} />
                    <span className={`text-xs font-medium ${valueColors[suggestion.value]}`}>
                      {suggestion.value}
                    </span>
                    <span className="text-xs text-muted-foreground hidden md:inline">• {suggestion.reason}</span>
                  </div>
                </div>

                {/* CTA buttons */}
                <div className="flex-shrink-0">
                  <Button
                    variant="hero"
                    size="sm"
                    onClick={() => onSelectSuggestion(index)}
                    className="whitespace-nowrap"
                  >
                    Visa mer
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </div>
              </div>
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
        transition={{ delay: 0.4 }}
        className="text-xs text-muted-foreground text-center mt-5"
      >
        Baserat på best practices för B2B self-service
      </motion.p>
    </div>
  );
}
