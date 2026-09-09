"use client";

import { Box, Chip, alpha, darken, useTheme, type ChipProps } from "@mui/material";
import { feedbackTokens } from "../../theme/tokens";

export type StatusColor =
  | "success"
  | "error"
  | "warning"
  | "info"
  | "primary"
  | "secondary"
  | "inherit";

export interface StatusChipProps extends Omit<ChipProps, "color" | "label"> {
  status: string;
  color?: StatusColor;
}

export function useStatusPalette(color: StatusColor = "inherit") {
  const theme = useTheme();

  if (color === "inherit") {
    return {
      main: theme.palette.text.secondary,
      text: theme.palette.text.primary,
      soft: alpha(
        theme.palette.text.secondary,
        feedbackTokens.statusChip.neutralBackgroundOpacity,
      ),
    };
  }

  const palette = theme.palette[color];
  return {
    main: palette.main,
    text:
      theme.palette.mode === "dark"
        ? palette.main
        : darken(palette.main, feedbackTokens.statusChip.textDarken),
    soft: alpha(
      palette.main,
      feedbackTokens.statusChip.backgroundOpacity,
    ),
  };
}

export default function StatusChip({
  status,
  color = "inherit",
  sx,
  ...props
}: StatusChipProps) {
  const palette = useStatusPalette(color);

  if (!status.trim()) {
    return null;
  }

  return (
    <Chip
      {...props}
      size="small"
      label={status.toLocaleLowerCase()}
      icon={
        <Box
          component="span"
          sx={{
            width: feedbackTokens.statusChip.dotSize,
            height: feedbackTokens.statusChip.dotSize,
            borderRadius: "50%",
            backgroundColor: `${palette.main} !important`,
          }}
        />
      }
      sx={{
        height: feedbackTokens.statusChip.height,
        color: palette.text,
        backgroundColor: palette.soft,
        fontSize: feedbackTokens.statusChip.fontSize,
        fontWeight: feedbackTokens.statusChip.fontWeight,
        "& .MuiChip-label": {
          fontSize: feedbackTokens.statusChip.fontSize,
          fontWeight: feedbackTokens.statusChip.fontWeight,
        },
        "& .MuiChip-deleteIcon": {
          color: alpha(
            palette.text,
            feedbackTokens.statusChip.deleteOpacity,
          ),
          "&:hover": { color: palette.text },
        },
        ...sx,
      }}
    />
  );
}
