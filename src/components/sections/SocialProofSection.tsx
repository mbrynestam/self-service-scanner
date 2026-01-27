import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Vår ROI-kalkylator har blivit vårt mest effektiva säljverktyg. Leads kvalificerar sig själva och kommer till säljmöten betydligt bättre förberedda.",
    author: "Maria Lindberg",
    role: "VP Sales",
    company: "TechFlow AB",
  },
  {
    quote: "Från första möte till färdig lansering på bara 6 veckor. Teamet förstod våra behov direkt och levererade över förväntan.",
    author: "Erik Johansson",
    role: "CMO",
    company: "Nordic Solutions",
  },
  {
    quote: "Vår priskalkylator hanterar nu 80% av alla offertförfrågningar automatiskt. Det har frigjort enormt mycket tid för våra säljare.",
    author: "Anna Svensson",
    role: "Head of Digital",
    company: "Enterprise Corp",
  },
];

const stats = [
  { value: "40%", label: "Kortare säljcykel" },
  { value: "3x", label: "Fler kvalificerade leads" },
  { value: "68%", label: "Högre konvertering" },
  { value: "24/7", label: "Säljsupport" },
];

export default function SocialProofSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 lg:py-32 relative overflow-hidden">
      <div className="hero-glow top-0 right-1/4 opacity-20" />
      
      <div className="container mx-auto px-4 lg:px-8">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <p className="font-display text-4xl md:text-5xl font-bold gradient-text mb-2">
                {stat.value}
              </p>
              <p className="text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground">
            Vad våra kunder säger
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.15 }}
              className="gradient-border rounded-2xl p-8 card-gradient"
            >
              <Quote className="w-8 h-8 text-primary/40 mb-4" />
              <p className="text-foreground mb-6 italic">"{testimonial.quote}"</p>
              <div>
                <p className="font-semibold text-foreground">{testimonial.author}</p>
                <p className="text-sm text-muted-foreground">
                  {testimonial.role}, {testimonial.company}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
