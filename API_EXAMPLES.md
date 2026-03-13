# Wedding Card API Examples

## Authentication

### Register

```typescript
const response = await fetch("/api/auth/register", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    email: "user@example.com",
    password: "securepassword123",
    name: "John Doe",
  }),
});

const { user } = await response.json();
// Returns: { id, email, name, role }
```

### Login

```typescript
const response = await fetch("/api/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    email: "user@example.com",
    password: "securepassword123",
  }),
});

const { user } = await response.json();
```

### Logout

```typescript
await fetch("/api/auth/logout", { method: "POST" });
```

## Wedding Cards

### Create Wedding Card

```typescript
const formData = {
  // Card Configuration
  cardLanguage: "ms",
  cardDesign: "design-1",
  cardUrl: "john-and-jane-2026",

  // Couple Information
  groomFullName: "Muhammad Ahmad bin Abdullah",
  brideFullName: "Siti Nur binti Hassan",
  groomNickname: "Ahmad",
  brideNickname: "Nur",
  nameOrder: "male-female",
  coupleHashTag: "#AhmadNur2026",
  fatherName: "Abdullah bin Hassan",
  motherName: "Fatimah binti Ali",
  eventType: "perkahwinan",

  // Event Information
  eventDate: "2026-06-15",
  hijriDate: "1447-12-20",
  startTime: "14:00",
  endTime: "18:00",

  // Location
  address: "Dewan Serbaguna, Kuala Lumpur",
  googleMapsLink: "https://maps.google.com/...",
  wazeLink: "https://waze.com/...",

  // Contacts
  contacts: [
    { name: "Pak Cik Ahmad", phone: "+60123456789" },
    { name: "Mak Cik Fatimah", phone: "+60198765432" },
  ],
};

const response = await fetch("/api/weddings", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(formData),
});

const card = await response.json();
// Returns: { id, cardUrl, userEmail, cardSettings, isPublished, createdAt, updatedAt }
```

### Get All User's Cards

```typescript
const response = await fetch("/api/weddings");
const cards = await response.json();
// Returns array of wedding cards
```

### Get Single Card (Public or Owner)

```typescript
const response = await fetch("/api/weddings/john-and-jane-2026");
const card = await response.json();
// Returns: { id, cardUrl, userEmail, cardSettings, isPublished, createdAt, updatedAt }
```

### Update Card

```typescript
const updatedData = {
  cardLanguage: "en",
  cardDesign: "design-2",
  groomFullName: "Muhammad Ahmad bin Abdullah",
  brideFullName: "Siti Nur binti Hassan",
  // ... all other required fields
  contacts: [{ name: "Updated Contact", phone: "+60111111111" }],
};

const response = await fetch("/api/weddings/john-and-jane-2026", {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(updatedData),
});

const updatedCard = await response.json();
```

### Toggle Publish Status

```typescript
// Toggle current status
const response = await fetch("/api/weddings/john-and-jane-2026", {
  method: "PATCH",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({}),
});

// Or set specific status
const response = await fetch("/api/weddings/john-and-jane-2026", {
  method: "PATCH",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ isPublished: true }),
});

const card = await response.json();
```

### Delete Card

```typescript
const response = await fetch("/api/weddings/john-and-jane-2026", {
  method: "DELETE",
});

const result = await response.json();
// Returns: { success: true, deletedCard: {...} }
```

## Using with React Hook

### Using the `useAuth` Hook

```typescript
import { useAuth } from '@/hooks/useAuth';

function MyComponent() {
  const { user, isLoading, login, register, logout, checkAuth } = useAuth();

  // Check auth on mount
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Login
  const handleLogin = async () => {
    try {
      await login('user@example.com', 'password123');
      // Redirect or update UI
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  // Register
  const handleRegister = async () => {
    try {
      await register('user@example.com', 'password123', 'John Doe');
      // Redirect or update UI
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  // Logout
  const handleLogout = async () => {
    await logout();
    // Redirect to login
  };

  if (isLoading) return <div>Loading...</div>;
  if (!user) return <div>Please login</div>;

  return <div>Welcome, {user.name}!</div>;
}
```

## Error Handling

All API endpoints return errors in this format:

```json
{
  "error": "Error message",
  "details": {} // Optional, for validation errors
}
```

Common HTTP status codes:

- `200` - Success
- `400` - Bad Request (validation error, duplicate URL, etc.)
- `401` - Unauthorized (not logged in)
- `404` - Not Found
- `500` - Internal Server Error

## Data Structure

### Card Settings (JSONB)

All wedding card data is stored in the `cardSettings` JSONB field:

```typescript
interface CardSettings {
  cardLanguage: string; // 'ms' | 'en'
  cardDesign: string;
  groomFullName: string;
  brideFullName: string;
  groomNickname: string;
  brideNickname: string;
  nameOrder: string; // 'male-female' | 'female-male'
  coupleHashTag?: string;
  fatherName: string;
  motherName: string;
  eventType: string;
  eventDate: string; // ISO date string
  hijriDate?: string;
  startTime: string; // HH:mm format
  endTime: string;
  address: string;
  googleMapsLink?: string;
  wazeLink?: string;
  contacts?: Array<{
    name: string;
    phone: string;
  }>;
}
```

### Benefits of JSONB Structure

1. **Flexible**: Easy to add new fields without database migrations
2. **Efficient**: PostgreSQL JSONB supports indexing and querying
3. **Simple**: One column stores all card configuration
4. **Type-safe**: TypeScript interfaces ensure data structure consistency
