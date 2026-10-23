import { MapPin, ShieldCheck } from "lucide-react";
import { BhkCalculator } from "@/components/ui/BhkCalculator";
import { business } from "@/data/site";

export function PricingSection() {
  return (
    <section className="pricing-section" id="pricing" aria-labelledby="pricing-title">
      <div className="section-wrap pricing-wrap">
        <div className="pricing-heading reveal">
          <p className="eyebrow"><span className="eyebrow-line" /> AN ESTIMATE IS ONLY USEFUL IF IT'S HONEST</p>
          <h2 id="pricing-title">Your home. Your space.<br /><em>Your quote.</em></h2>
          <p>Room sizes help tell the story. Share yours and we’ll prepare a personalised quote for your space.</p>
          <span className="pricing-location"><MapPin size={14} /> {business.location}</span>
        </div>
        <div className="reveal"><BhkCalculator /></div>
        <div className="pricing-honesty"><ShieldCheck size={16} /><p>Your room areas and requested services help shape the enquiry. <strong>Final pricing and availability are confirmed directly by the business.</strong></p></div>
      </div>
    </section>
  );
}