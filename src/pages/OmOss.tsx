import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Target, Users, Lightbulb } from "lucide-react";

const values = [
  {
    icon: Sparkles,
    title: "Innovation först",
    description: "Vi använder den senaste tekniken och AI för att leverera snabbare och bättre.",
  },
  {
    icon: Target,
    title: "Resultatfokus",
    description: "Allt vi gör mäts mot tydliga KPI:er. Vi lyckas när ni lyckas.",
  },
  {
    icon: Users,
    title: "Partnerskap",
    description: "Vi ser oss som en förlängning av ert team, inte bara en leverantör.",
  },
  {
    icon: Lightbulb,
    title: "Kontinuerligt lärande",
    description: "Vi delar insikter, testar nytt och utvecklas tillsammans med våra kunder.",
  },
];

const team = [
  {
    name: "Johan Eriksson",
    role: "Grundare & VD",
    bio: "15+ år inom B2B-sälj och digital transformation. Tidigare VP Sales på ett snabbväxande SaaS-bolag.",
  },
  {
    name: "Lisa Andersson",
    role: "Head of Design",
    bio: "Designer med passion för användarupplevelser som driver affärsresultat. Tidigare på ledande designbyråer.",
  },
  {
    name: "Marcus Berg",
    role: "Tech Lead",
    bio: "Full-stack utvecklare med fokus på moderna webbteknologier och AI. Gillar att lösa komplexa problem.",
  },
  {
    name: "Emma Lindqvist",
    role: "Customer Success",
    bio: "Säkerställer att våra kunder får maximalt värde från sina verktyg. Bakgrund inom B2B-konsulting.",
  },
];

export default function OmOss() {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 relative overflow-hidden">
        <div className="hero-glow top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30" />
        
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Vi hjälper B2B-företag{" "}
              <span className="gradient-text">möta den moderna köparen</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Grundat på insikten att B2B-köpare vill ha kontroll över sin egen
              köpresa – och att företag som möjliggör det vinner.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
                Vår historia
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Vi startade Självbetjäning efter att ha sett samma mönster om och
                  om igen: B2B-köpare som ville utforska produkter själva, men som
                  tvingades vänta på säljsamtal för att få grundläggande information.
                </p>
                <p>
                  Samtidigt kämpade säljteam med att hantera tusentals leads, varav
                  många inte var redo att köpa. Det kändes som att det måste finnas
                  ett bättre sätt.
                </p>
                <p>
                  Idag hjälper vi B2B-företag bygga de verktyg som möter köparna där
                  de är – och låter dem utforska, utvärdera och ta beslut på egna
                  villkor.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="gradient-border rounded-2xl p-8 card-gradient"
            >
              <div className="grid grid-cols-2 gap-8">
                <div className="text-center">
                  <p className="font-display text-4xl font-bold gradient-text mb-2">50+</p>
                  <p className="text-muted-foreground">Levererade projekt</p>
                </div>
                <div className="text-center">
                  <p className="font-display text-4xl font-bold gradient-text mb-2">98%</p>
                  <p className="text-muted-foreground">Nöjda kunder</p>
                </div>
                <div className="text-center">
                  <p className="font-display text-4xl font-bold gradient-text mb-2">324%</p>
                  <p className="text-muted-foreground">Snitt ROI</p>
                </div>
                <div className="text-center">
                  <p className="font-display text-4xl font-bold gradient-text mb-2">6 v</p>
                  <p className="text-muted-foreground">Snitt tid till lansering</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Våra värderingar
            </h2>
            <p className="text-lg text-muted-foreground">
              Principerna som guidar allt vi gör.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Möt teamet
            </h2>
            <p className="text-lg text-muted-foreground">
              Erfarna specialister med passion för B2B och digital innovation.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="gradient-border rounded-2xl p-6"
              >
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="font-display text-2xl font-bold text-primary">
                    {member.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
                <h3 className="font-display text-lg font-bold text-foreground text-center mb-1">
                  {member.name}
                </h3>
                <p className="text-primary text-sm text-center mb-4">{member.role}</p>
                <p className="text-muted-foreground text-sm text-center">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
              Vill du jobba med oss?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Vi letar alltid efter duktiga människor. Hör av dig så berättar vi mer.
            </p>
            <Button variant="hero" size="xl" asChild>
              <Link to="/kontakt">
                Kontakta oss
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
