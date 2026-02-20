export type ThemeColor = {
  name: string;
  gradient: {
    light: string; // Light background gradient
    medium: string; // Card accent gradients
    primary: string; // Progress bar and buttons
  };
  colors: {
    border: string;
    icon: string;
    ring: string;
  };
};

export const theme: ThemeColor = {
  name: "Ocean Blues",
  gradient: {
    light: "from-blue-50/50 via-cyan-50/30 to-teal-50/50",
    medium: "from-blue-100 to-cyan-100",
    primary: "from-blue-400 via-cyan-400 to-teal-400",
  },
  colors: {
    border: "border-blue-100",
    icon: "text-blue-600",
    ring: "ring-blue-400/50 border-blue-300",
  },
};
