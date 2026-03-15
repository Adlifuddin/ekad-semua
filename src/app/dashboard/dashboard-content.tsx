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

interface DashboardContentProps {
  userEmail: string;
}

export default function DashboardContent({}: DashboardContentProps) {
  const router = useRouter();
  const [weddingCards, setWeddingCards] = useState<WeddingCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
            <TableHead>Couple Names</TableHead>
            <TableHead>Event Date</TableHead>
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
                <TableCell>
                  {card.cardSettings.groomNickname} &{" "}
                  {card.cardSettings.brideNickname}
                </TableCell>
                <TableCell>{formatDate(card.cardSettings.eventDate)}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      card.isPublished
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {card.isPublished ? "Published" : "Draft"}
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
