"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface TourData {
  title: string;
  description: string;
  duration: string;
  includes: string[];
  price: number;
  book_button: string;
  back_button: string;
  about_title: string;
  includes_title: string;
  duration_label: string;
  fee_note: string;
}

interface TourDetailViewProps {
  tour: TourData;
  images: string[];
  lang: string;
}

export default function TourDetailView({
  tour,
  images,
  lang,
}: TourDetailViewProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIdx, setCurrentImageIdx] = useState(0);

  const phoneNumber = "573181686591";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    `Hello! I am interested in the ${tour.title} tour.`,
  )}`;

  const openModal = (index: number) => {
    setCurrentImageIdx(index);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };

  const nextImage = () => {
    setCurrentImageIdx((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <section className="w-full min-h-screen bg-[#F2F1EC] py-8  px-4 md:px-8">
      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        {/* Cabecera */}
        <div className="flex flex-col gap-4">
          <Link
            href={`/${lang}#tours`}
            className="text-[#737772] hover:text-[#202522] transition-colors text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 w-fit"
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
            {tour.back_button}
          </Link>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-medium text-[#202522] tracking-tight">
            {tour.title}
          </h1>
        </div>

        {/* Galería Bento */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-3 h-[300px] md:h-[60vh] min-h-[400px] max-h-[600px] rounded-md overflow-hidden">
          <div
            className="md:col-span-2 md:row-span-2 relative cursor-pointer group bg-[#D9D9D2]/20"
            onClick={() => openModal(0)}
          >
            {images[0] && (
              <Image
                src={images[0]}
                alt={`${tour.title} main`}
                fill
                className="object-cover group-hover:brightness-95 transition-all duration-500"
                priority
              />
            )}
          </div>

          {images.slice(1, 5).map((img, idx) => (
            <div
              key={idx}
              className="hidden md:block relative cursor-pointer group bg-[#D9D9D2]/20"
              onClick={() => openModal(idx + 1)}
            >
              <Image
                src={img}
                alt={`Detail ${idx + 1}`}
                fill
                className="object-cover group-hover:brightness-95 transition-all duration-500"
              />
              {idx === 3 && images.length > 5 && (
                <div className="absolute inset-0 bg-[#1C302A]/40 flex items-center justify-center transition-all hover:bg-[#1C302A]/60">
                  <span className="text-[#FFFFFF] font-light text-2xl tracking-wider">
                    +{images.length - 5}
                  </span>
                </div>
              )}
            </div>
          ))}

          <button
            onClick={() => openModal(0)}
            className="md:hidden absolute bottom-4 right-4 bg-[#FFFFFF]/90 backdrop-blur-md px-4 py-2 rounded-md text-xs font-bold tracking-widest text-[#202522] shadow-sm"
          >
            1 / {images.length}
          </button>
        </div>

        {/* Contenido Inferior */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-6 relative">
          {/* Detalles (Izquierda) */}
          <div className="lg:col-span-7 space-y-12">
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#737772] mb-5">
                {tour.about_title}
              </h3>
              <p className="text-[#202522] text-base lg:text-lg font-light leading-relaxed whitespace-pre-line">
                {tour.description}
              </p>
            </div>

            <div className="border-t border-[#D9D9D2]/50 pt-10">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#737772] mb-6">
                {tour.includes_title}
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                {tour.includes.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-[#737772] text-sm font-light"
                  >
                    <svg
                      className="w-4 h-4 text-[#29483D] shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Panel Sticky (Derecha) */}
          <div className="lg:col-span-5 relative">
            <div className="sticky top-32 bg-[#FFFFFF] p-8 lg:p-10 rounded-md shadow-[0_20px_60px_rgba(25,35,30,0.06)] border border-[#D9D9D2]/30 flex flex-col gap-8">
              <div className="flex flex-col gap-6 border-b border-[#D9D9D2]/50 pb-8">
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-widest text-[#737772] mb-2">
                    {tour.duration_label}
                  </span>
                  <span className="text-[#202522] font-medium text-sm">
                    {tour.duration}
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="block text-[10px] font-bold uppercase tracking-widest text-[#737772] mb-1">
                    Estimated Price
                  </span>
                  <div className="flex items-baseline">
                    <span className="text-4xl lg:text-5xl font-light text-[#202522] tracking-tight">
                      ${tour.price}
                    </span>
                    <span className="text-sm font-medium text-[#737772] ml-2">
                      USD
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-[#29483D] hover:bg-[#1C302A] text-[#FFFFFF] font-bold text-xs tracking-widest uppercase py-4 rounded-md transition-all duration-300 flex items-center justify-center gap-3 shadow-sm"
                >
                  {tour.book_button}
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
                <p className="text-[10px] text-center text-[#737772] tracking-wider uppercase">
                  {tour.fee_note}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- MODAL LIGHTBOX --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] bg-[#1C302A]/95 flex items-center justify-center backdrop-blur-md">
          <div className="absolute top-0 w-full p-6 flex justify-between items-center text-[#FFFFFF] z-20">
            <span className="text-xs tracking-widest font-bold uppercase">
              {currentImageIdx + 1} / {images.length}
            </span>
            <button
              onClick={closeModal}
              className="p-2 hover:bg-[#FFFFFF]/10 rounded-md transition-colors"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <button
            onClick={prevImage}
            className="absolute left-4 md:left-8 p-3 bg-[#FFFFFF]/10 hover:bg-[#FFFFFF]/20 rounded-md text-[#FFFFFF] transition-all z-20 hidden md:block"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div className="relative w-full max-w-6xl h-[70vh] md:h-[85vh] z-10">
            {images[currentImageIdx] && (
              <Image
                src={images[currentImageIdx]}
                alt={`Gallery image ${currentImageIdx + 1}`}
                fill
                className="object-contain"
                priority
              />
            )}
          </div>

          <button
            onClick={nextImage}
            className="absolute right-4 md:right-8 p-3 bg-[#FFFFFF]/10 hover:bg-[#FFFFFF]/20 rounded-md text-[#FFFFFF] transition-all z-20 hidden md:block"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          <div
            className="absolute inset-y-0 left-0 w-1/2 z-10 md:hidden"
            onClick={prevImage}
          />
          <div
            className="absolute inset-y-0 right-0 w-1/2 z-10 md:hidden"
            onClick={nextImage}
          />
        </div>
      )}
    </section>
  );
}
