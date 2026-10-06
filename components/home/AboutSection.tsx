import Image from "next/image";

interface AboutProps {
  dict: {
    tag: string;
    title: string;
    description: string;
    google_title: string;
    google_text: string;
    google_button: string;
  };
}

export default function AboutSection({ dict }: AboutProps) {
  // Reemplaza esto con tu link real de Google My Business (el link de 'Dejar reseña')
  const googleReviewLink = "https://g.page/r/TU_CODIGO/review";

  return (
    <section className="w-full bg-[#FFFFFF] py-24 lg:py-32 px-4 md:px-8 border-y border-[#D9D9D2]/30">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
        {/* Texto Filosófico Editorial */}
        <div className="w-full lg:w-3/5 flex flex-col gap-6">
          <span className="block text-[10px] font-bold uppercase tracking-widest text-[#737772]">
            {dict.tag}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-[#202522] tracking-tight leading-tight">
            {dict.title}
          </h2>
          <p className="text-[#737772] text-sm md:text-base font-light leading-relaxed max-w-2xl mt-4">
            {dict.description}
          </p>
        </div>

        {/* Tarjeta de Confianza GEO/SEO (Google) */}
        <div className="w-full lg:w-2/5 flex justify-end">
          <div className="bg-[#F2F1EC] p-8 md:p-10 rounded-2xl flex flex-col items-start gap-5 w-full max-w-md shadow-[0_20px_60px_rgba(25,35,30,0.03)] border border-[#D9D9D2]/50">
            {/* Las 5 Estrellas (Estilo Minimalista) */}
            <div className="flex gap-1 text-[#29483D]">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>

            <div>
              <h4 className="text-[#202522] font-semibold text-lg tracking-tight mb-1">
                {dict.google_title}
              </h4>
              <p className="text-[#737772] text-xs font-medium">
                {dict.google_text}
              </p>
            </div>

            <a
              href={googleReviewLink}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex items-center gap-2 text-[10px] tracking-widest font-bold text-[#FFFFFF] bg-[#29483D] px-6 py-3 rounded-md uppercase hover:bg-[#1C302A] transition-colors"
            >
              {dict.google_button}
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
    </section>
  );
}
