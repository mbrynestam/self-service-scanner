import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function GrownSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24" ref={ref}>
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
            En del av <span className="gradient-text">Grown</span> – med fullt
            fokus på self-service
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Timeline */}
          <div className="relative">
            {/* Animated line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2" />
            <motion.div
              className="absolute left-1/2 top-0 w-0.5 bg-primary -translate-x-1/2"
              initial={{ height: 0 }}
              animate={isInView ? { height: "100%" } : { height: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />

            {/* 1996 - Grown */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative grid grid-cols-2 gap-8 mb-16"
            >
              <div className="text-right pr-8">
                <div className="gradient-border rounded-2xl p-6 inline-block">
                  <p className="font-display text-2xl font-bold text-primary mb-2">
                    1996
                  </p>
                  <h3 className="font-display text-xl font-bold mb-3">
                    Strategi & köpbeteende
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Grown grundas som strategipartner för B2B-företag. Fokus på att
                    anpassa marknadsföring och försäljning till hur moderna köpare
                    fattar beslut.
                  </p>
                </div>
              </div>
              <div className="relative">
                <motion.div
                  className="absolute left-0 top-1/2 w-4 h-4 rounded-full bg-primary -translate-x-1/2 -translate-y-1/2"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                />
              </div>
            </motion.div>

            {/* Today - Buyr */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="relative grid grid-cols-2 gap-8"
            >
              <div className="relative">
                <motion.div
                  className="absolute right-0 top-1/2 w-4 h-4 rounded-full bg-primary translate-x-1/2 -translate-y-1/2"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.8 }}
                />
              </div>
              <div className="pl-8">
                <div className="gradient-border rounded-2xl p-6 inline-block">
                  <p className="font-display text-2xl font-bold text-primary mb-2">
                    Idag
                  </p>
                  <h3 className="font-display text-xl font-bold mb-3">
                    Self-service i praktiken
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Buyr skapades för att ta detta ett steg längre — från strategi
                    till konkreta, testbara lösningar som hjälper köpare komma
                    längre själva.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="text-center text-muted-foreground mt-16 max-w-2xl mx-auto"
          >
            Inom Grown har self-service länge varit en central del av hur företag
            bygger förtroende, utbildar köpare och skapar bättre säljdialoger.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
