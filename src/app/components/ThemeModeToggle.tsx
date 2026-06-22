"use client";

import { IconButton, Tooltip } from "@mui/material";
import { Moon, Sun } from "lucide-react";
import { useColorMode } from "../theme/themeProvider";
import { colors, radius } from "../theme/tokens";

export default function ThemeModeToggle() {
  const { mode, toggleColorMode } = useColorMode();
  const isDarkMode = mode === "dark";
  const label = isDarkMode ? "Switch to light mode" : "Switch to dark mode";

  return (
    <Tooltip title={label}>
      <IconButton
        aria-label={label}
        onClick={toggleColorMode}
        size="small"
        sx={{
          width: 38,
          height: 38,
          flexShrink: 0,
          color: isDarkMode ? colors.neutral[300] : colors.neutral[600],
          backgroundColor: isDarkMode
            ? colors.neutral[800]
            : colors.semantic.surface,
          border: 1,
          borderColor: isDarkMode
            ? colors.neutral[700]
            : colors.neutral[200],
          borderRadius: radius.medium,
          "&:hover": {
            color: isDarkMode ? colors.primary[200] : colors.primary[600],
            backgroundColor: isDarkMode
              ? colors.neutral[700]
              : colors.primary[50],
          },
        }}
      >
        {isDarkMode ? <Sun size={19} /> : <Moon size={19} />}
      </IconButton>
    </Tooltip>
  );
}
