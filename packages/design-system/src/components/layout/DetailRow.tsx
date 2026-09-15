"use client";

import { Box, Typography } from "@mui/material";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { spacing } from "../../theme/tokens";
import { useSemanticColors } from "../../theme/useSemanticColors";

export interface DetailRowProps {
  icon: LucideIcon;
  label: string;
  children?: ReactNode;
}

export default function DetailRow({ icon: Icon, label, children }: DetailRowProps) {
  const { secondaryText } = useSemanticColors();

  return (
    <Box sx={{ display: "flex", minWidth: 0, flexDirection: "column", gap: spacing.sm }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: spacing.xs, color: secondaryText }}>
        <Icon size={14} aria-hidden="true" />
        <Typography variant="body2">{label}</Typography>
      </Box>
      {children}
    </Box>
  );
}
