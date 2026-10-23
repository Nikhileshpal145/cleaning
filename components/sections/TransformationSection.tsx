"use client";

import { useState } from "react";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import { images } from "@/data/site";

const examples = [
  { label: "Kitchen surfaces", image: images.kitchen, alt: "Supplied illustrative view of a kitchen surface" },
  { label: "Bathroom tile & glass", image: images.glass, alt: "Supplied illustrative view of glass being cleaned" },
  { label: "Floor detail", image: images.floorCare, alt: "Supplied illustrative view of apartment floor care" },
  { label: "Sofa & upholstery", image: images.livingRoom, alt: "Supplied illustrative view of an apartment living space" },
] as const;

export function TransformationSection() {
  const [active, setActive] = useState(0);

  return (
    <section className="transformation-section" id="difference" aria-labelledby="transformation-title">
      <div className="section-wrap transformation-wrap">
        <div className="transformation-copy reveal">
          <p className="eyebrow eyebrow-light"><span className="eyebrow-line" /> A LITTLE MORE CLARITY</p>
          <h2 id="transformation-title">See the<br /><em>difference.</em></h2>
          <p>Choose a room and move the divider to explore a before-and-after comparison.</p>
          <span className="illustrative-note">Illustrative images only · Not customer results</span>
          <div className="transformation-counter"><span>0{active + 1}</span><span className="transformation-counter-line" /><span>04</span></div>
        </div>
        <div className="transformation-view reveal">
          <BeforeAfterSlider {...examples[active]} />
          <div className="transformation-tabs" role="group" aria-label="Choose a room for illustrative comparison">
            {examples.map((example, index) => (
              <button className={active === index ? "is-current" : ""} type="button" aria-pressed={active === index} key={example.label} onClick={() => setActive(index)}>
                <span>0{index + 1}</span>{example.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}