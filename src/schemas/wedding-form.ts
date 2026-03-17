import * as z from "zod";

export const createFormSchema = (t: (key: string) => string) =>
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
    userEmail: z.string().email(t("validation.emailInvalid")),
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

export type WeddingFormSchema = ReturnType<typeof createFormSchema>;
export type WeddingFormValues = z.infer<WeddingFormSchema>;
