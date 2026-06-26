"use client";

import { IconButton, Tooltip } from "@mui/material";
import { Moon, Sun } from "lucide-react";
import { useColorMode } from "../../theme/themeProvider";
import {
  borderColors,
  borderWidths,
  colors,
  iconSizes,
  interactionStates,
  radius,
} from "../../theme/tokens";

export default function ThemeModeToggle() {
  const { mode, toggleColorMode } = useColorMode();
  const isDarkMode = mode === "dark";
  const label = isDarkMode ? "Switch to light mode" : "Switch to dark mode";
  const interaction = isDarkMode
    ? interactionStates.dark
    : interactionStates.light;
  const borders = isDarkMode ? borderColors.dark : borderColors.light;

  return (
    <Tooltip title={label}>
      <IconButton
        aria-label={label}
        onClick={toggleColorMode}
        size="small"
        sx={{
          width: 38,
          height: 38,
          flexShrink: 0,
          color: isDarkMode ? colors.neutral[300] : colors.neutral[600],
          backgroundColor: isDarkMode
            ? colors.neutral[800]
            : colors.semantic.surface,
          boxSizing: "border-box",
          border: `${borderWidths.subtle} solid ${borders.subtle}`,
          borderRadius: radius.medium,
          transition:
            "color 160ms ease, border-color 160ms ease, background-color 160ms ease",
          "&:hover": {
            color: interaction.hoverContent,
            border: `${borderWidths.interactive} solid ${interaction.hoverBorder}`,
            backgroundColor: interaction.hoverBackground,
          },
          "&:active": {
            backgroundColor: interaction.activeBackground,
          },
          "& .MuiTouchRipple-child": {
            backgroundColor: interaction.activeIndicator,
          },
          "& .MuiTouchRipple-rippleVisible": {
            opacity: 0.18,
          },
        }}
      >
        {isDarkMode ? (
          <Sun size={iconSizes.control} />
        ) : (
          <Moon size={iconSizes.control} />
        )}
      </IconButton>
    </Tooltip>
  );
}
