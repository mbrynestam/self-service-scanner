import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/sections/HeroSection";
import ProblemSection from "@/components/sections/ProblemSection";
import SelfServiceSection from "@/components/sections/SelfServiceSection";
import ProcessSection from "@/components/sections/ProcessSection";
import DifferentiatorsSection from "@/components/sections/DifferentiatorsSection";
import FAQSection from "@/components/sections/FAQSection";
import CTASection from "@/components/sections/CTASection";

export default function Index() {
  return (
    <Layout>
      <HeroSection />
      <ProblemSection />
      <SelfServiceSection />
      <ProcessSection />
      <DifferentiatorsSection />
      <FAQSection />
      <CTASection />
    </Layout>
  );
}
