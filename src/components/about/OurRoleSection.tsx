import { motion } from "framer-motion";
import { Briefcase, Compass, Bot } from "lucide-react";

const roles = [
  {
    icon: Briefcase,
    title: "Ni bidrar med",
    description: "Affärsinsikt",
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: Compass,
    title: "Vi bidrar med",
    description: "Metod & erfarenhet",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Bot,
    title: "AI bidrar med",
    description: "Hastighet & prototyping",
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
  },
];

export default function OurRoleSection() {
  return (
    <section className="py-24 bg-card">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
            Vi är inte en <span className="gradient-text">traditionell byrå</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-16">
            Vi är en innovationspartner som kombinerar er affärskunskap med vår
            metodik och AI:s kraft för att snabbt testa och validera idéer.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Connection lines */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none hidden md:block"
            viewBox="0 0 800 200"
            preserveAspectRatio="xMidYMid meet"
          >
            <motion.path
              d="M 150 100 Q 400 50 650 100"
              fill="none"
              stroke="hsl(var(--border))"
              strokeWidth="2"
              strokeDasharray="5,5"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
            <motion.path
              d="M 150 100 Q 400 150 650 100"
              fill="none"
              stroke="hsl(var(--border))"
              strokeWidth="2"
              strokeDasharray="5,5"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.7 }}
            />
          </svg>

          <div className="grid md:grid-cols-3 gap-8 relative z-10">
            {roles.map((role, index) => (
              <motion.div
                key={role.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="text-center"
              >
                <div
                  className={`w-20 h-20 rounded-2xl ${role.bgColor} flex items-center justify-center mx-auto mb-6`}
                >
                  <role.icon className={`w-10 h-10 ${role.color}`} />
                </div>
                <p className="text-sm text-muted-foreground mb-2">{role.title}</p>
                <h3 className="font-display text-xl font-bold text-foreground">
                  {role.description}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
