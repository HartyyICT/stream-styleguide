"use client";

import Link from "next/link";
import { ButtonBase, Tooltip, Typography } from "@mui/material";
import type { LucideIcon } from "lucide-react";
import {
  borderWidths,
  colors,
  iconSizes,
  interactionStates,
  radius,
} from "../../theme/tokens";
import { useColorMode } from "../../theme/themeProvider";
import { sidebarMotion, sidebarTransition } from "@/app/components/organisms/sidebarMotion";

type SidebarNavItemProps = {
  label: string;
  href?: string;
  icon: LucideIcon;
  active?: boolean;
  collapsed?: boolean;
  state?: "default" | "hover";
};

export default function SidebarNavItem({
  label,
  href,
  icon: Icon,
  active = false,
  collapsed = false,
  state = "default",
}: SidebarNavItemProps) {
  const { mode } = useColorMode();
  const isDarkMode = mode === "dark";
  const surface = isDarkMode ? colors.neutral[800] : colors.semantic.surface;
  const interaction = isDarkMode
    ? interactionStates.dark
    : interactionStates.light;
  const secondaryText = isDarkMode
    ? colors.neutral[300]
    : colors.neutral[600];
  const accent = interaction.activeIndicator;
  const selectedBackground = interaction.activeBackground;
  const hoverBackground = interaction.hoverBackground;
  const hover = state === "hover";
  const labelSx = {
    minWidth: 0,
    width: collapsed ? 0 : "100%",
    opacity: collapsed ? 0 : 1,
    overflow: "hidden",
    whiteSpace: "nowrap",
    pointerEvents: collapsed ? "none" : "auto",
    transition: `width ${sidebarTransition}, opacity ${sidebarTransition}`,
  } as const;
  const componentProps = href
    ? { component: Link, href }
    : { component: "button" as const, type: "button" as const };

  return (
    <Tooltip title={collapsed ? label : ""} placement="right">
      <ButtonBase
        {...componentProps}
        aria-label={label}
        aria-current={active ? "page" : undefined}
        sx={{
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
          position: "relative",
          boxSizing: "border-box",
          overflow: "hidden",
          color: active ? accent : hover ? interaction.hoverContent : secondaryText,
          backgroundColor: active
            ? selectedBackground
            : hover
              ? hoverBackground
              : surface,
          border: `${borderWidths.interactive} solid ${
            active ? selectedBackground : hover ? interaction.hoverBorder : surface
          }`,
          borderRadius: radius.medium,
          cursor: "pointer",
          transition: [
            `column-gap ${sidebarTransition}`,
            `padding ${sidebarTransition}`,
            "background-color 160ms ease",
            "color 160ms ease",
            "border-color 160ms ease",
          ].join(", "),
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
        <Icon
          size={iconSizes.control}
          strokeWidth={1.8}
          style={{ flexShrink: 0, display: "block" }}
        />
        <Typography
          variant="body2"
          sx={{
            ...labelSx,
            fontWeight: active ? 700 : 500,
            textAlign: "left",
          }}
        >
          {label}
        </Typography>
      </ButtonBase>
    </Tooltip>
  );
}
