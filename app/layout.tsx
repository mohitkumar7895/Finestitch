import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SiteProvider } from "@/context/SiteContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import InquiryModal from "@/components/InquiryModal";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0b233a",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://finestitchuniforms.com"),
  title: {
    default: "Fine Stitch Uniforms | Premier Uniform Manufacturer in Mumbai",
    template: "%s | Fine Stitch Uniforms Mumbai",
  },
  description:
    "Fine Stitch Uniforms is Mumbai’s leading manufacturer and wholesale supplier of customized corporate, school, industrial, hospital, hotel, and security uniforms. Owned by Aadil Moinuddin Sayyed in Malad West, Mumbai.",
  keywords: [
    "Uniform Manufacturer in Mumbai",
    "Customized Uniform Supplier Mumbai",
    "Corporate Uniforms Mumbai",
    "School Uniform Manufacturer Mumbai",
    "Industrial Uniform Supplier Mumbai",
    "Customized T-Shirts Mumbai",
    "Hospital Scrubs Mumbai",
    "Hotel Uniforms Mumbai",
    "Security Guard Uniforms Mumbai",
    "Fine Stitch Uniforms",
    "Aadil Moinuddin Sayyed",
    "Malwani Malad West Uniforms",
  ],
  authors: [{ name: "Aadil Moinuddin Sayyed", url: "https://finestitchuniforms.com" }],
  creator: "Aadil Moinuddin Sayyed",
  publisher: "Fine Stitch Uniforms",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://finestitchuniforms.com",
    title: "Fine Stitch Uniforms | Custom Uniforms & Apparel Solutions Mumbai",
    description:
      "High-grade uniform manufacturing, bespoke embroidery, durable fabrics, and wholesale prices for corporate, educational, industrial, and healthcare institutions.",
    siteName: "Fine Stitch Uniforms",
    images: [
      {
        url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Fine Stitch Uniforms Mumbai",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Schema.org LocalBusiness JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Fine Stitch Uniforms",
    "image": "https://finestitchuniforms.com/logo/logo.svg",
    "url": "https://finestitchuniforms.com",
    "telephone": "+919619585005",
    "email": "sayyedaadil35@yahoo.com",
    "founder": {
      "@type": "Person",
      "name": "Aadil Moinuddin Sayyed"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Malwani, Malad West",
      "addressLocality": "Mumbai",
      "addressRegion": "Maharashtra",
      "postalCode": "400095",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 19.1951,
      "longitude": 72.8258
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        "opens": "09:30",
        "closes": "20:30"
      }
    ],
    "priceRange": "₹₹",
    "areaServed": ["Mumbai", "Maharashtra", "India"],
    "sameAs": [
      "https://wa.me/919619585005"
    ]
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased bg-slate-50 text-slate-800">
        <SiteProvider>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
          <WhatsAppButton />
          <InquiryModal />
        </SiteProvider>
      </body>
    </html>
  );
}

