"use client";

import { Box, CircularProgress, Typography, type BoxProps } from "@mui/material";
import { spacing } from "../../theme/tokens";
import { useSemanticColors } from "../../theme/useSemanticColors";

export interface LoadingProps extends Omit<BoxProps, "children"> {
  size?: number;
  label?: string;
  fullHeight?: boolean;
}

export default function Loading({
  size = 24,
  label,
  fullHeight = false,
  sx,
  ...props
}: LoadingProps) {
  const { secondaryText } = useSemanticColors();

  return (
    <Box
      role="status"
      aria-live="polite"
      aria-label={label ? undefined : "Loading"}
      {...props}
      sx={{
        width: "100%",
        height: fullHeight ? "100%" : undefined,
        py: label ? spacing.md : spacing.sm,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: spacing.sm,
        ...sx,
      }}
    >
      <CircularProgress size={size} />
      {label && (
        <Typography variant="caption" sx={{ color: secondaryText }}>
          {label}
        </Typography>
      )}
    </Box>
  );
}
