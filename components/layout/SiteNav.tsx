"use client";

import { ArrowUpRight, Menu, MessageCircle, Phone, Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";
import { business, whatsappUrl } from "@/data/site";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Our process", href: "#process" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [suppressFloatingAction, setSuppressFloatingAction] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 28);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("#pricing, #contact");
    if (!sections.length) return;
    const visibleSections = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) visibleSections.add(entry.target);
        else visibleSections.delete(entry.target);
      });
      setSuppressFloatingAction(visibleSections.size > 0);
    }, { rootMargin: "-8% 0px -8% 0px" });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header className={`site-nav${scrolled || menuOpen ? " is-solid" : ""}`}>
        <a className="brand-mark" href="#home" aria-label={`${business.name} home`} onClick={() => setMenuOpen(false)}>
          <span className="brand-icon" aria-hidden="true"><Sparkles size={17} strokeWidth={1.6} /></span>
          <span className="brand-copy"><span>Pure Cleaning</span><small>SERVICES · KANDIVALI</small></span>
        </a>

        <nav className={`desktop-nav${menuOpen ? " is-open" : ""}`} id="primary-navigation" aria-label="Main navigation">
          {navLinks.map((link) => <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>{link.label}</a>)}
          <a className="mobile-nav-contact" href={`tel:${business.phone}`}><Phone size={15} /> Call {business.phoneDisplay}</a>
        </nav>

        <div className="nav-actions">
          <a className="nav-call" href={`tel:${business.phone}`} aria-label={`Call ${business.phoneDisplay}`}><Phone size={16} /><span>Call us</span></a>
          <a className="button button-small button-green nav-quote" href="#pricing">Get a quote <ArrowUpRight size={15} /></a>
          <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="primary-navigation" aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </header>
      <a className={`mobile-whatsapp${suppressFloatingAction ? " is-paused" : ""}`} href={whatsappUrl("Hello! I'd like to enquire about a home deep-cleaning quote in Kandivali.")} aria-label="Request a cleaning quote on WhatsApp" aria-hidden={suppressFloatingAction} tabIndex={suppressFloatingAction ? -1 : undefined}>
        <MessageCircle size={19} /> <span>WhatsApp</span>
      </a>
    </>
  );
}