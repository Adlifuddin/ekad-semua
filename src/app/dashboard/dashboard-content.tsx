"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { WeddingCard } from "@/db/schema";
import { customFetch } from "@/lib/utils/custom-fetch";
import { toast } from "@/lib/utils/toast";
import { ChevronDownIcon, Plus } from "lucide-react";

export default function DashboardContent() {
  const router = useRouter();
  const [weddingCards, setWeddingCards] = useState<WeddingCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [cardToDelete, setCardToDelete] = useState<string | null>(null);

  useEffect(() => {
    async function fetchWeddingCards() {
      const data = await customFetch("/weddings", {
        method: "GET",
      });

      setWeddingCards(data);
      setIsLoading(false);
    }

    fetchWeddingCards();
  }, []);

  const fetchWeddingCards = async () => {
    const data = await customFetch("/weddings", {
      method: "GET",
    });

    setWeddingCards(data);
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  const getStatusStyle = (status: string) => {
    const styles = {
      Pending:
        "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
      Approved:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      Rejected: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      Cancelled:
        "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
    };
    return styles[status as keyof typeof styles] || "bg-gray-100 text-gray-800";
  };

  const updateCardStatus = async (
    cardId: string,
    cardUrl: string,
    newStatus: "Pending" | "Approved" | "Rejected" | "Cancelled",
  ) => {
    try {
      await customFetch(`/weddings/${cardUrl}`, {
        method: "PUT",
        body: JSON.stringify({ cardStatus: newStatus }),
      });

      // Update the local state
      setWeddingCards((prev) =>
        prev.map((card) =>
          card.id === cardId ? { ...card, cardStatus: newStatus } : card,
        ),
      );

      toast.success("Status updated successfully");
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    }
  };

  const openDeleteDialog = (cardUrl: string) => {
    setCardToDelete(cardUrl);
    setDeleteDialogOpen(true);
  };

  const deleteCard = async () => {
    if (!cardToDelete) return;

    try {
      await customFetch(`/weddings/${cardToDelete}`, {
        method: "DELETE",
      });

      toast.success("Wedding card deleted successfully");
      setDeleteDialogOpen(false);
      setCardToDelete(null);

      // Refetch the wedding cards
      await fetchWeddingCards();
    } catch (error) {
      console.error("Error deleting card:", error);
      toast.error("Failed to delete card");
    }
  };

  if (isLoading) {
    return (
      <Card className="p-8">
        <div className="flex items-center justify-center">
          <p className="text-muted-foreground">Loading wedding cards...</p>
        </div>
      </Card>
    );
  }

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button onClick={() => router.push("/form")} className="gap-2">
          <Plus className="h-4 w-4" />
          Create Card
        </Button>
      </div>
      <Card className="p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Card URL</TableHead>
              <TableHead>User Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created Date</TableHead>
              <TableHead>Card Event Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {weddingCards.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-gray-500">
                  No Wedding Cards Found
                </TableCell>
              </TableRow>
            ) : (
              weddingCards.map((card) => (
                <TableRow key={card.id}>
                  <TableCell className="font-medium">{card.cardUrl}</TableCell>
                  <TableCell>{card.userEmail}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button
                          className={`px-2 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1 ${getStatusStyle(card.cardStatus)} cursor-pointer hover:opacity-80 transition-opacity`}
                        >
                          {card.cardStatus}
                          <ChevronDownIcon className="size-3" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        <DropdownMenuItem
                          onClick={() =>
                            updateCardStatus(card.id, card.cardUrl, "Pending")
                          }
                        >
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusStyle("Pending")}`}
                          >
                            Pending
                          </span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            updateCardStatus(card.id, card.cardUrl, "Approved")
                          }
                        >
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusStyle("Approved")}`}
                          >
                            Approved
                          </span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            updateCardStatus(card.id, card.cardUrl, "Rejected")
                          }
                        >
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusStyle("Rejected")}`}
                          >
                            Rejected
                          </span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            updateCardStatus(card.id, card.cardUrl, "Cancelled")
                          }
                        >
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusStyle("Cancelled")}`}
                          >
                            Cancelled
                          </span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                  <TableCell>{formatDate(card.createdAt.toString())}</TableCell>
                  <TableCell>
                    {formatDate(card.cardSettings.eventDate.toString())}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(`/${card.cardUrl}`, "_blank")}
                    >
                      View
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => router.push(`/form/edit/${card.cardUrl}`)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => openDeleteDialog(card.cardUrl)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Wedding Card</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete card &ldquo;/{cardToDelete}
                &rdquo;? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction variant="destructive" onClick={deleteCard}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Card>
    </>
  );
}
