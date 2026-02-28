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
  }, []);

  return (
    <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto text-center space-y-6">
        {/* Logo */}
        {/* <div className="mb-12">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black bg-linear-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent tracking-tight">
              e-KAD SEMUA
            </h1>
          </div> */}

        {/* Main Heading */}
        <div className="space-y-4">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-800">
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
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto">
            Cipta kad digital yang cantik dengan mudah dan murah.
          </p>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 pt-2 text-sm sm:text-base text-slate-600">
            <div className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              <span>Cantik</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              <span>Mudah</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              <span>Murah</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2">
          <Link href="/form">
            <Button
              size="lg"
              className={cn(
                "bg-linear-to-r text-white font-semibold px-8 py-6 text-lg rounded-lg shadow-lg shadow-blue-200/50 transition-all hover:shadow-xl hover:shadow-blue-300/60 hover:scale-105",
                "cursor-pointer",
                theme.gradient.primary,
              )}
            >
              Cipta Kad
            </Button>
          </Link>
          <Link href="/faris-sarah">
            <Button
              size="lg"
              variant="outline"
              className="font-semibold px-8 py-6 text-lg rounded-lg border-2 border-slate-300 text-slate-700 hover:border-slate-400 hover:bg-slate-50 transition-all cursor-pointer"
            >
              Lihat Contoh
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
