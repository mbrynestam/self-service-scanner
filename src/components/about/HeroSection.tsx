import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 relative overflow-hidden min-h-[80vh] flex items-center">
      {/* Pulsing rings animation */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-primary/20"
            initial={{ width: 100, height: 100, opacity: 0 }}
            animate={{
              width: [100 + i * 150, 300 + i * 200, 100 + i * 150],
              height: [100 + i * 150, 300 + i * 200, 100 + i * 150],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.8,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Vi hjälper B2B-företag bygga för hur köpare{" "}
              <span className="gradient-text">faktiskt vill köpa</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-xl">
              Buyr är specialister på self-service i komplexa B2B-köpresor — så att
              köpare kan komma längre själva innan de pratar med sälj.
            </p>
            <Button variant="hero" size="xl" asChild>
              <Link to="/sa-funkar-det">
                Se hur det funkar
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </motion.div>

          {/* Interactive dot graphic / fingerprint visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:flex items-center justify-center"
          >
            <div className="relative w-80 h-80">
              {/* Fingerprint-style concentric rings */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 m-auto rounded-full border-2 border-primary/30"
                  style={{
                    width: `${50 + i * 40}px`,
                    height: `${50 + i * 40}px`,
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                />
              ))}
              {/* Interactive dots */}
              {[...Array(12)].map((_, i) => {
                const angle = (i * 30 * Math.PI) / 180;
                const radius = 100 + (i % 3) * 30;
                return (
                  <motion.div
                    key={i}
                    className="absolute w-3 h-3 rounded-full bg-primary"
                    style={{
                      left: `calc(50% + ${Math.cos(angle) * radius}px)`,
                      top: `calc(50% + ${Math.sin(angle) * radius}px)`,
                      transform: "translate(-50%, -50%)",
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.15,
                    }}
                  />
                );
              })}
              {/* Center glow */}
              <motion.div
                className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-primary/20 blur-xl"
                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
