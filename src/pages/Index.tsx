import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/sections/HeroSection";
import ProblemSection from "@/components/sections/ProblemSection";
import SelfServiceSection from "@/components/sections/SelfServiceSection";
import ResultsSection from "@/components/sections/ResultsSection";
import ProcessSection from "@/components/sections/ProcessSection";
import DifferentiatorsSection from "@/components/sections/DifferentiatorsSection";
import SocialProofSection from "@/components/sections/SocialProofSection";
import FAQSection from "@/components/sections/FAQSection";
import CTASection from "@/components/sections/CTASection";
import ScannerSection from "@/components/sections/ScannerSection";

export default function Index() {
  return (
    <Layout>
      <HeroSection />
      <ProblemSection />
      <ScannerSection />
      <SelfServiceSection />
      <ResultsSection />
      <ProcessSection />
      <DifferentiatorsSection />
      <SocialProofSection />
      <FAQSection />
      <CTASection />
    </Layout>
  );
}
