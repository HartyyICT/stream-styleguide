"use client";

import { Box, Typography, type BoxProps } from "@mui/material";
import { spacing } from "../../theme/tokens";
import { useSemanticColors } from "../../theme/useSemanticColors";

type HelperTextTone = "default" | "success" | "warning" | "info" | "error";

interface HelperTextProps extends BoxProps {
  children: string;
  tone?: HelperTextTone;
}

export default function HelperText({
  children,
  tone = "default",
  sx,
  ...props
}: HelperTextProps) {
  const { secondaryText, semantic } = useSemanticColors();
  const toneColor = {
    default: secondaryText,
    success: semantic.success,
    warning: semantic.warning,
    info: semantic.info,
    error: semantic.error,
  }[tone];

  return (
    <Box
      {...props}
      sx={{
        display: "flex",
        alignItems: "flex-start",
        gap: spacing.xs,
        color: toneColor,
        ...sx,
      }}
    >
      <Typography variant="caption" sx={{ color: "inherit", lineHeight: 1.5 }}>
        {children}
      </Typography>
    </Box>
  );
}
