"use client";
import { WeddingInvitation } from "@/features/wedding-invitation/wedding-invitation";
import { getLocalStorage } from "@/lib/localStorage";

function getWeddingDemoData() {
  const data = getLocalStorage("weddingDemoData");
  if (data) {
    return JSON.parse(data);
  }

  // return default data if no data in localStorage
  return {
    cardLanguage: "ms",
    cardDesign: "design1",
    groomFullName: "Faris bin Wahab",
    brideFullName: "Sarah binti Ahmad",
    groomNickname: "Ahmad",
    brideNickname: "Nora",
    nameOrder: "male-female",
    fatherName: "Wahab bin Hassan",
    motherName: "Siti binti Samad",
    eventType: "Majlis Perkahwinan",
    eventDate: "2026-06-15",
    hijriDate: "15 Ramadan 1448H",
    startTime: "11:00 AM",
    endTime: "4:00 PM",
    address: "Dewan Serbaguna, Taman Gedung, 11900 Bayan Lepas, Pulau Pinang",
    googleMapsLink: "https://maps.google.com/",
    wazeLink: "https://waze.com/",
    contacts: [
      {
        name: "Ahmad",
        phone: "+60123456789",
      },
      {
        name: "Nora",
        phone: "+60198765432",
      },
    ],
  };
}

export default function InvitationPage() {
  const data = getWeddingDemoData();

  return <WeddingInvitation data={data} />;
}
