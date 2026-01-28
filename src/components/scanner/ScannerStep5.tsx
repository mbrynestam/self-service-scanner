import { motion } from "framer-motion";
import { useState } from "react";
import { Sparkles, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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

export default function ScannerStep5({ focusArea, suggestionIndex, url, opportunities, onReset }: ScannerStep5Props) {
  const suggestionTitle = suggestionTitles[focusArea][suggestionIndex] || suggestionTitles[focusArea][0];
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase.functions.invoke('submit-to-hubspot', {
        body: {
          ...formData,
          analyzedUrl: url,
          selectedTool: suggestionTitle,
          focusArea: focusArea,
          opportunities: opportunities.map(o => o.title),
          source: 'Opportunity Scanner',
        },
      });

      if (error) throw error;

      toast({
        title: "Tack! Vi hör av oss snart.",
        description: "Du kommer få din prototyp inom 24 timmar.",
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Något gick fel",
        description: "Försök igen senare.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

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

      {/* Lead Capture Form - Same structure as Kontakt page */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        onSubmit={handleSubmit}
        className="w-full space-y-4"
      >
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="firstName" className="text-xs">Förnamn *</Label>
            <Input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              placeholder="Ditt förnamn"
              className="h-9"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="lastName" className="text-xs">Efternamn *</Label>
            <Input
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              placeholder="Ditt efternamn"
              className="h-9"
            />
          </div>
        </div>
        
        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-xs">E-post *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="din@epost.se"
            className="h-9"
          />
        </div>
        
        <div className="space-y-1.5">
          <Label htmlFor="company" className="text-xs">Företag *</Label>
          <Input
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
            placeholder="Ditt företag"
            className="h-9"
          />
        </div>
        
        <div className="space-y-1.5">
          <Label htmlFor="phone" className="text-xs">Telefon</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="070-123 45 67"
            className="h-9"
          />
        </div>
        
        <div className="space-y-1.5">
          <Label htmlFor="message" className="text-xs">Meddelande</Label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Berätta kort om era behov..."
            rows={3}
            className="resize-none"
          />
        </div>
        
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            "Skickar..."
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Skicka förfrågan
            </>
          )}
        </Button>
      </motion.form>

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

      {/* Reset button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-4"
      >
        <Button variant="ghost" size="sm" onClick={onReset}>
          Gör en ny analys
        </Button>
      </motion.div>
    </div>
  );
}
