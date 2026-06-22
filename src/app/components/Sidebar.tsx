"use client";

import { Box, Divider, Typography } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Accessibility,
  Blend,
  Circle,
  Grid3X3,
  Palette,
  ScanText,
  Smartphone,
  Sparkles,
  Type,
} from "lucide-react";
import { colors, radius } from "../theme/tokens";
import { useColorMode } from "../theme/themeProvider";

const foundationItems = [
  { label: "Colors", icon: Palette, href: "/colors" },
  { label: "Typography", icon: Type, href: "/typography" },
  { label: "Spacing", icon: Grid3X3, href: "/spacing" },
  { label: "Border Radius", icon: Circle, href: "/border-radius" },
  { label: "Elevation & Shadows", icon: Blend, href: "/elevation" },
  { label: "Iconography", icon: Sparkles, href: "/iconography" },
  { label: "Accessibility", icon: Accessibility, href: "/accessibility" },
  { label: "Responsiveness", icon: Smartphone, href: "/responsiveness" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const overviewActive = pathname === "/";
  const { mode } = useColorMode();
  const isDarkMode = mode === "dark";
  const surface = isDarkMode
    ? colors.neutral[800]
    : colors.semantic.surface;
  const border = isDarkMode ? colors.neutral[700] : colors.neutral[200];
  const secondaryText = isDarkMode
    ? colors.neutral[300]
    : colors.neutral[600];
  const accent = isDarkMode ? colors.primary[300] : colors.primary[500];
  const selectedBackground = isDarkMode
    ? colors.neutral[700]
    : colors.primary[50];
  const hoverBackground = isDarkMode
    ? colors.neutral[700]
    : colors.neutral[100];

  return (
    <Box
      component="aside"
      sx={{
        width: 280,
        height: "calc(100vh - 64px)",
        position: "fixed",
        top: 64,
        left: 0,
        overflowY: "auto",
        borderRight: 1,
        borderColor: border,
        backgroundColor: surface,
        px: 2,
        py: 3,
        display: { xs: "none", md: "block" },
      }}
    >
      <Typography
        variant="overline"
        sx={{
          display: "block",
          px: 1.5,
          mb: 1,
          color: secondaryText,
          fontWeight: 700,
          letterSpacing: "0.08em",
        }}
      >
        Getting started
      </Typography>

      <Box
        component={Link}
        href="/"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.25,
          px: 1.5,
          py: 1,
          mb: 0.5,
          color: overviewActive ? accent : secondaryText,
          backgroundColor: overviewActive ? selectedBackground : surface,
          borderLeft: 3,
          borderColor: overviewActive ? accent : border,
          borderRadius: radius.medium,
          "&:hover": {
            backgroundColor: hoverBackground,
            color: accent,
          },
        }}
      >
        <ScanText size={18} />
        <Typography
          variant="body2"
          sx={{ fontWeight: overviewActive ? 700 : 500 }}
        >
          Overview
        </Typography>
      </Box>

      <Divider sx={{ my: 2.5 }} />

      <Typography
        variant="overline"
        sx={{
          display: "block",
          px: 1.5,
          mb: 1,
          color: secondaryText,
          fontWeight: 700,
          letterSpacing: "0.08em",
        }}
      >
        Foundations
      </Typography>

      <Box component="nav" aria-label="Design foundations">
        {foundationItems.map(({ label, icon: Icon, href }) => {
          const active = pathname === href;

          return (
          <Box
            component={Link}
            href={href}
            key={label}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.25,
              px: 1.5,
              py: 1,
              mb: 0.5,
              borderRadius: radius.medium,
              color: active ? accent : secondaryText,
              backgroundColor: active ? selectedBackground : surface,
              borderLeft: 3,
              borderColor: active ? accent : border,
              "&:hover": {
                backgroundColor: hoverBackground,
                color: accent,
              },
            }}
          >
            <Icon size={18} strokeWidth={1.8} />
            <Typography variant="body2" sx={{ fontWeight: active ? 700 : 500 }}>
              {label}
            </Typography>
          </Box>
          );
        })}
      </Box>
    </Box>
  );
}
