import { createTheme, type PaletteMode } from "@mui/material/styles";
import {
  borderColors,
  borderWidths,
  breakpoints,
  colors,
  interactionStates,
  radius,
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
  breakpoints: {
    values: {
      xs: breakpoints.mobile,
      sm: breakpoints.tablet,
      md: breakpoints.laptop,
      lg: breakpoints.desktop,
      xl: 1536,
    },
  },
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
      fontSize: "2rem",
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h2: {
      fontFamily: fontFamilies.heading,
      fontSize: "1.5rem",
      fontWeight: 600,
      lineHeight: 1.25,
    },
    h3: {
      fontFamily: fontFamilies.heading,
      fontSize: "1.25rem",
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h4: {
      fontFamily: fontFamilies.heading,
      fontSize: "1.125rem",
      fontWeight: 500,
      lineHeight: 1.35,
    },
    h5: {
      fontFamily: fontFamilies.heading,
      fontSize: "1rem",
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h6: {
      fontFamily: fontFamilies.heading,
      fontSize: "0.875rem",
      fontWeight: 500,
      lineHeight: 1.45,
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
      lineHeight: 1.5,
    },
    body2: {
      fontSize: "0.875rem",
      fontWeight: 400,
      lineHeight: 1.45,
    },
    subtitle1: {
      fontSize: "1rem",
      fontWeight: 500,
      lineHeight: 1.4,
    },
    subtitle2: {
      fontSize: "0.875rem",
      fontWeight: 500,
      lineHeight: 1.35,
    },
    caption: {
      fontSize: "0.75rem",
      fontWeight: 400,
      lineHeight: 1.3,
    },
    button: {
      fontFamily: fontFamilies.heading,
      fontSize: "0.875rem",
      fontWeight: 500,
      lineHeight: 1.4,
      textTransform: "none",
    },
  },

  shape: {
    borderRadius: Number.parseFloat(radius.medium) * 16,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          colorScheme: mode,
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
          borderRadius: radius.medium,
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
