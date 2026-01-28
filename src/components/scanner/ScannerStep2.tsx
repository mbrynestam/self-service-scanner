import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, CheckCircle2, Terminal } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Opportunity } from "./OpportunityScanner";

interface ScannerStep2Props {
  url: string;
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

export default function ScannerStep2({ url, onComplete }: ScannerStep2Props) {
  const [isComplete, setIsComplete] = useState(false);
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [visibleInsights, setVisibleInsights] = useState<string[]>([]);
  const [currentTypingIndex, setCurrentTypingIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const opportunitiesRef = useRef<Opportunity[]>([]);
  const analysisStartedRef = useRef(false);
  const insightsQueueRef = useRef<string[]>([]);

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
          body: { url },
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
  }, [url]);

  // Typewriter effect for current insight
  useEffect(() => {
    if (insightsQueueRef.current.length === 0) return;
    if (currentTypingIndex >= insightsQueueRef.current.length) {
      // All insights shown, complete after a short delay
      const timeout = setTimeout(() => {
        setIsComplete(true);
        setTimeout(() => {
          onComplete(opportunitiesRef.current);
        }, 1000);
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
        // Add to visible insights and move to next
        setTimeout(() => {
          setVisibleInsights(prev => [...prev, currentInsight]);
          setDisplayedText("");
          setCurrentTypingIndex(prev => prev + 1);
        }, 300);
      }
    }, 25); // Speed of typing

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

  const progress = analysisData 
    ? Math.min(((visibleInsights.length + 1) / (insightsQueueRef.current.length || 1)) * 100, 100)
    : 10;

  return (
    <div className="flex flex-col items-center text-center max-w-2xl mx-auto px-4">
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
      <div className="text-sm text-muted-foreground mb-4">
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

      {/* Terminal-style insights display */}
      <div className="w-full max-w-lg bg-[#0d1117] border border-[#30363d] rounded-lg p-4 font-mono text-sm text-left min-h-[200px]">
        {/* Terminal header */}
        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[#30363d]">
          <Terminal className="w-4 h-4 text-[#8b949e]" />
          <span className="text-[#8b949e] text-xs">buyr-scanner</span>
        </div>

        {/* Insights list */}
        <div className="space-y-1">
          {/* Waiting state */}
          {!analysisData && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[#8b949e]"
            >
              <span className="text-[#58a6ff]">$</span> Ansluter till AI...
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="ml-1"
              >
                _
              </motion.span>
            </motion.div>
          )}

          {/* Previously shown insights */}
          <AnimatePresence>
            {visibleInsights.map((insight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[#c9d1d9]"
              >
                <span className="text-[#7ee787]">{insight}</span>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Currently typing insight */}
          {displayedText && (
            <div className="text-[#c9d1d9]">
              <span className="text-[#7ee787]">{displayedText}</span>
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="text-[#7ee787]"
              >
                _
              </motion.span>
            </div>
          )}

          {/* Completion message */}
          {isComplete && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 pt-2 border-t border-[#30363d]"
            >
              <span className="text-[#58a6ff]">$</span>
              <span className="text-[#c9d1d9] ml-2">Analys klar. Laddar resultat...</span>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
