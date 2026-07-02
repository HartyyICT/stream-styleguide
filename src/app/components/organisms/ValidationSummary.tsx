"use client";

import { Box, Typography, type BoxProps } from "@mui/material";
import { AlertCircle } from "lucide-react";
import { borderWidths, iconSizes, radius, spacing } from "@/app/theme/tokens";
import { useDocumentationStyles } from "@/app/hooks/useDocumentationStyles";

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
  const { surface, semantic } = useDocumentationStyles();

  if (errors.length === 0) {
    return null;
  }

  return (
    <Box
      role="alert"
      {...props}
      sx={{
        p: spacing.md,
        border: `${borderWidths.default} solid ${semantic.error}`,
        borderRadius: radius.medium,
        backgroundColor: surface,
        ...sx,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: spacing.sm, mb: spacing.sm }}>
        <AlertCircle size={iconSizes.medium} color={semantic.error} />
        <Typography variant="h3" sx={{ color: semantic.error }}>
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
