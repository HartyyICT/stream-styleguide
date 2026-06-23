"use client";

import {
  borderColors,
  colors,
  interactionStates,
} from "@/app/theme/tokens";
import { useColorMode } from "@/app/theme/themeProvider";

export function useDocumentationStyles() {
  const { mode } = useColorMode();
  const isDarkMode = mode === "dark";
  const interaction = isDarkMode
    ? interactionStates.dark
    : interactionStates.light;
  const borders = isDarkMode ? borderColors.dark : borderColors.light;

  return {
    mode,
    isDarkMode,
    interaction,
    borders,
    surface: isDarkMode ? colors.neutral[800] : colors.semantic.surface,
    pageBackground: isDarkMode
      ? colors.neutral[900]
      : colors.semantic.background,
    primaryText: isDarkMode ? colors.neutral[50] : colors.neutral[900],
    secondaryText: isDarkMode ? colors.neutral[300] : colors.neutral[600],
    accent: interaction.activeIndicator,
    subtleBackground: interaction.hoverBackground,
    selectedBackground: interaction.activeBackground,
  };
}
