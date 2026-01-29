import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Globe, Sparkles, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { checkScannerLimit, recordScannerUse } from "@/hooks/useScannerRateLimit";

interface ScannerStep1Props {
  onSubmit: (url: string) => void;
}

export default function ScannerStep1({ onSubmit }: ScannerStep1Props) {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const formLoadTime = useRef(Date.now());
  
  // Rate limit state
  const [limitStatus, setLimitStatus] = useState(() => checkScannerLimit());

  // Update limit status periodically (for countdown)
  useEffect(() => {
    if (limitStatus.minutesUntilReset !== null) {
      const interval = setInterval(() => {
        setLimitStatus(checkScannerLimit());
      }, 30000); // Check every 30 seconds
      return () => clearInterval(interval);
    }
  }, [limitStatus.minutesUntilReset]);

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
      // Silently reject but show fake success
      return;
    }

    // Bot detection: form submitted too fast (< 2 seconds)
    const timeElapsed = Date.now() - formLoadTime.current;
    if (timeElapsed < 2000) {
      console.log("Bot detected via timing");
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
      
      onSubmit(validUrl);
    } catch {
      setError("Ange en giltig webbadress");
    }
  };

  // Reset form load time when component mounts
  useEffect(() => {
    formLoadTime.current = Date.now();
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
    <div className="flex items-center justify-center min-h-[400px]">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center text-center max-w-sm mx-auto p-6 bg-card/80 backdrop-blur-sm rounded-2xl border border-border/50 shadow-lg"
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.1 }}
          className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3"
        >
          <Sparkles className="w-6 h-6 text-primary" />
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl font-bold mb-2"
        >
          Upptäck self-service-möjligheter
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-muted-foreground mb-5 text-sm"
        >
          Vår AI analyserar hur era köpare kan få mer kontroll i köpresan.
        </motion.p>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          onSubmit={handleSubmit}
          className="w-full space-y-3"
        >
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                setError("");
              }}
              placeholder="www.ertforetag.se"
              className="pl-10 h-11 text-sm bg-background border-border focus:border-primary"
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

        {/* Trust indicator with remaining uses */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-xs text-muted-foreground mt-3"
        >
          ~30 sek • Gratis • {limitStatus.remainingUses} {limitStatus.remainingUses === 1 ? 'kvar' : 'kvar'}
        </motion.p>
      </motion.div>
    </div>
  );
}
