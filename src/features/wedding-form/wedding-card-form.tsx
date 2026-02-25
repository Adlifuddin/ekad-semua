"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { useState } from "react";
import { FormInput } from "@/components/shared/form-input";
import { FormRadioGroup } from "@/components/shared/form-radio-group";
import { FormSelect } from "@/components/shared/form-select";
import { FormDynamicField } from "@/components/shared/form-dynamic-field";
import { FormDatePicker } from "@/components/shared/form-date-picker";
import { FormTimePicker } from "@/components/shared/form-time-picker";
import { FormWizard, WizardStep } from "@/components/shared/form-wizard";
import { WeddingCardFormHeader } from "./wedding-card-form-header";
import { FormCardGridSelector } from "@/components/shared/form-card-grid-selector";
import { Users, Calendar, MapPin, Phone, CreditCard } from "lucide-react";
import { useTheme } from "@/contexts/theme-context";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { useWeddingConstants } from "@/hooks/useWeddingConstants";

const formSchema = z.object({
  // Card Configuration
  cardLanguage: z.enum(["ms", "en"]),
  cardDesign: z.string().min(1, "Sila pilih design kad"),
  cardUrl: z
    .string()
    .min(1, "URL kad diperlukan")
    .regex(/^[a-z0-9-]+$/, "Gunakan huruf kecil dan tanda '-' sahaja"),

  // Couple Information
  groomFullName: z.string().min(1, "Nama penuh pengantin lelaki diperlukan"),
  brideFullName: z.string().min(1, "Nama penuh pengantin perempuan diperlukan"),
  groomNickname: z.string().min(1, "Nama panggilan lelaki diperlukan"),
  brideNickname: z.string().min(1, "Nama panggilan perempuan diperlukan"),
  nameOrder: z.enum(["male-female", "female-male"]),
  fatherName: z.string().optional(),
  motherName: z.string().optional(),
  email: z.string().email("Email tidak sah").optional().or(z.literal("")),
  eventType: z.string().min(1, "Jenis majlis diperlukan"),

  // Event Information
  eventDate: z.string().min(1, "Tarikh majlis diperlukan"),
  hijriDate: z.string().optional(),
  startTime: z.string().min(1, "Masa mula diperlukan"),
  endTime: z.string().min(1, "Masa tamat diperlukan"),

  // Location
  addressLine1: z.string().min(1, "Alamat baris 1 diperlukan"),
  addressLine2: z.string().optional(),
  googleMapsLink: z
    .string()
    .url("Pautan tidak sah")
    .optional()
    .or(z.literal("")),
  wazeLink: z.string().url("Pautan tidak sah").optional().or(z.literal("")),

  // Theme & Customization
  theme: z.string().min(1, "Sila pilih tema"),
});

type FormValues = z.infer<typeof formSchema>;

type Contact = {
  id: string;
  name: string;
  phone: string;
};

export function WeddingCardForm({
  updateLocale,
}: {
  updateLocale: (cardLanguage: string) => void;
}) {
  const { theme } = useTheme();
  const t = useTranslations("WeddingForm");
  const [contacts, setContacts] = useState<Contact[]>([
    { id: "1", name: "", phone: "" },
  ]);

  const {
    CARD_LANG_OPTIONS,
    CARD_DESIGN_OPTIONS,
    NAME_ORDER_OPTIONS,
    EVENT_TYPE_OPTIONS,
  } = useWeddingConstants();

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
      fatherName: "",
      motherName: "",
      email: "",
      eventType: "perkahwinan",
      eventDate: "",
      hijriDate: "",
      startTime: "",
      endTime: "",
      addressLine1: "",
      addressLine2: "",
      googleMapsLink: "",
      wazeLink: "",
    },
  });

  const cardLanguage = useWatch({
    control: form.control,
    name: "cardLanguage",
  });

  useEffect(() => {
    updateLocale(cardLanguage);
  }, [cardLanguage]);

  const onSubmit = (values: FormValues) => {
    const formData = {
      ...values,
      contacts: contacts.filter((c) => c.name && c.phone),
    };
    console.log(formData);
    // Handle form submission
  };

  const addContact = () => {
    setContacts([
      ...contacts,
      { id: Date.now().toString(), name: "", phone: "" },
    ]);
  };

  const removeContact = (id: string) => {
    if (contacts.length > 1) {
      setContacts(contacts.filter((c) => c.id !== id));
    }
  };

  const updateContact = (id: string, field: string, value: string) => {
    setContacts(
      contacts.map((c) => (c.id === id ? { ...c, [field]: value } : c)),
    );
  };

  const handleComplete = () => {
    form.handleSubmit(onSubmit)();
  };

  const wizardSteps: WizardStep[] = [
    {
      id: "card-config",
      title: t("steps.card.title"),
      description: t("steps.card.description"),
    },
    {
      id: "couple",
      title: t("steps.couple.title"),
      description: t("steps.couple.description"),
    },
    {
      id: "event",
      title: t("steps.event.title"),
      description: t("steps.event.description"),
    },
    {
      id: "location",
      title: t("steps.location.title"),
      description: t("steps.location.description"),
    },
    {
      id: "contacts",
      title: t("steps.contacts.title"),
      description: t("steps.contacts.description"),
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <WeddingCardFormHeader />

        <Form {...form}>
          <FormWizard steps={wizardSteps} onComplete={handleComplete}>
            {/* Step 0: Card Configuration */}
            <Card className={cn("shadow-sm card-hover", theme.colors.border)}>
              <CardHeader className="space-y-1 pb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "p-2 bg-linear-to-br rounded-lg",
                      theme.gradient.medium,
                    )}
                  >
                    <CreditCard className={cn("w-5 h-5", theme.colors.icon)} />
                  </div>
                  <div>
                    <CardTitle className="text-xl md:text-2xl">
                      {t("cardConfig.title")}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      {t("cardConfig.description")}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormRadioGroup
                  control={form.control}
                  name="cardLanguage"
                  label={t("cardConfig.cardLanguage")}
                  required
                  options={CARD_LANG_OPTIONS}
                  direction="horizontal"
                />

                <FormCardGridSelector
                  control={form.control}
                  name="cardDesign"
                  label={t("cardConfig.selectTheme")}
                  required
                  className="w-full"
                  options={CARD_DESIGN_OPTIONS}
                />

                <FormInput
                  showButton
                  buttonLabel={t("cardConfig.urlPrefix")}
                  control={form.control}
                  name="cardUrl"
                  label={t("cardConfig.cardUrl")}
                  placeholder={t("cardConfig.urlPlaceholder")}
                  required
                  description={t("cardConfig.urlDescription")}
                />
              </CardContent>
            </Card>

            {/* Step 1: Couple Information */}
            <Card className={cn("shadow-sm card-hover", theme.colors.border)}>
              <CardHeader className="space-y-1 pb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "p-2 bg-linear-to-br rounded-lg",
                      theme.gradient.medium,
                    )}
                  >
                    <Users className={cn("w-5 h-5", theme.colors.icon)} />
                  </div>
                  <div>
                    <CardTitle className="text-xl md:text-2xl">
                      {t("coupleInfo.title")}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      {t("coupleInfo.description")}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <FormInput
                    control={form.control}
                    name="groomFullName"
                    label={t("coupleInfo.groomFullName")}
                    placeholder={t("coupleInfo.groomFullNamePlaceholder")}
                    required
                  />
                  <FormInput
                    control={form.control}
                    name="brideFullName"
                    label={t("coupleInfo.brideFullName")}
                    placeholder={t("coupleInfo.brideFullNamePlaceholder")}
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <FormInput
                    control={form.control}
                    name="groomNickname"
                    label={t("coupleInfo.groomNickname")}
                    placeholder={t("coupleInfo.groomNicknamePlaceholder")}
                    required
                  />
                  <FormInput
                    control={form.control}
                    name="brideNickname"
                    label={t("coupleInfo.brideNickname")}
                    placeholder={t("coupleInfo.brideNicknamePlaceholder")}
                    required
                  />
                </div>

                <FormRadioGroup
                  control={form.control}
                  name="nameOrder"
                  label={t("coupleInfo.nameOrder")}
                  required
                  options={NAME_ORDER_OPTIONS}
                  direction="horizontal"
                />

                <div className={cn("pt-4 border-t", theme.colors.border)}>
                  <p className="text-sm font-medium mb-4 text-muted-foreground">
                    {t("coupleInfo.parentsInfo")}
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormInput
                      control={form.control}
                      name="fatherName"
                      label={t("coupleInfo.fatherName")}
                      placeholder={t("coupleInfo.fatherNamePlaceholder")}
                    />
                    <FormInput
                      control={form.control}
                      name="motherName"
                      label={t("coupleInfo.motherName")}
                      placeholder={t("coupleInfo.motherNamePlaceholder")}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 2: Event Information */}
            <Card className={cn("shadow-sm card-hover", theme.colors.border)}>
              <CardHeader className="space-y-1 pb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "p-2 bg-linear-to-br rounded-lg",
                      theme.gradient.medium,
                    )}
                  >
                    <Calendar className={cn("w-5 h-5", theme.colors.icon)} />
                  </div>
                  <div>
                    <CardTitle className="text-xl md:text-2xl">
                      {t("eventInfo.title")}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      {t("eventInfo.description")}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormSelect
                  control={form.control}
                  name="eventType"
                  label={t("eventInfo.eventType")}
                  placeholder={t("eventInfo.eventTypePlaceholder")}
                  required
                  className="w-full"
                  options={EVENT_TYPE_OPTIONS}
                />

                <div className="grid md:grid-cols-2 gap-4">
                  <FormDatePicker
                    control={form.control}
                    name="eventDate"
                    label={t("eventInfo.eventDate")}
                    placeholder={t("eventInfo.eventDatePlaceholder")}
                    required
                  />
                  <FormInput
                    control={form.control}
                    name="hijriDate"
                    label={t("eventInfo.hijriDate")}
                    placeholder={t("eventInfo.hijriDatePlaceholder")}
                    disabled
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <FormTimePicker
                    control={form.control}
                    name="startTime"
                    label={t("eventInfo.startTime")}
                    placeholder={t("eventInfo.startTimePlaceholder")}
                    required
                  />
                  <FormTimePicker
                    control={form.control}
                    name="endTime"
                    label={t("eventInfo.endTime")}
                    placeholder={t("eventInfo.endTimePlaceholder")}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Step 3: Location */}
            <Card className={cn("shadow-sm card-hover", theme.colors.border)}>
              <CardHeader className="space-y-1 pb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "p-2 bg-linear-to-br rounded-lg",
                      theme.gradient.medium,
                    )}
                  >
                    <MapPin className={cn("w-5 h-5", theme.colors.icon)} />
                  </div>
                  <div>
                    <CardTitle className="text-xl md:text-2xl">
                      {t("location.title")}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      {t("location.description")}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormInput
                  control={form.control}
                  name="addressLine1"
                  label={t("location.addressLine1")}
                  placeholder={t("location.addressLine1Placeholder")}
                  required
                />

                <FormInput
                  control={form.control}
                  name="addressLine2"
                  label={t("location.addressLine2")}
                  placeholder={t("location.addressLine2Placeholder")}
                />

                <div className={cn("pt-4 border-t", theme.colors.border)}>
                  <p className="text-sm font-medium mb-4 text-muted-foreground">
                    {t("location.navigationLinks")}
                  </p>
                  <div className="space-y-4">
                    <FormInput
                      control={form.control}
                      name="googleMapsLink"
                      label={t("location.googleMaps")}
                      placeholder={t("location.googleMapsPlaceholder")}
                    />

                    <FormInput
                      control={form.control}
                      name="wazeLink"
                      label={t("location.waze")}
                      placeholder={t("location.wazePlaceholder")}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 4: Contact Information */}
            <Card className={cn("shadow-sm card-hover", theme.colors.border)}>
              <CardHeader className="space-y-1 pb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "p-2 bg-linear-to-br rounded-lg",
                      theme.gradient.medium,
                    )}
                  >
                    <Phone className={cn("w-5 h-5", theme.colors.icon)} />
                  </div>
                  <div>
                    <CardTitle className="text-xl md:text-2xl">
                      {t("contacts.title")}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      {t("contacts.description")}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormDynamicField
                  items={contacts}
                  onAdd={addContact}
                  onRemove={removeContact}
                  onUpdate={updateContact}
                  fields={[
                    {
                      name: "name",
                      placeholder: t("contacts.namePlaceholder"),
                    },
                    {
                      name: "phone",
                      placeholder: t("contacts.phonePlaceholder"),
                    },
                  ]}
                  addButtonText={t("contacts.addButton")}
                  minItems={1}
                />

                <div className={cn("pt-6 mt-6 border-t", theme.colors.border)}>
                  <div
                    className={cn(
                      "bg-linear-to-br rounded-lg p-6 text-center",
                      theme.gradient.light,
                    )}
                  >
                    <p className="text-sm text-muted-foreground mb-2">
                      {t("contacts.completionMessage")}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t("contacts.completionHint")}{" "}
                      <span className="font-semibold">
                        {t("contacts.completionButton")}
                      </span>{" "}
                      {t("contacts.completionHint2")}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </FormWizard>
        </Form>
      </div>
    </div>
  );
}
