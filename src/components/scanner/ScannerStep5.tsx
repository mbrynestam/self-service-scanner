import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Mail, Sparkles, CheckCircle2, User, Building, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import type { FocusArea } from "./OpportunityScanner";

interface ScannerStep5Props {
  focusArea: FocusArea;
  suggestionIndex: number;
  onReset: () => void;
}

const suggestionTitles: Record<FocusArea, string[]> = {
  pricing: ["Interaktiv priskalkylator", "Prisguide med scenarion", "ROI-kalkylator"],
  assessment: ["Självtest för behovsanalys", "Interaktiv mognadsanalys", "Checklista för utvärdering"],
  configurator: ["Produktkonfigurator", "Paketbyggare", "Kapacitetsplanerare"],
  selector: ["Produktväljare", "Jämförelseverktyg", "Rekommendationsmotor"],
};

type SubmitMode = "meeting" | "email";

export default function ScannerStep5({ focusArea, suggestionIndex, onReset }: ScannerStep5Props) {
  const [mode, setMode] = useState<SubmitMode | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    role: "",
  });
  const { toast } = useToast();

  const suggestionTitle = suggestionTitles[focusArea][suggestionIndex] || suggestionTitles[focusArea][0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.company || !formData.email) {
      toast({
        title: "Fyll i alla obligatoriska fält",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    toast({
      title: mode === "meeting" ? "Tack! Vi hör av oss inom 24h" : "Prototypen skickas snart!",
      description: "Kolla din inbox för mer information.",
    });
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center text-center max-w-md mx-auto px-4 py-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring" }}
          className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-6"
        >
          <CheckCircle2 className="w-10 h-10 text-primary" />
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold mb-3"
        >
          {mode === "meeting" ? "Bokat!" : "På väg!"}
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-muted-foreground mb-8"
        >
          {mode === "meeting"
            ? "Vi kontaktar dig inom kort för att boka in en genomgång av er prototyp."
            : "Prototypen skickas till din mail inom några dagar."}
        </motion.p>

        <Button variant="outline" onClick={onReset}>
          Gör en ny analys
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center max-w-lg mx-auto px-4">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
          <Sparkles className="w-4 h-4" />
          {suggestionTitle}
        </div>
        
        <h2 className="text-2xl md:text-3xl font-bold mb-3">
          Vill du se en klickbar prototyp för detta på er webbplats?
        </h2>
        
        <p className="text-muted-foreground">
          Vi tar fram en AI-prototyp som visar hur detta self-service-verktyg skulle kunna fungera för er. Det tar dagar – inte månader.
        </p>
      </motion.div>

      {/* Mode selection */}
      {!mode && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full space-y-3"
        >
          <button
            onClick={() => setMode("meeting")}
            className="w-full p-5 bg-card rounded-xl border border-transparent hover:border-primary transition-all duration-300 text-left group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold group-hover:text-primary transition-colors">
                  Boka genomgång & få prototyp
                </h3>
                <p className="text-sm text-muted-foreground">
                  Vi visar prototypen live och diskuterar nästa steg
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setMode("email")}
            className="w-full p-5 bg-card rounded-xl border border-transparent hover:border-primary/50 transition-all duration-300 text-left group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center group-hover:bg-secondary/80 transition-colors">
                <Mail className="w-6 h-6 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-semibold group-hover:text-foreground transition-colors text-muted-foreground">
                  Skicka prototypen till mig
                </h3>
                <p className="text-sm text-muted-foreground">
                  Få prototypen skickad direkt till din mail
                </p>
              </div>
            </div>
          </button>
        </motion.div>
      )}

      {/* Form */}
      {mode && (
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="w-full space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="w-4 h-4 text-muted-foreground" />
                Namn *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Anna Andersson"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company" className="flex items-center gap-2">
                <Building className="w-4 h-4 text-muted-foreground" />
                Företag *
              </Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                placeholder="Företaget AB"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-muted-foreground" />
              E-post *
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="anna@foretaget.se"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role" className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-muted-foreground" />
              Roll
            </Label>
            <Input
              id="role"
              value={formData.role}
              onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
              placeholder="Marknadschef"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setMode(null)}
              className="flex-1"
            >
              Tillbaka
            </Button>
            <Button
              type="submit"
              variant="hero"
              disabled={isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? (
                "Skickar..."
              ) : mode === "meeting" ? (
                <>
                  <Calendar className="w-4 h-4 mr-2" />
                  Boka genomgång
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4 mr-2" />
                  Skicka prototyp
                </>
              )}
            </Button>
          </div>
        </motion.form>
      )}

      {/* Trust indicators */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex items-center justify-center gap-4 mt-8 text-xs text-muted-foreground"
      >
        <span>🔒 GDPR-säkert</span>
        <span>•</span>
        <span>Inga förpliktelser</span>
        <span>•</span>
        <span>Svar inom 24h</span>
      </motion.div>
    </div>
  );
}
