import { useRef, useState } from "react";
import { Zap, Brain, FlaskConical, TrendingUp, Clock, Users, Lightbulb, Rocket, ChevronRight } from "lucide-react";

const differentiators = [
  {
    icon: Zap,
    title: "Testbart på dagar, inte månader",
    description: "Med AI-driven prototyping kan ni uppleva och utvärdera nya köpupplevelser nästan direkt. Ni slipper långa förstudier och kan ta beslut baserat på något ni faktiskt har sett fungera.",
    designType: "timeComparison",
  },
  {
    icon: Brain,
    title: "Byggt på verkliga B2B-köpresor",
    description: "Vi utgår från hur komplexa B2B-affärer faktiskt går till — med flera beslutsfattare, långa processer och höga krav på trygghet innan dialog med sälj. Self-service blir ett sätt att hjälpa köpare bli redo, inte att ersätta relationer.",
    designType: "buyerNetwork",
  },
  {
    icon: FlaskConical,
    title: "Testa innan ni investerar stort",
    description: "Vår modell bygger på att ni först får riktning och en prototyp. När ni ser att det fungerar väljer ni hur ni vill ta lösningen vidare — snabbt, mer avancerat eller i egen regi. Det minskar risk och gör innovation mer hanterbar.",
    designType: "progressFlow",
  },
  {
    icon: TrendingUp,
    title: "Fokus på affärseffekt, inte bara funktion",
    description: "Self-service ska inte bara 'finnas' — det ska göra skillnad i affären. Kortare säljcykler, mer förberedda köpare och fler kvalificerade dialoger är det vi optimerar för.",
    designType: "businessBadges",
  },
];

function TimeComparisonGraphic() {
  return (
    <div className="flex items-center gap-4 mt-4">
      <div className="flex-1 bg-secondary/50 rounded-lg p-3 text-center border border-border">
        <Clock className="w-4 h-4 text-muted-foreground mx-auto mb-1" />
        <p className="text-xs text-muted-foreground">Traditionellt</p>
        <p className="text-sm font-bold text-muted-foreground">Månader</p>
      </div>
      <ChevronRight className="w-5 h-5 text-primary flex-shrink-0" />
      <div className="flex-1 bg-primary/10 rounded-lg p-3 text-center border border-primary/30">
        <Zap className="w-4 h-4 text-primary mx-auto mb-1" />
        <p className="text-xs text-primary">Med Buyr</p>
        <p className="text-sm font-bold text-primary">Dagar</p>
      </div>
    </div>
  );
}

function BuyerNetworkGraphic() {
  return (
    <div className="flex items-center justify-center gap-2 mt-4">
      <div className="flex items-center">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="w-8 h-8 rounded-full bg-secondary border-2 border-background flex items-center justify-center -ml-2 first:ml-0"
          >
            <Users className="w-3 h-3 text-muted-foreground" />
          </div>
        ))}
      </div>
      <div className="flex items-center gap-1">
        <div className="w-8 h-0.5 bg-primary" />
        <ChevronRight className="w-4 h-4 text-primary" />
      </div>
      <div className="w-10 h-10 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center">
        <TrendingUp className="w-4 h-4 text-primary" />
      </div>
    </div>
  );
}

function ProgressFlowGraphic() {
  const steps = [
    { icon: Lightbulb, label: "Idé" },
    { icon: FlaskConical, label: "Prototyp" },
    { icon: Rocket, label: "Val" },
  ];

  return (
    <div className="flex items-center justify-between mt-4">
      {steps.map((step, i) => (
        <div key={step.label} className="flex items-center">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mb-1">
              <step.icon className="w-4 h-4 text-primary" />
            </div>
            <span className="text-xs text-muted-foreground">{step.label}</span>
          </div>
          {i < steps.length - 1 && (
            <div className="w-8 h-0.5 bg-primary/30 mx-2" />
          )}
        </div>
      ))}
    </div>
  );
}

function BusinessBadgesGraphic() {
  const badges = ["Kortare säljcykler", "Fler kvalificerade leads", "Högre affärsvärde"];

  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {badges.map((badge) => (
        <div
          key={badge}
          className="px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-xs font-medium text-primary"
        >
          {badge}
        </div>
      ))}
    </div>
  );
}

function DifferentiatorCard({ diff, index }: { diff: typeof differentiators[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="p-6 rounded-2xl bg-secondary/30 border border-border hover:border-primary/30 transition-all duration-300"
    >
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
        <diff.icon className="w-6 h-6 text-primary" />
      </div>
      <h3 className="font-display text-xl font-bold text-foreground mb-3">
        {diff.title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{diff.description}</p>
      
      {/* Design elements based on type */}
      {isHovered && diff.designType === "timeComparison" && <TimeComparisonGraphic />}
      {isHovered && diff.designType === "buyerNetwork" && <BuyerNetworkGraphic />}
      {isHovered && diff.designType === "progressFlow" && <ProgressFlowGraphic />}
      {isHovered && diff.designType === "businessBadges" && <BusinessBadgesGraphic />}
      
      {/* Show graphics on mobile always */}
      <div className="lg:hidden">
        {diff.designType === "timeComparison" && <TimeComparisonGraphic />}
        {diff.designType === "buyerNetwork" && <BuyerNetworkGraphic />}
        {diff.designType === "progressFlow" && <ProgressFlowGraphic />}
        {diff.designType === "businessBadges" && <BusinessBadgesGraphic />}
      </div>
    </div>
  );
}

export default function DifferentiatorsSection() {
  const ref = useRef(null);

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-card">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground">
            Därför väljer företag{" "}
            <span className="gradient-text">Buyr</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Vi hjälper B2B-företag testa och införa self-service på ett sätt som är
            snabbt, konkret och affärsdrivet — utan att starta stora projekt från dag ett.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {differentiators.map((diff, index) => (
            <DifferentiatorCard key={diff.title} diff={diff} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
