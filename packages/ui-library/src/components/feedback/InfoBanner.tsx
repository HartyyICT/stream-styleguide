"use client";

import { Box, Typography, type BoxProps } from "@mui/material";
import type { ReactNode } from "react";
import { Info } from "lucide-react";
import { feedbackTokens, spacing } from "../../theme/tokens";
import { useSemanticColors } from "../../theme/useSemanticColors";
import FeedbackBanner from "./FeedbackBanner";

interface InfoBannerProps extends BoxProps {
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
}

export default function InfoBanner({ title, children, footer, sx, ...props }: InfoBannerProps) {
  const { feedbackStates, secondaryText } = useSemanticColors();
  const { color, backgroundColor } = feedbackStates.info;

  return (
    <FeedbackBanner
      role="note"
      toneColor={color}
      toneBackground={backgroundColor}
      leading={
        <Info
          size={feedbackTokens.banner.iconSize}
          color={color}
          aria-hidden="true"
          style={{ flexShrink: 0, alignSelf: "center" }}
        />
      }
      {...props}
      sx={sx}
    >
      {title && (
        <Typography variant="h3" sx={{ mb: 0.5, color }}>
          {title}
        </Typography>
      )}
      <Typography variant="body2" sx={{ color: secondaryText, lineHeight: 1.7 }}>
        {children}
      </Typography>
      {footer && (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: spacing.sm, mt: spacing.md }}>
          {footer}
        </Box>
      )}
    </FeedbackBanner>
  );
}
