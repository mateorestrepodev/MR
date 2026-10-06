import Link from "next/link";
import Image from "next/image";

export default function Footer({ lang }: { lang: string }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#202522] text-[#D9D9D2] border-t border-[#D9D9D2]/10 px-6 py-0 md:px-10 lg:px-16">
      <div className="mx-auto w-full max-w-[1600px] ">
        <div className="flex flex-col gap-12 md:flex-row md:items-center md:justify-between py-3">
          {/* Logo */}
          <div className="flex items-start ">
            <Link
              href={`/${lang}`}
              aria-label="MR Medellín Private Tours"
              className="inline-flex"
            >
              <div className="relative h-24 w-24 md:h-28 md:w-28">
                <Image
                  src="/logo/logomr.svg"
                  alt="MR Medellín Private Tours"
                  fill
                  priority={false}
                  className="object-contain brightness-0 invert opacity-90 transition-opacity duration-300 hover:opacity-100"
                />
              </div>
            </Link>
          </div>

          <div className="flex flex-col">
            <span className="mb-6 text-[10px] font-medium uppercase tracking-[0.25em] text-[#D9D9D2]/45">
              {lang === "es" ? "Explorar" : "Explore"}
            </span>

            <nav className="flex flex-col items-start gap-4">
              <Link
                href={`/${lang}#tours`}
                className="text-sm font-light text-[#D9D9D2]/85 transition-colors duration-300 hover:text-white"
              >
                {lang === "es" ? "Tours" : "Tours "}
              </Link>

              <Link
                href={`/${lang}/about`}
                className="text-sm font-light text-[#D9D9D2]/85 transition-colors duration-300 hover:text-white"
              >
                {lang === "es" ? "Nosotros" : "About Us"}
              </Link>
            </nav>
          </div>

          <div className="flex flex-col">
            <span className="mb-6 text-[10px] font-medium uppercase tracking-[0.25em] text-[#D9D9D2]/45">
              {lang === "es" ? "Contacto" : "Contact"}
            </span>

            <nav className="flex flex-col items-start gap-4">
              <a
                href="https://wa.me/573181686591"
                target="_blank"
                rel="noreferrer"
                className="text-sm font-light text-[#D9D9D2]/85 transition-colors duration-300 hover:text-white"
              >
                WhatsApp
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="text-sm font-light text-[#D9D9D2]/85 transition-colors duration-300 hover:text-white"
              >
                Instagram
              </a>
            </nav>
          </div>
        </div>

        {/* Bottom */}
      </div>
      <div className=" border-t border-[#D9D9D2]/10 py-2 ">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <span className="text-[11px] font-light tracking-wide text-[#D9D9D2]/40">
            © {currentYear} MR Medellín Private Tours.
          </span>

          <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#D9D9D2]/35">
            Luxury Travel & Concierge
          </span>
        </div>
      </div>
    </footer>
  );
}
