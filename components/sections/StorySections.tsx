import Image from "next/image";
import { ArrowUpRight, Droplets, Layers3, Sparkles } from "lucide-react";
import { equipment, images, services } from "@/data/site";

const detailMoments = [
  { label: "Under the everyday", title: "Floors beneath the furniture.", image: images.floorCare, alt: "Floor care in a softly lit apartment" },
  { label: "Where meals happen", title: "The kitchen, beyond the counters.", image: images.kitchen, alt: "A careful wipe-down of a dark kitchen countertop" },
  { label: "The finishing touch", title: "Glass that gathers the day.", image: images.glass, alt: "Glass being cleaned with a window squeegee" },
];

const equipmentPhotos = [images.vacuum, images.floorCare, images.kitchen, images.livingRoom, images.glass, images.kitchen, images.vacuum, images.livingRoom];
const equipmentNotes = equipment.map((item, index) => ({
  ...item,
  image: equipmentPhotos[index],
  category: `${String(index + 1).padStart(2, "0")} / TOOL EXAMPLE`,
  surfaces: item.surfaces.toUpperCase().replace(/[,;]/g, " ·"),
}));

export function ProblemSection() {
  return (
    <section className="details-section" id="details" aria-labelledby="details-title">
      <div className="section-wrap details-wrap">
        <div className="details-heading reveal">
          <p className="eyebrow"><span className="eyebrow-line" /> THE LITTLE THINGS ADD UP</p>
          <h2 id="details-title">Clean isn’t always<br /><em>deep clean.</em></h2>
          <p className="section-copy">The everyday wipe-down keeps a home going. A deeper clean pays attention to the places your regular routine may miss.</p>
          <a className="text-link" href="#equipment">See our thoughtful approach <ArrowUpRight size={16} /></a>
        </div>
        <div className="details-grid">
          {detailMoments.map((item, index) => (
            <article className={`detail-card detail-card-${index + 1} reveal`} key={item.label}>
              <div className="detail-photo">
                <Image src={item.image} alt={item.alt} fill sizes="(max-width: 720px) 100vw, 33vw" quality={75} />
                <span className="detail-number">0{index + 1}</span>
              </div>
              <div className="detail-caption"><span>{item.label}</span><h3>{item.title}</h3></div>
            </article>
          ))}
        </div>
        <div className="details-footnote">IMAGE NOTE&nbsp; / &nbsp;SUPPLIED CLEANING-SEQUENCE STILLS · ILLUSTRATIVE VISUALS</div>
      </div>
    </section>
  );
}

export function EquipmentSection() {
  return (
    <section className="equipment-section" id="equipment" aria-labelledby="equipment-title">
      <div className="section-wrap">
        <div className="equipment-heading reveal">
          <div>
            <p className="eyebrow"><span className="eyebrow-line" /> THE RIGHT TOOL FOR THE TASK</p>
            <h2 id="equipment-title">Precision in<br /><em>every pass.</em></h2>
          </div>
          <p className="section-copy">A few examples of professional cleaning tools. The right method depends on the surface, your home and the agreed scope. Equipment availability is confirmed when you enquire.</p>
        </div>
        <div className="equipment-grid">
          {equipmentNotes.map((item, index) => (
            <article className="equipment-card reveal" key={item.name}>
              <div className="equipment-photo">
                <Image src={item.image} alt={`${item.name}, shown in a supplied illustrative cleaning image`} fill sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 25vw" quality={75} />
                <span className="equipment-category">{item.category}</span>
              </div>
              <div className="equipment-copy">
                <span className="equipment-kicker">Example tool <span>·</span> 0{index + 1}</span>
                <h3>{item.name}</h3>
                <p>{item.use}</p>
                <span className="equipment-surfaces"><Layers3 size={13} /> {item.surfaces}</span>
              </div>
            </article>
          ))}
        </div>
        <div className="equipment-more reveal">
          <span className="equipment-more-icon"><Droplets size={17} /></span>
          <p><strong>And the smaller details.</strong> Steam cleaners, upholstery extractors, electric scrubbers, microfiber cloths, brushes, organised trolleys and appropriate protective gear are examples too. Your quote is the best place to confirm which tools suit your home.</p>
          <Sparkles size={18} className="equipment-more-mark" />
        </div>
      </div>
    </section>
  );
}

export function ServicesSection() {
  return (
    <section className="services-section" id="services" aria-labelledby="services-title">
      <div className="section-wrap">
        <div className="services-heading reveal">
          <div><p className="eyebrow"><span className="eyebrow-line" /> YOUR HOME, YOUR PRIORITIES</p><h2 id="services-title">A deeper clean<br /><em>for every space.</em></h2></div>
          <p className="section-copy">Start with a home deep-cleaning enquiry. The right rooms, optional extras and availability are confirmed with you before anything is booked.</p>
        </div>
        <div className="service-list">
          {services.map((service, index) => {
            const primary = index === 0;
            return (
              <a className={`service-row${primary ? " service-primary" : ""} reveal`} key={service.name} href="#pricing" aria-label={`Request a quote for ${service.name}`}>
                <span className="service-index">0{index + 1}</span>
                <span className="service-name"><strong>{service.name}</strong><small>{service.note}</small></span>
                <span className={`service-tag${primary ? " tag-primary" : ""}`}>{primary ? "Primary focus" : "Ask to confirm"}</span>
                <span className="service-arrow"><ArrowUpRight size={17} /></span>
              </a>
            );
          })}
        </div>
        <p className="services-note"><span>PLEASE NOTE</span> Only full-home deep cleaning is identified as the primary service. Other services are configurable options and must be confirmed by the business.</p>
      </div>
    </section>
  );
}