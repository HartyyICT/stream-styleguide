"use client";

import { Box, Typography } from "@mui/material";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { spacing } from "../../theme/tokens";
import { useSemanticColors } from "../../theme/useSemanticColors";

interface DetailRowProps {
  icon: LucideIcon;
  label: string;
  children?: ReactNode;
}

export default function DetailRow({ icon: Icon, label, children }: DetailRowProps) {
  const { secondaryText } = useSemanticColors();

  return (
    <Box sx={{ display: "grid", gap: spacing.xs }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: spacing.xs, color: secondaryText }}>
        <Icon size={14} aria-hidden="true" />
        <Typography variant="caption" sx={{ fontWeight: 700 }}>
          {label}
        </Typography>
      </Box>
      {children}
    </Box>
  );
}
