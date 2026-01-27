import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function AboutCTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Fingerprint texture background */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full border border-primary"
            style={{
              width: `${200 + i * 100}px`,
              height: `${200 + i * 100}px`,
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
            Vill du se hur self-service kan fungera i{" "}
            <span className="gradient-text">er köpresa?</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            Boka ett första samtal så utforskar vi möjligheterna tillsammans.
          </p>

          <motion.div
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(116, 245, 161, 0)",
                "0 0 0 15px rgba(116, 245, 161, 0.1)",
                "0 0 0 0 rgba(116, 245, 161, 0)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block rounded-full"
          >
            <Button variant="hero" size="xl" asChild>
              <Link to="/kontakt">
                Boka ett första samtal
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
