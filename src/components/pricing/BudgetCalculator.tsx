import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Target, Zap, Rocket, Sparkles, Wrench, Users, Check, ArrowRight, Calculator } from "lucide-react";
import { cn } from "@/lib/utils";

type StartLevel = "opportunity" | "prototype" | "innovation" | null;
type ImplementationType = "ai-built" | "custom" | "self" | null;

const startLevels = [
  {
    id: "opportunity" as const,
    icon: Target,
    label: "Förstå möjligheterna",
    name: "Self-Service Opportunity Sprint",
    price: 25000,
    priceLabel: "25 000 kr",
    description: "Identifiera var self-service skapar mest värde i er köpresa.",
  },
  {
    id: "prototype" as const,
    icon: Zap,
    label: "Ta fram och testa en lösning",
    name: "Self-Service Prototype Sprint",
    price: 50000,
    priceLabel: "50 000 kr",
    description: "Se hur en konkret lösning kan fungera med klickbar prototyp.",
    recommended: true,
  },
  {
    id: "innovation" as const,
    icon: Rocket,
    label: "Ta ett större grepp",
    name: "Innovation Sprint",
    price: 75000,
    priceLabel: "från 75 000 kr",
    description: "För mer avancerade eller affärskritiska initiativ.",
  },
];

const implementationTypes = [
  {
    id: "ai-built" as const,
    icon: Sparkles,
    label: "Snabb AI-byggd version",
    priceRange: "25 000 – 50 000 kr",
    minPrice: 25000,
    maxPrice: 50000,
    description: "Snabb leverans, kodad med AI, enklare integrationer",
  },
  {
    id: "custom" as const,
    icon: Wrench,
    label: "Skräddarsydd lösning",
    priceRange: "50 000 – 200 000 kr",
    minPrice: 50000,
    maxPrice: 200000,
    description: "Byggs utifrån prototypen, kodas manuellt, fler integrationsmöjligheter",
  },
  {
    id: "self" as const,
    icon: Users,
    label: "Bygga själva",
    priceRange: null,
    minPrice: 0,
    maxPrice: 0,
    description: "Arbeta vidare med projektet på egen hand",
  },
];

export default function BudgetCalculator() {
  const [startLevel, setStartLevel] = useState<StartLevel>(null);
  const [implementationType, setImplementationType] = useState<ImplementationType>(null);

  const selectedStart = startLevels.find((s) => s.id === startLevel);
  const selectedImplementation = implementationTypes.find((i) => i.id === implementationType);

  const getTotalRange = () => {
    if (!selectedStart) return null;
    if (!selectedImplementation || !selectedImplementation.minPrice) {
      return {
        min: selectedStart.price,
        max: selectedStart.price,
        showImplementation: false,
      };
    }
    return {
      min: selectedStart.price + selectedImplementation.minPrice,
      max: selectedStart.price + selectedImplementation.maxPrice,
      showImplementation: true,
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
                    onClick={() => setStartLevel(level.id)}
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

                <div className="grid gap-4">
                  {implementationTypes.map((impl) => {
                    const Icon = impl.icon;
                    const isSelected = implementationType === impl.id;
                    return (
                      <button
                        key={impl.id}
                        onClick={() => setImplementationType(impl.id)}
                        className={cn(
                          "w-full text-left p-4 md:p-5 rounded-xl border-2 transition-all duration-200",
                          isSelected
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/40 bg-secondary/30"
                        )}
                      >
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
                            <p className="font-semibold text-foreground mb-1">{impl.label}</p>
                            <p className="text-sm text-muted-foreground mb-2">{impl.description}</p>
                            {impl.priceRange && (
                              <p className="text-sm font-medium text-foreground/80">
                                Typiskt: {impl.priceRange}
                              </p>
                            )}
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
                    <p className="text-sm text-muted-foreground mb-1">Er rekommenderade start</p>
                    <p className="text-sm font-medium text-foreground mb-2">{selectedStart.name}</p>
                    <p className="font-display text-2xl font-bold text-primary">
                      {selectedStart.priceLabel}
                    </p>
                  </div>

                  {/* Total range */}
                  {totalRange && totalRange.showImplementation && selectedImplementation && (
                    <div className="bg-primary/10 rounded-xl p-4 border border-primary/20">
                      <p className="text-sm text-muted-foreground mb-1">Möjlig total investering</p>
                      <p className="text-xs text-muted-foreground mb-2">
                        (Sprint + {selectedImplementation.label.toLowerCase()})
                      </p>
                      <p className="font-display text-2xl font-bold text-foreground">
                        {formatPrice(totalRange.min)} – {formatPrice(totalRange.max)}
                      </p>
                    </div>
                  )}

                  {selectedImplementation?.id === "self" && (
                    <div className="bg-secondary/50 rounded-xl p-4">
                      <p className="text-sm text-muted-foreground mb-1">Implementation</p>
                      <p className="text-sm font-medium text-foreground">
                        Ni får underlag och prototyp att arbeta vidare med själva eller med valfri partner.
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
