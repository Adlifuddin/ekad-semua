# Database Setup Guide

This project uses **Drizzle ORM** with **Neon PostgreSQL** database.

## Prerequisites

1. Create a Neon account at [https://neon.tech](https://neon.tech)
2. Create a new project in Neon
3. Copy your database connection string

## Setup Steps

### 1. Configure Environment Variables

Add your Neon database URL to `.env.local`:

```env
DATABASE_URL=postgresql://user:password@host.neon.tech/database?sslmode=require
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

### 2. Generate and Push Database Schema

Run the following command to push your schema to Neon:

```bash
npm run db:push
```

This will create the tables (`users` and `wedding_cards`) in your Neon database.

### 3. (Optional) View Database in Drizzle Studio

To visually inspect your database:

```bash
npm run db:studio
```

This will open Drizzle Studio at `https://local.drizzle.studio`

## Available Scripts

- `npm run db:generate` - Generate migration files from schema changes
- `npm run db:migrate` - Run migrations on your database
- `npm run db:push` - Push schema changes directly (recommended for development)
- `npm run db:studio` - Open Drizzle Studio to view/edit data

## Database Schema

### Users Table

- `id` - UUID (Primary Key)
- `email` - Unique email address
- `password` - Hashed password
- `name` - Optional user name
- `role` - USER or ADMIN
- `createdAt` - Timestamp
- `updatedAt` - Timestamp

### Wedding Cards Table

- `id` - UUID (Primary Key)
- `cardUrl` - Unique URL slug for the wedding card
- `userEmail` - Email of the card owner (links to users)
- `cardSettings` - JSONB containing all card configuration
- `cardStatus` - Card status: Pending, Approved, Rejected, or Cancelled
- `createdAt` - Timestamp
- `updatedAt` - Timestamp

**Card Settings Structure (JSONB):**

```json
{
  "cardLanguage": "ms",
  "cardDesign": "design-1",
  "groomFullName": "John Doe",
  "brideFullName": "Jane Smith",
  "groomNickname": "John",
  "brideNickname": "Jane",
  "nameOrder": "male-female",
  "coupleHashTag": "#JohnAndJane",
  "fatherName": "Mr. Doe",
  "motherName": "Mrs. Doe",
  "eventType": "perkahwinan",
  "eventDate": "2026-06-15",
  "hijriDate": "1447-12-20",
  "startTime": "14:00",
  "endTime": "18:00",
  "address": "123 Wedding St, City",
  "googleMapsLink": "https://maps.google.com/...",
  "wazeLink": "https://waze.com/...",
  "contacts": [
    { "name": "Best Man", "phone": "+60123456789" },
    { "name": "Maid of Honor", "phone": "+60198765432" }
  ]
}
```

## Authentication

The authentication system uses:

- **bcryptjs** for password hashing
- **jose** for JWT token generation/verification
- **HTTP-only cookies** for secure token storage
- **7-day token expiration**

### API Endpoints

**Authentication:**

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

**Wedding Cards:**

- `POST /api/weddings` - Create wedding card (authenticated)
- `GET /api/weddings` - Get user's wedding cards (authenticated)
- `GET /api/weddings/[cardUrl]` - Get single wedding card (public if published)
- `PUT /api/weddings/[cardUrl]` - Update wedding card (owner only)
- `PATCH /api/weddings/[cardUrl]` - Toggle publish status (owner only)
- `DELETE /api/weddings/[cardUrl]` - Delete wedding card (owner only)

## Migration Workflow

### Development (Recommended)

Use `db:push` for quick schema updates:

```bash
npm run db:push
```

### Production

Generate and run migrations:

```bash
npm run db:generate
npm run db:migrate
```

## Troubleshooting

### Connection Issues

- Ensure your Neon database is active
- Check if your IP is whitelisted in Neon settings
- Verify the DATABASE_URL format includes `?sslmode=require`

### Schema Changes Not Applying

- Run `npm run db:push` to sync schema
- Check the `drizzle` folder for generated migrations
- Ensure DATABASE_URL is correctly set in `.env.local`
