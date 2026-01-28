import { motion } from "framer-motion";
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Calendar, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export default function Kontakt() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

  const calendlyUrl = "https://calendly.com/magnus-43/30min";
  const calendlyEmbedUrl =
    typeof window !== "undefined"
      ? `${calendlyUrl}?embed_domain=${encodeURIComponent(window.location.hostname)}&embed_type=Inline`
      : calendlyUrl;
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
      const { data, error } = await supabase.functions.invoke('submit-to-hubspot', {
        body: {
          ...formData,
          source: 'Kontaktsida',
        },
      });

      if (error) throw error;

      toast({
        title: "Tack för ditt meddelande!",
        description: "Vi återkommer inom 24 timmar.",
      });
      
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        company: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Något gick fel",
        description: "Försök igen eller kontakta oss direkt via e-post.",
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
    <Layout>
      {/* Hero */}
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Låt oss prata om{" "}
              <span className="gradient-text">era möjligheter</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Boka en kostnadsfri demo och se hur self-service tools kan
              transformera er säljprocess.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                Boka demo
              </h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Förnamn *</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      placeholder="Ditt förnamn"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Efternamn *</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      placeholder="Ditt efternamn"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">E-post *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="din@epost.se"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="company">Företag *</Label>
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    required
                    placeholder="Ditt företag"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefon</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="070-123 45 67"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Meddelande *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Berätta kort om era behov..."
                    rows={4}
                  />
                </div>
                
                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    "Skickar..."
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Skicka meddelande
                    </>
                  )}
                </Button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              <div className="rounded-2xl p-8 card-gradient">
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                  I ett första möte (30 min) hjälper vi er att:
                </h2>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      ✓
                    </div>
                    <span className="text-muted-foreground">
                      Förstå var era köpare fastnar före kontakt
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      ✓
                    </div>
                    <span className="text-muted-foreground">
                      Se exempel på self-service som faktiskt driver affär
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      ✓
                    </div>
                    <span className="text-muted-foreground">
                      Avgöra om och hur self-service kan ge er bättre leads och kortare säljcykler
                    </span>
                  </li>
                </ul>
                <p className="mt-6 text-sm text-muted-foreground/80 italic">
                  Inget säljs. Fokus är på klarhet och nästa steg.
                </p>
              </div>

              <div className="gradient-border rounded-2xl p-8 card-gradient">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-foreground mb-2">
                      Boka direkt i kalendern
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Välj en tid som passar dig för ett 30-minuters samtal där
                      vi går igenom era möjligheter.
                    </p>
                    <Button variant="outline" size="lg" type="button" onClick={() => setIsCalendlyOpen(true)}>
                      Se lediga tider
                    </Button>

                    <Dialog open={isCalendlyOpen} onOpenChange={setIsCalendlyOpen}>
                      <DialogContent className="max-w-4xl p-0 overflow-hidden">
                        <DialogHeader className="p-6 pb-0">
                          <DialogTitle>Boka strategisamtal</DialogTitle>
                        </DialogHeader>
                        <div className="px-6 pb-6">
                          <div className="rounded-lg overflow-hidden border border-border">
                            <iframe
                              title="Calendly bokning"
                              src={calendlyEmbedUrl}
                              className="w-full h-[70vh]"
                              loading="lazy"
                            />
                          </div>
                          <p className="mt-3 text-xs text-muted-foreground">
                            Om inbäddningen inte laddar: {" "}
                            <a
                              href={calendlyUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline underline-offset-4"
                            >
                              öppna Calendly i ny flik
                            </a>
                            .
                          </p>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>

            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}