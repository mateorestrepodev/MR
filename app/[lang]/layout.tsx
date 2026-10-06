import type { Metadata } from "next";
import "../globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Generación Dinámica de SEO Global (Cambia según idioma)
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const isEs = resolvedParams.lang === "es";

  return {
    title: "MR Medellin Private Tours | Luxury Travel & Concierge",
    description: isEs
      ? "Experiencias de viaje premium, traslados VIP y servicio de concierge privado en Medellín, Colombia. Diseñamos itinerarios a la medida."
      : "Premium travel experiences, VIP transfers, and private concierge service in Medellín, Colombia. Tailor-made itineraries.",
    keywords: isEs
      ? "Tours privados Medellín, Guatapé tour de lujo, Concierge Medellín, Transporte VIP aeropuerto MDE, Comuna 13 privado"
      : "Medellin private tours, Guatape luxury tour, Medellin concierge, VIP airport transfer MDE, Comuna 13 private guide",
    openGraph: {
      title: "MR Medellin Private Tours | Luxury Travel",
      description: isEs
        ? "Tu concierge privado en Medellín."
        : "Your private concierge in Medellin.",
      type: "website",
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;

  // JSON-LD: El arma secreta del GEO-SEO.
  // Esto vincula matemáticamente tu web con Google Maps.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "MR Medellin Private Tours",
    image: "https://www.tusitioweb.com/logo/logomr.svg", // Cambiarás esto por tu dominio real
    description:
      "Premium private tours and concierge service in Medellín, Colombia.",
    url: "https://www.tusitioweb.com",
    telephone: "+573181686591",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Medellín",
      addressRegion: "Antioquia",
      addressCountry: "CO",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 6.2442,
      longitude: -75.5812, // Coordenadas centrales de Medellín
    },
    priceRange: "$$$",
  };

  return (
    <html lang={resolvedParams.lang} className="scroll-smooth">
      <head>
        {/* Inyectamos la data estructurada para los robots de Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#F2F1EC] text-[#202522] antialiased selection:bg-[#29483D] selection:text-[#FFFFFF]">
        <Navbar lang={resolvedParams.lang} />
        <main className="flex-grow">{children}</main>
        <Footer lang={resolvedParams.lang} />
      </body>
    </html>
  );
}
