import type { Metadata, Viewport } from "next";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource-variable/dm-sans";
import "./globals.css";

export const metadata: Metadata = {
  ...(process.env.NEXT_PUBLIC_SITE_URL ? { metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL) } : {}),
  title: "Pure Cleaning Services | Home Deep Cleaning in Kandivali, Mumbai",
  description: "Looking for professional home deep cleaning in Kandivali, Mumbai? Contact Pure Cleaning Services for a quote tailored to your home size and cleaning requirements.",
  openGraph: {
    title: "Pure Cleaning Services | Home Deep Cleaning in Kandivali, Mumbai",
    description: "A considered deep clean, tailored to your home. Request your quote in Kandivali, Mumbai.",
    type: "website",
    locale: "en_IN",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f4f0e8",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN">
      <body>{children}</body>
    </html>
  );
}