"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/theme-context";
import { Footer } from "./Footer";
import Link from "next/link";

interface AuthLayoutProps {
  children: React.ReactNode;
}

/**
 * AuthLayout - Minimal layout for authentication pages (login, register)
 * Features: Centered content, gradient background, no navigation
 */
export default function AuthLayout({ children }: AuthLayoutProps) {
  const { theme } = useTheme();

  return (
    <div
      className={cn(
        "min-h-screen bg-linear-to-br flex flex-col",
        theme.gradient.light,
      )}
    >
      <header className="px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-lg sm:text-xl md:text-2xl font-bold">
            <span
              className={cn(
                "bg-linear-to-r bg-clip-text text-transparent",
                theme.gradient.primary,
              )}
            >
              e-KAD SEMUA
            </span>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col">{children}</main>

      <Footer />
    </div>
  );
}
