import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { 
  Globe, 
  Sparkles, 
  Calculator, 
  Brain, 
  Puzzle, 
  Target, 
  Users, 
  FileCheck,
  Calendar,
  ArrowRight,
  Loader2,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  HelpCircle,
  AlertTriangle,
  UserCheck
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

type FocusArea = "pricing" | "assessment" | "configurator" | "selector" | "onboarding" | "partner";

interface Opportunity {
  id: FocusArea;
  icon: React.ElementType;
  title: string;
  description: string;
  value: string;
  businessValuePercent?: number;
}

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

const analysisMessages = [
  { icon: Brain, text: "Analyserar er verksamhet…", baseDuration: 1500 },
  { icon: Target, text: "Identifierar idealkunders köpresa, pain points, vanliga frågor, oro, friktion, motstånd, tveksamhet, rädsla och behov av self-service…", baseDuration: 4000 },
  { icon: Sparkles, text: "Tar fram förslag på rekommenderade self-service-verktyg…", baseDuration: 2000 }
];

export default function HeroSection() {
  const [phase, setPhase] = useState<"input" | "analyzing" | "results" | "form">("input");
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [analysisStep, setAnalysisStep] = useState(0);
  const [stepProgress, setStepProgress] = useState(0);
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [formData, setFormData] = useState({ name: "", company: "", email: "", role: "" });
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysis | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);

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
      setPhase("analyzing");
      runAnalysis(validUrl);
    } catch {
      setError("Ange en giltig webbadress");
    }
  };

  const runAnalysis = async (websiteUrl: string) => {
    let step = 0;
    let aiCallComplete = false;
    let aiResult: AIAnalysis | null = null;
    
    // Start AI analysis in background
    const aiPromise = (async () => {
      try {
        console.log("Starting AI analysis for:", websiteUrl);
        
        // Use fetch with longer timeout instead of supabase.functions.invoke
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 second timeout
        
        const response = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/analyze-website`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
              'apikey': import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            },
            body: JSON.stringify({ url: websiteUrl }),
            signal: controller.signal,
          }
        );
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error("AI analysis error:", response.status, errorData);
          setAiError(errorData.error || "Kunde inte analysera webbplatsen. Försök igen.");
          return null;
        }
        
        const data = await response.json();
        
        if (data?.success && data?.analysis) {
          console.log("AI analysis complete:", data.analysis);
          aiResult = data.analysis;
          setAiAnalysis(data.analysis);
          return data.analysis;
        } else if (data?.error) {
          console.error("AI error:", data.error);
          setAiError(data.error);
          return null;
        }
        return null;
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') {
          console.error("AI call timed out");
          setAiError("Analysen tog för lång tid. Försök igen.");
        } else {
          console.error("AI call failed:", err);
          setAiError("Ett fel uppstod vid analysen. Försök igen.");
        }
        return null;
      } finally {
        aiCallComplete = true;
      }
    })();
    
    const advanceStep = () => {
      if (step >= analysisMessages.length) {
        // Wait for AI to complete before showing results
        const checkAiComplete = () => {
          if (aiCallComplete) {
            setTimeout(() => setPhase("results"), 800);
          } else {
            setTimeout(checkAiComplete, 200);
          }
        };
        checkAiComplete();
        return;
      }
      
      setAnalysisStep(step);
      setStepProgress(0);
      
      // Get base duration and add random variation (±30%)
      const baseTime = analysisMessages[step]?.baseDuration || 1500;
      const variation = baseTime * 0.3 * (Math.random() * 2 - 1);
      const duration = Math.max(800, baseTime + variation);
      
      // Generate random pause points (2-4 pauses per step)
      const numPauses = 2 + Math.floor(Math.random() * 3);
      const pausePoints = Array.from({ length: numPauses }, () => 
        15 + Math.floor(Math.random() * 70) // Pause between 15% and 85%
      ).sort((a, b) => a - b);
      
      let currentProgress = 0;
      let isPaused = false;
      let pauseIndex = 0;
      
      const progressTimer = setInterval(() => {
        if (isPaused) return;
        
        // Check if we should pause
        if (pauseIndex < pausePoints.length && currentProgress >= pausePoints[pauseIndex]) {
          isPaused = true;
          pauseIndex++;
          // Pause for 200-600ms
          const pauseDuration = 200 + Math.random() * 400;
          setTimeout(() => {
            isPaused = false;
          }, pauseDuration);
          return;
        }
        
        // Variable speed: sometimes fast, sometimes slow
        const speedVariation = 0.5 + Math.random() * 1.5;
        const baseIncrement = 100 / (duration / 50);
        currentProgress += baseIncrement * speedVariation;
        
        if (currentProgress >= 100) {
          currentProgress = 100;
          clearInterval(progressTimer);
        }
        setStepProgress(Math.min(100, Math.round(currentProgress)));
      }, 50);
      
      step++;
      setTimeout(advanceStep, duration + (numPauses * 300)); // Account for pauses
    };
    
    advanceStep();
  };

  // Build opportunities list based on AI analysis or fallback to default
  const getDisplayOpportunities = (): Opportunity[] => {
    if (aiAnalysis?.opportunities && aiAnalysis.opportunities.length > 0) {
      // Map AI opportunities to our format
      return aiAnalysis.opportunities.map((aiOpp) => {
        const iconMap: Record<FocusArea, React.ElementType> = {
          pricing: Calculator,
          assessment: Brain,
          configurator: Puzzle,
          selector: Target,
          onboarding: FileCheck,
          partner: Users
        };
        
        return {
          id: aiOpp.type,
          icon: iconMap[aiOpp.type] || Target,
          title: aiOpp.title,
          description: aiOpp.description,
          value: aiOpp.potentialValue,
          businessValuePercent: aiOpp.businessValuePercent
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
              className="max-w-2xl mx-auto text-center"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-8">Analyserar er webbplats...</h2>

              {/* Overall progress bar */}
              <div className="mb-8">
                <div className="h-2 bg-card rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ 
                      width: `${((analysisStep / analysisMessages.length) * 100) + (stepProgress / analysisMessages.length)}%` 
                    }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Totalt: {Math.round(((analysisStep / analysisMessages.length) * 100) + (stepProgress / analysisMessages.length))}%
                </p>
              </div>

              <div className="space-y-4">
                {analysisMessages.map((msg, index) => {
                  const Icon = msg.icon;
                  const isActive = index === analysisStep;
                  const isDone = index < analysisStep;
                  const currentStepProgress = isActive ? stepProgress : isDone ? 100 : 0;
                  
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0.3 }}
                      animate={{ 
                        opacity: isDone || isActive ? 1 : 0.3,
                        scale: isActive ? 1.02 : 1
                      }}
                      className={`p-4 rounded-xl transition-colors ${
                        isActive ? "bg-primary/10 border border-primary/30" : 
                        isDone ? "bg-card/50" : "bg-card/20"
                      }`}
                    >
                      <div className="flex items-center gap-4 mb-2">
                        <Icon className={`w-5 h-5 shrink-0 ${isDone ? "text-primary" : isActive ? "text-primary" : "text-muted-foreground"}`} />
                        <span className={`text-left flex-1 ${isDone || isActive ? "text-foreground" : "text-muted-foreground"}`}>
                          {msg.text}
                        </span>
                        <span className={`text-sm font-medium shrink-0 ${isActive ? "text-primary" : isDone ? "text-primary" : "text-muted-foreground"}`}>
                          {currentStepProgress}%
                        </span>
                        {isDone && <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />}
                      </div>
                      {(isActive || isDone) && (
                        <div className="h-1.5 bg-card/50 rounded-full overflow-hidden ml-9">
                          <motion.div
                            className="h-full bg-primary rounded-full"
                            initial={{ width: "0%" }}
                            animate={{ width: `${currentStepProgress}%` }}
                            transition={{ duration: 0.1 }}
                          />
                        </div>
                      )}
                    </motion.div>
                  );
                })}
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

              {/* Extended Analysis Insights */}
              {hasExtendedAnalysis && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
                >
                  {/* Target Audience */}
                  {aiAnalysis?.targetAudience && (
                    <div className="p-4 rounded-xl bg-card/50 border border-border">
                      <div className="flex items-center gap-2 mb-2">
                        <UserCheck className="w-4 h-4 text-primary" />
                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Målgrupp</span>
                      </div>
                      <p className="text-sm text-foreground">{aiAnalysis.targetAudience}</p>
                    </div>
                  )}

                  {/* Buyer Roles */}
                  {aiAnalysis?.buyerRoles && aiAnalysis.buyerRoles.length > 0 && (
                    <div className="p-4 rounded-xl bg-card/50 border border-border">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="w-4 h-4 text-primary" />
                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Köproller</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {aiAnalysis.buyerRoles.slice(0, 4).map((role, i) => (
                          <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                            {role}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Pain Points */}
                  {aiAnalysis?.painPoints && aiAnalysis.painPoints.length > 0 && (
                    <div className="p-4 rounded-xl bg-card/50 border border-border">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="w-4 h-4 text-primary" />
                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Pain Points</span>
                      </div>
                      <ul className="text-sm text-foreground space-y-1">
                        {aiAnalysis.painPoints.slice(0, 3).map((point, i) => (
                          <li key={i} className="truncate">• {point}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Buyer Questions / Concerns */}
                  {aiAnalysis?.concerns && aiAnalysis.concerns.length > 0 && (
                    <div className="p-4 rounded-xl bg-card/50 border border-border">
                      <div className="flex items-center gap-2 mb-2">
                        <HelpCircle className="w-4 h-4 text-primary" />
                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Oro & Frågor</span>
                      </div>
                      <ul className="text-sm text-foreground space-y-1">
                        {aiAnalysis.concerns.slice(0, 3).map((concern, i) => (
                          <li key={i} className="truncate">• {concern}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              )}

              <p className="text-muted-foreground text-center mb-6">
                Välj det alternativ som passar er bäst:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {getDisplayOpportunities().map((opp, index) => {
                  const Icon = opp.icon;
                  const isSelected = selectedOpportunity?.id === opp.id;
                  return (
                    <motion.button
                      key={opp.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      whileHover={{ scale: 1.03 }}
                      onClick={() => handleOpportunitySelect(opp)}
                      className={`group p-6 rounded-2xl bg-card/50 text-left transition-all duration-300 ${
                        isSelected 
                          ? "border-2 border-primary ring-2 ring-primary/20" 
                          : "border border-transparent hover:border-primary"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                          isSelected ? "bg-primary/20" : "bg-primary/10 group-hover:bg-primary/20"
                        }`}>
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className={`font-semibold mb-1 transition-colors ${
                            isSelected ? "text-primary" : "text-foreground group-hover:text-primary"
                          }`}>
                            {opp.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-3">
                            {opp.description}
                          </p>
                          <div className="flex items-center gap-2 flex-wrap">
                            {opp.businessValuePercent ? (
                              <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary flex items-center gap-1">
                                <TrendingUp className="w-3 h-3" />
                                +{opp.businessValuePercent}% affärsvärde
                              </span>
                            ) : (
                              <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                                {opp.value}
                              </span>
                            )}
                          </div>
                        </div>
                        {isSelected && (
                          <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-center"
              >
                <Button
                  variant="hero"
                  size="xl"
                  onClick={handleProceedToForm}
                  disabled={!selectedOpportunity}
                  className="min-w-[300px]"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Se en gratis prototyp
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <p className="text-sm text-muted-foreground mt-4">
                  Helt utan kostnad • Ingen bindning
                </p>
              </motion.div>
            </motion.div>
          )}

          {/* PHASE: FORM */}
          {phase === "form" && selectedOpportunity && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl mx-auto"
            >
              <button
                onClick={() => setPhase("results")}
                className="text-muted-foreground hover:text-foreground mb-6 flex items-center gap-2 text-sm"
              >
                ← Tillbaka till möjligheter
              </button>

              <div className="bg-card/50 rounded-2xl border border-border p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                    <selectedOpportunity.icon className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{selectedOpportunity.title}</h2>
                    <p className="text-muted-foreground">{selectedOpportunity.description}</p>
                  </div>
                </div>

                <div className="bg-primary/5 rounded-xl p-4 mb-8 border border-primary/20">
                  <p className="text-foreground">
                    Vi tar fram en AI-prototyp som visar hur detta self-service-verktyg skulle kunna fungera för er. Det tar dagar – inte månader.
                  </p>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      <label className="text-sm text-muted-foreground mb-1 block">Företag</label>
                      <Input
                        required
                        value={formData.company}
                        onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                        placeholder="Ert företag"
                        className="bg-background"
                      />
                    </div>
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
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">Roll</label>
                    <Input
                      value={formData.role}
                      onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                      placeholder="T.ex. Marknadschef, VD"
                      className="bg-background"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <Button type="submit" variant="hero" size="lg" className="flex-1">
                      <Calendar className="w-5 h-5 mr-2" />
                      Boka genomgång & få prototyp
                    </Button>
                    <Button type="submit" variant="heroOutline" size="lg" className="flex-1">
                      Skicka prototypen till mig
                    </Button>
                  </div>
                </form>
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
