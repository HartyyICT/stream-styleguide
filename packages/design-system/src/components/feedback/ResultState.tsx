"use client";

import { Box, Typography, type BoxProps } from "@mui/material";
import {
  CircleAlert,
  CircleCheck,
  FileQuestion,
  Info,
  ShieldX,
  TriangleAlert,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import { iconSizes, spacing } from "../../theme/tokens";
import { useSemanticColors } from "../../theme/useSemanticColors";
import Button from "../buttons/Button";

export type ResultStateTone = "neutral" | "info" | "success" | "warning" | "error";

export interface ResultStateAction {
  label: string;
  onClick?: () => void;
  href?: string;
}

export interface ResultStateProps extends Omit<BoxProps, "title"> {
  title: ReactNode;
  message: ReactNode;
  code?: string | number;
  tone?: ResultStateTone;
  icon?: LucideIcon;
  primaryAction?: ResultStateAction;
  secondaryAction?: ResultStateAction;
  minHeight?: number | string;
}

const icons: Record<ResultStateTone, LucideIcon> = {
  neutral: FileQuestion,
  info: Info,
  success: CircleCheck,
  warning: TriangleAlert,
  error: CircleAlert,
};

export default function ResultState({
  title,
  message,
  code,
  tone = "neutral",
  icon,
  primaryAction,
  secondaryAction,
  minHeight = 360,
  sx,
  ...props
}: ResultStateProps) {
  const { primaryText, secondaryText, accent, semantic } = useSemanticColors();
  const Icon = icon ?? (code === 403 ? ShieldX : icons[tone]);
  const color = tone === "neutral" ? accent : semantic[tone];

  return (
    <Box
      role={tone === "error" || tone === "warning" ? "alert" : "status"}
      {...props}
      sx={{
        width: "100%",
        minHeight,
        px: spacing.xl,
        py: spacing.xxl,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: spacing.sm,
        textAlign: "center",
        color: primaryText,
        ...sx,
      }}
    >
      <Icon
        size={iconSizes.extraLarge * 2.5}
        color={color}
        strokeWidth={1.5}
        aria-hidden="true"
        style={{ opacity: 0.72 }}
      />
      {code !== undefined && (
        <Typography variant="h1" component="p" sx={{ color }}>
          {code}
        </Typography>
      )}
      <Typography variant="h3" component="p">
        {title}
      </Typography>
      <Typography variant="body2" sx={{ maxWidth: "52ch", color: secondaryText }}>
        {message}
      </Typography>
      {(primaryAction || secondaryAction) && (
        <Box
          sx={{
            mt: spacing.md,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: spacing.sm,
          }}
        >
          {secondaryAction && (
            <Button
              variant="secondary"
              href={secondaryAction.href}
              onClick={secondaryAction.onClick}
            >
              {secondaryAction.label}
            </Button>
          )}
          {primaryAction && (
            <Button href={primaryAction.href} onClick={primaryAction.onClick}>
              {primaryAction.label}
            </Button>
          )}
        </Box>
      )}
    </Box>
  );
}
