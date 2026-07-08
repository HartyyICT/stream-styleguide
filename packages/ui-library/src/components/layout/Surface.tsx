"use client";

import { Box, type BoxProps } from "@mui/material";
import { borderWidths, radius, shadows, spacing } from "../theme/tokens";
import { useSemanticColors } from "../theme/useSemanticColors";

interface SurfaceProps extends BoxProps {
  subtle?: boolean;
  elevated?: boolean;
}

export default function Surface({
  subtle = false,
  elevated = false,
  sx,
  ...props
}: SurfaceProps) {
  const { borders, surface, subtleBackground } = useSemanticColors();

  return (
    <Box
      {...props}
      sx={{
        p: spacing.md,
        border: `${borderWidths.default} solid ${borders.default}`,
        borderRadius: radius.medium,
        backgroundColor: subtle ? subtleBackground : surface,
        boxShadow: elevated ? shadows.level1 : shadows.level0,
        ...sx,
      }}
    />
  );
}
