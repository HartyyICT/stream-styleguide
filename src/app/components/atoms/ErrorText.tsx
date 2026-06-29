"use client";

import { Box, Typography, type BoxProps } from "@mui/material";
import { AlertCircle } from "lucide-react";
import { colors, iconSizes, spacing } from "@/app/theme/tokens";

interface ErrorTextProps extends BoxProps {
  children: string;
}

export default function ErrorText({ children, sx, ...props }: ErrorTextProps) {
  return (
    <Box
      role="alert"
      {...props}
      sx={{
        display: "flex",
        alignItems: "flex-start",
        gap: spacing.xs,
        color: colors.semantic.error.main,
        ...sx,
      }}
    >
      <AlertCircle size={iconSizes.small} aria-hidden="true" />
      <Typography variant="caption" sx={{ color: "inherit", lineHeight: 1.5 }}>
        {children}
      </Typography>
    </Box>
  );
}
