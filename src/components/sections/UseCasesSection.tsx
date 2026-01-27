import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Calculator, Boxes, LineChart, Settings, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const useCases = [
  {
    icon: Calculator,
    title: "Priskalkylatorer",
    description: "Låt köpare konfigurera sin lösning och se prisuppskattningar direkt – inga fler \"kontakta oss för offert\".",
    color: "from-primary to-blue-500",
  },
  {
    icon: Boxes,
    title: "Produktkonfiguratorer",
    description: "Interaktiva verktyg där köpare bygger ihop sin perfekta lösning med realtidsförhandsvisning.",
    color: "from-green-400 to-primary",
  },
  {
    icon: LineChart,
    title: "ROI-kalkylatorer",
    description: "Hjälp köpare bevisa värdet internt med data-drivna business cases.",
    color: "from-orange-400 to-pink-500",
  },
  {
    icon: Settings,
    title: "Self-service onboarding",
    description: "Guida nya kunder genom setup och konfiguration utan manuellt stöd.",
    color: "from-purple-400 to-primary",
  },
];

export default function UseCasesSection() {
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
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Verktyg för varje steg i{" "}
            <span className="gradient-text">köpresan</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Från första intresse till signerat avtal – vi bygger de verktyg som
            accelererar varje fas.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group gradient-border rounded-2xl p-8 hover:scale-[1.02] transition-transform duration-300"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${useCase.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <useCase.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                {useCase.title}
              </h3>
              <p className="text-muted-foreground">{useCase.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <Button variant="outline" size="lg" asChild>
            <Link to="/use-cases">
              Se alla use cases
              <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
