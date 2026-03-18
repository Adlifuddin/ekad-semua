import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/db";
import { weddingCards } from "@/db/schema";
import { eq } from "drizzle-orm";

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

    // Authorization check for authenticated users
    if (session && session.role !== "ADMIN" && card.userEmail !== session.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      );
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
  const editToken = req.nextUrl.searchParams.get("token");

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

    // Check authorization: either valid session OR valid edit token
    const isAuthorizedBySession = session && 
      (session.role === "ADMIN" || existingCard.userEmail === session.email);
    const isAuthorizedByToken = editToken && editToken === existingCard.editToken;

    if (!isAuthorizedBySession && !isAuthorizedByToken) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      );
    }

    const { contacts, cardUrl: newCardUrl, ...cardSettings } = data;

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

// PATCH /api/weddings/[cardUrl] - Update only the card status (owner only)
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ cardUrl: string }> }
) {
  const session = await getSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (session.role !== "ADMIN") {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 403 }
    );
  }

  try {
    const { cardUrl } = await params;
    const { cardStatus } = await req.json();

    if (!cardStatus) {
      return NextResponse.json(
        { error: "cardStatus is required" },
        { status: 400 }
      );
    }

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

    // Update only the cardStatus
    const [updatedCard] = await db
      .update(weddingCards)
      .set({
        cardStatus,
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
