import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScannerStep1 from "./ScannerStep1";
import ScannerStep2 from "./ScannerStep2";
import ScannerStep3 from "./ScannerStep3";
import ScannerStep4 from "./ScannerStep4";
import ScannerStep5 from "./ScannerStep5";

export type FocusArea = "pricing" | "assessment" | "configurator" | "selector";

export interface Opportunity {
  type: string;
  title: string;
  description: string;
  potentialValue: string;
  fit: number;
}

export interface ScannerState {
  url: string;
  focusArea: FocusArea | null;
  selectedSuggestion: number | null;
  opportunities: Opportunity[];
}

interface OpportunityScannerProps {
  onClose?: () => void;
  embedded?: boolean;
}

export default function OpportunityScanner({ onClose, embedded = false }: OpportunityScannerProps) {
  const [step, setStep] = useState(1);
  const [state, setState] = useState<ScannerState>({
    url: "",
    focusArea: null,
    selectedSuggestion: null,
    opportunities: [],
  });

  const handleUrlSubmit = (url: string) => {
    setState(prev => ({ ...prev, url }));
    setStep(2);
  };

  const handleAnalysisComplete = (opportunities?: Opportunity[]) => {
    if (opportunities) {
      setState(prev => ({ ...prev, opportunities }));
    }
    setStep(3);
  };

  const handleFocusAreaSelect = (area: FocusArea) => {
    setState(prev => ({ ...prev, focusArea: area }));
    setStep(4);
  };

  const handleSuggestionSelect = (index: number) => {
    setState(prev => ({ ...prev, selectedSuggestion: index }));
    setStep(5);
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleReset = () => {
    setStep(1);
    setState({ url: "", focusArea: null, selectedSuggestion: null, opportunities: [] });
  };

  return (
    <div className={`w-full ${embedded ? '' : 'min-h-[500px]'} max-h-[800px] overflow-y-auto relative`}>

      {/* Progress indicator */}
      <div className="flex justify-center mb-8 pt-2">
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((s) => (
            <div
              key={s}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                s === step
                  ? "w-8 bg-primary"
                  : s < step
                  ? "w-4 bg-primary/50"
                  : "w-4 bg-muted"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Steps */}
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <ScannerStep1 onSubmit={handleUrlSubmit} />
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <ScannerStep2 url={state.url} onComplete={handleAnalysisComplete} />
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <ScannerStep3 
              opportunities={state.opportunities} 
              onSelect={(opportunity) => {
                // For now, just go to step 4 with first focus area
                handleFocusAreaSelect("assessment");
              }} 
            />
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <ScannerStep4
              focusArea={state.focusArea!}
              url={state.url}
              onSelectSuggestion={handleSuggestionSelect}
            />
          </motion.div>
        )}

        {step === 5 && (
          <motion.div
            key="step5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <ScannerStep5
              focusArea={state.focusArea!}
              suggestionIndex={state.selectedSuggestion!}
              url={state.url}
              opportunities={state.opportunities}
              onReset={handleReset}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
