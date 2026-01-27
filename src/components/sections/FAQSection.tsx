import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Hur lång tid tar det att bygga ett self-service verktyg?",
    answer: "Det beror på komplexitet, men tack vare vår AI-drivna process kan vi ofta leverera en fungerande prototyp inom 1-2 veckor. Full produktion tar vanligtvis 4-8 veckor.",
  },
  {
    question: "Kan ni integrera med våra befintliga system?",
    answer: "Absolut. Vi bygger lösningar som sömlöst integrerar med CRM-system som HubSpot och Salesforce, marketing automation, ERP-system och andra verktyg ni redan använder.",
  },
  {
    question: "Vad kostar det?",
    answer: "Prissättningen varierar beroende på projektets omfattning. Vi erbjuder både projektbaserade lösningar och löpande samarbeten. Boka en demo så kan vi diskutera vad som passar er bäst.",
  },
  {
    question: "Behöver vi teknisk kompetens internt?",
    answer: "Nej, vi tar hand om allt från strategi och design till utveckling och drift. Ni behöver bara bidra med kunskap om er produkt och era kunder.",
  },
  {
    question: "Hur mäter vi ROI på self-service tools?",
    answer: "Vi sätter upp tracking från dag ett och mäter nyckeltal som leads genererade, tid i verktyget, konverteringsgrad och påverkan på säljcykeln. Ni får regelbundna rapporter med actionable insights.",
  },
  {
    question: "Vad händer efter lansering?",
    answer: "Vi erbjuder löpande support, A/B-testning och kontinuerlig optimering. Vårt mål är att era verktyg ska fortsätta leverera värde långt efter lansering.",
  },
];

export default function FAQSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-card">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground">
            Vanliga frågor
          </h2>
          <p className="text-lg text-muted-foreground">
            Har du fler frågor? Kontakta oss så hjälper vi dig.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="gradient-border rounded-xl px-6 data-[state=open]:bg-secondary/30"
              >
                <AccordionTrigger className="text-left font-display font-semibold hover:no-underline hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
