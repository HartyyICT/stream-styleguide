"use client";

import { MenuItem, type MenuItemProps } from "@mui/material";
import type { ReactNode } from "react";
import {
  colors,
  iconSizes,
  navbarTokens,
} from "@/app/theme/tokens";
import { useDocumentationStyles } from "@/app/hooks/useDocumentationStyles";

type ProfileMenuItemTone = "default" | "danger";

interface ProfileMenuItemProps extends MenuItemProps {
  icon: ReactNode;
  children: ReactNode;
  tone?: ProfileMenuItemTone;
}

export default function ProfileMenuItem({
  icon,
  children,
  tone = "default",
  sx,
  ...props
}: ProfileMenuItemProps) {
  const { isDarkMode, primaryText, interaction } = useDocumentationStyles();
  const isDanger = tone === "danger";

  return (
    <MenuItem
      {...props}
      sx={{
        minHeight: navbarTokens.menuItemMinHeight,
        px: 2,
        gap: 1.25,
        display: "grid",
        gridTemplateColumns: `${iconSizes.control}px minmax(0, 1fr)`,
        alignItems: "center",
        color: isDanger ? colors.semantic.error.main : primaryText,
        lineHeight: 1,
        "&:hover": {
          color: isDanger ? colors.semantic.error.dark : interaction.hoverContent,
          backgroundColor: isDanger
            ? isDarkMode
              ? colors.neutral[700]
              : colors.neutral[100]
            : interaction.hoverBackground,
        },
        "& svg": {
          display: "block",
        },
        ...sx,
      }}
    >
      {icon}
      {children}
    </MenuItem>
  );
}
