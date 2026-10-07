import type { Metadata } from "next";
import "../globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// ==========================================
// 1. METADATOS GLOBALES (Google, Redes Sociales, WhatsApp)
// ==========================================
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
      ? "Experiencias de viaje premium y traslados VIP en Medellín. Tours privados a Guatapé, Comuna 13, Pueblito Paisa, Fincas Cafeteras y traslados aeropuerto MDE."
      : "Premium travel experiences and VIP transfers in Medellin. Private tours to Guatape, Comuna 13, Coffee Farms, and MDE airport concierge service.",
    keywords: isEs
      ? "Tours privados Medellín, Guatapé tour de lujo, Concierge Medellín, Transporte VIP aeropuerto MDE, Comuna 13 privado, Pueblito Paisa, Tour del Café Medellín"
      : "Medellin private tours, Guatape luxury tour, Medellin concierge, VIP airport transfer MDE, Comuna 13 private guide, Coffee tour Medellin",

    // Configuración para WhatsApp, Facebook, LinkedIn
    openGraph: {
      title: "MR Medellin Private Tours | Luxury Travel",
      description: isEs
        ? "Tu concierge privado en Medellín. Descubre Guatapé y la cultura local con servicio VIP."
        : "Your private concierge in Medellin. Discover Guatape and local culture with VIP service.",
      url: "https://mrtours.co",
      siteName: "MR Medellin Private Tours",
      type: "website",
    },

    // Configuración para X (Twitter)
    twitter: {
      card: "summary_large_image",
      title: "MR Medellin Private Tours",
      description: "Luxury Travel & Concierge in Medellin, Colombia.",
    },

    // Le decimos a Google y a las IA de qué trata tu página
    category: "travel",
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

  // ==========================================
  // 2. JSON-LD: EL ARMA SECRETA PARA GOOGLE MAPS Y LAS IA (ChatGPT, Gemini)
  // ==========================================
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "MR Medellin Private Tours",
    // Asegúrate de que esta URL exista (lo haremos en el Paso 2)
    image: "https://mrtours.co/logo/logomrletra.png",
    description:
      "Premium private tours, VIP transportation, and concierge service in Medellín, Colombia. Specializing in Guatapé, Comuna 13, and Coffee Tours.",
    url: "https://mrtours.co",
    telephone: "+573181686591",
    priceRange: "$$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Medellín",
      addressRegion: "Antioquia",
      addressCountry: "CO",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 6.2442,
      longitude: -75.5812, // Centro de Medellín
    },
    // Esto es CLAVE para la Inteligencia Artificial (AIO): Le dice exactamente qué ofreces
    makesOffer: [
      { "@type": "Offer", name: "Private Tour to Guatapé" },
      { "@type": "Offer", name: "VIP Airport Transfer (MDE)" },
      { "@type": "Offer", name: "Comuna 13 Private Guide" },
      { "@type": "Offer", name: "Coffee Farm Experience" },
    ],
  };

  return (
    <html lang={resolvedParams.lang} className="scroll-smooth">
      <head>
        {/* Inyectamos la data estructurada para los robots de Google y las IA */}
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
