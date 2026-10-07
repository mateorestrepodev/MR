"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar({ lang }: { lang: string }) {
  const pathname = usePathname();

  const redirectedPathName = (locale: string) => {
    if (!pathname) return "/";
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  const handleExploreClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Verificamos si ya estamos en la página de inicio (ej: /es o /en)
    if (pathname === `/${lang}` || pathname === `/${lang}/`) {
      e.preventDefault(); // Evitamos que Next.js intercepte la ruta
      const toursSection = document.getElementById("tours");
      if (toursSection) {
        toursSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full px-6  bg-[#F2F1EC]/90 backdrop-blur-md border-b border-[#D9D9D2]/40 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href={`/${lang}`} className="flex items-center">
          <div className="relative w-16 h-16 md:w-20 md:h-20">
            <Image
              src="/logo/logomr.svg"
              alt="MR Medellin Private Tours"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* Controles */}
        <div className="flex items-center gap-8">
          {/* Switch de Idioma Editorial */}
          <div className="flex items-center text-[11px] tracking-widest font-semibold">
            <Link
              href={redirectedPathName("es")}
              className={`transition-colors ${lang === "es" ? "text-[#202522]" : "text-[#737772] hover:text-[#202522]"}`}
            >
              ES
            </Link>
            <span className="mx-3 text-[#D9D9D2] font-light">|</span>
            <Link
              href={redirectedPathName("en")}
              className={`transition-colors ${lang === "en" ? "text-[#202522]" : "text-[#737772] hover:text-[#202522]"}`}
            >
              EN
            </Link>
          </div>

          {/* CTA Principal */}
          <Link
            href={`/${lang}#tours`}
            onClick={handleExploreClick}
            className="px-4 py-2 text-[9px] tracking-widest font-bold text-[#FFFFFF] bg-[#29483D] rounded-md hover:bg-[#1C302A] transition-colors duration-300"
          >
            {lang === "es" ? "EXPLORAR →" : "EXPLORE →"}
          </Link>
        </div>
      </div>
    </nav>
  );
}
