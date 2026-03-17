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
  
  const session = await getSession();

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

    if (session) {
      if (session.role !== "ADMIN" && card.userEmail !== session.email) {
        return NextResponse.json(
          { error: "Unauthorized" },
          { status: 403 }
        );
      }
    }
    
    console.log("Fetched wedding card:", card);
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

    // Fetch the existing card
    const [existingCard] = await db
      .select()
      .from(weddingCards)
      .where(eq(weddingCards.cardUrl, cardUrl))
      .limit(1);

    if (!existingCard) {
      return NextResponse.json(
        { error: "Wedding card not found" },
        { status: 404 }
      );
    }

    // If not admin, check ownership
    if (session.role !== "ADMIN" && existingCard.userEmail !== session.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      );
    }

    const { contacts, cardStatus, cardUrl: newCardUrl, ...cardSettings } = data;

    // If cardUrl is being changed, check if the new URL is already taken
    if (newCardUrl && newCardUrl !== cardUrl) {
      const [existingUrl] = await db
        .select()
        .from(weddingCards)
        .where(eq(weddingCards.cardUrl, newCardUrl))
        .limit(1);

      if (existingUrl) {
        return NextResponse.json(
          { error: "Card URL already exists" },
          { status: 400 }
        );
      }
    }

    // Build update object
    const updateData: Partial<typeof weddingCards.$inferInsert> = {
      cardSettings: {
        ...cardSettings,
        contacts: contacts || [],
      },
      updatedAt: new Date(),
    };

    // Add optional fields if provided
    if (cardStatus) {
      updateData.cardStatus = cardStatus;
    }
    if (newCardUrl && newCardUrl !== cardUrl) {
      updateData.cardUrl = newCardUrl;
    }

    // Update the card
    const [updatedCard] = await db
      .update(weddingCards)
      .set(updateData)
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

    const [deletedCard] = await db
      .delete(weddingCards)
      .where(eq(weddingCards.cardUrl, cardUrl))
      .returning();

    if (!deletedCard) {
      return NextResponse.json(
        { error: "Wedding card not found" },
        { status: 404 }
      );
    }

    // If not admin, check ownership
    if (session.role !== "ADMIN" && deletedCard.userEmail !== session.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
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
