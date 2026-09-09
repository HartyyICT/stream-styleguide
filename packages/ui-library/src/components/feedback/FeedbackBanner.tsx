"use client";

import { Box, type BoxProps } from "@mui/material";
import type { ReactNode } from "react";
import { feedbackTokens } from "../../theme/tokens";

interface FeedbackBannerProps extends BoxProps {
  toneColor: string;
  toneBackground: string;
  leading: ReactNode;
  trailing?: ReactNode;
  dense?: boolean;
  elevated?: boolean;
}

export default function FeedbackBanner({
  toneColor,
  toneBackground,
  leading,
  trailing,
  dense = false,
  elevated = false,
  children,
  sx,
  ...props
}: FeedbackBannerProps) {
  return (
    <Box
      {...props}
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: feedbackTokens.banner.gap,
        px: feedbackTokens.banner.paddingX,
        py: dense
          ? feedbackTokens.banner.densePaddingY
          : feedbackTokens.banner.paddingY,
        backgroundColor: toneBackground,
        borderLeft: `${feedbackTokens.banner.borderWidth} solid ${toneColor}`,
        borderRadius: feedbackTokens.banner.borderRadius,
        boxShadow: elevated ? feedbackTokens.banner.shadow : "none",
        ...sx,
      }}
    >
      {leading}
      <Box sx={{ minWidth: 0, flex: 1 }}>{children}</Box>
      {trailing}
    </Box>
  );
}
