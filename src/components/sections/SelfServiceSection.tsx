import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Calculator, Settings, BarChart3, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const tools = [
  {
    icon: Calculator,
    title: "Priskalkylator",
    description: "Låt köpare räkna ut sin egen kostnad direkt — utan att behöva prata med sälj.",
    cta: "Testa priskalkylator",
    href: "/priser",
  },
  {
    icon: BarChart3,
    title: "Assessments och Quiz",
    description: "Hjälp köpare utvärdera sitt behov med interaktiva quizzes och assessment-verktyg.",
    cta: "Gör assessment",
    href: "/use-cases",
  },
  {
    icon: Settings,
    title: "Konfiguratorer",
    description: "Låt köpare bygga sin egen lösning visuellt med pris och specifikation i realtid.",
    cta: "Konfigurera lösning",
    href: "/losning",
  },
  {
    icon: Sparkles,
    title: "Urval & rekommendationer",
    description: "Låt köpare få skräddarsydda rekommendationer baserat på sina behov — och utbilda sig själva innan de tar kontakt.",
    cta: "Se exempel",
    href: "/use-cases",
  },
];

export default function SelfServiceSection() {
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
            Verktyg som säljer{" "}
            <span className="gradient-text">medan du sover</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Self-service-verktyg som kvalificerar, utbildar och konverterar dygnet runt.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-card rounded-2xl p-8 border border-border hover:border-primary/50 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <tool.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                {tool.title}
              </h3>
              <p className="text-muted-foreground">{tool.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-12"
        >
          <Button variant="outline" size="lg" asChild>
            <Link to="/losning">
              Fler verktyg
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
