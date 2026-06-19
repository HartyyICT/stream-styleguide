import { createTheme } from "@mui/material/styles";
import { colors } from "./tokens";

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
});