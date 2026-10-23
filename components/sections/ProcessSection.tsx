import { ArrowRight } from "lucide-react";
import { processSteps } from "@/data/site";

export function ProcessSection() {
  return (
    <section className="process-section" id="process" aria-labelledby="process-title">
      <div className="section-wrap process-wrap">
        <div className="process-heading reveal">
          <p className="eyebrow"><span className="eyebrow-line" /> GOOD TO KNOW, STEP BY STEP</p>
          <h2 id="process-title">Thoughtful cleaning.<br /><em>From start to finish.</em></h2>
          <p>Clear details first. A booking that is confirmed by the business before it goes in your calendar.</p>
        </div>
        <div className="process-steps">
          <div className="process-track" aria-hidden="true"><span className="process-track-fill" /></div>
          {processSteps.map((step) => (
            <article className="process-step reveal" key={step.number}>
              <span className="process-marker"><span /></span>
              <div className="process-step-number">{step.number} <ArrowRight size={14} /></div>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}