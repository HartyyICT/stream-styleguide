"use client";

import { Box, IconButton, Typography } from "@mui/material";
import { Trash2 } from "lucide-react";
import type { ReactNode } from "react";
import { borderWidths, iconSizes, radius, spacing } from "../../theme/tokens";
import { useSemanticColors } from "../../theme/useSemanticColors";

export interface RemovableSectionProps {
  title: string;
  children: ReactNode;
  onRemove?: () => void;
  removeLabel?: string;
}

export default function RemovableSection({
  title,
  children,
  onRemove,
  removeLabel,
}: RemovableSectionProps) {
  const { borders, primaryText, subtleBackground, semantic } = useSemanticColors();

  return (
    <Box
      sx={{
        width: "100%",
        border: `${borderWidths.default} solid ${borders.subtle}`,
        borderRadius: radius.medium,
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: spacing.sm,
          px: spacing.md,
          py: spacing.sm,
          backgroundColor: subtleBackground,
          borderBottom: `${borderWidths.default} solid ${borders.subtle}`,
        }}
      >
        <Typography variant="subtitle2" sx={{ color: primaryText, fontWeight: 700 }}>
          {title}
        </Typography>

        {onRemove && (
          <IconButton
            aria-label={removeLabel ?? `Remove ${title}`}
            onClick={onRemove}
            size="small"
            sx={{ color: semantic.error, flexShrink: 0 }}
          >
            <Trash2 size={iconSizes.small} aria-hidden="true" />
          </IconButton>
        )}
      </Box>

      <Box sx={{ p: spacing.md }}>{children}</Box>
    </Box>
  );
}
