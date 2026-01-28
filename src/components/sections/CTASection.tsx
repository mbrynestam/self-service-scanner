import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calculator, Calendar } from "lucide-react";

export default function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 lg:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="gradient-border rounded-3xl p-12 lg:p-20 text-center card-gradient relative overflow-hidden"
        >

          <div className="relative z-10">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground">
              Redo att ge dina köpare{" "}
              <span className="gradient-text">kontroll</span>?
            </h2>
            
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
              Boka ett strategisamtal och se hur Buyr kan hjälpa er bygga self-service 
              verktyg som accelererar säljcykeln och ökar konverteringen.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="xl" asChild>
                <Link to="/priser">
                  <Calculator className="mr-2" size={18} />
                  Räkna ut pris nu
                </Link>
              </Button>
              <Button variant="heroOutline" size="xl" asChild>
                <Link to="/kontakt">
                  <Calendar className="mr-2" size={18} />
                  Boka strategisamtal
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
