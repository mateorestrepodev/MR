"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Preloader() {
  const [progress, setProgress] = useState<number>(0);
  const [isExiting, setIsExiting] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    const duration = 3800;
    const startTime = performance.now();

    let animationFrame: number;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const rawProgress = Math.min(elapsed / duration, 1);

      // Ease-out suave
      const easedProgress = 1 - Math.pow(1 - rawProgress, 3);

      setProgress(easedProgress);

      if (rawProgress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    // Esperamos un pequeño momento después de completar el logo
    const exitTimer = window.setTimeout(() => {
      setIsExiting(true);
    }, 2050);

    // Quitamos el preloader después de la transición
    const removeTimer = window.setTimeout(() => {
      setIsVisible(false);
    }, 2850);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.clearTimeout(exitTimer);
      window.clearTimeout(removeTimer);
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  const clipTop = `${(1 - progress) * 100}%`;

  return (
    <div
      className={`
        fixed
        inset-0
        z-[9999]
        flex
        items-center
        justify-center
        overflow-hidden
        bg-[#F2F1EC]
        transition-all
        duration-[800ms]
        ease-[cubic-bezier(0.76,0,0.24,1)]
        ${isExiting ? "opacity-0 scale-[1.01]" : "opacity-100 scale-100"}
      `}
    >
      <div
        className={`
          relative
          h-32
          w-32
          md:h-40
          md:w-40
          transition-transform
          duration-1000
          ease-out
          ${isExiting ? "scale-[0.98]" : "scale-100"}
        `}
      >
        {/* Logo base */}
        <Image
          src="/logo/logomr.svg"
          alt="MR"
          fill
          priority
          sizes="144px"
          className="object-contain opacity-[0.08]"
        />

        {/* Logo que se va revelando */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            clipPath: `inset(${clipTop} 0 0 0)`,
          }}
        >
          <Image
            src="/logo/logomr.svg"
            alt=""
            fill
            priority
            sizes="144px"
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}
