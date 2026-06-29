"use client";

import { Box, Typography, type BoxProps } from "@mui/material";
import Surface from "@/app/components/atoms/Surface";
import { spacing } from "@/app/theme/tokens";
import { useDocumentationStyles } from "@/app/hooks/useDocumentationStyles";

interface FormSectionProps extends BoxProps {
  title: string;
  description?: string;
}

export default function FormSection({
  title,
  description,
  children,
  sx,
  ...props
}: FormSectionProps) {
  const { primaryText, secondaryText } = useDocumentationStyles();

  return (
    <Surface {...props} sx={sx}>
      <Box sx={{ mb: spacing.md }}>
        <Typography variant="h3" sx={{ color: primaryText, mb: description ? spacing.xs : 0 }}>
          {title}
        </Typography>
        {description && (
          <Typography variant="body2" sx={{ color: secondaryText, lineHeight: 1.7 }}>
            {description}
          </Typography>
        )}
      </Box>
      <Box sx={{ display: "grid", gap: spacing.md }}>{children}</Box>
    </Surface>
  );
}
