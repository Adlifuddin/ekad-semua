ALTER TABLE "wedding_cards" ADD COLUMN "edit_token" text NOT NULL;--> statement-breakpoint
ALTER TABLE "wedding_cards" ADD CONSTRAINT "wedding_cards_edit_token_unique" UNIQUE("edit_token");