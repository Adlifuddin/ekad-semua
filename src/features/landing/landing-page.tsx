"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTheme } from "@/contexts/theme-context";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

export function LandingPage() {
  const { theme } = useTheme();
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);
  const rotatingTexts = ["Pertunangan", "Perkahwinan", "Resepsi"];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(false);
      setTimeout(() => {
        setCurrentTextIndex((prev) => (prev + 1) % rotatingTexts.length);
        setIsAnimating(true);
      }, 300); // Brief fade out before changing text
    }, 2500); // Change every 2.5 seconds

    return () => clearInterval(interval);
  }, [rotatingTexts.length]);

  return (
    <>
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16 sm:pt-0">
        <div className="max-w-5xl mx-auto text-center space-y-4 sm:space-y-6">
          {/* Logo */}
          {/* <div className="mb-12">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black bg-linear-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent tracking-tight">
              e-KAD SEMUA
            </h1>
          </div> */}

          {/* Main Heading */}
          <div className="space-y-3 sm:space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 leading-tight px-2">
              <span
                className={cn(
                  "bg-linear-to-r bg-clip-text text-transparent inline-block transition-all duration-300 ease-in-out",
                  theme.gradient.primary,
                  isAnimating
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-2",
                )}
              >
                Kad {rotatingTexts[currentTextIndex]}
              </span>{" "}
              untuk semua
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto px-4">
              Cipta kad digital yang cantik dengan mudah dan murah.
            </p>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 md:gap-6 pt-1 sm:pt-2 text-sm sm:text-base text-slate-600">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-green-600 text-base sm:text-lg">✓</span>
                <span>Cantik</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-green-600 text-base sm:text-lg">✓</span>
                <span>Mudah</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-green-600 text-base sm:text-lg">✓</span>
                <span>Murah</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center pt-2 sm:pt-4 px-4 sm:px-0">
            <Link href="/form" className="w-full sm:w-auto">
              <Button
                size="lg"
                className={cn(
                  "w-full sm:w-auto bg-linear-to-r text-white font-semibold px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg rounded-lg shadow-lg shadow-blue-200/50 transition-all hover:shadow-xl hover:shadow-blue-300/60 hover:scale-105",
                  "cursor-pointer",
                  theme.gradient.primary,
                )}
              >
                Cipta Kad
              </Button>
            </Link>
            <Link href="/faris-sarah-demo" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto font-semibold px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg rounded-lg border-2 border-slate-300 text-slate-700 hover:border-slate-400 hover:bg-slate-50 transition-all cursor-pointer"
              >
                Lihat Contoh
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
