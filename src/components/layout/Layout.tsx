"use client";

import React from "react";
import AuthLayout from "./AuthLayout";
import MainLayout from "./MainLayout";

interface LayoutProps {
  children: React.ReactNode;
  pages?: "auth" | "main" | "default";
  title?: string;
}

export default function Layout({ children, pages = "default" }: LayoutProps) {
  const renderLayout = () => {
    switch (pages) {
      case "auth":
        return <AuthLayout>{children}</AuthLayout>;

      case "main":
        return <MainLayout>{children}</MainLayout>;

      case "default":
      default:
        return <MainLayout>{children}</MainLayout>;
    }
  };

  return renderLayout();
}
