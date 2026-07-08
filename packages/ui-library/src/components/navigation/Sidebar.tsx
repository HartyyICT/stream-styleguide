"use client";

import {
  Box,
  ButtonBase,
  Collapse,
  Divider,
  Drawer,
  Tooltip,
  Typography,
} from "@mui/material";
import { ChevronDown, type LucideIcon } from "lucide-react";
import { useState, type ElementType } from "react";
import {
  borderWidths,
  iconSizes,
  pageLayoutTokens,
  radius,
} from "../../theme/tokens";
import { useSemanticColors } from "../../theme/useSemanticColors";
import { sidebarMotion, sidebarTransition } from "./sidebarMotion";

export type SidebarNavigationItem = {
  label: string;
  icon: LucideIcon;
  href: string;
};

export type SidebarNavigationGroup = {
  label: string;
  ariaLabel: string;
  items: SidebarNavigationItem[];
};

function createDefaultOpenGroups(groups: SidebarNavigationGroup[]) {
  return Object.fromEntries(groups.map((group) => [group.label, true]));
}

let persistedOpenGroups: Record<string, boolean> | null = null;

interface SidebarProps {
  groups: SidebarNavigationGroup[];
  activeHref: string;
  collapsed: boolean;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
  linkComponent?: ElementType;
}

export default function Sidebar({
  groups,
  activeHref,
  collapsed,
  mobileOpen = false,
  onMobileClose,
  linkComponent = "a",
}: SidebarProps) {
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() =>
    persistedOpenGroups ?? createDefaultOpenGroups(groups),
  );
  const {
    borders,
    surface,
    pageBackground,
    interaction,
    secondaryText,
    accent,
    selectedBackground,
  } = useSemanticColors();
  const border = borders.subtle;
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
    width: "100%",
    height: sidebarMotion.navItem.height,
    display: "grid",
    gridTemplateColumns: `${sidebarMotion.navItem.iconColumnWidth}px minmax(0, 1fr)`,
    alignItems: "center",
    columnGap: collapsed ? 0 : sidebarMotion.navItem.expandedColumnGap,
    pl: collapsed
      ? sidebarMotion.navItem.collapsedPaddingLeft
      : sidebarMotion.navItem.expandedPaddingLeft,
    pr: collapsed
      ? sidebarMotion.navItem.collapsedPaddingRight
      : sidebarMotion.navItem.expandedPaddingRight,
    py: sidebarMotion.navItem.paddingY,
    mb: sidebarMotion.navItem.marginBottom,
    overflow: "hidden",
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
        {groups.map((group, groupIndex) => (
          <Box key={group.label}>
            {groupIndex > 0 && <Divider sx={{ my: 2.5 }} />}
            {(() => {
              const groupOpen = openGroups[group.label] ?? true;

              return (
                <Tooltip title={!showLabels ? group.label : ""} placement="right">
                <ButtonBase
                  component="button"
                  type="button"
                  aria-label={showLabels ? undefined : `${groupOpen ? "Collapse" : "Expand"} ${group.label}`}
                  aria-expanded={groupOpen}
                  aria-controls={`sidebar-group-${group.label
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  onClick={() => toggleGroup(group.label)}
                  sx={{
                    width: "100%",
                    height: 34,
                    display: "grid",
                    gridTemplateColumns: `${sidebarMotion.navItem.iconColumnWidth}px minmax(0, 1fr) 16px`,
                    alignItems: "center",
                    columnGap: collapsed ? 0 : sidebarMotion.navItem.expandedColumnGap,
                    pl: collapsed
                      ? sidebarMotion.navItem.collapsedPaddingLeft
                      : sidebarMotion.navItem.expandedPaddingLeft,
                    pr: collapsed
                      ? sidebarMotion.navItem.collapsedPaddingRight
                      : sidebarMotion.navItem.expandedPaddingRight,
                    mb: 1,
                    color: secondaryText,
                    position: "relative",
                    boxSizing: "border-box",
                    overflow: "hidden",
                    borderRadius: radius.medium,
                    cursor: "pointer",
                    textAlign: "left",
                    transition: [
                      `column-gap ${sidebarTransition}`,
                      `grid-template-columns ${sidebarTransition}`,
                      `padding ${sidebarTransition}`,
                      "color 160ms ease",
                      "background-color 160ms ease",
                    ].join(", "),
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
                      gridColumn: "1 / 3",
                      gridRow: "1",
                      textAlign: "left",
                      color: "inherit",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                    }}
                  >
                    {group.label}
                  </Typography>
                  <Box
                    component="span"
                    sx={{
                      width: 16,
                      height: 16,
                      display: "grid",
                      placeItems: "center",
                      position: "absolute",
                      top: "50%",
                      left: collapsed ? "50%" : "auto",
                      right: collapsed ? "auto" : sidebarMotion.navItem.expandedPaddingRight,
                      transform: collapsed ? "translate(-50%, -50%)" : "translateY(-50%)",
                      transition: [
                        `left ${sidebarTransition}`,
                        `right ${sidebarTransition}`,
                        `transform ${sidebarTransition}`,
                      ].join(", "),
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
                  </Box>
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
                  const active = href === activeHref;

                  return (
                    <Tooltip
                      key={label}
                      title={!isMobile && collapsed ? label : ""}
                      placement="right"
                    >
                      <ButtonBase
                        component={linkComponent}
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
                        <Typography
                          variant="body2"
                          sx={{
                            ...effectiveLabelSx,
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
          height: `calc(100vh - ${pageLayoutTokens.navbarHeight})`,
          position: "fixed",
          top: pageLayoutTokens.navbarHeight,
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
