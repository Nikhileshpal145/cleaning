import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteNav } from "@/components/layout/SiteNav";
import { ScrollEffects } from "@/components/ScrollEffects";
import { BenefitsSection, ContactSection, FAQSection } from "@/components/sections/ClosingSections";
import { Hero } from "@/components/sections/Hero";
import { PricingSection } from "@/components/sections/PricingSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { EquipmentSection, ProblemSection, ServicesSection } from "@/components/sections/StorySections";
import { TransformationSection } from "@/components/sections/TransformationSection";
import { business } from "@/data/site";

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "HouseCleaning",
  name: business.name,
  telephone: business.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kandivali, Mumbai",
    addressRegion: "Maharashtra",
    addressCountry: "IN",
  },
};

export default function HomePage() {
  return (
    <>
      <ScrollEffects />
      <SiteNav />
      <main>
        <Hero />
        <ProblemSection />
        <EquipmentSection />
        <ServicesSection />
        <TransformationSection />
        <ProcessSection />
        <PricingSection />
        <BenefitsSection />
        <FAQSection />
        <ContactSection />
      </main>
      <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema).replace(/</g, "\\u003c") }} />
    </>
  );
}