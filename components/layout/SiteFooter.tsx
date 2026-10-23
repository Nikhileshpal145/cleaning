import { ArrowUpRight, MapPin, MessageCircle, Phone, Sparkles } from "lucide-react";
import { business, whatsappUrl } from "@/data/site";

const footerServices = ["Home deep cleaning", "Kitchen & bathroom", "Move-in & move-out"];

export function SiteFooter() {
  return (
    <footer className="site-footer" id="footer">
      <div className="section-wrap footer-wrap">
        <div className="footer-main">
          <div className="footer-brand-block">
            <a className="brand-mark footer-brand" href="#home"><span className="brand-icon"><Sparkles size={17} strokeWidth={1.6} /></span><span className="brand-copy"><span>Pure Cleaning</span><small>SERVICES · KANDIVALI</small></span></a>
            <p>A considered deep clean for your home in Kandivali, Mumbai. Every quote starts with your space.</p>
            <a className="footer-location" href="https://maps.google.com/?q=Kandivali%2C+Mumbai%2C+Maharashtra" target="_blank" rel="noreferrer"><MapPin size={15} /> {business.location} <ArrowUpRight size={13} /></a>
          </div>
          <div className="footer-column"><h3>EXPLORE</h3><a href="#services">Our services</a><a href="#process">Our process</a><a href="#pricing">Request a quote</a><a href="#faq">FAQs</a></div>
          <div className="footer-column"><h3>OUR SERVICES</h3>{footerServices.map((service) => <a key={service} href="#services">{service}</a>)}<span className="footer-service-note">Availability confirmed on enquiry</span></div>
          <div className="footer-column footer-contact"><h3>LET’S TALK</h3><a className="footer-contact-link" href={`tel:${business.phone}`}><Phone size={15} /> {business.phoneDisplay}</a><a className="footer-contact-link" href={whatsappUrl("Hello! I'd like a home deep-cleaning quote in Kandivali.")} target="_blank" rel="noreferrer"><MessageCircle size={15} /> WhatsApp us</a></div>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} {business.name}</span><span>Thoughtful home care · Kandivali, Mumbai</span><a href="#home">Back to top ↑</a></div>
      </div>
    </footer>
  );
}