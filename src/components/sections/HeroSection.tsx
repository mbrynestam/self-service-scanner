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
  const [streamingInsights, setStreamingInsights] = useState<StreamingInsight[]>([]);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const startTimeRef = useRef<number>(0);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

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
      setStreamingInsights([]);
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

  const runAnalysis = async (websiteUrl: string) => {
    startTimeRef.current = Date.now();
    
    // Show progressive "teaser" insights while waiting for AI
    const teaserInsights: StreamingInsight[] = [
      { id: "scan", icon: Search, category: "Skannar", text: websiteUrl.replace(/^https?:\/\//, "").split("/")[0] },
      { id: "detect", icon: Target, category: "Identifierar", text: "verksamhetstyp..." },
      { id: "buyers", icon: Users, category: "Analyserar", text: "köproller..." },
      { id: "pain", icon: AlertTriangle, category: "Hittar", text: "pain points..." },
    ];
    
    // Stream teasers immediately during fetch
    teaserInsights.forEach((insight, index) => {
      setTimeout(() => {
        if (phase === "analyzing" && !aiAnalysis) {
          setStreamingInsights(prev => [...prev, insight]);
          setRealProgress(Math.min(15 + index * 18, 75));
        }
      }, 800 + index * 1200);
    });
    
    // Smooth background progress
    const smoothProgress = () => {
      progressIntervalRef.current = setInterval(() => {
        setRealProgress(prev => {
          const increment = prev < 30 ? 2 : prev < 60 ? 1.5 : prev < 80 ? 1 : 0.3;
          return Math.min(prev + increment, 85);
        });
      }, 500);
    };
    
    smoothProgress();

    try {
      console.log("Starting AI analysis for:", websiteUrl);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000);
      
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
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("AI analysis error:", response.status, errorData);
        setAiError(errorData.error || "Kunde inte analysera webbplatsen. Försök igen.");
        setRealProgress(100);
        setTimeout(() => setPhase("results"), 500);
        return;
      }
      
      const data = await response.json();
      
      if (data?.success && data?.analysis) {
        console.log("AI analysis complete:", data.analysis);
        setAiAnalysis(data.analysis);
        
        // Clear teasers and show real findings immediately
        setStreamingInsights([]);
        
        // Build findings and show them rapidly
        const findings = buildFindings(data.analysis);
        
        // Show real findings quickly - 120ms intervals
        findings.forEach((finding, index) => {
          setTimeout(() => {
            setStreamingInsights(prev => [...prev, finding]);
            setRealProgress(88 + (index + 1) * (12 / findings.length));
          }, index * 120);
        });

        // Complete after findings shown - add pause so user can read insights
        setTimeout(() => {
          setAnalysisComplete(true);
          setRealProgress(100);
          
          // Trigger confetti celebration
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#74F5A1', '#22c55e', '#10b981', '#34d399']
          });
          
          // Pause 1.5s so user can see the insights before results
          setTimeout(() => setPhase("results"), 1500);
        }, findings.length * 150 + 200);
        
      } else if (data?.error) {
        console.error("AI error:", data.error);
        setAiError(data.error);
        setRealProgress(100);
        setTimeout(() => setPhase("results"), 500);
      }
    } catch (err) {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      if (err instanceof Error && err.name === 'AbortError') {
        console.error("AI call timed out");
        setAiError("Analysen tog för lång tid. Försök igen.");
      } else {
        console.error("AI call failed:", err);
        setAiError("Ett fel uppstod vid analysen. Försök igen.");
      }
      setRealProgress(100);
      setTimeout(() => setPhase("results"), 500);
    }
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
              className="max-w-3xl mx-auto text-center"
            >
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

              {/* Large flying badges - no container, free floating */}
              <div className="flex flex-wrap justify-center gap-3 min-h-[140px]">
                <AnimatePresence mode="popLayout">
                  {streamingInsights.map((insight) => {
                    const Icon = insight.icon;
                    return (
                      <motion.div
                        key={insight.id}
                        initial={{ opacity: 0, scale: 0.5, y: 30 }}
                        animate={{ 
                          opacity: 1, 
                          scale: 1, 
                          y: 0,
                          transition: { type: "spring", stiffness: 400, damping: 20 }
                        }}
                        exit={{ opacity: 0, scale: 0.8, y: -20 }}
                        className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-primary/10 border border-primary/30"
                      >
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                          <Icon className="w-4 h-4 text-primary" />
                        </div>
                        <div className="text-left">
                          <span className="text-xs font-medium text-primary uppercase tracking-wider block">{insight.category}</span>
                          <span className="text-sm text-foreground font-medium">{insight.text}</span>
                        </div>
                        {!analysisComplete && (
                          <motion.div
                            animate={{ opacity: [1, 0.3, 1] }}
                            transition={{ duration: 0.5, repeat: Infinity }}
                            className="w-2 h-2 rounded-full bg-primary ml-1"
                          />
                        )}
                        {analysisComplete && (
                          <CheckCircle2 className="w-4 h-4 text-primary ml-1" />
                        )}
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
                
                {streamingInsights.length === 0 && (
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
                    <span>Ansluter till AI...</span>
                  </motion.div>
                )}
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
                      className={`group p-6 rounded-2xl bg-card/50 text-left transition-all duration-300 border-2 ${
                        isSelected 
                          ? "border-primary ring-2 ring-primary/20" 
                          : "border-transparent hover:border-primary"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                          isSelected ? "bg-primary/20" : "bg-primary/10 group-hover:bg-primary/20"
                        }`}>
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
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
                        {/* Always reserve space for checkmark to prevent layout shift */}
                        <div className="w-6 h-6 shrink-0 flex items-center justify-center">
                          {isSelected && (
                            <CheckCircle2 className="w-6 h-6 text-primary" />
                          )}
                        </div>
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
