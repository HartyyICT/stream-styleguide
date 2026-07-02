"use client";

import { useTheme } from "@mui/material/styles";
import {
  borderColors,
  colors,
  interactionStates,
  semanticStateColors,
} from "./tokens";

export function useSemanticColors() {
  const theme = useTheme();
  const mode = theme.palette.mode;
  const isDarkMode = mode === "dark";
  const interaction = isDarkMode
    ? interactionStates.dark
    : interactionStates.light;
  const borders = isDarkMode ? borderColors.dark : borderColors.light;
  const semantic = isDarkMode ? semanticStateColors.dark : semanticStateColors.light;
  const surface = isDarkMode ? colors.neutral[800] : colors.semantic.surface;
  const primaryText = isDarkMode ? colors.neutral[50] : colors.neutral[900];
  const secondaryText = isDarkMode ? colors.neutral[300] : colors.neutral[600];
  const selectedBackground = interaction.activeBackground;

  return {
    mode,
    isDarkMode,
    interaction,
    borders,
    semantic,
    surface,
    pageBackground: isDarkMode
      ? colors.neutral[900]
      : colors.semantic.background,
    primaryText,
    secondaryText,
    placeholderText: isDarkMode ? colors.neutral[500] : colors.neutral[400],
    accent: interaction.activeIndicator,
    subtleBackground: interaction.hoverBackground,
    selectedBackground,
    formFocusRing: `0 0 0 3px ${selectedBackground}`,
    formStates: {
      default: {
        border: borders.default,
        background: surface,
        content: primaryText,
      },
      hover: {
        border: borders.interactive,
        background: surface,
        content: primaryText,
      },
      focus: {
        border: borders.focus,
        background: surface,
        content: primaryText,
      },
      error: {
        border: semantic.error,
        background: surface,
        content: primaryText,
      },
      success: {
        border: semantic.success,
        background: surface,
        content: primaryText,
      },
      warning: {
        border: semantic.warning,
        background: surface,
        content: primaryText,
      },
      info: {
        border: semantic.info,
        background: surface,
        content: primaryText,
      },
      disabled: {
        border: borders.subtle,
        background: isDarkMode ? colors.neutral[700] : colors.neutral[100],
        content: isDarkMode ? colors.neutral[500] : colors.neutral[400],
      },
    },
  };
}
