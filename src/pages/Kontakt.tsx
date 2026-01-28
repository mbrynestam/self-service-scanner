import { useState } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export default function Kontakt() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const company = formData.get("company") as string;
    const phone = formData.get("phone") as string;
    const message = formData.get("message") as string;

    try {
      const { error } = await supabase.functions.invoke("submit-to-hubspot", {
        body: {
          name: `${firstName} ${lastName}`.trim(),
          email,
          company,
          phone,
          message,
          submissionType: "contact",
          buyr_source: "Kontaktsida",
        },
      });

      if (error) {
        console.error("HubSpot submission error:", error);
      }

      toast({
        title: "✅ Tack för ditt meddelande!",
        description: "Vi har tagit emot din förfrågan och återkommer inom 24 timmar.",
      });
      
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      // Still show success to user - we don't want to block them if CRM fails
      toast({
        title: "✅ Tack för ditt meddelande!",
        description: "Vi har tagit emot din förfrågan och återkommer inom 24 timmar.",
      });
      form.reset();
    } finally {
      setIsSubmitting(false);
    }
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
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName">Förnamn</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      required
                      className="mt-2 bg-secondary/50 border-border"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Efternamn</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      required
                      className="mt-2 bg-secondary/50 border-border"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">E-post</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="mt-2 bg-secondary/50 border-border"
                  />
                </div>

                <div>
                  <Label htmlFor="company">Företag</Label>
                  <Input
                    id="company"
                    name="company"
                    required
                    className="mt-2 bg-secondary/50 border-border"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Telefon (valfritt)</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    className="mt-2 bg-secondary/50 border-border"
                  />
                </div>

                <div>
                  <Label htmlFor="message">Berätta om era utmaningar</Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="mt-2 bg-secondary/50 border-border"
                    placeholder="Vilka utmaningar har ni med er säljprocess idag?"
                  />
                </div>

                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Skickar..." : "Boka demo"}
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
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                  Kontaktinformation
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-1">E-post</p>
                      <a
                        href="mailto:hej@buyr.studio"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        hej@buyr.studio
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-1">Telefon</p>
                      <a
                        href="tel:+46701234567"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        070-123 45 67
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-1">Kontor</p>
                      <p className="text-muted-foreground">
                        Stureplan 4, 114 35 Stockholm
                      </p>
                    </div>
                  </div>
                </div>
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
                    <Button variant="outline" size="lg">
                      Se lediga tider
                    </Button>
                  </div>
                </div>
              </div>

              <div className="bg-secondary/30 rounded-2xl p-8 border border-border">
                <h3 className="font-display text-lg font-bold text-foreground mb-4">
                  Vad händer efter du skickat formuläret?
                </h3>
                <ol className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0">
                      1
                    </span>
                    <span>Vi granskar din förfrågan inom 24 timmar</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0">
                      2
                    </span>
                    <span>En specialist kontaktar dig för att boka möte</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0">
                      3
                    </span>
                    <span>Vi har ett 30-min discovery-samtal om era behov</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0">
                      4
                    </span>
                    <span>Du får ett förslag anpassat efter er situation</span>
                  </li>
                </ol>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
