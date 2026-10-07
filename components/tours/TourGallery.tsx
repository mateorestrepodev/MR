"use client";

import { useState } from "react";
import Image from "next/image";

interface TourGalleryProps {
  images: string[];
  lang: string;
}

export default function TourGallery({ images, lang }: TourGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const txt = lang === "es" ? "Ver todas las fotos" : "View all photos";

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      {/* =========================================
          VISTA MÓVIL (Grid 3x2 + Imagen Principal)
          ========================================= */}
      <div className="flex flex-col gap-3 md:hidden w-full">
        {/* Imagen Principal (Clic abre modal) */}
        <div
          className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer"
          onClick={() => setShowModal(true)}
        >
          <Image
            src={images[currentIndex]}
            alt="Tour Detail"
            fill
            className="object-cover transition-all duration-500"
            priority
          />
        </div>

        {/* Miniaturas (3 por fila, máximo 6) */}
        <div className="grid grid-cols-3 gap-2">
          {images.slice(0, 6).map((img, idx) => (
            <div
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`relative aspect-square rounded-xl overflow-hidden cursor-pointer transition-all ${
                currentIndex === idx
                  ? "border-2 border-[#29483D] opacity-100" // Resalta la seleccionada
                  : "opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={img}
                alt={`Thumb ${idx}`}
                fill
                className="object-cover"
              />

              {/* Capa oscura con el "+" si hay más de 6 imágenes */}
              {idx === 5 && images.length > 6 && (
                <div
                  className="absolute inset-0 bg-[#202522]/60 flex items-center justify-center text-[#D9D9D2] text-xl font-medium"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowModal(true);
                  }}
                >
                  +{images.length - 6}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Botón Ver Todas */}
        <button
          onClick={() => setShowModal(true)}
          className="mt-2 w-full py-3.5 rounded-xl border border-[#202522]/20 text-[#202522] text-[11px] font-semibold tracking-[0.2em] uppercase hover:bg-[#202522] hover:text-[#D9D9D2] transition-colors"
        >
          {txt}
        </button>
      </div>

      {/* =========================================
          VISTA DESKTOP (Grid estilo Airbnb de Lujo)
          ========================================= */}
      <div className="hidden md:grid grid-cols-4 grid-rows-2 gap-4 h-[60vh] min-h-[500px] w-full rounded-2xl overflow-hidden relative">
        <div
          className="col-span-2 row-span-2 relative cursor-pointer"
          onClick={() => setShowModal(true)}
        >
          <Image
            src={images[0]}
            alt="Main"
            fill
            className="object-cover hover:scale-105 transition-transform duration-700"
            priority
          />
        </div>
        {images.slice(1, 5).map((img, idx) => (
          <div
            key={idx}
            className="relative cursor-pointer"
            onClick={() => setShowModal(true)}
          >
            <Image
              src={img}
              alt={`Gallery ${idx}`}
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        ))}
        <button
          onClick={() => setShowModal(true)}
          className="absolute bottom-6 right-6 bg-[#F2F1EC]/90 backdrop-blur text-[#202522] px-6 py-3 rounded-xl text-[11px] font-semibold tracking-[0.2em] uppercase shadow-lg hover:bg-white transition-colors"
        >
          {txt}
        </button>
      </div>

      {/* =========================================
          MODAL PANTALLA COMPLETA (Lightbox)
          ========================================= */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-[#1A1D1B] flex flex-col">
          {/* Header del Modal */}
          <div className="flex justify-between items-center p-6 text-[#D9D9D2]">
            <span className="text-[11px] font-medium tracking-[0.2em] uppercase">
              {currentIndex + 1} / {images.length}
            </span>
            <button
              onClick={() => setShowModal(false)}
              className="p-2 hover:text-white transition-colors"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Área de la imagen con flechas */}
          <div className="flex-1 relative flex items-center justify-center p-4">
            {/* Flecha Izquierda */}
            <button
              onClick={prevImage}
              className="absolute left-4 md:left-10 z-10 p-3 bg-black/40 text-white rounded-full hover:bg-black/80 backdrop-blur-md transition-all"
            >
              <svg
                className="w-6 h-6 md:w-8 md:h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Imagen del Modal */}
            <div className="relative w-full max-w-5xl h-full">
              <Image
                src={images[currentIndex]}
                alt="Modal Image"
                fill
                className="object-contain"
              />
            </div>

            {/* Flecha Derecha */}
            <button
              onClick={nextImage}
              className="absolute right-4 md:right-10 z-10 p-3 bg-black/40 text-white rounded-full hover:bg-black/80 backdrop-blur-md transition-all"
            >
              <svg
                className="w-6 h-6 md:w-8 md:h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
