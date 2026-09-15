"use client";

import { Box, Typography, type BoxProps } from "@mui/material";
import { Monitor } from "lucide-react";
import type { ReactNode } from "react";
import { appLayoutTokens, iconSizes, spacing } from "../../theme/tokens";
import { useSemanticColors } from "../../theme/useSemanticColors";

export interface MinimumWidthNoticeProps extends Omit<BoxProps, "title"> {
  minimumWidth?: number;
  title?: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  inline?: boolean;
}

export default function MinimumWidthNotice({
  minimumWidth = appLayoutTokens.minimumSupportedWidth,
  title = "A wider screen is needed",
  description,
  icon,
  inline = false,
  sx,
  ...props
}: MinimumWidthNoticeProps) {
  const { pageBackground, primaryText, secondaryText } = useSemanticColors();

  return (
    <Box
      role="alert"
      {...props}
      sx={{
        display: inline ? "flex" : "none",
        [`@media (max-width: ${minimumWidth - 1}px)`]: {
          display: "flex",
        },
        position: inline ? "relative" : "fixed",
        inset: inline ? undefined : 0,
        minHeight: inline ? appLayoutTokens.minimumWidthNoticeMinHeight : undefined,
        zIndex: inline ? undefined : (theme) => theme.zIndex.modal + 1,
        px: spacing.xl,
        py: spacing.xl,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: spacing.sm,
        textAlign: "center",
        color: primaryText,
        backgroundColor: pageBackground,
        ...sx,
      }}
    >
      {icon ?? (
        <Monitor
          size={iconSizes.extraLarge * 2}
          color={secondaryText}
          aria-hidden="true"
          style={{ opacity: 0.55 }}
        />
      )}
      <Typography variant="h5" component="p">
        {title}
      </Typography>
      <Typography variant="body2" sx={{ maxWidth: 420, color: secondaryText }}>
        {description ??
          `This application supports screens from ${minimumWidth}px wide. Open it on a laptop or desktop, or widen this window.`}
      </Typography>
    </Box>
  );
}
