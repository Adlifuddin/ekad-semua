"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/theme-context";

interface WeddingCardFormHeaderProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

export function WeddingCardFormHeader({
  className,
}: WeddingCardFormHeaderProps) {
  const { theme } = useTheme();

  return (
    <div className={cn("text-center mb-8 md:mb-12", className)}>
      {/* Title */}
      <h1
        className={cn(
          "text-3xl md:text-5xl font-bold mb-3 bg-linear-to-r bg-clip-text text-transparent leading-tight",
          theme.gradient.primary,
        )}
      >
        Cipta Kad Digital Anda
      </h1>

      {/* Subtitle */}
      <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
        Hasilkan kad jemputan digital yang cantik dan eksklusif untuk majlis
        istimewa anda
      </p>
    </div>
  );
}
