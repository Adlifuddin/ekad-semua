import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/db";
import { weddingCards } from "@/db/schema";
import { eq, desc, and, SQL } from "drizzle-orm";

export async function POST(req: NextRequest) {
  // need to add token some form of verification after user payment, for now we will just accept the request and create the card

  const data = await req.json();
  
  try {
    const { cardUrl, userEmail, contacts, ...cardSettings } = data;

    const [newWeddingCard] = await db
      .insert(weddingCards)
      .values({
        cardUrl: cardUrl,
        userEmail: userEmail,
        cardSettings: {
          ...cardSettings,
          userEmail,
          contacts: contacts || [],
        },
      })
      .returning();
    
    return NextResponse.json(newWeddingCard);
  } catch (error) {
    console.error("Wedding card creation error:", error);
    
    // Handle unique constraint violation
    if (error && typeof error === "object" && "code" in error && error.code === "23505") {
      return NextResponse.json(
        { error: "This card URL is already taken" },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: "Failed to create wedding card" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const session = await getSession();
  
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  // Build dynamic conditions array for optional filters
  const conditions: SQL[] = [];
  if (email) {
    conditions.push(eq(weddingCards.userEmail, email));
  }
  // Add more optional filters here in the future
  // if (anotherParam) conditions.push(eq(weddingCards.field, anotherParam));

  const cards = await db
    .select()
    .from(weddingCards)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(desc(weddingCards.createdAt));

  return NextResponse.json(cards);
}
