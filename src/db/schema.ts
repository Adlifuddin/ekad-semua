import { pgTable, text, timestamp, boolean, pgEnum, uuid, index, jsonb } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Enums
export const userRoleEnum = pgEnum("user_role", ["USER", "ADMIN"]);
export const cardStatusEnum = pgEnum("card_status", ["Pending", "Approved", "Rejected", "Cancelled"]);

// Users Table
export const users = pgTable(
  "users",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    email: text("email").notNull().unique(),
    password: text("password").notNull(),
    name: text("name"),
    role: userRoleEnum("role").default("USER").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    emailIdx: index("email_idx").on(table.email),
  })
);

// Wedding Cards Table
export const weddingCards = pgTable(
  "wedding_cards",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    cardUrl: text("card_url").notNull().unique(),
    userEmail: text("user_email").notNull(),
    cardSettings: jsonb("card_settings").notNull().$type<CardSettings>(),
    cardStatus: cardStatusEnum("card_status").default("Pending").notNull(),
    paymentRefId: text("payment_ref_id"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    cardUrlIdx: index("card_url_idx").on(table.cardUrl),
    userEmailIdx: index("user_email_idx").on(table.userEmail),
  })
);

// Card Settings Type
export interface CardSettings {
  cardLanguage: string;
  cardDesign: string;
  groomFullName: string;
  brideFullName: string;
  groomNickname: string;
  brideNickname: string;
  nameOrder: string;
  coupleHashTag?: string;
  fatherName: string;
  motherName: string;
  eventType: string;
  eventDate: string;
  hijriDate?: string;
  startTime: string;
  endTime: string;
  address: string;
  googleMapsLink?: string;
  wazeLink?: string;
  contacts?: Array<{ name: string; phone: string }>;
}

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  weddingCards: many(weddingCards),
}));

export const weddingCardsRelations = relations(weddingCards, ({ one }) => ({
  user: one(users, {
    fields: [weddingCards.userEmail],
    references: [users.email],
  }),
}));

// Types
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type WeddingCard = typeof weddingCards.$inferSelect;
export type NewWeddingCard = typeof weddingCards.$inferInsert;
