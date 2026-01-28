import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Mail, Sparkles, CheckCircle2, User, Building, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { FocusArea, Opportunity } from "./OpportunityScanner";

interface ScannerStep5Props {
  focusArea: FocusArea;
  suggestionIndex: number;
  url: string;
  opportunities: Opportunity[];
  onReset: () => void;
}

const suggestionTitles: Record<FocusArea, string[]> = {
  pricing: ["Interaktiv priskalkylator", "Prisguide med scenarion", "ROI-kalkylator"],
  assessment: ["Självtest för behovsanalys", "Interaktiv mognadsanalys", "Checklista för utvärdering"],
  configurator: ["Produktkonfigurator", "Paketbyggare", "Kapacitetsplanerare"],
  selector: ["Produktväljare", "Jämförelseverktyg", "Rekommendationsmotor"],
};

type SubmitMode = "meeting" | "email";

export default function ScannerStep5({ focusArea, suggestionIndex, url, opportunities, onReset }: ScannerStep5Props) {
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
    
    try {
      // Format opportunities for HubSpot
      const opportunitiesText = opportunities.length > 0
        ? opportunities.map((opp, i) => `${i + 1}. ${opp.title}: ${opp.description}`).join('\n')
        : `Fokusområde: ${focusArea}, Valt förslag: ${suggestionTitle}`;

      // Send to HubSpot via edge function
      const { error } = await supabase.functions.invoke('submit-to-hubspot', {
        body: {
          name: formData.name,
          company: formData.company,
          email: formData.email,
          role: formData.role || '',
          websiteUrl: url,
          opportunities: opportunitiesText,
          selectedTool: suggestionTitle,
          submissionType: mode,
        },
      });

      if (error) {
        console.error('HubSpot submission error:', error);
        throw error;
      }

      setIsSubmitted(true);
      
      toast({
        title: mode === "meeting" ? "✅ Tack! Vi hör av oss inom 24h" : "✅ Prototypen skickas snart!",
        description: `Vi har tagit emot din förfrågan, ${formData.name.split(' ')[0]}. Kolla din inbox för mer information.`,
      });
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Något gick fel",
        description: "Försök igen eller kontakta oss direkt.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center text-center max-w-md mx-auto px-4 py-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring" }}
          className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center mb-4"
        >
          <CheckCircle2 className="w-7 h-7 text-primary" />
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl font-bold mb-2"
        >
          {mode === "meeting" ? "Bokat!" : "På väg!"}
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-sm text-muted-foreground mb-5"
        >
          {mode === "meeting"
            ? "Vi kontaktar dig inom kort för att boka in en genomgång av er prototyp."
            : "Prototypen skickas till din mail inom några dagar."}
        </motion.p>

        <Button variant="outline" size="sm" onClick={onReset}>
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
        className="text-center mb-4"
      >
        <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium mb-3">
          <Sparkles className="w-3 h-3" />
          {suggestionTitle}
        </div>
        
        <h2 className="text-xl md:text-2xl font-bold mb-2">
          Vill du se en klickbar prototyp?
        </h2>
        
        <p className="text-sm text-muted-foreground">
          Vi tar fram en AI-prototyp som visar hur detta verktyg kan fungera för er.
        </p>
      </motion.div>

      {/* Mode selection */}
      {!mode && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full space-y-2"
        >
          <button
            onClick={() => setMode("meeting")}
            className="w-full p-4 bg-card rounded-lg border border-transparent hover:border-primary transition-all duration-300 text-left group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-semibold group-hover:text-primary transition-colors">
                  Boka genomgång & få prototyp
                </h3>
                <p className="text-xs text-muted-foreground">
                  Vi visar prototypen live
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setMode("email")}
            className="w-full p-4 bg-card rounded-lg border border-transparent hover:border-primary/50 transition-all duration-300 text-left group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center group-hover:bg-secondary/80 transition-colors">
                <Mail className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-sm font-semibold group-hover:text-foreground transition-colors text-muted-foreground">
                  Skicka prototypen till mig
                </h3>
                <p className="text-xs text-muted-foreground">
                  Få den direkt till din mail
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
          className="w-full space-y-3"
        >
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="name" className="text-xs flex items-center gap-1">
                <User className="w-3 h-3 text-muted-foreground" />
                Namn *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Anna Andersson"
                required
                className="h-9 text-sm"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="company" className="text-xs flex items-center gap-1">
                <Building className="w-3 h-3 text-muted-foreground" />
                Företag *
              </Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                placeholder="Företaget AB"
                required
                className="h-9 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="email" className="text-xs flex items-center gap-1">
                <Mail className="w-3 h-3 text-muted-foreground" />
                E-post *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="anna@foretaget.se"
                required
                className="h-9 text-sm"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="role" className="text-xs flex items-center gap-1">
                <Briefcase className="w-3 h-3 text-muted-foreground" />
                Roll
              </Label>
              <Input
                id="role"
                value={formData.role}
                onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                placeholder="Marknadschef"
                className="h-9 text-sm"
              />
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setMode(null)}
              className="flex-1"
            >
              Tillbaka
            </Button>
            <Button
              type="submit"
              variant="hero"
              size="sm"
              disabled={isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? (
                "Skickar..."
              ) : mode === "meeting" ? (
                <>
                  <Calendar className="w-3 h-3 mr-1" />
                  Boka
                </>
              ) : (
                <>
                  <Mail className="w-3 h-3 mr-1" />
                  Skicka
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
        className="flex items-center justify-center gap-3 mt-4 text-[10px] text-muted-foreground"
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
