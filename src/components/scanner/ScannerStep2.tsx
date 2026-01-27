import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Brain, Search, MessageSquare, Lightbulb, CheckCircle2 } from "lucide-react";

interface ScannerStep2Props {
  url: string;
  onComplete: () => void;
}

const analysisSteps = [
  {
    icon: Brain,
    text: "Analyserar er köpresa…",
    duration: 2000,
  },
  {
    icon: Search,
    text: "Identifierar friktion för köpare…",
    duration: 2000,
  },
  {
    icon: MessageSquare,
    text: "Tolkar vanliga frågor och behov…",
    duration: 2000,
  },
  {
    icon: Lightbulb,
    text: "Genererar self-service-möjligheter…",
    duration: 2000,
  },
];

export default function ScannerStep2({ url, onComplete }: ScannerStep2Props) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (currentStep < analysisSteps.length) {
      timeout = setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, analysisSteps[currentStep].duration);
    } else if (!isComplete) {
      setIsComplete(true);
      timeout = setTimeout(() => {
        onComplete();
      }, 1500);
    }

    return () => clearTimeout(timeout);
  }, [currentStep, isComplete, onComplete]);

  const progress = Math.min((currentStep / analysisSteps.length) * 100, 100);

  return (
    <div className="flex flex-col items-center text-center max-w-xl mx-auto px-4">
      {/* Animated orb */}
      <div className="relative w-32 h-32 mb-8">
        {/* Outer glow rings */}
        <motion.div
          className="absolute inset-0 rounded-full bg-primary/20"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.2, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute inset-2 rounded-full bg-primary/30"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.6, 0.3, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.3,
          }}
        />
        
        {/* Core */}
        <motion.div
          className="absolute inset-4 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center"
          animate={{
            boxShadow: [
              "0 0 20px hsl(145 89% 71% / 0.4)",
              "0 0 40px hsl(145 89% 71% / 0.6)",
              "0 0 20px hsl(145 89% 71% / 0.4)",
            ],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {isComplete ? (
            <CheckCircle2 className="w-12 h-12 text-primary-foreground" />
          ) : (
            <Brain className="w-12 h-12 text-primary-foreground" />
          )}
        </motion.div>
      </div>

      {/* URL being analyzed */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-card/50 border border-border rounded-lg px-4 py-2 mb-6"
      >
        <span className="text-sm text-muted-foreground">Analyserar: </span>
        <span className="text-sm font-medium">{url.replace(/^https?:\/\//, "")}</span>
      </motion.div>

      {/* Progress bar */}
      <div className="w-full max-w-xs mb-8">
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Current step text */}
      <div className="h-16">
        {!isComplete ? (
          analysisSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: currentStep === index ? 1 : 0,
                y: currentStep === index ? 0 : 10,
              }}
              className={`flex items-center gap-3 ${currentStep !== index ? "hidden" : ""}`}
            >
              <step.icon className="w-6 h-6 text-primary" />
              <span className="text-lg">{step.text}</span>
            </motion.div>
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-3"
          >
            <CheckCircle2 className="w-6 h-6 text-primary" />
            <span className="text-lg font-semibold">Klar! Här är vad vi hittade.</span>
          </motion.div>
        )}
      </div>

      {/* Analysis facts */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: currentStep >= 2 ? 0.6 : 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 grid grid-cols-3 gap-4 text-center"
      >
        <div>
          <div className="text-2xl font-bold text-primary">12</div>
          <div className="text-xs text-muted-foreground">sidor analyserade</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-primary">8</div>
          <div className="text-xs text-muted-foreground">friktionspunkter</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-primary">4</div>
          <div className="text-xs text-muted-foreground">möjligheter</div>
        </div>
      </motion.div>
    </div>
  );
}
