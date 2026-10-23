"use client";

import { ArrowUpRight, Check, MessageCircle, Plus } from "lucide-react";
import { useState } from "react";
import { business, pricingConfig, services, whatsappUrl } from "@/data/site";

type Bhk = "1" | "2" | "3";
type AdditionalArea = { name: string; size: string };
type RoomAreas = {
  living: string;
  bedrooms: string[];
  kitchen: string;
  bathroom: string;
  balcony: string;
  additionalAreas: AdditionalArea[];
};

const optionalAreaFields: { key: "balcony"; label: string }[] = [
  { key: "balcony", label: "Balcony · optional" },
];

const packageOptions = [services[0].name, ...services.slice(1).map((service) => service.name)];

function numberFrom(value: string) {
  const parsed = Number(value);
  return value.trim() !== "" && Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

export function BhkCalculator() {
  const [bhk, setBhk] = useState<Bhk>("1");
  const [areas, setAreas] = useState<RoomAreas>({ living: "", bedrooms: [""], kitchen: "", bathroom: "", balcony: "", additionalAreas: [{ name: "", size: "" }] });
  const [bathrooms, setBathrooms] = useState("1");
  const [selected, setSelected] = useState<string[]>([services[0].name]);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");

  const validDimension = (value: string, maximum = 10000) => {
    if (value === "") return true;
    const dimension = Number(value);
    return Number.isFinite(dimension) && dimension >= 0 && dimension <= maximum;
  };

  const invalidBathroomCount = !/^\d+$/.test(bathrooms) || Number(bathrooms) < 1 || Number(bathrooms) > 8;
  const hasInvalidInput = invalidBathroomCount
    || !validDimension(areas.living)
    || !validDimension(areas.kitchen)
    || !validDimension(areas.bathroom, 1000)
    || !validDimension(areas.balcony)
    || areas.additionalAreas.some((area) => !validDimension(area.size))
    || areas.bedrooms.some((size) => !validDimension(size));

  const areaTotal = numberFrom(areas.living)
    + areas.bedrooms.reduce((sum, size) => sum + numberFrom(size), 0)
    + numberFrom(areas.kitchen)
    + numberFrom(areas.bathroom) * (invalidBathroomCount ? 0 : Number(bathrooms))
    + numberFrom(areas.balcony)
    + areas.additionalAreas.reduce((sum, area) => sum + numberFrom(area.size), 0);

  const configuredStartingPrice = pricingConfig.startingPriceByBhk[bhk];
  const configuredRoomRates = pricingConfig.ratesByRoomType;
  const configuredRoomArea = [
    numberFrom(areas.living) * (configuredRoomRates.living ?? 0),
    areas.bedrooms.reduce((sum, size) => sum + numberFrom(size) * (configuredRoomRates.bedroom ?? 0), 0),
    numberFrom(areas.kitchen) * (configuredRoomRates.kitchen ?? 0),
    numberFrom(areas.bathroom) * (invalidBathroomCount ? 0 : Number(bathrooms)) * (configuredRoomRates.bathroom ?? 0),
    numberFrom(areas.balcony) * (configuredRoomRates.balcony ?? 0),
    areas.additionalAreas.reduce((sum, area) => sum + numberFrom(area.size) * (configuredRoomRates.additional ?? 0), 0),
  ].reduce((sum, amount) => sum + amount, 0);
  const hasPricingRates = configuredStartingPrice !== null
    || pricingConfig.perSquareFoot !== null
    || Object.keys(configuredRoomRates).length > 0;
  const enteredRoomTypes = [
    ...(areas.living ? ["living" as const] : []),
    ...(areas.bedrooms.some((size) => size !== "") ? ["bedroom" as const] : []),
    ...(areas.kitchen ? ["kitchen" as const] : []),
    ...(areas.bathroom ? ["bathroom" as const] : []),
    ...(areas.balcony ? ["balcony" as const] : []),
    ...(areas.additionalAreas.some((area) => area.size !== "") ? ["additional" as const] : []),
  ];
  const roomRatesCoverProvidedAreas = pricingConfig.perSquareFoot !== null
    || enteredRoomTypes.every((room) => configuredRoomRates[room] !== undefined);
  const selectedServiceCharges = selected.reduce((sum, service) => sum + (pricingConfig.optionalServiceCharges[service] ?? 0), 0);
  const allSelectedServicesPriced = selected.every((service) => service === services[0].name || service in pricingConfig.optionalServiceCharges);
  const baseEstimate = Math.max(
    pricingConfig.minimumServiceCharge ?? 0,
    (configuredStartingPrice ?? 0)
      + (pricingConfig.perSquareFoot !== null ? areaTotal * pricingConfig.perSquareFoot : configuredRoomArea)
      + selectedServiceCharges,
  );
  const estimatedPrice = pricingConfig.taxRate === null ? baseEstimate : baseEstimate * (1 + pricingConfig.taxRate / 100);
  const showEstimate = pricingConfig.ratesConfigured && hasPricingRates && roomRatesCoverProvidedAreas && allSelectedServicesPriced && estimatedPrice > 0;

  const setBhkOption = (option: Bhk) => {
    setBhk(option);
    setAreas((current) => ({ ...current, bedrooms: Array.from({ length: Number(option) }, (_, index) => current.bedrooms[index] ?? "") }));
  };

  const updateArea = (field: "living" | "kitchen" | "bathroom" | "balcony" | "additional", value: string) => {
    setAreas((current) => ({ ...current, [field]: value }));
  };

  const updateBedroom = (index: number, value: string) => {
    setAreas((current) => ({ ...current, bedrooms: current.bedrooms.map((area, areaIndex) => areaIndex === index ? value : area) }));
  };

  const updateAdditionalArea = (index: number, field: keyof AdditionalArea, value: string) => {
    setAreas((current) => ({
      ...current,
      additionalAreas: current.additionalAreas.map((area, areaIndex) => areaIndex === index ? { ...area, [field]: value } : area),
    }));
  };

  const toggleService = (service: string) => {
    setSelected((current) => current.includes(service) ? current.filter((item) => item !== service) : [...current, service]);
  };

  const roomSummary = [
    `Living room: ${areas.living || "not provided"} sq ft`,
    ...areas.bedrooms.map((size, index) => `Bedroom ${index + 1}: ${size || "not provided"} sq ft`),
    `Kitchen: ${areas.kitchen || "not provided"} sq ft`,
    `Bathrooms: ${invalidBathroomCount ? "not valid" : bathrooms}${areas.bathroom ? ` x ${areas.bathroom} sq ft` : " (size not provided)"}`,
    `Balcony: ${areas.balcony ? `${areas.balcony} sq ft` : "not provided"}`,
    ...areas.additionalAreas.filter((area) => area.name || area.size).map((area, index) => `Additional area ${index + 1}: ${area.name || "unspecified"} · ${area.size || "size not provided"} sq ft`),
  ];

  const message = [
    "Hello! I would like a personalised home deep-cleaning quote.",
    "",
    `Name: ${name.trim() || "Not provided"}`,
    `Home: ${bhk} BHK`,
    "Room sizes:",
    ...roomSummary.map((line) => `- ${line}`),
    `Estimated entered area: ${areaTotal > 0 ? `${areaTotal.toLocaleString("en-IN")} sq ft` : "Not provided"}`,
    `Services requested: ${selected.length ? selected.join(", ") : "Please discuss options"}`,
    `Preferred date: ${date || "Not specified"}`,
    "",
    `Please confirm availability and provide a quote. I understand the final quote is subject to confirmation by ${business.name}.`,
  ].join("\n");

  return (
    <div className="calculator" aria-label="Personalised cleaning quote request">
      <div className="calculator-main">
        <div className="calculator-step-title"><span>01</span><div><h3>Tell us about your home</h3><p>Start with your BHK. Room sizes can be approximate.</p></div></div>
        <fieldset className="bhk-picker">
          <legend className="sr-only">Choose the number of bedrooms</legend>
          {(["1", "2", "3"] as const).map((option) => (
            <button key={option} type="button" className={`bhk-option${bhk === option ? " is-selected" : ""}`} aria-pressed={bhk === option} onClick={() => setBhkOption(option)}>
              <span>{option} BHK</span><small>{Number(option) === 1 ? "One bedroom" : `${option} bedrooms`}</small>{bhk === option && <Check size={15} />}
            </button>
          ))}
        </fieldset>

        <div className="room-field-heading"><h4>Room areas</h4><span>Square feet</span></div>
        <div className="room-fields">
          <label className="area-field"><span>Living room</span><span className="input-unit"><input aria-invalid={!validDimension(areas.living)} type="number" min="0" max="10000" step="1" inputMode="numeric" placeholder="e.g. 220" value={areas.living} onChange={(event) => updateArea("living", event.target.value)} /><i>sq ft</i></span></label>
          {areas.bedrooms.map((size, index) => <label className="area-field" key={`bedroom-${index}`}><span>Bedroom {index + 1}</span><span className="input-unit"><input aria-invalid={!validDimension(size)} type="number" min="0" max="10000" step="1" inputMode="numeric" placeholder="e.g. 140" value={size} onChange={(event) => updateBedroom(index, event.target.value)} /><i>sq ft</i></span></label>)}
          <label className="area-field"><span>Kitchen</span><span className="input-unit"><input aria-invalid={!validDimension(areas.kitchen)} type="number" min="0" max="10000" step="1" inputMode="numeric" placeholder="e.g. 85" value={areas.kitchen} onChange={(event) => updateArea("kitchen", event.target.value)} /><i>sq ft</i></span></label>
          <label className="area-field"><span>Bathrooms</span><span className="bathroom-inputs"><input aria-label="Number of bathrooms" aria-invalid={invalidBathroomCount} type="number" min="1" max="8" step="1" inputMode="numeric" value={bathrooms} onChange={(event) => setBathrooms(event.target.value)} /><span>×</span><span className="input-unit"><input aria-label="Area of each bathroom in square feet" aria-invalid={!validDimension(areas.bathroom, 1000)} type="number" min="0" max="1000" step="1" inputMode="numeric" placeholder="size each" value={areas.bathroom} onChange={(event) => updateArea("bathroom", event.target.value)} /><i>sq ft</i></span></span></label>
          {optionalAreaFields.map((field) => <label className="area-field" key={field.key}><span>{field.label}</span><span className="input-unit"><input aria-invalid={!validDimension(areas[field.key])} type="number" min="0" max="10000" step="1" inputMode="numeric" placeholder="Optional" value={areas[field.key]} onChange={(event) => updateArea(field.key, event.target.value)} /><i>sq ft</i></span></label>)}
          {areas.additionalAreas.map((area, index) => <div className="additional-area" key={`additional-${index}`}><label className="area-field"><span>Additional area {index + 1} · optional</span><input className="plain-input" type="text" maxLength={60} placeholder="e.g. utility room" value={area.name} onChange={(event) => updateAdditionalArea(index, "name", event.target.value)} /></label><label className="area-field"><span>Area size · sq ft</span><span className="input-unit"><input aria-label={`Additional area ${index + 1} size in square feet`} aria-invalid={!validDimension(area.size)} type="number" min="0" max="10000" step="1" inputMode="numeric" placeholder="Optional" value={area.size} onChange={(event) => updateAdditionalArea(index, "size", event.target.value)} /><i>sq ft</i></span></label></div>)}
          <button className="add-area-button" type="button" onClick={() => setAreas((current) => ({ ...current, additionalAreas: [...current.additionalAreas, { name: "", size: "" }] }))}><Plus size={14} /> Add another area</button>
        </div>
        {hasInvalidInput && <p className="calculator-error" id="calculator-error" role="alert">Please enter non-negative room sizes up to 10,000 sq ft and a whole number of 1–8 bathrooms.</p>}

        <div className="calculator-divider" />
        <div className="calculator-step-title"><span>02</span><div><h3>Choose your requirements</h3><p>Optional work must be confirmed by the business.</p></div></div>
        <fieldset className="service-checks">
          <legend className="sr-only">Select cleaning services to include in your quote request</legend>
          {packageOptions.map((service, index) => <label className="service-check" key={service}><input type="checkbox" checked={selected.includes(service)} onChange={() => toggleService(service)} /><span className="custom-check"><Check size={13} /></span><span>{service}</span>{index > 0 && <small>Ask to confirm</small>}</label>)}
        </fieldset>

        <div className="calculator-divider" />
        <div className="calculator-step-title"><span>03</span><div><h3>Make it personal</h3><p>Both details are optional.</p></div></div>
        <div className="personal-fields">
          <label className="area-field"><span>Your name</span><input className="plain-input" type="text" autoComplete="name" maxLength={80} placeholder="How should we address you?" value={name} onChange={(event) => setName(event.target.value)} /></label>
          <label className="area-field"><span>Preferred service date</span><input className="plain-input date-input" type="date" value={date} onChange={(event) => setDate(event.target.value)} /></label>
        </div>
      </div>

      <aside className="quote-summary" aria-live="polite">
        <span className="quote-summary-mark"><Plus size={21} /></span>
        <p className="eyebrow">YOUR PERSONAL QUOTE</p>
        <h3>A home that’s<br /><em>one of a kind.</em></h3>
        <p className="quote-message">{showEstimate ? "An estimate based on the current configured rates and areas entered." : "Get a personalised quote based on your home size."}</p>
        {showEstimate && <p className="configured-price">{new Intl.NumberFormat("en-IN", { style: "currency", currency: pricingConfig.currency, maximumFractionDigits: 0 }).format(estimatedPrice)} <span>estimate</span></p>}
        <div className="quote-area-block"><span>ENTERED ROOM AREAS</span>{areaTotal > 0 ? <strong>{areaTotal.toLocaleString("en-IN")} <small>sq ft</small></strong> : <p>Add room sizes to see your estimated area.</p>}</div>
        <div className="quote-meta"><span>HOME</span><strong>{bhk} BHK</strong><i /><span>OPTIONS</span><strong>{selected.length}</strong></div>
        <p className="quote-disclaimer">{showEstimate ? `Estimate uses the configured rates${pricingConfig.taxRate === null ? "" : ` and includes ${pricingConfig.taxRate}% tax`}. The final quote and availability are subject to confirmation by ${business.name}.` : `Rates have not been provided. No price is estimated or displayed. Your quote is subject to confirmation by ${business.name}.`}</p>
        <a className={`button button-green quote-cta${hasInvalidInput ? " is-disabled" : ""}`} aria-disabled={hasInvalidInput} aria-describedby={hasInvalidInput ? "calculator-error" : undefined} href={whatsappUrl(message)} onClick={(event) => { if (hasInvalidInput) event.preventDefault(); }} target="_blank" rel="noreferrer"><MessageCircle size={17} /> Request my quote <ArrowUpRight size={17} /></a>
        <span className="quote-respond-note">Opens WhatsApp with your home details</span>
        <span className="quote-config-note" hidden={pricingConfig.ratesConfigured}>Personalised pricing · no automated rates</span>
      </aside>
    </div>
  );
}