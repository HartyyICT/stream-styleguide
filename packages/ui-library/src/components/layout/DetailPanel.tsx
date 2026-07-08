"use client";

import { Box, Drawer, IconButton, Typography } from "@mui/material";
import { X } from "lucide-react";
import type { ReactNode } from "react";
import { borderWidths, overlayTokens, radius, shadows, spacing } from "../../theme/tokens";
import { useSemanticColors } from "../../theme/useSemanticColors";

interface DetailPanelProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children?: ReactNode;
  footer?: ReactNode;
  width?: number | string;
}

export default function DetailPanel({
  open,
  onClose,
  title,
  children,
  footer,
  width = 420,
}: DetailPanelProps) {
  const { surface, borders, primaryText, secondaryText } = useSemanticColors();

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: overlayTokens.backdropColor,
            backdropFilter: overlayTokens.backdropBlur,
            WebkitBackdropFilter: overlayTokens.backdropBlur,
          },
        },
        paper: {
          sx: {
            width: { xs: "100%", sm: width },
            maxWidth: "100vw",
            backgroundColor: surface,
            borderLeft: `${borderWidths.default} solid ${borders.default}`,
            boxShadow: shadows.level4,
            display: "flex",
            flexDirection: "column",
          },
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: spacing.md,
          p: spacing.lg,
          borderBottom: `${borderWidths.default} solid ${borders.subtle}`,
        }}
      >
        <Typography variant="h3" sx={{ color: primaryText }}>
          {title}
        </Typography>
        <IconButton
          aria-label="Close panel"
          onClick={onClose}
          size="small"
          sx={{
            flexShrink: 0,
            color: secondaryText,
            border: `${borderWidths.subtle} solid ${borders.subtle}`,
            borderRadius: radius.small,
          }}
        >
          <X size={16} />
        </IconButton>
      </Box>

      <Box sx={{ flex: 1, overflowY: "auto", p: spacing.lg, display: "grid", gap: spacing.lg }}>
        {children}
      </Box>

      {footer && (
        <Box
          sx={{
            p: spacing.lg,
            borderTop: `${borderWidths.default} solid ${borders.subtle}`,
            display: "grid",
            gap: spacing.sm,
          }}
        >
          {footer}
        </Box>
      )}
    </Drawer>
  );
}
