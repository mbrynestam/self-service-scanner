import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { TrendingDown, Clock, Users } from "lucide-react";

const problems = [
  {
    icon: TrendingDown,
    stat: "70%",
    title: "av B2B-köpresan sker utan säljkontakt",
    description: "Köpare researchar, jämför och utvärderar på egen hand – fångar du dem där?",
  },
  {
    icon: Clock,
    stat: "6-12 mån",
    title: "genomsnittlig säljcykel",
    description: "Utan rätt verktyg fastnar leads i limbo medan konkurrenterna rör sig snabbare.",
  },
  {
    icon: Users,
    stat: "11 personer",
    title: "i snitt involverade i B2B-köpbeslut",
    description: "Varje stakeholder behöver information anpassad efter sin roll och sina frågor.",
  },
];

export default function ProblemSection() {
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
            B2B-köparen har förändrats.{" "}
            <span className="gradient-text">Har din säljprocess det?</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Den moderna köparen vill ha kontroll. De vill researcha, testa och utvärdera
            innan de pratar med någon säljare.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="gradient-border rounded-2xl p-8"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <problem.icon className="w-6 h-6 text-primary" />
              </div>
              <p className="font-display text-4xl font-bold gradient-text mb-2">
                {problem.stat}
              </p>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                {problem.title}
              </h3>
              <p className="text-muted-foreground">{problem.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
