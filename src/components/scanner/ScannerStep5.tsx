import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { FocusArea, Opportunity } from "./OpportunityScanner";

interface ScannerStep5Props {
  focusArea: FocusArea;
  suggestionIndex: number;
  url: string;
  opportunities: Opportunity[];
  onReset: () => void;
}

const suggestionTitles: Record<FocusArea, string[]> = {
  pricing: ["Interaktiv priskalkylator", "Prisguide med scenarion", "ROI-kalkylator"],
  assessment: ["Självtest för behovsanalys", "Interaktiv mognadsanalys", "Checklista för utvärdering"],
  configurator: ["Produktkonfigurator", "Paketbyggare", "Kapacitetsplanerare"],
  selector: ["Produktväljare", "Jämförelseverktyg", "Rekommendationsmotor"],
};

export default function ScannerStep5({ focusArea, suggestionIndex, url, opportunities, onReset }: ScannerStep5Props) {
  const suggestionTitle = suggestionTitles[focusArea][suggestionIndex] || suggestionTitles[focusArea][0];

  // Build Tally URL with prefilled hidden fields
  const tallyBaseUrl = "https://tally.so/embed/1A9Qj4";
  const params = new URLSearchParams({
    alignLeft: "1",
    hideTitle: "1",
    transparentBackground: "1",
    dynamicHeight: "1",
  });
  
  // Add hidden field data if Tally form supports it
  // You can prefill fields by adding: &field_name=value
  if (url) {
    params.append("analyzed_url", url);
  }
  if (suggestionTitle) {
    params.append("selected_tool", suggestionTitle);
  }
  if (opportunities.length > 0) {
    const opportunitiesText = opportunities.map((opp, i) => `${i + 1}. ${opp.title}`).join(", ");
    params.append("opportunities", opportunitiesText);
  }

  const tallyUrl = `${tallyBaseUrl}?${params.toString()}`;

  return (
    <div className="flex flex-col items-center max-w-lg mx-auto px-4">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-4"
      >
        <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium mb-3">
          <Sparkles className="w-3 h-3" />
          {suggestionTitle}
        </div>
        
        <h2 className="text-xl md:text-2xl font-bold mb-2">
          Vill du se en klickbar prototyp?
        </h2>
        
        <p className="text-sm text-muted-foreground">
          Vi tar fram en AI-prototyp som visar hur detta verktyg kan fungera för er.
        </p>
      </motion.div>

      {/* Tally Form Embed */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="w-full"
      >
        <iframe
          src={tallyUrl}
          width="100%"
          height="400"
          frameBorder="0"
          marginHeight={0}
          marginWidth={0}
          title="Boka prototyp"
          className="rounded-xl"
        />
      </motion.div>

      {/* Trust indicators */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex items-center justify-center gap-3 mt-4 text-[10px] text-muted-foreground"
      >
        <span>🔒 GDPR-säkert</span>
        <span>•</span>
        <span>Inga förpliktelser</span>
        <span>•</span>
        <span>Svar inom 24h</span>
      </motion.div>

      {/* Reset button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-4"
      >
        <Button variant="ghost" size="sm" onClick={onReset}>
          Gör en ny analys
        </Button>
      </motion.div>
    </div>
  );
}
