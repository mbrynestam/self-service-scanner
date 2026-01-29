import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Globe, Sparkles, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { checkScannerLimit, recordScannerUse } from "@/hooks/useScannerRateLimit";

// Generate a simple bot protection token based on user interactions
function generateBotToken(interactionCount: number, formLoadTime: number): string {
  const timeOnPage = Date.now() - formLoadTime;
  const data = `${interactionCount}-${timeOnPage}-${navigator.userAgent.length}`;
  // Simple hash for verification
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return `${Math.abs(hash).toString(36)}-${interactionCount}-${Math.floor(timeOnPage / 1000)}`;
}

interface ScannerStep1Props {
  onSubmit: (url: string, botToken?: string) => void;
}

export default function ScannerStep1({ onSubmit }: ScannerStep1Props) {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const formLoadTime = useRef(Date.now());
  const interactionCount = useRef(0);
  const hasInteracted = useRef(false);
  
  // Rate limit state
  const [limitStatus, setLimitStatus] = useState(() => checkScannerLimit());

  // Update limit status periodically (for countdown)
  useEffect(() => {
    if (limitStatus.minutesUntilReset !== null) {
      const interval = setInterval(() => {
        setLimitStatus(checkScannerLimit());
      }, 30000);
      return () => clearInterval(interval);
    }
  }, [limitStatus.minutesUntilReset]);

  // Track user interactions to detect bots
  useEffect(() => {
    const trackInteraction = () => {
      interactionCount.current++;
      hasInteracted.current = true;
    };

    // Track various user interactions
    window.addEventListener('mousemove', trackInteraction, { passive: true });
    window.addEventListener('touchstart', trackInteraction, { passive: true });
    window.addEventListener('keydown', trackInteraction, { passive: true });
    window.addEventListener('scroll', trackInteraction, { passive: true });

    return () => {
      window.removeEventListener('mousemove', trackInteraction);
      window.removeEventListener('touchstart', trackInteraction);
      window.removeEventListener('keydown', trackInteraction);
      window.removeEventListener('scroll', trackInteraction);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check rate limit first
    const currentLimit = checkScannerLimit();
    if (!currentLimit.allowed) {
      setLimitStatus(currentLimit);
      return;
    }
    
    // Bot detection: honeypot field should be empty
    if (honeypot) {
      console.log("Bot detected via honeypot");
      return;
    }

    // Bot detection: form submitted too fast (< 3 seconds)
    const timeElapsed = Date.now() - formLoadTime.current;
    if (timeElapsed < 3000) {
      console.log("Bot detected via timing");
      return;
    }

    // Bot detection: no user interaction detected
    if (!hasInteracted.current || interactionCount.current < 2) {
      console.log("Bot detected via lack of interaction");
      return;
    }
    
    // Basic URL validation
    let validUrl = url.trim();
    if (!validUrl) {
      setError("Ange en webbadress");
      return;
    }
    
    // Add https:// if missing
    if (!validUrl.startsWith("http://") && !validUrl.startsWith("https://")) {
      validUrl = "https://" + validUrl;
    }
    
    try {
      new URL(validUrl);
      setError("");
      
      // Record the usage before proceeding
      recordScannerUse();
      setLimitStatus(checkScannerLimit());
      
      // Generate bot protection token
      const botToken = generateBotToken(interactionCount.current, formLoadTime.current);
      
      onSubmit(validUrl, botToken);
    } catch {
      setError("Ange en giltig webbadress");
    }
  };

  // Reset form load time when component mounts
  useEffect(() => {
    formLoadTime.current = Date.now();
    interactionCount.current = 0;
    hasInteracted.current = false;
  }, []);

  // Show rate limit message if paused
  if (!limitStatus.allowed && limitStatus.minutesUntilReset !== null) {
    return (
      <div className="flex flex-col items-center text-center max-w-2xl mx-auto px-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.1 }}
          className="w-14 h-14 rounded-xl bg-muted flex items-center justify-center mb-4"
        >
          <Clock className="w-7 h-7 text-muted-foreground" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl md:text-2xl font-bold mb-2"
        >
          Scannern tar en paus
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-muted-foreground mb-6 text-base"
        >
          Du har använt scannern 3 gånger. Kom tillbaka om cirka {limitStatus.minutesUntilReset} {limitStatus.minutesUntilReset === 1 ? 'minut' : 'minuter'}.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-sm text-muted-foreground"
        >
          Vill du diskutera möjligheterna direkt?{" "}
          <a href="/kontakt" className="text-primary hover:underline">
            Kontakta oss
          </a>
        </motion.p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center text-center max-w-2xl mx-auto px-4">
      {/* Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", delay: 0.1 }}
        className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4"
      >
        <Sparkles className="w-7 h-7 text-primary" />
      </motion.div>

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-xl md:text-2xl font-bold mb-2"
      >
        Upptäck self-service-möjligheter
      </motion.h2>

      {/* Subtext */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-muted-foreground mb-6 text-base"
      >
        Vår AI analyserar hur era köpare kan få mer kontroll i köpresan.
      </motion.p>

      {/* Form */}
      <motion.form
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-4"
      >
        <div className="relative">
          <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setError("");
            }}
            placeholder="www.ertforetag.se"
            className="pl-10 h-12 text-base bg-background border-border focus:border-primary"
          />
        </div>

        {/* Honeypot field - invisible to humans, bots will fill it */}
        <input
          type="text"
          name="website_url_confirm"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "-9999px",
            opacity: 0,
            height: 0,
            width: 0,
            pointerEvents: "none",
          }}
        />
        
        {error && (
          <p className="text-destructive text-sm">{error}</p>
        )}

        <Button
          type="submit"
          variant="hero"
          size="lg"
          className="w-full"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          Analysera
        </Button>
      </motion.form>

      {/* Trust indicator */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-xs text-muted-foreground mt-4"
      >
        ~30 sek • Gratis
      </motion.p>
    </div>
  );
}
