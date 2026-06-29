"use client";

import {
  Box,
  ButtonBase,
  Collapse,
  Divider,
  Drawer,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Accessibility,
  Blend,
  ChevronDown,
  ClipboardList,
  Grid3X3,
  ListChecks,
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
  Table2,
  Type,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";
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
import { sidebarMotion, sidebarTransition } from "@/app/components/organisms/sidebarMotion";

type NavigationItem = {
  label: string;
  icon: LucideIcon;
  href: string;
};

const navigationGroups: { label: string; ariaLabel: string; items: NavigationItem[] }[] = [
  {
    label: "Getting started",
    ariaLabel: "Getting started",
    items: [
      { label: "Overview", icon: ScanText, href: "/" },
      { label: "Installation", icon: PackagePlus, href: "/installation" },
    ],
  },
  {
    label: "Foundations",
    ariaLabel: "Design foundations",
    items: [
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
    ],
  },
  {
    label: "Components",
    ariaLabel: "Components",
    items: [
      { label: "Navbar", icon: Navigation, href: "/navbar" },
      { label: "Forms", icon: ClipboardList, href: "/forms" },
      { label: "Searchbar", icon: Search, href: "/searchbar" },
      { label: "Sidebar", icon: PanelLeftOpen, href: "/sidebar" },
      { label: "Tables", icon: Table2, href: "/tables" },
      { label: "Wizards", icon: ListChecks, href: "/wizards" },
    ],
  },
];

function createDefaultOpenGroups() {
  return Object.fromEntries(navigationGroups.map((group) => [group.label, true]));
}

let persistedOpenGroups: Record<string, boolean> | null = null;

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export default function Sidebar({
  collapsed,
  onToggle,
  mobileOpen = false,
  onMobileClose,
}: SidebarProps) {
  const pathname = usePathname();
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() =>
    persistedOpenGroups ?? createDefaultOpenGroups(),
  );
  const { mode } = useColorMode();
  const isDarkMode = mode === "dark";
  const surface = isDarkMode ? colors.neutral[800] : colors.semantic.surface;
  const pageBackground = isDarkMode ? colors.neutral[900] : colors.semantic.background;
  const borders = isDarkMode ? borderColors.dark : borderColors.light;
  const interaction = isDarkMode ? interactionStates.dark : interactionStates.light;
  const border = borders.subtle;
  const secondaryText = isDarkMode ? colors.neutral[300] : colors.neutral[600];
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
    height: 38,
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

  function toggleGroup(label: string) {
    setOpenGroups((current) => {
      const next = {
        ...current,
        [label]: !(current[label] ?? true),
      };

      persistedOpenGroups = next;
      return next;
    });
  }

  function renderNavigationContent(isMobile = false) {
    const showLabels = isMobile || !collapsed;
    const effectiveLabelSx = isMobile
      ? {
          minWidth: 0,
          width: "100%",
          opacity: 1,
          overflow: "hidden",
          whiteSpace: "nowrap",
        }
      : labelSx;

    const effectiveItemSx = isMobile
      ? {
          display: "grid",
          gridTemplateColumns: "18px minmax(0, 1fr)",
          alignItems: "center",
          height: 38,
          columnGap: 1.25,
          px: 1.5,
          py: 1,
          mb: 0.5,
        }
      : navigationItemSx;

    return (
      <>
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
              ...effectiveLabelSx,
              color: secondaryText,
              fontWeight: 700,
              letterSpacing: "0.08em",
            }}
          >
            Navigation
          </Typography>

          {!isMobile && (
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
          )}
        </Box>

        {navigationGroups.map((group, groupIndex) => (
          <Box key={group.label}>
            {groupIndex > 0 && <Divider sx={{ my: 2.5 }} />}
            {(() => {
              const groupOpen = openGroups[group.label] ?? true;

              return showLabels ? (
                <ButtonBase
                  component="button"
                  type="button"
                  aria-expanded={groupOpen}
                  aria-controls={`sidebar-group-${group.label
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  onClick={() => toggleGroup(group.label)}
                  sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 1,
                    px: 1.5,
                    mb: 1,
                    color: secondaryText,
                    overflow: "hidden",
                    borderRadius: radius.medium,
                    cursor: "pointer",
                    textAlign: "left",
                    transition:
                      "color 160ms ease, background-color 160ms ease",
                    "&:hover": {
                      color: interaction.hoverContent,
                      backgroundColor: hoverBackground,
                    },
                  }}
                >
                  <Typography
                    variant="overline"
                    sx={{
                      ...effectiveLabelSx,
                      textAlign: "left",
                      color: "inherit",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                    }}
                  >
                    {group.label}
                  </Typography>
                  <ChevronDown
                    size={iconSizes.small}
                    aria-hidden="true"
                    style={{
                      flexShrink: 0,
                      transform: groupOpen ? "rotate(0deg)" : "rotate(-90deg)",
                      transition: `transform ${sidebarTransition}`,
                    }}
                  />
                </ButtonBase>
              ) : (
                <Tooltip
                  title={`${groupOpen ? "Collapse" : "Expand"} ${group.label}`}
                  placement="right"
                >
                  <ButtonBase
                    component="button"
                    type="button"
                    aria-label={`${groupOpen ? "Collapse" : "Expand"} ${group.label}`}
                    aria-expanded={groupOpen}
                    aria-controls={`sidebar-group-${group.label
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                    onClick={() => toggleGroup(group.label)}
                    sx={{
                      width: "100%",
                      height: 34,
                      mb: 1,
                      display: "grid",
                      placeItems: "center",
                      color: secondaryText,
                      borderRadius: radius.medium,
                      cursor: "pointer",
                      transition:
                        "color 160ms ease, background-color 160ms ease",
                      "&:hover": {
                        color: interaction.hoverContent,
                        backgroundColor: hoverBackground,
                      },
                    }}
                  >
                    <ChevronDown
                      size={iconSizes.small}
                      aria-hidden="true"
                      style={{
                        transform: groupOpen ? "rotate(0deg)" : "rotate(-90deg)",
                        transition: `transform ${sidebarTransition}`,
                      }}
                    />
                  </ButtonBase>
                </Tooltip>
              );
            })()}

            <Collapse
              id={`sidebar-group-${group.label.toLowerCase().replace(/\s+/g, "-")}`}
              in={openGroups[group.label] ?? true}
              timeout={220}
              unmountOnExit={false}
            >
              <Box component="nav" aria-label={group.ariaLabel}>
                {group.items.map(({ label, icon: Icon, href }) => {
                  const active = pathname === href;

                  return (
                    <Tooltip
                      key={label}
                      title={!isMobile && collapsed ? label : ""}
                      placement="right"
                    >
                      <ButtonBase
                        component={Link}
                        href={href}
                        aria-label={label}
                        aria-current={active ? "page" : undefined}
                        onClick={isMobile ? onMobileClose : undefined}
                        sx={{
                          ...effectiveItemSx,
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
                            borderColor: active
                              ? selectedBackground
                              : interaction.hoverBorder,
                          },
                        }}
                      >
                        <Icon
                          size={iconSizes.control}
                          strokeWidth={1.8}
                          style={{ flexShrink: 0, display: "block" }}
                          aria-hidden="true"
                        />
                        {showLabels && (
                          <Typography
                            variant="body2"
                            sx={{
                              ...effectiveLabelSx,
                              fontWeight: active ? 700 : 500,
                            }}
                          >
                            {label}
                          </Typography>
                        )}
                      </ButtonBase>
                    </Tooltip>
                  );
                })}
              </Box>
            </Collapse>
          </Box>
        ))}
      </>
    );
  }

  return (
    <>
      <Box
        component="aside"
        sx={{
          width: collapsed
            ? sidebarMotion.collapsedWidth
            : sidebarMotion.expandedWidth,
          height: `calc(100vh - ${responsiveLayout.navbarHeight})`,
          position: "fixed",
          top: responsiveLayout.navbarHeight,
          left: 0,
          overflowY: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          borderRight: 1,
          borderColor: border,
          backgroundColor: surface,
          px: collapsed ? 1.25 : 2,
          py: 3,
          display: { xs: "none", md: "block" },
          overflowX: "hidden",
          transition: `width ${sidebarTransition}, padding ${sidebarTransition}`,
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {renderNavigationContent(false)}
      </Box>

      <Drawer
        open={mobileOpen}
        onClose={onMobileClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: sidebarMotion.expandedWidth,
            maxWidth: "calc(100vw - 48px)",
            boxSizing: "border-box",
            borderRight: `${borderWidths.subtle} solid ${border}`,
            backgroundColor: surface,
            color: secondaryText,
            px: 2,
            py: 3,
          },
          "& .MuiBackdrop-root": {
            backgroundColor: `${pageBackground}B3`,
          },
        }}
      >
        {renderNavigationContent(true)}
      </Drawer>
    </>
  );
}
