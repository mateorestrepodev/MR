"use client";

import { useState, useEffect } from "react";

interface ModalProps {
  dict: {
    title: string;
    description: string;
    input_placeholder: string;
    button: string;
    close: string;
  };
  lang: string;
}

export default function CustomItineraryModal({ dict, lang }: ModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [hasBeenClosed, setHasBeenClosed] = useState(false);

  // Aparecer a los 5 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      // Solo lo mostramos si el usuario no lo ha cerrado antes
      if (!hasBeenClosed) {
        setIsOpen(true);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [hasBeenClosed]);

  const handleClose = () => {
    setIsOpen(false);
    setHasBeenClosed(true); // Evita que vuelva a salir en la misma sesión
  };

  const handleWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const phoneNumber = "573181686591";
    const isEs = lang === "es";

    // Mensaje predeterminado exigiendo el itinerario personalizado
    const message = isEs
      ? `Hola MR Medellín. Mi nombre es *${name}* y me gustaría diseñar un itinerario completamente personalizado para mi viaje a mi propio ritmo.`
      : `Hello MR Medellin. My name is *${name}* and I would like to design a fully custom itinerary for my trip at my own pace.`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message,
    )}`;

    window.open(whatsappUrl, "_blank");
    handleClose(); // Cerramos el modal después de ir a WhatsApp
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Fondo oscuro con desenfoque (Backdrop) */}
      <div
        className="absolute inset-0 bg-[#19231E]/40 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      />

      {/* Tarjeta del Modal */}
      <div className="relative w-full max-w-md bg-[#F2F1EC] p-8 md:p-10 rounded-xl shadow-2xl z-10 animate-fade-in-up border border-[#D9D9D2]/50">
        {/* Botón de cerrar (X) */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 text-[#737772] hover:text-[#202522] transition-colors"
          aria-label={dict.close}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col items-center text-center">
          {/* Ícono elegante (opcional, le da un toque premium) */}
          <div className="w-12 h-12 bg-[#29483D]/10 rounded-full flex items-center justify-center mb-5 text-[#29483D]">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </div>

          <h3 className="text-2xl font-light text-[#202522] tracking-tight mb-3">
            {dict.title}
          </h3>
          <p className="text-[#737772] text-[13px] font-light leading-relaxed mb-8">
            {dict.description}
          </p>

          <form
            onSubmit={handleWhatsApp}
            className="w-full flex flex-col gap-4"
          >
            <input
              type="text"
              placeholder={dict.input_placeholder}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-[48px] bg-white border border-[#D9D9D2] rounded-md px-4 text-sm font-light text-[#202522] outline-none transition-all duration-300 placeholder:text-[#B8B9B3] focus:border-[#29483D] focus:ring-1 focus:ring-[#29483D]"
              required
            />

            <button
              type="submit"
              className="w-full h-[48px] flex items-center justify-center gap-2 rounded-md bg-[#29483D] text-[10px] font-bold uppercase tracking-[0.15em] text-white transition-all duration-300 hover:bg-[#1C302A] shadow-md"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              {dict.button}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
