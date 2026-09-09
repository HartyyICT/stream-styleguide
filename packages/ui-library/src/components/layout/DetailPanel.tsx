"use client";

import { Box, Drawer, IconButton, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { X } from "lucide-react";
import type { ReactNode } from "react";
import {
  borderWidths,
  detailPanelTokens,
  iconSizes,
  shadows,
} from "../../theme/tokens";
import { useSemanticColors } from "../../theme/useSemanticColors";

export interface DetailPanelProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children?: ReactNode;
  footer?: ReactNode;
  width?: number | string;
  maxWidth?: number | string;
}

export default function DetailPanel({
  open,
  onClose,
  title,
  children,
  footer,
  width = detailPanelTokens.width,
  maxWidth = detailPanelTokens.maxWidth,
}: DetailPanelProps) {
  const { surface, borders, primaryText, semantic } = useSemanticColors();

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: detailPanelTokens.backdropColor,
            backdropFilter: detailPanelTokens.backdropBlur,
            WebkitBackdropFilter: detailPanelTokens.backdropBlur,
          },
        },
        paper: {
          sx: {
            width: { xs: "100%", sm: width },
            maxWidth: { xs: "100vw", sm: maxWidth },
            backgroundColor: surface,
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
          alignItems: "center",
          justifyContent: "space-between",
          gap: detailPanelTokens.contentGap,
          p: detailPanelTokens.headerPadding,
          borderBottom: `${borderWidths.default} solid ${borders.subtle}`,
        }}
      >
        <Typography variant="h6" sx={{ color: primaryText, fontWeight: 500 }}>
          {title}
        </Typography>
        <IconButton
          aria-label="Close panel"
          onClick={onClose}
          size="small"
          sx={{
            flexShrink: 0,
            color: semantic.error,
            border: `${borderWidths.default} solid transparent`,
            backgroundColor: "transparent",
            "&:hover": {
              borderColor: "transparent",
              backgroundColor: alpha(semantic.error, detailPanelTokens.closeHoverOpacity),
            },
          }}
        >
          <X size={iconSizes.small} />
        </IconButton>
      </Box>

      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          overflow: "hidden",
          p: detailPanelTokens.bodyPadding,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            flex: 1,
            minHeight: 0,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            gap: detailPanelTokens.contentGap,
          }}
        >
          {children}
        </Box>

        {footer && (
          <Box
            sx={{
              flexShrink: 0,
              pt: detailPanelTokens.bodyPadding,
              display: "grid",
              gap: detailPanelTokens.footerGap,
            }}
          >
            {footer}
          </Box>
        )}
      </Box>
    </Drawer>
  );
}
