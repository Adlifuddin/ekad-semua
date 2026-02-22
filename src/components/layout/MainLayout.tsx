"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/theme-context";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useTheme();
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
          © {new Date().getFullYear()} ekad-semua. Hak cipta terpelihara.
        </p>
      </footer>
    </div>
  );
}
