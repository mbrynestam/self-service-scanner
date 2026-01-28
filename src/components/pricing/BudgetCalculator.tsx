import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Target, Zap, Rocket, Sparkles, Wrench, Users, Check, ArrowRight, Calculator } from "lucide-react";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";

type StartLevel = "opportunity" | "prototype" | "innovation" | null;
type ImplementationType = "ai-built" | "custom" | "self" | "undecided" | null;

const startLevels = [
  {
    id: "opportunity" as const,
    icon: Target,
    label: "Förstå möjligheterna",
    name: "Self-Service Opportunity Sprint",
    price: 29000,
    priceLabel: "29 000 kr",
    description: "Identifiera var self-service skapar mest värde i er köpresa.",
    allowsAiBuilt: false,
  },
  {
    id: "prototype" as const,
    icon: Zap,
    label: "Ta fram och testa en lösning",
    name: "Self-Service Prototype Sprint",
    price: 49000,
    priceLabel: "49 000 kr",
    description: "Se hur en konkret lösning kan fungera med klickbar prototyp.",
    recommended: true,
    allowsAiBuilt: true,
  },
  {
    id: "innovation" as const,
    icon: Rocket,
    label: "Ta ett större grepp",
    name: "Innovation Sprint",
    price: 79000,
    priceLabel: "från 79 000 kr",
    description: "För mer avancerade eller affärskritiska initiativ.",
    allowsAiBuilt: false,
  },
];

// Complexity levels for AI-built version (only available with prototype sprint)
const aiBuiltComplexityLevels = [
  { value: 0, label: "Mycket enkel", price: 12500 },
  { value: 1, label: "Enkel", price: 25000 },
  { value: 2, label: "Standard", price: 50000 },
  { value: 3, label: "Avancerad", price: 75000 },
  { value: 4, label: "Mycket komplex", price: 100000 },
];

const implementationTypes = [
  {
    id: "ai-built" as const,
    icon: Sparkles,
    label: "Snabb AI-byggd version",
    description: "Snabb leverans, kodad med AI, enklare integrationer",
    hasSlider: true,
    recommended: true,
    isSecondary: false,
  },
  {
    id: "undecided" as const,
    icon: null,
    label: "Vet inte ännu",
    description: "Jag vill se resultatet av sprinten först",
    hasSlider: false,
    recommended: false,
    isSecondary: false,
    priceRange: null,
    minPrice: 0,
    maxPrice: 0,
  },
];

const secondaryImplementationTypes = [
  {
    id: "custom" as const,
    icon: Wrench,
    label: "Skräddarsydd lösning",
    priceRange: "50 000 – 200 000 kr",
    minPrice: 50000,
    maxPrice: 200000,
    description: "Byggs utifrån prototypen, kodas manuellt, fler integrationsmöjligheter",
    hasSlider: false,
  },
  {
    id: "self" as const,
    icon: Users,
    label: "Bygga själva",
    priceRange: null,
    minPrice: 0,
    maxPrice: 0,
    description: "Arbeta vidare med projektet på egen hand",
    hasSlider: false,
  },
];

export default function BudgetCalculator() {
  const [startLevel, setStartLevel] = useState<StartLevel>(null);
  const [implementationType, setImplementationType] = useState<ImplementationType>(null);
  const [complexityIndex, setComplexityIndex] = useState(1); // Default to "Enkel"

  const selectedStart = startLevels.find((s) => s.id === startLevel);
  const selectedImplementation = implementationTypes.find((i) => i.id === implementationType) 
    || secondaryImplementationTypes.find((i) => i.id === implementationType);
  
  const selectedComplexity = aiBuiltComplexityLevels[complexityIndex];

  // Check if AI-built option is available (only for prototype sprint)
  const canSelectAiBuilt = selectedStart?.allowsAiBuilt === true;

  // Check if slider should be shown (only for AI-built with prototype)
  const shouldShowSlider = () => {
    return implementationType === "ai-built" && canSelectAiBuilt;
  };

  const getAiBuiltPrice = () => {
    return selectedComplexity.price;
  };

  const getTotalRange = () => {
    if (!selectedStart) return null;
    
    if (implementationType === "ai-built" && canSelectAiBuilt) {
      const aiPrice = getAiBuiltPrice();
      return {
        min: selectedStart.price + aiPrice,
        max: selectedStart.price + aiPrice,
        showImplementation: true,
        isSinglePrice: true,
      };
    }
    
    if (!selectedImplementation || !selectedImplementation.minPrice) {
      return {
        min: selectedStart.price,
        max: selectedStart.price,
        showImplementation: false,
        isSinglePrice: true,
      };
    }
    
    return {
      min: selectedStart.price + selectedImplementation.minPrice,
      max: selectedStart.price + selectedImplementation.maxPrice,
      showImplementation: true,
      isSinglePrice: false,
    };
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString("sv-SE") + " kr";
  };

  const totalRange = getTotalRange();

  return (
    <div className="w-full">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
          <Calculator className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">Budgetkalkylator</span>
        </div>
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          Räkna på er satsning
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Se vad ett rimligt första steg kostar – och vad helheten kan bli om ni går vidare.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left column: Steps 1 & 2 */}
        <div className="lg:col-span-2 space-y-8">
          {/* Step 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-2xl border border-border p-6 md:p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                1
              </div>
              <h3 className="font-display text-xl font-bold">Hur vill ni börja?</h3>
            </div>

            <div className="grid gap-4">
              {startLevels.map((level) => {
                const Icon = level.icon;
                const isSelected = startLevel === level.id;
                return (
                    <button
                      key={level.id}
                      onClick={() => {
                        setStartLevel(level.id);
                        setComplexityIndex(1);
                        // Reset implementation type if AI-built was selected but new sprint doesn't allow it
                        if (implementationType === "ai-built" && !level.allowsAiBuilt) {
                          setImplementationType(null);
                        }
                      }}
                    className={cn(
                      "relative w-full text-left p-4 md:p-5 rounded-xl border-2 transition-all duration-200",
                      isSelected
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/40 bg-secondary/30"
                    )}
                  >
                    {level.recommended && (
                      <span className="absolute -top-2.5 right-4 px-3 py-0.5 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                        Rekommenderad
                      </span>
                    )}
                    <div className="flex items-start gap-4">
                      <div
                        className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                          isSelected ? "bg-primary/20" : "bg-secondary"
                        )}
                      >
                        <Icon className={cn("w-5 h-5", isSelected ? "text-primary" : "text-muted-foreground")} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="font-semibold text-foreground">{level.label}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{level.description}</p>
                        <p className="font-display font-bold text-lg text-primary">{level.priceLabel}</p>
                      </div>
                      <div
                        className={cn(
                          "w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-1",
                          isSelected ? "border-primary bg-primary" : "border-muted-foreground/30"
                        )}
                      >
                        {isSelected && <Check className="w-3 h-3 text-primary-foreground" />}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Step 2 */}
          <AnimatePresence>
            {startLevel && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-card rounded-2xl border border-border p-6 md:p-8"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <h3 className="font-display text-xl font-bold">Hur vill ni realisera lösningen sen?</h3>
                </div>
                <p className="text-muted-foreground text-sm mb-6 ml-11">
                  Om lösningen fungerar – hur vill ni gå vidare?
                </p>

                <div className="space-y-4">
                  {/* AI-built option - only shown for prototype sprint */}
                  {canSelectAiBuilt && (
                    <button
                      onClick={() => setImplementationType("ai-built")}
                      className={cn(
                        "relative w-full text-left rounded-xl border-2 transition-all duration-200",
                        implementationType === "ai-built"
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/40 bg-secondary/30"
                      )}
                    >
                      <span className="absolute -top-2.5 right-4 px-3 py-0.5 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                        Rekommenderad
                      </span>
                      <div className="p-4 md:p-5">
                        <div className="flex items-start gap-4">
                          <div
                            className={cn(
                              "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                              implementationType === "ai-built" ? "bg-primary/20" : "bg-secondary"
                            )}
                          >
                            <Sparkles className={cn("w-5 h-5", implementationType === "ai-built" ? "text-primary" : "text-muted-foreground")} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-foreground mb-1">Snabb AI-byggd version</p>
                            <p className="text-sm text-muted-foreground">Snabb leverans, kodad med AI, enklare integrationer</p>
                          </div>
                          <div
                            className={cn(
                              "w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-1",
                              implementationType === "ai-built" ? "border-primary bg-primary" : "border-muted-foreground/30"
                            )}
                          >
                            {implementationType === "ai-built" && <Check className="w-3 h-3 text-primary-foreground" />}
                          </div>
                        </div>
                      </div>
                      
                      {/* Complexity Slider - integrated inside the box */}
                      {implementationType === "ai-built" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="px-4 md:px-5 pb-4 md:pb-5 pt-0"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="p-4 bg-secondary/50 rounded-xl border border-border">
                            <p className="text-sm font-medium text-foreground mb-4">
                              Hur komplex är lösningen?
                            </p>
                            <div className="space-y-4">
                              <Slider
                                value={[complexityIndex]}
                                onValueChange={(value) => setComplexityIndex(value[0])}
                                max={4}
                                min={0}
                                step={1}
                                className="w-full"
                              />
                              <div className="flex justify-between text-xs text-muted-foreground">
                                {aiBuiltComplexityLevels.map((level) => (
                                  <span 
                                    key={level.value}
                                    className={cn(
                                      "transition-colors text-center",
                                      complexityIndex === level.value && "text-primary font-medium"
                                    )}
                                  >
                                    {level.label}
                                  </span>
                                ))}
                              </div>
                              <div className="text-center pt-2">
                                <p className="text-xs text-muted-foreground">Uppskattad kostnad</p>
                                <p className="font-display text-xl font-bold text-primary">
                                  {formatPrice(selectedComplexity.price)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </button>
                  )}

                  {/* Undecided option */}
                  <button
                    onClick={() => setImplementationType("undecided")}
                    className={cn(
                      "relative w-full text-left p-4 md:p-5 rounded-xl border-2 transition-all duration-200",
                      implementationType === "undecided"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/40 bg-secondary/30"
                    )}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-foreground mb-1">Vet inte ännu</p>
                        <p className="text-sm text-muted-foreground">Jag vill se resultatet av sprinten först</p>
                      </div>
                      <div
                        className={cn(
                          "w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-1",
                          implementationType === "undecided" ? "border-primary bg-primary" : "border-muted-foreground/30"
                        )}
                      >
                        {implementationType === "undecided" && <Check className="w-3 h-3 text-primary-foreground" />}
                      </div>
                    </div>
                  </button>

                  {/* Secondary options - smaller styling */}
                  <div className="pt-2 border-t border-border/50">
                    <p className="text-xs text-muted-foreground mb-3">Andra alternativ</p>
                    <div className="grid grid-cols-2 gap-3">
                      {secondaryImplementationTypes.map((impl) => {
                        const Icon = impl.icon;
                        const isSelected = implementationType === impl.id;
                        
                        return (
                          <button
                            key={impl.id}
                            onClick={() => setImplementationType(impl.id)}
                            className={cn(
                              "text-left p-3 rounded-lg border transition-all duration-200",
                              isSelected
                                ? "border-primary bg-primary/5"
                                : "border-border hover:border-primary/40 bg-secondary/20"
                            )}
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <Icon className={cn("w-4 h-4", isSelected ? "text-primary" : "text-muted-foreground")} />
                              <p className="text-sm font-medium text-foreground">{impl.label}</p>
                            </div>
                            <p className="text-xs text-muted-foreground">{impl.description}</p>
                            {impl.priceRange && (
                              <p className="text-xs text-muted-foreground mt-1">{impl.priceRange}</p>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right column: Result */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-card via-card to-primary/5 rounded-2xl border border-primary/20 p-6 md:p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <h3 className="font-display text-xl font-bold">Er investeringsbild</h3>
              </div>

              {!selectedStart ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
                    <ArrowRight className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground">
                    Välj hur ni vill börja för att se er investeringsbild
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Sprint cost */}
                  <div className="bg-secondary/50 rounded-xl p-4">
                    <p className="text-sm text-muted-foreground mb-1">Sprint</p>
                    <p className="text-sm font-medium text-foreground mb-2">{selectedStart.name}</p>
                    <p className="font-display text-2xl font-bold text-primary">
                      {selectedStart.priceLabel}
                    </p>
                  </div>

                  {/* Development cost - shown when implementation is selected */}
                  {implementationType && implementationType !== "self" && (
                    <div className="bg-secondary/30 rounded-xl p-4 border border-dashed border-border">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm text-muted-foreground">Utveckling</p>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                          Valfritt nästa steg
                        </span>
                      </div>
                      <p className="text-sm font-medium text-foreground mb-2">
                        {implementationType === "ai-built" 
                          ? `Snabb AI-byggd version (${selectedComplexity.label.toLowerCase()})`
                          : selectedImplementation?.label}
                      </p>
                      <p className="font-display text-2xl font-bold text-muted-foreground">
                        {implementationType === "ai-built" && canSelectAiBuilt
                          ? formatPrice(getAiBuiltPrice())
                          : selectedImplementation?.priceRange || "–"}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2 italic">
                        Ni väljer själva om och hur ni går vidare efter sprinten
                      </p>
                    </div>
                  )}

                  {/* Total range */}
                  {totalRange && totalRange.showImplementation && (
                    <div className="bg-primary/10 rounded-xl p-4 border border-primary/20">
                      <p className="text-sm text-muted-foreground mb-1">Total investering</p>
                      <p className="font-display text-2xl font-bold text-foreground">
                        {totalRange.isSinglePrice 
                          ? formatPrice(totalRange.min)
                          : `${formatPrice(totalRange.min)} – ${formatPrice(totalRange.max)}`
                        }
                      </p>
                    </div>
                  )}

                  {implementationType === "self" && (
                    <div className="bg-secondary/50 rounded-xl p-4">
                      <p className="text-sm text-muted-foreground mb-1">Utveckling</p>
                      <p className="text-sm font-medium text-foreground">
                        Ni får underlag och prototyp att arbeta vidare med själva eller med valfri partner.
                      </p>
                    </div>
                  )}

                  {implementationType === "undecided" && (
                    <div className="bg-secondary/50 rounded-xl p-4">
                      <p className="text-sm text-muted-foreground mb-1">Utveckling</p>
                      <p className="text-sm font-medium text-foreground">
                        Ni väljer väg framåt efter att ha sett resultatet av sprinten.
                      </p>
                    </div>
                  )}

                  {/* Key message */}
                  <div className="pt-4 border-t border-border">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      <span className="text-primary font-medium">Ni börjar alltid med sprinten.</span> Därefter 
                      väljer ni själva hur långt ni vill ta lösningen.
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
