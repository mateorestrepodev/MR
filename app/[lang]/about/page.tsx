import { getDictionary } from "@/app/lib/get-dictionary";
import Link from "next/link";
import Image from "next/image";

// Definimos la estructura de la reseña para TypeScript
interface Review {
  name: string;
  text: string;
  date: string;
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: "en" | "es" }>;
}) {
  const resolvedParams = await params;
  const dict = await getDictionary(resolvedParams.lang);
  const aboutDict = dict.home.about;

  const googleReviewLink = "https://g.page/r/TU_CODIGO/review"; // Reemplaza con tu link

  return (
    <main className="min-h-screen bg-[#F2F1EC] py-6 px-4 md:px-8">
      {/* Contenedor principal ensanchado para el layout 50/50 */}
      <div className="max-w-6xl mx-auto flex flex-col ">
        {/* Botón de Volver (Alineado a la izquierda) */}
        <div className="w-full">
          <Link
            href={`/${resolvedParams.lang}`}
            className="inline-flex items-center gap-3 text-[#737772] hover:text-[#202522] transition-colors text-[9px] font-bold uppercase tracking-[0.2em]"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            {resolvedParams.lang === "es" ? "Volver al Inicio" : "Back to Home"}
          </Link>
        </div>

        {/* Hero Section: Texto a la Izquierda / Foto a la Derecha */}
        <div className="flex flex-col-reverse lg:flex-row items-center gap-16 lg:gap-20">
          {/* Columna Izquierda: Filosofía y Texto */}
          <div className="w-full lg:w-1/2 flex flex-col items-start text-left my-10">
            <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#737772] mb-5">
              {aboutDict.tag}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-[64px] font-light text-[#202522] tracking-tight leading-[1.1] mb-8">
              {aboutDict.title}
            </h1>
            <p className="text-[#737772] text-sm md:text-base font-light leading-relaxed max-w-lg whitespace-pre-line">
              {aboutDict.description}
            </p>
          </div>

          {/* Columna Derecha: Fotografía Editorial */}
          <div className="w-full lg:w-1/2 relative h-[450px] md:h-[550px]  w-full rounded-sm overflow-hidden bg-[#D9D9D2]/30">
            <Image
              src="/mateo.webp" // Asegúrate de tener esta imagen en tu carpeta public
              alt="Mateo Restrepo - Founder of MR Medellin Private Tours"
              fill
              priority
              className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </div>

        {/* Citas Editoriales (Reseñas simuladas de Google) */}
        <div className="flex flex-col gap-12 border-t border-[#D9D9D2]/70 pt-20">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#737772] text-center mb-2">
            {aboutDict.reviews_title}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {aboutDict.reviews?.map((review: Review, idx: number) => (
              <div
                key={idx}
                className="bg-[#FFFFFF] p-8 md:p-10 rounded-lg flex flex-col justify-between gap-6 shadow-[0_15px_40px_rgba(25,35,30,0.03)] border border-[#D9D9D2]/40"
              >
                <div className="flex text-[#29483D] mb-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <p className="text-[#202522] text-[13px] font-light leading-relaxed italic">
                  {review.text}
                </p>
                <div className="pt-4 border-t border-[#D9D9D2]/30 mt-2">
                  <h4 className="text-[#202522] text-[10px] font-bold tracking-widest uppercase">
                    {review.name}
                  </h4>
                  <span className="text-[#737772] text-[9px] mt-1 block">
                    {review.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tarjeta final de Call to Action hacia Google */}
        <div className="bg-[#29483D] rounded-xl p-10 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-10 shadow-xl relative overflow-hidden my-10">
          <div className="absolute -top-32 -right-32 w-80 h-80 bg-[#1C302A] rounded-full blur-3xl opacity-60 pointer-events-none" />

          <div className="max-w-xl relative z-10 text-center lg:text-left">
            <h3 className="text-3xl md:text-4xl font-light text-[#FFFFFF] tracking-tight mb-3">
              {aboutDict.google_title}
            </h3>
            <p className="text-[#D9D9D2] text-sm md:text-base font-light leading-relaxed">
              {aboutDict.google_text}
            </p>
          </div>

          <div className="relative z-10 w-full lg:w-auto flex justify-center">
            <a
              href={googleReviewLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 bg-[#FFFFFF] hover:bg-[#F2F1EC] text-[#29483D] font-bold text-[9px] md:text-[10px] tracking-[0.2em] uppercase px-8 py-4 md:py-5 rounded-md transition-all duration-300 shadow-sm whitespace-nowrap w-full lg:w-auto justify-center"
            >
              {aboutDict.google_button}
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
