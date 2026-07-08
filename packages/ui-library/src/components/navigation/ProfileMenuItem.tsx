"use client";

import { MenuItem, type MenuItemProps } from "@mui/material";
import type { ReactNode } from "react";
import { iconSizes, navbarTokens } from "@ssw/ui-library";
import { useSemanticColors } from "@ssw/ui-library";

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
  const { primaryText, interaction, semantic } = useSemanticColors();
  const isDanger = tone === "danger";

  return (
    <MenuItem
      {...props}
      sx={{
        minHeight: navbarTokens.menuItemMinHeight,
        px: navbarTokens.menuItemPaddingX,
        gap: 1.25,
        display: "grid",
        gridTemplateColumns: `${iconSizes.control}px minmax(0, 1fr)`,
        alignItems: "center",
        color: isDanger ? semantic.error : primaryText,
        fontSize: "0.875rem",
        fontWeight: 500,
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
