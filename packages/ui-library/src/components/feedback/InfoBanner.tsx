"use client";

import { Box, Typography, type BoxProps } from "@mui/material";
import type { ReactNode } from "react";
import { Info } from "lucide-react";
import { borderWidths, iconSizes, spacing } from "../theme/tokens";
import { useSemanticColors } from "../theme/useSemanticColors";

interface InfoBannerProps extends BoxProps {
  title?: string;
  children: ReactNode;
}

export default function InfoBanner({ title, children, sx, ...props }: InfoBannerProps) {
  const { borders, secondaryText, subtleBackground } = useSemanticColors();

  return (
    <Box
      role="note"
      {...props}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: spacing.sm,
        p: spacing.lg,
        borderLeft: `${borderWidths.accent} solid ${borders.accent}`,
        backgroundColor: subtleBackground,
        ...sx,
      }}
    >
      <Info
        size={iconSizes.medium}
        color={borders.accent}
        aria-hidden="true"
        style={{ flexShrink: 0 }}
      />
      <Box>
        {title && (
          <Typography variant="h3" sx={{ mb: 0.5, color: borders.accent }}>
            {title}
          </Typography>
        )}
        <Typography variant="body2" sx={{ color: secondaryText, lineHeight: 1.7 }}>
          {children}
        </Typography>
      </Box>
    </Box>
  );
}
