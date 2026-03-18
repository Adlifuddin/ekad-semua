"use client";

import { WeddingCardForm } from "@/features/wedding-form/wedding-card-form";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateLocale } from "@/hooks/useUpdateLocale";
import { useContacts } from "@/features/wedding-form/hooks/useContacts";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { customFetch } from "@/lib/utils/custom-fetch";
import Layout from "@/components/layout/Layout";
import {
  createFormSchema,
  type WeddingFormValues,
} from "@/schemas/wedding-form";
import { toast } from "@/lib/utils/toast";
import { PaymentDialog } from "@/features/wedding-form/payment-dialog";

export type FormValues = WeddingFormValues;

export default function FormPage() {
  const [formKey, setFormKey] = useState(0);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [pendingFormData, setPendingFormData] = useState<FormValues | null>(
    null,
  );
  const { contacts, addContact, removeContact, updateContact, setContacts } =
    useContacts();
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

  const onSubmit = async (values: FormValues) => {
    // Store form data and open payment dialog
    setPendingFormData(values);
    setIsPaymentDialogOpen(true);
  };

  const handlePaymentSubmit = async (paymentRefId: string) => {
    if (!pendingFormData) return;

    const formData = {
      ...pendingFormData,
      contacts: contacts.filter((c) => c.name && c.phone),
      paymentRefId, // Add payment reference ID
    };

    const response = await customFetch("/weddings", {
      method: "POST",
      body: JSON.stringify(formData),
    });

    toast.success(`Wedding card ${response.cardUrl} created successfully!`, {
      description:
        "An email will be sent to you after the purchase. Please wait for the card to be approved.",
    });

    const editUrl = `${window.location.origin}${response.editUrl}`;
    console.log("Edit URL:", editUrl);

    // Reset form, contacts, and wizard
    form.reset();
    setContacts([{ id: "1", name: "", phone: "" }]);
    setFormKey((prev) => prev + 1);
    setIsPaymentDialogOpen(false);
    setPendingFormData(null);
  };

  return (
    <Layout pages="main">
      <div className="min-h-screen">
        <WeddingCardForm
          key={formKey}
          form={form}
          onSubmit={onSubmit}
          contacts={contacts}
          addContact={addContact}
          removeContact={removeContact}
          updateContact={updateContact}
        />
      </div>

      <PaymentDialog
        open={isPaymentDialogOpen}
        onOpenChange={setIsPaymentDialogOpen}
        onSubmit={handlePaymentSubmit}
      />
    </Layout>
  );
}
