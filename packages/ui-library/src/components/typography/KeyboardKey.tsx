"use client";

import { Box, type BoxProps } from "@mui/material";
import { borderWidths, radius } from "../../theme/tokens";
import { useSemanticColors } from "../../theme/useSemanticColors";

interface KeyboardKeyProps extends BoxProps {
  children: string;
}

export default function KeyboardKey({ children, sx, ...props }: KeyboardKeyProps) {
  const { borders, subtleBackground, secondaryText } = useSemanticColors();

  return (
    <Box
      component="kbd"
      {...props}
      sx={{
        px: 0.75,
        py: 0.25,
        color: secondaryText,
        border: `${borderWidths.default} solid ${borders.subtle}`,
        borderRadius: radius.small,
        backgroundColor: subtleBackground,
        fontFamily: "var(--font-space-mono), monospace",
        fontSize: "0.75rem",
        lineHeight: 1.2,
        boxShadow: "none",
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}
