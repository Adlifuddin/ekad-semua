import { NextRequest } from 'next/server';
 
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const id = (await params).id;

  return new Response(JSON.stringify({
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
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}