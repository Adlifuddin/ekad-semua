"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTheme } from "@/contexts/theme-context";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

export function LandingPage() {
  const { theme } = useTheme();

  const t = useTranslations("LandingPage");

  return (
    <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* Logo */}
        {/* <div className="mb-12">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black bg-linear-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent tracking-tight">
              e-KAD SEMUA
            </h1>
          </div> */}

        {/* Main Heading */}
        <div className="space-y-6">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-800">
            <span
              className={cn(
                "bg-linear-to-r bg-clip-text text-transparent",
                theme.gradient.primary,
              )}
            >
              {t("heading.highlight")}
            </span>{" "}
            {t("heading.rest")}
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto">
            {t("description")}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <Link href="/form">
            <Button
              size="lg"
              className={cn(
                "bg-linear-to-r text-white font-semibold px-8 py-6 text-lg rounded-lg shadow-lg shadow-blue-200/50 transition-all hover:shadow-xl hover:shadow-blue-300/60 hover:scale-105",
                theme.gradient.primary,
              )}
            >
              {t("createButton")}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
