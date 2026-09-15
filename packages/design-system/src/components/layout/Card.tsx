"use client";

import { Box, Typography, type BoxProps } from "@mui/material";
import { CircleAlert } from "lucide-react";
import type { ReactNode } from "react";
import { borderWidths, iconSizes, radius, shadows, spacing } from "../../theme/tokens";
import { useSemanticColors } from "../../theme/useSemanticColors";

export interface CardProps extends Omit<BoxProps, "title"> {
  elevated?: boolean;
  interactive?: boolean;
  href?: string;
  type?: "button" | "submit" | "reset";
  title?: ReactNode;
  fullHeight?: boolean;
  fullWidth?: boolean;
  hasError?: boolean;
  severity?: "error" | "warning";
}

export default function Card({
  elevated = false,
  interactive = false,
  title,
  fullHeight = false,
  fullWidth = false,
  hasError = false,
  severity = "error",
  children,
  sx,
  ...props
}: CardProps) {
  const { surface, borders, interaction, semantic } = useSemanticColors();
  const stateColor = hasError ? semantic[severity] : borders.default;

  return (
    <Box
      {...props}
      sx={{
        width: fullWidth ? "100%" : undefined,
        height: fullHeight ? "100%" : undefined,
        p: 2.5,
        border: `${
          interactive ? borderWidths.interactive : borderWidths.default
        } solid ${stateColor}`,
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
    >
      {title ? (
        <Box sx={{ display: "grid", gap: spacing.lg }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: spacing.sm }}>
            {hasError && (
              <CircleAlert
                size={iconSizes.small}
                color={semantic[severity]}
                aria-hidden="true"
              />
            )}
            <Typography variant="h3" sx={{ color: hasError ? semantic[severity] : undefined }}>
              {title}
            </Typography>
          </Box>
          {children}
        </Box>
      ) : (
        children
      )}
    </Box>
  );
}
