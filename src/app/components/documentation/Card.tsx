"use client";

import { Box, type BoxProps } from "@mui/material";
import { borderWidths, radius, shadows } from "@/app/theme/tokens";
import { useDocumentationStyles } from "./useDocumentationStyles";

interface CardProps extends BoxProps {
  elevated?: boolean;
  interactive?: boolean;
  href?: string;
  type?: "button" | "submit" | "reset";
}

export default function Card({
  elevated = false,
  interactive = false,
  sx,
  ...props
}: CardProps) {
  const { surface, borders, interaction } = useDocumentationStyles();

  return (
    <Box
      {...props}
      sx={{
        p: 2.5,
        border: `${
          interactive ? borderWidths.interactive : borderWidths.default
        } solid ${borders.default}`,
        borderRadius: radius.medium,
        backgroundColor: surface,
        boxShadow: elevated ? shadows.level1 : shadows.level0,
        ...(interactive && {
          cursor: "pointer",
          transition:
            "color 160ms ease, border-color 160ms ease, background-color 160ms ease, box-shadow 160ms ease",
          "&:hover": {
            color: interaction.hoverContent,
            borderColor: interaction.hoverBorder,
            backgroundColor: interaction.hoverBackground,
            boxShadow: shadows.level2,
          },
          "&:focus-visible": {
            outline: `${borderWidths.focus} solid ${interaction.focusRing}`,
            outlineOffset: 2,
          },
        }),
        ...sx,
      }}
    />
  );
}
