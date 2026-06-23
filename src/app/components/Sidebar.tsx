"use client";

import { Box, Divider, IconButton, Tooltip, Typography } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Accessibility,
  Blend,
  Circle,
  Grid3X3,
  Palette,
  PanelLeftClose,
  PanelLeftOpen,
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

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
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
  const sidebarWidth = collapsed ? 88 : 280;
  const labelSx = {
    maxWidth: collapsed ? 0 : 180,
    opacity: collapsed ? 0 : 1,
    overflow: "hidden",
    whiteSpace: "nowrap",
    transition: "max-width 220ms ease, opacity 140ms ease",
  } as const;

  return (
    <Box
      component="aside"
      sx={{
        width: sidebarWidth,
        height: "calc(100vh - 64px)",
        position: "fixed",
        top: 64,
        left: 0,
        overflowY: "auto",
        borderRight: 1,
        borderColor: border,
        backgroundColor: surface,
        px: collapsed ? 1.25 : 2,
        py: 3,
        display: { xs: "none", md: "block" },
        overflowX: "hidden",
        transition: "width 240ms ease, padding 240ms ease",
      }}
    >
      <Box
        sx={{
          height: 34,
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "space-between",
          px: collapsed ? 0 : 1.5,
          mb: 1,
        }}
      >
        <Typography
          variant="overline"
          sx={{
            ...labelSx,
            color: secondaryText,
            fontWeight: 700,
            letterSpacing: "0.08em",
          }}
        >
          Navigation
        </Typography>
        <Tooltip title={collapsed ? "Expand sidebar" : "Collapse sidebar"}>
          <IconButton
            size="small"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            onClick={onToggle}
            sx={{
              width: 32,
              height: 32,
              flexShrink: 0,
              color: secondaryText,
              borderColor: border,
              backgroundColor: surface,
              "&:hover": {
                color: accent,
                backgroundColor: hoverBackground,
              },
            }}
          >
            {collapsed ? (
              <PanelLeftOpen size={17} />
            ) : (
              <PanelLeftClose size={17} />
            )}
          </IconButton>
        </Tooltip>
      </Box>

      <Typography
        variant="overline"
        sx={{
          ...labelSx,
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

      <Tooltip title={collapsed ? "Overview" : ""} placement="right">
        <Box
          component={Link}
          href="/"
          aria-label="Overview"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: collapsed ? "center" : "flex-start",
            gap: collapsed ? 0 : 1.25,
            px: collapsed ? 1 : 1.5,
            py: 1,
            mb: 0.5,
            color: overviewActive ? accent : secondaryText,
            backgroundColor: overviewActive ? selectedBackground : surface,
            borderLeft: 3,
            borderColor: overviewActive ? accent : border,
            borderRadius: radius.medium,
            transition:
              "gap 240ms ease, padding 240ms ease, background-color 160ms ease, color 160ms ease",
            "&:hover": {
              backgroundColor: hoverBackground,
              color: accent,
            },
          }}
        >
          <ScanText size={18} style={{ flexShrink: 0 }} />
          <Typography
            variant="body2"
            sx={{
              ...labelSx,
              fontWeight: overviewActive ? 700 : 500,
            }}
          >
            Overview
          </Typography>
        </Box>
      </Tooltip>

      <Divider sx={{ my: 2.5 }} />

      <Typography
        variant="overline"
        sx={{
          ...labelSx,
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
            <Tooltip
              key={label}
              title={collapsed ? label : ""}
              placement="right"
            >
              <Box
                component={Link}
                href={href}
                aria-label={label}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: collapsed ? "center" : "flex-start",
                  gap: collapsed ? 0 : 1.25,
                  px: collapsed ? 1 : 1.5,
                  py: 1,
                  mb: 0.5,
                  borderRadius: radius.medium,
                  color: active ? accent : secondaryText,
                  backgroundColor: active ? selectedBackground : surface,
                  borderLeft: 3,
                  borderColor: active ? accent : border,
                  transition:
                    "gap 240ms ease, padding 240ms ease, background-color 160ms ease, color 160ms ease",
                  "&:hover": {
                    backgroundColor: hoverBackground,
                    color: accent,
                  },
                }}
              >
                <Icon size={18} strokeWidth={1.8} style={{ flexShrink: 0 }} />
                <Typography
                  variant="body2"
                  sx={{
                    ...labelSx,
                    fontWeight: active ? 700 : 500,
                  }}
                >
                  {label}
                </Typography>
              </Box>
            </Tooltip>
          );
        })}
      </Box>
    </Box>
  );
}
