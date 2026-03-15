"use client";

import React, { useEffect } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/theme-context";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Footer } from "./Footer";
import { Button } from "@/components/ui/button";
import { User, Home, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MainLayoutProps {
  children: React.ReactNode;
}

/**
 * MainLayout - Layout for public pages (landing, about, etc.)
 * Features: Navigation bar, full-width content, footer
 */
export default function MainLayout({ children }: MainLayoutProps) {
  const { theme } = useTheme();
  const { user, checkAuth, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

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
          <div className="flex items-center">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "py-2 rounded-lg font-medium text-white hover:text-white bg-linear-to-r transition-all text-xs sm:text-sm px-2 sm:px-4 cursor-pointer",
                      theme.gradient.primary,
                    )}
                  >
                    <User className="w-3 h-3 sm:w-4 sm:h-4 mr-0.5 sm:mr-1" />
                    {user.name || user.email}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => router.push("/dashboard")}>
                    <Home className="mr-2 h-4 w-4" />
                    Go to Home
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Signout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <Button
                  size="sm"
                  variant="ghost"
                  className={cn(
                    "py-2 rounded-lg font-medium text-white hover:text-white bg-linear-to-r transition-all text-xs sm:text-sm px-2 sm:px-4 cursor-pointer",
                    theme.gradient.primary,
                  )}
                >
                  <User className="w-3 h-3 sm:w-4 sm:h-4 mr-0.5 sm:mr-1" />
                  Log Masuk
                </Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col">{children}</main>

      <Footer />
    </div>
  );
}
