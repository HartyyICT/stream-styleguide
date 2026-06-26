"use client";

import { Box, type BoxProps } from "@mui/material";
import { borderWidths, radius } from "@/app/theme/tokens";
import { useDocumentationStyles } from "@/app/hooks/useDocumentationStyles";

interface KbdProps extends BoxProps {
  children: string;
}

export default function Kbd({ children, sx, ...props }: KbdProps) {
  const { borders, subtleBackground, secondaryText } = useDocumentationStyles();

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
