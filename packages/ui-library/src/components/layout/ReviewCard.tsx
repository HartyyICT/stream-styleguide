"use client";

import { Box, Typography, type BoxProps } from "@mui/material";
import type { ReactNode } from "react";
import { borderWidths, spacing } from "../../theme/tokens";
import { useSemanticColors } from "../../theme/useSemanticColors";
import Card from "./Card";

export interface ReviewCardProps extends Omit<BoxProps, "title"> {
  icon?: ReactNode;
  title: ReactNode;
  children: ReactNode;
}

export default function ReviewCard({
  icon,
  title,
  children,
  sx,
  ...props
}: ReviewCardProps) {
  const { borders, secondaryText, subtleBackground } = useSemanticColors();

  return (
    <Card {...props} fullWidth sx={{ p: 0, overflow: "hidden", ...sx }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: spacing.sm,
          px: spacing.lg,
          py: spacing.md,
          color: secondaryText,
          backgroundColor: subtleBackground,
          borderBottom: `${borderWidths.default} solid ${borders.subtle}`,
        }}
      >
        {icon}
        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
          {title}
        </Typography>
      </Box>
      <Box sx={{ px: spacing.lg, py: spacing.md }}>{children}</Box>
    </Card>
  );
}
