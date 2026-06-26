"use client";

import { Box, type BoxProps } from "@mui/material";
import { borderWidths, radius } from "@/app/theme/tokens";
import { useDocumentationStyles } from "@/app/hooks/useDocumentationStyles";

type BadgeTone = "neutral" | "accent" | "success" | "warning" | "error";

interface BadgeProps extends BoxProps {
  tone?: BadgeTone;
  children: string;
}

export default function Badge({ tone = "neutral", children, sx, ...props }: BadgeProps) {
  const { borders, subtleBackground, accent, secondaryText } = useDocumentationStyles();
  const color = tone === "accent" ? accent : secondaryText;

  return (
    <Box
      {...props}
      sx={{
        width: "fit-content",
        minHeight: 24,
        px: 1,
        display: "inline-flex",
        alignItems: "center",
        border: `${borderWidths.default} solid ${tone === "accent" ? accent : borders.subtle}`,
        borderRadius: radius.extraLarge,
        color,
        backgroundColor: subtleBackground,
        fontFamily: "var(--font-poppins), sans-serif",
        fontSize: "0.75rem",
        fontWeight: 700,
        lineHeight: 1,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}
