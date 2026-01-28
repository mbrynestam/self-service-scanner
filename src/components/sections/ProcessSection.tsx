import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Search, MousePointer, ArrowRight, Sparkles, Bot, Wrench, Users } from "lucide-react";

const buyerQuestions = [
  "Vad kostar det?",
  "Är detta rätt för oss?",
  "Hur lång tid tar det?",
  "Vad ingår?",
];

const buildOptions = [
  { icon: Bot, label: "Snabb AI-version" },
  { icon: Wrench, label: "Skräddarsytt" },
  { icon: Users, label: "Bygg själva" },
];

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Rätt idé att testa",
    description: "Vi börjar med att förstå era köpare, deras frågor och var affärer ofta fastnar. Tillsammans identifierar vi vilken typ av self-service som gör störst skillnad.",
    result: "En tydlig riktning — vad ni ska testa och varför.",
    hasQuestionBubbles: true,
  },
  {
    number: "02",
    icon: MousePointer,
    title: "Klickbar prototyp på dagar",
    description: "Med hjälp av AI skapar vi snabbt en interaktiv prototyp som ni kan klicka runt i, testa internt och visa för kunder. Ni får uppleva lösningen innan ni bestämmer er för att bygga.",
    result: "Ett konkret underlag för beslut — inte bara en idé.",
    badge: "AI-accelererat",
    hasClickAnimation: true,
  },
  {
    number: "03",
    icon: ArrowRight,
    title: "Bygg vidare när ni vet att det fungerar",
    description: "När ni ser att lösningen skapar värde väljer ni hur ni vill gå vidare: snabb AI-byggd version, mer skräddarsydd lösning eller utveckling i egen regi.",
    result: "En lösning som kan vara live på veckor — inte månader.",
    hasBuildOptions: true,
  },
];

function StepCard({ step, index, isInView }: { step: typeof steps[0]; index: number; isInView: boolean }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex-1"
    >
      <motion.div 
        className="gradient-border rounded-2xl p-6 lg:p-8 card-gradient h-full relative overflow-hidden"
        animate={isHovered ? { 
          boxShadow: "0 0 40px rgba(116, 245, 161, 0.15)" 
        } : { 
          boxShadow: "0 0 0px rgba(116, 245, 161, 0)" 
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Badge */}
        {step.badge && (
          <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/20 border border-primary/30">
            <Sparkles className="w-3 h-3 text-primary" />
            <span className="text-xs font-medium text-primary">{step.badge}</span>
          </div>
        )}

        {/* Icon */}
        <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 relative">
          <step.icon className="w-7 h-7 text-primary" />
          
          {/* Click animation for step 2 */}
          {step.hasClickAnimation && (
            <motion.div
              className="absolute -right-1 -bottom-1 w-4 h-4 rounded-full bg-primary/50"
              animate={{ scale: [1, 1.5, 1], opacity: [0.8, 0, 0.8] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          )}
        </div>

        <p className="text-sm font-mono text-primary mb-2">{step.number}</p>
        <h3 className="font-display text-xl lg:text-2xl font-bold text-foreground mb-3">
          {step.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4">
          {step.description}
        </p>
        
        {/* Result */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 mt-auto">
          <p className="text-sm">
            <span className="text-primary font-medium">Resultat: </span>
            <span className="text-foreground">{step.result}</span>
          </p>
        </div>

        {/* Hover: Question bubbles for step 1 */}
        {step.hasQuestionBubbles && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="absolute -top-2 -right-2 flex flex-col gap-2 pointer-events-none"
          >
            {buyerQuestions.slice(0, 3).map((q, i) => (
              <motion.div
                key={q}
                initial={{ opacity: 0, x: 20 }}
                animate={isHovered ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                className="bg-secondary border border-border rounded-lg px-3 py-1.5 text-xs text-muted-foreground whitespace-nowrap shadow-lg"
              >
                "{q}"
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Hover: Build options for step 3 */}
        {step.hasBuildOptions && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="flex gap-2 mt-4"
          >
            {buildOptions.map((option, i) => (
              <motion.div
                key={option.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isHovered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2, delay: i * 0.1 }}
                className="flex-1 bg-secondary/50 border border-border rounded-lg p-2 text-center"
              >
                <option.icon className="w-4 h-4 text-primary mx-auto mb-1" />
                <p className="text-xs text-muted-foreground">{option.label}</p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function ProcessSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 lg:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground">
            Från idé till fungerande self-service på{" "}
            <span className="gradient-text">rekordtid</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Vi kombinerar affärsinsikter, samarbete med ert säljteam och AI-driven
            prototyping för att snabbt testa nya sätt att hjälpa köpare vidare på egen hand.
          </p>
        </motion.div>

        <div className="relative">
          {/* Animated connecting line - Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-[10%] right-[10%] h-0.5 -translate-y-1/2 z-0">
            <div className="absolute inset-0 bg-border" />
            <motion.div
              className="absolute inset-y-0 left-0 bg-primary"
              initial={{ width: "0%" }}
              animate={isInView ? { width: "100%" } : { width: "0%" }}
              transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
            />
          </div>

          {/* Animated connecting line - Mobile */}
          <div className="lg:hidden absolute left-8 top-[60px] bottom-[60px] w-0.5 z-0">
            <div className="absolute inset-0 bg-border" />
            <motion.div
              className="absolute inset-x-0 top-0 bg-primary"
              initial={{ height: "0%" }}
              animate={isInView ? { height: "100%" } : { height: "0%" }}
              transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
            />
          </div>

          {/* Steps */}
          <div className="flex flex-col lg:flex-row gap-8 relative z-10">
            {steps.map((step, index) => (
              <StepCard key={step.number} step={step} index={index} isInView={isInView} />
            ))}
          </div>
        </div>

        {/* Closing statement */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center text-lg md:text-xl font-display font-semibold text-foreground mt-16"
        >
          <span className="text-muted-foreground">Testa först.</span>{" "}
          <span className="text-muted-foreground">Bygg sen.</span>{" "}
          <span className="gradient-text">Skala när värdet är bevisat.</span>
        </motion.p>
      </div>
    </section>
  );
}
