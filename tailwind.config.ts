import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary-fixed": "#bbeed3",
        "error": "#ba1a1a",
        "primary-fixed-dim": "#a0d1b8",
        "secondary-fixed": "#ffdea5",
        "on-surface-variant": "#414944",
        "outline": "#717973",
        "tertiary-fixed-dim": "#dec38f",
        "primary-container": "#043927",
        "on-secondary-container": "#785a1a",
        "inverse-primary": "#a0d1b8",
        "surface-tint": "#396752",
        "primary": "#002215",
        "surface": "#faf9f8",
        "surface-container-lowest": "#ffffff",
        "outline-variant": "#c0c9c2",
        "on-secondary": "#ffffff",
        "surface-bright": "#faf9f8",
        "on-secondary-fixed-variant": "#5d4201",
        "error-container": "#ffdad6",
        "on-error": "#ffffff",
        "on-primary-fixed-variant": "#204f3c",
        "tertiary": "#271a00",
        "secondary-container": "#fed488",
        "surface-variant": "#e3e2e1",
        "on-primary": "#ffffff",
        "surface-container-highest": "#e3e2e1",
        "tertiary-container": "#3f2f07",
        "secondary-fixed-dim": "#e9c176",
        "surface-container-high": "#e9e8e7",
        "on-error-container": "#93000a",
        "surface-container-low": "#f4f3f2",
        "on-tertiary-fixed": "#261a00",
        "surface-container": "#eeeeed",
        "surface-dim": "#dadad9",
        "on-primary-container": "#73a48c",
        "on-surface": "#1a1c1c",
        "on-primary-fixed": "#002114",
        "tertiary-fixed": "#fbdfa8",
        "on-tertiary-container": "#af9665",
        "on-tertiary-fixed-variant": "#56441b",
        "on-background": "#1a1c1c",
        "secondary": "#775a19",
        "on-secondary-fixed": "#261900",
        "inverse-on-surface": "#f1f0f0",
        "background": "#faf9f8",
        "inverse-surface": "#2f3130",
        "on-tertiary": "#ffffff"
      },
      fontFamily: {
        headline: ["Noto Serif", "serif"],
        body: ["Manrope", "sans-serif"],
        label: ["Manrope", "sans-serif"]
      },
      borderRadius: {
        DEFAULT: "0.125rem",
        lg: "0.25rem",
        xl: "0.5rem",
        full: "0.75rem"
      }
    },
  },
  plugins: [],
};

export default config;
