import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const stats = [
  {
    value: 75,
    suffix: "%",
    label: "Vill köpa utan säljkontakt tidigt",
    source: "Gartner",
  },
  {
    value: 7.5,
    suffix: "",
    label: "personer i genomsnitt i svenska köpgrupper",
    source: "",
  },
  {
    value: 9,
    suffix: "",
    label: "månader typisk köpresa",
    source: "",
  },
  {
    value: 5,
    suffix: "",
    label: "månader utan kontakt med sälj",
    source: "",
  },
];

function AnimatedNumber({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const duration = 2000;
    const steps = 60;
    const stepValue = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += stepValue;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(current);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [inView, value]);

  const formattedValue = Number.isInteger(value) 
    ? Math.round(displayValue) 
    : displayValue.toFixed(1);

  return (
    <span>
      {formattedValue}{suffix}
    </span>
  );
}

export default function WhySelfServiceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 bg-background" ref={ref}>
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
            Self-service är inte en trend –{" "}
            <span className="gradient-text">det är verkligheten</span> i B2B-köpresor
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="gradient-border rounded-2xl p-8 text-center card-gradient"
            >
              <p className="font-display text-5xl md:text-6xl font-bold gradient-text mb-4">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} inView={isInView} />
              </p>
              <p className="text-foreground font-medium mb-2">{stat.label}</p>
              {stat.source && (
                <p className="text-sm text-muted-foreground">({stat.source})</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
