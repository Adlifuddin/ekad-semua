"use client";

import { Heart, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/theme-context";
import { useTranslations } from "next-intl";

interface WeddingCardFormHeaderProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

export function WeddingCardFormHeader({
  title,
  subtitle,
  className,
}: WeddingCardFormHeaderProps) {
  const { theme } = useTheme();
  const t = useTranslations("WeddingForm.header");

  const displayTitle = title || t("title");
  const displaySubtitle = subtitle || t("subtitle");

  return (
    <div className={cn("text-center mb-8 md:mb-12", className)}>
      {/* Title */}
      <h1
        className={cn(
          "text-3xl md:text-5xl font-bold mb-3 bg-linear-to-r bg-clip-text text-transparent leading-tight",
          theme.gradient.primary,
        )}
      >
        {displayTitle}
      </h1>

      {/* Subtitle */}
      <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
        {displaySubtitle}
      </p>
    </div>
  );
}
