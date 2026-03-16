CREATE TYPE "public"."card_status" AS ENUM('Pending', 'Approved', 'Rejected', 'Cancelled');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('USER', 'ADMIN');--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"name" text,
	"role" "user_role" DEFAULT 'USER' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "wedding_cards" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"card_url" text NOT NULL,
	"user_email" text NOT NULL,
	"card_settings" jsonb NOT NULL,
	"card_status" "card_status" DEFAULT 'Pending' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "wedding_cards_card_url_unique" UNIQUE("card_url")
);
--> statement-breakpoint
CREATE INDEX "email_idx" ON "users" USING btree ("email");--> statement-breakpoint
CREATE INDEX "card_url_idx" ON "wedding_cards" USING btree ("card_url");--> statement-breakpoint
CREATE INDEX "user_email_idx" ON "wedding_cards" USING btree ("user_email");