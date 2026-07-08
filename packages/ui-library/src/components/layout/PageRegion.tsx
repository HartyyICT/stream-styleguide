"use client";

import { Box, Typography, type BoxProps } from "@mui/material";
import { borderWidths, radius, spacing } from "../../theme/tokens";
import { useSemanticColors } from "../../theme/useSemanticColors";

interface PageRegionProps extends BoxProps {
  label: string;
  muted?: boolean;
}

export default function PageRegion({
  label,
  muted = false,
  sx,
  children,
  ...props
}: PageRegionProps) {
  const { borders, primaryText, secondaryText, selectedBackground, subtleBackground } =
    useSemanticColors();

  return (
    <Box
      {...props}
      sx={{
        minHeight: "3rem",
        display: "grid",
        placeItems: "center",
        p: spacing.md,
        border: `${borderWidths.default} solid ${muted ? borders.subtle : borders.default}`,
        borderRadius: radius.medium,
        backgroundColor: muted ? subtleBackground : selectedBackground,
        textAlign: "center",
        ...sx,
      }}
    >
      <Typography
        variant="caption"
        sx={{
          color: muted ? secondaryText : primaryText,
          fontWeight: 700,
          lineHeight: 1.4,
        }}
      >
        {label}
      </Typography>
      {children}
    </Box>
  );
}
