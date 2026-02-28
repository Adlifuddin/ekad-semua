"use client";
import { WeddingInvitation } from "@/features/wedding-invitation/wedding-invitation";
import { getLocalStorage } from "@/lib/utils/localStorage";

function getWeddingDemoData() {
  const data = getLocalStorage("weddingDemoData");
  if (data) {
    return JSON.parse(data);
  }
}

export default function InvitationPage() {
  const data = getWeddingDemoData();

  return <WeddingInvitation data={data} />;
}
