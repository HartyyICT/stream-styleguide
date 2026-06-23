"use client";

import { Box, Divider, IconButton, Tooltip, Typography } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Accessibility,
  Blend,
  Grid3X3,
  MousePointer2,
  Palette,
  PanelTop,
  PanelLeftClose,
  PanelLeftOpen,
  ScanText,
  Smartphone,
  Sparkles,
  Type,
} from "lucide-react";
import {
  borderColors,
  borderWidths,
  colors,
  interactionStates,
  radius,
} from "../theme/tokens";
import { useColorMode } from "../theme/themeProvider";
import { sidebarMotion, sidebarTransition } from "./sidebarMotion";

const foundationItems = [
  { label: "Colors", icon: Palette, href: "/colors" },
  { label: "Typography", icon: Type, href: "/typography" },
  { label: "Spacing", icon: Grid3X3, href: "/spacing" },
  { label: "Hover States", icon: MousePointer2, href: "/hover-states" },
  { label: "Borders", icon: PanelTop, href: "/borders" },
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
  const borders = isDarkMode ? borderColors.dark : borderColors.light;
  const interaction = isDarkMode
    ? interactionStates.dark
    : interactionStates.light;
  const border = borders.subtle;
  const secondaryText = isDarkMode
    ? colors.neutral[300]
    : colors.neutral[600];
  const accent = interaction.activeIndicator;
  const selectedBackground = interaction.activeBackground;
  const hoverBackground = interaction.hoverBackground;
  const labelSx = {
    minWidth: 0,
    width: collapsed ? 0 : "100%",
    opacity: collapsed ? 0 : 1,
    overflow: "hidden",
    whiteSpace: "nowrap",
    pointerEvents: collapsed ? "none" : "auto",
    transition: `width ${sidebarTransition}, opacity ${sidebarTransition}`,
  } as const;
  const navigationItemSx = {
    display: "grid",
    gridTemplateColumns: "18px minmax(0, 1fr)",
    alignItems: "center",
    columnGap: collapsed ? 0 : 1.25,
    pl: collapsed ? 3 : 1.5,
    pr: collapsed ? 1 : 1.5,
    py: 1,
    mb: 0.5,
    transition: [
      `column-gap ${sidebarTransition}`,
      `padding ${sidebarTransition}`,
      "background-color 160ms ease",
      "color 160ms ease",
      "border-color 160ms ease",
    ].join(", "),
  } as const;

  return (
    <Box
      component="aside"
      sx={{
        width: collapsed
          ? sidebarMotion.collapsedWidth
          : sidebarMotion.expandedWidth,
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
        transition: `width ${sidebarTransition}, padding ${sidebarTransition}`,
      }}
    >
      <Box
        sx={{
          height: 34,
          position: "relative",
          display: "block",
          alignItems: "center",
          px: 1.5,
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
        <Tooltip
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          placement="right"
        >
          <IconButton
            size="small"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            onClick={onToggle}
            sx={{
              width: 32,
              height: 32,
              position: "absolute",
              top: 1,
              right: collapsed ? "calc(50% - 16px)" : 12,
              flexShrink: 0,
              color: secondaryText,
              boxSizing: "border-box",
              border: `${borderWidths.subtle} solid ${border}`,
              backgroundColor: surface,
              transition:
                `right ${sidebarTransition}, background-color 160ms ease, color 160ms ease, border-color 160ms ease`,
              "&:hover": {
                color: interaction.hoverContent,
                border: `${borderWidths.interactive} solid ${interaction.hoverBorder}`,
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
            ...navigationItemSx,
            color: overviewActive ? accent : secondaryText,
            backgroundColor: overviewActive ? selectedBackground : surface,
            position: "relative",
            boxSizing: "border-box",
            border: `${borderWidths.interactive} solid ${
              overviewActive ? selectedBackground : surface
            }`,
            borderRadius: radius.medium,
            "&::before": {
              content: '""',
              position: "absolute",
              inset: "0 auto 0 0",
              width: borderWidths.active,
              borderRadius: `${radius.medium} 0 0 ${radius.medium}`,
              backgroundColor: overviewActive ? accent : "transparent",
              transition: `background-color ${sidebarTransition}`,
            },
            "&:hover": {
              backgroundColor: overviewActive
                ? selectedBackground
                : hoverBackground,
              color: overviewActive ? accent : interaction.hoverContent,
              borderColor: overviewActive
                ? selectedBackground
                : interaction.hoverBorder,
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
                  ...navigationItemSx,
                  position: "relative",
                  borderRadius: radius.medium,
                  color: active ? accent : secondaryText,
                  backgroundColor: active ? selectedBackground : surface,
                  boxSizing: "border-box",
                  border: `${borderWidths.interactive} solid ${
                    active ? selectedBackground : surface
                  }`,
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    inset: "0 auto 0 0",
                    width: borderWidths.active,
                    borderRadius: `${radius.medium} 0 0 ${radius.medium}`,
                    backgroundColor: active ? accent : "transparent",
                    transition: `background-color ${sidebarTransition}`,
                  },
                  "&:hover": {
                    backgroundColor: active
                      ? selectedBackground
                      : hoverBackground,
                    color: active ? accent : interaction.hoverContent,
                    borderColor: active
                      ? selectedBackground
                      : interaction.hoverBorder,
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
