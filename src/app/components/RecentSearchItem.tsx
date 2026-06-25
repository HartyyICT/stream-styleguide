"use client";

import Link from "next/link";
import { Box, ButtonBase, IconButton, Typography } from "@mui/material";
import { Clock, X } from "lucide-react";
import {
  borderColors,
  colors,
  interactionStates,
  radius,
} from "@/app/theme/tokens";
import { useColorMode } from "@/app/theme/themeProvider";

type RecentSearchItemProps = {
  href?: string;
  label: string;
  onSelect?: () => void;
  onRemove?: () => void;
};

export default function RecentSearchItem({
  href = "#",
  label,
  onSelect,
  onRemove,
}: RecentSearchItemProps) {
  const { mode } = useColorMode();
  const isDarkMode = mode === "dark";
  const surface = isDarkMode ? colors.neutral[800] : colors.semantic.surface;
  const borders = isDarkMode ? borderColors.dark : borderColors.light;
  const interaction = isDarkMode
    ? interactionStates.dark
    : interactionStates.light;
  const secondaryText = isDarkMode
    ? colors.neutral[300]
    : colors.neutral[600];
  const accent = interaction.activeIndicator;

  return (
    <Box
      sx={{
        minHeight: 48,
        display: "flex",
        alignItems: "center",
        gap: 1,
        pl: 2,
        pr: 0.75,
        py: 0.75,
        backgroundColor: surface,
        border: 1,
        borderColor: borders.subtle,
        borderRadius: radius.medium,
        cursor: "pointer",
        transition: "border-color 160ms ease, background-color 160ms ease",
        "&:hover": {
          borderColor: interaction.hoverBorder,
          backgroundColor: interaction.hoverBackground,
        },
      }}
    >
      <ButtonBase
        component={Link}
        href={href}
        onClick={onSelect}
        sx={{
          minWidth: 0,
          flex: 1,
          display: "flex",
          alignItems: "center",
          gap: 1.25,
          py: 0.5,
          color: accent,
          textDecoration: "none",
          cursor: "pointer",
          justifyContent: "flex-start",
          "& .MuiTouchRipple-child": {
            backgroundColor: interaction.activeIndicator,
          },
          "& .MuiTouchRipple-rippleVisible": {
            opacity: 0.18,
          },
        }}
      >
        <Clock size={16} aria-hidden="true" />
        <Typography
          variant="body2"
          sx={{
            color: "inherit",
            fontWeight: 600,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </Typography>
      </ButtonBase>

      <IconButton
        size="small"
        aria-label={`Remove ${label} from recent searches`}
        onClick={onRemove}
        sx={{
          width: 30,
          height: 30,
          flexShrink: 0,
          color: secondaryText,
          border: 1,
          borderColor: borders.subtle,
          borderRadius: radius.small,
          backgroundColor: surface,
          cursor: "pointer",
          transition:
            "color 160ms ease, border-color 160ms ease, background-color 160ms ease",
          "&:hover": {
            color: interaction.hoverContent,
            borderColor: interaction.hoverBorder,
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
        <X size={15} aria-hidden="true" />
      </IconButton>
    </Box>
  );
}
