import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Globe, Sparkles, Calculator, Brain, Puzzle, Target, Users, FileCheck, ArrowRight, CheckCircle2, AlertCircle, Calendar, Terminal } from "lucide-react";

interface AIAnalysis {
  isB2B: boolean;
  businessType: string;
  industry?: string;
  coreOffering?: string;
  targetAudience: string;
  buyerRoles: string[];
  painPoints: string[];
  buyerQuestions: string[];
  concerns: string[];
  opportunities: Array<{
    type: FocusArea;
    title: string;
    description: string;
    potentialValue: string;
  }>;
  closingNote?: string;
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

const toolTypeLabels: Record<FocusArea, string> = {
  pricing: "Priskalkylator",
  assessment: "Självtest",
  configurator: "Konfigurator",
  selector: "Lösningsväljare",
  onboarding: "Onboarding",
  partner: "Partner-verktyg",
  scheduling: "Bokning",
  other: "Annat"
};

const defaultOpportunities: Opportunity[] = [
  { id: "pricing", icon: Calculator, title: "Interaktiv priskalkylator", description: "Låt köpare förstå budget innan dialog", value: "Mycket högt" },
  { id: "assessment", icon: Brain, title: "Självtest för behovsanalys", description: "Hjälp köpare förstå sitt behov", value: "Högt" },
  { id: "configurator", icon: Puzzle, title: "Produktkonfigurator", description: "Låt köpare bygga sin lösning", value: "Högt" },
  { id: "selector", icon: Target, title: "Lösningsväljare", description: "Guida köpare till rätt alternativ", value: "Medel-Högt" },
];

export default function HeroSection() {
  const { toast } = useToast();
  const [phase, setPhase] = useState<"input" | "analyzing" | "results" | "form">("input");
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [realProgress, setRealProgress] = useState(0);
  const [formData, setFormData] = useState({ name: "", company: "", email: "", role: "" });
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysis | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  
  // Terminal state
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [currentTypingLine, setCurrentTypingLine] = useState("");
  const [typingIndex, setTypingIndex] = useState(0);
  const [isWaitingForApi, setIsWaitingForApi] = useState(false);
  const [insightsQueue, setInsightsQueue] = useState<string[]>([]);
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
      setTerminalLines([]);
      setCurrentTypingLine("");
      setTypingIndex(0);
      setInsightsQueue([]);
      setAnalysisComplete(false);
      setIsWaitingForApi(true);
      setPhase("analyzing");
      runAnalysis(validUrl);
    } catch {
      setError("Ange en giltig webbadress");
    }
  };

  // Generate terminal-style insights from analysis
  const buildTerminalInsights = (analysis: AIAnalysis): string[] => {
    const insights: string[] = [];
    
    if (analysis.coreOffering) {
      insights.push(`> Kärnverksamhet: ${analysis.coreOffering}`);
    }
    if (analysis.industry) {
      insights.push(`> Bransch: ${analysis.industry}`);
    }
    if (analysis.targetAudience) {
      insights.push(`> Målgrupp: ${analysis.targetAudience}`);
    }
    if (analysis.buyerRoles && analysis.buyerRoles.length > 0) {
      insights.push(`> Köproller: ${analysis.buyerRoles.slice(0, 3).join(", ")}`);
    }
    if (analysis.painPoints && analysis.painPoints.length > 0) {
      insights.push(`> Pain point: "${analysis.painPoints[0]}"`);
    }
    if (analysis.buyerQuestions && analysis.buyerQuestions.length > 0) {
      insights.push(`> Typisk fråga: "${analysis.buyerQuestions[0]}"`);
    }
    if (analysis.concerns && analysis.concerns.length > 0) {
      insights.push(`> Oro: "${analysis.concerns[0]}"`);
    }
    if (analysis.opportunities && analysis.opportunities.length > 0) {
      insights.push(`> Identifierade ${analysis.opportunities.length} self-service-möjligheter`);
    }
    
    return insights;
  };

  // Typewriter effect for terminal lines - triggered when insightsQueue changes
  useEffect(() => {
    if (phase !== "analyzing" || isWaitingForApi) return;
    if (insightsQueue.length === 0) return;
    
    if (typingIndex >= insightsQueue.length) {
      // All insights shown, complete
      const timeout = setTimeout(() => {
        setRealProgress(100);
        setAnalysisComplete(true);
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#74F5A1', '#22c55e', '#10b981', '#34d399']
        });
        setTimeout(() => setPhase("results"), 1000);
      }, 600);
      return () => clearTimeout(timeout);
    }

    const currentLine = insightsQueue[typingIndex];
    let charIndex = 0;
    setCurrentTypingLine("");

    const typeInterval = setInterval(() => {
      if (charIndex < currentLine.length) {
        setCurrentTypingLine(currentLine.substring(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          setTerminalLines(prev => [...prev, currentLine]);
          setCurrentTypingLine("");
          setTypingIndex(prev => prev + 1);
          setRealProgress(prev => Math.min(prev + 12, 95));
        }, 150);
      }
    }, 18);

    return () => clearInterval(typeInterval);
  }, [typingIndex, phase, isWaitingForApi, insightsQueue]);

  const runAnalysis = async (websiteUrl: string) => {
    try {
      console.log("Starting single-call AI analysis for:", websiteUrl);

      const { data, error } = await supabase.functions.invoke('analyze-website', {
        body: { url: websiteUrl },
      });

      if (error) {
        throw new Error(error.message || "API call failed");
      }

      console.log("Analysis response:", data);

      if (data?.analysis) {
        setAiAnalysis(data.analysis as AIAnalysis);
        
        const insights = buildTerminalInsights(data.analysis);
        setTerminalLines([]);
        setTypingIndex(0);
        setRealProgress(15);
        setIsWaitingForApi(false);
        // Trigger typewriter effect by setting insights queue
        setInsightsQueue(insights);
      } else {
        throw new Error("No analysis data returned");
      }
    } catch (err) {
      console.error("AI call failed:", err);
      setAiError(err instanceof Error ? err.message : "Ett fel uppstod vid analysen.");
      setRealProgress(100);
      setIsWaitingForApi(false);
      setTimeout(() => setPhase("results"), 500);
    }
  };

  const getDisplayOpportunities = (): Opportunity[] => {
    if (aiAnalysis?.opportunities && aiAnalysis.opportunities.length > 0) {
      return aiAnalysis.opportunities.slice(0, 6).map(aiOpp => {
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
    return defaultOpportunities;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullName = formData.name.trim();
    const email = formData.email.trim();
    if (!fullName || !email) {
      toast({ title: "Fyll i obligatoriska fält", description: "Namn och e-post måste vara ifyllda.", variant: "destructive" });
      return;
    }
    const [firstName, ...lastParts] = fullName.split(/\s+/);
    const lastName = lastParts.join(" ").trim() || "-";
    try {
      const { error } = await supabase.functions.invoke("submit-to-hubspot", {
        body: {
          firstName,
          lastName,
          email,
          company: formData.company.trim() || undefined,
          role: formData.role.trim() || undefined,
          analyzedUrl: url.trim() || undefined,
          source: "Hero Scanner"
        }
      });
      if (error) throw error;
      toast({ title: "Tack! Vi hör av oss snart.", description: "Din förfrågan är skickad." });
      setFormData({ name: "", company: "", email: "", role: "" });
    } catch (err) {
      console.error("HubSpot submit failed:", err);
      toast({ title: "Något gick fel", description: "Försök igen senare.", variant: "destructive" });
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-y-auto overflow-x-hidden bg-background py-12">
      {/* Background rings animation */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`ring-${i}`}
            className="absolute rounded-full border border-primary/10"
            initial={{ width: 100, height: 100, opacity: 0 }}
            animate={{
              width: [120 + i * 180, 350 + i * 220, 120 + i * 180],
              height: [120 + i * 180, 350 + i * 220, 120 + i * 180],
              opacity: [0.05, 0.15, 0.05]
            }}
            transition={{ duration: 5 + i * 0.7, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
          />
        ))}
        <motion.div
          className="absolute w-16 h-16 rounded-full bg-primary/10"
          animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <AnimatePresence mode="wait">
          {/* PHASE: INPUT */}
          {phase === "input" && (
            <motion.div key="input" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="max-w-3xl mx-auto text-center">
              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-foreground">
                Se vilka self-service-möjligheter som finns på{" "}
                <span className="gradient-text">er webbplats</span>
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                Vår AI analyserar hur era B2B-köpare kan göra mer på egen hand i köpresan så att ni får fler kvalificerade leads, redo att köpa.
              </motion.p>

              <motion.form initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} onSubmit={handleUrlSubmit} className="max-w-xl mx-auto space-y-4">
                <div className="relative">
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    value={url}
                    onChange={e => { setUrl(e.target.value); setError(""); }}
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

              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-sm text-muted-foreground mt-6">
                Helt gratis • Inga förpliktelser • Tar cirka 30 sekunder
              </motion.p>
            </motion.div>
          )}

          {/* PHASE: ANALYZING - Terminal Style */}
          {phase === "analyzing" && (
            <motion.div key="analyzing" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="max-w-2xl mx-auto text-center relative">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {analysisComplete ? "Analys klar!" : "Analyserar er webbplats..."}
              </h2>
              
              <p className="text-muted-foreground mb-6">
                {analysisComplete ? "Vi har hittat följande insikter:" : "AI:n undersöker er köpresa och identifierar möjligheter"}
              </p>

              {/* Progress bar */}
              <div className="max-w-md mx-auto mb-8">
                <div className="h-1 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: `${realProgress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              {/* Insights display - clean text only */}
              <div className="w-full text-sm text-left min-h-[180px] max-h-[180px] overflow-hidden flex flex-col-reverse">
                <div className="space-y-2">
                  {/* Completed lines - faded */}
                  <AnimatePresence>
                    {terminalLines.map((line, index) => {
                      const totalLines = terminalLines.length;
                      const fadeLevel = Math.max(0.2, 1 - (totalLines - index - 1) * 0.15);
                      return (
                        <motion.div 
                          key={index} 
                          initial={{ opacity: 0, y: 10 }} 
                          animate={{ opacity: fadeLevel, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <span className="text-primary">{line}</span>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>

                  {/* Currently typing - full opacity */}
                  {currentTypingLine && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }} 
                      animate={{ opacity: 1, y: 0 }}
                      className="font-medium"
                    >
                      <span className="text-primary">{currentTypingLine}</span>
                      <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.5, repeat: Infinity }} className="text-primary">_</motion.span>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* PHASE: RESULTS */}
          {phase === "results" && (
            <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="max-w-5xl mx-auto">
              <div className="text-center mb-8">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-primary" />
                </motion.div>
                <h2 className="text-2xl md:text-4xl font-bold mb-4">
                  Klar! Här är era <span className="gradient-text">self-service-möjligheter</span>
                </h2>
                {aiError && (
                  <div className="flex items-center justify-center gap-2 text-destructive mb-4">
                    <AlertCircle className="w-5 h-5" />
                    <p className="text-sm">{aiError} Vi visar standardförslag istället.</p>
                  </div>
                )}
              </div>

              <p className="text-muted-foreground text-center mb-4">
                Exempel på vad som är möjligt – inte rekommendationer på vad ni ska bygga.
              </p>

              {/* Masonry grid */}
              {(() => {
                const displayOpps = getDisplayOpportunities().slice(0, 6);
                const count = displayOpps.length;
                const isOdd = count % 2 === 1 && count > 1;
                const gridCols = count === 1 ? "grid-cols-1" : "grid-cols-2 lg:grid-cols-3";
                return (
                  <div className={`w-full grid ${gridCols} gap-3 mb-8 max-w-4xl mx-auto`}>
                    {displayOpps.map((opp, index) => {
                      const isLarge = isOdd && index === 0;
                      const gridClass = isLarge ? "col-span-2 lg:col-span-1" : "";
                      return (
                        <motion.div
                          key={opp.id || index}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.2 + index * 0.06 }}
                          className={`${gridClass} relative rounded-xl bg-card/50 border border-border hover:border-primary/40 transition-all duration-200 p-3`}
                        >
                          <div className="flex flex-col h-full">
                            <span className="inline-block text-[10px] font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary mb-2 w-fit">
                              {toolTypeLabels[opp.toolType || opp.id] || "Annat"}
                            </span>
                            <h3 className={`font-semibold text-foreground leading-tight mb-2 ${isLarge ? 'text-base' : 'text-sm'}`}>
                              {opp.title}
                            </h3>
                            <p className={`text-muted-foreground leading-snug mb-3 flex-1 ${isLarge ? 'text-sm' : 'text-xs'}`}>
                              {opp.description}
                            </p>
                            <div className="flex items-center justify-between gap-2 mt-auto">
                              <span className="text-[10px] text-muted-foreground">Affärsvärde</span>
                              <div className="flex gap-1">
                                {(() => {
                                  const value = opp.value?.toLowerCase() || opp.potentialValue?.toLowerCase() || "";
                                  const dots = value.includes("high") || value.includes("högt") || value.includes("mycket") ? 3 : value.includes("medium") || value.includes("medel") ? 2 : 1;
                                  return Array.from({ length: 3 }).map((_, i) => (
                                    <div key={i} className={`w-2 h-2 rounded-full ${i < dots ? "bg-primary" : "bg-muted"}`} />
                                  ));
                                })()}
                              </div>
                            </div>
                          </div>
                          {index === 0 && <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/10 via-transparent to-transparent pointer-events-none" />}
                        </motion.div>
                      );
                    })}
                  </div>
                );
              })()}

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="text-center mb-8">
                <p className="text-muted-foreground max-w-xl mx-auto">
                  Vilket verktyg som är rätt att bygga beror på er säljprocess, era mål och er interna mognad. Det avgörs bäst tillsammans.
                </p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="text-center">
                <p className="text-sm text-muted-foreground mb-4">Se exempel på hur detta kan se ut i praktiken</p>
                <Button variant="hero" size="xl" onClick={() => setPhase("form")} className="min-w-[300px]">
                  <Calendar className="w-5 h-5 mr-2" />
                  Boka strategimöte
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>
            </motion.div>
          )}

          {/* PHASE: FORM */}
          {phase === "form" && (
            <motion.div key="form" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="max-w-lg mx-auto">
              <button onClick={() => setPhase("results")} className="text-muted-foreground hover:text-foreground mb-6 flex items-center gap-2 text-sm">
                ← Tillbaka till möjligheter
              </button>

              <div className="bg-card/50 rounded-2xl border border-border p-8">
                <div className="text-center mb-6">
                  <div className="w-14 h-14 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Calendar className="w-7 h-7 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Boka strategimöte</h2>
                  <p className="text-muted-foreground">Vi går igenom era möjligheter och visar exempel på hur verktyget kan se ut.</p>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">Namn</label>
                    <Input required value={formData.name} onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))} placeholder="Ditt namn" className="bg-background" />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">Roll</label>
                    <Input required value={formData.role} onChange={e => setFormData(prev => ({ ...prev, role: e.target.value }))} placeholder="T.ex. Marknadschef, VD" className="bg-background" />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">E-post</label>
                    <Input type="email" required value={formData.email} onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))} placeholder="din@email.se" className="bg-background" />
                  </div>
                  <div className="pt-4">
                    <Button type="submit" variant="hero" size="lg" className="w-full">
                      Skicka
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                </form>

                <div className="mt-6 pt-6 border-t border-border text-center">
                  <p className="text-sm text-muted-foreground mb-3">Eller boka tid direkt i kalendern</p>
                  <a href="https://calendly.com/buyr" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary hover:underline font-medium">
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

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
