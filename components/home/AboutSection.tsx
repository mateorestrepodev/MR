import Image from "next/image";

interface AboutProps {
  dict: {
    tag: string;
    title: string;
    paragraph_1: string;
    paragraph_2: string;
    google_title: string;
    google_text: string;
    google_button: string;
  };
}

export default function AboutSection({ dict }: AboutProps) {
  // Reemplaza esto con el link real de tu Google My Business
  const googleReviewLink = "https://g.page/r/TU_CODIGO/review";

  return (
    <section className="w-full bg-[#FFFFFF] py-24 lg:py-32 px-4 md:px-8 border-y border-[#D9D9D2]/30">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
        {/* =========================================
            TEXTO EDITORIAL (Alineado a la izquierda)
            ========================================= */}
        <div className="w-full lg:w-3/5 flex flex-col gap-6 text-left">
          <span className="block text-[10px] font-bold uppercase tracking-widest text-[#737772]">
            {dict.tag}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-[#202522] tracking-tight leading-tight">
            {dict.title}
          </h2>
          <div className="flex flex-col gap-4 mt-2">
            <p className="text-[#737772] text-sm md:text-base font-light leading-relaxed max-w-2xl">
              {dict.paragraph_1}
            </p>
            <p className="text-[#737772] text-sm md:text-base font-light leading-relaxed max-w-2xl">
              {dict.paragraph_2}
            </p>
          </div>
        </div>

        {/* =========================================
            TARJETA DE CONFIANZA Y RESEÑAS GOOGLE
            ========================================= */}
        <div className="w-full lg:w-2/5 flex lg:justify-end">
          <div className="bg-[#F2F1EC] p-8 md:p-10 rounded-2xl flex flex-col items-start gap-6 w-full max-w-md shadow-[0_20px_60px_rgba(25,35,30,0.03)] border border-[#D9D9D2]/50">
            <div className="flex flex-col gap-1">
              <h4 className="text-[#202522] font-semibold text-xl tracking-tight">
                {dict.google_title}
              </h4>
              <p className="text-[#737772] text-sm font-light">
                {dict.google_text}
              </p>
            </div>

            {/* Simulación de Reseña en Vivo */}
            <div className="bg-white w-full p-5 rounded-lg border border-[#D9D9D2]/50 shadow-sm flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#29483D] flex items-center justify-center text-white text-xs font-bold">
                  S
                </div>
                <div className="flex flex-col">
                  <span className="text-[#202522] text-xs font-semibold">
                    Sarah M.
                  </span>
                  <div className="flex gap-0.5 text-[#FABB05]">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-[#737772] text-[11px] font-light italic leading-relaxed">
                Incredible experience! Mateo made us feel safe and cared for the
                entire time. We never felt rushed. Truly Take Your Time! as
                promised.
              </p>
              <div className="flex items-center gap-1 mt-1">
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                  alt="Google"
                  width={12}
                  height={12}
                />
                <span className="text-[#737772] text-[9px] font-medium">
                  Google Review
                </span>
              </div>
            </div>

            <a
              href={googleReviewLink}
              target="_blank"
              rel="noreferrer"
              className="mt-2 w-full flex justify-center items-center gap-2 text-[10px] tracking-widest font-bold text-[#FFFFFF] bg-[#29483D] px-6 py-4 rounded-md uppercase hover:bg-[#1C302A] transition-colors"
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
