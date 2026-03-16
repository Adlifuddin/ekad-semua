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
import { WeddingCard } from "@/db/schema";
import { customFetch } from "@/lib/utils/custom-fetch";

export default function DashboardContent() {
  const router = useRouter();
  const [weddingCards, setWeddingCards] = useState<WeddingCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchWeddingCards() {
      const data = await customFetch("/weddings", {
        method: "GET",
      });

      setWeddingCards(data);
      console.log("Fetched wedding cards:", data);
      setIsLoading(false);
    }

    fetchWeddingCards();
  }, []);

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
    <Card className="p-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Card URL</TableHead>
            <TableHead>User Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
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
                <TableCell className="font-medium">
                  <a
                    href={`/${card.cardUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    /{card.cardUrl}
                  </a>
                </TableCell>
                <TableCell>{card.userEmail}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(card.cardStatus)}`}
                  >
                    {card.cardStatus}
                  </span>
                </TableCell>
                <TableCell>{formatDate(card.createdAt.toString())}</TableCell>
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
                    onClick={() => router.push(`/form?edit=${card.id}`)}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Card>
  );
}
