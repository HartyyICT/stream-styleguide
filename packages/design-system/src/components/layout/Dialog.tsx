"use client";

import {
  Box,
  Dialog as MuiDialog,
  DialogActions,
  DialogContent,
  IconButton,
  Typography,
  type DialogProps as MuiDialogProps,
} from "@mui/material";
import { X } from "lucide-react";
import type { ReactNode } from "react";
import { borderWidths, overlayTokens, radius, shadows, spacing } from "../../theme/tokens";
import { useSemanticColors } from "../../theme/useSemanticColors";

export interface DialogProps
  extends Omit<MuiDialogProps, "children" | "onClose" | "title"> {
  open: boolean;
  onClose: NonNullable<MuiDialogProps["onClose"]>;
  title?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  actions?: ReactNode;
  loading?: boolean;
  fullHeight?: boolean;
  preventOnBackdropClose?: boolean;
  onExited?: () => void;
}

export default function Dialog({
  open,
  onClose,
  title,
  description,
  children,
  actions,
  loading = false,
  fullHeight = false,
  preventOnBackdropClose = false,
  onExited,
  maxWidth = "sm",
  fullWidth = true,
  ...props
}: DialogProps) {
  const { surface, borders, primaryText, secondaryText } = useSemanticColors();
  const hasHeader = Boolean(title || description);

  return (
    <MuiDialog
      open={open}
      onClose={preventOnBackdropClose || loading ? undefined : onClose}
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      disableScrollLock
      {...props}
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
            height: fullHeight ? "90vh" : undefined,
            overflow: "hidden",
            backgroundColor: surface,
            border: `${borderWidths.default} solid ${borders.default}`,
            borderRadius: radius.large,
            boxShadow: shadows.level4,
          },
        },
        transition: { onExited },
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
            onClick={(event) => onClose(event, "escapeKeyDown")}
            size="small"
            disabled={loading}
            sx={{
              flexShrink: 0,
              color: secondaryText,
              border: `${borderWidths.subtle} solid ${borders.subtle}`,
              borderRadius: radius.small,
            }}
          >
            <X size={16} aria-hidden="true" />
          </IconButton>
        </Box>
      )}

      {children && (
        <DialogContent
          sx={{
            height: "100%",
            overflowY: "auto",
            px: spacing.lg,
            pt: hasHeader ? 0 : spacing.lg,
          }}
        >
          {children}
        </DialogContent>
      )}

      {actions && (
        <DialogActions
          sx={{ px: spacing.lg, pb: spacing.lg, pt: spacing.sm, gap: spacing.sm }}
        >
          {actions}
        </DialogActions>
      )}
    </MuiDialog>
  );
}
