"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const TOURS_CONFIG = {
  guatape: {
    id: "guatape",
    price: 280,
    image: "/tours/guatapeportada.webp",
    link: "/tours/guatape",
  },
  cafe: {
    id: "cafe",
    price: 150,
    image: "/tours/cafeportada.webp",
    link: "/tours/cafe",
  },
  medellin: {
    id: "medellin",
    price: 120,
    image: "/tours/medellinportada.webp",
    link: "/tours/medellin",
  },
  aeropuerto: {
    id: "aeropuerto",
    price: 80,
    image: "/tours/aeropuertoportada.webp",
    link: "/tours/aeropuerto",
  },
};

interface BookingHeroProps {
  dict: {
    hero: {
      title: string;
      subtitle: string;
      select_label: string;
      name_label: string;
      name_placeholder: string;
      date_label: string;
      price_label: string;
      button: string;
      view_details: string;
      greeting: string;
    };
    tours: {
      guatape: string;
      cafe: string;
      medellin: string;
      aeropuerto: string;
    };
  };
  lang: string;
}

export default function BookingHero({ dict, lang }: BookingHeroProps) {
  const [selectedTourKey, setSelectedTourKey] =
    useState<keyof typeof TOURS_CONFIG>("guatape");

  const [fullName, setFullName] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const activeTourConfig = TOURS_CONFIG[selectedTourKey];
  const activeTourTitle = dict.tours[selectedTourKey];

  const handleWhatsAppQuote = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !selectedDate) return;

    const phoneNumber = "573181686591";

    const message = dict.hero.greeting
      .replace("{name}", fullName)
      .replace("{tour}", activeTourTitle)
      .replace("{date}", selectedDate);

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message,
    )}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <section className="w-full bg-[#F2F1EC] px-4 py-10 md:px-8 ">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-stretch gap-6 lg:flex-row lg:gap-8">
        {/* =========================================================
            IMAGEN
        ========================================================= */}
        <div className="relative h-[360px] w-full overflow-hidden rounded-lg lg:h-[420px] lg:w-[42%]">
          <Image
            src={activeTourConfig.image}
            alt={activeTourTitle}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 42vw"
            className="object-cover transition-transform duration-1000 ease-out"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />

          {/* Información inferior */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <h2 className="mb-5 text-2xl font-light tracking-tight text-white md:text-3xl">
              {activeTourTitle}
            </h2>

            <Link
              href={`/${lang}${activeTourConfig.link}`}
              className="inline-flex items-center gap-3 rounded-md border border-white/35 bg-black/10 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-[#202522]"
            >
              {dict.hero.view_details}

              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* =========================================================
            FORMULARIO
        ========================================================= */}
        <div className="flex w-full flex-col justify-center rounded-lg border border-[#D9D9D2]/70 bg-white px-6 py-8 shadow-[0_18px_50px_rgba(25,35,30,0.045)] md:px-8 lg:w-[58%] ">
          {/* Header */}
          <div className="mb-7 max-w-lg">
            <h1 className="mb-2 text-2xl font-light tracking-tight text-[#202522] md:text-[28px]">
              {dict.hero.title}
            </h1>

            <p className="max-w-md text-[13px] font-light leading-6 text-[#737772]">
              {dict.hero.subtitle}
            </p>
          </div>

          <form onSubmit={handleWhatsAppQuote} className="flex flex-col">
            {/* Tour */}
            <div className="mb-5">
              <label
                htmlFor="tour"
                className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.2em] text-[#737772]"
              >
                {dict.hero.select_label}
              </label>

              <div className="relative">
                <select
                  id="tour"
                  value={selectedTourKey}
                  onChange={(e) =>
                    setSelectedTourKey(
                      e.target.value as keyof typeof TOURS_CONFIG,
                    )
                  }
                  className="h-[48px] w-full cursor-pointer appearance-none rounded-md border border-[#D9D9D2] bg-white px-4 pr-10 text-sm font-light text-[#202522] outline-none transition-all duration-300 focus:border-[#29483D] focus:ring-1 focus:ring-[#29483D]"
                >
                  <option value="guatape">{dict.tours.guatape}</option>

                  <option value="cafe">{dict.tours.cafe}</option>

                  <option value="medellin">{dict.tours.medellin}</option>

                  <option value="aeropuerto">{dict.tours.aeropuerto}</option>
                </select>

                <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#737772]">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Nombre + Fecha */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {/* Nombre */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.2em] text-[#737772]"
                >
                  {dict.hero.name_label}
                </label>

                <input
                  type="text"
                  id="name"
                  placeholder={dict.hero.name_placeholder}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="h-[48px] w-full rounded-md border border-[#D9D9D2] bg-white px-4 text-sm font-light text-[#202522] outline-none transition-all duration-300 placeholder:text-[#B8B9B3] focus:border-[#29483D] focus:ring-1 focus:ring-[#29483D]"
                  required
                />
              </div>

              {/* Fecha */}
              <div>
                <label
                  htmlFor="date"
                  className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.2em] text-[#737772]"
                >
                  {dict.hero.date_label}
                </label>

                <input
                  type="date"
                  id="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="h-[48px] w-full cursor-pointer rounded-md border border-[#D9D9D2] bg-white px-4 text-sm font-light text-[#202522] outline-none transition-all duration-300 focus:border-[#29483D] focus:ring-1 focus:ring-[#29483D]"
                  required
                />
              </div>
            </div>

            {/* Separador */}
            <div className="my-5 h-px w-full bg-[#D9D9D2]/70" />

            {/* Precio + Botón */}
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              {/* Precio */}
              <div>
                <span className="mb-1 block text-[9px] font-semibold uppercase tracking-[0.2em] text-[#737772]">
                  {dict.hero.price_label}
                </span>

                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-light tracking-tight text-[#202522] md:text-[28px]">
                    ${activeTourConfig.price}
                  </span>

                  <span className="text-[11px] font-medium uppercase tracking-wide text-[#737772]">
                    USD
                  </span>
                </div>
              </div>

              {/* Botón */}
              <button
                type="submit"
                className="group flex h-[48px] w-full items-center justify-center gap-3 rounded-md bg-[#29483D] px-7 text-[10px] font-semibold uppercase tracking-[0.18em] text-white shadow-sm transition-all duration-300 hover:bg-[#1C302A] sm:w-auto"
              >
                {dict.hero.button}

                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
