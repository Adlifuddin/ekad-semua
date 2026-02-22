import { WeddingCardForm } from "@/features/wedding-form/wedding-card-form";
import { cookies } from "next/headers";

export default function FormPage() {
  const updateLocale = async (cardLanguage: string) => {
    "use server";
    const store = await cookies();
    store.set("locale", cardLanguage);
  };

  return (
    <div className="min-h-screen">
      <WeddingCardForm updateLocale={updateLocale} />
    </div>
  );
}
