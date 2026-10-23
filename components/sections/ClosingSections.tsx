import Image from "next/image";
import { ArrowDown, ArrowUpRight, Check, ChevronDown, MapPin, MessageCircle, Phone, ScanSearch, SlidersHorizontal, Sparkles } from "lucide-react";
import { faqs, images } from "@/data/site";

const benefits = [
  { number: "01", icon: SlidersHorizontal, title: "Thoughtfully sized to your home", body: "BHK, room by room, and real area make for a more useful conversation." },
  { number: "02", icon: ScanSearch, title: "Attention to the easily missed", body: "A deep-cleaning enquiry includes room to discuss the details that matter to you." },
  { number: "03", icon: Sparkles, title: "A method for the material", body: "Suitable products and equipment always depend on the surface and agreed scope." },
  { number: "04", icon: MessageCircle, title: "A clear way to get in touch", body: "Send your requirements directly by WhatsApp or call and discuss a quote." },
];

export function BenefitsSection() {
  return (
    <section className="benefits-section" aria-labelledby="benefits-title">
      <div className="section-wrap">
        <div className="benefits-heading reveal">
          <div><p className="eyebrow"><span className="eyebrow-line" /> A GOOD CLEAN STARTS WITH A CONVERSATION</p><h2 id="benefits-title">Professional care<br /><em>for your space.</em></h2></div>
          <p>Comfortably clear, tailored to your home, and confirmed with you before you book.</p>
        </div>
        <div className="benefit-grid">
          {benefits.map(({ number, icon: Icon, title, body }) => <article className="benefit-card reveal" key={number}><div className="benefit-top"><span>{number} / 04</span><Icon size={17} strokeWidth={1.6} /></div><h3>{title}</h3><p>{body}</p><span className="benefit-check"><Check size={12} /></span></article>)}
        </div>
      </div>
    </section>
  );
}

export function FAQSection() {
  return (
    <section className="faq-section" id="faq" aria-labelledby="faq-title">
      <div className="section-wrap faq-wrap">
        <div className="faq-heading reveal">
          <p className="eyebrow"><span className="eyebrow-line" /> THE DETAILS, MADE SIMPLE</p>
          <h2 id="faq-title">A few good<br /><em>questions.</em></h2>
          <p>Something else on your mind? A quick conversation can answer it.</p>
          <a className="text-link" href="#contact">Talk to our team <ArrowUpRight size={16} /></a>
        </div>
        <div className="faq-list reveal">
          {faqs.map((faq, index) => <details className="faq-item" key={faq.question}>
            <summary><span className="faq-number">{String(index + 1).padStart(2, "0")}</span><span className="faq-question">{faq.question}</span><ChevronDown className="faq-chevron" size={17} strokeWidth={1.7} /></summary>
            <p>{faq.answer}</p>
          </details>)}
        </div>
      </div>
    </section>
  );
}

export function ContactSection() {
  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-title">
      <div className="contact-image"><Image src={images.livingRoom} alt="Sunlight across a quiet living room in an apartment" fill sizes="100vw" quality={75} /></div>
      <div className="contact-overlay" />
      <div className="contact-content reveal">
        <p className="eyebrow eyebrow-light"><span className="eyebrow-line" /> A FRESH START IS A GOOD FEELING</p>
        <h2 id="contact-title">Ready for a<br /><em>cleaner home?</em></h2>
        <p>Tell us about your space. We’ll help you find the right cleaning service.</p>
        <div className="contact-actions">
          <a className="button button-gold" href="#pricing">Get my quote <ArrowUpRight size={17} /></a>
          <a className="button button-outline-light" href="tel:+919082485363"><Phone size={16} /> Call +91 9082485363</a>
          <a className="contact-whatsapp" href="https://wa.me/919082485363" target="_blank" rel="noreferrer"><MessageCircle size={17} /> Chat on WhatsApp <ArrowUpRight size={15} /></a>
        </div>
        <span className="contact-location"><MapPin size={14} /> Kandivali, Mumbai, Maharashtra</span>
      </div>
      <a className="contact-scroll" href="#footer" aria-label="Scroll to the site footer"><ArrowDown size={15} /></a>
    </section>
  );
}