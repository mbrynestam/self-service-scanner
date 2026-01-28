import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Globe, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ScannerStep1Props {
  onSubmit: (url: string) => void;
}

export default function ScannerStep1({ onSubmit }: ScannerStep1Props) {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const formLoadTime = useRef(Date.now());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
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
      onSubmit(validUrl);
    } catch {
      setError("Ange en giltig webbadress");
    }
  };

  // Reset form load time when component mounts
  useEffect(() => {
    formLoadTime.current = Date.now();
  }, []);

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
        Se vilka self-service-möjligheter som finns på er webbplats
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
          size="xl"
          className="w-full"
        >
          <Sparkles className="w-5 h-5 mr-2" />
          Analysera min webbplats
        </Button>
      </motion.form>

      {/* Trust indicator */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-xs text-muted-foreground mt-4"
      >
        Tar cirka 30 sekunder • Helt gratis • Inga förpliktelser
      </motion.p>
    </div>
  );
}
