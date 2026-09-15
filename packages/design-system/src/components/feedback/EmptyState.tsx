"use client";

import { Box, Typography } from "@mui/material";
import type { LucideIcon } from "lucide-react";
import { borderWidths, radius, spacing } from "../../theme/tokens";
import { useSemanticColors } from "../../theme/useSemanticColors";
import Button from "../buttons/Button";

export interface EmptyStateProps {
  icon: LucideIcon;
  title?: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  minHeight?: number | string;
}

export default function EmptyState({
  icon: Icon,
  title,
  message,
  actionLabel,
  onAction,
  minHeight = 320,
}: EmptyStateProps) {
  const { borders, surface, primaryText, secondaryText } = useSemanticColors();

  return (
    <Box
      sx={{
        width: "100%",
        minHeight,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: spacing.sm,
        p: spacing.xl,
        border: `${borderWidths.default} solid ${borders.subtle}`,
        borderRadius: radius.medium,
        backgroundColor: surface,
        textAlign: "center",
      }}
    >
      <Box aria-hidden="true" sx={{ color: secondaryText, opacity: 0.45, lineHeight: 0 }}>
        <Icon size={40} strokeWidth={1.5} />
      </Box>

      {title && (
        <Typography variant="h4" sx={{ color: primaryText, mt: spacing.xs }}>
          {title}
        </Typography>
      )}

      <Typography variant="body2" sx={{ color: secondaryText, maxWidth: "42ch" }}>
        {message}
      </Typography>

      {actionLabel && onAction && (
        <Button variant="secondary" onClick={onAction} sx={{ mt: spacing.sm }}>
          {actionLabel}
        </Button>
      )}
    </Box>
  );
}
