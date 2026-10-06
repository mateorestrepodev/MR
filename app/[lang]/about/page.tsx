import { getDictionary } from "@/app/lib/get-dictionary";
import Link from "next/link";

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
    <main className="min-h-screen bg-[#F2F1EC] py-20 px-4 md:px-8">
      <div className="max-w-4xl mx-auto flex flex-col gap-24">
        {/* Cabecera / Filosofía */}
        <div className="flex flex-col gap-8 text-center items-center pt-10">
          <Link
            href={`/${resolvedParams.lang}`}
            className="text-[#737772] hover:text-[#202522] transition-colors text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 mb-4"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            {resolvedParams.lang === "es" ? "Volver al Inicio" : "Back to Home"}
          </Link>

          <span className="block text-[10px] font-bold uppercase tracking-widest text-[#737772]">
            {aboutDict.tag}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#202522] tracking-tight leading-tight">
            {aboutDict.title}
          </h1>
          <p className="text-[#737772] text-base md:text-lg font-light leading-relaxed max-w-2xl mt-4">
            {aboutDict.description}
          </p>
        </div>

        {/* Citas Editoriales (Reseñas simuladas de Google) */}
        <div className="flex flex-col gap-12 border-t border-[#D9D9D2]/50 pt-16">
          <h2 className="text-[10px] font-bold uppercase tracking-widest text-[#737772] text-center mb-4">
            {aboutDict.reviews_title}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {aboutDict.reviews.map((review: Review, idx: number) => (
              <div
                key={idx}
                className="bg-[#FFFFFF] p-8 rounded-2xl flex flex-col justify-between gap-6 shadow-[0_20px_60px_rgba(25,35,30,0.03)] border border-[#D9D9D2]/30"
              >
                <div className="flex text-[#29483D] mb-2">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <p className="text-[#202522] text-sm font-medium leading-relaxed italic">
                  {review.text}
                </p>
                <div>
                  <h4 className="text-[#202522] text-xs font-bold tracking-wide uppercase">
                    {review.name}
                  </h4>
                  <span className="text-[#737772] text-[10px]">
                    {review.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tarjeta final de Call to Action hacia Google */}
        <div className="bg-[#29483D] rounded-2xl p-10 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-10 shadow-lg relative overflow-hidden mb-10">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#1C302A] rounded-full blur-3xl opacity-50 pointer-events-none" />

          <div className="max-w-xl relative z-10 text-center lg:text-left">
            <h3 className="text-3xl lg:text-4xl font-light text-[#FFFFFF] tracking-tight mb-2">
              {aboutDict.google_title}
            </h3>
            <p className="text-[#D9D9D2] text-sm font-light leading-relaxed">
              {aboutDict.google_text}
            </p>
          </div>

          <div className="relative z-10 w-full lg:w-auto flex justify-center">
            <a
              href={googleReviewLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 bg-[#FFFFFF] hover:bg-[#F2F1EC] text-[#29483D] font-bold text-xs tracking-widest uppercase px-8 py-4 rounded-xl transition-all duration-300 shadow-sm whitespace-nowrap w-full lg:w-auto justify-center"
            >
              {aboutDict.google_button}
              <svg
                width="14"
                height="14"
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
