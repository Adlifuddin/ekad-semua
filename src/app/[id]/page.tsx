import { WeddingInvitation } from "@/features/wedding-invitation/wedding-invitation";
import { ca } from "zod/locales";

// This would typically fetch data from a database based on the ID
// For now, we'll use sample data that matches the formSchema
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function getInvitationData(id: string) {
  // In production, this would be a database query
  // Example: const data = await db.invitation.findUnique({ where: { cardUrl: id } })

  return {
    cardLanguage: "ms" as const,
    cardDesign: "design1",
    groomFullName: "Ahmad bin Abdullah",
    brideFullName: "Nora binti Ali",
    groomNickname: "Ahmad",
    brideNickname: "Nora",
    nameOrder: "male-female" as const,
    fatherName: "Abdullah bin Hassan",
    motherName: "Fatimah binti Ibrahim",
    eventType: "Majlis Perkahwinan",
    eventDate: "2026-06-15",
    hijriDate: "15 Ramadan 1448H",
    startTime: "11:00 AM",
    endTime: "4:00 PM",
    addressLine1: "Dewan Serbaguna, Taman Bunga",
    addressLine2: "Jalan Mawar 5, 50000 Kuala Lumpur",
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

export default async function InvitationPage({
  params,
}: {
  params: { id: string };
}) {
  const data = await getInvitationData(params.id);

  return <WeddingInvitation data={data} />;
}
