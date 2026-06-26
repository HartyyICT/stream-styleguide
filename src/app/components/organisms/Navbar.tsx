"use client";

import { Box, Chip, IconButton, Typography } from "@mui/material";
import { BookOpen, Menu } from "lucide-react";
import {
  borderColors,
  borderWidths,
  colors,
  iconSizes,
  interactionStates,
  radius,
  responsiveLayout,
} from "../../theme/tokens";
import { useColorMode } from "../../theme/themeProvider";
import ThemeModeToggle from "@/app/components/molecules/ThemeModeToggle";
import SearchDialog from "@/app/components/molecules/SearchDialog";

interface NavbarProps {
  onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
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
        height: responsiveLayout.navbarHeight,
        position: "fixed",
        inset: "0 0 auto 0",
        zIndex: 1200,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: {
          xs: responsiveLayout.pagePaddingX.mobile,
          md: responsiveLayout.pagePaddingX.tablet,
        },
        backgroundColor: surface,
        borderBottom: 1,
        borderColor: border,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <IconButton
          aria-label="Open navigation"
          onClick={onMenuClick}
          sx={{
            display: { xs: "inline-flex", md: "none" },
            width: 38,
            height: 38,
            color: secondaryText,
            border: `${borderWidths.subtle} solid ${border}`,
            backgroundColor: surface,
            "&:hover": {
              color: interaction.hoverContent,
              border: `${borderWidths.interactive} solid ${interaction.hoverBorder}`,
              backgroundColor: interaction.hoverBackground,
            },
          }}
        >
          <Menu size={iconSizes.control} aria-hidden="true" />
        </IconButton>

        <Box
          sx={{
            width: { xs: 34, sm: 36 },
            height: { xs: 34, sm: 36 },
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

          <Typography
            variant="caption"
            sx={{ display: { xs: "none", sm: "block" }, color: secondaryText }}
          >
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
