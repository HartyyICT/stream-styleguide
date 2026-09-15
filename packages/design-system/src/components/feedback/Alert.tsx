"use client";

import { IconButton, Typography, type BoxProps } from "@mui/material";
import { CircleAlert, CircleCheck, Info, TriangleAlert, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { feedbackTokens } from "../../theme/tokens";
import { useSemanticColors } from "../../theme/useSemanticColors";
import FeedbackBanner from "./FeedbackBanner";

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
  const { feedbackStates, primaryText } = useSemanticColors();
  const [dismissed, setDismissed] = useState(false);
  const Icon = icons[severity];
  const { color, backgroundColor } = feedbackStates[severity];

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
    <FeedbackBanner
      role="alert"
      toneColor={color}
      toneBackground={backgroundColor}
      leading={
        <Icon
          size={
            dense
              ? feedbackTokens.banner.denseIconSize
              : feedbackTokens.banner.iconSize
          }
          color={color}
          aria-hidden="true"
          style={{ flexShrink: 0, alignSelf: "center" }}
        />
      }
      trailing={
        (dismissible || onClose) && (
          <IconButton aria-label="Dismiss" size="small" onClick={close} sx={{ flexShrink: 0 }}>
            <X size={feedbackTokens.banner.denseIconSize} aria-hidden="true" />
          </IconButton>
        )
      }
      dense={dense}
      elevated={!dense}
      {...props}
      sx={{
        color: primaryText,
        ...sx,
      }}
    >
      {title && (
        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: text || children ? 0.25 : 0 }}>
          {title}
        </Typography>
      )}
      {text ? <Typography variant="body2">{text}</Typography> : children}
    </FeedbackBanner>
  );
}
