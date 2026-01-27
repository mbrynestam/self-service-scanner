import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Globe, 
  Sparkles, 
  Calculator, 
  Brain, 
  Puzzle, 
  Target, 
  Users, 
  FileCheck,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Search,
  User,
  Lightbulb,
  AlertTriangle,
  HelpCircle,
  UserCheck,
  Calendar
} from "lucide-react";

interface AIAnalysis {
  isB2B: boolean;
  businessType: string;
  targetAudience: string;
  buyerRoles: string[];
  painPoints: string[];
  buyerQuestions: string[];
  concerns: string[];
  recommended: FocusArea;
  confidence: number;
  reasoning: string;
  opportunities: Array<{
    type: FocusArea;
    title: string;
    description: string;
    potentialValue: string;
    businessValuePercent?: number;
    fit: number;
  }>;
}

type FocusArea = "pricing" | "assessment" | "configurator" | "selector" | "onboarding" | "partner" | "scheduling" | "other";

interface Opportunity {
  id: FocusArea;
  icon: React.ElementType;
  title: string;
  description: string;
  value: string;
  potentialValue?: string;
  toolType?: FocusArea;
}

// Tool type labels for badges
const toolTypeLabels: Record<FocusArea, string> = {
  pricing: "Priskalkylator",
  assessment: "Självtest",
  configurator: "Konfigurator",
  selector: "Lösningsväljare",
  onboarding: "Onboarding",
  partner: "Partner-verktyg",
  scheduling: "Bokning",
  other: "Annat",
};

const opportunities: Opportunity[] = [
  {
    id: "pricing",
    icon: Calculator,
    title: "Interaktiv priskalkylator",
    description: "Låt köpare förstå budget innan dialog",
    value: "Mycket högt"
  },
  {
    id: "assessment",
    icon: Brain,
    title: "Självtest för behovsanalys",
    description: "Hjälp köpare förstå sitt behov",
    value: "Högt"
  },
  {
    id: "configurator",
    icon: Puzzle,
    title: "Produktkonfigurator",
    description: "Låt köpare bygga sin lösning",
    value: "Högt"
  },
  {
    id: "selector",
    icon: Target,
    title: "Lösningsväljare",
    description: "Guida köpare till rätt alternativ",
    value: "Medel-Högt"
  },
  {
    id: "onboarding",
    icon: FileCheck,
    title: "Self-service onboarding",
    description: "Automatisera kunduppstart",
    value: "Medel"
  },
  {
    id: "partner",
    icon: Users,
    title: "Partner-verktyg",
    description: "Digitalisera partnerprocesser",
    value: "Medel"
  }
];

// Insight types for the streaming display
interface StreamingInsight {
  id: string;
  icon: React.ElementType;
  category: string;
  text: string;
}

export default function HeroSection() {
  const [phase, setPhase] = useState<"input" | "analyzing" | "results" | "form">("input");
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [realProgress, setRealProgress] = useState(0);
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [formData, setFormData] = useState({ name: "", company: "", email: "", role: "" });
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysis | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);
  const [currentInsight, setCurrentInsight] = useState<StreamingInsight | null>(null);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const startTimeRef = useRef<number>(0);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const insightQueueRef = useRef<StreamingInsight[]>([]);

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let validUrl = url.trim();
    if (!validUrl) {
      setError("Ange en webbadress");
      return;
    }
    if (!validUrl.startsWith("http://") && !validUrl.startsWith("https://")) {
      validUrl = "https://" + validUrl;
    }
    try {
      new URL(validUrl);
      setError("");
      setAiError(null);
      setAiAnalysis(null);
      setRealProgress(0);
      setCurrentInsight(null);
      insightQueueRef.current = [];
      setAnalysisComplete(false);
      setPhase("analyzing");
      runAnalysis(validUrl);
    } catch {
      setError("Ange en giltig webbadress");
    }
  };

  // Build 4-5 key findings as flying badges
  const buildFindings = (analysis: AIAnalysis): StreamingInsight[] => {
    const findings: StreamingInsight[] = [];
    
    if (analysis.targetAudience) {
      const shortAudience = analysis.targetAudience.split(/[,.]/).map(s => s.trim()).find(s => s.length > 10 && s.length < 40) 
        || analysis.targetAudience.substring(0, 35);
      findings.push({
        id: "audience",
        icon: User,
        category: "Målgrupp",
        text: shortAudience.length > 35 ? shortAudience.substring(0, 35) + "..." : shortAudience
      });
    }
    
    if (analysis.buyerRoles?.length > 0) {
      findings.push({
        id: "role",
        icon: Users,
        category: "Köproll",
        text: analysis.buyerRoles[0]
      });
    }
    
    if (analysis.painPoints?.length > 0) {
      const pain = analysis.painPoints[0];
      findings.push({
        id: "pain",
        icon: AlertTriangle,
        category: "Pain Point",
        text: pain.length > 35 ? pain.substring(0, 35) + "..." : pain
      });
    }
    
    if (analysis.businessType) {
      findings.push({
        id: "type",
        icon: Target,
        category: "Bransch",
        text: analysis.businessType
      });
    }
    
    if (analysis.opportunities?.length > 0) {
      findings.push({
        id: "rec",
        icon: Lightbulb,
        category: "Bästa match",
        text: analysis.opportunities[0].title
      });
    }

    return findings.slice(0, 5);
  };

  // Show insights one at a time with fade in/out
  const showInsightSequence = (insights: StreamingInsight[], onComplete: () => void) => {
    let index = 0;
    const showNext = () => {
      if (index < insights.length) {
        setCurrentInsight(insights[index]);
        index++;
        // Show each insight for 1.8 seconds, then fade and show next
        setTimeout(showNext, 1800);
      } else {
        onComplete();
      }
    };
    showNext();
  };

  const runAnalysis = async (websiteUrl: string) => {
    startTimeRef.current = Date.now();
    const MIN_DURATION = 10000; // Minimum 10 seconds
    
    // Show initial scanning message
    setCurrentInsight({ id: "scan", icon: Search, category: "Skannar", text: websiteUrl.replace(/^https?:\/\//, "").split("/")[0] });
    setRealProgress(5);

    // Smooth progress animation
    progressIntervalRef.current = setInterval(() => {
      setRealProgress(prev => {
        const increment = prev < 30 ? 1 : prev < 60 ? 0.8 : prev < 85 ? 0.5 : 0.2;
        return Math.min(prev + increment, 90);
      });
    }, 300);

    const apiCall = async (step: string) => {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/analyze-website`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
            'apikey': import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          },
          body: JSON.stringify({ url: websiteUrl, step }),
        }
      );
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Step ${step} failed`);
      }
      return response.json();
    };

    const collectedInsights: StreamingInsight[] = [];
    const mergedAnalysis: Partial<AIAnalysis> = {};

    try {
      console.log("Starting parallel AI analysis for:", websiteUrl);
      
      // Launch all 3 steps in parallel
      const [audienceResult, questionsResult, opportunitiesResult] = await Promise.allSettled([
        apiCall("audience"),
        apiCall("questions"),
        apiCall("opportunities")
      ]);

      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);

      // Process audience results
      if (audienceResult.status === "fulfilled" && audienceResult.value?.analysis) {
        const a = audienceResult.value.analysis;
        Object.assign(mergedAnalysis, a);
        if (a.targetAudience) {
          collectedInsights.push({ id: "audience", icon: User, category: "Målgrupp", text: a.targetAudience });
        }
        if (a.buyerRoles?.length > 0) {
          collectedInsights.push({ id: "roles", icon: Users, category: "Köproller", text: a.buyerRoles.join(", ") });
        }
      }

      // Process questions results
      if (questionsResult.status === "fulfilled" && questionsResult.value?.analysis) {
        const q = questionsResult.value.analysis;
        Object.assign(mergedAnalysis, q);
        if (q.buyerQuestions?.length > 0) {
          collectedInsights.push({ id: "question", icon: HelpCircle, category: "Typisk fråga", text: `"${q.buyerQuestions[0]}"` });
        }
        if (q.painPoints?.length > 0) {
          collectedInsights.push({ id: "pain", icon: AlertTriangle, category: "Pain Point", text: q.painPoints[0] });
        }
      }

      // Process opportunities results
      if (opportunitiesResult.status === "fulfilled" && opportunitiesResult.value?.analysis) {
        const o = opportunitiesResult.value.analysis;
        Object.assign(mergedAnalysis, o);
        if (o.opportunities?.length > 0) {
          collectedInsights.push({ id: "rec", icon: Lightbulb, category: "Bästa möjlighet", text: o.opportunities[0].title });
        }
      }

      // Calculate how long we've been running
      const elapsed = Date.now() - startTimeRef.current;
      const remainingTime = Math.max(0, MIN_DURATION - elapsed);

      // Wait if needed to hit minimum duration
      if (remainingTime > 0) {
        await new Promise(resolve => setTimeout(resolve, remainingTime / 2));
      }

      // Show collected insights one by one
      if (collectedInsights.length > 0 && (mergedAnalysis.targetAudience || mergedAnalysis.opportunities)) {
        setAiAnalysis(mergedAnalysis as AIAnalysis);
        
        showInsightSequence(collectedInsights, () => {
          // Ensure minimum total time
          const totalElapsed = Date.now() - startTimeRef.current;
          const finalWait = Math.max(0, MIN_DURATION - totalElapsed);
          
          setTimeout(() => {
            setRealProgress(100);
            setAnalysisComplete(true);
            
            confetti({
              particleCount: 80,
              spread: 70,
              origin: { y: 0.6 },
              colors: ['#74F5A1', '#22c55e', '#10b981', '#34d399']
            });
            
            setTimeout(() => setPhase("results"), 1000);
          }, finalWait);
        });
      } else {
        setAiError("Kunde inte analysera webbplatsen. Försök igen.");
        setRealProgress(100);
        setTimeout(() => setPhase("results"), 500);
      }
    } catch (err) {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      console.error("AI call failed:", err);
      setAiError(err instanceof Error ? err.message : "Ett fel uppstod vid analysen.");
      setRealProgress(100);
      setTimeout(() => setPhase("results"), 500);
    }
  };

  // Build opportunities list based on AI analysis or fallback to default
  const getDisplayOpportunities = (): Opportunity[] => {
    if (aiAnalysis?.opportunities && aiAnalysis.opportunities.length > 0) {
      // Map AI opportunities to our format
      return aiAnalysis.opportunities.slice(0, 6).map((aiOpp) => {
        const iconMap: Record<FocusArea, React.ElementType> = {
          pricing: Calculator,
          assessment: Brain,
          configurator: Puzzle,
          selector: Target,
          onboarding: FileCheck,
          partner: Users,
          scheduling: Calendar,
          other: Sparkles
        };
        
        return {
          id: aiOpp.type,
          icon: iconMap[aiOpp.type] || Target,
          title: aiOpp.title,
          description: aiOpp.description,
          value: aiOpp.potentialValue || "medium",
          potentialValue: aiOpp.potentialValue,
          toolType: aiOpp.type
        };
      });
    }
    return opportunities;
  };

  const handleOpportunitySelect = (opp: Opportunity) => {
    setSelectedOpportunity(opp);
  };

  const handleProceedToForm = () => {
    if (selectedOpportunity) {
      setPhase("form");
    }
  };

  // Check if we have extended analysis data
  const hasExtendedAnalysis = aiAnalysis && (
    aiAnalysis.targetAudience || 
    (aiAnalysis.buyerRoles && aiAnalysis.buyerRoles.length > 0) ||
    (aiAnalysis.painPoints && aiAnalysis.painPoints.length > 0)
  );

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would submit the form data
    console.log("Form submitted:", { ...formData, opportunity: selectedOpportunity?.id, url });
    alert("Tack! Vi återkommer inom kort.");
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-background py-20">
      {/* Glow Effect */}
      <div className="hero-glow top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <AnimatePresence mode="wait">
          {/* PHASE: INPUT */}
          {phase === "input" && (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-3xl mx-auto text-center"
            >
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-foreground"
              >
                Se vilka self-service-möjligheter som finns på{" "}
                <span className="gradient-text">er webbplats</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
              >
                Vår AI analyserar hur era köpare kan få mer kontroll i köpresan – på 60 sekunder.
              </motion.p>

              <motion.form
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                onSubmit={handleUrlSubmit}
                className="max-w-xl mx-auto space-y-4"
              >
                <div className="relative">
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    value={url}
                    onChange={(e) => {
                      setUrl(e.target.value);
                      setError("");
                    }}
                    placeholder="www.ertforetag.se"
                    className="pl-12 h-14 text-lg bg-card border-border focus:border-primary"
                  />
                </div>
                
                {error && <p className="text-destructive text-sm">{error}</p>}

                <Button type="submit" variant="hero" size="xl" className="w-full">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Analysera min webbplats
                </Button>
              </motion.form>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-sm text-muted-foreground mt-6"
              >
                Helt gratis • Inga förpliktelser • Tar cirka 30 sekunder
              </motion.p>
            </motion.div>
          )}

          {/* PHASE: ANALYZING */}
          {phase === "analyzing" && (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-3xl mx-auto text-center relative"
            >
              {/* Pulsating background glow */}
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.15, 0.3, 0.15]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 -z-10 blur-3xl"
                style={{
                  background: "radial-gradient(circle at center, hsl(var(--primary)) 0%, transparent 70%)",
                  transform: "translateY(-20%)"
                }}
              />

              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {analysisComplete ? "Analys klar!" : "Analyserar er webbplats..."}
              </h2>
              
              <p className="text-muted-foreground mb-8">
                {analysisComplete ? "Vi har hittat följande insikter:" : "AI:n undersöker er köpresa och identifierar möjligheter"}
              </p>

              {/* Progress bar - slim and elegant */}
              <div className="max-w-md mx-auto mb-12">
                <div className="h-1.5 bg-card rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: `${realProgress}%` }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* Single insight display - one at a time, clean text */}
              <div className="min-h-[120px] flex items-center justify-center">
                <AnimatePresence mode="wait">
                  {currentInsight && (
                    <motion.div
                      key={currentInsight.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="text-center max-w-xl"
                    >
                      <motion.span 
                        className="text-sm font-medium text-primary uppercase tracking-widest block mb-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                      >
                        {currentInsight.category}
                      </motion.span>
                      <motion.p 
                        className="text-xl md:text-2xl text-foreground font-medium leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        {currentInsight.text}
                      </motion.p>
                      <motion.div
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="mt-6 flex justify-center gap-1"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                        <div className="w-1.5 h-1.5 rounded-full bg-primary/30" />
                      </motion.div>
                    </motion.div>
                  )}
                  
                  {!currentInsight && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center gap-3 text-muted-foreground"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full"
                      />
                      <span>Startar analys...</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* PHASE: RESULTS */}
          {phase === "results" && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-5xl mx-auto"
            >
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center"
                >
                  <CheckCircle2 className="w-8 h-8 text-primary" />
                </motion.div>
                <h2 className="text-2xl md:text-4xl font-bold mb-4">
                  Klar! Här är era <span className="gradient-text">self-service-möjligheter</span>
                </h2>
                {aiAnalysis?.reasoning && (
                  <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-4">
                    {aiAnalysis.reasoning}
                  </p>
                )}
                {aiError && (
                  <div className="flex items-center justify-center gap-2 text-destructive mb-4">
                    <AlertCircle className="w-5 h-5" />
                    <p className="text-sm">{aiError} Vi visar standardförslag istället.</p>
                  </div>
                )}
              </div>


              <p className="text-muted-foreground text-center mb-6">
                Exempel på vad som är möjligt – inte rekommendationer på vad ni ska bygga.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {getDisplayOpportunities().map((opp, index) => {
                  const Icon = opp.icon;
                  return (
                    <motion.div
                      key={opp.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="p-6 rounded-2xl bg-card/50 border border-border"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          {/* Tool type badge */}
                          <span className="inline-block text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary mb-2">
                            {toolTypeLabels[opp.toolType || opp.id] || "Annat"}
                          </span>
                          <h3 className="text-lg font-semibold mb-2 text-foreground">
                            {opp.title}
                          </h3>
                          <p className="text-base text-muted-foreground mb-4">
                            {opp.description}
                          </p>
                          {/* Value dots: 1-3 dots for low/medium/high */}
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">Affärsvärde:</span>
                            <div className="flex gap-1">
                              {(() => {
                                const value = opp.value?.toLowerCase() || opp.potentialValue?.toLowerCase() || "";
                                const dots = value.includes("high") || value.includes("högt") || value.includes("mycket") ? 3 
                                  : value.includes("medium") || value.includes("medel") ? 2 : 1;
                                return Array.from({ length: 3 }).map((_, i) => (
                                  <div 
                                    key={i} 
                                    className={`w-2.5 h-2.5 rounded-full ${i < dots ? "bg-primary" : "bg-muted"}`} 
                                  />
                                ));
                              })()}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Explanatory text */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-center mb-8"
              >
                <p className="text-muted-foreground max-w-xl mx-auto">
                  Vilket verktyg som är rätt att bygga beror på er säljprocess, era mål och er interna mognad.
                  Det avgörs bäst tillsammans.
                </p>
              </motion.div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-center"
              >
                <p className="text-sm text-muted-foreground mb-4">
                  Se exempel på hur detta kan se ut i praktiken
                </p>
                <Button
                  variant="hero"
                  size="xl"
                  onClick={() => setPhase("form")}
                  className="min-w-[300px]"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Boka strategimöte
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>
            </motion.div>
          )}

          {/* PHASE: FORM */}
          {phase === "form" && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-lg mx-auto"
            >
              <button
                onClick={() => setPhase("results")}
                className="text-muted-foreground hover:text-foreground mb-6 flex items-center gap-2 text-sm"
              >
                ← Tillbaka till möjligheter
              </button>

              <div className="bg-card/50 rounded-2xl border border-border p-8">
                <div className="text-center mb-6">
                  <div className="w-14 h-14 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Calendar className="w-7 h-7 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Boka strategimöte</h2>
                  <p className="text-muted-foreground">
                    Vi går igenom era möjligheter och visar exempel på hur verktyget kan se ut.
                  </p>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">Namn</label>
                    <Input
                      required
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Ditt namn"
                      className="bg-background"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">Roll</label>
                    <Input
                      required
                      value={formData.role}
                      onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                      placeholder="T.ex. Marknadschef, VD"
                      className="bg-background"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">E-post</label>
                    <Input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="din@email.se"
                      className="bg-background"
                    />
                  </div>

                  <div className="pt-4">
                    <Button type="submit" variant="hero" size="lg" className="w-full">
                      Skicka
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                </form>

                <div className="mt-6 pt-6 border-t border-border text-center">
                  <p className="text-sm text-muted-foreground mb-3">
                    Eller boka tid direkt i kalendern
                  </p>
                  <a
                    href="https://calendly.com/buyr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
                  >
                    <Calendar className="w-4 h-4" />
                    Öppna Calendly
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
