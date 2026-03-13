// Type definitions for the wedding card system
import type { CardSettings } from "@/db/schema";

export type { CardSettings };

// Contact type
export interface Contact {
  name: string;
  phone: string;
}

// Wedding card form values (what comes from the form)
export interface WeddingCardFormData {
  // Card Configuration
  cardLanguage: string;
  cardDesign: string;
  cardUrl: string;

  // Couple Information
  groomFullName: string;
  brideFullName: string;
  groomNickname: string;
  brideNickname: string;
  nameOrder: string;
  coupleHashTag?: string;
  fatherName: string;
  motherName: string;
  eventType: string;

  // Event Information
  eventDate: string;
  hijriDate?: string;
  startTime: string;
  endTime: string;

  // Location
  address: string;
  googleMapsLink?: string;
  wazeLink?: string;

  // Contacts
  contacts?: Contact[];
}

// Wedding card database record (what comes from the database)
export interface WeddingCardRecord {
  id: string;
  cardUrl: string;
  userEmail: string;
  cardSettings: CardSettings;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// API response types
export interface WeddingCardCreateResponse {
  id: string;
  cardUrl: string;
  userEmail: string;
  cardSettings: CardSettings;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export type WeddingCardListResponse = WeddingCardCreateResponse[];

export interface ErrorResponse {
  error: string;
  details?: unknown;
}
