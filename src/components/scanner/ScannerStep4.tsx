import { useState } from "react";
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

export default function ScannerStep4({ focusArea, url, onSelectSuggestion }: ScannerStep4Props) {
  const suggestions = suggestionsByArea[focusArea];
  const domain = url.replace(/^https?:\/\//, "").split("/")[0];

  return (
    <div className="flex flex-col items-center max-w-4xl mx-auto px-2">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-4"
      >
        <h2 className="text-base md:text-lg font-bold mb-1">
          Self-service-möjligheter för {domain}
        </h2>
      </motion.div>

      {/* Grid layout */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {suggestions.map((suggestion, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 + index * 0.08 }}
            className="bg-card rounded-lg border border-border hover:border-primary/40 transition-all duration-200 p-3 relative"
          >
            {/* Rank badge */}
            <div className="absolute -top-2 -left-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
              <span className="text-[10px] font-bold text-primary-foreground">{index + 1}</span>
            </div>

            <div className="flex flex-col h-full">
              <h3 className="text-sm font-semibold mb-1 pr-4">{suggestion.title}</h3>
              
              <div className="flex items-center gap-1 mb-2">
                <TrendingUp className={`w-3 h-3 ${valueColors[suggestion.value]}`} />
                <span className={`text-[10px] font-medium ${valueColors[suggestion.value]}`}>
                  {suggestion.value}
                </span>
              </div>

              <p className="text-[11px] text-muted-foreground mb-3 flex-1">
                {suggestion.shortReason}
              </p>

              <Button
                variant="hero"
                size="sm"
                onClick={() => onSelectSuggestion(index)}
                className="w-full h-7 text-xs"
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
