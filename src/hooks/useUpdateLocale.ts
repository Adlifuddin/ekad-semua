import { useEffect } from "react";
import { setLocaleCookie } from "@/lib/actions";

export function useUpdateLocale(locale: string) {
  useEffect(() => {
    setLocaleCookie(locale);
  }, [locale]);
}
