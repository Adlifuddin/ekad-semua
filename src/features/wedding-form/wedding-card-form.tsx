"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { FormHeader } from "@/components/shared/form-header";
import { FormCardGridSelector } from "@/components/shared/form-card-grid-selector";
import { Users, Calendar, MapPin, Phone, CreditCard } from "lucide-react";
import { useTheme } from "@/contexts/theme-context";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  // Card Configuration
  cardLanguage: z.enum(["bahasa", "english"]),
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

export function WeddingCardForm() {
  const { theme } = useTheme();
  const [contacts, setContacts] = useState<Contact[]>([
    { id: "1", name: "", phone: "" },
  ]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardLanguage: "bahasa",
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
      eventType: "",
      eventDate: "",
      hijriDate: "",
      startTime: "",
      endTime: "",
      addressLine1: "",
      addressLine2: "",
      googleMapsLink: "",
      wazeLink: "",
      theme: "",
    },
  });

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
      title: "Kad",
      description: "Konfigurasi kad",
    },
    {
      id: "couple",
      title: "Pasangan",
      description: "Maklumat pengantin",
    },
    {
      id: "event",
      title: "Majlis",
      description: "Butiran majlis",
    },
    {
      id: "location",
      title: "Lokasi",
      description: "Alamat & navigasi",
    },
    {
      id: "contacts",
      title: "Hubungan",
      description: "Maklumat dihubungi",
    },
  ];

  return (
    <div
      className={cn(
        "min-h-screen py-8 md:py-12 px-4 bg-linear-to-br",
        theme.gradient.light,
      )}
    >
      <div className="max-w-3xl mx-auto">
        <FormHeader />

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
                      Konfigurasi Kad
                    </CardTitle>
                    <CardDescription className="text-sm">
                      Pilih bahasa, design dan URL kad anda
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormRadioGroup
                  control={form.control}
                  name="cardLanguage"
                  label="Bahasa Kad"
                  required
                  options={[
                    {
                      value: "bahasa",
                      label: "Bahasa Malaysia",
                    },
                    {
                      value: "english",
                      label: "English",
                    },
                  ]}
                  direction="horizontal"
                />

                <FormCardGridSelector
                  control={form.control}
                  name="cardDesign"
                  label="Pilih Tema"
                  required
                  className="w-full"
                  options={[
                    {
                      value: "design-1",
                      label: "Design 01",
                      imageUrl: "/card-design/blue_bg.png",
                    },
                    {
                      value: "design-2",
                      label: "Design 02",
                      imageUrl: "/card-design/peach_bg.png",
                    },
                  ]}
                />

                <FormInput
                  showButton
                  buttonLabel="ekad-semua /"
                  control={form.control}
                  name="cardUrl"
                  label="URL Kad"
                  placeholder="contoh-nama-kad"
                  required
                  description="URL untuk kad digital anda (gunakan huruf kecil dan tanda '-')"
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
                      Maklumat Pasangan
                    </CardTitle>
                    <CardDescription className="text-sm">
                      Nama penuh dan panggilan pengantin
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <FormInput
                    control={form.control}
                    name="groomFullName"
                    label="Nama Penuh Lelaki"
                    placeholder="Ahmad bin Abdullah"
                    required
                  />
                  <FormInput
                    control={form.control}
                    name="brideFullName"
                    label="Nama Penuh Perempuan"
                    placeholder="Nora binti Ali"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <FormInput
                    control={form.control}
                    name="groomNickname"
                    label="Nama Panggilan Lelaki"
                    placeholder="Ahmad"
                    required
                  />
                  <FormInput
                    control={form.control}
                    name="brideNickname"
                    label="Nama Panggilan Perempuan"
                    placeholder="Nora"
                    required
                  />
                </div>

                <FormRadioGroup
                  control={form.control}
                  name="nameOrder"
                  label="Susunan Nama pada Kad"
                  required
                  options={[
                    {
                      value: "male-female",
                      label: "Lelaki & Perempuan",
                    },
                    {
                      value: "female-male",
                      label: "Perempuan & Lelaki",
                    },
                  ]}
                  direction="horizontal"
                />

                <div className={cn("pt-4 border-t", theme.colors.border)}>
                  <p className="text-sm font-medium mb-4 text-muted-foreground">
                    Maklumat Ibu Bapa
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormInput
                      control={form.control}
                      name="fatherName"
                      label="Nama Bapa"
                      placeholder="Abdullah bin Hassan"
                    />
                    <FormInput
                      control={form.control}
                      name="motherName"
                      label="Nama Ibu"
                      placeholder="Fatimah binti Ibrahim"
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
                      Butiran Majlis
                    </CardTitle>
                    <CardDescription className="text-sm">
                      Tarikh, masa dan jenis majlis
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormSelect
                  control={form.control}
                  name="eventType"
                  label="Jenis Majlis"
                  placeholder="Pilih jenis majlis"
                  required
                  className="w-full"
                  options={[
                    { value: "perkahwinan", label: "Majlis Perkahwinan" },
                    { value: "pertunangan", label: "Majlis Pertunangan" },
                    { value: "resepsi", label: "Majlis Resepsi" },
                    { value: "akad-nikah", label: "Majlis Akad Nikah" },
                  ]}
                />

                <div className="grid md:grid-cols-2 gap-4">
                  <FormDatePicker
                    control={form.control}
                    name="eventDate"
                    label="Tarikh Majlis"
                    placeholder="Pilih tarikh"
                    required
                  />
                  <FormInput
                    control={form.control}
                    name="hijriDate"
                    label="Tarikh Hijrah"
                    placeholder="15 Ramadan 1446"
                    disabled
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <FormTimePicker
                    control={form.control}
                    name="startTime"
                    label="Masa Mula"
                    placeholder="Pilih masa"
                    required
                  />
                  <FormTimePicker
                    control={form.control}
                    name="endTime"
                    label="Masa Tamat"
                    placeholder="Pilih masa"
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
                      Lokasi Majlis
                    </CardTitle>
                    <CardDescription className="text-sm">
                      Alamat dan pautan navigasi
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormInput
                  control={form.control}
                  name="addressLine1"
                  label="Alamat Baris 1"
                  placeholder="No. 123, Jalan Mawar"
                  required
                />

                <FormInput
                  control={form.control}
                  name="addressLine2"
                  label="Alamat Baris 2"
                  placeholder="Taman Bunga, 50000 Kuala Lumpur"
                />

                <div className={cn("pt-4 border-t", theme.colors.border)}>
                  <p className="text-sm font-medium mb-4 text-muted-foreground">
                    Pautan Navigasi (Pilihan)
                  </p>
                  <div className="space-y-4">
                    <FormInput
                      control={form.control}
                      name="googleMapsLink"
                      label="Google Maps"
                      placeholder="https://maps.google.com/..."
                    />

                    <FormInput
                      control={form.control}
                      name="wazeLink"
                      label="Waze"
                      placeholder="https://waze.com/..."
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
                      Maklumat Dihubungi
                    </CardTitle>
                    <CardDescription className="text-sm">
                      Untuk tetamu menghubungi jika diperlukan
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
                    { name: "name", placeholder: "Nama" },
                    { name: "phone", placeholder: "No. Telefon" },
                  ]}
                  addButtonText="+ Tambah Hubungan"
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
                      Selepas ini, anda akan menerima e-kad digital yang cantik
                      untuk majlis anda
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Klik <span className="font-semibold">Selesai</span> untuk
                      mencipta kad anda
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
