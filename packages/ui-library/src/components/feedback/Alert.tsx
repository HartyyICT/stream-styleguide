"use client";

import { Box, IconButton, Typography, alpha, type BoxProps } from "@mui/material";
import { CircleAlert, CircleCheck, Info, TriangleAlert, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { borderWidths, iconSizes, radius, shadows, spacing } from "../../theme/tokens";
import { useSemanticColors } from "../../theme/useSemanticColors";

export type AlertSeverity = "info" | "success" | "warning" | "error";

export interface AlertProps extends Omit<BoxProps, "title"> {
  severity: AlertSeverity;
  title?: ReactNode;
  text?: string;
  children?: ReactNode;
  dense?: boolean;
  dismissible?: boolean;
  autoDismissMs?: number;
  onClose?: () => void;
}

const icons = {
  info: Info,
  success: CircleCheck,
  warning: TriangleAlert,
  error: CircleAlert,
} as const;

export default function Alert({
  severity,
  title,
  text,
  children,
  dense = false,
  dismissible = false,
  autoDismissMs,
  onClose,
  sx,
  ...props
}: AlertProps) {
  const { semantic, primaryText } = useSemanticColors();
  const [dismissed, setDismissed] = useState(false);
  const Icon = icons[severity];
  const color = semantic[severity];

  useEffect(() => {
    if (!autoDismissMs) {
      return;
    }

    const timer = window.setTimeout(() => setDismissed(true), autoDismissMs);
    return () => window.clearTimeout(timer);
  }, [autoDismissMs]);

  if (dismissed) {
    return null;
  }

  function close() {
    setDismissed(true);
    onClose?.();
  }

  return (
    <Box
      role="alert"
      {...props}
      sx={{
        width: "100%",
        display: "flex",
        alignItems: dense ? "center" : "flex-start",
        gap: spacing.sm,
        px: spacing.md,
        py: dense ? spacing.sm : spacing.md,
        color: primaryText,
        backgroundColor: alpha(color, 0.12),
        borderLeft: `${borderWidths.accent} solid ${color}`,
        borderRadius: radius.small,
        boxShadow: dense ? shadows.level0 : shadows.level1,
        ...sx,
      }}
    >
      <Icon
        size={dense ? iconSizes.small : iconSizes.medium}
        color={color}
        aria-hidden="true"
        style={{ flexShrink: 0 }}
      />
      <Box sx={{ minWidth: 0, flex: 1 }}>
        {title && (
          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: text || children ? 0.25 : 0 }}>
            {title}
          </Typography>
        )}
        {text ? <Typography variant="body2">{text}</Typography> : children}
      </Box>
      {(dismissible || onClose) && (
        <IconButton aria-label="Dismiss" size="small" onClick={close} sx={{ flexShrink: 0 }}>
          <X size={iconSizes.small} aria-hidden="true" />
        </IconButton>
      )}
    </Box>
  );
}
