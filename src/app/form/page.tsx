"use client";

import { WeddingCardForm } from "@/features/wedding-form/wedding-card-form";
import * as z from "zod";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateLocale } from "@/hooks/useUpdateLocale";
import { useContacts } from "@/features/wedding-form/hooks/useContacts";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

const createFormSchema = (t: (key: string) => string) =>
  z.object({
    // Card Configuration
    cardLanguage: z.enum(["ms", "en"]),
    cardDesign: z.string().min(1, t("validation.selectDesign")),
    cardUrl: z
      .string()
      .min(1, t("validation.urlRequired"))
      .regex(/^[a-z0-9-]+$/, t("validation.urlFormat")),

    // Couple Information
    groomFullName: z.string().min(1, t("validation.groomNameRequired")),
    brideFullName: z.string().min(1, t("validation.brideNameRequired")),
    groomNickname: z.string().min(1, t("validation.groomNicknameRequired")),
    brideNickname: z.string().min(1, t("validation.brideNicknameRequired")),
    nameOrder: z.enum(["male-female", "female-male"]),
    coupleHashTag: z.string().optional(),
    fatherName: z.string().min(1, t("validation.fatherNameRequired")),
    motherName: z.string().min(1, t("validation.motherNameRequired")),
    email: z
      .string()
      .email(t("validation.emailInvalid"))
      .optional()
      .or(z.literal("")),
    eventType: z.string().min(1, t("validation.eventTypeRequired")),

    // Event Information
    eventDate: z.string().min(1, t("validation.eventDateRequired")),
    hijriDate: z.string().optional(),
    startTime: z.string().min(1, t("validation.startTimeRequired")),
    endTime: z.string().min(1, t("validation.endTimeRequired")),

    // Location
    address: z.string().min(1, t("validation.addressRequired")),
    googleMapsLink: z
      .string()
      .url(t("validation.invalidLink"))
      .optional()
      .or(z.literal("")),
    wazeLink: z
      .string()
      .url(t("validation.invalidLink"))
      .optional()
      .or(z.literal("")),
  });

export type FormValues = z.infer<ReturnType<typeof createFormSchema>>;

export default function FormPage() {
  const { contacts, addContact, removeContact, updateContact } = useContacts();
  const t = useTranslations("WeddingForm");

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
      email: "",
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

  const onSubmit = (values: FormValues) => {
    const formData = {
      ...values,
      contacts: contacts.filter((c) => c.name && c.phone),
    };
    console.log(formData);
  };

  return (
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
  );
}
