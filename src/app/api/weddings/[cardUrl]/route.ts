import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/db";
import { weddingCards } from "@/db/schema";
import { eq, and } from "drizzle-orm";

// GET /api/weddings/[cardUrl] - Get a single wedding card (public)
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ cardUrl: string }> }
) {
  try {
    const { cardUrl } = await params;

    const [card] = await db
      .select()
      .from(weddingCards)
      .where(eq(weddingCards.cardUrl, cardUrl))
      .limit(1);

    if (!card) {
      return NextResponse.json(null);
    }

    return NextResponse.json(card);
  } catch (error) {
    console.error("Error fetching wedding card:", error);
    return NextResponse.json(
      { error: "Failed to fetch wedding card" },
      { status: 500 }
    );
  }
}

// PUT /api/weddings/[cardUrl] - Update a wedding card (owner only)
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ cardUrl: string }> }
) {
  const session = await getSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { cardUrl } = await params;
    const data = await req.json();

    // Check if the card exists and belongs to the user
    const [existingCard] = await db
      .select()
      .from(weddingCards)
      .where(
        and(
          eq(weddingCards.cardUrl, cardUrl),
          eq(weddingCards.userEmail, session.email)
        )
      )
      .limit(1);

    if (!existingCard) {
      return NextResponse.json(
        { error: "Wedding card not found or unauthorized" },
        { status: 404 }
      );
    }

    const { contacts, ...cardSettings } = data;

    // Update the card
    const [updatedCard] = await db
      .update(weddingCards)
      .set({
        cardSettings: {
          ...cardSettings,
          contacts: contacts || [],
        },
        updatedAt: new Date(),
      })
      .where(eq(weddingCards.id, existingCard.id))
      .returning();

    return NextResponse.json(updatedCard);
  } catch (error) {
    console.error("Error updating wedding card:", error);
    return NextResponse.json(
      { error: "Failed to update wedding card" },
      { status: 500 }
    );
  }
}

// DELETE /api/weddings/[cardUrl] - Delete a wedding card (owner only)
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ cardUrl: string }> }
) {
  const session = await getSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { cardUrl } = await params;

    // Delete the card (only if it belongs to the user)
    const [deletedCard] = await db
      .delete(weddingCards)
      .where(
        and(
          eq(weddingCards.cardUrl, cardUrl),
          eq(weddingCards.userEmail, session.email)
        )
      )
      .returning();

    if (!deletedCard) {
      return NextResponse.json(
        { error: "Wedding card not found or unauthorized" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, deletedCard });
  } catch (error) {
    console.error("Error deleting wedding card:", error);
    return NextResponse.json(
      { error: "Failed to delete wedding card" },
      { status: 500 }
    );
  }
}

// PATCH /api/weddings/[cardUrl] - Update card status (owner only)
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ cardUrl: string }> }
) {
  const session = await getSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { cardUrl } = await params;
    const { cardStatus } = await req.json();

    // Validate cardStatus
    const validStatuses = ["Pending", "Approved", "Rejected", "Cancelled"];
    if (cardStatus && !validStatuses.includes(cardStatus)) {
      return NextResponse.json(
        { error: "Invalid card status. Must be one of: Pending, Approved, Rejected, Cancelled" },
        { status: 400 }
      );
    }

    // Check if the card exists and belongs to the user
    const [existingCard] = await db
      .select()
      .from(weddingCards)
      .where(
        and(
          eq(weddingCards.cardUrl, cardUrl),
          eq(weddingCards.userEmail, session.email)
        )
      )
      .limit(1);

    if (!existingCard) {
      return NextResponse.json(
        { error: "Wedding card not found or unauthorized" },
        { status: 404 }
      );
    }

    // Update card status
    const [updatedCard] = await db
      .update(weddingCards)
      .set({
        cardStatus: cardStatus as "Pending" | "Approved" | "Rejected" | "Cancelled",
        updatedAt: new Date(),
      })
      .where(eq(weddingCards.id, existingCard.id))
      .returning();

    return NextResponse.json(updatedCard);
  } catch (error) {
    console.error("Error updating card status:", error);
    return NextResponse.json(
      { error: "Failed to update card status" },
      { status: 500 }
    );
  }
}
