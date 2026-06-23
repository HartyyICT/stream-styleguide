"use client";

import { Box, Typography } from "@mui/material";
import {
  borderColors,
  colors,
  radius,
  shadows,
} from "../theme/tokens";
import { useColorMode } from "../theme/themeProvider";

interface ColorSwatchProps {
  name: string;
  color: string;
  description?: string;
}

export default function ColorSwatch({
  name,
  color,
  description,
}: ColorSwatchProps) {
  const { mode } = useColorMode();
  const isDarkMode = mode === "dark";

  return (
    <Box
      sx={{
        overflow: "hidden",
        backgroundColor: isDarkMode
          ? colors.neutral[800]
          : colors.semantic.surface,
        border: 1,
        borderColor: isDarkMode
          ? borderColors.dark.default
          : borderColors.light.default,
        borderRadius: radius.medium,
        boxShadow: shadows.level1,
      }}
    >
      <Box
        sx={{
          height: 96,
          backgroundColor: color,
        }}
      />

      <Box sx={{ p: 2 }}>
        <Typography variant="body2" sx={{ fontWeight: 700, mb: 0.5 }}>
          {name}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            display: "block",
            color: isDarkMode ? colors.neutral[300] : colors.neutral[600],
            fontFamily: "var(--font-space-mono), monospace",
          }}
        >
          {color}
        </Typography>
        {description && (
          <Typography
            variant="caption"
            sx={{
              display: "block",
              color: isDarkMode ? colors.neutral[300] : colors.neutral[600],
              mt: 1,
            }}
          >
            {description}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
