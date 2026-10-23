import Image from "next/image";
import { ArrowDown, ArrowUpRight, MapPin, MessageCircle } from "lucide-react";
import { business, images, whatsappUrl } from "@/data/site";

export function Hero() {
  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <div className="hero-image">
        <Image src={images.hero} alt="A sunlit, thoughtfully furnished apartment living room" fill preload sizes="100vw" quality={75} />
      </div>
      <div className="hero-scrim" />
      <div className="hero-content">
        <p className="eyebrow hero-eyebrow"><span className="eyebrow-line" /> A more considered clean</p>
        <h1 id="hero-title">Every corner.<br /><em>A fresh start.</em></h1>
        <p className="hero-intro">Professional deep cleaning for your home, tailored to your space.</p>
        <div className="hero-actions">
          <a className="button button-gold" href="#pricing">Calculate my price <ArrowUpRight size={17} /></a>
          <a className="hero-whatsapp" href={whatsappUrl("Hello! I'd like to book a home deep cleaning in Kandivali.")}><MessageCircle size={17} /> Book on WhatsApp</a>
        </div>
        <span className="hero-location"><MapPin size={15} /> {business.location}</span>
      </div>
      <a className="scroll-cue" href="#details"><span>Scroll to explore</span><ArrowDown size={15} /></a>
      <div className="hero-index"><span>01</span><span className="hero-index-line" /><span>06</span></div>
    </section>
  );
}