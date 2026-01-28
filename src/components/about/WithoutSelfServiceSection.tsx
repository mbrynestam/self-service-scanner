import { motion } from "framer-motion";
import { XCircle, MessageSquareOff, Clock, Users } from "lucide-react";

const problems = [
  {
    icon: MessageSquareOff,
    text: "Köpare lämnar sajten med obesvarade frågor",
  },
  {
    icon: Users,
    text: "Sälj får möten med lågt förberedda prospekts",
  },
  {
    icon: Clock,
    text: "Beslut tar längre tid",
  },
  {
    icon: XCircle,
    text: "Konkurrenter upplevs som enklare att köpa av",
  },
];

export default function WithoutSelfServiceSection() {
  return (
    <section className="py-24 bg-card">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
            När köpare inte får svar,{" "}
            <span className="text-destructive">går de vidare</span>
          </h2>
        </motion.div>

        <div className="max-w-2xl mx-auto space-y-4">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.text}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-center gap-4 p-5 rounded-xl bg-background/50 border border-destructive/20 group"
            >
              <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0 group-hover:bg-destructive/20 transition-colors">
                <problem.icon className="w-6 h-6 text-destructive" />
              </div>
              <p className="text-lg text-foreground">{problem.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
