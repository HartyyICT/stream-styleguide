"use client";

import { Box, Typography } from "@mui/material";
import type { ReactNode } from "react";
import { spacing } from "../../theme/tokens";
import Divider from "./Divider";

interface DetailSectionProps {
  title: string;
  children?: ReactNode;
}

export default function DetailSection({ title, children }: DetailSectionProps) {
  return (
    <Box sx={{ display: "grid", gap: spacing.md }}>
      <Divider />
      <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
        {title}
      </Typography>
      {children}
    </Box>
  );
}
