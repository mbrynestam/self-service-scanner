import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import confetti from "canvas-confetti";
import type { Opportunity } from "./OpportunityScanner";

interface ScannerStep2Props {
  url: string;
  botToken?: string;
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

export default function ScannerStep2({ url, botToken, onComplete }: ScannerStep2Props) {
  const [isComplete, setIsComplete] = useState(false);
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [visibleInsights, setVisibleInsights] = useState<string[]>([]);
  const [currentTypingIndex, setCurrentTypingIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [waitingMessageIndex, setWaitingMessageIndex] = useState(0);
  const opportunitiesRef = useRef<Opportunity[]>([]);
  const analysisStartedRef = useRef(false);
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
    if (analysisStartedRef.current) return;
    analysisStartedRef.current = true;

    const fetchAnalysis = async () => {
      console.log("Starting analysis for:", url);
      try {
        const { data, error } = await supabase.functions.invoke('analyze-website', {
          body: { 
            url,
            botToken, // Include bot protection token
          },
        });

        console.log("Analysis response:", data);

        if (!error && data?.analysis) {
          setAnalysisData(data.analysis);
          if (data.analysis.opportunities) {
            opportunitiesRef.current = data.analysis.opportunities;
          }
          // Generate and queue insights
          const insights = generateInsights(data.analysis);
          insightsQueueRef.current = insights;
        }
      } catch (err) {
        console.error('Failed to fetch analysis:', err);
      }
    };

    fetchAnalysis();
  }, [url, botToken]);

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

  // Trigger typing when analysis data arrives
  useEffect(() => {
    if (analysisData && insightsQueueRef.current.length > 0 && currentTypingIndex === 0) {
      setCurrentTypingIndex(0);
      // Force re-trigger
      setDisplayedText("");
    }
  }, [analysisData]);

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
        {/* Waiting state - cycling messages */}
        {!analysisData && (
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
