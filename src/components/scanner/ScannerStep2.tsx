import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import confetti from "canvas-confetti";
import type { Opportunity } from "./OpportunityScanner";
import { Button } from "@/components/ui/button";

interface ScannerStep2Props {
  url: string;
  honeypot?: string;
  onComplete: (opportunities?: Opportunity[]) => void;
}

interface AnalysisData {
  coreOffering?: string;
  industry?: string;
  targetAudience?: string;
  buyerRoles?: string[];
  buyerQuestions?: string[];
  painPoints?: string[];
  concerns?: string[];
  opportunities?: Opportunity[];
}

export default function ScannerStep2({ url, honeypot, onComplete }: ScannerStep2Props) {
  const [isComplete, setIsComplete] = useState(false);
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [hasTimedOut, setHasTimedOut] = useState(false);
  const [retryNonce, setRetryNonce] = useState(0);
  const [visibleInsights, setVisibleInsights] = useState<string[]>([]);
  const [currentTypingIndex, setCurrentTypingIndex] = useState(-1); // Start at -1, will be set to 0 when data arrives
  const [displayedText, setDisplayedText] = useState("");
  const [waitingMessageIndex, setWaitingMessageIndex] = useState(0);
  const opportunitiesRef = useRef<Opportunity[]>([]);
  const lastRunKeyRef = useRef<string | null>(null);
  const insightsQueueRef = useRef<string[]>([]);

  const waitingMessages = [
    "Analyserar verksamhet",
    "Identifierar målgrupp och typiska köproller",
    "Genomför psykologisk analys gällande köpbeteenden",
  ];

  // Generate insights from analysis data
  const generateInsights = (data: AnalysisData): string[] => {
    const insights: string[] = [];
    
    if (data.coreOffering) {
      insights.push(`> Kärnverksamhet: ${data.coreOffering}`);
    }
    if (data.industry) {
      insights.push(`> Bransch: ${data.industry}`);
    }
    if (data.targetAudience) {
      insights.push(`> Målgrupp: ${data.targetAudience}`);
    }
    if (data.buyerRoles && data.buyerRoles.length > 0) {
      insights.push(`> Köproller: ${data.buyerRoles.slice(0, 3).join(", ")}`);
    }
    if (data.painPoints && data.painPoints.length > 0) {
      insights.push(`> Pain point: "${data.painPoints[0]}"`);
    }
    if (data.buyerQuestions && data.buyerQuestions.length > 0) {
      insights.push(`> Vanlig fråga: "${data.buyerQuestions[0]}"`);
    }
    if (data.concerns && data.concerns.length > 0) {
      insights.push(`> Oro: "${data.concerns[0]}"`);
    }
    // Brainstorming messages
    insights.push(`> Brainstormar self-service verktyg som matchar målgruppens behov...`);
    insights.push(`> Analyserar och väljer ut de verktyg med största affärsnytta...`);
    if (data.opportunities && data.opportunities.length > 0) {
      insights.push(`> Identifierade ${data.opportunities.length} self-service-möjligheter`);
    }
    
    return insights;
  };

  // Fetch complete analysis from the API
  useEffect(() => {
    const runKey = `${url}::${honeypot ?? ""}::${retryNonce}`;
    if (lastRunKeyRef.current === runKey) return;
    lastRunKeyRef.current = runKey;

    const abortController = new AbortController();

    const fetchAnalysis = async () => {
      console.log("Starting analysis for:", url);
      setErrorMessage(null);
      setHasTimedOut(false);
      try {
        const { data, error } = await supabase.functions.invoke('analyze-website', {
          body: { 
            url,
            honeypot, // Send honeypot value (should be empty for real users)
          },
          // Ensure the request doesn't hang forever (uses AbortController under the hood)
          timeout: 120000,
          signal: abortController.signal,
        });

        console.log("Analysis response received:", { data, error });

        if (error) {
          console.error('Edge function error:', error);
          setErrorMessage("Analysen kunde inte köras för den här URL:en just nu.");
          return;
        }

        if (data?.analysis) {
          console.log("Setting analysis data:", data.analysis);
          setAnalysisData(data.analysis);
          if (data.analysis.opportunities) {
            opportunitiesRef.current = data.analysis.opportunities;
          }
          const insights = generateInsights(data.analysis);
          console.log("Generated insights:", insights);
          insightsQueueRef.current = insights;
          // Force trigger the typing by ensuring state updates
          setCurrentTypingIndex(0);
          return;
        }

        // Defensive: backend responded but without expected payload
        console.warn("Analysis response missing 'analysis':", data);
        setErrorMessage("Analysen returnerade inget resultat för den här URL:en.");
      } catch (err) {
        console.error('Failed to fetch analysis:', err);
        const isAbort = err instanceof Error && (err.name === 'AbortError' || /aborted|timeout/i.test(err.message));
        setErrorMessage(
          isAbort
            ? "Analysen tog för lång tid och avbröts. Försök igen eller testa en annan URL."
            : "Något gick fel när vi försökte analysera URL:en."
        );
      }
    };

    fetchAnalysis();

    return () => {
      abortController.abort();
    };
  }, [url, honeypot, retryNonce]);

  // If we never get data (or an explicit error), show a timeout fallback so it doesn't spin forever.
  useEffect(() => {
    if (analysisData || errorMessage) return;
    const t = setTimeout(() => setHasTimedOut(true), 150000); // 150 seconds timeout
    return () => clearTimeout(t);
  }, [analysisData, errorMessage]);

  const handleRetry = () => {
    // Reset all state and re-run analysis
    setIsComplete(false);
    setAnalysisData(null);
    setErrorMessage(null);
    setHasTimedOut(false);
    setVisibleInsights([]);
    setDisplayedText("");
    setCurrentTypingIndex(-1);
    opportunitiesRef.current = [];
    insightsQueueRef.current = [];
    lastRunKeyRef.current = null;
    setRetryNonce((n) => n + 1);
  };

  // Cycle through waiting messages while waiting for data
  useEffect(() => {
    if (analysisData) return; // Stop when data arrives
    
    const interval = setInterval(() => {
      setWaitingMessageIndex(prev => (prev + 1) % waitingMessages.length);
    }, 2500); // Change message every 2.5 seconds
    
    return () => clearInterval(interval);
  }, [analysisData, waitingMessages.length]);

  // Trigger fireworks celebration
  const triggerFireworks = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { x: 0.5, y: 0.5 },
      colors: ['#10B981', '#34D399', '#6EE7B7'],
    });
  };

  // Typewriter effect for current insight
  useEffect(() => {
    // Don't start until triggered (currentTypingIndex >= 0)
    if (currentTypingIndex < 0) return;
    if (insightsQueueRef.current.length === 0) return;
    if (currentTypingIndex >= insightsQueueRef.current.length) {
      // All insights shown, complete after a short delay
      const timeout = setTimeout(() => {
        setIsComplete(true);
        triggerFireworks();
        setTimeout(() => {
          onComplete(opportunitiesRef.current);
        }, 1500);
      }, 800);
      return () => clearTimeout(timeout);
    }

    const currentInsight = insightsQueueRef.current[currentTypingIndex];
    let charIndex = 0;
    setDisplayedText("");

    const typeInterval = setInterval(() => {
      if (charIndex < currentInsight.length) {
        setDisplayedText(currentInsight.substring(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        // Add to visible insights at the TOP and move to next
        setTimeout(() => {
          setVisibleInsights(prev => [currentInsight, ...prev]);
          setDisplayedText("");
          setCurrentTypingIndex(prev => prev + 1);
        }, 150); // Faster pause between lines
      }
    }, 12); // Faster typing speed

    return () => clearInterval(typeInterval);
  }, [currentTypingIndex, analysisData, onComplete]);

  // This effect is now a backup - primary trigger is in fetchAnalysis
  useEffect(() => {
    if (analysisData && insightsQueueRef.current.length > 0 && currentTypingIndex === -1) {
      console.log("Backup trigger: starting typing from effect");
      setCurrentTypingIndex(0);
    }
  }, [analysisData, currentTypingIndex]);

  // Continuous slow progress - never stops completely
  const [slowProgress, setSlowProgress] = useState(5);
  const analysisDataRef = useRef<AnalysisData | null>(null);
  const visibleInsightsCountRef = useRef(0);
  
  // Keep refs in sync
  useEffect(() => {
    analysisDataRef.current = analysisData;
  }, [analysisData]);
  
  useEffect(() => {
    visibleInsightsCountRef.current = visibleInsights.length;
  }, [visibleInsights.length]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setSlowProgress(prev => {
        const hasData = analysisDataRef.current !== null;
        const insightsCount = visibleInsightsCountRef.current;
        const totalInsights = insightsQueueRef.current.length || 1;
        
        if (!hasData) {
          // Before data: always keep moving
          if (prev < 60) return prev + 0.5;
          if (prev < 75) return prev + 0.2;
          return prev + 0.08; // Very slow but never stops
        } else {
          // After data: move based on insights progress
          const targetProgress = 70 + ((insightsCount + 1) / totalInsights) * 28;
          if (prev < targetProgress) return prev + 0.6;
          if (prev < 99) return prev + 0.1; // Keep crawling until nearly done
          return 99; // Cap at 99 until complete
        }
      });
    }, 100);
    
    return () => clearInterval(interval);
  }, []); // No dependencies - runs once, uses refs for current values
  
  const progress = slowProgress;

  return (
    <div className="flex flex-col items-center max-w-2xl mx-auto px-4">
      {/* Header with brain icon */}
      <div className="relative w-16 h-16 mb-4">
        <motion.div
          className="absolute inset-0 rounded-full bg-primary/20 flex items-center justify-center"
          animate={!isComplete ? {
            scale: [1, 1.1, 1],
            opacity: [0.6, 0.3, 0.6],
          } : {}}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {isComplete ? (
            <CheckCircle2 className="w-8 h-8 text-primary" />
          ) : (
            <Brain className="w-8 h-8 text-primary" />
          )}
        </motion.div>
      </div>

      {/* URL being analyzed */}
      <div className="text-sm text-muted-foreground mb-4 text-center">
        Analyserar: <span className="font-medium text-foreground">{url.replace(/^https?:\/\//, "")}</span>
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-md mb-6">
        <div className="h-1 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary rounded-full"
            initial={{ width: "5%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Insights display - left aligned, auto height */}
      <div className="w-full max-w-lg font-mono text-sm text-left space-y-1">
        {/* Error/timeout state */}
        {(errorMessage || hasTimedOut) && !analysisData && (
          <div className="space-y-3">
            <div className="text-muted-foreground">
              {errorMessage ?? "Det tar längre tid än väntat att analysera den här URL:en."}
            </div>
            <div className="flex flex-wrap gap-2">
              <Button type="button" onClick={handleRetry}>
                Försök igen
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  // Let the parent unmount/remount step2 by finishing with empty result.
                  // Parent flow typically allows going back and trying another URL.
                  onComplete(opportunitiesRef.current);
                }}
              >
                Gå vidare
              </Button>
            </div>
            <div className="text-xs text-muted-foreground">
              Tips: testa att klistra in en full URL (t.ex. https://exempel.se) och se om sidan kräver inloggning eller blockerar robotar.
            </div>
          </div>
        )}

        {/* Waiting state - cycling messages */}
        {!analysisData && !errorMessage && !hasTimedOut && (
          <motion.div
            key={waitingMessageIndex}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 0.6, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.3 }}
            className="text-muted-foreground"
          >
            {waitingMessages[waitingMessageIndex]}
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
              className="ml-1"
            >
              ...
            </motion.span>
          </motion.div>
        )}

        {/* Currently typing insight - shown at top */}
        {displayedText && (
          <div style={{ opacity: 0.5 }} className="text-primary">
            {displayedText}
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              _
            </motion.span>
          </div>
        )}

        {/* Previously shown insights - newest first with decreasing opacity, max 3 shown (4th is typing) */}
        <AnimatePresence>
          {visibleInsights.slice(0, 3).map((insight, index) => {
            // Calculate opacity: 50% for first, 40% for second, 30% for third
            const opacity = Math.max(0.2, 0.5 - index * 0.1);
            return (
              <motion.div
                key={insight}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-primary truncate"
              >
                {insight}
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Completion message */}
        {isComplete && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 0.6, y: 0 }}
            className="mt-3 pt-2 text-muted-foreground"
          >
            Analys klar. Laddar resultat...
          </motion.div>
        )}
      </div>
    </div>
  );
}
