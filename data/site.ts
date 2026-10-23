export const business = {
  name: "Pure Cleaning Services",
  phoneDisplay: "+91 9082485363",
  phone: "+919082485363",
  whatsapp: "919082485363",
  location: "Kandivali, Mumbai, Maharashtra",
} as const;

export const images = {
  hero: "/images/hero-apartment.jpg",
  livingRoom: "/images/living-room.jpg",
  floorCare: "/images/floor-care.jpg",
  vacuum: "/images/vacuum-detail.jpg",
  kitchen: "/images/kitchen-care.jpg",
  glass: "/images/glass-care.jpg",
} as const;

export function whatsappUrl(message: string) {
  return `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const services = [
  { name: "Full-home deep cleaning", type: "Primary service", note: "Scope tailored to your home and confirmed with you before booking." },
  { name: "Kitchen deep cleaning", type: "Configurable", note: "An optional area. Please ask us to confirm its availability." },
  { name: "Bathroom deep cleaning", type: "Configurable", note: "An optional area. Please ask us to confirm its availability." },
  { name: "Bedroom cleaning", type: "Configurable", note: "Room-by-room scope can be discussed with your quote." },
  { name: "Living room & floors", type: "Configurable", note: "Floor and furnishing requirements vary by home." },
  { name: "Sofa & upholstery", type: "Configurable", note: "Ask about fabric and upholstery requirements." },
  { name: "Windows & glass", type: "Configurable", note: "Glass and window-track work is confirmed on enquiry." },
  { name: "Balcony cleaning", type: "Configurable", note: "Share your balcony area when you request a quote." },
  { name: "Move-in & move-out", type: "Configurable", note: "Tell us your timeline and home configuration." },
] as const;

export const equipment = [
  { name: "Wet & dry vacuum", use: "Lifts dust and dry debris, and handles compatible wet pick-up.", surfaces: "Suitable hard floors and appropriate upholstery attachments." },
  { name: "Floor scrubber", use: "Works through floor residue over suitable larger hard-floor areas.", surfaces: "Surface compatibility should be checked before use." },
  { name: "Steam cleaner", use: "Applies heated steam for selected cleaning tasks.", surfaces: "Only heat-tolerant, compatible surfaces." },
  { name: "Upholstery extractor", use: "Rinses and extracts moisture from suitable fabrics.", surfaces: "Compatible upholstery and carpet; always fabric-dependent." },
  { name: "Glass cleaning kit", use: "Helps clean glass with a controlled, streak-conscious finish.", surfaces: "Windows, glass partitions and mirrors." },
  { name: "Electric scrubber", use: "Provides targeted agitation around hard-to-reach detail areas.", surfaces: "Compatible tile, grout and hard surfaces." },
  { name: "Microfiber & detail tools", use: "Useful for dusting and smaller, detailed surfaces.", surfaces: "A range of compatible furnishings and hard surfaces." },
  { name: "Trolley & protective gear", use: "Keeps supplies organised and supports careful work around a home.", surfaces: "Protective equipment is selected for the task." },
] as const;

export const processSteps = [
  { number: "01", title: "Tell us about your home", body: "Choose your BHK and share the room sizes and areas you have in mind." },
  { number: "02", title: "Receive a tailored quote", body: "We review the home size and requested scope before confirming a price." },
  { number: "03", title: "Choose a date", body: "Share a preferred date and ask us to confirm service availability." },
  { number: "04", title: "Enjoy your refreshed home", body: "Your agreed cleaning scope is the one to expect on the day." },
] as const;

export const faqs = [
  { question: "How is the cleaning price calculated?", answer: "Pricing depends on your BHK configuration, individual room sizes and the cleaning requirements you share. Send us the details for a personalised quote; all prices are confirmed by the business." },
  { question: "Do you clean 1 BHK, 2 BHK and 3 BHK apartments?", answer: "The quote request covers 1 BHK, 2 BHK and 3 BHK homes. Contact us to confirm availability and the cleaning scope for your home." },
  { question: "Can the quote change based on room size?", answer: "Yes. Room sizes and requested areas help us understand the scope. Your final quote is subject to confirmation by the business." },
  { question: "What is included in a full-home deep cleaning?", answer: "The precise areas and tasks are agreed with you before booking. Please ask which rooms and surfaces are included in your home-specific quote." },
  { question: "Can I request just a kitchen or bathroom deep clean?", answer: "These can be included as options in a quote request. Please confirm availability and scope with the business before booking." },
  { question: "How can I book a service?", answer: "Call +91 9082485363 or send a WhatsApp message with your BHK, room sizes, requested services and preferred date. Your booking is only confirmed when the business replies." },
  { question: "Which areas do you serve?", answer: "Pure Cleaning Services is based in Kandivali, Mumbai. Please contact the business to confirm service availability for your location." },
  { question: "How should I prepare my home before cleaning?", answer: "Share any surface-care concerns and your requested scope with the business first. They can advise you on any preparation for your specific booking." },
] as const;

export const pricingConfig = {
  currency: "INR",
  ratesConfigured: false,
  startingPriceByBhk: { "1": null, "2": null, "3": null } as Record<"1" | "2" | "3", number | null>,
  perSquareFoot: null as number | null,
  ratesByRoomType: {} as Partial<Record<"living" | "bedroom" | "kitchen" | "bathroom" | "balcony" | "additional", number>>,
  optionalServiceCharges: {} as Record<string, number>,
  minimumServiceCharge: null as number | null,
  taxRate: null as number | null,
} as const;