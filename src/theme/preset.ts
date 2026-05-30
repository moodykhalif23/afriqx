import { definePreset } from "@primevue/themes";
import Aura from "@primevue/themes/aura";

/**
 * AFRIQX PrimeVue preset — Aura with the brand's deep-emerald primary and
 * an obsidian surface scale, so every PrimeVue component renders on-brand.
 */
export const AfriqxPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: "#eafff4",
      100: "#ccf7e0",
      200: "#9fecc4",
      300: "#5fd99a",
      400: "#34d27b",
      500: "#1fae5f",
      600: "#15833f",
      700: "#0f6531",
      800: "#0a4a25",
      900: "#073018",
      950: "#04200f",
    },
    borderRadius: {
      none: "0",
      xs: "2px",
      sm: "4px",
      md: "6px",
      lg: "8px",
      xl: "10px",
    },
    colorScheme: {
      dark: {
        surface: {
          0: "#ffffff",
          50: "#eef1f2",
          100: "#d7dcde",
          200: "#b9c1c2",
          300: "#8b9694",
          400: "#3a4d42",
          500: "#28382f",
          600: "#1d2a23",
          700: "#16201b",
          800: "#111815",
          900: "#0a0e0c",
          950: "#060908",
        },
        primary: {
          color: "#1fae5f",
          contrastColor: "#06120b",
          hoverColor: "#34d27b",
          activeColor: "#15833f",
        },
        highlight: {
          background: "color-mix(in srgb, #1fae5f, transparent 84%)",
          focusBackground: "color-mix(in srgb, #1fae5f, transparent 76%)",
          color: "#5fd99a",
          focusColor: "#eafff4",
        },
        content: {
          background: "#111815",
          hoverBackground: "#16201b",
          borderColor: "#28382f",
          color: "#f4efe4",
          hoverColor: "#ffffff",
        },
        formField: {
          background: "#0a0e0c",
          disabledBackground: "#16201b",
          filledBackground: "#111815",
          borderColor: "#28382f",
          hoverBorderColor: "#3a4d42",
          focusBorderColor: "#1fae5f",
          color: "#f4efe4",
          placeholderColor: "#8b9694",
        },
        text: {
          color: "#f4efe4",
          hoverColor: "#ffffff",
          mutedColor: "#b9c1c2",
          hoverMutedColor: "#d7dcde",
        },
      },
    },
  },
});
