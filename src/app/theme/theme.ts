import { createTheme, type PaletteMode } from "@mui/material/styles";
import {
  borderColors,
  borderWidths,
  colors,
  interactionStates,
} from "./tokens";

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

export const createAppTheme = (mode: PaletteMode) =>
  createTheme({
  palette: {
    mode,
    common: {
      black: colors.neutral[900],
      white: colors.semantic.surface,
    },
    grey: {
      50: colors.neutral[50],
      100: colors.neutral[100],
      200: colors.neutral[200],
      300: colors.neutral[300],
      400: colors.neutral[400],
      500: colors.neutral[500],
      600: colors.neutral[600],
      700: colors.neutral[700],
      800: colors.neutral[800],
      900: colors.neutral[900],
      A100: colors.neutral[100],
      A200: colors.neutral[200],
      A400: colors.neutral[400],
      A700: colors.neutral[700],
    },
    primary: {
      light: colors.primary[100],
      main: mode === "light" ? colors.primary[500] : colors.primary[300],
      dark: colors.primary[700],
      contrastText: colors.semantic.surface,
    },
    background: {
      default:
        mode === "light" ? colors.semantic.background : colors.neutral[900],
      paper:
        mode === "light" ? colors.semantic.surface : colors.neutral[800],
    },
    text: {
      primary:
        mode === "light" ? colors.neutral[900] : colors.neutral[50],
      secondary:
        mode === "light" ? colors.neutral[600] : colors.neutral[300],
      disabled: colors.neutral[400],
    },
    success: {
      ...colors.semantic.success,
      main:
        mode === "light"
          ? colors.semantic.success.light
          : colors.semantic.success.dark,
      contrastText:
        mode === "light" ? colors.neutral[900] : colors.semantic.surface,
    },
    warning: {
      ...colors.semantic.warning,
      main:
        mode === "light"
          ? colors.semantic.warning.light
          : colors.semantic.warning.dark,
      contrastText:
        mode === "light" ? colors.neutral[900] : colors.semantic.surface,
    },
    error: {
      ...colors.semantic.error,
      main:
        mode === "light"
          ? colors.semantic.error.light
          : colors.semantic.error.dark,
      contrastText:
        mode === "light" ? colors.neutral[900] : colors.semantic.surface,
    },
    info: {
      ...colors.semantic.info,
      main:
        mode === "light"
          ? colors.semantic.info.light
          : colors.semantic.info.dark,
      contrastText:
        mode === "light" ? colors.neutral[900] : colors.semantic.surface,
    },
    divider: mode === "light" ? colors.neutral[200] : colors.neutral[700],
    action: {
      active: mode === "light" ? colors.neutral[600] : colors.neutral[300],
      hover:
        mode === "light"
          ? interactionStates.light.hoverBackground
          : interactionStates.dark.hoverBackground,
      selected:
        mode === "light"
          ? interactionStates.light.activeBackground
          : interactionStates.dark.activeBackground,
      disabled: colors.neutral[400],
      disabledBackground:
        mode === "light" ? colors.neutral[100] : colors.neutral[800],
      focus: mode === "light" ? colors.primary[100] : colors.neutral[700],
    },
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
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          transition: "background-color 180ms ease, color 180ms ease",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          boxSizing: "border-box",
          border: `${borderWidths.subtle} solid ${
            mode === "light"
              ? borderColors.light.subtle
              : borderColors.dark.subtle
          }`,
          borderRadius: 8,
          color:
            mode === "light" ? colors.neutral[600] : colors.neutral[300],
          backgroundColor:
            mode === "light"
              ? colors.semantic.surface
              : colors.neutral[800],
          "&:hover": {
            color:
              mode === "light"
                ? interactionStates.light.hoverContent
                : interactionStates.dark.hoverContent,
            border: `${borderWidths.interactive} solid ${
              mode === "light"
                ? interactionStates.light.hoverBorder
                : interactionStates.dark.hoverBorder
            }`,
            backgroundColor:
              mode === "light"
                ? interactionStates.light.hoverBackground
                : interactionStates.dark.hoverBackground,
          },
        },
      },
    },
  },
});
