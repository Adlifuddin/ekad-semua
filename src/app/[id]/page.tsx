import { WeddingInvitation } from "@/features/wedding-invitation/wedding-invitation";
import { customFetch } from "@/lib/utils/custom-fetch";
import { NotFoundContent } from "@/components/shared/not-found-content";

export default async function InvitationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const response = await customFetch(`weddings/${id}`, {
    method: "GET",
  });

  if (!response) {
    return (
      <NotFoundContent
        title={`Invitation ${id} Not Found`}
        message="The wedding invitation you're looking for doesn't exist or has been removed."
      />
    );
  }

  const data = response;

  return <WeddingInvitation data={data} />;
}
