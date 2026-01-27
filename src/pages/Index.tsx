import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/sections/HeroSection";
import ProblemSection from "@/components/sections/ProblemSection";
import SolutionSection from "@/components/sections/SolutionSection";
import UseCasesSection from "@/components/sections/UseCasesSection";
import ProcessSection from "@/components/sections/ProcessSection";
import DifferentiatorsSection from "@/components/sections/DifferentiatorsSection";
import SocialProofSection from "@/components/sections/SocialProofSection";
import FAQSection from "@/components/sections/FAQSection";
import CTASection from "@/components/sections/CTASection";

export default function Index() {
  return (
    <Layout>
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <UseCasesSection />
      <ProcessSection />
      <DifferentiatorsSection />
      <SocialProofSection />
      <FAQSection />
      <CTASection />
    </Layout>
  );
}
