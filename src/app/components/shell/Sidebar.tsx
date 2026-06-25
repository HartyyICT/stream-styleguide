"use client";

import {
  Box,
  ButtonBase,
  Divider,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Accessibility,
  Blend,
  Grid3X3,
  MousePointer2,
  Navigation,
  Palette,
  PanelTop,
  PanelLeftClose,
  PanelLeftOpen,
  PackagePlus,
  ScanText,
  Search,
  Smartphone,
  Sparkles,
  SquareMousePointer,
  Type,
} from "lucide-react";
import {
  borderColors,
  borderWidths,
  colors,
  iconSizes,
  interactionStates,
  radius,
} from "../../theme/tokens";
import { useColorMode } from "../../theme/themeProvider";
import { sidebarMotion, sidebarTransition } from "@/app/components/shell/sidebarMotion";

const foundationItems = [
  { label: "Accessibility", icon: Accessibility, href: "/accessibility" },
  { label: "Borders", icon: PanelTop, href: "/borders" },
  { label: "Buttons", icon: SquareMousePointer, href: "/buttons" },
  { label: "Colors", icon: Palette, href: "/colors" },
  { label: "Elevation & Shadows", icon: Blend, href: "/elevation" },
  { label: "Hover States", icon: MousePointer2, href: "/hover-states" },
  { label: "Iconography", icon: Sparkles, href: "/iconography" },
  { label: "Responsiveness", icon: Smartphone, href: "/responsiveness" },
  { label: "Spacing", icon: Grid3X3, href: "/spacing" },
  { label: "Typography", icon: Type, href: "/typography" },
];

const componentItems = [
  { label: "Navbar", icon: Navigation, href: "/navbar" },
  { label: "Searchbar", icon: Search, href: "/searchbar" },
  { label: "Sidebar", icon: PanelLeftOpen, href: "/sidebar" },
];

const gettingStartedItems = [
  { label: "Overview", icon: ScanText, href: "/" },
  { label: "Installation", icon: PackagePlus, href: "/installation" },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();
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
          height: 40,
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
              width: 38,
              height: 38,
              position: "absolute",
              top: 1,
              right: collapsed ? "calc(50% - 19px)" : 12,
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
              <PanelLeftOpen size={iconSizes.control} />
            ) : (
              <PanelLeftClose size={iconSizes.control} />
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

      <Box component="nav" aria-label="Getting started">
        {gettingStartedItems.map(({ label, icon: Icon, href }) => {
          const active = pathname === href;

          return (
            <Tooltip
              key={label}
              title={collapsed ? label : ""}
              placement="right"
            >
              <ButtonBase
                component={Link}
                href={href}
                aria-label={label}
                sx={{
                  ...navigationItemSx,
                  color: active ? accent : secondaryText,
                  backgroundColor: active ? selectedBackground : surface,
                  position: "relative",
                  boxSizing: "border-box",
                  border: `${borderWidths.interactive} solid ${
                    active ? selectedBackground : surface
                  }`,
                  borderRadius: radius.medium,
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
                    backgroundColor: active ? selectedBackground : hoverBackground,
                    color: active ? accent : interaction.hoverContent,
                    borderColor: active ? selectedBackground : interaction.hoverBorder,
                  },
                }}
              >
                <Icon
                  size={iconSizes.control}
                  strokeWidth={1.8}
                  style={{ flexShrink: 0 }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    ...labelSx,
                    fontWeight: active ? 700 : 500,
                  }}
                >
                  {label}
                </Typography>
              </ButtonBase>
            </Tooltip>
          );
        })}
      </Box>

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
              <ButtonBase
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
                <Icon
                  size={iconSizes.control}
                  strokeWidth={1.8}
                  style={{ flexShrink: 0 }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    ...labelSx,
                    fontWeight: active ? 700 : 500,
                  }}
                >
                  {label}
                </Typography>
              </ButtonBase>
            </Tooltip>
          );
        })}
      </Box>

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
        Components
      </Typography>

      <Box component="nav" aria-label="Components">
        {componentItems.map(({ label, icon: Icon, href }) => {
          const active = pathname === href;

          return (
            <Tooltip
              key={label}
              title={collapsed ? label : ""}
              placement="right"
            >
              <ButtonBase
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
                <Icon
                  size={iconSizes.control}
                  strokeWidth={1.8}
                  style={{ flexShrink: 0 }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    ...labelSx,
                    fontWeight: active ? 700 : 500,
                  }}
                >
                  {label}
                </Typography>
              </ButtonBase>
            </Tooltip>
          );
        })}
      </Box>
    </Box>
  );
}
