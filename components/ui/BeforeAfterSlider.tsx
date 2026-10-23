"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";

type Props = { image: string; alt: string; label: string };

export function BeforeAfterSlider({ image, alt, label }: Props) {
  const [split, setSplit] = useState(52);

  return (
    <div className="comparison-frame">
      <div className="comparison-image">
        <Image src={image} alt={alt} fill sizes="(max-width: 720px) 100vw, 57vw" quality={75} />
        <div className="comparison-before" style={{ "--split": `${split}%` } as CSSProperties} aria-hidden="true">
          <Image src={image} alt="" fill sizes="(max-width: 720px) 100vw, 57vw" quality={75} />
        </div>
        <span className="comparison-label comparison-label-before">Before</span>
        <span className="comparison-label comparison-label-after">After</span>
        <span className="comparison-handle" style={{ left: `${split}%` }} aria-hidden="true"><span /></span>
        <input className="comparison-range" aria-label={`Drag to compare the illustrative before and after ${label.toLowerCase()} images`} type="range" min="8" max="92" value={split} onChange={(event) => setSplit(Number(event.target.value))} />
      </div>
      <div className="comparison-caption"><span>{label}</span><span>Drag to compare</span></div>
    </div>
  );
}