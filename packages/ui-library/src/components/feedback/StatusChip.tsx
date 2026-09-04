"use client";

import { Box, Chip, alpha, type ChipProps } from "@mui/material";
import { useSemanticColors } from "../../theme/useSemanticColors";

export type StatusChipTone =
  | "neutral"
  | "accent"
  | "success"
  | "warning"
  | "error"
  | "info";

export interface StatusChipProps extends Omit<ChipProps, "color" | "label"> {
  status: string;
  tone?: StatusChipTone;
  lowercase?: boolean;
}

export default function StatusChip({
  status,
  tone = "neutral",
  lowercase = true,
  sx,
  ...props
}: StatusChipProps) {
  const { accent, primaryText, secondaryText, semantic } = useSemanticColors();

  if (!status.trim()) {
    return null;
  }

  const color = {
    neutral: secondaryText,
    accent,
    success: semantic.success,
    warning: semantic.warning,
    error: semantic.error,
    info: semantic.info,
  }[tone];

  return (
    <Chip
      {...props}
      size="small"
      label={lowercase ? status.toLocaleLowerCase() : status}
      icon={
        <Box
          component="span"
          sx={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: `${color} !important`,
          }}
        />
      }
      sx={{
        color: tone === "neutral" ? primaryText : color,
        backgroundColor: alpha(color, 0.12),
        fontWeight: 600,
        "& .MuiChip-deleteIcon": { color: alpha(color, 0.72) },
        ...sx,
      }}
    />
  );
}
