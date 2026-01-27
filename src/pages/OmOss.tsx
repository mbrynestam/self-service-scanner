import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/about/HeroSection";
import MissionSection from "@/components/about/MissionSection";
import GrownSection from "@/components/about/GrownSection";
import WhySelfServiceSection from "@/components/about/WhySelfServiceSection";
import WithoutSelfServiceSection from "@/components/about/WithoutSelfServiceSection";
import AIAcceleratorSection from "@/components/about/AIAcceleratorSection";
import OurRoleSection from "@/components/about/OurRoleSection";
import AboutCTASection from "@/components/about/AboutCTASection";

export default function OmOss() {
  return (
    <Layout>
      <HeroSection />
      <MissionSection />
      <GrownSection />
      <WhySelfServiceSection />
      <WithoutSelfServiceSection />
      <AIAcceleratorSection />
      <OurRoleSection />
      <AboutCTASection />
    </Layout>
  );
}
