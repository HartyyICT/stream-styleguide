"use client";

import { Box, Chip, IconButton, Typography } from "@mui/material";
import { BookOpen, Menu, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import {
  borderColors,
  borderWidths,
  colors,
  iconSizes,
  interactionStates,
  navbarTokens,
  pageLayoutTokens,
  radius,
} from "../../theme/tokens";
import { useColorMode } from "../../theme/themeProvider";
import SearchDialog from "@/app/components/molecules/SearchDialog";
import UserProfileMenu from "@/app/components/molecules/UserProfileMenu";
import { sidebarMotion } from "@/app/components/organisms/sidebarMotion";

interface NavbarProps {
  onMenuClick: () => void;
  sidebarCollapsed: boolean;
  onSidebarToggle: () => void;
}

export default function Navbar({
  onMenuClick,
  sidebarCollapsed,
  onSidebarToggle,
}: NavbarProps) {
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
        height: pageLayoutTokens.navbarHeight,
        position: "fixed",
        inset: "0 0 auto 0",
        zIndex: 1200,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: {
          xs: pageLayoutTokens.shellPaddingX.mobile,
          md: pageLayoutTokens.shellPaddingX.tablet,
        },
        pl: {
          md: 0,
        },
        pr: {
          md: navbarTokens.actionEdgeInset,
        },
        backgroundColor: surface,
        borderBottom: 1,
        borderColor: border,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1.5, md: 0 } }}>
        <Box
          sx={{
            width: sidebarMotion.collapsedWidth,
            display: { xs: "none", md: "grid" },
            placeItems: "center",
          }}
        >
          <IconButton
            aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            onClick={onSidebarToggle}
            sx={{
              width: navbarTokens.actionSize,
              height: navbarTokens.actionSize,
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
            {sidebarCollapsed ? (
              <PanelLeftOpen size={iconSizes.control} aria-hidden="true" />
            ) : (
              <PanelLeftClose size={iconSizes.control} aria-hidden="true" />
            )}
          </IconButton>
        </Box>

        <IconButton
          aria-label="Open navigation"
          onClick={onMenuClick}
          sx={{
            display: { xs: "inline-flex", md: "none" },
            width: navbarTokens.actionSize,
            height: navbarTokens.actionSize,
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

        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
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

          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
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
        </Box>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <SearchDialog />
        <UserProfileMenu />
      </Box>
    </Box>
  );
}
