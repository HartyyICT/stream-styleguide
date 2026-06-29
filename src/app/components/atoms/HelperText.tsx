"use client";

import { Box, Typography, type BoxProps } from "@mui/material";
import { HelpCircle } from "lucide-react";
import { iconSizes, spacing } from "@/app/theme/tokens";
import { useDocumentationStyles } from "@/app/hooks/useDocumentationStyles";

interface HelperTextProps extends BoxProps {
  children: string;
}

export default function HelperText({ children, sx, ...props }: HelperTextProps) {
  const { secondaryText } = useDocumentationStyles();

  return (
    <Box
      {...props}
      sx={{
        display: "flex",
        alignItems: "flex-start",
        gap: spacing.xs,
        color: secondaryText,
        ...sx,
      }}
    >
      <HelpCircle size={iconSizes.small} aria-hidden="true" />
      <Typography variant="caption" sx={{ color: "inherit", lineHeight: 1.5 }}>
        {children}
      </Typography>
    </Box>
  );
}
