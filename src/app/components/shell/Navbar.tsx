"use client";

import { Box, Chip, Typography } from "@mui/material";
import { BookOpen } from "lucide-react";
import {
  borderColors,
  colors,
  interactionStates,
  radius,
} from "../../theme/tokens";
import { useColorMode } from "../../theme/themeProvider";
import ThemeModeToggle from "@/app/components/shell/ThemeModeToggle";
import SearchDialog from "@/app/components/search/SearchDialog";

export default function Navbar() {
  const { mode } = useColorMode();
  const isDarkMode = mode === "dark";

  const surface = isDarkMode
    ? colors.neutral[800]
    : colors.semantic.surface;
  const borders = isDarkMode ? borderColors.dark : borderColors.light;
  const interaction = isDarkMode
    ? interactionStates.dark
    : interactionStates.light;
  const border = borders.subtle;
  const primaryText = isDarkMode ? colors.neutral[50] : colors.neutral[900];
  const secondaryText = isDarkMode
    ? colors.neutral[300]
    : colors.neutral[600];
  const selectedBackground = interaction.activeBackground;
  const accent = interaction.activeIndicator;

  return (
    <Box
      component="header"
      sx={{
        height: 64,
        position: "fixed",
        inset: "0 0 auto 0",
        zIndex: 1200,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: { xs: 2, md: 3 },
        backgroundColor: surface,
        borderBottom: 1,
        borderColor: border,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <Box
          sx={{
            width: 36,
            height: 36,
            display: "grid",
            placeItems: "center",
            borderRadius: radius.medium,
            color: colors.semantic.surface,
            backgroundColor: colors.primary[500],
          }}
        >
          <BookOpen size={20} />
        </Box>

        <Box>
          <Typography
            variant="subtitle1"
            sx={{
              color: primaryText,
              fontFamily: "var(--font-poppins), sans-serif",
              fontWeight: 600,
              lineHeight: 1.2,
            }}
          >
            Stream Design System
          </Typography>

          <Typography variant="caption" sx={{ color: secondaryText }}>
            Styleguide
          </Typography>
        </Box>

        <Chip
          label="v0.1"
          size="small"
          sx={{
            display: { xs: "none", sm: "inline-flex" },
            backgroundColor: selectedBackground,
            color: accent,
            fontWeight: 700,
          }}
        />
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <SearchDialog />
        <ThemeModeToggle />
      </Box>
    </Box>
  );
}
