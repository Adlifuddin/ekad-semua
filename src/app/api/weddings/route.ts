import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/db";
import { weddingCards } from "@/db/schema";
import { eq, desc, and, SQL } from "drizzle-orm";
import { randomUUID } from "crypto";
import { sendEmail } from "@/services/mailer/mailer";
import WeddingPending from "../../../../emails/weddings/weddings-pending";

export async function POST(req: NextRequest) {
  // need to add token some form of verification after user payment, for now we will just accept the request and create the card

  const data = await req.json();
  let createdCardId: string | null = null;
  
  try {
    const { cardUrl, userEmail, contacts, paymentRefId, ...cardSettings } = data;

    // Generate a secure edit token
    const editToken = randomUUID();

    const [newWeddingCard] = await db
      .insert(weddingCards)
      .values({
        cardUrl: cardUrl,
        userEmail: userEmail,
        editToken: editToken,
        paymentRefId: paymentRefId || null,
        cardSettings: {
          ...cardSettings,
          userEmail,
          contacts: contacts || [],
        },
      })
      .returning();

    createdCardId = newWeddingCard.id;

    const editUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/form/edit/${cardUrl}?token=${editToken}`;

    // Try to send email, rollback if it fails
    try {
      await sendEmail({
        to: userEmail,
        subject: 'Wedding Card Request Received - Pending Approval',
        component: WeddingPending({
          groomName: cardSettings.groomFullName,
          brideName: cardSettings.brideFullName,
          cardUrl: cardUrl,
          paymentRefId: paymentRefId || 'N/A',
          editUrl: editUrl,
        }),
      });
    } catch (emailError) {
      console.error("Email sending failed, rolling back card creation:", emailError);
      
      // Rollback: Delete the created card
      if (createdCardId) {
        await db.delete(weddingCards).where(eq(weddingCards.id, createdCardId));
      }
      
      throw new Error("Failed to send confirmation email. Please try again later.");
    }
    
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
      { error: error instanceof Error ? error.message : "Failed to create wedding card" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const session = await getSession();
  
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Build dynamic conditions array for optional filters
  const conditions: SQL[] = [];
  if(session.role !== "ADMIN") {
    conditions.push(eq(weddingCards.userEmail, session.email));
  }
  else {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (email) {
      conditions.push(eq(weddingCards.userEmail, email));
    }
  }

  const cards = await db
    .select()
    .from(weddingCards)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(desc(weddingCards.createdAt));

  return NextResponse.json(cards);
}
