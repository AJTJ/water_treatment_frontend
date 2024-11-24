// src/styles/theme.ts
export const theme = {
  colors: {
    primary: "#0070f3",
    secondary: "#ff4081",
    background: "#f0f0f0",
    text: "#333",
  },
  spacing: {
    small: "8px",
    medium: "16px",
    large: "24px",
  },
};

export type ThemeType = typeof theme;

declare module "styled-components" {
  export interface DefaultTheme extends ThemeType {}
}
