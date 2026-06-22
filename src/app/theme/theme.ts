import { createTheme } from "@mui/material/styles";
import { colors } from "./tokens";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    fontFamilyHeading: string;
    fontFamilyMonospace: string;
  }

  interface TypographyVariantsOptions {
    fontFamilyHeading?: string;
    fontFamilyMonospace?: string;
  }
}

const fontFamilies = {
  body: "var(--font-open-sans), Arial, sans-serif",
  heading: "var(--font-poppins), Arial, sans-serif",
  monospace: "var(--font-space-mono), monospace",
};

export const theme = createTheme({
  palette: {
    primary: {
      light: colors.primary[100],
      main: colors.primary[500],
      dark: colors.primary[700],
    },
    background: {
      default: colors.semantic.background,
      paper: colors.semantic.surface,
    },
    text: {
      primary: colors.neutral[900],
      secondary: colors.neutral[500],
      disabled: colors.neutral[400],
    },
    success: colors.semantic.success,
    warning: colors.semantic.warning,
    error: colors.semantic.error,
    info: colors.semantic.info,
    divider: colors.neutral[200],
  },

  typography: {
    fontFamily: fontFamilies.body,
    fontFamilyHeading: fontFamilies.heading,
    fontFamilyMonospace: fontFamilies.monospace,

    h1: {
      fontFamily: fontFamilies.heading,
      fontSize: "2.5rem",
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h2: {
      fontFamily: fontFamilies.heading,
      fontSize: "1.75rem",
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontFamily: fontFamilies.heading,
      fontSize: "1.25rem",
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h4: {
      fontFamily: fontFamilies.heading,
      fontWeight: 600,
    },
    h5: {
      fontFamily: fontFamilies.heading,
      fontWeight: 600,
    },
    h6: {
      fontFamily: fontFamilies.heading,
      fontWeight: 600,
    },
    button: {
      fontFamily: fontFamilies.heading,
      fontWeight: 600,
      textTransform: "none",
    },
  },

  shape: {
    borderRadius: 8,
  },
});