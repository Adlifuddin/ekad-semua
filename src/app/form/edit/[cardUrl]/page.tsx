"use client";

import { WeddingCardForm } from "@/features/wedding-form/wedding-card-form";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateLocale } from "@/hooks/useUpdateLocale";
import { useContacts } from "@/features/wedding-form/hooks/useContacts";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";
import { customFetch } from "@/lib/utils/custom-fetch";
import Layout from "@/components/layout/Layout";
import { useRouter, useParams } from "next/navigation";
import {
  createFormSchema,
  type WeddingFormValues,
} from "@/schemas/wedding-form";
import { toast } from "@/lib/utils/toast";

export type FormValues = WeddingFormValues;

export default function EditFormPage() {
  const { contacts, addContact, removeContact, updateContact, setContacts } =
    useContacts();
  const t = useTranslations("WeddingForm");
  const router = useRouter();
  const params = useParams();
  const cardUrl = params?.cardUrl as string;
  const [loading, setLoading] = useState(true);

  const formSchema = useMemo(() => createFormSchema(t), [t]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardLanguage: "ms",
      cardDesign: "",
      cardUrl: "",
      groomFullName: "",
      brideFullName: "",
      groomNickname: "",
      brideNickname: "",
      nameOrder: "male-female",
      coupleHashTag: "",
      fatherName: "",
      motherName: "",
      userEmail: "",
      eventType: "perkahwinan",
      eventDate: "",
      hijriDate: "",
      startTime: "",
      endTime: "",
      address: "",
      googleMapsLink: "",
      wazeLink: "",
    },
  });

  const cardLanguage = useWatch({
    control: form.control,
    name: "cardLanguage",
  });

  useUpdateLocale(cardLanguage);

  // Fetch existing wedding card data
  useEffect(() => {
    const fetchCardData = async () => {
      const card = await customFetch(`/weddings/${cardUrl}`, {
        method: "GET",
      });

      // Populate form with existing data
      const settings = card.cardSettings;
      form.reset({
        cardLanguage: settings.cardLanguage || "ms",
        cardDesign: settings.cardDesign || "",
        cardUrl: card.cardUrl,
        groomFullName: settings.groomFullName || "",
        brideFullName: settings.brideFullName || "",
        groomNickname: settings.groomNickname || "",
        brideNickname: settings.brideNickname || "",
        nameOrder: settings.nameOrder || "male-female",
        coupleHashTag: settings.coupleHashTag || "",
        fatherName: settings.fatherName || "",
        motherName: settings.motherName || "",
        userEmail: card.userEmail,
        eventType: settings.eventType || "perkahwinan",
        eventDate: settings.eventDate || "",
        hijriDate: settings.hijriDate || "",
        startTime: settings.startTime || "",
        endTime: settings.endTime || "",
        address: settings.address || "",
        googleMapsLink: settings.googleMapsLink || "",
        wazeLink: settings.wazeLink || "",
      });

      // Set contacts if they exist
      if (settings.contacts && Array.isArray(settings.contacts)) {
        setContacts(
          settings.contacts.map(
            (contact: { name: string; phone: string }, index: number) => ({
              id: `contact-${index}`,
              name: contact.name,
              phone: contact.phone,
            }),
          ),
        );
      }

      setLoading(false);
    };

    fetchCardData();
  }, [cardUrl, form, setContacts, router]);

  const onSubmit = async (values: FormValues) => {
    const formData = {
      ...values,
      contacts: contacts.filter((c) => c.name && c.phone),
    };

    const response = await customFetch(`/weddings/${cardUrl}`, {
      method: "PUT",
      body: JSON.stringify(formData),
    });

    toast.success(`Wedding card ${response.cardUrl} updated successfully!`);
  };

  if (loading) {
    return (
      <Layout pages="main">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout pages="main">
      <div className="min-h-screen">
        <WeddingCardForm
          form={form}
          onSubmit={onSubmit}
          contacts={contacts}
          addContact={addContact}
          removeContact={removeContact}
          updateContact={updateContact}
        />
      </div>
    </Layout>
  );
}
