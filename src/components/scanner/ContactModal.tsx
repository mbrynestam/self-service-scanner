import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { Opportunity } from "./OpportunityScanner";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  analyzedUrl?: string;
  opportunities?: Opportunity[];
}

export default function ContactModal({ 
  isOpen, 
  onClose, 
  analyzedUrl,
  opportunities 
}: ContactModalProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      toast({
        title: "Fyll i obligatoriska fält",
        description: "Namn och e-post krävs",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Split name into first/last
      const nameParts = formData.name.trim().split(" ");
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";

      const { error } = await supabase.functions.invoke("send-lead-notification", {
        body: {
          firstName,
          lastName,
          email: formData.email,
          company: formData.company,
          message: formData.message,
          source: "scanner",
          analyzedUrl,
          opportunities: opportunities?.map(o => o.title),
        },
      });

      if (error) throw error;

      toast({
        title: "Tack för din förfrågan!",
        description: "Vi återkommer till dig inom kort.",
      });

      setFormData({ name: "", email: "", company: "", message: "" });
      onClose();
    } catch (error) {
      console.error("Error sending lead:", error);
      toast({
        title: "Något gick fel",
        description: "Försök igen eller kontakta oss direkt.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - covers the scanner container */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm z-50"
            style={{ position: 'absolute' }}
          />

          {/* Modal - centered within container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="absolute inset-0 z-50 flex items-center justify-center p-4"
            style={{ position: 'absolute' }}
          >
            <div 
              className="bg-card border border-border rounded-xl p-5 shadow-2xl w-full max-w-sm"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Boka samtal</h3>
                <button
                  onClick={onClose}
                  className="p-1 rounded-lg hover:bg-muted transition-colors"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              <p className="text-sm text-muted-foreground mb-5">
                Vi visar vad som är möjligt och vad som ger mest effekt för din försäljning.
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm">
                    Namn <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Ditt namn"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="h-10"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm">
                    E-post <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="din@epost.se"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="h-10"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company" className="text-sm">
                    Företag
                  </Label>
                  <Input
                    id="company"
                    type="text"
                    placeholder="Ditt företag"
                    value={formData.company}
                    onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                    className="h-10"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm">
                    Meddelande
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Berätta gärna vad du är mest intresserad av..."
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    rows={3}
                    className="resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-11"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Skickar...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Skicka förfrågan
                    </>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
