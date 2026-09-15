"use client";

import { Box, Typography } from "@mui/material";
import type { ReactNode } from "react";
import { spacing } from "../../theme/tokens";
import Divider from "./Divider";

export interface DetailSectionProps {
  title: string;
  children?: ReactNode;
}

export default function DetailSection({ title, children }: DetailSectionProps) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: spacing.md }}>
      <Divider />
      <Typography variant="h6" sx={{ fontWeight: 500 }}>
        {title}
      </Typography>
      {children}
    </Box>
  );
}
