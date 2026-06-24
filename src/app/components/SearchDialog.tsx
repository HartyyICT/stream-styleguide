"use client";

import dynamic from "next/dynamic";
import { ButtonBase, Typography } from "@mui/material";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import {
  borderColors,
  colors,
  interactionStates,
  radius,
  shadows,
} from "../theme/tokens";
import { useColorMode } from "../theme/themeProvider";

const SearchModal = dynamic(() => import("./SearchModal"), {
  ssr: false,
});

export default function SearchDialog() {
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
          width: { xs: 40, sm: 280 },
          height: 40,
          display: "flex",
          alignItems: "center",
          gap: 1,
          px: { xs: 1, sm: 1.5 },
          color: secondaryText,
          backgroundColor: surface,
          border: 1,
          borderColor: borders.subtle,
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
        }}
      >
        <Search size={18} aria-hidden="true" />

        <Typography
          variant="body2"
          sx={{
            display: { xs: "none", sm: "block" },
            flex: 1,
            color: "inherit",
          }}
        >
          Search documentation...
        </Typography>

        <Typography
          variant="caption"
          sx={{
            display: { xs: "none", sm: "block" },
            px: 0.75,
            py: 0.25,
            color: "inherit",
            border: 1,
            borderColor: borders.subtle,
            borderRadius: radius.small,
          }}
        >
          Ctrl K
        </Typography>
      </ButtonBase>

      {open && <SearchModal open={open} onClose={() => setOpen(false)} />}
    </>
  );
}
