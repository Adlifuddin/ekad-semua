"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/theme-context";
import { useTranslations } from "next-intl";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useTheme();
  const t = useTranslations("LandingPage");
  return (
    <div
      className={cn(
        "min-h-screen bg-linear-to-br flex flex-col",
        theme.gradient.light,
      )}
    >
      <main className="flex-1 flex flex-col">{children}</main>
      <footer className="py-8 text-center">
        <p className="text-foreground/60 text-sm">
          © {new Date().getFullYear()} ekad-semua. {t("footer")}
        </p>
      </footer>
    </div>
  );
}
