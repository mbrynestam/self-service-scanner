import { motion } from "framer-motion";
import { TrendingUp, ArrowRight } from "lucide-react";
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
  shortReason: string;
}>> = {
  pricing: [
    { title: "Priskalkylator", value: "Mycket högt", shortReason: "Visa kostnader tidigt" },
    { title: "Prisguide", value: "Högt", shortReason: "Jämför alternativ" },
    { title: "ROI-kalkylator", value: "Högt", shortReason: "Motivera investering" },
  ],
  assessment: [
    { title: "Behovsanalys", value: "Mycket högt", shortReason: "Kvalificera leads" },
    { title: "Mognadstest", value: "Högt", shortReason: "Identifiera gap" },
    { title: "Checklista", value: "Medium", shortReason: "Strukturera processen" },
  ],
  configurator: [
    { title: "Produktkonfigurator", value: "Mycket högt", shortReason: "Bygg egen lösning" },
    { title: "Paketbyggare", value: "Högt", shortReason: "Skräddarsy paket" },
    { title: "Kapacitetsplanerare", value: "Högt", shortReason: "Dimensionera rätt" },
  ],
  selector: [
    { title: "Produktväljare", value: "Mycket högt", shortReason: "Hitta rätt lösning" },
    { title: "Jämförelseverktyg", value: "Högt", shortReason: "Jämför alternativ" },
    { title: "Rekommendationsmotor", value: "Högt", shortReason: "Personlig vägledning" },
  ],
};

const valueColors = {
  "Mycket högt": "text-primary",
  "Högt": "text-amber-400",
  "Medium": "text-blue-400",
};

// Get grid layout classes based on count and position
function getGridClasses(count: number, index: number): string {
  const isOdd = count % 2 === 1;
  const isFirst = index === 0;

  // For odd counts, first item spans 2 columns
  if (isOdd && isFirst && count > 1) {
    return "col-span-2";
  }

  return "col-span-1";
}

// Get container grid classes based on count
function getContainerClasses(count: number): string {
  if (count === 1) return "grid-cols-1";
  return "grid-cols-2";
}

export default function ScannerStep4({ focusArea, url, onSelectSuggestion }: ScannerStep4Props) {
  const suggestions = suggestionsByArea[focusArea].slice(0, 6);
  const domain = url.replace(/^https?:\/\//, "").split("/")[0];
  const count = suggestions.length;
  const isOdd = count % 2 === 1 && count > 1;

  return (
    <div className="flex flex-col items-center max-w-2xl mx-auto px-2 h-full">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-3"
      >
        <h2 className="text-sm md:text-base font-bold mb-1">
          Self-service-möjligheter för {domain}
        </h2>
      </motion.div>

      {/* Masonry grid */}
      <div className={`w-full grid ${getContainerClasses(count)} gap-2 flex-1`}>
        {suggestions.map((suggestion, index) => {
          const gridClasses = getGridClasses(count, index);
          const isLarge = isOdd && index === 0;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.05 + index * 0.06 }}
              className={`${gridClasses} bg-card rounded-lg border border-border hover:border-primary/40 transition-all duration-200 p-3 relative flex flex-col`}
            >
              {/* Rank badge */}
              <div className="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                <span className="text-[10px] font-bold text-primary-foreground">{index + 1}</span>
              </div>

              <div className="flex flex-col h-full">
                <h3 className={`font-semibold mb-1 pr-4 ${isLarge ? 'text-base' : 'text-sm'}`}>
                  {suggestion.title}
                </h3>
                
                <div className="flex items-center gap-1 mb-1">
                  <TrendingUp className={`w-3 h-3 ${valueColors[suggestion.value]}`} />
                  <span className={`text-[10px] font-medium ${valueColors[suggestion.value]}`}>
                    {suggestion.value}
                  </span>
                </div>

                <p className={`text-muted-foreground mb-2 flex-1 ${isLarge ? 'text-xs' : 'text-[11px]'}`}>
                  {suggestion.shortReason}
                </p>

                <Button
                  variant="hero"
                  size="sm"
                  onClick={() => onSelectSuggestion(index)}
                  className={`w-full text-xs ${isLarge ? 'h-8' : 'h-7'}`}
                >
                  Välj
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </div>

              {/* Highlight for top suggestion */}
              {index === 0 && (
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary/10 via-transparent to-transparent pointer-events-none" />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Bottom note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-[10px] text-muted-foreground text-center mt-2"
      >
        Baserat på best practices för B2B self-service
      </motion.p>
    </div>
  );
}
