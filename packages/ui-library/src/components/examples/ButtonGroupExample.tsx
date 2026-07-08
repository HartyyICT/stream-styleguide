"use client";

import type { ReactNode } from "react";
import { Box } from "@mui/material";
import { spacing } from "../../theme/tokens";

interface ButtonGroupExampleProps {
  children: ReactNode;
}

export default function ButtonGroupExample({ children }: ButtonGroupExampleProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: spacing.sm,
      }}
    >
      {children}
    </Box>
  );
}
