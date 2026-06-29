"use client";

import { Box, Typography, type BoxProps } from "@mui/material";
import { AlertCircle } from "lucide-react";
import { borderWidths, colors, iconSizes, radius, spacing } from "@/app/theme/tokens";

interface ValidationSummaryProps extends BoxProps {
  title?: string;
  errors: string[];
}

export default function ValidationSummary({
  title = "Check the form",
  errors,
  sx,
  ...props
}: ValidationSummaryProps) {
  if (errors.length === 0) {
    return null;
  }

  return (
    <Box
      role="alert"
      {...props}
      sx={{
        p: spacing.md,
        border: `${borderWidths.default} solid ${colors.semantic.error.main}`,
        borderRadius: radius.medium,
        backgroundColor: colors.semantic.surface,
        ...sx,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: spacing.sm, mb: spacing.sm }}>
        <AlertCircle size={iconSizes.medium} color={colors.semantic.error.main} />
        <Typography variant="h3" sx={{ color: colors.semantic.error.main }}>
          {title}
        </Typography>
      </Box>
      <Box component="ul" sx={{ m: 0, pl: spacing.lg }}>
        {errors.map((error) => (
          <Typography key={error} component="li" variant="body2" sx={{ lineHeight: 1.7 }}>
            {error}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}
