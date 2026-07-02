"use client";

import { MenuItem, type MenuItemProps } from "@mui/material";
import type { ReactNode } from "react";
import { iconSizes, navbarTokens } from "@/app/theme/tokens";
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
  const { primaryText, interaction, semantic } = useDocumentationStyles();
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
        color: isDanger ? semantic.error : primaryText,
        lineHeight: 1,
        "&:hover": {
          color: isDanger ? semantic.error : interaction.hoverContent,
          backgroundColor: interaction.hoverBackground,
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
