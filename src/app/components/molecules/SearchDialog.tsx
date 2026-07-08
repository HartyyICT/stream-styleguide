"use client";

import dynamic from "next/dynamic";
import { ButtonBase, Typography } from "@mui/material";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import {
  borderColors,
  borderWidths,
  colors,
  iconSizes,
  interactionStates,
  navbarTokens,
  radius,
  shadows,
} from "@ssw/ui-library";
import { useColorMode } from "../../theme/themeProvider";

const SearchModal = dynamic(() => import("@/app/components/organisms/SearchModal"), {
  ssr: false,
});

interface SearchDialogProps {
  width?: string;
}

export default function SearchDialog({ width = navbarTokens.searchWidth }: SearchDialogProps) {
  const { mode } = useColorMode();
  const [open, setOpen] = useState(false);
  const isDarkMode = mode === "dark";
  const surface = isDarkMode ? colors.neutral[800] : colors.semantic.surface;
  const borders = isDarkMode ? borderColors.dark : borderColors.light;
  const interaction = isDarkMode
    ? interactionStates.dark
    : interactionStates.light;
  const secondaryText = isDarkMode
    ? colors.neutral[300]
    : colors.neutral[600];

  useEffect(() => {
    function handleShortcut(event: KeyboardEvent) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(true);
      }
    }

    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  return (
    <>
      <ButtonBase
        component="button"
        type="button"
        aria-label="Search documentation"
        onClick={() => setOpen(true)}
        sx={{
          width: { xs: navbarTokens.actionSize, sm: width },
          height: navbarTokens.actionSize,
          display: "flex",
          alignItems: "center",
          gap: navbarTokens.actionGap,
          px: { xs: 0, sm: navbarTokens.actionGap },
          color: secondaryText,
          backgroundColor: surface,
          border: `${borderWidths.subtle} solid ${borders.subtle}`,
          borderRadius: radius.medium,
          cursor: "pointer",
          boxShadow: shadows.level1,
          font: "inherit",
          textAlign: "left",
          transition:
            "border-color 160ms ease, box-shadow 160ms ease, background-color 160ms ease",
          "&:hover": {
            color: interaction.hoverContent,
            borderColor: interaction.hoverBorder,
            backgroundColor: interaction.hoverBackground,
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
        <Search size={iconSizes.control} aria-hidden="true" />

        <Typography
          variant="body2"
          sx={{
            display: { xs: "none", sm: "block" },
            flex: 1,
            minWidth: 0,
            maxWidth: navbarTokens.searchTextMaxWidth,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            color: "inherit",
          }}
        >
          Search documentation...
        </Typography>

        <Typography
          variant="caption"
          sx={{
            display: { xs: "none", sm: "block" },
            ml: "auto",
            px: navbarTokens.shortcutPaddingX,
            py: navbarTokens.shortcutPaddingY,
            color: "inherit",
            border: `${borderWidths.subtle} solid ${borders.subtle}`,
            borderRadius: radius.small,
            whiteSpace: "nowrap",
          }}
        >
          Ctrl K
        </Typography>
      </ButtonBase>

      {open && <SearchModal open={open} onClose={() => setOpen(false)} />}
    </>
  );
}
