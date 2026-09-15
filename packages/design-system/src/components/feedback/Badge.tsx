"use client";

import { Box, type BoxProps } from "@mui/material";
import { borderWidths, radius } from "../../theme/tokens";
import { useSemanticColors } from "../../theme/useSemanticColors";

type BadgeTone = "neutral" | "accent" | "success" | "warning" | "error";

interface BadgeProps extends BoxProps {
  tone?: BadgeTone;
  children: string;
}

export default function Badge({ tone = "neutral", children, sx, ...props }: BadgeProps) {
  const { borders, subtleBackground, accent, secondaryText, semantic } = useSemanticColors();
  const toneColor = {
    neutral: secondaryText,
    accent,
    success: semantic.success,
    warning: semantic.warning,
    error: semantic.error,
  }[tone];
  const toneBorder = tone === "neutral" ? borders.subtle : toneColor;

  return (
    <Box
      {...props}
      sx={{
        width: "fit-content",
        minHeight: 24,
        px: 1,
        display: "inline-flex",
        alignItems: "center",
        border: `${borderWidths.default} solid ${toneBorder}`,
        borderRadius: radius.extraLarge,
        color: toneColor,
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
