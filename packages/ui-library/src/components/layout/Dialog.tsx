"use client";

import {
  Dialog as MuiDialog,
  DialogActions,
  DialogContent,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import { X } from "lucide-react";
import type { ReactNode } from "react";
import { borderWidths, overlayTokens, radius, shadows, spacing } from "../../theme/tokens";
import { useSemanticColors } from "../../theme/useSemanticColors";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children?: ReactNode;
  actions?: ReactNode;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
}

export default function Dialog({
  open,
  onClose,
  title,
  description,
  children,
  actions,
  maxWidth = "sm",
}: DialogProps) {
  const { surface, borders, primaryText, secondaryText } = useSemanticColors();
  const hasHeader = Boolean(title || description);

  return (
    <MuiDialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={maxWidth}
      disableScrollLock
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
            backgroundColor: surface,
            border: `${borderWidths.default} solid ${borders.default}`,
            borderRadius: radius.large,
            boxShadow: shadows.level4,
          },
        },
      }}
    >
      {hasHeader && (
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            gap: spacing.md,
            p: spacing.lg,
            pb: description ? spacing.sm : spacing.lg,
          }}
        >
          <Box sx={{ flex: 1, minWidth: 0 }}>
            {title && (
              <Typography variant="h3" sx={{ color: primaryText }}>
                {title}
              </Typography>
            )}
            {description && (
              <Typography
                variant="body2"
                sx={{ color: secondaryText, mt: 0.5, lineHeight: 1.6 }}
              >
                {description}
              </Typography>
            )}
          </Box>
          <IconButton
            aria-label="Close dialog"
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
      )}

      {children && (
        <DialogContent sx={{ px: spacing.lg, pt: hasHeader ? 0 : spacing.lg }}>
          {children}
        </DialogContent>
      )}

      {actions && (
        <DialogActions sx={{ px: spacing.lg, pb: spacing.lg, pt: spacing.sm, gap: spacing.sm }}>
          {actions}
        </DialogActions>
      )}
    </MuiDialog>
  );
}
