import Image from "next/image";
import Link from "next/link";

interface ToursGridProps {
  dict: {
    title: string;
    subtitle: string;
    explore_button: string;
  };
  toursDict: {
    guatape: string;
    cafe: string;
    medellin: string;
    aeropuerto: string;
  };
  customDict?: {
    title: string;
    subtitle: string;
    button: string;
    message: string;
  };
  lang: string;
}

const TOURS_DATA = [
  {
    id: "guatape",
    image: "/tours/guatapeportada.webp",
    link: "/tours/guatape",
  },
  { id: "cafe", image: "/tours/cafeportada.webp", link: "/tours/cafe" },
  {
    id: "medellin",
    image: "/tours/medellinportada.webp",
    link: "/tours/medellin",
  },
  {
    id: "aeropuerto",
    image: "/tours/aeropuertoportada.webp",
    link: "/tours/aeropuerto",
  },
];

export default function ToursGrid({
  dict,
  toursDict,
  customDict,
  lang,
}: ToursGridProps) {
  // WhatsApp Link para el Custom Tour
  const phoneNumber = "573181686591";
  const customMessage =
    customDict?.message ||
    "Hello! I would like to design a custom private tour.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(customMessage)}`;

  return (
    <section id="tours" className="w-full bg-[#F2F1EC] py-12  px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-16 lg:gap-24">
        {/* Cabecera de la Colección */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#D9D9D2] pb-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl lg:text-4xl font-light text-[#202522] tracking-tight">
              {dict.title || "Signature Experiences"}
            </h2>
            <p className="text-[#737772] text-sm font-light leading-relaxed mt-4">
              {dict.subtitle ||
                "Discover our handpicked private tours around Medellín and Antioquia."}
            </p>
          </div>
        </div>

        {/* Cuadrícula de Tours Fijos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {TOURS_DATA.map((tour) => {
            const tourTitle = toursDict[tour.id as keyof typeof toursDict];

            return (
              <Link
                key={tour.id}
                href={`/${lang}${tour.link}`}
                className="group relative flex flex-col cursor-pointer rounded-md overflow-hidden aspect-[10/6] bg-[#D9D9D2]/20 shadow-sm"
              >
                <Image
                  src={tour.image}
                  alt={tourTitle}
                  fill
                  className="object-cover transition-transform duration-1000 "
                />

                <div className="absolute inset-0 bg-black/30 md:bg-transparent md:group-hover:bg-black/40 transition-colors duration-700 flex items-center justify-center p-6 text-center">
                  <div className="flex flex-col items-center gap-4 opacity-100 md:opacity-0 md:group-hover:opacity-100 translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 transition-all duration-700 ease-out">
                    <h3 className="text-2xl lg:text-3xl font-light text-[#FFFFFF] tracking-tight drop-shadow-sm">
                      {tourTitle}
                    </h3>
                    <span className="text-[10px] tracking-widest font-bold text-[#FFFFFF] uppercase border-b border-[#FFFFFF]/40 pb-1">
                      {dict.explore_button || "Explore"}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* BANNER EDITORIAL: CUSTOM EXPERIENCE */}
        {customDict && (
          <div className="w-full bg-[#29483D] rounded-md p-10 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-10 shadow-lg relative overflow-hidden">
            {/* Elemento gráfico sutil de fondo */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#1C302A] rounded-md blur-3xl opacity-50 pointer-events-none" />

            <div className="max-w-xl relative z-10 text-center lg:text-left">
              <h3 className="text-3xl lg:text-4xl font-light text-[#FFFFFF] tracking-tight mb-4">
                {customDict.title}
              </h3>
              <p className="text-[#D9D9D2] text-sm font-light leading-relaxed">
                {customDict.subtitle}
              </p>
            </div>

            <div className="relative z-10 w-full lg:w-auto flex justify-center">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 bg-[#FFFFFF] hover:bg-[#F2F1EC] text-[#29483D] font-bold text-xs tracking-widest uppercase px-8 py-4 rounded-md transition-all duration-300 shadow-sm whitespace-nowrap w-full lg:w-auto justify-center"
              >
                {customDict.button}
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-4 h-4"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
