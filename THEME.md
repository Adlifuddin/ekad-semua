# Ocean Blues Theme

The wedding card form uses the **Ocean Blues** color theme with blue, cyan, and teal gradients.

## Customizing Colors

Edit `src/lib/themes.ts` to change the colors:

```typescript
export const theme: ThemeColor = {
  name: "Ocean Blues",
  gradient: {
    light: "from-blue-50/50 via-cyan-50/30 to-teal-50/50", // Background
    medium: "from-blue-100 to-cyan-100", // Card accents
    primary: "from-blue-400 via-cyan-400 to-teal-400", // Buttons/progress
  },
  colors: {
    border: "border-blue-100", // Border color
    icon: "text-blue-600", // Icon color
    ring: "ring-blue-400/50", // Focus ring
  },
};
```

Replace color names with any Tailwind color (e.g., `rose`, `purple`, `emerald`, etc.) to create your own theme.

## Example: Change to Rose/Pink Theme

```typescript
export const theme: ThemeColor = {
  name: "Rose Romance",
  gradient: {
    light: "from-rose-50/50 via-pink-50/30 to-purple-50/50",
    medium: "from-rose-100 to-pink-100",
    primary: "from-rose-400 via-pink-400 to-purple-400",
  },
  colors: {
    border: "border-rose-100",
    icon: "text-rose-600",
    ring: "ring-rose-400/50",
  },
};
```
