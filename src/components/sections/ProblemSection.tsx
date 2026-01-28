import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Search, ShieldOff, Clock, Users } from "lucide-react";

const problems = [
  {
    icon: Search,
    title: "De researchar utan dig",
    description: "77% av B2B-köpare föredrar att göra research själva innan de pratar med en säljare.",
  },
  {
    icon: ShieldOff,
    title: "De misstror dolda priser",
    description: "Köpare litar mindre på företag som kräver kontakt för att visa priser eller ge information.",
  },
  {
    icon: Clock,
    title: "De vill inte vänta",
    description: "Moderna köpare förväntar sig omedelbara svar — inte e-postkedjor eller väntetid.",
  },
  {
    icon: Users,
    title: "De involverar fler internt",
    description: "11 personer i snitt är involverade i B2B-köpbeslut. Alla behöver tillgång till samma info.",
  },
];

export default function ProblemSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground">
            Moderna köpare gör jobbet själva.
          </h2>
          <p className="text-lg text-muted-foreground">
            Dina köpare har förändrats. Möter du dem där de är?
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-card rounded-2xl p-6 border border-border hover:border-primary/50 transition-colors duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                <problem.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                {problem.title}
              </h3>
              <p className="text-muted-foreground text-sm">{problem.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
