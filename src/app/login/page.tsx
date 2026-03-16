"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/shared/form-input";
import { useTheme } from "@/contexts/theme-context";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { customFetch } from "@/lib/utils/custom-fetch";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Layout from "@/components/layout/Layout";
import { toast } from "@/lib/utils/toast";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);

    const response = await customFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify(values),
    });

    toast.success(`Login as ${response.user.email} successfully!`);

    // Redirect to dashboard after successful login
    router.push("/dashboard");
    setIsLoading(false);
  };

  return (
    <Layout pages="auth">
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md p-8 space-y-6 bg-white/80 backdrop-blur-sm shadow-xl border-blue-100">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1
              className={cn(
                "text-3xl font-bold bg-linear-to-r bg-clip-text text-transparent",
                theme.gradient.primary,
              )}
            >
              Log Masuk
            </h1>
            <p className="text-slate-600">
              Sila masukkan maklumat anda untuk log masuk mengedit kad digital
              anda.
            </p>
          </div>

          {/* Login Form */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              <FormInput
                control={form.control}
                name="email"
                label="Emel"
                type="email"
                placeholder="nama@contoh.com"
                required
              />

              <FormInput
                control={form.control}
                name="password"
                label="Kata Laluan"
                type="password"
                placeholder="••••••••"
                required
              />

              <Button
                type="submit"
                disabled={isLoading}
                className={cn(
                  "w-full bg-linear-to-r text-white font-semibold py-6 shadow-lg shadow-blue-200/50 hover:shadow-xl hover:shadow-blue-300/60 transition-all cursor-pointer",
                  theme.gradient.primary,
                )}
              >
                {isLoading ? "Memuatkan..." : "Log Masuk"}
              </Button>
            </form>
          </Form>

          {/* Footer Links */}
          <div className="text-center space-y-2 pt-4 border-t border-blue-100">
            <p className="text-sm text-slate-600">
              Belum mencipta kad?{" "}
              <Link
                href="/form"
                className={cn(
                  "font-semibold hover:underline",
                  theme.colors.icon,
                )}
              >
                Cipta sekarang
              </Link>
            </p>
            <Link
              href="/"
              className="text-sm text-slate-500 hover:text-slate-700 block"
            >
              ← Kembali ke laman utama
            </Link>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
