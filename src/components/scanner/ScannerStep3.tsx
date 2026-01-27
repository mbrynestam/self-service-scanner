import { motion } from "framer-motion";
import { Calculator, Brain, Puzzle, Target } from "lucide-react";
import type { FocusArea } from "./OpportunityScanner";

interface ScannerStep3Props {
  onSelect: (area: FocusArea) => void;
}

const focusAreas = [
  {
    id: "pricing" as FocusArea,
    icon: Calculator,
    title: "Visa pris tidigare i köpresan",
    description: "För köpare som vill förstå budget innan dialog",
  },
  {
    id: "assessment" as FocusArea,
    icon: Brain,
    title: "Hjälpa köpare förstå sitt behov",
    description: "Assessment, guider, självtester",
  },
  {
    id: "configurator" as FocusArea,
    icon: Puzzle,
    title: "Låta köpare bygga sin lösning",
    description: "Konfiguratorer och valverktyg",
  },
  {
    id: "selector" as FocusArea,
    icon: Target,
    title: "Hjälpa köpare välja rätt alternativ",
    description: "Produkt-/lösningsväljare",
  },
];

export default function ScannerStep3({ onSelect }: ScannerStep3Props) {
  return (
    <div className="flex flex-col items-center max-w-3xl mx-auto px-4">
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xl md:text-2xl font-bold text-center mb-2"
      >
        Vilket område är mest relevant för er just nu?
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-muted-foreground text-center mb-5 text-sm"
      >
        Välj det som bäst matchar era köpares behov
      </motion.p>

      {/* Focus area cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
        {focusAreas.map((area, index) => (
          <motion.button
            key={area.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(area.id)}
            className="group relative p-4 bg-card rounded-xl border border-transparent hover:border-primary transition-all duration-300 text-left"
          >
            {/* Icon */}
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
              <area.icon className="w-5 h-5 text-primary" />
            </div>

            {/* Content */}
            <h3 className="text-base font-semibold mb-1 group-hover:text-primary transition-colors">
              {area.title}
            </h3>
            <p className="text-xs text-muted-foreground">
              {area.description}
            </p>

            {/* Hover indicator */}
            <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
