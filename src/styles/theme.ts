import type { ThemeConfig } from "tailwindcss/types/config";

export const themeConfig: ThemeConfig = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--color-primary)",
          foreground: "var(--color-primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--color-secondary)",
          foreground: "var(--color-secondary-foreground)",
        },
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
      },
    },
  },
};

export const lightTheme = {
  "--color-primary": "#3b82f6",
  "--color-primary-foreground": "#ffffff",
  "--color-secondary": "#6b7280",
  "--color-secondary-foreground": "#ffffff",
  "--color-background": "#ffffff",
  "--color-foreground": "#1f2937",
};

export const darkTheme = {
  "--color-primary": "#60a5fa",
  "--color-primary-foreground": "#1f2937",
  "--color-secondary": "#9ca3af",
  "--color-secondary-foreground": "#1f2937",
  "--color-background": "#1f2937",
  "--color-foreground": "#f3f4f6",
};
