"use client";
import { useTranslations } from "next-intl";

// Custom hook to get translated constants
export const useWeddingConstants = () => {
    const t = useTranslations("WeddingForm");

    return {
        CARD_LANG_OPTIONS: [
            {
                value: "ms",
                label: t("cardConfig.languages.malay"),
            },
            {
                value: "en",
                label: t("cardConfig.languages.english"),
            },
        ],

        CARD_DESIGN_OPTIONS: [
            {
                value: "design1",
                label: t("cardConfig.designs.design1"),
                imageUrl: "/card-design/design1.png",
            },
            {
                value: "design2",
                label: t("cardConfig.designs.design2"),
                imageUrl: "/card-design/design2.png",
            },
        ],

        NAME_ORDER_OPTIONS: [
            {
                value: "male-female",
                label: t("coupleInfo.nameOrderMaleFemale"),
            },
            {
                value: "female-male",
                label: t("coupleInfo.nameOrderFemaleMale"),
            },
        ],

        EVENT_TYPE_OPTIONS: [
            {
                value: "pertunangan",
                label: t("eventInfo.eventTypes.engagement"),
            },
            {
                value: "perkahwinan",
                label: t("eventInfo.eventTypes.wedding"),
            },
            {
                value: "resepsi",
                label: t("eventInfo.eventTypes.reception"),
            },
        ],
    };
};